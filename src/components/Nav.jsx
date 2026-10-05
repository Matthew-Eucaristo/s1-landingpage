import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="nav-logo"><span className="dot" />s1</a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#config">Config</a>
          <a href="#oss">Open source</a>
        </div>
        <a className="nav-cta" href="https://github.com/Matthew-Eucaristo/s1" target="_blank" rel="noreferrer">
          github ↗
        </a>
      </div>
      <motion.div className="nav-progress" style={{ scaleX: progress, transformOrigin: '0 50%' }} />
    </nav>
  )
}
