import { defaultLanguage, type Language } from '../content/landingContent';

export const SITE_URL = 'https://usehorarius.com.br';

export type PageKind = 'home' | 'privacy' | 'terms' | 'data-deletion';

export type SeoPage = {
  kind: PageKind;
  language: Language;
  htmlLang: string;
  pathname: string;
  title: string;
  description: string;
};

type LocalizedRoutes = Record<Language, string>;

const pageGroups: Record<Exclude<PageKind, 'data-deletion'>, LocalizedRoutes> = {
  home: {
    pt: '/',
    en: '/en/',
    es: '/es/',
  },
  privacy: {
    pt: '/politica-de-privacidade',
    en: '/en/privacy-policy',
    es: '/es/politica-de-privacidad',
  },
  terms: {
    pt: '/termos-de-servico',
    en: '/en/terms-of-service',
    es: '/es/terminos-del-servicio',
  },
};

const pageDefinitions: SeoPage[] = [
  {
    kind: 'home',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups.home.pt,
    title: 'Horarius | Agendamentos inteligentes no WhatsApp para negócios',
    description:
      'Automatize agendamentos, confirmações e remarcações no WhatsApp com uma operação pensada para negócios que vivem de agenda.',
  },
  {
    kind: 'privacy',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups.privacy.pt,
    title: 'Política de Privacidade | Horarius',
    description:
      'Entenda como o Horarius coleta, utiliza, protege e compartilha dados pessoais de usuários e clientes finais.',
  },
  {
    kind: 'terms',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups.terms.pt,
    title: 'Termos de Serviço | Horarius',
    description:
      'Consulte os termos de uso do Horarius, incluindo responsabilidades, limites de uso e condições da plataforma.',
  },
  {
    kind: 'data-deletion',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: '/exclusao-de-dados',
    title: 'Exclusão de Dados | Horarius',
    description:
      'Veja como solicitar a exclusão de dados pessoais tratados pelo Horarius e quais informações são necessárias para a solicitação.',
  },
  {
    kind: 'home',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups.home.en,
    title: 'Horarius | WhatsApp booking automation for appointment-based businesses',
    description:
      'Automate bookings, confirmations, and rescheduling on WhatsApp with a workflow designed for businesses that run on appointments.',
  },
  {
    kind: 'privacy',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups.privacy.en,
    title: 'Privacy Policy | Horarius',
    description:
      'Learn how Horarius collects, uses, protects, and shares personal data from users and end customers.',
  },
  {
    kind: 'terms',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups.terms.en,
    title: 'Terms of Service | Horarius',
    description:
      'Review the Horarius terms of service, including platform responsibilities, acceptable use, and contractual conditions.',
  },
  {
    kind: 'home',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups.home.es,
    title: 'Horarius | Automatizacion de reservas por WhatsApp para negocios con agenda',
    description:
      'Automatiza reservas, confirmaciones y reprogramaciones por WhatsApp con un flujo pensado para negocios que dependen de agenda.',
  },
  {
    kind: 'privacy',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups.privacy.es,
    title: 'Politica de Privacidad | Horarius',
    description:
      'Conoce como Horarius recopila, usa, protege y comparte datos personales de usuarios y clientes finales.',
  },
  {
    kind: 'terms',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups.terms.es,
    title: 'Terminos del Servicio | Horarius',
    description:
      'Consulta los terminos de servicio de Horarius, incluyendo responsabilidades, uso permitido y condiciones de la plataforma.',
  },
];

const legacyAliases = new Map<string, string>([
  ['/privacy', pageGroups.privacy.pt],
  ['/terms', pageGroups.terms.pt],
  ['/index.html', '/'],
]);

const pathMap = new Map<string, SeoPage>(
  pageDefinitions.map((page) => [normalizePathname(page.pathname), page]),
);

export const seoPages = [...pageDefinitions];

export function normalizePathname(pathname: string): string {
  const rawPathname = pathname.split(/[?#]/u, 1)[0] || '/';
  const withLeadingSlash = rawPathname.startsWith('/') ? rawPathname : `/${rawPathname}`;
  const compactPath = withLeadingSlash.replace(/\/{2,}/gu, '/');

  if (compactPath === '/' || compactPath === '') {
    return '/';
  }

  if (compactPath === '/en' || compactPath === '/en/') {
    return '/en/';
  }

  if (compactPath === '/es' || compactPath === '/es/') {
    return '/es/';
  }

  const withoutTrailingSlash = compactPath.endsWith('/')
    ? compactPath.slice(0, -1)
    : compactPath;

  return legacyAliases.get(withoutTrailingSlash) ?? withoutTrailingSlash;
}

export function getSeoPage(pathname: string): SeoPage {
  const normalizedPathname = normalizePathname(pathname);
  return pathMap.get(normalizedPathname) ?? pathMap.get('/')!;
}

export function getHomePath(language: Language): string {
  return pageGroups.home[language];
}

export function getLocalizedPagePath(
  language: Language,
  kind: PageKind,
): string {
  if (kind === 'data-deletion') {
    return language === 'pt' ? '/exclusao-de-dados' : getHomePath(language);
  }

  return pageGroups[kind][language];
}

export function getEquivalentPath(
  pathname: string,
  language: Language,
): string {
  const page = getSeoPage(pathname);
  return getLocalizedPagePath(language, page.kind);
}

export function getLanguageFromPath(pathname: string): Language {
  return getSeoPage(pathname).language;
}

export function buildSectionHref(language: Language, sectionId: string): string {
  return `${getHomePath(language)}#${sectionId}`;
}

export function buildCanonicalUrl(pathname: string): string {
  const normalizedPathname = normalizePathname(pathname);
  return normalizedPathname === '/'
    ? SITE_URL
    : `${SITE_URL}${normalizedPathname}`;
}

export function getAlternatePages(page: SeoPage): SeoPage[] {
  if (page.kind === 'data-deletion') {
    return [page];
  }

  const localizedRoutes = pageGroups[page.kind];

  return (Object.keys(localizedRoutes) as Language[]).map((language) =>
    getSeoPage(localizedRoutes[language]),
  );
}

export function getXDefaultUrl(): string {
  return buildCanonicalUrl(getHomePath(defaultLanguage));
}
