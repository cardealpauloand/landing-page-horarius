import type { Language, LandingContent } from '../types';

/* FAQ de objeções: cada pergunta é uma razão real para NÃO assinar, respondida
   de frente. Vira FAQPage no JSON-LD da home — manter respostas autocontidas
   (sem "veja acima" nem links) e só prometer o que o produto entrega. */
export const faq: Record<Language, LandingContent['faq']> = {
  pt: {
    eyebrow: 'Perguntas frequentes',
    title: 'O que perguntam antes de assinar',
    description:
      'Respostas diretas para as dúvidas que aparecem antes da decisão — sem letra miúda.',
    items: [
      {
        question: 'Preciso trocar o número de WhatsApp do meu negócio?',
        answer:
          'Não. O Horarius usa a API oficial do WhatsApp Business (Meta) no número que seus clientes já têm salvo — sem QR code, sem celular ligado 24h e sem o risco de banimento das automações não oficiais.',
      },
      {
        question: 'O cliente percebe que está falando com uma IA?',
        answer:
          'A IA se apresenta como assistente do seu negócio e responde com seus serviços, preços e horários reais. Quando o assunto precisa de gente, você assume a conversa do ponto em que ela parou — sem o cliente repetir nada.',
      },
      {
        question: 'Serve para o meu tipo de negócio?',
        answer:
          'O Horarius atende qualquer operação que viva de agenda: barbearias, salões, clínicas de estética, pet shops, saúde, automotivo e serviços em campo. Os principais segmentos têm página própria mostrando o produto no seu nicho.',
      },
      {
        question: 'E se eu tiver vários profissionais e serviços com durações diferentes?',
        answer:
          'O fluxo contempla equipes, serviços com durações próprias e regras de disponibilidade por profissional — a IA só oferece horários que cabem de verdade na agenda, sem conflito.',
      },
      {
        question: 'Tem fidelidade ou multa para cancelar?',
        answer:
          'Não. Você testa grátis antes de assinar, sem cartão de crédito, e pode cancelar ou trocar de plano quando quiser.',
      },
      {
        question: 'O que são as notificações por mês dos planos?',
        answer:
          'São as mensagens automáticas que o Horarius envia no WhatsApp — confirmações, lembretes e avisos de lista de espera. Os agendamentos em si são ilimitados em todos os planos. O Agenda não envia por WhatsApp (os lembretes saem por e-mail); o Solo inclui 200 notificações por mês, o Pro inclui 600, e no Empresas o volume é definido sob consulta.',
      },
      {
        question: 'Quanto tempo leva para começar?',
        answer:
          'Crie sua conta grátis, responda ao onboarding de cerca de três minutos e teste sua agenda e a IA na hora. O WhatsApp é opcional e pode ser ativado depois com nossa equipe.',
      },
    ],
    highlights: [
      {
        icon: 'shield',
        title: 'Sem fidelidade',
        description: 'Cancele quando quiser, sem multa nem burocracia.',
      },
      {
        icon: 'bolt',
        title: 'Setup rápido',
        description: 'Conta criada e agenda no ar em cerca de 3 minutos.',
      },
      {
        icon: 'support',
        title: 'Suporte humanizado',
        description: 'Nosso time responde no WhatsApp quando você precisar.',
      },
    ],
    support: {
      title: 'Ainda ficou com dúvida?',
      description:
        'Fale com a nossa equipe no WhatsApp e receba um atendimento rápido e personalizado.',
      ctaLabel: 'Falar no WhatsApp',
    },
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title: 'What people ask before subscribing',
    description:
      'Straight answers to the questions that come up before the decision — no fine print.',
    items: [
      {
        question: 'Do I need to change my business WhatsApp number?',
        answer:
          'No. Horarius uses the official WhatsApp Business API (Meta) on the number your clients already have saved — no QR code, no phone that must stay on 24/7, and none of the ban risk of unofficial automations.',
      },
      {
        question: 'Will clients notice they are talking to an AI?',
        answer:
          'The AI introduces itself as your business assistant and answers with your real services, prices and time slots. When a conversation needs a human, you take it over from where it stopped — the client never repeats themselves.',
      },
      {
        question: 'Does it work for my kind of business?',
        answer:
          'Horarius serves any operation that runs on appointments: barbershops, salons, aesthetic clinics, pet shops, healthcare, automotive and field services. The main segments have their own page showing the product in their niche.',
      },
      {
        question: 'What if I have several professionals and services with different durations?',
        answer:
          'The flow supports teams, services with their own durations and per-professional availability rules — the AI only offers slots that genuinely fit the schedule, with no conflicts.',
      },
      {
        question: 'Is there a lock-in or cancellation fee?',
        answer:
          'No. You try it free before subscribing, without a credit card, and can cancel or change plans whenever you want.',
      },
      {
        question: 'What are the monthly notifications in the plans?',
        answer:
          'They are the automatic WhatsApp messages Horarius sends — confirmations, reminders and waitlist offers. Appointments themselves are unlimited on every plan. Calendar does not send over WhatsApp (its reminders go by email); Solo includes 200 notifications per month, Pro includes 600, and on Teams the volume is set on request.',
      },
      {
        question: 'How long does it take to get started?',
        answer:
          'Create your free account, complete the roughly three-minute onboarding, and test your schedule and AI right away. WhatsApp is optional and can be activated later with our team.',
      },
    ],
    highlights: [
      {
        icon: 'shield',
        title: 'No lock-in',
        description: 'Cancel whenever you want, no penalty and no paperwork.',
      },
      {
        icon: 'bolt',
        title: 'Quick setup',
        description: 'Account created and calendar live in about 3 minutes.',
      },
      {
        icon: 'support',
        title: 'Human support',
        description: 'Our team answers on WhatsApp whenever you need it.',
      },
    ],
    support: {
      title: 'Still not sure?',
      description:
        'Talk to our team on WhatsApp and get a quick, personal answer.',
      ctaLabel: 'Chat on WhatsApp',
    },
  },
  es: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que preguntan antes de suscribirse',
    description:
      'Respuestas directas a las dudas que aparecen antes de decidir — sin letra pequeña.',
    items: [
      {
        question: '¿Necesito cambiar el número de WhatsApp de mi negocio?',
        answer:
          'No. Horarius usa la API oficial de WhatsApp Business (Meta) en el número que tus clientes ya tienen guardado — sin QR, sin celular encendido 24 h y sin el riesgo de bloqueo de las automatizaciones no oficiales.',
      },
      {
        question: '¿El cliente nota que habla con una IA?',
        answer:
          'La IA se presenta como asistente de tu negocio y responde con tus servicios, precios y horarios reales. Cuando la conversación necesita a una persona, la asumes donde quedó — sin que el cliente repita nada.',
      },
      {
        question: '¿Sirve para mi tipo de negocio?',
        answer:
          'Horarius atiende cualquier operación que viva de reservas: barberías, salones, clínicas de estética, pet shops, salud, automotriz y servicios en campo. Los segmentos principales tienen página propia mostrando el producto en su nicho.',
      },
      {
        question: '¿Y si tengo varios profesionales y servicios con duraciones distintas?',
        answer:
          'El flujo contempla equipos, servicios con duraciones propias y reglas de disponibilidad por profesional — la IA solo ofrece horarios que de verdad caben en la agenda, sin conflictos.',
      },
      {
        question: '¿Hay permanencia o multa por cancelar?',
        answer:
          'No. Pruebas gratis antes de suscribirte, sin tarjeta de crédito, y puedes cancelar o cambiar de plan cuando quieras.',
      },
      {
        question: '¿Qué son las notificaciones por mes de los planes?',
        answer:
          'Son los mensajes automáticos que Horarius envía por WhatsApp — confirmaciones, recordatorios y avisos de lista de espera. Las reservas en sí son ilimitadas en todos los planes. Agenda no envía por WhatsApp (sus recordatorios salen por correo); Solo incluye 200 notificaciones por mes, Pro incluye 600 y en Empresas el volumen se define a consulta.',
      },
      {
        question: '¿Cuánto tarda en empezar a funcionar?',
        answer:
          'Crea tu cuenta gratis, completa el onboarding de unos tres minutos y prueba tu agenda y la IA de inmediato. WhatsApp es opcional y puedes activarlo después con nuestro equipo.',
      },
    ],
    highlights: [
      {
        icon: 'shield',
        title: 'Sin permanencia',
        description: 'Cancela cuando quieras, sin multa ni burocracia.',
      },
      {
        icon: 'bolt',
        title: 'Configuración rápida',
        description: 'Cuenta creada y agenda activa en unos 3 minutos.',
      },
      {
        icon: 'support',
        title: 'Soporte humano',
        description: 'Nuestro equipo responde por WhatsApp cuando lo necesites.',
      },
    ],
    support: {
      title: '¿Aún tienes dudas?',
      description:
        'Habla con nuestro equipo por WhatsApp y recibe una respuesta rápida y personalizada.',
      ctaLabel: 'Hablar por WhatsApp',
    },
  },
};
