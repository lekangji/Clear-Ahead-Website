<p align="center">
  <img src="public/clear-ahead-logo.png" alt="ClearAhead" width="128" />
</p>

<h1 align="center">ClearAhead</h1>
<p align="center"><i>because awareness shouldn't depend on sight alone.</i></p>
<p align="center"><a href="https://clearahead.lekangji.cc"><strong>Explore the website</strong></a> · <a href="https://github.com/jiayangc1/ClearAhead">View the source</a> · <a href="https://youtu.be/DHR70mPy4-0">Watch the demo</a></p>

An app in development that describes nearby objects through **sounds, spoken words, and vibrations**. This website explains the idea, shows how it works, and links to the code.

## Meet the project

- **Hear what’s nearby.** Sounds suggest where objects are. Volume changes with estimated distance.
- **Choose how the app responds.** Turn sounds, speech, and vibrations on or off separately.
- **Keep camera images on your phone.** The app does not upload or save them.
- **See it in action.** The homepage introduces the app with its homescreen, then pairs the technology explanation with the [three-minute pitch and app demonstration](https://youtu.be/DHR70mPy4-0).
- **See how it’s built.** Explore the code in the [app repository](https://github.com/jiayangc1/ClearAhead).

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
