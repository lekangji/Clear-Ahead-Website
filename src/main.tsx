import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, AudioLines, Camera, Cpu, Menu, MessageSquareText, Vibrate, Volume2, X } from 'lucide-react';
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

function Link({ href, children, button = false, light = false }: { href: string; children: ReactNode; button?: boolean; light?: boolean }) {
  return <a className={button ? `button${light ? ' button-light' : ''}` : 'text-link'} href={href}>{children}<Arrow diagonal={href.startsWith('https:')} /></a>;
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
  return <figure className="signal-diagram" aria-label="Conceptual diagram: the visible camera scene informs spatial sound, short speech, and urgency haptics."><MotionRegion className="signal-composition">
    <div className="scene-origin"><span className="scene-dot" />Visible camera view</div>
    <svg className="signal-connections" viewBox="0 0 500 390" fill="none" aria-hidden="true"><path d="M250 42v35q0 24-24 24H85q-24 0-24 24v175M250 101v115M250 101h140q24 0 24 24v210" stroke="#A8C3DE" strokeWidth="1.5" /><path className="signal-path ambient-motion" d="M250 42v35q0 24-24 24H85q-24 0-24 24v175M250 101v115M250 101h140q24 0 24 24v210" stroke="#2784E8" strokeWidth="2" strokeDasharray="12 180" /></svg>
    <div className="signal-banner signal-sound ambient-motion"><div><strong>Spatial sound</strong><span>Direction & presence</span></div><AudioLines strokeWidth={1.5} aria-hidden="true" /></div>
    <div className="signal-banner signal-speech ambient-motion"><div><strong>Short speech</strong><span>Object identification</span></div><MessageSquareText strokeWidth={1.5} aria-hidden="true" /></div>
    <div className="signal-banner signal-haptics ambient-motion"><div><strong>Urgency haptics</strong><span>Estimated collision risk</span></div><Vibrate strokeWidth={1.5} aria-hidden="true" /></div>
  </MotionRegion></figure>;
}

function FeatureRibbon() {
  const features = ['Spatial sound', 'On-device vision', 'Short speech', 'Depth contours', 'Urgency haptics'];
  return <div className="feature-ribbon"><div className="ribbon-track"><ul aria-label="Prototype capabilities">{features.map(feature => <li key={feature}><span aria-hidden="true" />{feature}</li>)}</ul></div></div>;
}

function ChannelPreview() {
  return <figure className="channel-preview" aria-label="Illustration of spatial sound, short speech, and urgency haptics"><MotionRegion className="channel-studies">
    <div><Volume2 className="sound-wave ambient-motion" strokeWidth={1.2} aria-hidden="true" /><span>Spatial sound</span></div>
    <div><MessageSquareText className="speech-lines ambient-motion" strokeWidth={1.2} aria-hidden="true" /><span>Short speech</span></div>
    <div><Vibrate className="haptic-pulse ambient-motion" strokeWidth={1.2} aria-hidden="true" /><span>Urgency haptics</span></div>
  </MotionRegion></figure>;
}

function ScenePreview() {
  return <figure className="scene-preview" aria-label="Illustration of object tracking and estimated depth surfaces"><MotionRegion className="scene-study">
    <svg viewBox="0 0 440 240" fill="none" aria-hidden="true">
      <path d="M24 65V24h48M368 24h48v41M416 175v41h-48M72 216H24v-41" stroke="currentColor" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="1" opacity=".22"><path d="M42 184q90-34 178 0t178 0M42 196q90-34 178 0t178 0M42 208q90-34 178 0t178 0" /><path d="M270 70h116v87H270Z" fill="currentColor" opacity=".2" /></g>
      <g className="scene-track ambient-motion"><rect x="91" y="49" width="115" height="139" rx="8" fill="currentColor" fillOpacity=".04" stroke="currentColor" strokeWidth="1.5" /><path d="M91 69V49h20M186 49h20v20M206 168v20h-20M111 188H91v-20" stroke="currentColor" strokeWidth="3" /><rect x="91" y="29" width="66" height="24" rx="4" fill="currentColor" /><text x="103" y="45" className="scene-object-label">Object</text></g>
      <path className="depth-contour ambient-motion" d="M259 67h132v98H259Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
      <path className="scene-scan ambient-motion" d="M42 74h356" stroke="currentColor" strokeWidth="1" opacity=".35" />
      <text x="274" y="147" fill="currentColor" fontSize="13">Surface</text>
    </svg>
    <div className="scene-legend"><span><i />Object tracks</span><span><i />Depth surfaces</span></div>
  </MotionRegion></figure>;
}

