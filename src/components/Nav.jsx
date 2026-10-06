import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { GithubLogo } from '@phosphor-icons/react'
import { REPO } from '../content.js'

const LINKS = [
  ['How it works', '#how'],
  ['Features', '#features'],
  ['Models', '#models'],
  ['Privacy', '#privacy'],
  ['FAQ', '#faq'],
]

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const [solid, setSolid] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 24))
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32 })

  return (
    <header className="nav">
      <nav className={`nav-pill glass ${solid ? 'is-solid' : ''}`} aria-label="Main">
        <a href="#top" className="nav-brand" aria-label="s1 home">
          <img src="./icon.png" alt="" width="24" height="24" />
          <span>s1</span>
        </a>
        <div className="nav-links">
          {LINKS.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <a className="nav-icon" href={REPO} target="_blank" rel="noreferrer" aria-label="s1 on GitHub">
          <GithubLogo size={18} weight="regular" />
        </a>
        <a className="btn btn-accent btn-sm" href="#install">Download</a>
        <motion.span className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
      </nav>
    </header>
  )
}
