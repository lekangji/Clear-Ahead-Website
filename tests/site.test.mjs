import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { installScrollReveals } from '../src/scroll-motion.ts';

const routes = ['index.html', 'how-it-works/index.html', 'project/index.html', 'safety-privacy/index.html'];

test('scroll entrances reveal once, respect focus and reduced motion, and clean up', t => {
  const target = top => ({ dataset: {}, getBoundingClientRect: () => ({ top }) });
  const onscreen = target(100), below = target(1200), focused = target(1800);
  const targets = [onscreen, below, focused], observed = new Set(), listeners = new Map();
  let callback, observerCount = 0, anchorScrolls = 0;
  class Observer {
    constructor(onEntries) { callback = onEntries; observerCount++; }
    observe(element) { observed.add(element); }
    unobserve(element) { observed.delete(element); }
    disconnect() { observed.clear(); }
  }
  class FocusTarget { closest() { return focused; } }
  const preference = { matches: false, addEventListener: (_, fn) => listeners.set('change', fn), removeEventListener: () => listeners.delete('change') };
  const mocks = {
    window: { location: { hash: '' }, innerHeight: 900, matchMedia: () => preference, IntersectionObserver: Observer },
    document: { getElementById: id => id === 'feedback' ? { scrollIntoView: () => anchorScrolls++ } : null, querySelectorAll: () => targets, addEventListener: (_, fn) => listeners.set('focus', fn), removeEventListener: () => listeners.delete('focus') },
    Element: FocusTarget, IntersectionObserver: Observer,
  };
  for (const [key, value] of Object.entries(mocks)) {
    const original = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, value });
    t.after(() => { if (original) Object.defineProperty(globalThis, key, original); else delete globalThis[key]; });
  }
  const cleanup = installScrollReveals();
  assert.equal(onscreen.dataset.scroll, undefined);
  assert.equal(below.dataset.scroll, 'pending');
  callback([{ target: below, isIntersecting: false }]);
  assert.equal(below.dataset.scroll, 'pending');
  callback([{ target: below, isIntersecting: true }]);
  assert.equal(below.dataset.scroll, 'visible');
  assert.ok(!observed.has(below));
  listeners.get('focus')({ target: new FocusTarget() });
  assert.equal(focused.dataset.scroll, 'visible');
  preference.matches = true;
  listeners.get('change')();
  assert.ok(targets.every(element => element.dataset.scroll === undefined));
  assert.equal(observed.size, 0);
  cleanup();
  assert.equal(listeners.size, 0);
  mocks.window.location.hash = '#feedback';
  assert.equal(installScrollReveals(), undefined);
  assert.equal(anchorScrolls, 1);
  assert.equal(observerCount, 1);
  preference.matches = false;
  delete mocks.window.IntersectionObserver;
  assert.equal(installScrollReveals(), undefined);
});

test('production has four direct-entry documents with unique metadata and local assets', async () => {
  const titles = new Set();
  for (const route of routes) {
    const html = await readFile(join('dist', route), 'utf8');
    assert.match(html, /<html lang="en">/);
    assert.match(html, /name="description" content="[^"]+"/);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title);
    titles.add(title);
    for (const asset of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) {
      assert.ok((await readFile(join('dist', asset[1]))).length > 0);
    }
  }
  assert.equal(titles.size, 4);
  assert.ok((await readFile('dist/clear-ahead-logo.png')).length > 1000);
  const assets = await readdir('dist/assets');
  assert.ok(assets.some(name => /inter-latin-wght-normal.*\.woff2$/.test(name)), 'Inter must ship locally');
});

test('shared UI preserves route coverage, repository links, and safety constraints', async () => {
  const source = await readFile('src/main.tsx', 'utf8');
  for (const route of ['/', '/how-it-works/', '/project/', '/safety-privacy/']) assert.ok(source.includes(`'${route}'`));
  assert.match(source, /https:\/\/github\.com\/jiayangc1\/cac/);
  assert.doesNotMatch(source, /currently private|private repository|authorized access|public source access/i);
  assert.match(source, /does not replace a cane, guide dog/);
  assert.doesNotMatch(source, /mailto:|<form|<iframe|google-analytics\.com|googletagmanager\.com/i);
});

test('public files and production output contain no local user-directory paths', async () => {
  async function check(path) {
    const entries = await readdir(path, { withFileTypes: true });
    for (const entry of entries) {
      const file = join(path, entry.name);
      if (entry.isDirectory()) await check(file);
      else if (/\.(?:html|tsx?|css|js|map|json|md|svg|txt)$/i.test(file)) {
        assert.doesNotMatch(await readFile(file, 'utf8'), /(?:[a-z]:[\\/]+Users[\\/]|\/(?:Users|home)\/)[^\s"'<>]+/i, file);
      }
    }
  }
  for (const file of ['README.md', 'PRODUCT.md']) {
    assert.doesNotMatch(await readFile(file, 'utf8'), /(?:[a-z]:[\\/]+Users[\\/]|\/(?:Users|home)\/)[^\s"'<>]+/i, file);
  }
  for (const directory of ['src', 'public', 'dist']) await check(directory);
});
