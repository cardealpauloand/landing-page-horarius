import { benefits } from './sections/benefits';
import { clientCallout } from './sections/clientCallout';
import { clientPage } from './sections/clientPage';
import { cta } from './sections/cta';
import { faq } from './sections/faq';
import { footer } from './sections/footer';
import { header } from './sections/header';
import { hero } from './sections/hero';
import { howItWorks } from './sections/howItWorks';
import { privacy } from './sections/privacy';
import { pricing } from './sections/pricing';
import { segmentPages } from './sections/segmentPages';
import { segments } from './sections/segments';
import { terms } from './sections/terms';
import { whatsappButton } from './sections/whatsappButton';
import type { Language, SiteContent } from './types';

export type {
  HeroHighlightIcon,
  Language,
  LegalDocumentContent,
  PricingAssuranceIcon,
  PricingPlanSlug,
  SegmentCardIcon,
  SegmentKey,
} from './types';
export {
  appLoginHref,
  appRegisterHref,
  appBusinessRegisterHref,
  appClientRegisterHref,
  contactEmail,
  defaultLanguage,
  getWhatsappHref,
  getBusinessSignupHref,
  isSupportedLanguage,
  languageOptions,
  whatsappNumber,
} from './config';

const build = (language: Language): SiteContent => ({
  header: header[language],
  hero: hero[language],
  benefits: benefits[language],
  howItWorks: howItWorks[language],
  segments: segments[language],
  pricing: pricing[language],
  faq: faq[language],
  cta: cta[language],
  clientPage: clientPage[language],
  clientCallout: clientCallout[language],
  segmentPages: segmentPages[language],
  footer: footer[language],
  whatsappButton: whatsappButton[language],
  privacy: privacy[language],
  terms: terms[language],
});

export const siteContent: Record<Language, SiteContent> = {
  pt: build('pt'),
  en: build('en'),
  es: build('es'),
};
