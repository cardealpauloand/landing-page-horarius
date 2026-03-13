import {
  buildCanonicalUrl,
  getAlternatePages,
  getSeoPage,
  getXDefaultUrl,
  type SeoPage,
} from './siteRoutes';

const managedAttribute = 'data-horarius-seo';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function buildAlternateHeadTags(page: SeoPage): string {
  if (page.kind === 'data-deletion') {
    return '';
  }

  const alternates = getAlternatePages(page)
    .map(
      (alternatePage) =>
        `<link rel="alternate" hreflang="${alternatePage.htmlLang}" href="${escapeHtml(buildCanonicalUrl(alternatePage.pathname))}" ${managedAttribute}="alternate" />`,
    )
    .join('\n');

  return `${alternates}\n<link rel="alternate" hreflang="x-default" href="${escapeHtml(getXDefaultUrl())}" ${managedAttribute}="alternate" />`;
}

export function renderHeadTags(pathname: string): string {
  const page = getSeoPage(pathname);
  const canonicalUrl = buildCanonicalUrl(page.pathname);
  const alternateTags = buildAlternateHeadTags(page);

  return [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" ${managedAttribute}="canonical" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Horarius" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    alternateTags,
  ]
    .filter(Boolean)
    .join('\n');
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(managedAttribute, 'meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element!.setAttribute(name, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  element.setAttribute(managedAttribute, 'link');

  Object.entries(attributes).forEach(([name, value]) => {
    element!.setAttribute(name, value);
  });
}

export function applyHead(pathname: string) {
  const page = getSeoPage(pathname);
  const canonicalUrl = buildCanonicalUrl(page.pathname);

  document.documentElement.lang = page.htmlLang;
  document.title = page.title;

  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: page.description,
  });
  upsertMeta('meta[property="og:type"]', {
    property: 'og:type',
    content: 'website',
  });
  upsertMeta('meta[property="og:site_name"]', {
    property: 'og:site_name',
    content: 'Horarius',
  });
  upsertMeta('meta[property="og:title"]', {
    property: 'og:title',
    content: page.title,
  });
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: page.description,
  });
  upsertMeta('meta[property="og:url"]', {
    property: 'og:url',
    content: canonicalUrl,
  });
  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary',
  });
  upsertMeta('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: page.title,
  });
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: page.description,
  });
  upsertLink('link[rel="canonical"]', {
    rel: 'canonical',
    href: canonicalUrl,
  });

  document.head
    .querySelectorAll<HTMLLinkElement>(`link[rel="alternate"][${managedAttribute}="alternate"]`)
    .forEach((element) => element.remove());

  if (page.kind !== 'data-deletion') {
    getAlternatePages(page).forEach((alternatePage) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = alternatePage.htmlLang;
      link.href = buildCanonicalUrl(alternatePage.pathname);
      link.setAttribute(managedAttribute, 'alternate');
      document.head.appendChild(link);
    });

    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = getXDefaultUrl();
    xDefault.setAttribute(managedAttribute, 'alternate');
    document.head.appendChild(xDefault);
  }
}

