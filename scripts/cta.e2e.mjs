import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const businessHref = 'https://horarius.app.br/register/business';
const clientHref = 'https://horarius.app.br/register/client';

const pages = [
  ['dist/index.html', businessHref],
  ['dist/en/index.html', businessHref],
  ['dist/es/index.html', businessHref],
  ['dist/para-voce/index.html', clientHref],
  ['dist/en/for-you/index.html', clientHref],
  ['dist/es/para-ti/index.html', clientHref],
];

for (const [relativeFile, expectedHref] of pages) {
  const html = await readFile(path.resolve(root, relativeFile), 'utf8');
  assert.ok(
    html.includes(`href="${expectedHref}"`),
    `${relativeFile} deveria apontar para ${expectedHref}`,
  );
}

console.log(`Landing CTA E2E: ${pages.length} páginas renderizadas validadas.`);
