import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import LogoMarquee from './components/LogoMarquee.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Features from './components/Features.jsx'
import Models from './components/Models.jsx'
import Configure from './components/Configure.jsx'
import Privacy from './components/Privacy.jsx'
import Cli from './components/Cli.jsx'
import Faq from './components/Faq.jsx'
import Install from './components/Install.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    // "user": every Motion animation honours prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <LogoMarquee />
        <HowItWorks />
        <Features />
        <Models />
        <Configure />
        <Privacy />
        <Cli />
        <Faq />
        <Install />
      </main>
      <Footer />
    </MotionConfig>
  )
}
