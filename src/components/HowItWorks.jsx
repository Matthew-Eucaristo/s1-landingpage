import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { EASE } from '../lib.js'

/* Pinned scroll story: four chapters over one live pipeline. Each chapter
   lights the part of the pipeline it explains. */

const CHAPTERS = [
  {
    k: 'Grammar',
    title: 'Instant for the everyday.',
    body: 'The built-in grammar turns “open Notes, new note, type hello” into steps and runs them. No model, no network, no wait. It works before you connect anything.',
    nodes: ['you', 's1', 'gate', 'act', 'log'],
    edges: ['you-s1', 's1-gate', 'gate-act', 'act-log'],
  },
  {
    k: 'Judge',
    title: 'A second opinion where it counts.',
    body: 'System 1 is the Judge: a small, fast decision model. Two Send buttons? It picks the right one. Typed something? It checks the goal really happened. Exact steps stay instant, and it can only add caution.',
    nodes: ['you', 's1', 'judge', 'gate', 'act', 'log'],
    edges: ['you-s1', 's1-judge', 's1-gate', 'gate-act', 'act-log'],
  },
  {
    k: 'Reasoner',
    title: 'Real reasoning when it’s new.',
    body: 'System 2 is the Reasoner: the LLM you pick. When the grammar doesn’t know a command or the Judge is unsure, it plans the task into plain steps and System 1 runs them.',
    nodes: ['you', 's1', 'judge', 's2', 'gate', 'act', 'log'],
    edges: ['you-s1', 's1-judge', 'judge-s2', 's2-gate', 'gate-act', 'act-log'],
  },
  {
    k: 'Vision',
    title: 'It looks when it can.',
    body: 'If your Judge reads images, it sees the screen. If not, the Reasoner does. If neither can, s1 uses the accessibility tree alone. On by default, one switch to turn off.',
    nodes: ['screen', 'you', 's1', 'judge', 's2', 'gate', 'act', 'log'],
    edges: ['screen-judge', 'screen-s2', 'you-s1', 's1-judge', 'judge-s2', 's2-gate', 'gate-act', 'act-log'],
  },
]

const N = {
  screen: { x: 70, y: 70, label: 'Screen', sub: 'when a model can see' },
  you: { x: 70, y: 190, label: 'You', sub: 'voice or text' },
  s1: { x: 220, y: 190, label: 'Grammar', sub: 'built in, no model' },
  judge: { x: 220, y: 70, label: 'Judge', sub: 'System 1' },
  s2: { x: 370, y: 70, label: 'Reasoner', sub: 'System 2' },
  gate: { x: 370, y: 190, label: 'Safety gate', sub: 'every action' },
  act: { x: 370, y: 310, label: 'Act', sub: 'accessibility, input' },
  log: { x: 220, y: 310, label: 'Verify and log', sub: 'evidence' },
}

const E = {
  'screen-judge': 'M126 70 H164',
  'screen-s2': 'M70 42 C 70 6, 370 6, 370 42',
  'you-s1': 'M126 190 H164',
  's1-judge': 'M220 162 V98',
  's1-gate': 'M276 190 H314',
  'judge-s2': 'M276 70 H314',
  's2-gate': 'M370 98 V162',
  'gate-act': 'M370 218 V282',
  'act-log': 'M314 310 H276',
}

export default function HowItWorks() {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setI(Math.min(3, Math.max(0, Math.floor(v * 4)))))
  const ch = CHAPTERS[i]
  const on = new Set(ch.nodes)
  const lit = new Set(ch.edges)

  return (
    <section className="how" id="how" ref={ref} aria-labelledby="how-title">
      <div className="how-pin">
        <div className="wrap how-grid">
          <div className="how-copy">
            <h2 id="how-title" className="sr-only">How s1 works</h2>
            <div className="how-tabs" role="tablist" aria-label="How s1 works">
              {CHAPTERS.map((c, n) => (
                <button key={c.k} type="button" role="tab" aria-selected={n === i}
                  className={n === i ? 'on' : ''} onClick={() => setI(n)}>{c.k}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: EASE }}>
                <h3 className="how-title">{ch.title}</h3>
                <p className="how-body">{ch.body}</p>
              </motion.div>
            </AnimatePresence>
            {/* Every chapter in plain text for readers and crawlers. */}
            <ol className="sr-only">
              {CHAPTERS.map((c) => <li key={c.k}>{c.title} {c.body}</li>)}
            </ol>
          </div>

          <div className="how-diagram" aria-hidden="true">
            <svg viewBox="0 0 440 360">
              {Object.entries(E).map(([id, d]) => (
                <g key={id}>
                  <path d={d} className="edge" />
                  <motion.path d={d} className="edge-lit" initial={false}
                    animate={{ pathLength: lit.has(id) ? 1 : 0, opacity: lit.has(id) ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: EASE }} />
                </g>
              ))}
              {Object.entries(N).map(([id, n]) => (
                <motion.g key={id} initial={false}
                  animate={{ opacity: on.has(id) ? 1 : 0.25 }}
                  transition={{ duration: 0.5, ease: EASE }}>
                  <rect x={n.x - 56} y={n.y - 28} width="112" height="56" rx="14"
                    className={`node ${on.has(id) ? 'on' : ''} node-${id}`} />
                  <text x={n.x} y={n.y - 2} className="node-l">{n.label}</text>
                  <text x={n.x} y={n.y + 15} className="node-s">{n.sub}</text>
                </motion.g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
