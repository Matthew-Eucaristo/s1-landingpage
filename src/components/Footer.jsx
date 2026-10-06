import { REPO } from '../content.js'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <a className="foot-brand" href="#top"><img src="./icon-192.png" alt="" width="20" height="20" loading="lazy" />s1</a>
        <nav aria-label="Footer">
          <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`${REPO}/blob/main/CHANGELOG.md`} target="_blank" rel="noreferrer">Changelog</a>
          <a href={`${REPO}/blob/main/SECURITY.md`} target="_blank" rel="noreferrer">Security</a>
          <a href={`${REPO}/blob/main/ATTRIBUTIONS.md`} target="_blank" rel="noreferrer">Credits</a>
          <a href="./llms.txt">llms.txt</a>
        </nav>
        <p className="foot-legal">
          MIT licensed. Made by Matthew Eucaristo. Provider names and logos belong to their owners.
          Not affiliated with Apple.
        </p>
      </div>
    </footer>
  )
}
