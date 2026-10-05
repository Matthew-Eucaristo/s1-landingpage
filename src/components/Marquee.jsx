const ITEMS = [
  ['voice → action', 'on-device stt'],
  ['deterministic', 'ax grammar'],
  ['hybrid brain', 's1 + s2'],
  ['safety gates', 'dry-run first'],
  ['plain config', '~/.s1/*.json'],
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
