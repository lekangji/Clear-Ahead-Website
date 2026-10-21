# Clear Ahead

**Another way to sense what’s ahead.**

A four-page introduction to the Clear Ahead iPhone assistive vision prototype: what it does, how it works, the engineering behind it, and the limits that matter.

Built with React, TypeScript, Vite, and locally hosted Inter. Four static entry pages share one visual system and use ordinary links, so hosting needs no client-side routing rewrites.

## Run locally

Use Node.js 22.12+ (or 20.19+) and pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Vite. The pages are `/`, `/how-it-works/`, `/project/`, and `/safety-privacy/`.

## Check and build

```sh
pnpm typecheck
pnpm build
pnpm test
pnpm preview
```

`pnpm test` checks the production output, so build first. Deploy `dist/` to a static host that serves directory `index.html` files. Publication is not configured in this project.

## Keep the story accurate

[`PRODUCT.md`](PRODUCT.md) records the audience, source evidence, and product limits. The governing design reference is `C:/Users/lekan.BESTLAPTOP/.codex/DESIGN.md`; [`.codex/DESIGN.md`](.codex/DESIGN.md) records its website adaptation: Stripe-inspired typography, surfaces, and pill actions with Clear Ahead's blue/cyan icon accents.

The animated mesh, feedback banners, and feature ribbon pause when offscreen or when the tab is hidden. Use **Pause motion** to stop all loops. Your choice carries across pages for the browser session. System reduced-motion settings take priority.

The [app repository](https://github.com/jiayangc1/cac) is currently private; public source access is planned. There is no announced download or release date. Contact links and real media will be added when available.

Clear Ahead remains experimental awareness support. It can miss or misjudge hazards and does not replace a cane, guide dog, mobility training, or personal judgment. This website does not establish physical-device performance or safety.

The original logo comes from the app repository. Inter is bundled through `@fontsource-variable/inter` under the SIL Open Font License; its license is included in `public/Inter-OFL.txt`. This website does not grant a license to the private app repository or its assets.
