import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STAGES = [
  {
    n: '01', title: 'listen',
    sub: 'Voice lands as text — on-device, always. Interruptible, always.',
    body: 'SpeechAnalyzer on macOS 26 with an SFSpeechRecognizer fallback, tunable turn-end detection (auto or energy-only VAD, three sensitivities). While s1 works or talks, an echo-cancelled monitor listens back — speak up and it stops. Installed app names feed the recognizer automatically, so "open Linear" just lands.',
    pre: `$ s1 listen
listening… {hl}"open Notes, write the plan"{hl}
transcript · en-US · 1.2s · on-device`,
  },
  {
    n: '02', title: 'parse',
    sub: 'A deterministic grammar before any model.',
    body: 'Known intents — open, type, press, scroll, wait, verify, done, plus window/tab/app control, media keys, double/right click, and find — resolve through the shared AX grammar with zero model calls. Fast, replayable, honest about what it will do.',
    pre: `intent {hl2}open{hl2}  app=com.apple.Notes
intent {hl2}type{hl2}  "the plan"
intent {hl2}verify{hl2} text on screen
{hl3}3 steps · 0 model calls{hl3}`,
  },
  {
    n: '03', title: 'decide',
    sub: 'A small model judges every step.',
    body: 'Each step gets a confidence score from the S1 decision model — nimble on Ollama, Jev hosted, or nothing at all. Low confidence escalates to S2, a reasoning model that plans the next step. Below the floor, it asks you.',
    pre: `step 4 · confidence {hl}0.41{hl} → S2
reason: "new UI, no grammar yet"
S2 → click "Appearance"
verify → {hl3}on-screen ✓{hl3}`,
  },
  {
    n: '04', title: 'act',
    sub: 'Accessibility-first control. Screenshots only when needed.',
    body: 's1 reads the AX tree and acts on real UI elements — buttons, fields, menus — not pixels. A click grounder or VLM only fires for targets with no accessibility label. Every step is verified and logged.',
    pre: `AXButton "Save" → press()        {hl3}✓{hl3}
AXTextField title → set(v)      {hl3}✓{hl3}
canvas (no label) → grounder    {hl3}612, 384{hl3}
artifacts → ~/.s1/artifacts/`,
  },
]

/* tiny syntax painter for the stage card */
function Colored({ text }) {
  const parts = text.split(/(\{hl3?\}|\{hl2\})/)
  let mode = ''
  return (
    <pre>
      {parts.map((p, i) => {
        if (p === '{hl}') { mode = 'hl'; return null }
        if (p === '{hl2}') { mode = 'hl2'; return null }
        if (p === '{hl3}') { mode = 'hl3'; return null }
        return mode ? <span key={i} className={mode}>{p}</span> : <span key={i}>{p}</span>
      })}
    </pre>
  )
}

export default function Pipeline() {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i))
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    refs.current.forEach((r) => r && io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section className="sec" id="how">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">how it works</span>
          <h2>four verbs.<br />zero magic.</h2>
          <p className="sub">
            Every run is the same loop — hear, parse, decide, act. Deterministic
            steps stay deterministic; models only enter where judgment is
            actually needed.
          </p>
        </div>
        <div className="pipe">
          <div className="pipe-steps">
            {STAGES.map((s, i) => (
              <div
                key={s.n}
                ref={(r) => (refs.current[i] = r)}
                data-i={i}
                className={`pipe-step ${active === i ? 'active' : ''}`}
              >
                <span className="n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="pipe-viz">
            <motion.div
              key={active}
              className="pipe-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="big-glyph">{STAGES[active].n}</span>
              <span className="stage-label">{STAGES[active].title}</span>
              <Colored text={STAGES[active].pre} />
              <p style={{ fontSize: 14, color: 'var(--text-dim)', marginTop: 22 }}>
                {STAGES[active].body}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
