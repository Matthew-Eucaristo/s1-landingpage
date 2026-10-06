/* A provider's official mark, tinted by CSS (mask), on its brand tile —
   the same badge the app's Settings uses. */
export default function Mark({ p, size = 32, tile = true }) {
  const mark = <span className="mark-glyph" style={{ WebkitMaskImage: `url(./logos/${p.logo})`, maskImage: `url(./logos/${p.logo})` }} />
  if (!tile) return <span className="mark-bare" style={{ width: size, height: size }} role="img" aria-label={p.name}>{mark}</span>
  return (
    <span className="mark-tile" style={{ width: size, height: size, '--tint': p.tint }} role="img" aria-label={p.name}>
      {mark}
    </span>
  )
}
