import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps the build working on GitHuB Pages project sites
// (served under /<repo>/) AND on Cloudflare/custom domains at root.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
})
