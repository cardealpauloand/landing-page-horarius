import type { Language, LandingContent } from '../types';

export const cta: Record<Language, LandingContent['cta']> = {
  pt: {
    eyebrow: 'Pronto para subir o nível da sua agenda?',
    title: 'Troque mensagens soltas por um fluxo que realmente fecha horários',
    description:
      'Se sua operação já recebe demanda pelo WhatsApp, o próximo passo é organizar essa demanda com velocidade, contexto e consistência.',
    primaryCta: 'Entrar no app',
    secondaryCta: 'Falar com vendas',
  },
  en: {
    eyebrow: 'Ready to level up your schedule?',
    title: 'Replace scattered messages with a flow that actually closes bookings',
    description:
      'If your operation already receives demand through WhatsApp, the next step is to organize that demand with speed, context, and consistency.',
    primaryCta: 'Open app',
    secondaryCta: 'Talk to sales',
  },
  es: {
    eyebrow: '¿Listo para llevar tu agenda a otro nivel?',
    title: 'Cambia mensajes sueltos por un flujo que realmente cierre reservas',
    description:
      'Si tu operación ya recibe demanda por WhatsApp, el siguiente paso es organizar esa demanda con velocidad, contexto y consistencia.',
    primaryCta: 'Entrar en la app',
    secondaryCta: 'Hablar con ventas',
  },
};
