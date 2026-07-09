import type { Language, LandingContent } from '../types';

export const clientCallout: Record<Language, LandingContent['clientCallout']> = {
  pt: {
    eyebrow: 'É cliente?',
    title: 'Quer marcar um horário em vez de gerenciar uma agenda?',
    description:
      'O Horarius também é para você: encontre empresas perto de você, veja horários livres de verdade e agende online em segundos.',
    ctaLabel: 'Sou cliente — quero agendar',
  },
  en: {
    eyebrow: 'Are you a client?',
    title: 'Want to book a slot instead of managing a schedule?',
    description:
      'Horarius is for you too: find businesses near you, see genuinely open slots, and book online in seconds.',
    ctaLabel: "I'm a client — I want to book",
  },
  es: {
    eyebrow: '¿Eres cliente?',
    title: '¿Quieres reservar un horario en vez de gestionar una agenda?',
    description:
      'Horarius también es para ti: encuentra negocios cerca de ti, mira los horarios realmente libres y reserva online en segundos.',
    ctaLabel: 'Soy cliente — quiero reservar',
  },
};
