import { useEffect, useRef } from 'react'
import anime from 'animejs/lib/anime.es.js'

/* Scripts replayed in the hero terminal — real-shaped s1 sessions. */
const SCRIPTS = [
  {
    cmd: 's1 listen',
    lines: [
      { t: 'listening… "open Notes, type standup: shipped the login fix"', c: 'out' },
      { t: '→ plan (s1:ax) · 3 steps', c: 'info' },
      { t: '  ✓ open com.apple.Notes', c: 'ok' },
      { t: '  ✓ type "standup: shipped the login fix"', c: 'ok' },
      { t: '  ✓ verify — text on screen', c: 'ok' },
      { t: 'done · 4.1s · 0 model calls · deterministic', c: 'dim' },
    ],
  },
  {
    cmd: 's1 run "find the setting for dark mode in Settings"',
    lines: [
      { t: '→ plan (s1+s2) · new UI, no grammar yet — escalate', c: 'info' },
      { t: '  ✓ open com.apple.systempreferences', c: 'ok' },
      { t: '  · observing AX tree …', c: 'out' },
      { t: '  ⚠ step 4 confidence 0.41 → S2 reasoned', c: 'warn' },
      { t: '  ✓ click "Appearance" (grounder: 612, 384)', c: 'ok' },
      { t: 'done · verified on-screen · artifacts in ~/.s1/artifacts/', c: 'dim' },
    ],
  },
  {
    cmd: 's1 doctor',
    lines: [
      { t: '  ✓ ~/.s1/config.json · 3 roles configured', c: 'ok' },
      { t: '  ✓ providers.json · default catalog, 38 presets, 12 families', c: 'ok' },
      { t: '  ✓ convert.json · valid (2 custom units)', c: 'ok' },
      { t: '  ✓ cua-driver · installed at ~/.local/bin/cua-driver', c: 'ok' },
      { t: '  ✓ memory.md · 14 facts, 3 topic files', c: 'ok' },
      { t: 'all checks passed', c: 'info' },
    ],
  },
]

const T2 = /\{\{b\}\}/g // unused guard, kept minimal
export default function Terminal({ title = 's1 — zsh', autoPlay = true, script }) {
  const bodyRef = useRef(null)
  const caretRef = useRef(null)
  const timerRef = useRef([])

  useEffect(() => {
    if (!autoPlay) return
    let cancelled = false
    const timers = timerRef.current
    const push = (fn, ms) => timers.push(setTimeout(fn, ms))

    async function play() {
      let i = 0
      while (!cancelled) {
        const s = (script ? [script] : SCRIPTS)[i % (script ? 1 : SCRIPTS.length)]
        const body = bodyRef.current
        if (!body) return
        // clear
        body.innerHTML = ''
        const cmdLine = document.createElement('div')
        cmdLine.className = 'term-line'
        const prompt = document.createElement('span')
        prompt.className = 'term-prompt'
        prompt.textContent = '$ '
        const cmdSpan = document.createElement('span')
        cmdSpan.className = 'term-cmd'
        cmdLine.appendChild(prompt)
        cmdLine.appendChild(cmdSpan)
        body.appendChild(cmdLine)
        const caret = document.createElement('span')
        caret.className = 'term-caret'
        cmdLine.appendChild(caret)
        // typewriter
        await new Promise((res) => {
          let k = 0
          const tick = () => {
            if (cancelled) return res()
            cmdSpan.textContent = s.cmd.slice(0, ++k)
            if (k < s.cmd.length) push(tick, 26 + Math.random() * 40)
            else res()
          }
          tick()
        })
        if (cancelled) return
        // move caret to a fresh last line
        const lastLine = document.createElement('div')
        lastLine.className = 'term-line'
        lastLine.appendChild(caret)
        // output lines, anime-staggered
        await new Promise((res) => {
          s.lines.forEach((l, idx) => {
            push(() => {
              if (cancelled) return
              const el = document.createElement('div')
              el.className = `term-line ${l.c}`
              el.textContent = l.t
              el.style.opacity = '0'
              el.style.transform = 'translateY(6px)'
              body.insertBefore(el, lastLine)
              anime({
                targets: el,
                opacity: [0, 1],
                translateY: [6, 0],
                duration: 420,
                easing: 'easeOutQuad',
              })
            }, 340 + idx * 340)
          })
          body.appendChild(lastLine)
          push(res, 340 + s.lines.length * 340 + 300)
        })
        if (cancelled) return
        push(() => {}, 0)
        await new Promise((res) => push(res, 3200))
        i++
      }
    }
    play()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [autoPlay, script])

  return (
    <div className="term">
      <div className="term-bar">
        <i /><i /><i />
        <span className="term-title">{title}</span>
      </div>
      <div className="term-body" ref={bodyRef}>
        <div className="term-line">
          <span className="term-prompt">$ </span>
          <span className="term-caret" ref={caretRef} />
        </div>
      </div>
    </div>
  )
}
