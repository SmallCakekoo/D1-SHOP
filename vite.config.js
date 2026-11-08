import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // El CSS legacy de VTEX trae hacks de IE (*zoom) que lightningcss no acepta.
    lightningcss: { errorRecovery: true },
  },
})
