export type Language = 'pt' | 'en' | 'es';

type NavItem = {
  label: string;
  sectionId: string;
};

type Benefit = {
  eyebrow: string;
  title: string;
  description: string;
};

type Step = {
  number: string;
  title: string;
  description: string;
};

type TimelineMessage = {
  role: 'client' | 'assistant';
  text: string;
  /* Horário exibido no canto do balão, como no WhatsApp real. */
  time: string;
};

/* Selo da fileira sob o subtítulo do hero: ícone + frase curta. A chave vira
   um ícone no mapa HIGHLIGHT_ICONS (Hero.tsx) — conteúdo continua só dado. */
export type HeroHighlightIcon = 'clock' | 'calendar' | 'check';

type HeroHighlight = {
  icon: HeroHighlightIcon;
  label: string;
};

/* Marca do negócio fictício: cada valor aponta para um desenho SVG no mapa
   LOGO_MARKS (HeroPhone.tsx). Chave em vez de componente para o conteúdo
   continuar sendo só dado — nada de JSX nos arquivos de tradução. */
export type PhoneLogo = 'scissors' | 'tooth' | 'sparkle' | 'paw';

/* Um negócio fictício encenado pela demo do celular no hero. */
type PhoneScenario = {
  business: string;
  /* O "logo" é um círculo colorido com esta marca dentro — mesmo padrão do
     avatar do WhatsApp; a cor vem de uma paleta no componente, por índice. */
  logo: PhoneLogo;
  /* Ex.: 'Terça-feira, 17' — aparece no chip de data do balão de horários. */
  dayLabel: string;
  slots: string[];
  greeting: string;
  request: string;
  offer: string;
  /* Com `{time}`: o horário vem do chip escolhido (pela demo ou pelo clique). */
  confirm: string;
};

/* Ícone de cada card de segmento; a chave vira um desenho no mapa
   SEGMENT_CARD_ICONS (Segments.tsx). */
export type SegmentCardIcon =
  | 'scissors'
  | 'sparkles'
  | 'flower'
  | 'paw'
  | 'stethoscope'
  | 'wrench';

type Segment = {
  icon: SegmentCardIcon;
  title: string;
  description: string;
  /* Vertical com landing page própria: o card ganha o link "ver página". */
  segment?: SegmentKey;
};

export type PricingPlanSlug = 'starter' | 'pro' | 'business';

type PricingPlan = {
  slug: PricingPlanSlug;
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  priceLabel?: string;
  /* "Tudo do Starter, e mais:" — quando presente, substitui o rótulo genérico
     e a lista traz só os deltas do plano (a lista completa vive no Starter). */
  baseline?: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
};

/* Selos de confiança sob a grade de planos; a chave vira desenho no mapa
   ASSURANCE_ICONS (Pricing.tsx). */
export type PricingAssuranceIcon = 'shield' | 'infinity' | 'card' | 'badge';

