import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [react()],
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          output: {
            // three e gsap raramente mudam: em chunks próprios, o cache do
            // navegador sobrevive aos deploys que só mexem no código da cena.
            // Ambos são alcançáveis apenas pelo chunk lazy do BrandStory —
            // nada disso entra no caminho crítico da página.
            manualChunks(id: string) {
              if (id.includes('node_modules/three/')) {
                return 'three-vendor';
              }
              if (id.includes('node_modules/gsap/')) {
                return 'gsap';
              }
            },
          },
        },
      },
}));
