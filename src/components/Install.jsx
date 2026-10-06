import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy } from '@phosphor-icons/react'
import { BREW, REPO } from '../content.js'
import { copyText, reveal } from '../lib.js'

function CopyCmd() {
  const [done, setDone] = useState(false)
  return (
    <button type="button" className="copy" aria-label="Copy the Homebrew install command" onClick={async () => {
      await copyText(BREW); setDone(true); setTimeout(() => setDone(false), 1600)
    }}>
      <code><span className="t-p">$</span> brew install --cask s1</code>
      <span className={`copy-ic ${done ? 'on' : ''}`}>{done ? <Check size={16} weight="bold" /> : <Copy size={16} />}</span>
    </button>
  )
}

const STEPS = [
  ['Install', 'One cask: the app, with the s1 command on your PATH.'],
  ['Allow Accessibility', 'Setup walks you through it. It’s the only permission s1 needs.'],
  ['Double-tap ⇧', 'Say “open Notes”. Connect a model later, when you want more.'],
]

export default function Install() {
  return (
    <section className="sec" id="install" aria-labelledby="install-title">
      <div className="wrap">
        <motion.div className="install" {...reveal()}>
          <img className="install-icon" src="./icon-192.png" alt="" width="88" height="88" loading="lazy" />
          <h2 id="install-title" className="sec-title">Talking to your Mac<br />in under a minute.</h2>
          <CopyCmd />
          <p className="install-alt">
            Or download the app from <a href={`${REPO}/releases/latest`} target="_blank" rel="noreferrer">GitHub Releases</a>.
            Free and MIT licensed. macOS 26 or later.
          </p>
          <ol className="install-steps">
            {STEPS.map(([t, d], i) => (
              <motion.li key={t} {...reveal(i + 1)}>
                <h3>{t}</h3>
                <p>{d}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
