export type Language = 'pt' | 'en' | 'es';

type NavItem = {
  label: string;
  sectionId: string;
};

type Metric = {
  value: string;
  label: string;
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
};

type Segment = {
  title: string;
  description: string;
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
    backLabel: string;
    backCompactLabel: string;
    languageAriaLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    /* Frases do efeito typewriter na linha verde do título. A PRIMEIRA deve ser
       o próprio titleAccent (sem o espaço inicial): é ela que sai no HTML
       pré-renderizado (estado inicial do hook, antes do JS hidratar). */
    titleAccentRotating: string[];
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: Metric[];
    noticeLabel: string;
    noticeText: string;
    messages: TimelineMessage[];
    selectorTitle: string;
    selectorLabel: string;
    selectorHint: string;
    selectorOptions: string[];
    kickerValue: string;
    kickerText: string;
  };
  socialProof: {
    eyebrow: string;
    title: string;
    pills: string[];
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
    items: Segment[];
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
  footer: {
    copyright: string;
    tagline: string;
    navigationTitle: string;
    legalTitle: string;
    privacyLabel: string;
    termsLabel: string;
    whatsappLabel: string;
    bottomRight: string;
  };
  whatsappButton: {
    label: string;
    sublabel: string;
    ariaLabel: string;
  };
};

export type LegalContent = {
  privacy: LegalDocumentContent;
  terms: LegalDocumentContent;
};

export type SiteContent = LandingContent & LegalContent;
