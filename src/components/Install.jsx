import { useState } from 'react'
import { motion } from 'framer-motion'

function Cmd({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch {}
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <button type="button" className="cmdline" onClick={copy} title="click to copy">
      <code><span className="p">$ </span>{text}</code>
      <span className={`copy-ic${copied ? ' on' : ''}`}>{copied ? 'copied ✓' : 'copy'}</span>
    </button>
  )
}

const STEPS = [
  {
    n: 'step 01', title: 'Install the cask',
    body: 'One package carries the menu-bar app and the `s1` CLI. First run opens a setup wizard — permissions, Cua Driver, keys.',
    cmd: 'brew tap Matthew-Eucaristo/tap && brew install --cask s1',
  },
  {
    n: 'step 02', title: 'Say something',
    body: 'Hold the hotkey and speak — or type it. "open Notes, write todo: ship the site". Dry-run anything first if you want proof.',
    cmd: 's1 listen   # or: s1 run "open Notes, type hello"',
  },
  {
    n: 'step 03', title: 'Make it yours',
    body: 'Point the three roles at local Ollama models, add a preset to providers.json, teach it memory with plain sentences.',
    cmd: 's1 use ollama-nimble && s1 doctor',
  },
]

export default function Install() {
  return (
    <section className="sec" id="install">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">install</span>
          <h2>three commands<br />to a talking mac.</h2>
          <p className="sub">
            Homebrew is the recommended path — GUI + CLI in one cask, real
            signatures, no quarantine dance. Building from source works too.
          </p>
        </div>
        <div className="install-steps">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              className="istep"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <Cmd text={s.cmd} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
