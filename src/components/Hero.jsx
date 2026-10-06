import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, CheckCircle, HandPalm } from '@phosphor-icons/react'
import { REPO } from '../content.js'
import { SPRING, useReducedMotion } from '../lib.js'

/* The hero shows the real app (a screenshot of S1.app) with the notch pill
   acting out a command above it: ⇧⇧, listening, working, done. The pill is
   the same Dynamic-Island-style status the app drops from the notch. */

const SAY = 'open Notes and write the shopping list'
const STEPS = ['Open Notes', 'Press ⌘N', 'Type “Shopping list: eggs, coffee, limes”', 'Check for “Shopping list”']

export default function Hero() {
  const stage = useRef(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid wrap">
        <div className="hero-copy">
          <h1 id="hero-title" className="rise rise-1">Say it.<br />Your Mac does it.</h1>
          <p className="hero-sub rise rise-2">
            s1 is an open-source voice agent for macOS. It acts on what you say and shows every step.
          </p>
          <div className="hero-ctas rise rise-3">
            <a className="btn btn-accent" href="#install">Download</a>
            <a className="btn btn-ghost" href={REPO} target="_blank" rel="noreferrer">
              View on GitHub <span className="btn-ic"><ArrowUpRight size={14} weight="bold" /></span>
            </a>
          </div>
        </div>

        <motion.div className="hero-stage rise rise-4" ref={stage} style={{ y }}>
          <Pill />
          <img className="hero-shot" src="./shots/app.png" width="1321" height="861"
               alt="The s1 window: run history in the sidebar and a conversation where each spoken command shows its steps and result"
               fetchpriority="high" />
        </motion.div>
      </div>
    </section>
  )
}

/** Cycles listening → working → done, like the app's notch status. */
function Pill() {
  const reduced = useReducedMotion()
  const [s, set] = useState({ kind: 'keys', text: '' })

  useEffect(() => {
    if (reduced) { set({ kind: 'done', text: '4 steps · 3.1 s' }); return }
    let alive = true
    const timers = []
    const at = (ms, fn) => timers.push(setTimeout(() => alive && fn(), ms))
    const loop = () => {
      set({ kind: 'keys', text: '' })
      at(1100, () => set({ kind: 'listen', text: '' }))
      SAY.split('').forEach((_, i) => at(1400 + i * 45, () => set({ kind: 'listen', text: SAY.slice(0, i + 1) })))
      const run = 1400 + SAY.length * 45 + 600
      STEPS.forEach((st, i) => at(run + i * 750, () => set({ kind: 'work', text: st })))
      at(run + STEPS.length * 750, () => set({ kind: 'done', text: '4 steps · 3.1 s' }))
      at(run + STEPS.length * 750 + 2200, () => set({ kind: 'needs', text: 'Password fields wait for you' }))
      at(run + STEPS.length * 750 + 4600, loop)
    }
    loop()
    return () => { alive = false; timers.forEach(clearTimeout) }
  }, [reduced])

  const title = { keys: 'Double-tap', listen: 'Listening', work: 'Working', done: 'Done', needs: 'Needs you' }[s.kind]
  return (
    <div className="pill-slot" aria-live="polite">
      <motion.div className={`pill glass pill-${s.kind}`} layout transition={SPRING}>
        <span className="pill-icon" aria-hidden="true">
          {s.kind === 'keys' && <span className="pill-keys"><kbd>⇧</kbd><kbd>⇧</kbd></span>}
          {s.kind === 'listen' && <Bars />}
          {s.kind === 'work' && <span className="spinner" />}
          {s.kind === 'done' && <CheckCircle size={18} weight="fill" />}
          {s.kind === 'needs' && <HandPalm size={18} weight="fill" />}
        </span>
        <span className="pill-title">{title}</span>
        <AnimatePresence mode="wait" initial={false}>
          {s.text && (
            <motion.span key={s.kind === 'listen' ? 'listen' : s.text} className="pill-text"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}>
              {s.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function Bars() {
  return <span className="bars">{[0, 1, 2, 3].map((i) => <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />)}</span>
}
