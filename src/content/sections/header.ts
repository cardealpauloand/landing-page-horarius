import type { Language, LandingContent } from '../types';

export const header: Record<Language, LandingContent['header']> = {
  pt: {
    brandTag: 'agenda inteligente no WhatsApp',
    navItems: [
      { label: 'Benefícios', sectionId: 'benefits' },
      { label: 'Fluxo', sectionId: 'how-it-works' },
      { label: 'Segmentos', sectionId: 'segments' },
      { label: 'FAQ', sectionId: 'faq' },
    ],
    ctaLabel: 'Entrar no app',
    ctaCompactLabel: 'Entrar',
    backLabel: 'Voltar para a landing',
    backCompactLabel: 'Voltar',
    languageAriaLabel: 'Selecionar idioma',
  },
  en: {
    brandTag: 'smart scheduling on WhatsApp',
    navItems: [
      { label: 'Benefits', sectionId: 'benefits' },
      { label: 'Flow', sectionId: 'how-it-works' },
      { label: 'Segments', sectionId: 'segments' },
      { label: 'FAQ', sectionId: 'faq' },
    ],
    ctaLabel: 'Open app',
    ctaCompactLabel: 'Open',
    backLabel: 'Back to landing page',
    backCompactLabel: 'Back',
    languageAriaLabel: 'Select language',
  },
  es: {
    brandTag: 'agenda inteligente en WhatsApp',
    navItems: [
      { label: 'Beneficios', sectionId: 'benefits' },
      { label: 'Flujo', sectionId: 'how-it-works' },
      { label: 'Segmentos', sectionId: 'segments' },
      { label: 'FAQ', sectionId: 'faq' },
    ],
    ctaLabel: 'Entrar en la app',
    ctaCompactLabel: 'Entrar',
    backLabel: 'Volver a la landing',
    backCompactLabel: 'Volver',
    languageAriaLabel: 'Seleccionar idioma',
  },
};
