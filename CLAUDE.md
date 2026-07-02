# landing-page-horarius

Landing page do **Horarius** (React + Vite + TypeScript, com SSR/prerender). Foco em SEO/AEO.

## Stack
**React + Vite + TypeScript** · SSR (`entry-server.tsx`) + prerender (`scripts/prerender.mjs`) · ESLint · deploy via Netlify (`netlify.toml`).

## Comandos

> **Gerenciador de pacotes: sempre `yarn`** (nunca `npm`). Use `yarn` para instalar e `yarn <script>` para rodar qualquer script. O lockfile oficial é `yarn.lock`.

- `yarn dev` — Vite dev server
- `yarn build` — build completo: `tsc -b` + client + SSR + prerender
- `yarn build:client` — só `vite build` (cliente)
- `yarn build:ssr` — build SSR (`src/entry-server.tsx` → `dist/server`)
- `yarn prerender` — gera HTML estático (`scripts/prerender.mjs`)
- `yarn preview` — serve o build
- `yarn lint` — eslint

## Convenções / gotchas
- **Nunca** ler `node_modules/` nem `dist/`.
- O script `build` já encadeia client → ssr → prerender internamente via `yarn`.
