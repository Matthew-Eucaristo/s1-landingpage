// Build step: render the app to HTML and inject it (plus FAQ structured
// data built from the same content) into dist/index.html.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const { render, FAQ } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const file = resolve(root, 'dist/index.html')
let html = readFileSync(file, 'utf8')
html = html.replace('<!--app-->', render())
html = html.replace('<!--faq-ld-->', `<script type="application/ld+json">${JSON.stringify(faq)}</script>`)
writeFileSync(file, html)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerendered ${(html.length / 1024).toFixed(0)} KB into dist/index.html`)
