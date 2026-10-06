import { motion } from 'framer-motion'
import { reveal } from '../lib.js'

const POINTS = [
  ['Speech stays on your Mac.', 'Apple’s on-device recognizer hears you. Audio leaves only if you pick a cloud transcription model.'],
  ['Keys live in the Keychain.', 'One key per provider. Never written to a file, never shown again after you paste it.'],
  ['Idle means idle.', 'No microphone and no CPU until you press the shortcut. No timers, no polling, no telemetry.'],
  ['Nothing is hidden.', 'Every run is a folder you can open. The code is MIT licensed, every line of it.'],
]

export default function Privacy() {
  return (
    <section className="sec privacy" id="privacy" aria-labelledby="privacy-title">
      <div className="wrap">
        <motion.h2 id="privacy-title" className="statement" {...reveal()}>
          Nothing leaves your Mac <span className="accent">unless you choose.</span>
        </motion.h2>
        <div className="privacy-cols">
          {POINTS.map(([t, d], i) => (
            <motion.div key={t} className="pcol" {...reveal(i + 1)}>
              <h3>{t}</h3>
              <p>{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
