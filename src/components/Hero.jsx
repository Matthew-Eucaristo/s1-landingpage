import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Terminal from './Terminal.jsx'

const EASE = [0.16, 1, 0.3, 1]
const fade = (i = 0) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.12 * i, ease: EASE },
})

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const termY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const headY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section className="hero" ref={ref} id="top">
      <div className="hero-grid" />
      <motion.div className="orb orb-a" animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="orb orb-b" animate={{ x: [0, -50, 0], y: [0, 40, 0] }} transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="orb orb-c" animate={{ x: [0, 30, -20, 0], y: [0, -30, 10, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />

      <motion.div {...fade(0)}>
        <div className="hero-badge">
          open source · MIT
          <span className="pill">v0.2</span>
        </div>
      </motion.div>

      <motion.h1 {...fade(1)} style={{ y: headY }}>
        your mac,<br />on <span className="grad-text">voice</span>.
      </motion.h1>

      <motion.p className="sub" {...fade(2)}>
        <em>s1</em> is a voice-first agent that actually drives macOS — deterministic
        where it can be, intelligent where it must be. On-device speech,
        accessibility-native control, three-role brains you can swap. No cloud
        required. No black box.
      </motion.p>

      <motion.div className="hero-ctas" {...fade(3)}>
        <a className="btn btn-primary" href="#install">brew install s1 ↓</a>
        <a className="btn btn-ghost" href="https://github.com/Matthew-Eucaristo/s1" target="_blank" rel="noreferrer">view on github ↗</a>
      </motion.div>

      <motion.div className="hero-meta" {...fade(4)}>
        <span>swift 6</span>
        <span>on-device stt / tts</span>
        <span>ax-first</span>
        <span>176 tests</span>
        <span>14 languages · chat ui</span>
      </motion.div>

      <motion.div className="hero-term" style={{ y: termY }} {...fade(5)}>
        <Terminal />
      </motion.div>

      <div className="scroll-hint">
        <span className="line" />
        scroll
      </div>
    </section>
  )
}
