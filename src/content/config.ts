import type { Language } from './types';

export const defaultLanguage: Language = 'pt';

export const languageOptions = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
] as const;

export const contactEmail = 'contato.horarius@gmail.com';
export const whatsappNumber = '554497640769';
export const appLoginHref = 'https://horarius.app.br/login';
export const appRegisterHref = 'https://horarius.app.br/register';

const whatsappMessages: Record<
  Language,
  { primary: string; sales: string; floating: string }
> = {
  pt: {
    primary: 'Olá! Quero entender como o Horarius pode automatizar meus agendamentos.',
    // Onboarding de negócio é manual (via admin): os CTAs "Começar grátis"
    // apontam para esta conversa de vendas — não para o /register do app,
    // que cria conta de CLIENTE final.
    sales: 'Olá! Quero usar o Horarius no meu negócio.',
    floating: 'Olá! Gostaria de saber mais sobre o Horarius.',
  },
  en: {
    primary: 'Hello! I want to understand how Horarius can automate my bookings.',
    sales: 'Hello! I want to use Horarius at my business.',
    floating: 'Hello! I would like to learn more about Horarius.',
  },
  es: {
    primary: 'Hola. Quiero entender cómo Horarius puede automatizar mis reservas.',
    sales: 'Hola. Quiero usar Horarius en mi negocio.',
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
