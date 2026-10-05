import { motion } from 'framer-motion'

const FILES = [
  ['config.json', 'endpoints, hotkeys, gates, sandbox'],
  ['providers.json', 'the preset catalog behind every menu'],
  ['convert.json', 'your own unit + currency aliases'],
  ['snippets.json', 'text expansion for dictation'],
  ['memory.md + memory/', 'agent memory — facts and topics'],
  ['skills/*.json', 'reusable named workflows'],
  ['tasks/*.txt', 'task library for s1 run --file'],
  ['srt-settings.json', 'shell sandbox policy (opt-in)'],
]

const PROVIDERS = `{
  "presets": [
    {
      "id": "typesafe-jev",
      "role": "decision",
      "label": "TypeSafe · Jev (recommended)",
      "base": "https://api.typesafe.ai",
      "model": "jev-latest",
      "recommended": true
    },
    {
      "id": "ollama-nimble",
      "role": "decision",
      "label": "Local · Ollama nimble 9B",
      "base": "http://localhost:11434",
      "model": "nimble"
    }
  ]
}`

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
})

export default function Config() {
  return (
    <section className="sec" id="config">
      <div className="wrap cfg">
        <motion.div {...rise(0)}>
          <span className="kicker">standardized config</span>
          <h2 style={{ marginTop: 18 }}>everything is<br />a file.</h2>
          <p className="sub" style={{ marginTop: 18 }}>
            No hidden state, no lock-in. Every tunable lives in{' '}
            <code className="mono" style={{ color: 'var(--cyan)' }}>~/.s1</code> as
            plain JSON or Markdown — editable in your editor, checkable with{' '}
            <code className="mono" style={{ color: 'var(--cyan)' }}>s1 doctor</code>,
            seedable by default.
          </p>
          <div className="cfg-files">
            {FILES.map(([f, d]) => (
              <div className="cfg-file" key={f}>
                <span className="f">{f}</span>
                <span className="d">{d}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...rise(1)}>
          <div className="term">
            <div className="term-bar">
              <i /><i /><i />
              <span className="term-title">~/.s1/providers.json — swap brains without a rebuild</span>
            </div>
            <pre className="term-body" style={{ minHeight: 0, fontSize: 12.5 }}>
              {PROVIDERS}
            </pre>
          </div>
          <div className="term" style={{ marginTop: 14 }}>
            <div className="term-bar">
              <i /><i /><i />
              <span className="term-title">and the cli agrees</span>
            </div>
            <pre className="term-body" style={{ minHeight: 0, fontSize: 12.5 }}>
{`$ s1 use ollama-nimble
✓ decision → nimble @ http://localhost:11434
$ s1 doctor
✓ 10 checks passed`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
