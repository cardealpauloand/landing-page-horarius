import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// E2E de SEO/i18n/acessibilidade sobre o build prerenderizado (dist/).
// Mesmo padrão do cta.e2e.mjs: sem browser, sem dependências — valida o HTML
// que o Netlify serve de fato. Rode após `yarn build` (ou via `yarn test:e2e`).

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://usehorarius.com.br';

const expectations = [
  {
    file: 'dist/index.html',
    lang: 'pt-BR',
    canonical: SITE,
    xDefault: SITE,
    jsonLdTypes: ['Organization', 'SoftwareApplication', 'FAQPage', 'WebSite'],
    mustContain: [
      // H1 estável para leitores de tela/SEO + parte animada apenas decorativa.
      'Sua agenda cheia e os clientes confirmando sozinhos pelo WhatsApp.',
      'Agendar horário',
    ],
  },
  {
    file: 'dist/en/index.html',
    lang: 'en',
    canonical: `${SITE}/en/`,
    xDefault: SITE,
    jsonLdTypes: ['Organization', 'SoftwareApplication', 'FAQPage'],
    mustContain: [
      'A full calendar and clients confirming on their own via WhatsApp.',
      'Book appointment',
    ],
  },
  {
    file: 'dist/es/index.html',
    lang: 'es',
    canonical: `${SITE}/es/`,
    xDefault: SITE,
    jsonLdTypes: ['Organization', 'SoftwareApplication', 'FAQPage'],
    mustContain: [
      'Tu agenda llena y los clientes confirmando solos por WhatsApp.',
      'Reservar horario',
    ],
  },
  {
    file: 'dist/para-voce/index.html',
    lang: 'pt-BR',
    canonical: `${SITE}/para-voce`,
    xDefault: `${SITE}/para-voce`,
    jsonLdTypes: ['Organization'],
    // Entrada da página do cliente é CSS puro — conteúdo visível sem JS.
    mustContain: ['client-landing-enter'],
  },
  {
    file: 'dist/en/for-you/index.html',
    lang: 'en',
    canonical: `${SITE}/en/for-you`,
    xDefault: `${SITE}/para-voce`,
    jsonLdTypes: ['Organization'],
    mustContain: ['client-landing-enter'],
  },
  {
    file: 'dist/es/para-ti/index.html',
    lang: 'es',
    canonical: `${SITE}/es/para-ti`,
    xDefault: `${SITE}/para-voce`,
    jsonLdTypes: ['Organization'],
    mustContain: ['client-landing-enter'],
  },
  {
    file: 'dist/politica-de-privacidade/index.html',
    lang: 'pt-BR',
    canonical: `${SITE}/politica-de-privacidade`,
    xDefault: `${SITE}/politica-de-privacidade`,
    jsonLdTypes: ['Organization', 'BreadcrumbList'],
    mustContain: [],
  },
  {
    file: 'dist/termos-de-servico/index.html',
    lang: 'pt-BR',
    canonical: `${SITE}/termos-de-servico`,
    xDefault: `${SITE}/termos-de-servico`,
    jsonLdTypes: ['Organization', 'BreadcrumbList'],
    mustContain: [],
  },
  {
    file: 'dist/exclusao-de-dados/index.html',
    lang: 'pt-BR',
    canonical: `${SITE}/exclusao-de-dados`,
    xDefault: null, // página só em PT: sem bloco hreflang
    jsonLdTypes: ['Organization'],
    mustContain: [],
  },
];

const count = (html, needle) => html.split(needle).length - 1;