type PricingAssurance = {
  icon: PricingAssuranceIcon;
  label: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

/* Selo ao lado do FAQ; a chave vira desenho no mapa FAQ_HIGHLIGHT_ICONS
   (FAQ.tsx) — conteúdo continua só dado. */
export type FaqHighlightIcon = 'shield' | 'bolt' | 'support';

type FaqHighlight = {
  icon: FaqHighlightIcon;
  title: string;
  description: string;
};

/* ——— Seção "Por dentro do sistema" ———
   Mockups das telas do painel desenhados em código. Todo texto visível vive
   aqui (trilíngue); números soltos (occupancy, start/span, pct) são o roteiro
   da cena — mesmos valores nas 3 línguas para o layout não variar. */

export type InsideSystemScreenId =
  | 'agenda'
  | 'conversations'
  | 'waitlist'
  | 'reviews'
  | 'reminders'
  | 'insights';

/* Stat genérico dos mockups: rótulo pequeno + valor grande + hint opcional.
   `icon` é chave → componente no mapa da tela (padrão do conteúdo-só-dado). */
type InsideSystemStat = {
  label: string;
  value: string;
  hint?: string;
  icon?: 'calendar' | 'money' | 'users' | 'clock' | 'cancel';
};

/* `service` referencia por índice o array `services` do conteúdo (ou da
   variante de segmento) — trocar a vertical troca só o array, não as telas. */
type AgendaMock = {
  kpis: InsideSystemStat[];
  toolbar: {
    today: string;
    date: string;
    views: string[];
    filters: string;
    indicators: string;
    refresh: string;
  };
  /* Cabeçalho da régua ("Hora") e marcas de 30 min da janela visível;
     slots de 15 min contam a partir da primeira. */
  hourHeader: string;
  hourLabels: string[];
  /* Visões Semana e Mês (o switcher troca de verdade): rótulos dos 7 dias
     (a Semana usa os 6 primeiros), mês do calendário, overflow "+{n} mais"
     e o "Fechado" dos domingos. Geometria/entradas são roteiro de cena no
     componente (nomes vêm do pool de clientes da própria agenda). */
  weekDays: string[];
  monthLabel: string;
  monthMore: string;
  closedLabel: string;
  statusLabels: Record<'pending' | 'confirmed' | 'in_progress' | 'completed', string>;
  /* Layouts do app no celular (modo Celular): faixa de dias na Semana e
     calendário de pontinhos no Mês, ambos com a lista de cards do dia. */
  mobile: {
    dayTitle: string;
    countLabel: string;
    origin: string;
    /* Preço unitário por serviço, alinhado índice a índice com `services`. */
    prices: string[];
  };
  professionals: {
    name: string;
    meta: string;
    nextChip: string;
    /* 0–100: largura da barra de ocupação. */
    occupancy: number;
    occupancyLabel: string;
    appointments: {
      time: string;
      client: string;
      status: 'pending' | 'confirmed' | 'in_progress' | 'completed';
      /* Posição na grade em unidades de 15 min desde a primeira hora. */
      start: number;
      span: number;
    }[];
  }[];
};

type ConversationsMock = {
  listTitle: string;
  searchPlaceholder: string;
  filters: { label: string; active?: boolean; badge?: string }[];
  aiToggle: string;
  /* Cada conversa da lista carrega a própria thread — clicar na lista troca
     o chat aberto. A PRIMEIRA é a encenada pelos beats (e o estado inicial).
     `{service}` nos textos vira o `serviceInline` do conteúdo/variante. */
  conversations: {
    name: string;
    phone: string;
    time: string;
    preview: string;
    active?: boolean;
    badge?: string;
    unread?: string;
    messages: { direction: 'in' | 'out'; text: string; meta: string }[];
  }[];
  composer: { status: string; placeholder: string; send: string };
};

type WaitlistMock = {
  metrics: InsideSystemStat[];
  tableTitle: string;
  tableSubtitle: string;
  columns: string[];
  statusLabels: Record<'waiting' | 'offered' | 'confirmed', string>;
  /* A 2ª linha é a encenada: o SSR emite o estado final (confirmed + offer);
     a animação rebobina Aguardando → Oferta enviada → Confirmado. */
  rows: {
    client: string;
    service: number;
    time: string;
    status: 'waiting' | 'offered' | 'confirmed';
    offer: string;
  }[];
};

type ReviewsMock = {
  summaryTitle: string;
  /* Formato com ponto ("4.8"), como o produto real exibe. */
  average: string;
  /* Contagem entre parênteses ao lado das estrelas: "(127)". */
  ratingCount: string;
  countLine: string;
  distribution: { stars: string; pct: number; count: string }[];
  quote: { text: string; author: string; service: number };
  tableTitle: string;
  columns: string[];
  /* Estado da coluna Comentário quando vazio ("Sem comentário"). */
  noComment: string;
  rows: {
    client: string;
    stars: number;
    comment?: string;
    service: number;
    professional: string;
    date: string;
  }[];
};

type RemindersMock = {
  title: string;
  columns: string[];
  statusLabels: Record<'sent' | 'delivered' | 'read', string>;
  rows: { client: string; service: number; time: string; status: 'sent' | 'delivered' | 'read' }[];
  preview: { label: string; text: string; meta: string };
  stat: InsideSystemStat;
};

type InsightsMock = {
  /* Header "Financeiro do mês" + badge Estimativa + olho de ocultar. */
  financeTitle: string;
  estimateBadge: string;
  maskLabel: string;
  kpis: InsideSystemStat[];
  lossesLine: string;
  chartTitle: string;
  chartHint: string;
  topServicesTitle: string;
  topServices: { service: number; count: string; value: string }[];
  topProfessionalsTitle: string;
  topProfessionals: { name: string; count: string; value: string }[];
  recovered: { title: string; value: string; description: string };
};

type InsideSystemScreenMeta = {
  /* Item da sidebar falsa e do indicador de progresso. */
  navLabel: string;
  headline: string;
  description: string;
  /* role="group" do mockup — o cromo decorativo em volta é aria-hidden. */
  ariaLabel: string;
};

export type InsideSystemSegmentVariant = {
  businessName: string;
  services: string[];
  /* Forma minúscula para o meio de frase: "seu horário de {service}". */
  serviceInline: string;
  headlines?: Partial<Record<InsideSystemScreenId, string>>;
};

export type InsideSystemContent = {
  eyebrow: string;
  title: string;
  description: string;
  /* Dica curta sob o progresso: "role para percorrer as telas" (desktop). */
  hint: string;
  /* Variante do carrossel mobile: "arraste para percorrer as telas". */
  hintSwipe: string;
  /* Seletor de dispositivo: ver o painel como no computador ou no celular. */
  deviceDesktop: string;
  devicePhone: string;
  brand: string;
  businessName: string;
  topbarDate: string;
  /* Raiz do breadcrumb da topbar ("Visão geral / <tela>", como o painel). */
  breadcrumbRoot: string;
  /* CTA do fim do tour: aparece quando a última tela (clímax) chega. */
  cta: string;
  /* Card do sino de notificações (abre/fecha no clique, como o painel). */
  bellNotifications: {
    title: string;
    /* Contagem do badge no sino. */
    unread: string;
    markRead: string;
    items: { icon: 'calendar' | 'clock' | 'star'; text: string; time: string }[];
  };
  services: string[];
  serviceInline: string;
  screens: {
    agenda: InsideSystemScreenMeta & { mock: AgendaMock };
    conversations: InsideSystemScreenMeta & { mock: ConversationsMock };
    waitlist: InsideSystemScreenMeta & { mock: WaitlistMock };
    reviews: InsideSystemScreenMeta & { mock: ReviewsMock };
    reminders: InsideSystemScreenMeta & { mock: RemindersMock };
    insights: InsideSystemScreenMeta & { mock: InsightsMock };
  };
  segmentVariants: Record<SegmentKey, InsideSystemSegmentVariant>;
};

type SummaryItem = {
  label: string;
  value: string;
};

type LegalSubsection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

type LegalContactField = {
  label: string;
  value: string;
  href?: string;
};

type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  subsections?: LegalSubsection[];
  contactEmail?: string;
  contactInfo?: LegalContactField[];
};

