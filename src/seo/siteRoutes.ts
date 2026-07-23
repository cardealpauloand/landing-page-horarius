import { defaultLanguage, type Language } from '../content/landingContent';

export const SITE_URL = 'https://usehorarius.com.br';

export type PageKind = 'home' | 'client' | 'privacy' | 'terms' | 'data-deletion';

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
  client: {
    pt: '/para-voce',
    en: '/en/for-you',
    es: '/es/para-ti',
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
    title: 'Horarius | Sistema de agendamento no WhatsApp para negócios',
    description:
      'O Horarius automatiza agendamentos, confirmações e remarcações no WhatsApp para barbearias, salões e clínicas — menos faltas e a agenda sempre cheia.',
  },
  {
    kind: 'client',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups.client.pt,
    title: 'Agende online perto de você | Horarius para clientes',
    description:
      'Crie sua conta grátis no Horarius, encontre barbearias, salões e clínicas perto de você e marque horários online em segundos — com confirmação no WhatsApp.',
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
    title: 'Horarius | Booking system on WhatsApp for businesses',
    description:
      'Horarius automates bookings, confirmations, and rescheduling on WhatsApp for barbershops, salons, and clinics — fewer no-shows and a schedule that stays full.',
  },
  {
    kind: 'client',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups.client.en,
    title: 'Book services online near you | Horarius for clients',
    description:
      'Create your free Horarius account, find barbershops, salons, and clinics near you, and book appointments online in seconds — with WhatsApp confirmations.',
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
    title: 'Horarius | Sistema de reservas en WhatsApp para negocios',
    description:
      'Horarius automatiza reservas, confirmaciones y reprogramaciones por WhatsApp para barberías, salones y clínicas — menos ausencias y la agenda siempre llena.',
  },
  {
    kind: 'client',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups.client.es,
    title: 'Reserva servicios online cerca de ti | Horarius para clientes',
    description:
      'Crea tu cuenta gratis en Horarius, encuentra barberías, salones y clínicas cerca de ti y reserva horarios online en segundos — con confirmación por WhatsApp.',
  },
  {
    kind: 'privacy',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups.privacy.es,
    title: 'Política de Privacidad | Horarius',
    description:
      'Conoce cómo Horarius recopila, usa, protege y comparte datos personales de usuarios y clientes finales.',
  },
  {
    kind: 'terms',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups.terms.es,
    title: 'Términos del Servicio | Horarius',
    description:
      'Consulta los términos de servicio de Horarius, incluyendo responsabilidades, uso permitido y condiciones de la plataforma.',
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

  // '/pt' é alias da raiz (o PT canônico vive em '/'): aceita acesso direto e
  // links com prefixo sem criar uma segunda URL indexável. O deploy também
  // faz 301 (netlify.toml); aqui cobre a navegação client-side.
  if (compactPath === '/pt' || compactPath === '/pt/') {
    return '/';
  }

  if (compactPath.startsWith('/pt/')) {
    return normalizePathname(compactPath.slice('/pt'.length));
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

// x-default por cluster: aponta para a variante no idioma padrão da MESMA
// página (ex.: /para-voce no cluster do cliente), não sempre para a home.
export function getXDefaultUrl(kind: PageKind = 'home'): string {
  return buildCanonicalUrl(getLocalizedPagePath(defaultLanguage, kind));
}
