# s1-landingpage

The landing page for [s1](https://github.com/Matthew-Eucaristo/s1) — the
open-source, voice-first macOS agent. Dark, animated, scroll-driven.

## Stack

- **Vite + React 18** — static build to `dist/` (React pinned to 18.3.1 —
  newest-safe pairing with framer-motion 12; React 19.x has reported
  mount-animation regressions upstream)
- **framer-motion** — scroll reveals, parallax hero, bento tilt, nav progress
- **animejs** — terminal replay (typewriter + staggered output lines)
- **lenis** — smooth scroll (skipped under `prefers-reduced-motion`)
- Inter + JetBrains Mono via Google Fonts

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # → dist/
npm run preview   # check the production build
```

## Deploy — GitHub Pages

`.github/workflows/deploy.yml` is ready: push to `main`, then in the repo
**Settings → Pages → Source → GitHub Actions**. The site lands at
`https://matthew-eucaristo.github.io/s1-landingpage/` (the build uses
relative `base` so the project path is handled).

## Deploy — Cloudflare

Workers Static Assets (recommended, free tier). `wrangler.jsonc` already
declares `build.command = "npm run build"`, so deploy is one step:

```bash
npx wrangler deploy   # builds → uploads dist/ → https://s1-landingpage.<sub>.workers.dev
# or: npm run deploy
```

Connecting the repo to Cloudflare instead? Point the project at this repo
and use **build command `npm run build`, output dir `dist`** (Workers
Builds or Pages — same settings).

## Sections

hero (animated terminal replay) → capability marquee → how-it-works
pipeline → feature bento → ~/.s1 config showcase → install → OSS credits →
cta → footer.
