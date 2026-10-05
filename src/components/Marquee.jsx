const ITEMS = [
  ['voice → action', 'on-device stt'],
  ['barge-in', 'talk over it'],
  ['deterministic', 'ax grammar'],
  ['media + window keys', 'no model calls'],
  ['hybrid brain', 's1 + s2'],
  ['safety gates', 'dry-run first'],
  ['plain config', '~/.s1/*.json'],
  ['provider pills', 'one-click connect'],
  ['local models', 'ollama · mlx'],
  ['cloud optional', 'any openai api'],
  ['memory', 'agent memory repo'],
  ['sandboxed shell', 'anthropic srt'],
  ['fully open source', 'mit'],
]

export default function Marquee() {
  const row = ITEMS.map(([b, s], i) => (
    <span key={i}><b>{b}</b> <span className="s-dot">◆</span> {s}</span>
  ))
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row}
        {row.map((el, i) => ({ ...el, key: `b${i}` }))}
      </div>
    </div>
  )
}
