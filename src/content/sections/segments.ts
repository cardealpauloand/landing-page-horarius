import type { Language, LandingContent } from '../types';

export const segments: Record<Language, LandingContent['segments']> = {
  pt: {
    eyebrow: 'Segmentos atendidos',
    title: 'Uma estrutura flexível para rotinas muito diferentes',
    description:
      'O Horarius atende operações que precisam responder rápido, manter contexto e organizar disponibilidade sem depender de improviso.',
    items: [
      {
        title: 'Beleza e bem-estar',
        description:
          'Barbearias, salões, esmalterias, clínicas de estética e studios que precisam reduzir o vai-e-volta no atendimento.',
      },
      {
        title: 'Saúde',
        description:
          'Dentistas, clínicas médicas, psicólogos e profissionais que dependem de triagem rápida e agenda previsível.',
      },
      {
        title: 'Fitness e aulas',
        description:
          'Personal trainers, studios e escolas com turmas, avaliações e encaixes recorrentes.',
      },
      {
        title: 'Pets',
        description:
          'Pet shops, banho e tosa e clínicas veterinárias com alta recorrência e muitos pedidos por mensagem.',
      },
      {
        title: 'Automotivo',
        description:
          'Lavagens, estética automotiva, oficinas e serviços rápidos que precisam organizar janelas e confirmações.',
      },
      {
        title: 'Serviços em campo',
        description:
          'Instalações, manutenção, suporte técnico e atendimentos domiciliares com agenda móvel e alta urgência.',
      },
    ],
  },
  en: {
    eyebrow: 'Supported segments',
    title: 'A flexible structure for very different routines',
    description:
      'Horarius serves operations that need to answer quickly, keep context, and organize availability without relying on improvisation.',
    items: [
      {
        title: 'Beauty and wellness',
        description:
          'Barbershops, salons, nail studios, aesthetic clinics, and studios that need to reduce back-and-forth in service.',
      },
      {
        title: 'Healthcare',
        description:
          'Dentists, medical clinics, psychologists, and professionals who rely on fast triage and a predictable calendar.',
      },
      {
        title: 'Fitness and classes',
        description:
          'Personal trainers, studios, and schools with classes, assessments, and recurring bookings.',
      },
      {
        title: 'Pets',
        description:
          'Pet shops, grooming businesses, and veterinary clinics with high repeat demand and many message-based requests.',
      },
      {
        title: 'Automotive',
        description:
          'Detailing, car wash, repair shops, and quick services that need to manage time windows and confirmations.',
      },
      {
        title: 'Field services',
        description:
          'Installations, maintenance, technical support, and home visits with mobile schedules and urgent demand.',
      },
    ],
  },
  es: {
    eyebrow: 'Segmentos atendidos',
    title: 'Una estructura flexible para rutinas muy diferentes',
    description:
      'Horarius atiende operaciones que necesitan responder rápido, mantener contexto y organizar disponibilidad sin depender de improvisación.',
    items: [
      {
        title: 'Belleza y bienestar',
        description:
          'Barberías, salones, estudios de uñas, clínicas estéticas y estudios que necesitan reducir el ida y vuelta en la atención.',
      },
      {
        title: 'Salud',
        description:
          'Dentistas, clínicas médicas, psicólogos y profesionales que dependen de una triage rápida y una agenda predecible.',
      },
      {
        title: 'Fitness y clases',
        description:
          'Entrenadores personales, estudios y escuelas con clases, evaluaciones y reservas recurrentes.',
      },
      {
        title: 'Mascotas',
        description:
          'Tiendas de mascotas, peluquerías caninas y clínicas veterinarias con alta recurrencia y muchos pedidos por mensaje.',
      },
      {
        title: 'Automotriz',
        description:
          'Lavaderos, estética automotriz, talleres y servicios rápidos que necesitan organizar ventanas de tiempo y confirmaciones.',
      },
      {
        title: 'Servicios en campo',
        description:
          'Instalaciones, mantenimiento, soporte técnico y visitas a domicilio con agenda móvil y demanda urgente.',
      },
    ],
  },
};
