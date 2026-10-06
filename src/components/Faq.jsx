import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from '@phosphor-icons/react'
import { FAQ } from '../content.js'
import { EASE, reveal } from '../lib.js'

/* Answers are always in the HTML (crawlers, find-in-page, no-JS); the
   accordion only animates their height. */
export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="sec" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq">
        <motion.h2 id="faq-title" className="sec-title" {...reveal()}>Questions, answered.</motion.h2>
        <div className="faq-list">
          {FAQ.map((f, i) => {
            const on = open === i
            return (
              <motion.div key={f.q} className={`faq-item ${on ? 'on' : ''}`} {...reveal(i % 3)}>
                <h3>
                  <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-q-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}>
                    <span>{f.q}</span>
                    <motion.span className="faq-ic" animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }}>
                      <Plus size={18} />
                    </motion.span>
                  </button>
                </h3>
                <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a"
                    initial={false} animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: EASE }}>
                  <p>{f.a}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
