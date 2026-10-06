# s1-landingpage

The website for [s1](https://github.com/Matthew-Eucaristo/s1), the open-source
voice agent for macOS. Live at <https://s1-mac.pages.dev>.

## Design

Monochrome with one accent (signal orange), light and dark from the OS,
Geist + Geist Mono self-hosted, Phosphor icons. Glass only on floating chrome
(nav, the notch pill) as a web approximation of Apple's Liquid Glass. The
hero uses a real screenshot of S1.app (taken in the app's screenshot mode,
`S1_DEMO=1`), never a mocked UI.

| Section | What it does |
|---|---|
| `Hero` | Real app screenshot with the notch pill acting out a command (Motion layout springs) |
| `LogoMarquee` | Official provider wordmarks, the page's only marquee |
| `HowItWorks` | Pinned scroll story over a live pipeline diagram (grammar, judge, reasoner, vision) |
| `Features` | Six-cell bento, CSS-animated visuals |
| `Models` | Providers (official marks) to roles, plus the "who sees the screen" rule |
| `Privacy`, `Cli`, `Faq`, `Install` | Statement, real CLI output replayed with animejs, FAQ, install |

Every animation honours `prefers-reduced-motion`; the hero entrance is pure
CSS so it plays before JavaScript loads.

## SEO and AI readability

- `npm run build` prerenders the page (`src/entry-server.jsx` +
  `scripts/prerender.mjs`), so crawlers read the full HTML without JavaScript.
- JSON-LD: `SoftwareApplication`, `SoftwareSourceCode`, `WebSite`, and an
  `FAQPage` generated from `src/content.js`.
- `public/robots.txt` (search and AI crawlers explicitly allowed),
  `sitemap.xml`, `llms.txt`, `llms-full.txt`, `og.png` (1200×630, rendered
  from `scripts/og.html` with headless Chrome), `_headers` for Cloudflare.

Provider data and FAQ copy live in `src/content.js`; keep them in sync with
the app catalog (`s1/Sources/S1Core/Config/Providers.swift`) and `llms*.txt`.
Logos come from [Lobe Icons](https://github.com/lobehub/lobe-icons) (MIT) and
typesafe.ai; names and marks belong to their owners.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173 (client render)
npm run build     # dist/, prerendered
npm run preview   # check the production build
```

Re-render the social card after copy changes:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --allow-file-access-from-files --window-size=1200,630 --screenshot=public/og.png "file://$PWD/scripts/og.html"
```

## Deploy

Cloudflare Pages, project `s1-mac`:

```bash
npm run build && npm run deploy
```
