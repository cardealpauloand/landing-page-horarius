import type { Language, LandingContent } from '../types';

export const socialProof: Record<Language, LandingContent['socialProof']> = {
  pt: {
    eyebrow: 'Feito para operações com agenda viva',
    title: 'Projetado para negócios em que cada horário perdido custa faturamento.',
    pills: [
      'Barbearias',
      'Salões de beleza',
      'Clínicas de estética',
      'Dentistas',
      'Clínicas médicas',
      'Personal trainers',
      'Pet shops',
      'Serviços automotivos',
      'Serviços domiciliares',
    ],
  },
  en: {
    eyebrow: 'Built for live booking operations',
    title: 'Designed for businesses where every empty slot means lost revenue.',
    pills: [
      'Barbershops',
      'Beauty salons',
      'Aesthetic clinics',
      'Dentists',
      'Medical clinics',
      'Personal trainers',
      'Pet shops',
      'Automotive services',
      'Home services',
    ],
  },
  es: {
    eyebrow: 'Hecho para operaciones con agenda activa',
    title: 'Diseñado para negocios donde cada horario vacío significa ingresos perdidos.',
    pills: [
      'Barberías',
      'Salones de belleza',
      'Clínicas estéticas',
      'Dentistas',
      'Clínicas médicas',
      'Entrenadores personales',
      'Tiendas de mascotas',
      'Servicios automotrices',
      'Servicios a domicilio',
    ],
  },
};
