import type { Language, LandingContent } from '../types';

export const hero: Record<Language, LandingContent['hero']> = {
  pt: {
    eyebrow: 'Horarius · Recepção automatizada para negócios com agenda',
    title: 'Sua agenda cheia.',
    titleAccent: ' Clientes confirmando sozinhos pelo WhatsApp.',
    titleFull: 'Sua agenda cheia e os clientes confirmando sozinhos pelo WhatsApp.',
    titleAccentRotating: [
      'Clientes confirmando sozinhos pelo WhatsApp.',
      'Lembretes automáticos que evitam faltas.',
      'Atendimento 24/7, mesmo fora do expediente.',
      'Menos tempo respondendo, mais tempo atendendo.',
    ],
    subtitle:
      'O Horarius transforma o WhatsApp em um fluxo de atendimento elegante e operacional para barbearias, clínicas, salões, pet shops e qualquer operação que dependa de agenda para vender.',
    primaryCta: 'Começar grátis',
    secondaryCta: 'Ver o fluxo',
    metrics: [
      { value: '24/7', label: 'atendimento no WhatsApp, mesmo fora do expediente' },
      { value: '1 fluxo', label: 'para captar, confirmar e remarcar sem atrito' },
      { value: '0 caos', label: 'na agenda quando a demanda aperta' },
    ],
    noticeLabel: 'Operação em movimento',
    noticeText: 'Pedidos entram, horários aparecem e confirmações saem no mesmo fluxo.',
    messages: [
      { role: 'client', text: 'Oi! Quero marcar um corte para terça.' },
      {
        role: 'assistant',
        text: 'Claro! Para terça-feira tenho esses horários disponíveis. Qual você prefere?',
      },
      {
        role: 'assistant',
        text: 'Perfeito! Seu corte foi agendado para terça às {time}.',
      },
    ],
    selectorLabel: 'Terça-feira, 17',
    selectorOptions: ['10h30', '14h00', '17h15'],
    kickerValue: 'Agenda mais leve',
    kickerText: 'sem depender de alguém respondendo tudo manualmente.',
    showcaseAlt:
      'Conversa no WhatsApp: o cliente pede um horário, o assistente do Horarius mostra as opções de terça-feira e confirma o agendamento das 14h00.',
    phoneBusinessLabel: 'Conta comercial',
    phoneInputPlaceholder: 'Mensagem',
    phoneDayDivider: 'Hoje',
    phoneGreeting: 'Olá! Sou o assistente virtual do Horarius. Quer agendar um horário?',
    phoneSlotAriaLabel: 'Escolher o horário das {time} nesta demonstração',
    phoneDemoLabel: 'Demonstração: conversa de agendamento no WhatsApp com o assistente do Horarius',
  },
  en: {
    eyebrow: 'Horarius · Automated front desk for appointment-based businesses',
    title: 'A full calendar.',
    titleAccent: ' Clients confirming on their own via WhatsApp.',
    titleFull: 'A full calendar and clients confirming on their own via WhatsApp.',
    titleAccentRotating: [
      'Clients confirming on their own via WhatsApp.',
      'Automatic reminders that prevent no-shows.',
      '24/7 replies, even outside business hours.',
      'Less time replying, more time serving clients.',
    ],
    subtitle:
      'Horarius turns WhatsApp into an elegant, operational booking flow for barbershops, clinics, salons, pet shops, and any business that depends on appointments to sell.',
    primaryCta: 'Start free',
    secondaryCta: 'See the flow',
    metrics: [
      { value: '24/7', label: 'WhatsApp assistance, even outside business hours' },
      { value: '1 flow', label: 'to capture, confirm, and reschedule without friction' },
      { value: '0 chaos', label: 'in the schedule when demand gets busy' },
    ],
    noticeLabel: 'Operations in motion',
    noticeText: 'Requests arrive, slots appear, and confirmations are sent in one flow.',
    messages: [
      { role: 'client', text: 'Hi! I want to book a haircut for Tuesday.' },
      {
        role: 'assistant',
        text: 'Sure! I have these time slots available on Tuesday. Which one works best for you?',
      },
      {
        role: 'assistant',
        text: 'Perfect! Your haircut is booked for Tuesday at {time}.',
      },
    ],
    selectorLabel: 'Tuesday, 17',
    selectorOptions: ['10:30', '14:00', '17:15'],
    kickerValue: 'Lighter schedule',
    kickerText: 'without relying on someone replying to every message by hand.',
    showcaseAlt:
      'A WhatsApp conversation: the client asks for an appointment, the Horarius assistant shows Tuesday time slots and confirms the 14:00 booking.',
    phoneBusinessLabel: 'Business account',
    phoneInputPlaceholder: 'Message',
    phoneDayDivider: 'Today',
    phoneGreeting: 'Hi! I am the Horarius virtual assistant. Would you like to book an appointment?',
    phoneSlotAriaLabel: 'Pick the {time} slot in this demo',
    phoneDemoLabel: 'Demo: a WhatsApp booking conversation with the Horarius assistant',
  },
  es: {
    eyebrow: 'Horarius · Recepción automatizada para negocios con agenda',
    title: 'Tu agenda llena.',
    titleAccent: ' Clientes confirmando solos por WhatsApp.',
    titleFull: 'Tu agenda llena y los clientes confirmando solos por WhatsApp.',
    titleAccentRotating: [
      'Clientes confirmando solos por WhatsApp.',
      'Recordatorios automáticos que evitan ausencias.',
      'Atención 24/7, incluso fuera del horario.',
      'Menos tiempo respondiendo, más tiempo atendiendo.',
    ],
    subtitle:
      'Horarius convierte WhatsApp en un flujo de atención elegante y operativo para barberías, clínicas, salones, tiendas de mascotas y cualquier negocio que dependa de reservas para vender.',
    primaryCta: 'Empezar gratis',
    secondaryCta: 'Ver el flujo',
    metrics: [
      { value: '24/7', label: 'atención por WhatsApp incluso fuera del horario laboral' },
      { value: '1 flujo', label: 'para captar, confirmar y reprogramar sin fricción' },
      { value: '0 caos', label: 'en la agenda cuando la demanda se intensifica' },
    ],
    noticeLabel: 'Operación en movimiento',
    noticeText: 'Los pedidos entran, los horarios aparecen y las confirmaciones salen en un solo flujo.',
    messages: [
      { role: 'client', text: 'Hola. Quiero agendar un corte para el martes.' },
      {
        role: 'assistant',
        text: 'Claro. Para el martes tengo estos horarios disponibles. ¿Cuál prefieres?',
      },
      {
        role: 'assistant',
        text: 'Perfecto. Tu corte quedó agendado para el martes a las {time}.',
      },
    ],
    selectorLabel: 'Martes, 17',
    selectorOptions: ['10:30', '14:00', '17:15'],
    kickerValue: 'Agenda más liviana',
    kickerText: 'sin depender de alguien respondiendo todo manualmente.',
    showcaseAlt:
      'Conversación de WhatsApp: el cliente pide un turno, el asistente de Horarius muestra los horarios del martes y confirma la reserva de las 14:00.',
    phoneBusinessLabel: 'Cuenta comercial',
    phoneInputPlaceholder: 'Mensaje',
    phoneDayDivider: 'Hoy',
    phoneGreeting: '¡Hola! Soy el asistente virtual de Horarius. ¿Quieres reservar un turno?',
    phoneSlotAriaLabel: 'Elegir el horario de las {time} en esta demostración',
    phoneDemoLabel: 'Demostración: conversación de reserva por WhatsApp con el asistente de Horarius',
  },
};
