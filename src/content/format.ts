import type { Language } from './types';

const LOCALE_BY_LANGUAGE: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

/* Preço em reais para as três línguas: "R$ " fixo + número no separador
   decimal do idioma (29,90 / 29.90). O `currency: 'BRL'` do Intl não serve
   aqui: em es-ES ele imprime "29,90 BRL" e em en-US cola o símbolo ("R$29.90").
   Único ponto que formata preço na landing — home (Pricing) e /pessoal. */
export const formatBrl = (value: number, language: Language) => {
  const number = new Intl.NumberFormat(LOCALE_BY_LANGUAGE[language], {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `R$ ${number}`;
};
