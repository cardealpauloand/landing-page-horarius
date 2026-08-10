import type { Language, LandingContent } from '../types';

export const segments: Record<Language, LandingContent['segments']> = {
  pt: {
    eyebrow: 'Segmentos atendidos',
    title: 'Feito para o seu tipo de negócio',
    description:
      'O Horarius atende operações que precisam responder rápido, manter contexto e organizar disponibilidade sem depender de improviso. Os principais segmentos têm página própria, com as dores e as soluções do nicho.',
    itemLinkLabel: 'Ver página completa',
    items: [
      {
        icon: 'scissors',
        title: 'Barbearias',
        description:
          'A IA atende o WhatsApp enquanto você corta: agenda, confirma e preenche o horário de quem cancelou.',
        segment: 'barbershops',
        imageAlt: 'Barbeiro finalizando o corte de um cliente na cadeira da barbearia',
      },
      {
        icon: 'sparkles',
        title: 'Salões de beleza',
        description:
          'Várias profissionais, durações diferentes e clientes que somem — agenda organizada e campanhas de retorno.',
        segment: 'salons',
        imageAlt: 'Cabeleireira escovando o cabelo de uma cliente no salão de beleza',
      },
      {
        icon: 'flower',
        title: 'Clínicas de estética',
        description:
          'Sessões confirmadas, faltas controladas e retorno pós-procedimento na hora certa, com planos para pacotes.',
        segment: 'aesthetics',
        imageAlt: 'Esteticista aplicando um procedimento facial em uma cliente na maca',
      },
      {
        icon: 'paw',
        title: 'Pet shops',
        description:
          'O tutor marca banho e tosa sozinho, os lembretes evitam faltas e a recorrência mantém a semana cheia.',
        segment: 'pets',
      },
      {
        icon: 'stethoscope',
        title: 'Saúde',
        description:
          'Dentistas, clínicas médicas, psicólogos e profissionais que dependem de triagem rápida e agenda previsível.',
      },
      {
        icon: 'wrench',
        title: 'Automotivo e serviços em campo',
        description:
          'Estética automotiva, oficinas, instalações e atendimento domiciliar: janelas organizadas e confirmações automáticas.',
      },
    ],
  },
  en: {
    eyebrow: 'Supported segments',
    title: 'Built for your kind of business',
    description:
      'Horarius serves operations that need to answer quickly, keep context, and organize availability without relying on improvisation. The main segments have their own page, with the pains and solutions of each niche.',
    itemLinkLabel: 'See the full page',
    items: [
      {
        icon: 'scissors',
        title: 'Barbershops',
        description:
          'The AI answers WhatsApp while you cut: it books, confirms and refills the slot when someone cancels.',
        segment: 'barbershops',
        imageAlt: 'Barber finishing a client\'s haircut in the barbershop chair',
      },
      {
        icon: 'sparkles',
        title: 'Beauty salons',
        description:
          'Several professionals, different durations and clients who vanish — an organized calendar plus win-back campaigns.',
        segment: 'salons',
        imageAlt: 'Hairstylist blow-drying a client\'s hair at the beauty salon',
      },
      {
        icon: 'flower',
        title: 'Aesthetic clinics',
        description:
          'Confirmed sessions, no-shows under control and post-procedure follow-ups on time, with plans for packages.',
        segment: 'aesthetics',
        imageAlt: 'Aesthetician performing a facial treatment on a client',
      },
      {
        icon: 'paw',
        title: 'Pet shops',
        description:
          'Pet parents book baths and grooming on their own, reminders prevent no-shows and recurrence keeps the week full.',
        segment: 'pets',
      },
      {
        icon: 'stethoscope',
        title: 'Healthcare',
        description:
          'Dentists, medical clinics, psychologists, and professionals who rely on fast triage and a predictable calendar.',
      },
      {
        icon: 'wrench',
        title: 'Automotive and field services',
        description:
          'Detailing, repair shops, installations and home visits: organized time windows and automatic confirmations.',
      },
    ],
  },
  es: {
    eyebrow: 'Segmentos atendidos',
    title: 'Hecho para tu tipo de negocio',
    description:
      'Horarius atiende operaciones que necesitan responder rápido, mantener contexto y organizar disponibilidad sin depender de improvisación. Los segmentos principales tienen página propia, con los dolores y las soluciones de cada nicho.',
    itemLinkLabel: 'Ver la página completa',
    items: [
      {
        icon: 'scissors',
        title: 'Barberías',
        description:
          'La IA atiende WhatsApp mientras cortas: agenda, confirma y vuelve a llenar el horario cuando alguien cancela.',
        segment: 'barbershops',
        imageAlt: 'Barbero terminando el corte de un cliente en la silla de la barbería',
      },
      {
        icon: 'sparkles',
        title: 'Salones de belleza',
        description:
          'Varias profesionales, duraciones distintas y clientas que desaparecen — agenda organizada y campañas de regreso.',
        segment: 'salons',
        imageAlt: 'Peluquera secando el cabello de una clienta en el salón de belleza',
      },
      {
        icon: 'flower',
        title: 'Clínicas de estética',
        description:
          'Sesiones confirmadas, ausencias bajo control y seguimiento post-procedimiento a tiempo, con planes para paquetes.',
        segment: 'aesthetics',
        imageAlt: 'Esteticista aplicando un tratamiento facial a una clienta',
      },
      {
        icon: 'paw',
        title: 'Pet shops',
        description:
          'El tutor agenda baño y peluquería solo, los recordatorios evitan ausencias y la recurrencia llena la semana.',
        segment: 'pets',
      },
      {
        icon: 'stethoscope',
        title: 'Salud',
        description:
          'Dentistas, clínicas médicas, psicólogos y profesionales que dependen de una triage rápida y una agenda predecible.',
      },
      {
        icon: 'wrench',
        title: 'Automotriz y servicios en campo',
        description:
          'Estética automotriz, talleres, instalaciones y visitas a domicilio: ventanas organizadas y confirmaciones automáticas.',
      },
    ],
  },
};
