import type { Language, LandingContent } from '../types';

export const howItWorks: Record<Language, LandingContent['howItWorks']> = {
  pt: {
    eyebrow: 'Como funciona',
    title: 'Do primeiro “oi” até a confirmação, tudo no mesmo ritmo',
    description:
      'O fluxo foi pensado para reduzir trabalho manual sem parecer frio. Ele mantém a conversa natural e avança a agenda com contexto.',
    steps: [
      {
        number: '01',
        title: 'Configure a operação',
        description:
          'Defina serviços, duração, profissionais, disponibilidade e regras de atendimento para o Horarius falar no tom certo da sua marca.',
      },
      {
        number: '02',
        title: 'Receba pedidos pelo WhatsApp',
        description:
          'O cliente conversa com a IA, escolhe serviço, horário e profissional, sem depender de troca manual de mensagens.',
      },
      {
        number: '03',
        title: 'Confirme e mantenha a agenda viva',
        description:
          'Confirmações, lembretes e remarcações acontecem no mesmo fluxo para sua agenda continuar organizada durante todo o dia.',
      },
    ],
  },
  en: {
    eyebrow: 'How it works',
    title: 'From the first hello to confirmation, everything moves in one rhythm',
    description:
      'The flow was designed to reduce manual work without feeling cold. It keeps the conversation natural and moves the schedule forward with context.',
    steps: [
      {
        number: '01',
        title: 'Configure the operation',
        description:
          'Define services, duration, professionals, availability, and service rules so Horarius speaks in the right tone for your brand.',
      },
      {
        number: '02',
        title: 'Receive requests through WhatsApp',
        description:
          'The customer talks to the AI, chooses service, time slot, and professional without manual back-and-forth.',
      },
      {
        number: '03',
        title: 'Confirm and keep the schedule active',
        description:
          'Confirmations, reminders, and rescheduling happen in the same flow so your calendar stays organized all day.',
      },
    ],
  },
  es: {
    eyebrow: 'Cómo funciona',
    title: 'Del primer “hola” hasta la confirmación, todo avanza con el mismo ritmo',
    description:
      'El flujo fue pensado para reducir trabajo manual sin sentirse frío. Mantiene la conversación natural y hace avanzar la agenda con contexto.',
    steps: [
      {
        number: '01',
        title: 'Configura la operación',
        description:
          'Define servicios, duración, profesionales, disponibilidad y reglas de atención para que Horarius hable con el tono correcto de tu marca.',
      },
      {
        number: '02',
        title: 'Recibe solicitudes por WhatsApp',
        description:
          'El cliente conversa con la IA, elige servicio, horario y profesional sin el intercambio manual de mensajes.',
      },
      {
        number: '03',
        title: 'Confirma y mantén la agenda activa',
        description:
          'Confirmaciones, recordatorios y reprogramaciones suceden en el mismo flujo para que tu agenda siga organizada durante todo el día.',
      },
    ],
  },
};
