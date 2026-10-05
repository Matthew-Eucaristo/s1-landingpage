import { motion } from 'framer-motion'

const CREDITS = [
  { n: 's1', d: 'The whole thing — Swift 6, MIT, every line readable.', l: 'MIT' },
  { n: 'cua-driver', d: 'CUA\'s executor driver — optional, install from Settings or onboarding.', l: 'MIT · optional' },
  { n: 'sandbox-runtime', d: 'Anthropic\'s shell sandbox — wrapped step policy, off by default.', l: 'Apache-2.0 · optional' },
  { n: 'Agent Memory Repo', d: 'Cognition\'s open memory spec — s1\'s memory follows it.', l: 'MIT · spec' },
  { n: 'Ollama', d: 'Local brains for the decider, planner and grounder roles.', l: 'runtime' },
  { n: 'WhisperKit-style stack', d: 'SpeechAnalyzer + SFSpeechRecognizer — Apple\'s on-device speech.', l: 'on-device' },
  { n: 'Frankfurter', d: 'Currency rates for the launcher converter.', l: 'endpoint' },
  { n: '…and a clean ATTRIBUTIONS.md', d: 'Every dependency, spec and design reference listed with licenses.', l: 'in-repo' },
]

export default function Oss() {
  return (
    <>
      <section className="sec" id="oss">
        <div className="wrap">
          <div className="sec-head">
            <span className="kicker">open source</span>
            <h2>no black boxes<br />down the stack.</h2>
            <p className="sub">
              s1 is MIT end to end, and so is the philosophy — every borrowed
              idea is credited, every optional tool is just that: optional.
            </p>
          </div>
          <div className="oss-grid">
            {CREDITS.map((c, i) => (
              <motion.div
                key={c.n}
                className="oss-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              >
                <span className="lic">{c.l}</span>
                <b>{c.n}</b>
                {c.d}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-band">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>your mac is already <span className="grad-text">listening</span>.</h2>
            <p className="sub">Free, open source, and yours to audit. Grab the cask or read the source — same thing.</p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#install">get started ↑</a>
              <a className="btn btn-ghost" href="https://github.com/Matthew-Eucaristo/s1" target="_blank" rel="noreferrer">star on github ↗</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
