import type { Language, LandingContent } from "../types";

export const hero: Record<Language, LandingContent["hero"]> = {
  pt: {
    trustBrand: "WhatsApp Business",
    trustDetail: "API oficial · número protegido",
    title: "Sua secretária de IA no WhatsApp",
    titleAccent: "atende, agenda e confirma por você.",
    subtitle:
      "Cliente chamando às 22h, mensagem no meio do atendimento, falta sem aviso. O Horarius responde na hora e mantém sua agenda cheia — sem você pegar no celular.",
    highlights: [
      { icon: "clock", label: "Responde em segundos, 24h" },
      { icon: "calendar", label: "Agenda sem conflito de horário" },
      { icon: "check", label: "Lembretes que derrubam faltas" },
    ],
    primaryCta: "Testar grátis",
    secondaryCta: "Ver como funciona",
    ctaNote: "Grátis para testar · Configura em 3 minutos · Cancele quando quiser",
    audience:
      "Para barbearias, clínicas, salões, estética, pet shops e muito mais.",
    phoneScenarios: [
      {
        business: "Barbearia Aurora",
        logo: "scissors",
        dayLabel: "Terça-feira, 17",
        slots: ["10h30", "14h00", "17h15"],
        greeting:
          "Olá! Sou o assistente virtual da Barbearia Aurora. Quer agendar um horário?",
        request: "Oi! Quero marcar um corte para terça.",
        offer:
          "Claro! Para terça-feira tenho esses horários disponíveis. Qual você prefere?",
        confirm: "Perfeito! Seu corte foi agendado para terça às {time}.",
      },
      {
        business: "Sorriso Odonto",
        logo: "tooth",
        dayLabel: "Quinta-feira, 19",
        slots: ["09h00", "11h30", "16h00"],
        greeting:
          "Olá! Sou o assistente virtual da Sorriso Odonto. Quer marcar uma consulta?",
        request: "Oi! Preciso de uma limpeza na quinta.",
        offer:
          "Claro! Para quinta-feira tenho estas opções. Qual fica melhor para você?",
        confirm: "Perfeito! Sua limpeza foi agendada para quinta às {time}.",
      },
      {
        business: "Studio Bela Pele",
        logo: "sparkle",
        dayLabel: "Sexta-feira, 20",
        slots: ["09h30", "13h00", "15h45"],
        greeting:
          "Olá! Sou o assistente virtual do Studio Bela Pele. Quer agendar um horário?",
        request: "Oi! Quero agendar uma limpeza de pele na sexta.",
        offer:
          "Ótimo! Para sexta-feira tenho esses horários livres. Qual prefere?",
        confirm:
          "Perfeito! Sua limpeza de pele foi agendada para sexta às {time}.",
      },
      {
        business: "Pet Amigo Fiel",
        logo: "paw",
        dayLabel: "Sábado, 21",
        slots: ["08h30", "10h00", "12h30"],
        greeting:
          "Olá! Sou o assistente virtual do Pet Amigo Fiel. Quer agendar banho ou tosa?",
        request: "Oi! Quero marcar banho para o meu cachorro no sábado.",
        offer: "Claro! Para sábado tenho esses horários. Qual funciona melhor?",
        confirm: "Perfeito! O banho ficou agendado para sábado às {time}.",
      },
    ],
    phoneBusinessLabel: "Conta comercial",
    phoneInputPlaceholder: "Mensagem",
    phoneDayDivider: "Hoje",
    phoneSlotAriaLabel: "Escolher o horário das {time} nesta demonstração",
    phoneDemoLabel:
      "Demonstração: conversa de agendamento no WhatsApp com o assistente do Horarius",
  },
  en: {
    trustBrand: "WhatsApp Business",
    trustDetail: "Official API · number protected",
    title: "Your AI secretary on WhatsApp",
    titleAccent: "answers, books and confirms for you.",
    subtitle:
      "Clients messaging at 10 pm, texts arriving mid-appointment, no-shows without warning. Horarius replies instantly and keeps your calendar full — without you touching your phone.",
    highlights: [
      { icon: "clock", label: "Replies in seconds, 24/7" },
      { icon: "calendar", label: "Books without double-booking" },
      { icon: "check", label: "Reminders that cut no-shows" },
    ],
    primaryCta: "Try it free",
    secondaryCta: "See how it works",
    ctaNote: "Free to try · Set up in 3 minutes · Cancel anytime",
    audience:
      "For barbershops, clinics, salons, skincare studios, pet shops and many more.",
    phoneScenarios: [
      {
        business: "Aurora Barbers",
        logo: "scissors",
        dayLabel: "Tuesday, 17",
        slots: ["10:30", "14:00", "17:15"],
        greeting:
          "Hi! I am the Aurora Barbers virtual assistant. Would you like to book an appointment?",
        request: "Hi! I want to book a haircut for Tuesday.",
        offer:
          "Sure! I have these time slots available on Tuesday. Which one works best for you?",
        confirm: "Perfect! Your haircut is booked for Tuesday at {time}.",
      },
      {
        business: "Sunrise Dental",
        logo: "tooth",
        dayLabel: "Thursday, 19",
        slots: ["09:00", "11:30", "16:00"],
        greeting:
          "Hi! I am the Sunrise Dental virtual assistant. Would you like to book a visit?",
        request: "Hi! I need a cleaning on Thursday.",
        offer:
          "Of course! These are the Thursday options. Which one suits you?",
        confirm: "Perfect! Your cleaning is booked for Thursday at {time}.",
      },
      {
        business: "Pure Skin Studio",
        logo: "sparkle",
        dayLabel: "Friday, 20",
        slots: ["09:30", "13:00", "15:45"],
        greeting:
          "Hi! I am the Pure Skin Studio virtual assistant. Would you like to book a session?",
        request: "Hi! I would like a facial on Friday.",
        offer: "Great! These Friday slots are open. Which do you prefer?",
        confirm: "Perfect! Your facial is booked for Friday at {time}.",
      },
      {
        business: "Happy Paws Pets",
        logo: "paw",
        dayLabel: "Saturday, 21",
        slots: ["08:30", "10:00", "12:30"],
        greeting:
          "Hi! I am the Happy Paws Pets virtual assistant. Want to book a bath or grooming?",
        request: "Hi! I want to book a bath for my dog on Saturday.",
        offer: "Sure! These Saturday slots are free. Which one works?",
        confirm: "Perfect! The bath is booked for Saturday at {time}.",
      },
    ],
    phoneBusinessLabel: "Business account",
    phoneInputPlaceholder: "Message",
    phoneDayDivider: "Today",
    phoneSlotAriaLabel: "Pick the {time} slot in this demo",
    phoneDemoLabel:
      "Demo: a WhatsApp booking conversation with the Horarius assistant",
  },
  es: {
    trustBrand: "WhatsApp Business",
    trustDetail: "API oficial · número protegido",
    title: "Tu secretaria de IA en WhatsApp",
    titleAccent: "atiende, agenda y confirma por ti.",
    subtitle:
      "Clientes escribiendo a las 22 h, mensajes en plena atención, ausencias sin aviso. Horarius responde al instante y mantiene tu agenda llena — sin que tengas que tocar el celular.",
    highlights: [
      { icon: "clock", label: "Responde en segundos, 24 h" },
      { icon: "calendar", label: "Agenda sin conflictos de horario" },
      { icon: "check", label: "Recordatorios que reducen ausencias" },
    ],
    primaryCta: "Probar gratis",
    secondaryCta: "Ver cómo funciona",
    ctaNote: "Gratis para probar · Se configura en 3 minutos · Cancela cuando quieras",
    audience:
      "Para barberías, clínicas, salones, estética, tiendas de mascotas y mucho más.",
    phoneScenarios: [
      {
        business: "Barbería Aurora",
        logo: "scissors",
        dayLabel: "Martes, 17",
        slots: ["10:30", "14:00", "17:15"],
        greeting:
          "¡Hola! Soy el asistente virtual de la Barbería Aurora. ¿Quieres reservar un turno?",
        request: "Hola. Quiero agendar un corte para el martes.",
        offer:
          "Claro. Para el martes tengo estos horarios disponibles. ¿Cuál prefieres?",
        confirm:
          "Perfecto. Tu corte quedó agendado para el martes a las {time}.",
      },
      {
        business: "Dental Sonrisa",
        logo: "tooth",
        dayLabel: "Jueves, 19",
        slots: ["09:00", "11:30", "16:00"],
        greeting:
          "¡Hola! Soy el asistente virtual de Dental Sonrisa. ¿Quieres reservar una consulta?",
        request: "Hola. Necesito una limpieza el jueves.",
        offer:
          "Claro. Para el jueves tengo estas opciones. ¿Cuál te queda mejor?",
        confirm:
          "Perfecto. Tu limpieza quedó agendada para el jueves a las {time}.",
      },
      {
        business: "Studio Piel Viva",
        logo: "sparkle",
        dayLabel: "Viernes, 20",
        slots: ["09:30", "13:00", "15:45"],
        greeting:
          "¡Hola! Soy el asistente virtual del Studio Piel Viva. ¿Quieres reservar una sesión?",
        request: "Hola. Quiero una limpieza facial el viernes.",
        offer:
          "¡Genial! Estos horarios del viernes están libres. ¿Cuál prefieres?",
        confirm:
          "Perfecto. Tu limpieza facial quedó agendada para el viernes a las {time}.",
      },
      {
        business: "Huellas Felices",
        logo: "paw",
        dayLabel: "Sábado, 21",
        slots: ["08:30", "10:00", "12:30"],
        greeting:
          "¡Hola! Soy el asistente virtual de Huellas Felices. ¿Quieres reservar baño o corte?",
        request: "Hola. Quiero un baño para mi perro el sábado.",
        offer: "Claro. Para el sábado tengo estos horarios. ¿Cuál te sirve?",
        confirm:
          "Perfecto. El baño quedó agendado para el sábado a las {time}.",
      },
    ],
    phoneBusinessLabel: "Cuenta comercial",
    phoneInputPlaceholder: "Mensaje",
    phoneDayDivider: "Hoy",
    phoneSlotAriaLabel: "Elegir el horario de las {time} en esta demostración",
    phoneDemoLabel:
      "Demostración: conversación de reserva por WhatsApp con el asistente de Horarius",
  },
};
