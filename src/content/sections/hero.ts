import type { Language, LandingContent } from '../types';

export const hero: Record<Language, LandingContent['hero']> = {
  pt: {
    eyebrow: 'Horarius · Recepção automatizada para negócios com agenda',
    title: 'Menos conversa perdida.',
    titleAccent: ' Mais horários preenchidos.',
    subtitle:
      'O Horarius transforma o WhatsApp em um fluxo de atendimento elegante e operacional para barbearias, clínicas, salões, pet shops e qualquer operação que dependa de agenda para vender.',
    primaryCta: 'Entrar no app',
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
        text: 'Perfeito! Seu corte foi agendado para terça às 14h.',
      },
    ],
    selectorTitle: 'Horários disponíveis',
    selectorLabel: 'Terça-feira, 17',
    selectorHint: 'Toque em um horário para selecionar',
    selectorOptions: ['10h30', '14h00', '17h15'],
    kickerValue: 'Agenda mais leve',
    kickerText: 'sem depender de alguém respondendo tudo manualmente.',
  },
  en: {
    eyebrow: 'Horarius · Automated front desk for appointment-based businesses',
    title: 'Fewer lost conversations.',
    titleAccent: ' More filled slots.',
    subtitle:
      'Horarius turns WhatsApp into an elegant, operational booking flow for barbershops, clinics, salons, pet shops, and any business that depends on appointments to sell.',
    primaryCta: 'Open app',
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
        text: 'Perfect! Your haircut is booked for Tuesday at 2 PM.',
      },
    ],
    selectorTitle: 'Available time slots',
    selectorLabel: 'Tuesday, 17',
    selectorHint: 'Tap a time to select it',
    selectorOptions: ['10:30', '14:00', '17:15'],
    kickerValue: 'Lighter schedule',
    kickerText: 'without relying on someone replying to every message by hand.',
  },
  es: {
    eyebrow: 'Horarius · Recepción automatizada para negocios con agenda',
    title: 'Menos conversaciones perdidas.',
    titleAccent: ' Más horarios ocupados.',
    subtitle:
      'Horarius convierte WhatsApp en un flujo de atención elegante y operativo para barberías, clínicas, salones, tiendas de mascotas y cualquier negocio que dependa de reservas para vender.',
    primaryCta: 'Entrar en la app',
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
        text: 'Perfecto. Tu corte quedó agendado para el martes a las 14:00.',
      },
    ],
    selectorTitle: 'Horarios disponibles',
    selectorLabel: 'Martes, 17',
    selectorHint: 'Toca un horario para seleccionarlo',
    selectorOptions: ['10:30', '14:00', '17:15'],
    kickerValue: 'Agenda más liviana',
    kickerText: 'sin depender de alguien respondiendo todo manualmente.',
  },
};
