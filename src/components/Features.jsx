import { motion } from 'framer-motion'
import { CheckCircle, HandPalm, Prohibit } from '@phosphor-icons/react'
import { reveal } from '../lib.js'

function Cell({ className = '', title, body, children, i }) {
  return (
    <motion.article className={`cell ${className}`} {...reveal(i)}>
      <div className="cell-visual" aria-hidden="true">{children}</div>
      <div className="cell-copy">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </motion.article>
  )
}

const bars = (n, cls) => Array.from({ length: n }, (_, i) => <i key={i} className={cls} style={{ '--i': i % 9 }} />)

export default function Features() {
  return (
    <section className="sec" id="features" aria-labelledby="features-title">
      <div className="wrap">
        <motion.h2 id="features-title" className="sec-title" {...reveal()}>
          Everything a Mac assistant should have been.
        </motion.h2>

        <div className="bento">
          <Cell className="c-evidence" i={0} title="Every step is evidence."
            body="Each run keeps what s1 did, which brain decided it and why, plus any screenshots. Search it all in the history.">
            <div className="shot-crop">
              <img src="./shots/app.png" alt="" width="1321" height="861" loading="lazy" />
            </div>
          </Cell>

          <Cell className="c-gate" i={1} title="Careful by design."
            body="A safety gate sees every action first. Passwords, payments and anything irreversible wait for you.">
            <ul className="gate">
              <li><CheckCircle size={18} weight="fill" className="g-ok" />Open Safari</li>
              <li><CheckCircle size={18} weight="fill" className="g-ok" />Type “hello”</li>
              <li><HandPalm size={18} weight="fill" className="g-hold" />Fill a password field</li>
              <li><Prohibit size={18} weight="bold" className="g-no" />Delete ~/Documents</li>
            </ul>
          </Cell>

          <Cell className="c-barge" i={2} title="Talk over it."
            body="s1 keeps listening while it works or speaks. Say anything and it stops, then hears what’s next.">
            <div className="barge">
              <div className="barge-row"><span>s1</span><div className="barge-bars">{bars(22, 'b-s1')}</div></div>
              <div className="barge-row"><span>you</span><div className="barge-bars">{bars(22, 'b-you')}</div></div>
            </div>
          </Cell>

          <Cell className="c-lang" i={3} title="Speaks your language."
            body="On-device speech in 14 languages. The grammar is fluent in English and Indonesian; your reasoner reads the rest.">
            <div className="lang">
              <div className="lang-roll">
                <span>open Notes</span><span>buka Notes</span><span>abre Notas</span>
                <span>öffne Notizen</span><span>volume up</span><span>open Notes</span>
              </div>
            </div>
          </Cell>

          <Cell className="c-launch" i={4} title="A launcher, too."
            body="⌥Space opens apps, files and snippets, converts units and currencies, and hands anything else to s1.">
            <div className="launch">
              <div className="launch-q">100 usd to idr<span className="caret" /></div>
              <div className="launch-r on"><span>Convert currency</span><kbd>↩</kbd></div>
              <div className="launch-r"><span>Ask s1</span><kbd>⌘↩</kbd></div>
            </div>
          </Cell>

          <Cell className="c-dictate" i={5} title="Dictate anywhere."
            body="Hold ⌃⌥D in any app, speak, let go. The words land where you were typing.">
            <div className="dictate">
              <div className="keys"><kbd>⌃</kbd><kbd>⌥</kbd><kbd>D</kbd></div>
              <div className="typed"><span>Running ten minutes late, start without me</span></div>
            </div>
          </Cell>
        </div>
      </div>
    </section>
  )
}
