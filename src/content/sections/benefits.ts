import type { Language, LandingContent } from '../types';

export const benefits: Record<Language, LandingContent['benefits']> = {
  pt: {
    eyebrow: 'Por que o Horarius',
    title: 'Menos tempo no WhatsApp, menos cadeira vazia, mais cliente voltando',
    description:
      'O Horarius não é só uma agenda online. Ele atende no seu lugar, preenche os buracos do dia e traz de volta quem sumiu — sem depender de alguém com o celular na mão.',
    items: [
      {
        eyebrow: 'Atendimento 24h',
        title: 'Ninguém fica esperando resposta — nem domingo à noite',
        description:
          'A IA atende no número do seu próprio negócio: tira dúvida de preço, mostra os horários livres e fecha o agendamento. Quando a conversa precisa de você, é só assumir de onde ela parou.',
      },
      {
        eyebrow: 'Agenda cheia',
        title: 'Cancelou de manhã, o horário é vendido antes do almoço',
        description:
          'A lista de espera avisa na hora quem queria aquele horário, e a compressão inteligente junta os buracos do dia — em vez de deixar a cadeira parada esperando alguém aparecer.',
      },
      {
        eyebrow: 'Clientes de volta',
        title: 'Quem sumiu há dois meses recebe um convite sozinho',
        description:
          'O Horarius identifica quem parou de aparecer e chama de volta no WhatsApp, com campanhas de retorno e planos recorrentes para o cliente virar presença fixa na agenda.',
      },
      {
        eyebrow: 'Controle do dia',
        title: 'Você sabe como foi o dia sem abrir uma planilha',
        description:
          'Resumo da operação toda manhã, ocupação por profissional, faltas por cliente e relatórios prontos no celular — dá para acompanhar o movimento sem estar atrás do balcão.',
      },
    ],
  },
  en: {
    eyebrow: 'Why Horarius',
    title: 'Less time on WhatsApp, fewer empty chairs, more clients coming back',
    description:
      'Horarius is more than an online calendar. It answers for you, fills the gaps in your day and brings back the clients who disappeared — without anyone holding a phone.',
    items: [
      {
        eyebrow: '24/7 front desk',
        title: 'Nobody waits for an answer — not even on Sunday night',
        description:
          'The AI answers on your own business number: quotes prices, shows the open slots and closes the booking. When a conversation needs you, just take it over from where it stopped.',
      },
      {
        eyebrow: 'Full calendar',
        title: 'Cancelled in the morning, booked again before lunch',
        description:
          'The waitlist instantly offers the slot to whoever wanted it, and smart compression closes the gaps in your day — instead of leaving the chair empty waiting for a walk-in.',
      },
      {
        eyebrow: 'Clients coming back',
        title: 'Someone who vanished two months ago gets invited back automatically',
        description:
          'Horarius spots who stopped showing up and reaches out on WhatsApp with win-back campaigns and recurring plans that turn one-off clients into regulars.',
      },
      {
        eyebrow: 'Daily control',
        title: 'You know how the day went without opening a spreadsheet',
        description:
          'A morning summary of your operation, occupancy per professional, no-shows per client and ready-made reports on your phone — follow the movement without standing behind the counter.',
      },
    ],
  },
  es: {
    eyebrow: 'Por qué Horarius',
    title: 'Menos tiempo en WhatsApp, menos sillas vacías, más clientes que vuelven',
    description:
      'Horarius no es solo una agenda online. Atiende por ti, llena los huecos del día y trae de vuelta a quien desapareció — sin depender de alguien con el celular en la mano.',
    items: [
      {
        eyebrow: 'Atención 24 h',
        title: 'Nadie se queda esperando respuesta — ni el domingo por la noche',
        description:
          'La IA atiende en el número de tu propio negocio: responde precios, muestra los horarios libres y cierra la reserva. Cuando la conversación te necesita, la asumes donde quedó.',
      },
      {
        eyebrow: 'Agenda llena',
        title: 'Canceló por la mañana, el horario se vende antes del almuerzo',
        description:
          'La lista de espera avisa al instante a quien quería ese horario, y la compresión inteligente junta los huecos del día — en vez de dejar la silla parada esperando a alguien.',
      },
      {
        eyebrow: 'Clientes de vuelta',
        title: 'Quien desapareció hace dos meses recibe una invitación solo',
        description:
          'Horarius identifica a quien dejó de venir y lo invita de vuelta por WhatsApp, con campañas de retorno y planes recurrentes para que el cliente ocasional se vuelva fijo.',
      },
      {
        eyebrow: 'Control del día',
        title: 'Sabes cómo fue el día sin abrir una planilla',
        description:
          'Resumen de la operación cada mañana, ocupación por profesional, ausencias por cliente e informes listos en el celular — sigue el movimiento sin estar detrás del mostrador.',
      },
    ],
  },
};
