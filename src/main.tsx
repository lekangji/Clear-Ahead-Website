import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, AudioLines, Camera, Cpu, Menu, MessageSquareText, Pause, Play, Vibrate, Volume2, X } from 'lucide-react';
import '@fontsource-variable/inter';
import { installScrollReveals } from './scroll-motion';
import './styles.css';

const github = 'https://github.com/jiayangc1/cac';
const navigation = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/project/', label: 'The project' },
  { href: '/safety-privacy/', label: 'Safety & privacy' },
];
const currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return <Icon strokeWidth={1.6} aria-hidden="true" />;
}

function Link({ href, children, button = false }: { href: string; children: ReactNode; button?: boolean }) {
  return <a className={button ? 'button' : 'text-link'} href={href}>{children}<Arrow diagonal={href.startsWith('https:')} /></a>;
}

function MotionRegion({ className, children }: { className: string; children: ReactNode }) {
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = region.current!;
    let visible = true;
    const update = () => {
      const active = visible && !document.hidden;
      if (active && element.classList.contains('ambient-mesh')) {
        // A shared clock keeps the gradient in phase across native page navigation.
        const now = Date.now();
        for (const animation of element.getAnimations({ subtree: true })) {
          const duration = Number(animation.effect!.getTiming().duration);
          animation.currentTime = now % (duration * 2);
        }
      }
      element.dataset.active = String(active);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  return <div ref={region} className={`motion-region ${className}`} data-active="false">{children}</div>;
}

function AmbientMesh() {
  return <MotionRegion className="ambient-mesh"><svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="mesh-blue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#2784E8" /><stop offset="1" stopColor="#7ECFF4" /></linearGradient>
      <linearGradient id="mesh-cyan" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#51B4F0" /><stop offset="1" stopColor="#D9EEFA" /></linearGradient>
      <linearGradient id="mesh-silver" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#C0DFF5" /><stop offset="1" stopColor="#F6F9FC" /></linearGradient>
      <filter id="mesh-blur" x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="22" /></filter>
    </defs>
    <g filter="url(#mesh-blur)">
      <path className="mesh-wave mesh-wave-one ambient-motion" fill="url(#mesh-silver)" d="M450-180C720-90 750 130 1000 210S1340 410 1580 490L1580-180Z" />
      <path className="mesh-wave mesh-wave-two ambient-motion" fill="url(#mesh-blue)" d="M650-180C640 60 850 80 960 250S1210 430 1520 550L1580-180Z" />
      <path className="mesh-wave mesh-wave-three ambient-motion" fill="url(#mesh-cyan)" d="M970-220C820 10 1190 140 1060 310S1280 500 1580 620L1580-220Z" />
      <path className="mesh-wave mesh-wave-four ambient-motion" fill="#A6D8F7" d="M1300-160C1080 70 1450 190 1310 360S1480 610 1700 680L1700-160Z" />
    </g>
  </svg></MotionRegion>;
}

function SignalDiagram() {
  return <figure className="signal-diagram" aria-label="Diagram showing how the camera view becomes sounds, spoken descriptions, and vibrations."><MotionRegion className="signal-composition">
    <div className="scene-origin"><Camera strokeWidth={1.5} aria-hidden="true" />Camera view</div>
    <svg className="signal-connections" viewBox="0 0 520 440" fill="none" aria-hidden="true">
      <defs><linearGradient id="scan-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#51B4F0" stopOpacity="0" /><stop offset="1" stopColor="#51B4F0" stopOpacity=".22" /></linearGradient></defs>
      <path d="M24 94V74h24m150 0h24v20M24 242v20h24m150 0h24v-20" stroke="#1265BC" strokeWidth="1.5" />
      <g className="sensor-outline ambient-motion" stroke="#1265BC"><rect x="57" y="112" width="63" height="102" rx="4" /><path d="M144 152h47v62h-47z" strokeDasharray="4 4" /><path d="M57 127v-15h15m33 0h15v15m0 72v15h-15m-33 0H57v-15" strokeWidth="3" /></g>
      <path className="sensor-scan ambient-motion" d="M36 88h174v48H36z" fill="url(#scan-fill)" /><path className="sensor-scan ambient-motion" d="M36 136h174" stroke="#2784E8" />
      <g stroke="#1265BC" strokeOpacity=".2"><path d="M36 230q87-36 174 0M36 243q87-36 174 0" /><path d="M123 262v82q0 18 18 18h68M222 168h42q16 0 16-16V112h18M222 198h20q16 0 16 16v26h40" /></g>
      <path className="signal-path ambient-motion" d="M222 168h42q16 0 16-16V112h18M222 198h20q16 0 16 16v26h40M123 262v82q0 18 18 18h68" stroke="#2784E8" strokeWidth="2" strokeDasharray="8 120" />
      <text x="57" y="103" fill="#1265BC" fontSize="11">Object</text><text x="144" y="144" fill="#526780" fontSize="11">Surface</text>
    </svg>
    <div className="signal-banner signal-sound ambient-motion"><div><strong>Directional sound</strong><span>Where things are</span></div><span className="signal-waveform" aria-hidden="true">{[12, 24, 38, 20, 30, 14, 22].map((height, index) => <i key={index} className="ambient-motion" style={{ height, animationDelay: `${index * 80 + 1300}ms` }} />)}</span></div>
    <div className="signal-banner signal-speech ambient-motion"><div><strong>Spoken descriptions</strong><span>What things are</span></div><MessageSquareText className="signal-voice ambient-motion" strokeWidth={1.5} aria-hidden="true" /></div>
    <div className="signal-banner signal-haptics ambient-motion"><div><strong>Vibration alerts</strong><span>Possible danger nearby</span></div><Vibrate className="signal-touch ambient-motion" strokeWidth={1.5} aria-hidden="true" /></div>
  </MotionRegion><figcaption>Illustrative signal flow</figcaption></figure>;
}

function FeatureRibbon() {
  const features = ['Directional sound', 'Private processing', 'Spoken descriptions', 'Distance outlines', 'Vibration alerts'];
  const [paused, setPaused] = useState(false);
  const Icon = paused ? Play : Pause;
  return <MotionRegion className="feature-ribbon"><div className="ribbon-track ambient-motion" style={{ animationPlayState: paused ? 'paused' : undefined }}>{[false, true].map(duplicate => <ul key={String(duplicate)} aria-label={duplicate ? undefined : 'What the app does'} aria-hidden={duplicate || undefined}>{features.map(feature => <li key={feature}><span aria-hidden="true" />{feature}</li>)}</ul>)}</div><button className="ribbon-toggle" type="button" aria-label={paused ? 'Resume banner' : 'Pause banner'} aria-pressed={paused} onClick={() => setPaused(!paused)}><Icon strokeWidth={1.5} aria-hidden="true" /></button></MotionRegion>;
}

function ChannelPreview() {
  return <figure className="channel-preview" aria-label="Diagram of sounds, spoken descriptions, and vibration alerts"><MotionRegion className="channel-studies">
    <div><Volume2 className="sound-wave ambient-motion" strokeWidth={1.2} aria-hidden="true" /><span>Directional sound</span></div>
    <div><MessageSquareText className="speech-lines ambient-motion" strokeWidth={1.2} aria-hidden="true" /><span>Spoken descriptions</span></div>
    <div><Vibrate className="haptic-pulse ambient-motion" strokeWidth={1.2} aria-hidden="true" /><span>Vibration alerts</span></div>
  </MotionRegion></figure>;
}

function ScenePreview() {
  return <figure className="scene-preview" aria-label="Diagram showing objects and estimated distances"><MotionRegion className="scene-study">
    <svg viewBox="0 0 440 240" fill="none" aria-hidden="true">
      <path d="M24 65V24h48M368 24h48v41M416 175v41h-48M72 216H24v-41" stroke="currentColor" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="1" opacity=".22"><path d="M42 184q90-34 178 0t178 0M42 196q90-34 178 0t178 0M42 208q90-34 178 0t178 0" /><path d="M270 70h116v87H270Z" fill="currentColor" opacity=".2" /></g>
      <g className="scene-track ambient-motion"><rect x="91" y="49" width="115" height="139" rx="8" fill="currentColor" fillOpacity=".04" stroke="currentColor" strokeWidth="1.5" /><path d="M91 69V49h20M186 49h20v20M206 168v20h-20M111 188H91v-20" stroke="currentColor" strokeWidth="3" /><rect x="91" y="29" width="66" height="24" rx="4" fill="currentColor" /><text x="103" y="45" className="scene-object-label">Object</text></g>
      <path className="depth-contour ambient-motion" d="M259 67h132v98H259Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
      <path className="scene-scan ambient-motion" d="M42 74h356" stroke="currentColor" strokeWidth="1" opacity=".35" />
      <text x="274" y="147" fill="currentColor" fontSize="13">Surface</text>
    </svg>
    <div className="scene-legend"><span><i />Objects</span><span><i />Nearby surfaces</span></div>
  </MotionRegion></figure>;
}

function DevicePreview() {
  return <figure className="device-preview" aria-label="Diagram showing a phone checking camera images and responding with sound and touch"><MotionRegion className="device-study">
    <svg viewBox="0 0 600 154" fill="none" aria-hidden="true">
      <rect x="12" y="10" width="576" height="134" rx="20" stroke="currentColor" strokeOpacity=".25" />
      <path d="M572 65v24" stroke="currentColor" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
      <path d="M134 77h118m96 0h118" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.5" />
      <path className="device-signal ambient-motion" d="M134 77h118m96 0h118" stroke="currentColor" strokeWidth="2" strokeDasharray="10 108" />
      <rect x="58" y="43" width="76" height="68" rx="12" className="device-node" />
      <Camera x="76" y="57" size={40} strokeWidth={1.2} />
      <rect x="252" y="33" width="96" height="88" rx="12" className="device-node" />
      <Cpu x="280" y="57" size={40} strokeWidth={1.2} /><path className="processor-pulse ambient-motion" d="M295 72h10v10h-10Z" fill="currentColor" />
      <rect x="466" y="43" width="76" height="68" rx="12" className="device-node" />
      <AudioLines x="484" y="57" size={40} strokeWidth={1.2} />
    </svg>
    <div className="device-labels"><span>Camera view</span><span>Your phone</span><span>Sound & touch</span></div>
  </MotionRegion></figure>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [open]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header wrap">
      <a className="brand" href="/" aria-label="Clear Ahead home" aria-current={currentPath === '/' ? 'page' : undefined}><img src="/clear-ahead-logo.png" alt="" width="36" height="32" /><span>Clear Ahead</span></a>
      <button className="menu-button" type="button" ref={menuButton} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}><span className="menu-label">{open ? 'Close' : 'Menu'}</span>{open ? <X strokeWidth={1.5} aria-hidden="true" /> : <Menu strokeWidth={1.5} aria-hidden="true" />}</button>
      <nav id="site-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {navigation.slice(1).map(item => <a key={item.href} href={item.href} aria-current={currentPath === item.href ? 'page' : undefined}>{item.label}</a>)}
        <a href={github}>GitHub <Arrow diagonal /></a>
      </nav>
    </header>
  </>;
}

