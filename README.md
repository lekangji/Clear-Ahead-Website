<p align="center">
  <img src="public/clear-ahead-logo.png" alt="Clear Ahead" width="112" />
</p>

<h1 align="center">Clear Ahead</h1>
<p align="center"><i>Because awareness shouldn't depend on sight alone.</i></p>
<p align="center"><a href="https://clearahead.lekangji.cc"><strong>See the site →</strong></a></p>

An app in development that describes nearby objects through **sounds, spoken words, and vibrations**. This website explains the idea, shows how it works, and links to the code.

## Meet the project

- **Hear what’s nearby.** Sounds suggest where objects are. Volume changes with estimated distance.
- **Choose how the app responds.** Turn sounds, speech, and vibrations on or off separately.
- **Keep camera images on your phone.** The app does not upload or save them.
- **See how it’s built.** Explore the code in the [app repository](https://github.com/jiayangc1/cac).

The site covers **How it works**, **The project**, and **Safety & privacy**. It uses React, TypeScript, Vite, and a bundled Inter font. You can navigate with a keyboard, pause the scrolling banner, or turn off animations through your device’s reduced-motion setting.

## Run the website

Use Node.js 22.12+ (or 20.19+) and pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Vite.

## Build and check

```sh
pnpm typecheck
pnpm build
pnpm test
pnpm preview
```

Build before running tests: the tests check the finished website. To publish it, upload `dist/` to a static host that serves directory `index.html` files. No routing rewrites are needed.

## Know the limits

Clear Ahead is still being tested. It can miss dangers and does not replace a cane, guide dog, mobility training, or your own judgment. Testing on real devices is still needed. There is no announced app download or release date.

The app requires an iPhone running iOS 17 or later. The smallest AI models come with it; larger ones are optional downloads. See [PRODUCT.md](PRODUCT.md) for the facts behind the site.

## Credits

The logo comes from the app repository. Inter is bundled under the [SIL Open Font License](public/Inter-OFL.txt). This website does not grant a license to the app repository or its assets.
