import { PROVIDERS } from '../content.js'

/* The page's one marquee: official wordmarks of the providers s1 talks to.
   Logos only; the names live in alt text. */
const WORDMARK = { typesafe: null }

function Item({ p }) {
  if (WORDMARK[p.id] === null) {
    return (
      <li className="mq-item">
        <span className="mq-mark" style={{ WebkitMaskImage: `url(./logos/${p.logo})`, maskImage: `url(./logos/${p.logo})` }} role="img" aria-label={p.name} />
        <span className="mq-word" aria-hidden="true">{p.name}</span>
      </li>
    )
  }
  return (
    <li className="mq-item">
      <img className="mq-logo" src={`./logos/text/${p.id}.svg`} alt={p.name} height="22" loading="lazy" />
    </li>
  )
}

export default function LogoMarquee() {
  const row = (k) => PROVIDERS.map((p) => <Item key={`${p.id}-${k}`} p={p} />)
  return (
    <section className="marquee" aria-label="Works with these model providers">
      <p className="mq-label">Works with the models you already use</p>
      <div className="mq-viewport">
        <div className="mq-track">
          <ul>{row('a')}</ul>
          <ul aria-hidden="true">{row('b')}</ul>
        </div>
      </div>
    </section>
  )
}
