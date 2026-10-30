# please. dashboard

A single-page, dependency-free collection of nine please. apps. Open `index.html` in a browser, or serve the directory with any static web server. No build or installation is needed.

The existing carousel design is preserved: themed background rings, four floating neighbour tiles, a tilted app preview, and a matching information card. Use the arrows, keyboard left/right arrows, project selector, or a horizontal swipe to browse.

## Collection

01. QR Please
02. Todo Please
03. Key Please
04. Calculator Please
05. Color Please
06. Split Please — private GitHub repository and protected Vercel deployment; access is required.
07. Favicon Please — private GitHub repository; the live-site link shows Coming soon until deployed.
08. Shrink Please
09. Focus Please

All nine app captures are in `assets/previews/`. They are static images captured from the local apps, so previews require no iframe, authentication bypass, or connection to the app. Fonts remain embedded in the HTML.

## Navigation and accessibility

The carousel shows only the nearest two neighbours on each side. All nine apps remain available in the selector. Hidden tiles and previews stay out of the accessibility tree. The selector supports Up/Down, Home/End, Enter, and Escape. Unpublished links are disabled and removed from keyboard navigation. Existing responsive layouts and reduced-motion support are retained.

## Editing

App metadata, links, and palettes live in the `PROJECTS` list in `src/index.html`. Edit that readable source, then regenerate production `index.html` with the commands below. `RING` controls carousel order; each item must appear once. Set a project's `links.visit` and `links.repo` when it is published. Retain `protected` and `privateRepo` on Split Please until its access settings change.

## Collection branding

Every app uses a circled italic initial in its own palette. The dashboard renders the matching SVG through the shared `collectionMark` function. All nine previews were refreshed with the matching branding. The dashboard favicon uses a circled p.

## Image performance

All nine previews use WebP at 85% quality, converted with [Shrink Please](https://shrink-please.vercel.app/) at their original dimensions. SVG brand marks remain vectors.

## Production minification

The committed index.html contains minified inline JavaScript and CSS. src/index.html is the readable source; do not edit generated index.html directly. There are no browser dependencies. esbuild is pinned as development-only tooling in tools/ and the source/build tools are excluded from Vercel deployment.

Install the build tool once, then rebuild after source edits:

~~~sh
npm --prefix tools ci
npm --prefix tools run build
npm --prefix tools run check
~~~

Commit both src/index.html and the regenerated index.html. Vercel continues to serve the static production HTML without a server or build step. The check command fails if the generated HTML is stale.

The cleanup removes obsolete screenshot placeholders, replaced icon definitions, unused metadata, and repeated startup work. Active hover, focus, portrait, and reduced-motion rules are retained. All nine WebP previews and embedded fonts remain unchanged.
