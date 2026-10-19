import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

// GitHub Pages serves 404.html for unknown paths; make it the app shell so
// deep links and refreshes on client-side routes still boot the SPA.
const spaFallback = (): Plugin => ({
  name: 'spa-404-fallback',
  apply: 'build',
  writeBundle({ dir = 'dist' }) {
    copyFileSync(join(dir, 'index.html'), join(dir, '404.html'))
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    spaFallback(),
  ],
})
