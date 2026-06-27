import type { Language, LandingContent } from '../types';

export const faq: Record<Language, LandingContent['faq']> = {
  pt: {
    eyebrow: 'Perguntas frequentes',
    title: 'As dúvidas que normalmente aparecem antes da decisão',
    description:
      'O foco do Horarius é transformar atendimento por mensagem em fluxo operacional, sem complicar a rotina da equipe.',
    items: [
      {
        question: 'O Horarius serve só para barbearias ou salões?',
        answer:
          'Não. Ele foi pensado para qualquer operação que viva de agenda e atendimento recorrente por WhatsApp, de clínicas a serviços automotivos.',
      },
      {
        question: 'O cliente fala com uma IA ou com alguém da equipe?',
        answer:
          'O fluxo inicial acontece com a IA do Horarius. Ela coleta contexto, mostra disponibilidade, confirma o horário e pode reduzir bastante o trabalho manual.',
      },
      {
        question: 'Dá para usar como canal principal de agendamento?',
        answer:
          'Sim. A proposta é transformar o WhatsApp em um canal operacional, não apenas em um inbox informal de mensagens soltas.',
      },
      {
        question: 'E se eu tiver mais de um profissional ou serviço?',
        answer:
          'O fluxo contempla serviços com durações diferentes, equipes e regras de disponibilidade para evitar conflito na agenda.',
      },
      {
        question: 'Como começo a testar?',
        answer:
          'Basta chamar no WhatsApp. O time coleta seu cenário, entende volume e rotina de agenda e orienta a configuração inicial.',
      },
    ],
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title: 'The questions that usually come up before the decision',
    description:
      'Horarius is focused on turning message-based service into an operational flow without making the team’s routine more complex.',
    items: [
      {
        question: 'Is Horarius only for barbershops or beauty salons?',
        answer:
          'No. It was built for any operation that runs on appointments and recurring WhatsApp conversations, from clinics to automotive services.',
      },
      {
        question: 'Does the customer speak to AI or to someone on the team?',
        answer:
          'The initial flow is handled by Horarius AI. It gathers context, shows availability, confirms the slot, and can greatly reduce manual work.',
      },
      {
        question: 'Can it be used as the main booking channel?',
        answer:
          'Yes. The idea is to turn WhatsApp into an operational channel, not just an informal inbox full of loose messages.',
      },
      {
        question: 'What if I have more than one professional or service?',
        answer:
          'The flow supports services with different durations, teams, and availability rules to avoid schedule conflicts.',
      },
      {
        question: 'How do I start testing?',
        answer:
          'Just reach out on WhatsApp. The team will review your scenario, understand your booking routine, and guide the initial setup.',
      },
    ],
  },
  es: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Las dudas que suelen aparecer antes de decidir',
    description:
      'El foco de Horarius es convertir la atención por mensajes en un flujo operativo, sin complicar la rutina del equipo.',
    items: [
      {
        question: '¿Horarius sirve solo para barberías o salones?',
        answer:
          'No. Fue pensado para cualquier operación que viva de reservas y conversaciones recurrentes por WhatsApp, desde clínicas hasta servicios automotrices.',
      },
      {
        question: '¿El cliente habla con una IA o con alguien del equipo?',
        answer:
          'El flujo inicial ocurre con la IA de Horarius. Recoge contexto, muestra disponibilidad, confirma el horario y puede reducir mucho el trabajo manual.',
      },
      {
        question: '¿Se puede usar como canal principal de reservas?',
        answer:
          'Sí. La propuesta es convertir WhatsApp en un canal operativo, no solo en una bandeja informal llena de mensajes sueltos.',
      },
      {
        question: '¿Y si tengo más de un profesional o servicio?',
        answer:
          'El flujo contempla servicios con distintas duraciones, equipos y reglas de disponibilidad para evitar conflictos en la agenda.',
      },
      {
        question: '¿Cómo empiezo a probarlo?',
        answer:
          'Solo tienes que escribir por WhatsApp. El equipo revisará tu escenario, entenderá tu rutina de agenda y te guiará en la configuración inicial.',
      },
    ],
  },
};
