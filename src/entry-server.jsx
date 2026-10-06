import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
export { FAQ, SITE, REPO } from './content.js'

/* Build-time render: the shipped HTML carries the whole page, so search
   engines and AI crawlers read it without running JavaScript. */
export function render() {
  return renderToString(<StrictMode><App /></StrictMode>)
}
