import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const distDir = path.resolve(projectDir, 'dist');
const serverEntryPath = path.resolve(distDir, 'server', 'entry-server.js');

const { prerenderPages, publishedPages, render, preload, getAlternatePages, getXDefaultUrl } =
  await import(pathToFileURL(serverEntryPath).href);

const template = await readFile(path.resolve(distDir, 'index.html'), 'utf8');

/* Rotas em chunk próprio (build.manifest do Vite): o HTML estático já traz a
   página inteira, então o CSS do chunk precisa estar no <head> desde o primeiro
   paint (senão a página nasce sem estilo até o JS chegar) e o JS entra como
   modulepreload para a hidratação não esperar uma segunda ida ao servidor. */
const LAZY_ROUTE_MODULES = {
  personal: 'src/components/personal/PersonalLanding.tsx',
};

const manifest = JSON.parse(
  await readFile(path.resolve(distDir, '.vite', 'manifest.json'), 'utf8'),
);

function collectChunkAssets(moduleId, seen = new Set()) {
  const chunk = manifest[moduleId];
  if (!chunk || seen.has(moduleId)) {
    return { css: [], js: [] };
  }
  seen.add(moduleId);
  const css = [...(chunk.css ?? [])];
  const js = [chunk.file];
  for (const imported of chunk.imports ?? []) {
    const nested = collectChunkAssets(imported, seen);
    css.push(...nested.css);
    js.push(...nested.js);
  }
  return { css, js };
}

/* O chunk da rota compartilha módulos com o bundle principal (React, ícones):
   só o que NÃO está no entry entra como link extra. */
const entryAssets = collectChunkAssets('index.html');

function buildLazyRouteHeadTags(kind) {
  const moduleId = LAZY_ROUTE_MODULES[kind];
  if (!moduleId) {
    return '';
  }
  if (!manifest[moduleId]) {
    throw new Error(`prerender: chunk de ${moduleId} ausente em dist/.vite/manifest.json`);
  }
  const assets = collectChunkAssets(moduleId);
  const css = assets.css.filter((file) => !entryAssets.css.includes(file));
  const js = assets.js.filter((file) => !entryAssets.js.includes(file));

  return [
    ...css.map((file) => `<link rel="stylesheet" href="/${file}" />`),
    ...js.map((file) => `<link rel="modulepreload" href="/${file}" />`),
  ].join('\n');
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

const SITE_ORIGIN = 'https://usehorarius.com.br';

const aiCitationBots = [
  'Google-Extended',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Applebot-Extended',
];

function buildRobotsTxt() {
  const generalRules = ['User-agent: *', 'Allow: /', 'Disallow: /app', 'Disallow: /app/', ''];

  const aiRules = aiCitationBots.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', 'Disallow: /app', 'Disallow: /app/', '']);

  return [
    ...generalRules,
    ...aiRules,
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    `# LLM site map: ${SITE_ORIGIN}/llms.txt`,
    '',
  ].join('\n');
}

function buildLlmsTxt(pages) {
  const home = pages.find((page) => page.kind === 'home' && page.language === 'pt');
  const toUrl = (pathname) => (pathname === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${pathname}`);

  /* Três blocos: segmentos, legal e o resto (home, cliente, pessoal e o que
     vier). A exclusão de dados fica fora de todos — é página de procedimento,
     não de produto. Uma página nova de produto entra sozinha no primeiro bloco. */
  const isSegment = (page) => page.kind.startsWith('segment-');
  const isLegal = (page) => page.kind === 'privacy' || page.kind === 'terms';
  const mainPages = pages.filter(
    (page) => !isSegment(page) && !isLegal(page) && page.kind !== 'data-deletion',
  );
  const segmentPages = pages.filter(isSegment);
  const legalPages = pages.filter(isLegal);

  const lines = [
    '# Horarius',
    '',
    `> ${home?.description ?? 'Horarius automatiza agendamentos, confirmações e remarcações no WhatsApp para negócios que vivem de agenda.'}`,
    '',
    'Horarius é um assistente de IA que transforma o WhatsApp em um canal operacional de agendamento para barbearias, salões, clínicas, pet shops, serviços automotivos e qualquer negócio que dependa de agenda. Site oficial: https://usehorarius.com.br',
    '',
    '## Páginas principais',
    ...mainPages.map((page) => `- [${page.title}](${toUrl(page.pathname)}): ${page.description}`),
    '',
    '## Soluções por segmento',
    ...segmentPages.map((page) => `- [${page.title}](${toUrl(page.pathname)}): ${page.description}`),
    '',
    '## Legal',
    ...legalPages.map((page) => `- [${page.title}](${toUrl(page.pathname)}): ${page.description}`),
    '',
  ];

  return lines.join('\n');
}

function buildSitemapXml(pages) {
  const urls = pages
    .map((page) => {
      const toAbsoluteUrl = (pathname) =>
        pathname === '/' ? 'https://usehorarius.com.br' : `https://usehorarius.com.br${pathname}`;
      const pageUrl = toAbsoluteUrl(page.pathname);
      // Mesma regra do <head> (siteRoutes): só variantes publicadas, e o
      // x-default cai na primeira publicada se o PT ainda estiver em revisão.
      const alternates =
        page.kind === 'data-deletion'
          ? ''
          : getAlternatePages(page)
            .map(
              (alternate) =>
                `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.htmlLang)}" href="${escapeXml(
                  toAbsoluteUrl(alternate.pathname),
                )}" />`,
            )
            .join('\n') +
          `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(getXDefaultUrl(page.kind))}" />`;

      return ['  <url>', `    <loc>${escapeXml(pageUrl)}</loc>`, alternates, '  </url>']
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

function toOutputFile(pathname) {
  if (pathname === '/') {
    return path.resolve(distDir, 'index.html');
  }

  const trimmedPath = pathname.replace(/^\/|\/$/gu, '');
  return path.resolve(distDir, trimmedPath, 'index.html');
}

for (const page of prerenderPages) {
  await preload(page.pathname);
  const { appHtml, headTags, htmlLang } = render(page.pathname);
  const outputFile = toOutputFile(page.pathname);

  await mkdir(path.dirname(outputFile), { recursive: true });

  const html = template
    .replace('<html lang="pt-BR">', `<html lang="${htmlLang}">`)
    .replace('<!--app-head-->', [headTags, buildLazyRouteHeadTags(page.kind)].filter(Boolean).join('\n'))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  await writeFile(outputFile, html, 'utf8');
}

// Páginas em revisão (draft) prerenderizam — dá para abrir no navegador —,
// mas ficam fora do sitemap e do llms.txt até serem publicadas (o head já
// sai com noindex). Quem decide é `publishedPages`, do entry-server.

await writeFile(path.resolve(distDir, 'robots.txt'), buildRobotsTxt(), 'utf8');
await writeFile(path.resolve(distDir, 'sitemap.xml'), buildSitemapXml(publishedPages), 'utf8');
await writeFile(path.resolve(distDir, 'llms.txt'), buildLlmsTxt(publishedPages), 'utf8');
await rm(path.resolve(distDir, 'server'), { recursive: true, force: true });