function Footer() {
  return <footer className="site-footer wrap">
    <div className="footer-brand"><a className="brand" href="/"><img src="/clear-ahead-logo.png" alt="" width="36" height="32" /><span>Clear Ahead</span></a><p>Because awareness shouldn't depend on sight alone.</p><p>An app in development.</p></div>
    <nav className="footer-navigation" aria-label="Footer navigation">{navigation.slice(1).map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
    <div className="footer-source"><a href={github}>See the code on GitHub <Arrow diagonal /></a></div>
  </footer>;
}

function PageIntro({ title, children }: { title: ReactNode; children: ReactNode }) {
  return <section className="page-intro"><AmbientMesh /><div className="wrap intro-inner"><h1>{title}</h1><div className="intro-copy">{children}</div></div></section>;
}

function EditorialRow({ title, children, id, visual }: { title: ReactNode; children: ReactNode; id?: string; visual?: ReactNode }) {
  return <section className="editorial-row" id={id}><div><h2>{title}</h2>{visual}</div><div className="reading">{children}</div></section>;
}

function SafetyNote() {
  return <p className="safety-note">Clear Ahead is still being tested. It can miss dangers and does not replace a cane, guide dog, mobility training, or your own judgment.</p>;
}

function Home() {
  return <>
    <section className="home-intro"><AmbientMesh /><div className="wrap hero-grid"><div className="hero-copy"><h1>Another way<br />{' '}to sense what’s ahead.</h1><p className="lead">Your iPhone’s camera becomes another source of awareness. Nearby objects, translated into sound, speech, and touch.</p><div className="hero-actions"><Link href={github} button>See the code on GitHub</Link><Link href="/how-it-works/">How it works</Link></div><p className="hero-status">An assistive vision prototype for iPhone · iOS 17+</p></div><SignalDiagram /></div>
    </section>
    <div className="wrap home-banner"><FeatureRibbon /></div>

    <section className="feedback-section wrap" aria-labelledby="feedback-heading">
      <div className="feedback-title"><h2 id="feedback-heading">One view. More context.</h2><p>Choose the feedback that works for you. Control each channel independently.</p></div><div className="feedback-rows"><div><AudioLines strokeWidth={1.5} aria-hidden="true" /><h3>Hear direction.</h3><p>Sounds suggest where objects are, with volume changing as estimated distance changes.</p></div><div><MessageSquareText strokeWidth={1.5} aria-hidden="true" /><h3>Hear a description.</h3><p>Short messages name objects and their direction. Other sounds soften while the app speaks.</p></div><div><Vibrate strokeWidth={1.5} aria-hidden="true" /><h3>Feel an alert.</h3><p>Vibrations signal an estimated risk of collision, rather than everything the camera sees.</p></div></div>
    </section>

    <section className="mechanism-section wrap"><div className="mechanism-copy"><h2>Objects, surfaces,<br />{' '}and the space between.</h2><p>The app follows visible objects and estimates distance. Nearby surfaces add context, even when they can’t be named.</p><Link href="/how-it-works/">Explore the technology</Link></div><ScenePreview /></section>

    <section className="project-band"><div className="wrap"><div className="project-band-inner"><h2>On your phone.<br />{' '}<span>By design.</span></h2><div className="project-band-copy"><p>Camera images are processed on your iPhone, without being uploaded or saved. No account. No app server. No app analytics.</p><Link href="/project/">Inside the project</Link></div></div><DevicePreview /></div></section>

    <section className="wrap home-details"><EditorialRow title={<>Extra awareness.<br />{' '}With real limits.</>}><p>Clear Ahead only covers the camera’s current view, and distances are estimates. Physical testing will focus on iPhone 12 and newer; performance on older compatible phones is unvalidated.</p><SafetyNote /><Link href="/safety-privacy/">Read safety & privacy</Link></EditorialRow></section>
  </>;
}

function HowItWorks() {
  return <>
    <PageIntro title={<>Your camera looks.<br />{' '}Your phone describes.</>}><p className="lead">Clear Ahead turns what your camera sees into sounds, spoken words, and vibrations.</p></PageIntro>
    <div className="wrap editorial-content">
      <EditorialRow title="It starts with your camera."><p>The rear camera shows what’s in front of the phone. The app checks those images on your phone, without sending them to a server.</p><p>It does not build a lasting map or remember what is behind you.</p></EditorialRow>
      <EditorialRow title="The app looks for objects." visual={<ScenePreview />}><p>It looks for things such as people, vehicles, and furniture, and estimates their distance. It also looks for walls and other surfaces it cannot name.</p><p>The app follows objects as the view changes. It can play up to six sounds at once, choosing what to describe based on distance, possible danger, and how sure it is about what it sees.</p><p>Lines on screen show estimated distance. They are not exact object outlines or precise measurements.</p></EditorialRow>
    </div>
    <section className="wrap feedback-detail" id="feedback"><div className="feedback-panel"><div className="section-heading"><h2>Choose how<br />{' '}your phone responds.</h2><p>Use sounds, speech, and vibrations together, or turn each one on or off.</p></div><ChannelPreview /><dl className="definition-rows"><div><dt>Directional sound</dt><dd>Sounds suggest where visible objects and surfaces are. Their volume changes with estimated distance, and the sounds move smoothly as the view changes.</dd></div><div><dt>Spoken descriptions</dt><dd>Short messages name objects and their direction. Other sounds get quieter while the app speaks.</dd></div><div><dt>Vibration alerts</dt><dd>The phone vibrates when the app estimates a risk of bumping into something, rather than for everything it sees.</dd></div></dl></div></section>
    <div className="wrap editorial-content">
      <EditorialRow title="How you hold the phone matters."><p>Measuring the camera’s height can help the app estimate distance when it can clearly see level ground. Your ear height and the phone’s position help it place sounds around you.</p><p>Keep the phone steady. Wrong measurements, moving the phone, or an unclear view of the ground can make estimates worse. Finding a flat surface alone is not enough to measure distance accurately.</p></EditorialRow>
      <EditorialRow title="Listen with headphones."><p>Compatible headphones can make sounds seem to come from different directions. If your phone and headphones support head tracking, the app can adjust sounds as you turn your head.</p><p>Start with the phone upright and look in the same direction as its rear camera. Restart Assist after changing the phone’s position. Head tracking needs supported hardware, permission, and up-to-date movement information.</p><div className="note note-peach"><h3>Sounds can be hard to place.</h3><p>Even with headphones, front and back can sound similar. Phone speakers cannot reliably show whether something is above, below, in front, or behind you. Spoken descriptions add direction. If movement or distance information is missing, sounds may follow the camera’s direction instead.</p></div></EditorialRow>
      <EditorialRow title="Device requirements."><p>You need an iPhone running iOS 17 or later. Testing will focus on iPhone 12 and newer, but performance has not yet been confirmed.</p><p>You can choose faster responses or more detail. The app reports low light, a covered camera, and overheating, which can affect how it works.</p><Link href="/safety-privacy/">Read about the limits</Link></EditorialRow>
    </div>
    <NextPage title="See how we’re building it." href="/project/" label="About the project" />
  </>;
}

function Project() {
  return <>
    <PageIntro title={<>More ways to know<br />{' '}what’s around you.</>}><p className="lead">We’re exploring how a phone can turn camera images into useful sound and touch.</p></PageIntro>
    <div className="wrap editorial-content"><EditorialRow title="Why we’re building it."><p>A camera captures a lot, but a picture is not useful to everyone. Clear Ahead explores another way to share that information: sounds, spoken descriptions, and vibrations.</p><p>It is meant to work alongside a cane, guide dog, and existing mobility skills.</p><Link href={github} button>See the code on GitHub</Link></EditorialRow></div>
    <section className="architecture-band"><div className="wrap"><div className="section-heading"><h2>All the work happens<br />{' '}on your phone.</h2><p>The app’s screens use React Native. Swift handles the camera images, sound, and vibrations directly on the phone.</p></div><DevicePreview /><ol className="architecture-flow"><li><h3>Camera</h3><p>The rear camera sends images for the app to check.</p></li><li><h3>Understanding the view</h3><p>The app uses Apple’s Core ML tools to find objects, estimate distance, and choose what to describe.</p></li><li><h3>Sound and touch</h3><p>The phone responds with directional sounds, spoken descriptions, and vibration alerts.</p></li></ol><p className="architecture-footnote">If the phone is busy, it skips camera images instead of letting them pile up. The screen shows distance lines and updates about how the app is running.</p></div></section>
    <div className="wrap editorial-content"><EditorialRow title="What we’ve built."><ul className="editorial-list"><li>Finding objects, estimating distance, and following objects as the camera moves.</li><li>Up to six sounds at once, with separate controls for sound, speech, and vibrations.</li><li>Distance lines on screen, phone-position settings, and a choice of faster responses or more detail.</li><li>Setup, Assist, and Settings screens with labels for Apple’s VoiceOver screen reader.</li><li>Download progress and messages about low light, a covered camera, and overheating.</li></ul></EditorialRow><EditorialRow title="What still needs testing."><p>Working code and software tests do not show how well the app will work in everyday life. We still need to check:</p><ul className="editorial-list"><li>Building and running the app and its tests on real devices.</li><li>Object and distance estimates in different places, lighting, and phone positions.</li><li>Sound direction, head tracking, and what happens when headphones disconnect or audio is interrupted.</li><li>How quickly the app responds, how long it can run, and its effect on battery life and heat.</li><li>Carefully supervised testing before trying it in public spaces.</li></ul><p>We have not published measured results from real devices.</p></EditorialRow></div>
    <NextPage title="Know what the app can miss." href="/safety-privacy/" label="Read safety & privacy" />
  </>;
}

function SafetyPrivacy() {
  return <>
    <PageIntro title={<>Know the limits.<br />{' '}Keep your privacy.</>}><p className="lead">Clear Ahead is still being tested. Your camera images stay on your phone.</p></PageIntro>
    <section className="wrap safety-statement"><div className="note note-peach"><h2>Keep using your cane or guide dog.</h2><SafetyNote /><p>The app cannot tell you that it is safe to walk.</p></div></section>
    <div className="wrap editorial-content"><EditorialRow title="It only sees where the camera points."><p>The app uses the rear camera’s current view. It does not keep a map or remember what is behind you.</p><p>It can miss things hidden behind other objects or outside the picture. If it reports nothing nearby, that does not mean the path is safe.</p></EditorialRow><EditorialRow title="Distances are estimates."><p>The app estimates distance from images. Even with careful setup, it can get things wrong. Small or thin obstacles may be missed, nearby surfaces may blend together, and stairs or drop-offs may not be recognized.</p><p>Low light, a covered camera, phone movement, incorrect settings, and overheating can affect the result. An unclear view is different from an empty one. Neither proves it is safe to move.</p></EditorialRow><EditorialRow title="Sound can be misleading."><p>Headphones and head tracking affect where sounds seem to come from. Front and back can sound similar. Phone speakers cannot reliably show height or distinguish front from back.</p><p>Spoken descriptions help explain objects and direction. Keep listening to your surroundings and use your own judgment.</p><Link href="/how-it-works/">Learn about sounds and phone setup</Link></EditorialRow></div>
    <section className="privacy-section"><div className="wrap"><div className="section-heading"><h2>Your camera images<br />{' '}stay on your phone.</h2><p>The app checks images on your phone. There is no account, app server, or tracking of how you use the app.</p></div><DevicePreview /><dl className="definition-rows"><div><dt>No image uploads</dt><dd>Camera images are checked on your phone, without sending them to a server.</dd></div><div><dt>No saved camera images</dt><dd>The app does not record the camera feed or keep an image history.</dd></div><div><dt>Optional downloads</dt><dd>The smallest AI models come with the app. You can download larger ones, which the app checks before using. It asks before downloading over cellular or a connection that charges for data.</dd></div></dl></div></section>
    <NextPage title="See the project behind the app." href="/project/" label="About the project" />
  </>;
}

function NextPage({ title, href, label }: { title: string; href: string; label: string }) {
  return <section className="next-page wrap"><h2>{title}</h2><Link href={href}>{label}</Link></section>;
}

const pages: Record<string, () => ReactNode> = { '/': Home, '/how-it-works/': HowItWorks, '/project/': Project, '/safety-privacy/': SafetyPrivacy };
const Page = pages[currentPath] ?? Home;

function App() {
  useEffect(installScrollReveals, []);
  return <div className="app-shell"><Header /><main id="main" tabIndex={-1}><Page /></main><Footer /></div>;
}

createRoot(document.getElementById('root')!).render(<App />);
