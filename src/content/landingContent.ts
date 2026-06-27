import { benefits } from './sections/benefits';
import { cta } from './sections/cta';
import { faq } from './sections/faq';
import { footer } from './sections/footer';
import { header } from './sections/header';
import { hero } from './sections/hero';
import { howItWorks } from './sections/howItWorks';
import { privacy } from './sections/privacy';
import { segments } from './sections/segments';
import { socialProof } from './sections/socialProof';
import { terms } from './sections/terms';
import { whatsappButton } from './sections/whatsappButton';
import type { Language, SiteContent } from './types';

export type { Language, LegalDocumentContent } from './types';
export {
  appLoginHref,
  contactEmail,
  defaultLanguage,
  getWhatsappHref,
  isSupportedLanguage,
  languageOptions,
  whatsappNumber,
} from './config';

const build = (language: Language): SiteContent => ({
  header: header[language],
  hero: hero[language],
  socialProof: socialProof[language],
  benefits: benefits[language],
  howItWorks: howItWorks[language],
  segments: segments[language],
  faq: faq[language],
  cta: cta[language],
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
