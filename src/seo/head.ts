import {
  buildCanonicalUrl,
  getAlternatePages,
  getHomePath,
  getSeoPage,
  getXDefaultUrl,
  SITE_URL,
  type SeoPage,
} from './siteRoutes';
import { siteContent, type Language } from '../content/landingContent';

const managedAttribute = 'data-horarius-seo';
const logoUrl = `${SITE_URL}/horarius-logo.webp`;
const ogImageUrl = `${SITE_URL}/horarius-logo.png`;
// Favicon/apple-touch-icon seguem o base do build (BASE_URL termina com '/'),
// então funcionam em domínio raiz ('/...') e em deploy de subpath ('./...' no
// gh-pages). Só OG/JSON-LD precisam de URL absoluta (crawlers externos).
const iconUrl = `${import.meta.env.BASE_URL}horarius-logo.webp`;
const supportEmail = 'contato.horarius@gmail.com';
const supportPhone = '+5544988657557';
const instagramUrl = 'https://www.instagram.com/horarius';

const brandDescription: Record<Language, string> = {
  pt: 'Horarius automatiza agendamentos, confirmações e remarcações no WhatsApp para negócios que vivem de agenda, como barbearias, salões, clínicas e pet shops.',
  en: 'Horarius automates bookings, confirmations, and rescheduling on WhatsApp for appointment-based businesses such as barbershops, salons, clinics, and pet shops.',
  es: 'Horarius automatiza reservas, confirmaciones y reprogramaciones por WhatsApp para negocios con agenda como barberías, salones, clínicas y tiendas de mascotas.',
};

const homeBreadcrumbLabel: Record<Language, string> = {
  pt: 'Início',
  en: 'Home',
  es: 'Inicio',
};

const ogLocaleByHtmlLang: Record<string, string> = {
  'pt-BR': 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
};

function getOgLocale(htmlLang: string): string {
  return ogLocaleByHtmlLang[htmlLang] ?? 'pt_BR';
}

function getAlternateOgLocales(htmlLang: string): string[] {
  const current = getOgLocale(htmlLang);
  return Object.values(ogLocaleByHtmlLang).filter((locale) => locale !== current);
}

function buildOrganization(language: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Horarius',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      contentUrl: logoUrl,
      width: 1024,
      height: 1024,
    },
    description: brandDescription[language],
    email: supportEmail,
    sameAs: [instagramUrl],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: supportEmail,
      telephone: supportPhone,
      availableLanguage: ['pt-BR', 'en', 'es'],
    },
  };
}

function buildWebsite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Horarius',
    url: SITE_URL,
    inLanguage: ['pt-BR', 'en', 'es'],
  };
}

function buildSoftwareApplication(page: SeoPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Horarius',
    url: buildCanonicalUrl(page.pathname),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Android',
    description: brandDescription[page.language],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Horarius',
      url: SITE_URL,
    },
  };
}

function buildFaqPage(language: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteContent[language].faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function buildBreadcrumb(page: SeoPage) {
  const sectionTitle =
    page.kind === 'privacy'
      ? siteContent[page.language].privacy.title
      : siteContent[page.language].terms.title;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeBreadcrumbLabel[page.language],
        item: buildCanonicalUrl(getHomePath(page.language)),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: sectionTitle,
        item: buildCanonicalUrl(page.pathname),
      },
    ],
  };
}

function buildStructuredData(page: SeoPage): string {
  const graph: Record<string, unknown>[] = [buildOrganization(page.language)];

  if (page.kind === 'home') {
    graph.push(buildSoftwareApplication(page));
    graph.push(buildFaqPage(page.language));
    if (page.language === 'pt') {
      graph.push(buildWebsite());
    }
  } else if (page.kind === 'privacy' || page.kind === 'terms') {
    graph.push(buildBreadcrumb(page));
  }

  return graph.length === 1 ? JSON.stringify(graph[0]) : JSON.stringify(graph);
}

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
    `<meta name="robots" content="index,follow,max-image-preview:large" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" ${managedAttribute}="canonical" />`,
    `<link rel="icon" type="image/webp" sizes="1024x1024" href="${escapeHtml(iconUrl)}" />`,
    `<link rel="apple-touch-icon" href="${escapeHtml(iconUrl)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Horarius" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />`,
    `<meta property="og:image:width" content="1024" />`,
    `<meta property="og:image:height" content="1024" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:alt" content="Horarius" />`,
    `<meta property="og:locale" content="${getOgLocale(page.htmlLang)}" />`,
    ...getAlternateOgLocales(page.htmlLang).map(
      (locale) => `<meta property="og:locale:alternate" content="${locale}" />`,
    ),
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />`,
    `<script type="application/ld+json">${buildStructuredData(page)}</script>`,
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
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: 'index,follow,max-image-preview:large',
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
  upsertMeta('meta[property="og:image"]', {
    property: 'og:image',
    content: ogImageUrl,
  });
  upsertMeta('meta[property="og:image:width"]', {
    property: 'og:image:width',
    content: '1024',
  });
  upsertMeta('meta[property="og:image:height"]', {
    property: 'og:image:height',
    content: '1024',
  });
  upsertMeta('meta[property="og:image:type"]', {
    property: 'og:image:type',
    content: 'image/png',
  });
  upsertMeta('meta[property="og:image:alt"]', {
    property: 'og:image:alt',
    content: 'Horarius',
  });
  upsertMeta('meta[property="og:locale"]', {
    property: 'og:locale',
    content: getOgLocale(page.htmlLang),
  });
  document.head
    .querySelectorAll(`meta[property="og:locale:alternate"][${managedAttribute}="meta"]`)
    .forEach((element) => element.remove());
  getAlternateOgLocales(page.htmlLang).forEach((locale) => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:locale:alternate');
    meta.setAttribute('content', locale);
    meta.setAttribute(managedAttribute, 'meta');
    document.head.appendChild(meta);
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
  upsertMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: ogImageUrl,
  });
  upsertLink('link[rel="canonical"]', {
    rel: 'canonical',
    href: canonicalUrl,
  });
  upsertLink('link[rel="icon"]', {
    rel: 'icon',
    type: 'image/webp',
    sizes: '1024x1024',
    href: iconUrl,
  });
  upsertLink('link[rel="apple-touch-icon"]', {
    rel: 'apple-touch-icon',
    href: iconUrl,
  });

  const structuredDataSelector = `script[type="application/ld+json"][${managedAttribute}="jsonld"]`;
  let structuredDataElement = document.head.querySelector<HTMLScriptElement>(structuredDataSelector);
  if (!structuredDataElement) {
    structuredDataElement = document.createElement('script');
    structuredDataElement.type = 'application/ld+json';
    structuredDataElement.setAttribute(managedAttribute, 'jsonld');
    document.head.appendChild(structuredDataElement);
  }

  structuredDataElement.textContent = buildStructuredData(page);

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
