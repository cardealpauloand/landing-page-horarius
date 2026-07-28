import type { Language, LandingContent } from '../types';

export const socialProof: Record<Language, LandingContent['socialProof']> = {
  pt: {
    eyebrow: 'Feito para operações com agenda viva',
    title: 'Projetado para negócios em que cada horário perdido custa faturamento.',
    description: [
      'Para empresas que dependem de agendamentos, cada minuto conta.',
      'O Horarius ajuda você a ocupar mais horários, reduzir faltas e crescer com previsibilidade.',
    ],
    pills: [
      { icon: 'scissors', label: 'Barbearias' },
      { icon: 'sparkles', label: 'Salões de beleza' },
      { icon: 'face', label: 'Clínicas de estética' },
      { icon: 'tooth', label: 'Dentistas' },
      { icon: 'stethoscope', label: 'Clínicas médicas' },
      { icon: 'dumbbell', label: 'Personal trainers' },
      { icon: 'paw', label: 'Pet shops' },
      { icon: 'car', label: 'Serviços automotivos' },
      { icon: 'home', label: 'Serviços domiciliares' },
    ],
  },
  en: {
    eyebrow: 'Built for live booking operations',
    title: 'Designed for businesses where every empty slot means lost revenue.',
    description: [
      'For businesses that live on appointments, every minute counts.',
      'Horarius helps you fill more slots, cut no-shows and grow with predictability.',
    ],
    pills: [
      { icon: 'scissors', label: 'Barbershops' },
      { icon: 'sparkles', label: 'Beauty salons' },
      { icon: 'face', label: 'Aesthetic clinics' },
      { icon: 'tooth', label: 'Dentists' },
      { icon: 'stethoscope', label: 'Medical clinics' },
      { icon: 'dumbbell', label: 'Personal trainers' },
      { icon: 'paw', label: 'Pet shops' },
      { icon: 'car', label: 'Automotive services' },
      { icon: 'home', label: 'Home services' },
    ],
  },
  es: {
    eyebrow: 'Hecho para operaciones con agenda activa',
    title: 'Diseñado para negocios donde cada horario vacío significa ingresos perdidos.',
    description: [
      'Para negocios que dependen de las reservas, cada minuto cuenta.',
      'Horarius te ayuda a llenar más horarios, reducir ausencias y crecer con previsibilidad.',
    ],
    pills: [
      { icon: 'scissors', label: 'Barberías' },
      { icon: 'sparkles', label: 'Salones de belleza' },
      { icon: 'face', label: 'Clínicas estéticas' },
      { icon: 'tooth', label: 'Dentistas' },
      { icon: 'stethoscope', label: 'Clínicas médicas' },
      { icon: 'dumbbell', label: 'Entrenadores personales' },
      { icon: 'paw', label: 'Tiendas de mascotas' },
      { icon: 'car', label: 'Servicios automotrices' },
      { icon: 'home', label: 'Servicios a domicilio' },
    ],
  },
};
