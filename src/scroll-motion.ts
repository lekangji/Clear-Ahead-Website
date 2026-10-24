export function installScrollReveals() {
  document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll<HTMLElement>([
    '.home-banner', '.feedback-title', '.feedback-rows', '.feedback-panel',
    '.editorial-row', '.process-strip', '.project-band-inner', '.mechanism-copy',
    '.mechanism-section > .scene-preview', '.architecture-band .section-heading',
    '.architecture-flow', '.device-preview', '.privacy-section .section-heading',
    '.safety-statement', '.next-page', '.site-footer',
  ].join(','));
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      (entry.target as HTMLElement).dataset.scroll = 'visible';
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -48px 0px' });

  for (const target of targets) {
    if (target.getBoundingClientRect().top < window.innerHeight - 48) continue;
    target.dataset.scroll = 'pending';
    observer.observe(target);
  }
  const revealAll = () => {
    observer.disconnect();
    for (const target of targets) delete target.dataset.scroll;
  };
  const onPreference = () => { if (preference.matches) revealAll(); };
  const onFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest<HTMLElement>('[data-scroll="pending"]');
    if (target) {
      target.dataset.scroll = 'visible';
      observer.unobserve(target);
    }
  };
  preference.addEventListener('change', onPreference);
  document.addEventListener('focusin', onFocus);
  return () => {
    revealAll();
    preference.removeEventListener('change', onPreference);
    document.removeEventListener('focusin', onFocus);
  };
}
