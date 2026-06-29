import type { Language } from './types';

export const defaultLanguage: Language = 'pt';

export const languageOptions = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
] as const;

export const contactEmail = 'contato.horarius@gmail.com';
export const whatsappNumber = '5544988657557';
export const appLoginHref = 'https://horarius.app.br/login';

const whatsappMessages: Record<
  Language,
  { primary: string; sales: string; floating: string }
> = {
  pt: {
    primary: 'Olá! Quero entender como o Horarius pode automatizar meus agendamentos.',
    sales: 'Olá! Quero falar com o time comercial do Horarius.',
    floating: 'Olá! Gostaria de saber mais sobre o Horarius.',
  },
  en: {
    primary: 'Hello! I want to understand how Horarius can automate my bookings.',
    sales: 'Hello! I would like to speak with the Horarius sales team.',
    floating: 'Hello! I would like to learn more about Horarius.',
  },
  es: {
    primary: 'Hola. Quiero entender cómo Horarius puede automatizar mis reservas.',
    sales: 'Hola. Quiero hablar con el equipo comercial de Horarius.',
    floating: 'Hola. Quiero saber más sobre Horarius.',
  },
};

const buildWhatsappLink = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const getWhatsappHref = (
  language: Language,
  variant: keyof (typeof whatsappMessages)[Language] = 'primary',
) => buildWhatsappLink(whatsappMessages[language][variant]);

export const isSupportedLanguage = (value: string | null): value is Language =>
  value === 'pt' || value === 'en' || value === 'es';