function DevicePreview() {
  return <figure className="device-preview" aria-label="Illustration of camera input, scene processing, and feedback within the iPhone"><MotionRegion className="device-study">
    <svg viewBox="0 0 600 154" fill="none" aria-hidden="true">
      <rect x="12" y="10" width="576" height="134" rx="20" stroke="currentColor" strokeOpacity=".25" />
      <path d="M572 65v24" stroke="currentColor" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
      <path d="M134 77h118m96 0h118" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.5" />
      <path className="device-signal ambient-motion" d="M134 77h118m96 0h118" stroke="currentColor" strokeWidth="2" strokeDasharray="10 108" />
      <rect x="58" y="43" width="76" height="68" rx="12" className="device-node" />
      <Camera x="76" y="57" strokeWidth={1.2} />
      <rect x="252" y="33" width="96" height="88" rx="12" className="device-node" />
      <Cpu x="280" y="57" strokeWidth={1.2} /><path className="processor-pulse ambient-motion" d="M295 72h10v10h-10Z" fill="currentColor" />
      <rect x="466" y="43" width="76" height="68" rx="12" className="device-node" />
      <AudioLines x="484" y="57" strokeWidth={1.2} />
    </svg>
    <div className="device-labels"><span>Camera input</span><span>On-device scene</span><span>Feedback</span></div>
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
      <a className="brand" href="/" aria-label="Clear Ahead home"><img src="/clear-ahead-logo.png" alt="" width="36" height="32" /><span>Clear Ahead</span></a>
      <button className="menu-button" type="button" ref={menuButton} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}><span className="menu-label">{open ? 'Close' : 'Menu'}</span>{open ? <X strokeWidth={1.5} aria-hidden="true" /> : <Menu strokeWidth={1.5} aria-hidden="true" />}</button>
      <nav id="site-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {navigation.map(item => <a key={item.href} href={item.href} aria-current={currentPath === item.href ? 'page' : undefined}>{item.label}</a>)}
      </nav>
    </header>
  </>;
}

