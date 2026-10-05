import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const FEATURES = [
  {
    ic: '🎙️', wide: true,
    title: 'Voice-first, not voice-only',
    body: 'Hold a hotkey, speak, let go — s1 hears, plans, acts, and shows you what it did. Talk over it mid-run to barge in: it aborts at the next step and keeps listening. Typing the same command to `s1 run` works identically. Menu-bar app or bare CLI; always-on `s1 serve` if you want it.',
    mini: 's1 listen · s1 run · s1 serve · barge-in on',
  },
  {
    ic: '⚙️', half: true,
    title: 'Deterministic core',
    body: 'A hand-built AX grammar executes known intents with zero model calls — open, type, click flavors, window + tab control, media keys, find — fast, replayable, inspectable. Models are escalation, not the foundation.',
    mini: 's1 run --policy ax',
  },
  {
    ic: '🧠', half: true,
    title: 'Every provider, one list',
    body: 'Settings lists each provider with a pill per role it covers — S1 judge, vision, S2, STT, TTS — and one Connect click wires them all. Groq, OpenAI, Gemini, xAI, OpenRouter (Claude included), Cloudflare, Ollama, or your own OpenAI-compatible box.',
    mini: '~/.s1/providers.json · s1 use <id>',
  },
  {
    ic: '🏠', wide: false,
    title: 'Local-first',
    body: 'On-device STT + TTS, Ollama brains, everything in ~/.s1. Works on a plane.',
    mini: '0 bytes leave without you asking',
  },
  {
    ic: '🛡️', wide: false,
    title: 'Safety gates',
    body: 'Destruction needs words out loud: `s1 run --dry-run` first, confirmations on writes, optional Anthropic srt sandbox for shell steps.',
    mini: 'sandbox: "srt" · off by default',
  },
  {
    ic: '💾', wide: false,
    title: 'Remembers usefully',
    body: 'Memory follows the open Agent Memory Repo spec — a main file plus routed topic files, all readable in ~/.s1. "remember that my editor is Zed" actually sticks.',
    mini: '~/.s1/memory.md + topics',
  },
]

function TiltCard({ f }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 220, damping: 22 })
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 220, damping: 22 })

  return (
    <motion.div
      ref={ref}
      className={`card ${f.wide ? 'wide' : ''} ${f.half ? 'half' : ''}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
        ref.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
        ref.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5) }}
    >
      <div className="glow" />
      <div className="ic">{f.ic}</div>
      <h3>{f.title}</h3>
      <p>{f.body}</p>
      <code className="mini">{f.mini}</code>
    </motion.div>
  )
}

export default function Bento() {
  return (
    <section className="sec" id="features">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">features</span>
          <h2>an agent that stays<br />out of your way.</h2>
          <p className="sub">
            Built like a tool, not a demo — every part inspectable, every
            default chosen so you never have to think about it.
          </p>
        </div>
        <div className="bento">
          {FEATURES.map((f) => <TiltCard key={f.title} f={f} />)}
        </div>
      </div>
    </section>
  )
}
