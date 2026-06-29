import type { Language, LandingContent } from '../types';

export const whatsappButton: Record<Language, LandingContent['whatsappButton']> = {
  pt: {
    label: 'WhatsApp',
    sublabel: 'Fale agora',
    ariaLabel: 'Conversar no WhatsApp',
  },
  en: {
    label: 'WhatsApp',
    sublabel: 'Talk now',
    ariaLabel: 'Chat on WhatsApp',
  },
  es: {
    label: 'WhatsApp',
    sublabel: 'Habla ahora',
    ariaLabel: 'Hablar por WhatsApp',
  },
};
