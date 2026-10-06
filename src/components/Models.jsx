import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, TreeStructure } from '@phosphor-icons/react'
import { PROVIDERS, ROLES } from '../content.js'
import { reveal } from '../lib.js'
import Mark from './Mark.jsx'

/* One model per job. Pick (hover, focus or tap) a provider to see which
   jobs it can do and whether its pick sees the screen. */
export default function Models() {
  const [id, setId] = useState('groq')
  const p = PROVIDERS.find((x) => x.id === id)

  return (
    <section className="sec" id="models" aria-labelledby="models-title">
      <div className="wrap">
        <motion.div className="models-head" {...reveal()}>
          <h2 id="models-title" className="sec-title">One model per job.<br />Bring any. Or none.</h2>
          <p className="sec-sub">
            Connect a provider once with one key, kept in your Keychain. It fills in a recommended
            Judge (System 1) and Reasoner (System 2); swap either, or add cloud voices, anytime.
          </p>
        </motion.div>

        <motion.div className="models" {...reveal(1)}>
          <ul className="prov-list" aria-label="Providers">
            {PROVIDERS.map((x) => (
              <li key={x.id}>
                <button type="button" className={`prov ${x.id === id ? 'on' : ''}`} aria-pressed={x.id === id}
                  onMouseEnter={() => setId(x.id)} onFocus={() => setId(x.id)} onClick={() => setId(x.id)}>
                  <Mark p={x} size={30} />
                  <span className="prov-name">{x.name}</span>
                  {x.local && <span className="prov-local">On your Mac</span>}
                </button>
              </li>
            ))}
          </ul>

          <div className="jobs" aria-live="polite">
            <div className="jobs-head">
              <Mark p={p} size={44} />
              <div>
                <p className="jobs-name">{p.name}</p>
                <p className="jobs-pick">Recommended: {p.pick}</p>
              </div>
            </div>
            <ul className="job-list">
              {ROLES.map((r) => {
                const can = p.roles.includes(r.id)
                const sees = p.sees?.includes(r.id)
                return (
                  <motion.li key={r.id} className={`job ${can ? 'can' : ''}`} initial={false}
                    animate={{ opacity: can ? 1 : 0.38 }} transition={{ duration: 0.3 }}>
                    <span className="job-brain">{r.brain}</span>
                    <span className="job-name">{r.name}</span>
                    <span className="job-d">{r.d}</span>
                    {can && sees && <span className="job-sees"><Eye size={14} weight="bold" /> Sees the screen</span>}
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </motion.div>

        <motion.ol className="vision-rule" aria-label="Who sees the screen" {...reveal(2)}>
          <li><Eye size={18} /><span><b>Judge can see?</b> It gets the screenshots.</span></li>
          <li aria-hidden="true" className="vr-arrow"><ArrowRight size={16} /></li>
          <li><Eye size={18} /><span><b>Otherwise the Reasoner?</b> It sees each step it takes over.</span></li>
          <li aria-hidden="true" className="vr-arrow"><ArrowRight size={16} /></li>
          <li><TreeStructure size={18} /><span><b>Neither?</b> s1 reads the accessibility tree only.</span></li>
        </motion.ol>
      </div>
    </section>
  )
}
