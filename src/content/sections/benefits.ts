import type { Language, LandingContent } from '../types';

export const benefits: Record<Language, LandingContent['benefits']> = {
  pt: {
    eyebrow: 'Benefícios principais',
    title: 'Uma operação de agenda com mais ritmo e menos atrito',
    description:
      'Em vez de empilhar mensagens, sua equipe ganha um fluxo que responde rápido, organiza disponibilidade e segura a agenda ao longo do dia.',
    items: [
      {
        eyebrow: 'Velocidade operacional',
        title: 'Respostas instantâneas sem depender de alguém no celular',
        description:
          'O Horarius transforma o WhatsApp em uma recepção ativa que responde, apresenta horários e conduz o cliente até o agendamento.',
      },
      {
        eyebrow: 'Menos no-show',
        title: 'Confirmações e lembretes automáticos para proteger a agenda',
        description:
          'Clientes recebem confirmações rápidas, lembretes e opções de remarcação sem sua equipe precisar perseguir cada conversa.',
      },
      {
        eyebrow: 'Rotina centralizada',
        title: 'Agenda, equipe e disponibilidade organizadas no mesmo fluxo',
        description:
          'Evite desencontro entre horários, profissionais e serviços com uma lógica única de atendimento para toda a operação.',
      },
      {
        eyebrow: 'Mais clareza comercial',
        title: 'Uma operação mais previsível para vender melhor os horários',
        description:
          'Entenda o volume de demanda, horários de pico e gargalos de atendimento sem depender de improviso ou planilhas soltas.',
      },
    ],
  },
  en: {
    eyebrow: 'Core benefits',
    title: 'A booking operation with more rhythm and less friction',
    description:
      'Instead of stacking messages, your team gets a flow that answers fast, organizes availability, and protects the schedule throughout the day.',
    items: [
      {
        eyebrow: 'Operational speed',
        title: 'Instant responses without depending on someone holding the phone',
        description:
          'Horarius turns WhatsApp into an active front desk that replies, presents available slots, and guides the customer all the way to the booking.',
      },
      {
        eyebrow: 'Less no-show',
        title: 'Automatic confirmations and reminders to protect the schedule',
        description:
          'Customers receive quick confirmations, reminders, and rescheduling options without your team chasing every conversation.',
      },
      {
        eyebrow: 'Centralized routine',
        title: 'Schedule, staff, and availability organized in a single flow',
        description:
          'Avoid conflicts between time slots, professionals, and services with one consistent booking logic for the whole operation.',
      },
      {
        eyebrow: 'Commercial clarity',
        title: 'A more predictable operation to sell your available time better',
        description:
          'Understand demand volume, peak hours, and service bottlenecks without relying on improvisation or scattered spreadsheets.',
      },
    ],
  },
  es: {
    eyebrow: 'Beneficios principales',
    title: 'Una operación de agenda con más ritmo y menos fricción',
    description:
      'En lugar de acumular mensajes, tu equipo gana un flujo que responde rápido, organiza la disponibilidad y protege la agenda durante todo el día.',
    items: [
      {
        eyebrow: 'Velocidad operativa',
        title: 'Respuestas instantáneas sin depender de alguien con el celular',
        description:
          'Horarius convierte WhatsApp en una recepción activa que responde, muestra horarios disponibles y guía al cliente hasta la reserva.',
      },
      {
        eyebrow: 'Menos ausencias',
        title: 'Confirmaciones y recordatorios automáticos para proteger la agenda',
        description:
          'Los clientes reciben confirmaciones rápidas, recordatorios y opciones para reprogramar sin que tu equipo persiga cada conversación.',
      },
      {
        eyebrow: 'Rutina centralizada',
        title: 'Agenda, equipo y disponibilidad organizados en un solo flujo',
        description:
          'Evita conflictos entre horarios, profesionales y servicios con una lógica consistente para toda la operación.',
      },
      {
        eyebrow: 'Claridad comercial',
        title: 'Una operación más predecible para vender mejor tus horarios',
        description:
          'Entiende el volumen de demanda, los horarios pico y los cuellos de botella sin depender de improvisación o planillas dispersas.',
      },
    ],
  },
};
