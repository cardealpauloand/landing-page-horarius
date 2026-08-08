import type { InsideSystemScreenId } from '../../content/landingContent';

/* Ordem única das telas — sidebar falsa, interleave do layout empilhado e
   timeline do motor GSAP leem daqui. Módulo próprio (sem componentes) para
   poder ser importado de qualquer lado sem brigar com react-refresh. */
export const SCREEN_ORDER: InsideSystemScreenId[] = [
  'agenda',
  'conversations',
  'waitlist',
  'reviews',
  'reminders',
  'insights',
];

/* Cores dos profissionais no mockup — mesma paleta do produto real
   (frontend/src/constants/colors.ts), na ordem das colunas da agenda. */
export const PRO_COLORS = ['#3B82F6', '#8B5CF6', '#14B8A6'];

/* Substitui o placeholder {service} pela forma minúscula da vertical ativa
   (ex.: "corte com barba" → "banho e tosa" na landing de pets). */
export const applyService = (text: string, serviceInline: string): string =>
  text.replace(/\{service\}/g, serviceInline);
