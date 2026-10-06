import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import Lenis from 'lenis'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import App from './App.jsx'
import './index.css'

/* Smooth scroll, unless the reader prefers reduced motion. */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.12, smoothWheel: true })
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
}

/* The build prerenders the page (scripts/prerender.mjs); hydrate when it
   did, render from scratch in dev. */
const root = document.getElementById('root')
const app = <StrictMode><App /></StrictMode>
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
