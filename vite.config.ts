import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Use relative paths in the production build so GH Pages works under a subpath.
  base: command === 'build' ? './' : '/',
  plugins: [react()],
}))
