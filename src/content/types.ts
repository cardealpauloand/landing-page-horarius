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
