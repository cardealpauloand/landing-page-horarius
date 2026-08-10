import type { Language, LandingContent } from '../types';

export const benefits: Record<Language, LandingContent['benefits']> = {
  pt: {
    items: [
      {
        eyebrow: 'Atendimento 24h',
        title: 'Ninguém fica esperando resposta — nem domingo à noite',
        description:
          'A IA atende no número do seu próprio negócio: tira dúvida de preço, mostra os horários livres e fecha o agendamento. Quando a conversa precisa de você, é só assumir de onde ela parou.',
        bullets: [
          'Responde no número do seu próprio negócio',
          'Tira dúvida de preço e mostra os horários livres',
          'Você assume a conversa quando quiser',
        ],
        visual: 'inbox',
      },
      {
        eyebrow: 'Agenda cheia',
        title: 'Cancelou de manhã, o horário é vendido antes do almoço',
        description:
          'A lista de espera avisa na hora quem queria aquele horário, e a compressão inteligente junta os buracos do dia — em vez de deixar a cadeira parada esperando alguém aparecer.',
        bullets: [
          'Lista de espera avisa na hora quem queria o horário',
          'Compressão inteligente junta os buracos do dia',
          'Encaixes sem ninguém remarcar na mão',
        ],
        visual: 'agenda',
      },
      {
        eyebrow: 'Clientes de volta',
        title: 'Quem sumiu há dois meses recebe um convite sozinho',
        description:
          'O Horarius identifica quem parou de aparecer e chama de volta no WhatsApp, com campanhas de retorno e planos recorrentes para o cliente virar presença fixa na agenda.',
        bullets: [
          'Identifica quem parou de aparecer',
          'Campanhas de retorno pelo WhatsApp',
          'Planos recorrentes para virar presença fixa',
        ],
        visual: 'winback',
      },
      {
        eyebrow: 'Controle do dia',
        title: 'Você sabe como foi o dia sem abrir uma planilha',
        description:
          'Resumo da operação toda manhã, ocupação por profissional, faltas por cliente e relatórios prontos no celular — dá para acompanhar o movimento sem estar atrás do balcão.',
        bullets: [
          'Resumo da operação toda manhã',
          'Ocupação por profissional e faltas por cliente',
          'Relatórios prontos no celular',
        ],
        visual: 'summary',
      },
    ],
    visuals: {
      inbox: {
        title: 'Atendidas pela IA',
        badge: 'Fora do expediente',
        replyLabel: 'Respondido em {seconds}s',
        rows: [
          { when: 'Domingo, 21:47', text: 'Tem horário amanhã cedo?' },
          { when: 'Terça, 02:14', text: 'Quanto custa esse serviço?' },
          { when: 'Sábado, 23:05', text: 'Consigo remarcar para sexta?' },
        ],
      },
      agenda: {
        title: 'Agenda da semana',
        badge: '92% ocupada',
        days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        footer: 'Vaga das 14h preenchida pela lista de espera',
      },
      winback: {
        title: 'Clientes para reativar',
        badge: 'Campanha ativa',
        awayLabel: 'sem voltar há {days} dias',
        statuses: {
          invited: 'Convite enviado',
          returned: 'Retornou',
          booked: 'Reagendou',
        },
      },
      summary: {
        title: 'Resumo de hoje',
        badge: '07:30',
        metrics: ['Ocupação', 'Agendamentos', 'Faltas'],
        occupancyLabel: 'Ocupação por profissional',
      },
    },
  },
  en: {
    items: [
      {
        eyebrow: '24/7 front desk',
        title: 'Nobody waits for an answer — not even on Sunday night',
        description:
          'The AI answers on your own business number: quotes prices, shows the open slots and closes the booking. When a conversation needs you, just take it over from where it stopped.',
        bullets: [
          'Answers on your own business number',
          'Quotes prices and shows the open slots',
          'Take the conversation over whenever you want',
        ],
        visual: 'inbox',
      },
      {
        eyebrow: 'Full calendar',
        title: 'Cancelled in the morning, booked again before lunch',
        description:
          'The waitlist instantly offers the slot to whoever wanted it, and smart compression closes the gaps in your day — instead of leaving the chair empty waiting for a walk-in.',
        bullets: [
          'The waitlist instantly offers the slot to whoever wanted it',
          'Smart compression closes the gaps in your day',
          'Fill-ins without anyone rebooking by hand',
        ],
        visual: 'agenda',
      },
      {
        eyebrow: 'Clients coming back',
        title: 'Someone who vanished two months ago gets invited back automatically',
        description:
          'Horarius spots who stopped showing up and reaches out on WhatsApp with win-back campaigns and recurring plans that turn one-off clients into regulars.',
        bullets: [
          'Spots who stopped showing up',
          'Win-back campaigns over WhatsApp',
          'Recurring plans that turn one-off clients into regulars',
        ],
        visual: 'winback',
      },
      {
        eyebrow: 'Daily control',
        title: 'You know how the day went without opening a spreadsheet',
        description:
          'A morning summary of your operation, occupancy per professional, no-shows per client and ready-made reports on your phone — follow the movement without standing behind the counter.',
        bullets: [
          'A morning summary of your operation',
          'Occupancy per professional and no-shows per client',
          'Ready-made reports on your phone',
        ],
        visual: 'summary',
      },
    ],
    visuals: {
      inbox: {
        title: 'Handled by the AI',
        badge: 'After hours',
        replyLabel: 'Answered in {seconds}s',
        rows: [
          { when: 'Sunday, 9:47 PM', text: 'Any openings tomorrow morning?' },
          { when: 'Tuesday, 2:14 AM', text: 'How much is this service?' },
          { when: 'Saturday, 11:05 PM', text: 'Can I move it to Friday?' },
        ],
      },
      agenda: {
        title: 'This week',
        badge: '92% booked',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        footer: 'The 2 PM slot was filled from the waitlist',
      },
      winback: {
        title: 'Clients to win back',
        badge: 'Campaign running',
        awayLabel: 'away for {days} days',
        statuses: {
          invited: 'Invite sent',
          returned: 'Came back',
          booked: 'Rebooked',
        },
      },
      summary: {
        title: "Today's summary",
        badge: '7:30 AM',
        metrics: ['Occupancy', 'Bookings', 'No-shows'],
        occupancyLabel: 'Occupancy per professional',
      },
    },
  },
  es: {
    items: [
      {
        eyebrow: 'Atención 24 h',
        title: 'Nadie se queda esperando respuesta — ni el domingo por la noche',
        description:
          'La IA atiende en el número de tu propio negocio: responde precios, muestra los horarios libres y cierra la reserva. Cuando la conversación te necesita, la asumes donde quedó.',
        bullets: [
          'Atiende en el número de tu propio negocio',
          'Responde precios y muestra los horarios libres',
          'Asumes la conversación cuando quieras',
        ],
        visual: 'inbox',
      },
      {
        eyebrow: 'Agenda llena',
        title: 'Canceló por la mañana, el horario se vende antes del almuerzo',
        description:
          'La lista de espera avisa al instante a quien quería ese horario, y la compresión inteligente junta los huecos del día — en vez de dejar la silla parada esperando a alguien.',
        bullets: [
          'La lista de espera avisa al instante a quien quería ese horario',
          'La compresión inteligente junta los huecos del día',
          'Encajes sin que nadie reprograme a mano',
        ],
        visual: 'agenda',
      },
      {
        eyebrow: 'Clientes de vuelta',
        title: 'Quien desapareció hace dos meses recibe una invitación solo',
        description:
          'Horarius identifica a quien dejó de venir y lo invita de vuelta por WhatsApp, con campañas de retorno y planes recurrentes para que el cliente ocasional se vuelva fijo.',
        bullets: [
          'Identifica a quien dejó de venir',
          'Campañas de retorno por WhatsApp',
          'Planes recurrentes para que el cliente ocasional se vuelva fijo',
        ],
        visual: 'winback',
      },
      {
        eyebrow: 'Control del día',
        title: 'Sabes cómo fue el día sin abrir una planilla',
        description:
          'Resumen de la operación cada mañana, ocupación por profesional, ausencias por cliente e informes listos en el celular — sigue el movimiento sin estar detrás del mostrador.',
        bullets: [
          'Resumen de la operación cada mañana',
          'Ocupación por profesional y ausencias por cliente',
          'Informes listos en el celular',
        ],
        visual: 'summary',
      },
    ],
    visuals: {
      inbox: {
        title: 'Atendidas por la IA',
        badge: 'Fuera del horario',
        replyLabel: 'Respondido en {seconds}s',
        rows: [
          { when: 'Domingo, 21:47', text: '¿Hay horario mañana temprano?' },
          { when: 'Martes, 02:14', text: '¿Cuánto cuesta este servicio?' },
          { when: 'Sábado, 23:05', text: '¿Puedo cambiarlo para el viernes?' },
        ],
      },
      agenda: {
        title: 'Agenda de la semana',
        badge: '92% ocupada',
        days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        footer: 'El horario de las 14h se llenó con la lista de espera',
      },
      winback: {
        title: 'Clientes para reactivar',
        badge: 'Campaña activa',
        awayLabel: 'sin volver hace {days} días',
        statuses: {
          invited: 'Invitación enviada',
          returned: 'Volvió',
          booked: 'Reagendó',
        },
      },
      summary: {
        title: 'Resumen de hoy',
        badge: '07:30',
        metrics: ['Ocupación', 'Reservas', 'Ausencias'],
        occupancyLabel: 'Ocupación por profesional',
      },
    },
  },
};
