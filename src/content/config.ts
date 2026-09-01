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
export const appBusinessRegisterHref = 'https://horarius.app.br/register/business';
export const appClientRegisterHref = 'https://horarius.app.br/register/client';
/* Terceiro caminho do cadastro ("quero meu assistente pessoal"). A /pessoal já
   linka para cá (hero, planos, FAQ e header); enquanto a página estiver em
   `draft` (siteRoutes.ts) ela sai com noindex, mas o link está ativo. */
export const appPersonalRegisterHref = 'https://horarius.app.br/register/personal';

/* Preço do assistente no WhatsApp (Horarius Pessoal) e a âncora riscada. Único
   lugar com o número: card de preço, prosa, meta description e teste e2e
   derivam daqui via formatBrl. */
export const personalPlanMonthlyPrice = 29.9;
export const personalPlanAnchorPrice = 49.9;

const whatsappMessages: Record<
  Language,
  { primary: string; sales: string; floating: string; personal: string }
> = {
  pt: {
    primary: 'Olá! Quero entender como o Horarius pode automatizar meus agendamentos.',
    sales: 'Olá! Quero usar o Horarius no meu negócio.',
    floating: 'Olá! Gostaria de saber mais sobre o Horarius.',
    personal: 'Olá! Quero saber mais sobre o Horarius Pessoal.',
  },
  en: {
    primary: 'Hello! I want to understand how Horarius can automate my bookings.',
    sales: 'Hello! I want to use Horarius at my business.',
    floating: 'Hello! I would like to learn more about Horarius.',
    personal: 'Hello! I would like to know more about Horarius Personal.',
  },
  es: {
    primary: 'Hola. Quiero entender cómo Horarius puede automatizar mis reservas.',
    sales: 'Hola. Quiero usar Horarius en mi negocio.',
    floating: 'Hola. Quiero saber más sobre Horarius.',
    personal: 'Hola. Quiero saber más sobre Horarius Personal.',
  },
};

const buildWhatsappLink = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const getWhatsappHref = (
  language: Language,
  variant: keyof (typeof whatsappMessages)[Language] = 'primary',
) => buildWhatsappLink(whatsappMessages[language][variant]);

/** Kill switch temporário do novo funil; somente `false` volta ao WhatsApp comercial. */
export const getBusinessSignupHref = (language: Language) =>
  import.meta.env.VITE_BUSINESS_SELF_SERVICE_ENABLED === 'false'
    ? getWhatsappHref(language, 'sales')
    : appBusinessRegisterHref;

/* Sem kill switch: o funil pessoal nasce self-service (não existe caminho
   comercial por WhatsApp para ele). */
export const getPersonalSignupHref = () => appPersonalRegisterHref;

export const isSupportedLanguage = (value: string | null): value is Language =>
  value === 'pt' || value === 'en' || value === 'es';
