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
- Primary action: Explore how it works. GitHub is a secondary link, explicitly marked private. Public source access is planned; no release date is established.
- No contact address, app distribution link, physical performance results, testimonials, or real media are available. Omit them, including empty placeholders.
- Build locally with React, TypeScript, Vite, four static entry pages, and native links. No backend, analytics, publication, or iPhone app changes.

## Brand and design commitments

Preserve the existing logo. Follow the user's global `C:/Users/lekan.BESTLAPTOP/.codex/DESIGN.md` Stripe-inspired guidelines, with the icon's blue/cyan/silver accents, as confirmed by the user. Use locally hosted Inter, the reference's open-source substitute for Sohne. The user approved organic animated backgrounds and moving banners. Include pause and reduced-motion controls. The build is code-led; the workspace `.codex/DESIGN.md` records the adaptation of the global authority.

## Evidence

Reviewed through the GitHub connector on 2026-10-20: [jiayangc1/cac](https://github.com/jiayangc1/cac), particularly `README.md` (blob SHA `32a970f68e57054a19a17091219d7f40858b2f30`), `src/config.ts`, the native scene/audio implementation, and iOS privacy declarations. The existing logo comes from `assets/clear-ahead-logo.png`. Repository implementation and test fixtures are not proof of physical-device performance or safety.
