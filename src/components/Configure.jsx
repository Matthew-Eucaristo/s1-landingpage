import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Code, Lightning, PuzzlePiece, Plugs, TerminalWindow } from '@phosphor-icons/react'
import { EASE, reveal, useReducedMotion } from '../lib.js'

/* Great defaults, every one of them yours: a settings panel whose values
   change one row at a time, then the ways to extend s1. */

const ROWS = [
  { k: 'Judge', sys: 'System 1', v: ['Jev', 'd1', 'Clef Flash', 'Off, grammar only'] },
  { k: 'Reasoner', sys: 'System 2', v: ['DeepSeek V4.1 Flash', 'Claude Sonnet 4.5', 'qwen3 on your Mac'] },
  { k: 'Screen', v: ['Models that can see', 'Off, accessibility only'] },
  { k: 'Hearing', v: ['On-device', 'Whisper on Groq'] },
  { k: 'Voice', v: ['Apple voices', 'OpenAI voices'] },
  { k: 'Accent', v: ['s1 orange', 'System accent'], dot: ['var(--accent)', '#0a84ff'] },
]

const EXTEND = [
  { icon: Plugs, t: 'Any model server', d: 'OpenAI-compatible endpoints: vLLM, MLX, your own.' },
  { icon: Code, t: 'Your own brain', d: 'Write a Judge or Reasoner in Swift.' },
  { icon: Lightning, t: 'Skills and Shortcuts', d: 'Save a sequence by voice. Call s1 from Siri.' },
  { icon: TerminalWindow, t: 'Scripts', d: 'The s1 CLI runs and replays anything the app does.' },
  { icon: PuzzlePiece, t: 'Plugins', d: 'New actions, providers and skills.', soon: true },
]

export default function Configure() {
  const panel = useRef(null)
  const inView = useInView(panel, { amount: 0.4 })
  const reduced = useReducedMotion()
  const [at, setAt] = useState(() => ROWS.map(() => 0))

  useEffect(() => {
    if (!inView || reduced) return
    let row = 0
    const id = setInterval(() => {
      setAt((a) => a.map((n, i) => (i === row ? (n + 1) % ROWS[i].v.length : n)))
      row = (row + 1) % ROWS.length
    }, 1400)
    return () => clearInterval(id)
  }, [inView, reduced])

  return (
    <section className="sec" id="configure" aria-labelledby="configure-title">
      <div className="wrap config">
        <motion.div className="config-head" {...reveal()}>
          <h2 id="configure-title" className="sec-title">Great defaults.<br />Yours to change.</h2>
          <p className="sec-sub">
            s1 works the moment it opens. Change any default in Settings, with one command, or in
            a plain JSON file you can read.
          </p>
        </motion.div>

        <motion.dl className="config-panel" ref={panel} {...reveal(1)}>
          {ROWS.map((r, i) => (
            <div className="config-row" key={r.k}>
              <dt>{r.k}{r.sys && <span className="config-sys">{r.sys}</span>}</dt>
              <dd>
                {/* Crawlers and screen readers get every option. */}
                <span className="sr-only">{r.v.join(', ')}</span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={at[i]} className="config-val" aria-hidden="true"
                    initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: EASE }}>
                    {r.dot && <i className="config-dot" style={{ background: r.dot[at[i]] }} />}
                    {r.v[at[i]]}
                  </motion.span>
                </AnimatePresence>
              </dd>
            </div>
          ))}
        </motion.dl>

        <ul className="extend" aria-label="Ways to extend s1">
          {EXTEND.map(({ icon: Icon, t, d, soon }, i) => (
            <motion.li key={t} className={soon ? 'soon' : ''} {...reveal(i + 2)}>
              <Icon size={22} weight="duotone" aria-hidden="true" />
              <h3>{t}{soon && <span className="config-soon">Roadmap</span>}</h3>
              <p>{d}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
