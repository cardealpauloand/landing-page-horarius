import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(() => ({
  base: '/',
  plugins: [react()],
  build: {
    /* dist/.vite/manifest.json: o prerender lê daqui o CSS/JS das rotas em
       chunk próprio para injetar no <head> do HTML estático. */
    manifest: true,
  },
}));