export type LegalDocumentContent = {
  eyebrow: string;
  title: string;
  appInfoTitle: string;
  appInfoDescription: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export type LandingContent = {
  header: {
    brandTag: string;
    navItems: NavItem[];
    ctaLabel: string;
    ctaCompactLabel: string;
    registerLabel: string;
    registerCompactLabel: string;
    clientLabel: string;
    backLabel: string;
    backCompactLabel: string;
    languageAriaLabel: string;
    menuAriaLabel: string;
    menuOpenAriaLabel: string;
    menuCloseAriaLabel: string;
  };
  hero: {
    /* Selo de confiança acima do h1: comunica que a automação usa o canal
       oficial sem sugerir uma certificação "Meta Business Partner". */
    trustBrand: string;
    trustDetail: string;
    title: string;
    /* Segunda linha do h1 (em verde). Frase FIXA de propósito: a única coisa
       que se move no hero é a demo animada do celular — duas animações de
       texto no mesmo campo de visão brigavam entre si. */
    titleAccent: string;
    subtitle: string;
    /* Os três selos entre o subtítulo e os botões — o que o produto faz, em
       três palavras cada. */
    highlights: HeroHighlight[];
    primaryCta: string;
    secondaryCta: string;
    /* Linha de risco zero logo abaixo dos botões: grátis, rápido, sem multa. */
    ctaNote: string;
    /* Linha miúda abaixo dos botões: para quem é. */
    audience: string;
    /* Cenários da demo animada do celular: a cada volta do loop o mockup vira
       o WhatsApp de um negócio fictício diferente (nome, logo, dia e horários
       próprios). O PRIMEIRO cenário é o que o prerender emite e
       o que fica estático com prefers-reduced-motion. */
    phoneScenarios: PhoneScenario[];
    /* Chip "Ao vivo 24/7" flutuando no canto do aparelho — FORA da tela de
       propósito: dentro do WhatsApp simulado quebraria o realismo. */
    liveBadge: string;
    /* Rótulo acessível de cada chip de horário, com `{time}`. */
    phoneSlotAriaLabel: string;
    phoneDemoLabel: string;
    phoneBusinessLabel: string;
    phoneInputPlaceholder: string;
    phoneDayDivider: string;
  };
  benefits: {
    eyebrow: string;
    title: string;
    description: string;
    items: Benefit[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Step[];
    exampleEyebrow: string;
    exampleTitle: string;
    status: string;
    messages: TimelineMessage[];
    summary: SummaryItem[];
  };
  insideSystem: InsideSystemContent;
  segments: {
    eyebrow: string;
    title: string;
    description: string;
    /* Rótulo compartilhado do link dos cards com página própria. */
    itemLinkLabel: string;
    items: Segment[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    includedFeaturesLabel: string;
    showMoreLabel: string;
    showLessLabel: string;
    billingAriaLabel: string;
    monthlyLabel: string;
    yearlyLabel: string;
    yearlyBadge: string;
    popularLabel: string;
    perMonthLabel: string;
    billedMonthlyLabel: string;
    billedYearlyLabel: string;
    savingsLabel: string;
    footnote: string;
    /* Selos exibidos sob a grade: respondem as objeções de compra na hora. */
    assurances: PricingAssurance[];
    plans: PricingPlan[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: FaqItem[];
    /* Respondem as objeções sem exigir clique — ficam ao lado da lista. */
    highlights: FaqHighlight[];
    /* Saída para quem não achou a resposta na lista. */
    support: {
      title: string;
      description: string;
      ctaLabel: string;
    };
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  /** Página dedicada ao cliente final (/para-voce): funil B2C → cadastro no app. */
  clientPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stepsTitle: string;
    steps: Step[];
    highlightsTitle: string;
    highlights: string[];
    note: string;
  };
  /** Seção curta da home apontando para a página do cliente. */
  clientCallout: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    navigationTitle: string;
    /* Coluna de links para as landing pages por segmento. */
    solutionsTitle: string;
    solutionsLabels: Record<SegmentKey, string>;
    legalTitle: string;
    privacyLabel: string;
    termsLabel: string;
    whatsappLabel: string;
    bottomRight: string;
  };
  /* Landing pages por segmento (/sistema-para-barbearias etc.): cada uma é uma
     página inteira indexável, com dor, features e FAQ na língua do nicho. */
  segmentPages: Record<SegmentKey, SegmentPageContent>;
  whatsappButton: {
    label: string;
    sublabel: string;
    ariaLabel: string;
  };
};

/* Verticais com landing page própria. O PageKind correspondente em siteRoutes
   é derivado por template literal (`segment-${SegmentKey}`) — adicionar um
   segmento aqui obriga o compilador a cobrar rota, título e conteúdo. */
export type SegmentKey = 'barbershops' | 'salons' | 'aesthetics' | 'pets';

export type SegmentPageContent = {
  eyebrow: string;
  /* H1 em duas partes, no mesmo desenho do hero da home (parte branca + verde). */
  title: string;
  titleAccent: string;
  subtitle: string;
  painsTitle: string;
  pains: string[];
  featuresTitle: string;
  features: { title: string; description: string }[];
  faqTitle: string;
  faq: { question: string; answer: string }[];
  ctaTitle: string;
  primaryCta: string;
  secondaryCta: string;
  ctaNote: string;
};

export type LegalContent = {
  privacy: LegalDocumentContent;
  terms: LegalDocumentContent;
};

export type SiteContent = LandingContent & LegalContent;
