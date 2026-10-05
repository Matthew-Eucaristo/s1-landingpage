import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import App from './App.jsx'
import './index.css'

/* Lenis smooth scroll — skip when the user prefers reduced motion. */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.0, smoothWheel: true })
  function raf(t) { lenis.raf(t); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
