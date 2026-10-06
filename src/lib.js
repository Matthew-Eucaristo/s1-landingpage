import { useEffect, useState } from 'react'

export const EASE = [0.22, 1, 0.36, 1]
export const SPRING = { type: 'spring', stiffness: 260, damping: 30 }

/** Scroll reveal: heavy fade-up with a little blur, once. */
export const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 32, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, delay: i * 0.07, ease: EASE },
})

/** Matches on the client only — the server render always assumes motion. */
export function useReducedMotion() {
  const [reduced, set] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => set(m.matches)
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return reduced
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy') } catch { /* nothing else to try */ }
    ta.remove()
  }
}
