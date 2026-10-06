import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { reveal, useReducedMotion } from '../lib.js'

/* Real s1 output, replayed: the command types itself (animejs drives the
   caret and the line stagger), then the output lands line by line. */
const SESSIONS = [
  {
    cmd: 's1 run --goal "open Notes, press cmd n, type standup: shipped the fix" --dry-run',
    out: [
      ['[0] s1:ax 0.90 openApp(name: "Notes") → [dry-run] openApp(name: "Notes")', 'ok'],
      ['[1] s1:ax 0.95 keyCombo(keys: ["cmd", "n"]) → [dry-run] keyCombo(keys: ["cmd", "n"])', 'ok'],
      ['[2] s1:ax 0.95 typeText("standup: shipped the fix") → [dry-run] typeText(…)', 'ok'],
      ['[3] s1:ax 0.95 done(summary: "goal completed")', 'ok'],
      ['status: done | steps: 4 | escalations: 0', 'hi'],
    ],
  },
  {
    cmd: 's1 connect opencode',
    out: [
      ['OpenCode Go API key (Enter keeps the saved one) - https://opencode.ai: ', 'dim'],
      ['✓ OpenCode Go: 36 models · 412 ms', 'ok'],
      ['connected opencode', ''],
      ['  reasoner    → opencode/deepseek-v4.1-flash', 'hi'],
    ],
  },
  {
    cmd: 's1 use',
    out: [
      ['judge       typesafe/jev-latest', ''],
      ['reasoner    openrouter/google/gemini-2.5-flash  · sees the screen', 'hi'],
      ['transcribe  on-device (Apple)', 'dim'],
      ['speak       on-device (Apple)', 'dim'],
    ],
  },
]

export default function Cli() {
  return (
    <section className="sec" id="cli" aria-labelledby="cli-title">
      <div className="wrap cli">
        <motion.div className="cli-copy" {...reveal()}>
          <h2 id="cli-title" className="sec-title">The same brain,<br />in your terminal.</h2>
          <p className="sec-sub">
            The app and the <code>s1</code> command share one config, one history and one brain.
            Script it, run it over SSH, or keep it listening with launchd.
          </p>
        </motion.div>
        <motion.div {...reveal(1)}>
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}

function Terminal() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)
  const [typed, setTyped] = useState('')
  const [lines, setLines] = useState(0)
  const s = SESSIONS[n % SESSIONS.length]

  useEffect(() => {
    if (!inView) return
    if (reduced) { setTyped(s.cmd); setLines(s.out.length); return }
    let alive = true
    let anim
    setTyped(''); setLines(0)
    import('animejs/lib/anime.es.js').then(({ default: anime }) => {
      if (!alive) return
      const state = { c: 0 }
      anim = anime.timeline({ easing: 'linear' })
        .add({
          targets: state, c: s.cmd.length, duration: s.cmd.length * 28,
          update: () => alive && setTyped(s.cmd.slice(0, Math.round(state.c))),
        })
        .add({
          targets: state, c: s.cmd.length + s.out.length, duration: s.out.length * 320, delay: 250,
          easing: 'steps(' + s.out.length + ')',
          update: () => alive && setLines(Math.round(state.c) - s.cmd.length),
        })
        .add({ targets: state, c: state.c, duration: 2600, complete: () => alive && setN((x) => x + 1) })
    })
    return () => { alive = false; anim?.pause() }
  }, [n, inView, reduced])

  return (
    <figure className="term" ref={ref} aria-label="Terminal session with the s1 command">
      <div className="term-bar"><i /><i /><i /><span>zsh</span></div>
      <div className="term-body">
        <div className="t-line"><span className="t-p">$ </span>{typed}{lines === 0 && <span className="t-caret" />}</div>
        {s.out.slice(0, lines).map(([t, c], i) => (
          <div key={`${n}-${i}`} className={`t-line t-${c || 'out'}`}>{t}</div>
        ))}
        {lines > 0 && <div className="t-line"><span className="t-p">$ </span><span className="t-caret" /></div>}
      </div>
      {/* The full sessions as text, for readers and crawlers. */}
      <figcaption className="sr-only">
        {SESSIONS.map((x) => `$ ${x.cmd}\n${x.out.map((o) => o[0]).join('\n')}`).join('\n\n')}
      </figcaption>
    </figure>
  )
}