function Footer() {
  return <footer className="site-footer wrap">
    <div className="footer-top"><a className="brand" href="/"><img src="/clear-ahead-logo.png" alt="" width="36" height="32" /><span>Clear Ahead</span></a><p>Another way to sense what’s ahead.</p></div>
    <div className="footer-bottom"><p>Experimental awareness support.<br />{' '}Designed for iPhone. Built to be understood.</p><nav aria-label="Footer navigation">{navigation.slice(1).map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div className="footer-source"><a href={github}>GitHub <Arrow diagonal /></a><span>Private repository · public access planned</span></div></div>
  </footer>;
}

function PageIntro({ title, children }: { title: ReactNode; children: ReactNode }) {
  return <section className="page-intro"><AmbientMesh /><div className="wrap intro-inner"><h1>{title}</h1><div className="intro-copy">{children}</div></div></section>;
}

function EditorialRow({ title, children, id, visual }: { title: ReactNode; children: ReactNode; id?: string; visual?: ReactNode }) {
  return <section className="editorial-row" id={id}><div><h2>{title}</h2>{visual}</div><div className="reading">{children}</div></section>;
}

function SafetyNote() {
  return <p className="safety-note">Clear Ahead is experimental. It can miss or misjudge hazards and does not replace a cane, guide dog, mobility training, or personal judgment.</p>;
}

function Home() {
  return <>
    <section className="home-intro"><AmbientMesh /><div className="wrap hero-grid"><div className="hero-copy"><h1>Another way<br />{' '}to sense what’s ahead.</h1><p className="lead">Your surroundings, translated into sound and touch.</p><p>Clear Ahead is an experimental iPhone assistive vision prototype. It uses the camera’s current view to represent nearby objects and surfaces through spatial audio, speech, and haptics.</p><div className="hero-actions"><Link href="/how-it-works/" button>Explore how it works</Link><Link href="/project/">Meet the project</Link></div></div><SignalDiagram /></div>
    </section>
    <FeatureRibbon />
    <div className="wrap essential-facts"><p><strong>Made for iPhone</strong><span>iOS 17 or newer</span></p><p><strong>Processed on device</strong><span>Camera frames stay on your phone</span></p><p><strong>Awareness support</strong><span>Alongside your existing mobility aids</span></p></div>

    <section className="feedback-section wrap" aria-labelledby="feedback-heading">
      <div className="feedback-panel"><div className="feedback-title"><h2 id="feedback-heading">One scene.<br />{' '}Different ways<br />{' '}to understand it.</h2><p>Choose the feedback that works for you. Each channel can be controlled independently.</p><ChannelPreview /></div><div className="feedback-rows"><div><h3>Hear the space.</h3><p>Continuous spatial tones represent selected visible objects and surfaces. As estimated distance changes, so does loudness.</p></div><div><h3>Get the words.</h3><p>Short spoken cues add identification and direction, with tones lowered while speech plays.</p></div><div><h3>Feel the urgency.</h3><p>Vibrations signal estimated risk, rather than every object in view.</p></div></div><div className="panel-bottom"><Link href="/how-it-works/#feedback">Understand the feedback</Link></div></div>
    </section>

    <section className="mechanism-section wrap"><div className="section-heading"><h2>A camera view.<br />{' '}A sense of the scene.</h2><p>The work happens on your iPhone, from camera input to feedback. No camera upload needed.</p></div><ScenePreview /><ol className="process-strip"><li><h3>Observe</h3><p>The rear camera supplies the current view.</p></li><li><h3>Interpret</h3><p>On-device models estimate objects and depth.</p></li><li><h3>Represent</h3><p>Scene tracking informs sound, speech, and touch.</p></li></ol><Link href="/how-it-works/">Follow the process</Link></section>

    <section className="project-band"><div className="wrap project-band-inner"><div><h2>Built on device.<br />{' '}<span>Still being evaluated.</span></h2><Link href="/project/" button light>Inside the project</Link></div><div className="project-band-copy"><p className="lead">An implemented system.<br />{' '}An honest next step.</p><p>Object and depth processing, scene tracking, independent feedback controls, and VoiceOver-labelled screens are implemented.</p><p>Physical-device evaluation is still needed for perception, headphone localization, latency, and real-world performance.</p><div className="source-link"><a href={github}>View on GitHub <Arrow diagonal /></a><span>Currently private · public source access planned</span></div></div></div></section>

    <section className="wrap home-details"><EditorialRow title={<>Designed for iPhone.<br />{' '}With limits in view.</>}><p>Installation requires iOS 17 or newer on an arm64 iPhone. iPhone 12 and newer are the benchmarking target; performance on older compatible phones has not been validated.</p><p>Clear Ahead represents only the current rear-camera view. Distances are approximate, and hazards can be missed.</p><SafetyNote /><Link href="/safety-privacy/">Read the safety & privacy details</Link></EditorialRow></section>
  </>;
}

function HowItWorks() {
  return <>
    <PageIntro title={<>From the visible scene<br />{' '}to sound and touch.</>}><p className="lead">A continuous process, on your iPhone.</p><p>Clear Ahead connects the camera’s current view to a tracked scene, then represents selected nearby geometry through feedback you can control.</p></PageIntro>
    <div className="wrap editorial-content">
      <EditorialRow title="First, the camera looks."><p>The rear camera supplies visible frames. Processing stays on the phone; camera frames do not enter a cloud service.</p><p>The view has a boundary. Clear Ahead has no persistent map and does not remember geometry behind you.</p></EditorialRow>
      <EditorialRow title="Objects and depth add context." visual={<ScenePreview />}><p>Core ML models detect selected object classes and estimate depth. Named objects, such as people, vehicles, and furniture, are combined with connected depth surfaces, including unnamed walls and geometry.</p><p>Tracking helps the scene remain stable between frames. Up to six simultaneous audio sources are selected using visibility, distance, confidence, and estimated collision risk.</p><p>Depth contours also appear on screen. They represent estimated depth, not exact object outlines or guaranteed measurements.</p></EditorialRow>
    </div>
    <section className="wrap feedback-detail" id="feedback"><div className="feedback-panel"><div className="section-heading"><h2>Three channels.<br />{' '}Independent controls.</h2><p>Use spatial tones, speech, and urgency haptics together, or choose which channels to enable.</p></div><ChannelPreview /><dl className="definition-rows"><div><dt>Spatial tones</dt><dd>Continuous tones represent selected visible geometry. Loudness changes with estimated distance. Tone positions and levels transition smoothly as the scene changes.</dd></div><div><dt>Short speech</dt><dd>Spoken cues provide identification and direction. Speech lowers the scene tones while it plays, helping words remain intelligible.</dd></div><div><dt>Urgency haptics</dt><dd>Vibrations follow estimated collision risk. The presence of ordinary scenery alone does not trigger them.</dd></div></dl></div></section>
    <div className="wrap editorial-content">
      <EditorialRow title="Position matters."><p>Measured camera height can help normalize estimated depth when a reliable level-ground fit is available. Ear height and camera offsets help place audio relative to the listener.</p><p>Keep the phone position steady. Incorrect measurements, repositioning, missing ground, and model errors affect the result. A fitted plane alone does not establish distance in meters.</p></EditorialRow>
      <EditorialRow title="Listen with the limits in mind."><p>Compatible headphones can convey spatial information about currently observed geometry. Available phone and headphone motion can help keep that information relative to a turning head.</p><p>Begin looking along the upright rear camera. Restart Assist to recenter after repositioning. Head tracking depends on hardware, permission, and fresh motion data.</p><div className="note note-peach"><h3>Direction is not a guarantee.</h3><p>Front/back perception can remain ambiguous with headphones. Phone speakers cannot reliably convey height or front/back; speech provides identification and direction. When motion or geometry is unavailable, audio can fall back to limited camera-relative positioning.</p></div></EditorialRow>
      <EditorialRow title="An iPhone is the starting point."><p>Installation requires an arm64 iPhone running iOS 17 or newer. iPhone 12 and newer are the physical-device benchmarking target, not an established performance guarantee.</p><p>Responsive and detailed modes adjust the processing balance. Low-light, covered-camera, and thermal-pressure reporting help explain degraded conditions. Actual device behavior still needs physical evaluation.</p><Link href="/safety-privacy/">Understand the limits</Link></EditorialRow>
    </div>
    <NextPage title="Look inside the engineering." href="/project/" label="Explore the project" />
  </>;
}

function Project() {
  return <>
    <PageIntro title={<>More context.<br />{' '}Another channel.</>}><p className="lead">Exploring how an iPhone can make the visible scene more perceptible.</p><p>Clear Ahead brings object detection, depth estimates, and spatial feedback into one on-device assistive vision prototype.</p></PageIntro>
    <div className="wrap editorial-content"><EditorialRow title="The question behind the work."><p>A camera captures a scene, but an image alone is not always a useful way to access it. Clear Ahead explores how that information can become continuous sound, short speech, and urgency vibrations.</p><p>The goal is supplementary awareness of visible surroundings. The prototype is not a replacement for established mobility aids or skills.</p></EditorialRow></div>
    <section className="architecture-band"><div className="wrap"><div className="section-heading"><h2>Native processing.<br />{' '}A shared scene.</h2><p>The camera-to-feedback path runs on the phone. React Native provides the interface; Swift handles live vision and feedback.</p></div><DevicePreview /><ol className="architecture-flow"><li><h3>Camera input</h3><p>VisionCamera supplies bounded frame output.</p></li><li><h3>Native scene</h3><p>Core ML detection and depth feed tracks, surfaces, and risk selection.</p></li><li><h3>Feedback</h3><p>Native audio, Core Haptics, and speech represent the selected scene.</p></li></ol><p className="architecture-footnote">Frames are dropped while the native processor is busy, preventing a growing processing queue. Status and overlay updates return to the interface.</p></div></section>
    <div className="wrap editorial-content"><EditorialRow title="What is implemented."><ul className="editorial-list"><li>On-device object detection and metric-depth estimates, with stable tracks and connected visible surfaces.</li><li>Up to six simultaneous spatial sources, plus independently controlled speech and urgency haptics.</li><li>Depth contours, phone-position calibration, and responsive/detailed processing modes.</li><li>VoiceOver-labelled onboarding, Assist, and Settings screens.</li><li>Model loading and optional download progress, plus low-light, covered-camera, and thermal status reporting.</li></ul></EditorialRow><EditorialRow title="What still needs evidence."><p>Repository tests and implementation are useful engineering evidence. They do not establish how the prototype performs in someone’s surroundings.</p><ul className="editorial-list"><li>Physical-device compilation and native test execution.</li><li>Depth and hazard behavior across different scenes, lighting, and phone positions.</li><li>Headphone localization, motion alignment, reconnection, and audio interruptions.</li><li>Camera-to-cue latency, sustained processing, battery and thermal behavior.</li><li>Controlled, supervised evaluation before any field trial.</li></ul><p>No measured physical-device performance results are presented here.</p></EditorialRow><EditorialRow title="Source access is planned."><p>The project repository is currently private. The GitHub link may require authorized access; public source access is planned, with no announced date.</p><Link href={github} button>View GitHub repository</Link></EditorialRow></div>
    <NextPage title="The limits belong in the picture." href="/safety-privacy/" label="Read safety & privacy" />
  </>;
}

function SafetyPrivacy() {
  return <>
    <PageIntro title={<>Useful context starts<br />{' '}with clear limits.</>}><p className="lead">Experimental awareness support. Personal camera processing.</p><p>Understanding what Clear Ahead can miss is as important as understanding the feedback it provides.</p></PageIntro>
    <section className="wrap safety-statement"><div className="note note-peach"><h2>Keep your existing mobility aids.</h2><SafetyNote /><p>The prototype’s output is not a signal that walking is safe. Physical-device evaluation remains necessary.</p></div></section>
    <div className="wrap editorial-content"><EditorialRow title="The camera view is the boundary."><p>Clear Ahead represents the current rear-camera field of view. It has no persistent map and no remembered geometry behind the user.</p><p>Occluded objects and objects outside the frame are not reliably represented. A “clear” scene means no selected nearby geometry in that view; it is not proof that the path is safe.</p></EditorialRow><EditorialRow title="Estimates can be wrong."><p>Depth is estimated from camera images. Distances remain approximate, even with measured calibration. Small or thin obstacles can be missed, touching surfaces can merge, and stairs or drop-offs are not guaranteed to be recognized.</p><p>Lighting, camera coverage, phone movement, calibration, and thermal pressure can affect the scene. An unavailable scene is different from a clear scene. Neither state establishes safety.</p></EditorialRow><EditorialRow title="Sound has its own limits."><p>Headphones and motion support affect spatial feedback. Front/back ambiguity can remain, and speaker output cannot reliably communicate height or front/back.</p><p>Listen to speech for identification and direction. Feedback does not replace attention to the surrounding environment or personal judgment.</p><Link href="/how-it-works/">Read about feedback and calibration</Link></EditorialRow></div>
    <section className="privacy-section"><div className="wrap"><div className="section-heading"><h2>Your camera view<br />{' '}stays on your iPhone.</h2><p>The live vision pipeline processes frames locally. Clear Ahead has no account, backend, or app analytics.</p></div><DevicePreview /><dl className="definition-rows"><div><dt>No camera upload</dt><dd>Camera frames are processed on the device, rather than sent to a server for analysis.</dd></div><div><dt>No frame storage</dt><dd>The app does not save camera frames as a recording or image history.</dd></div><div><dt>Optional downloads</dt><dd>Nano models are bundled with the app. Choosing a larger detector/depth pair uses a network download, with checksum verification. Cellular or metered downloads require approval.</dd></div></dl><p className="privacy-footnote">On-device camera processing does not mean the app never accesses the internet. Optional model downloads are a separate network activity.</p></div></section>
    <NextPage title="Understand the work behind it." href="/project/" label="Explore the project" />
  </>;
}

function NextPage({ title, href, label }: { title: string; href: string; label: string }) {
  return <section className="next-page wrap"><h2>{title}</h2><Link href={href} button>{label}</Link></section>;
}

const pages: Record<string, () => ReactNode> = { '/': Home, '/how-it-works/': HowItWorks, '/project/': Project, '/safety-privacy/': SafetyPrivacy };
const Page = pages[currentPath] ?? Home;

function App() {
  useEffect(installScrollReveals, []);
  return <div className="app-shell"><Header /><main id="main" tabIndex={-1}><Page /></main><Footer /></div>;
}

createRoot(document.getElementById('root')!).render(<App />);
