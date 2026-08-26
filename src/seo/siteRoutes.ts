import { defaultLanguage, type Language, type SegmentKey } from '../content/landingContent';

export const SITE_URL = 'https://usehorarius.com.br';

export type PageKind =
  | 'home'
  | 'client'
  | 'personal'
  | 'privacy'
  | 'terms'
  | 'data-deletion'
  | `segment-${SegmentKey}`;

/* Kind → vertical da página de segmento (null para as demais). */
export function getSegmentKeyFromKind(kind: PageKind): SegmentKey | null {
  return kind.startsWith('segment-')
    ? (kind.slice('segment-'.length) as SegmentKey)
    : null;
}

export function getSegmentPagePath(language: Language, segment: SegmentKey): string {
  return getLocalizedPagePath(language, `segment-${segment}`);
}

export type SeoPage = {
  kind: PageKind;
  language: Language;
  htmlLang: string;
  pathname: string;
  title: string;
  description: string;
  /* Página em revisão: prerenderiza (dá para abrir no navegador), mas sai com
     `noindex`, fica fora do sitemap/llms.txt e ninguém linka para ela. Tirar o
     flag é o que "publica" — Marco 4 do PLANO-HORARIUS-PESSOAL.md. */
  draft?: boolean;
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
  personal: {
    pt: '/pessoal',
    en: '/en/personal',
    es: '/es/personal',
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
  /* Slugs curtos de propósito: a palavra-chave de busca ("sistema para
     barbearia") vive no title/H1 — a URL fica boa de falar e de pôr na bio. */
  'segment-barbershops': {
    pt: '/barbearias',
    en: '/en/barbershops',
    es: '/es/barberias',
  },
  'segment-salons': {
    pt: '/saloes-de-beleza',
    en: '/en/beauty-salons',
    es: '/es/salones-de-belleza',
  },
  'segment-aesthetics': {
    pt: '/clinicas-de-estetica',
    en: '/en/aesthetic-clinics',
    es: '/es/clinicas-de-estetica',
  },
  'segment-pets': {
    pt: '/pet-shops',
    en: '/en/pet-shops',
    es: '/es/pet-shops',
  },
  'segment-nails': {
    pt: '/esmalterias',
    en: '/en/nail-salons',
    es: '/es/esmalterias',
  },
  'segment-brows': {
    pt: '/sobrancelhas-e-cilios',
    en: '/en/brows-and-lashes',
    es: '/es/cejas-y-pestanas',
  },
  'segment-massage': {
    pt: '/massagem-e-terapias',
    en: '/en/massage-and-therapies',
    es: '/es/masajes-y-terapias',
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
    kind: 'personal',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups.personal.pt,
    title: 'Assistente pessoal no WhatsApp: tarefas, lembretes e finanças | Horarius Pessoal',
    description:
      'Manda um áudio e o Horarius Pessoal anota a tarefa, lembra do compromisso e registra o gasto. Painel grátis para sempre; o assistente no WhatsApp sai por R$ 29,90/mês, com 14 dias grátis.',
    draft: true,
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
    kind: 'personal',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups.personal.en,
    title: 'Personal assistant on WhatsApp: tasks, reminders and money | Horarius Personal',
    description:
      'Send a voice note and Horarius Personal logs the task, remembers the appointment and records the expense. Free panel forever; the WhatsApp assistant is R$ 29.90/month, 14 days free.',
    draft: true,
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
    kind: 'personal',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups.personal.es,
    title: 'Asistente personal en WhatsApp: tareas, recordatorios y finanzas | Horarius Personal',
    description:
      'Manda un audio y Horarius Personal anota la tarea, recuerda la cita y registra el gasto. Panel gratis para siempre; el asistente en WhatsApp cuesta R$ 29,90/mes, con 14 días gratis.',
    draft: true,
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
  {
    kind: 'segment-barbershops',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups['segment-barbershops'].pt,
    title: 'Sistema para barbearia com IA no WhatsApp | Horarius',
    description:
      'Sistema de agendamento para barbearias: IA que atende seu WhatsApp 24h, lembretes que derrubam faltas, lista de espera para horário cancelado e link de agendamento no Instagram. Teste grátis.',
  },
  {
    kind: 'segment-salons',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups['segment-salons'].pt,
    title: 'Sistema para salão de beleza com IA no WhatsApp | Horarius',
    description:
      'Sistema de agendamento para salão de beleza com IA no WhatsApp: atendimento 24h, confirmações automáticas, agenda por profissional e campanhas para trazer clientes de volta. Teste grátis.',
  },
  {
    kind: 'segment-aesthetics',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups['segment-aesthetics'].pt,
    title: 'Sistema para clínica de estética com IA no WhatsApp | Horarius',
    description:
      'Agendamento para clínicas de estética: IA no WhatsApp que agenda sessões, lembretes que reduzem faltas, retorno pós-procedimento e planos recorrentes para pacotes. Teste grátis.',
  },
  {
    kind: 'segment-pets',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups['segment-pets'].pt,
    title: 'Sistema para pet shop e banho e tosa | Horarius',
    description:
      'Agendamento de banho e tosa no WhatsApp: o tutor marca sozinho pela IA, lembretes evitam faltas e a recepção para de passar o dia respondendo mensagem. Teste grátis.',
  },
  {
    kind: 'segment-nails',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups['segment-nails'].es,
    title: 'Software para esmaltería con IA en WhatsApp | Horarius',
    description:
      'Sistema de reservas para esmaltería: IA que atiende WhatsApp 24 h, encajes automáticos entre servicios cortos, recordatorios contra ausencias y clientas fijas que vuelven. Prueba gratis.',
  },
  {
    kind: 'segment-brows',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups['segment-brows'].es,
    title: 'Software para cejas y pestañas con IA en WhatsApp | Horarius',
    description:
      'Sistema de reservas para studio de cejas y pestañas: IA en WhatsApp 24 h, retoques agendados en la ventana correcta, recordatorios contra ausencias y planes recurrentes. Prueba gratis.',
  },
  {
    kind: 'segment-massage',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups['segment-massage'].es,
    title: 'Software para masajes y terapias con IA en WhatsApp | Horarius',
    description:
      'Sistema de reservas para masoterapia y terapias: IA en WhatsApp 24 h, sesiones largas sin huecos en la agenda, confirmación anticipada y paquetes recurrentes. Prueba gratis.',
  },
  {
    kind: 'segment-nails',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups['segment-nails'].en,
    title: 'Nail salon software with WhatsApp AI | Horarius',
    description:
      'Booking software for nail salons: AI answering WhatsApp 24/7, automatic fill-ins between short services, reminders that cut no-shows and regulars coming back. Free trial.',
  },
  {
    kind: 'segment-brows',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups['segment-brows'].en,
    title: 'Brow and lash studio software with WhatsApp AI | Horarius',
    description:
      'Booking software for brow and lash studios: AI on WhatsApp 24/7, touch-ups booked in the right window, reminders against no-shows and recurring plans. Free trial.',
  },
  {
    kind: 'segment-massage',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups['segment-massage'].en,
    title: 'Massage therapy software with WhatsApp AI | Horarius',
    description:
      'Booking software for massage and therapies: AI on WhatsApp 24/7, long sessions with no gaps in the schedule, early confirmation and packages with recurring sessions. Free trial.',
  },
  {
    kind: 'segment-nails',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups['segment-nails'].pt,
    title: 'Sistema para esmalteria com IA no WhatsApp | Horarius',
    description:
      'Sistema de agendamento para esmalteria: IA que atende o WhatsApp 24h, encaixes automáticos entre serviços curtos, lembretes que derrubam faltas e retorno das clientes fixas. Teste grátis.',
  },
  {
    kind: 'segment-brows',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups['segment-brows'].pt,
    title: 'Sistema para sobrancelhas e cílios com IA no WhatsApp | Horarius',
    description:
      'Agendamento para studio de sobrancelhas e cílios: IA no WhatsApp 24h, retorno de manutenção agendado na janela certa, lembretes contra faltas e planos recorrentes. Teste grátis.',
  },
  {
    kind: 'segment-massage',
    language: 'pt',
    htmlLang: 'pt-BR',
    pathname: pageGroups['segment-massage'].pt,
    title: 'Sistema para massagem e terapias com IA no WhatsApp | Horarius',
    description:
      'Sistema de agendamento para massoterapia e terapias: IA no WhatsApp 24h, sessões longas sem buraco na agenda, confirmação antecipada e pacotes com sessões recorrentes. Teste grátis.',
  },
  {
    kind: 'segment-barbershops',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups['segment-barbershops'].en,
    title: 'Barbershop booking software with WhatsApp AI | Horarius',
    description:
      'Booking system for barbershops: an AI that answers your WhatsApp 24/7, reminders that cut no-shows, a waitlist for cancelled slots and a booking link for Instagram. Free to try.',
  },
  {
    kind: 'segment-salons',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups['segment-salons'].en,
    title: 'Salon booking software with WhatsApp AI | Horarius',
    description:
      'Booking software for beauty salons with WhatsApp AI: 24/7 service, automatic confirmations, per-professional calendars and win-back campaigns for missing clients. Free to try.',
  },
  {
    kind: 'segment-aesthetics',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups['segment-aesthetics'].en,
    title: 'Aesthetic clinic booking software with WhatsApp AI | Horarius',
    description:
      'Booking for aesthetic clinics: WhatsApp AI that schedules sessions, reminders that reduce no-shows, post-procedure follow-ups and recurring plans for packages. Free to try.',
  },
  {
    kind: 'segment-pets',
    language: 'en',
    htmlLang: 'en',
    pathname: pageGroups['segment-pets'].en,
    title: 'Pet shop and grooming booking software | Horarius',
    description:
      'Grooming appointments on WhatsApp: pet parents book on their own with the AI, reminders prevent no-shows and the front desk stops answering messages all day. Free to try.',
  },
  {
    kind: 'segment-barbershops',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups['segment-barbershops'].es,
    title: 'Software para barberías con IA en WhatsApp | Horarius',
    description:
      'Sistema de reservas para barberías: IA que atiende tu WhatsApp 24 h, recordatorios que reducen ausencias, lista de espera para horarios cancelados y link de reservas para Instagram. Prueba gratis.',
  },
  {
    kind: 'segment-salons',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups['segment-salons'].es,
    title: 'Software para salones de belleza con IA en WhatsApp | Horarius',
    description:
      'Software de reservas para salones de belleza con IA en WhatsApp: atención 24 h, confirmaciones automáticas, agenda por profesional y campañas para recuperar clientes. Prueba gratis.',
  },
  {
    kind: 'segment-aesthetics',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups['segment-aesthetics'].es,
    title: 'Software para clínicas de estética con IA en WhatsApp | Horarius',
    description:
      'Reservas para clínicas de estética: IA en WhatsApp que agenda sesiones, recordatorios que reducen ausencias, seguimiento post-procedimiento y planes recurrentes para paquetes. Prueba gratis.',
  },
  {
    kind: 'segment-pets',
    language: 'es',
    htmlLang: 'es',
    pathname: pageGroups['segment-pets'].es,
    title: 'Software para pet shops y peluquería canina | Horarius',
    description:
      'Reservas de baño y peluquería por WhatsApp: el tutor agenda solo con la IA, los recordatorios evitan ausencias y la recepción deja de responder mensajes todo el día. Prueba gratis.',
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
