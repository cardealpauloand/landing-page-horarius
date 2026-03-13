import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const distDir = path.resolve(projectDir, 'dist');
const serverEntryPath = path.resolve(distDir, 'server', 'entry-server.js');

const { prerenderPages, render } = await import(pathToFileURL(serverEntryPath).href);

const template = await readFile(path.resolve(distDir, 'index.html'), 'utf8');

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function buildRobotsTxt() {
  return ['User-agent: *', 'Allow: /', 'Disallow: /app', 'Disallow: /app/', 'Sitemap: https://usehorarius.com.br/sitemap.xml', ''].join('\n');
}

function buildSitemapXml(pages) {
  const urls = pages
    .map((page) => {
      const pageUrl = page.pathname === '/' ? 'https://usehorarius.com.br' : `https://usehorarius.com.br${page.pathname}`;
      const alternates =
        page.kind === 'data-deletion'
          ? ''
          : pages
              .filter((candidate) => candidate.kind === page.kind)
              .map(
                (alternate) =>
                  `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.htmlLang)}" href="${escapeXml(
                    alternate.pathname === '/'
                      ? 'https://usehorarius.com.br'
                      : `https://usehorarius.com.br${alternate.pathname}`,
                  )}" />`,
              )
              .join('\n') +
            '\n    <xhtml:link rel="alternate" hreflang="x-default" href="https://usehorarius.com.br" />';

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
  const { appHtml, headTags, htmlLang } = render(page.pathname);
  const outputFile = toOutputFile(page.pathname);

  await mkdir(path.dirname(outputFile), { recursive: true });

  const html = template
    .replace('<html lang="pt-BR">', `<html lang="${htmlLang}">`)
    .replace('<!--app-head-->', headTags)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  await writeFile(outputFile, html, 'utf8');
}

await writeFile(path.resolve(distDir, 'robots.txt'), buildRobotsTxt(), 'utf8');
await writeFile(path.resolve(distDir, 'sitemap.xml'), buildSitemapXml(prerenderPages), 'utf8');
await rm(path.resolve(distDir, 'server'), { recursive: true, force: true });

