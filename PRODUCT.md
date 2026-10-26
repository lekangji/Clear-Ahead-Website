# Clear Ahead

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React, TypeScript, Vite, and four static HTML entry pages, as explicitly selected by the user.

Clear Ahead is an experimental, iPhone-only assistive vision prototype. This website introduces its purpose and engineering to project evaluators, while giving prospective users and partners clear explanations of its capabilities and limits.

## Product truth

- Live rear-camera frames are processed on the iPhone using Core ML object detection and metric-depth estimates. Stable named tracks and connected visible depth surfaces inform spatial tones, short speech, and urgency-only haptics.
- Feedback channels have independent controls. The app includes visible depth contours, calibration settings, VoiceOver labels, responsive/detailed modes, and camera-quality and thermal status reporting.
- Installation requires iOS 17 or newer on an arm64 iPhone. iPhone 12 and newer are the physical-device benchmarking target; older compatible phones are not hardware-gated, and their performance is unvalidated.
- Camera frames are not uploaded or stored. There is no account, backend, or app analytics. Nano models are bundled; optional larger model pairs require network downloads.
- The app covers the current rear-camera view, not a persistent map. Distances are approximate. Small or thin obstacles, stairs, and drop-offs can be missed. Headphone localization, calibration, latency, thermal performance, and safety require physical-device evaluation.
- This is supplementary awareness support. It does not replace a cane, guide dog, mobility training, or personal judgment.

## Website brief

- Four pages: Home, How It Works, The Project, Safety & Privacy. The homepage carries the essential story; supporting pages deepen it.
- Primary action: View the app repository on GitHub. Help judges find the source from the homepage, navigation, project page, and footer. Other homepage actions lead to supporting website pages.
- User-supplied media: an app homescreen image and a [three-minute pitch and app demonstration](https://youtu.be/DHR70mPy4-0). Feature these on the homepage. No contact address, app distribution link, physical performance results, or testimonials are available. Omit them, including empty placeholders.
- Build locally with React, TypeScript, Vite, four static entry pages, and native links. No backend, analytics, publication, or iPhone app changes.

## Brand and design commitments

Preserve the existing logo and Stripe-inspired design, with the icon's blue/cyan/silver accents. Use locally hosted Inter and retain the existing organic animated backgrounds, moving banners, and reduced-motion support. Keep copy concise, spacing compact, and footer content centered on every page. Do not include personal details or local computer paths in public files.

## Evidence

Current app repository: [jiayangc1/ClearAhead](https://github.com/jiayangc1/ClearAhead), as supplied by the user on 2026-10-25. Technical facts were last reviewed through the GitHub connector on 2026-10-20, particularly `README.md` (blob SHA `32a970f68e57054a19a17091219d7f40858b2f30`), `src/config.ts`, the native scene/audio implementation, and iOS privacy declarations. The existing logo comes from `assets/clear-ahead-logo.png`. Repository implementation, test fixtures, and demonstration media are not proof of physical-device performance or safety.