for (const page of expectations) {
  const html = await readFile(path.resolve(root, page.file), 'utf8');
  const where = page.file;

  // Um único H1 e um único favicon por página.
  assert.equal(count(html, '<h1'), 1, `${where}: deve ter exatamente um <h1>`);
  assert.equal(count(html, 'rel="icon"'), 1, `${where}: deve ter exatamente um favicon`);

  // lang e canonical corretos.
  assert.ok(
    html.includes(`<html lang="${page.lang}">`),
    `${where}: <html lang> deveria ser ${page.lang}`,
  );
  assert.equal(
    count(html, 'rel="canonical"'),
    1,
    `${where}: deve ter exatamente um canonical`,
  );
  assert.ok(
    html.includes(`<link rel="canonical" href="${page.canonical}"`),
    `${where}: canonical deveria ser ${page.canonical}`,
  );

  // JSON-LD: um único script, gerenciado, JSON válido e com os tipos esperados.
  assert.equal(
    count(html, 'application/ld+json'),
    1,
    `${where}: deve ter exatamente um script JSON-LD`,
  );
  const jsonLdMatch = html.match(
    /<script type="application\/ld\+json"([^>]*)>(.*?)<\/script>/s,
  );
  assert.ok(jsonLdMatch, `${where}: script JSON-LD não encontrado`);
  assert.ok(
    jsonLdMatch[1].includes('data-horarius-seo="jsonld"'),
    `${where}: JSON-LD precisa do atributo gerenciado (senão a hidratação duplica)`,
  );
  const jsonLd = JSON.parse(jsonLdMatch[2]);
  const types = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((item) => item['@type']);
  assert.deepEqual(
    types,
    page.jsonLdTypes,
    `${where}: tipos JSON-LD esperados ${page.jsonLdTypes}, obtidos ${types}`,
  );

  // hreflang: as três línguas + x-default do cluster (exceto página só-PT).
  if (page.xDefault) {
    for (const hreflang of ['pt-BR', 'en', 'es']) {
      assert.equal(
        count(html, `hreflang="${hreflang}"`),
        1,
        `${where}: deve ter exatamente um hreflang="${hreflang}"`,
      );
    }
    assert.ok(
      html.includes(`hreflang="x-default" href="${page.xDefault}"`),
      `${where}: x-default deveria apontar para ${page.xDefault}`,
    );
  } else {
    assert.equal(count(html, 'hreflang='), 0, `${where}: página só-PT não deve ter hreflang`);
  }

  // Open Graph / Twitter localizados presentes (uma única vez).
  for (const tag of ['og:title', 'og:description', 'og:url', 'og:locale"', 'twitter:card']) {
    assert.ok(html.includes(tag), `${where}: meta ${tag} ausente`);
  }
  assert.ok(
    html.includes(`property="og:url" content="${page.canonical}"`),
    `${where}: og:url deveria ser ${page.canonical}`,
  );

  // Logo decorativo: nunca alt genérico; o nome acessível vem do texto visível.
  assert.equal(count(html, 'alt="logo'), 0, `${where}: alt genérico de logo proibido`);
  assert.equal(count(html, 'alt="imagem'), 0, `${where}: alt genérico de imagem proibido`);

  for (const needle of page.mustContain) {
    assert.ok(html.includes(needle), `${where}: conteúdo esperado ausente: ${needle}`);
  }
}

// Sitemap: todas as rotas presentes e x-default por cluster (não sempre a home).
const sitemap = await readFile(path.resolve(root, 'dist/sitemap.xml'), 'utf8');
for (const page of expectations) {
  assert.ok(
    sitemap.includes(`<loc>${page.canonical}</loc>`),
    `sitemap.xml: rota ausente ${page.canonical}`,
  );
  if (page.xDefault) {
    assert.ok(
      sitemap.includes(`hreflang="x-default" href="${page.xDefault}"`),
      `sitemap.xml: x-default do cluster ausente (${page.xDefault})`,
    );
  }
}

// robots.txt aponta o sitemap; llms.txt existe; dist/server foi limpo.
const robots = await readFile(path.resolve(root, 'dist/robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${SITE}/sitemap.xml`), 'robots.txt sem Sitemap');
await access(path.resolve(root, 'dist/llms.txt'));
await assert.rejects(
  access(path.resolve(root, 'dist/server')),
  'dist/server deveria ter sido removido pelo prerender',
);

console.log(`Landing SEO E2E: ${expectations.length} páginas validadas (JSON-LD único, H1 único, lang/canonical/hreflang/OG por idioma, sitemap).`);
