import type { InsideSystemContent, Language } from '../types';

/* Horários, valores e nomes são FIXOS de propósito (mesmo motivo do SENT_AT
   do HeroPhone): hora real quebraria a hidratação. Números de cena (start,
   span, occupancy, pct) são idênticos nas 3 línguas — o layout não varia com
   o idioma. Formato 24h em todas as línguas: é assim que o produto exibe. */
export const insideSystem: Record<Language, InsideSystemContent> = {
  pt: {
    eyebrow: 'Por dentro do sistema',
    title: 'O painel que trabalha enquanto o WhatsApp conversa',
    description:
      'Cada conversa do bot vira agenda organizada, fila preenchida e número no relatório — em tempo real, sem planilha.',
    hint: 'Role para percorrer as telas',
    brand: 'Horarius',
    businessName: 'Barbearia Aurora',
    topbarDate: 'sexta-feira, 08 de agosto',
    services: ['Corte + barba', 'Corte'],
    serviceInline: 'corte com barba',
    screens: {
      agenda: {
        navLabel: 'Agenda',
        headline: 'O dia inteiro numa tela só',
        description:
          'Agendamentos por profissional, ocupação e horários livres. O que o bot marca no WhatsApp aparece aqui na hora.',
        ariaLabel: 'Prévia ilustrativa da agenda do dia no painel Horarius',
        mock: {
          kpis: [
            { label: 'Agendamentos hoje', value: '14', hint: '+3 vs ontem' },
            { label: 'Receita prevista', value: 'R$ 1.240', hint: '+12% vs ontem' },
            { label: 'Horários livres', value: '6', hint: 'até as 19h' },
          ],
          toolbar: { today: 'Hoje', date: 'sex, 8 de agosto', views: ['Dia', 'Semana', 'Mês'] },
          hourLabels: ['09:00', '10:00', '11:00', '12:00'],
          statusLabels: {
            pending: 'Pendente',
            confirmed: 'Confirmado',
            in_progress: 'Em atendimento',
            completed: 'Concluído',
          },
          professionals: [
            {
              name: 'Rafael',
              meta: '5 agendamentos hoje',
              nextChip: 'Próximo: 11:30',
              occupancy: 82,
              occupancyLabel: '82% ocupado',
              appointments: [
                { time: '09:00 – 09:45', client: 'Carlos M.', status: 'completed', start: 0, span: 3 },
                { time: '10:00 – 11:00', client: 'João P.', status: 'in_progress', start: 4, span: 4 },
                { time: '11:30 – 12:15', client: 'André S.', status: 'confirmed', start: 10, span: 3 },
              ],
            },
            {
              name: 'Marina',
              meta: '4 agendamentos hoje',
              nextChip: 'Próximo: 10:30',
              occupancy: 64,
              occupancyLabel: '64% ocupado',
              appointments: [
                { time: '09:30 – 10:15', client: 'Paula H.', status: 'completed', start: 2, span: 3 },
                { time: '10:30 – 11:15', client: 'Diego R.', status: 'confirmed', start: 6, span: 3 },
                { time: '12:00 – 12:45', client: 'Bruno T.', status: 'pending', start: 12, span: 3 },
              ],
            },
            {
              name: 'Ana',
              meta: '3 agendamentos hoje',
              nextChip: 'Próximo: 11:00',
              occupancy: 48,
              occupancyLabel: '48% ocupado',
              appointments: [
                { time: '09:00 – 10:00', client: 'Felipe N.', status: 'completed', start: 0, span: 4 },
                { time: '11:00 – 11:45', client: 'Lúcia V.', status: 'confirmed', start: 8, span: 3 },
              ],
            },
          ],
        },
      },
      conversations: {
        navLabel: 'Conversas',
        headline: 'A IA atende; você acompanha tudo',
        description:
          'Cada conversa fica registrada com quem respondeu — bot ou equipe — e você assume o teclado quando quiser.',
        ariaLabel: 'Prévia ilustrativa das conversas de WhatsApp no painel Horarius',
        mock: {
          listTitle: '12 ativas',
          searchPlaceholder: 'Buscar por nome ou telefone…',
          filters: [
            { label: 'Todas', active: true },
            { label: 'Não lidas', badge: '3' },
            { label: 'IA' },
            { label: 'Manual' },
          ],
          items: [
            {
              name: 'Juliana R.',
              time: '14:32',
              preview: 'Perfeito, confirmado! Até amanhã 😉',
              active: true,
              badge: 'IA',
            },
            { name: 'Marcos A.', time: '14:20', preview: 'Tem horário no sábado de manhã?', unread: '2' },
            { name: 'Beatriz L.', time: '13:58', preview: 'Obrigada! Chego 10 min antes.', badge: 'IA' },
          ],
          thread: {
            name: 'Juliana R.',
            phone: '+55 11 9•••• ••21',
            aiToggle: 'IA ativa',
            messages: [
              { direction: 'in', text: 'Oi! Queria marcar {service} pra amanhã à tarde.', meta: '14:31' },
              {
                direction: 'out',
                text: 'Oi, Juliana! Tenho 14:30 e 16:00 com o Rafael. Qual prefere?',
                meta: '14:31 · Bot · lido',
              },
              { direction: 'in', text: '14:30 tá ótimo!', meta: '14:32' },
              {
                direction: 'out',
                text: 'Fechado! Seu horário de {service} amanhã às 14:30 com o Rafael. Te lembro 1h antes 😉',
                meta: '14:32 · Bot · lido',
              },
            ],
          },
          composer: {
            status: 'IA ativa — você ainda pode enviar mensagens manuais',
            placeholder: 'Digite uma mensagem…',
            send: 'Enviar',
          },
        },
      },
      waitlist: {
        navLabel: 'Fila de espera',
        headline: 'Cancelou? Outro cliente assume a vaga',
        description:
          'Quem não achou horário entra na fila pelo próprio WhatsApp. Vagou, o Horarius oferece — e a receita não escapa.',
        ariaLabel: 'Prévia ilustrativa da fila de espera no painel Horarius',
        mock: {
          metrics: [
            { label: 'Entraram na fila', value: '9' },
            { label: 'Ofertas enviadas', value: '5' },
            { label: 'Confirmaram', value: '4' },
            { label: 'Receita recuperada', value: 'R$ 380' },
          ],
          tableTitle: 'Fila do dia',
          tableSubtitle: '3 aguardando',
          columns: ['Cliente', 'Serviço', 'Horário', 'Status', 'Oferta'],
          statusLabels: { waiting: 'Aguardando', offered: 'Oferta enviada', confirmed: 'Confirmado' },
          rows: [
            { client: 'Pedro G.', service: 0, time: '≈ 10:00', status: 'waiting', offer: '—' },
            { client: 'Tiago F.', service: 1, time: '≈ 14:00', status: 'confirmed', offer: '14:30 · Rafael' },
            { client: 'Renan D.', service: 0, time: 'Tarde', status: 'waiting', offer: '—' },
          ],
        },
      },
      reviews: {
        navLabel: 'Avaliações',
        headline: 'A nota chega sozinha depois do atendimento',
        description:
          'Terminou o atendimento, o cliente recebe o convite no WhatsApp. A reputação vira número — e argumento de venda.',
        ariaLabel: 'Prévia ilustrativa das avaliações no painel Horarius',
        mock: {
          summaryTitle: 'Resumo das avaliações',
          average: '4,8',
          countLine: '127 avaliações · 92% positivas',
          distribution: [
            { stars: '5★', pct: 78, count: '99' },
            { stars: '4★', pct: 14, count: '18' },
            { stars: '3★', pct: 5, count: '6' },
            { stars: '2★', pct: 2, count: '3' },
            { stars: '1★', pct: 1, count: '1' },
          ],
          quote: {
            text: '“Marquei pelo WhatsApp em um minuto e fui atendida na hora certa. Nunca foi tão fácil.”',
            author: 'Juliana R.',
            service: 0,
          },
          tableTitle: 'Últimas avaliações',
          rows: [
            { client: 'Carlos M.', stars: 5, comment: '“Atendimento impecável.”', service: 0 },
            { client: 'Paula H.', stars: 4, comment: '“Rápido e sem enrolação.”', service: 1 },
          ],
        },
      },
      reminders: {
        navLabel: 'Lembretes',
        headline: 'Ninguém mais esquece o horário',
        description:
          'Confirmações e lembretes saem sozinhos no WhatsApp, na hora certa. Menos furo, mais cadeira ocupada.',
        ariaLabel: 'Prévia ilustrativa dos lembretes automáticos no painel Horarius',
        mock: {
          title: 'Lembretes de amanhã',
          statusLabels: { sent: 'Enviado', delivered: 'Entregue', read: 'Lido' },
          rows: [
            { client: 'Juliana R.', service: 0, time: '14:30', status: 'read' },
            { client: 'Diego R.', service: 1, time: '10:30', status: 'delivered' },
            { client: 'Bruno T.', service: 0, time: '12:00', status: 'sent' },
          ],
          preview: {
            label: 'Mensagem enviada',
            text: 'Oi, Juliana! Lembrete do seu horário de {service} amanhã às 14:30 com o Rafael. Até lá!',
            meta: 'Lembrete · WhatsApp',
          },
          stat: { label: 'Faltas no mês', value: '↓ 34%', hint: 'desde os lembretes automáticos' },
        },
      },
      insights: {
        navLabel: 'Visão do negócio',
        headline: 'O mês fecha em números, não em achismo',
        description:
          'Faturamento, ticket médio e o que o Horarius recuperou pra você — direto do fluxo real de agendamentos.',
        ariaLabel: 'Prévia ilustrativa da visão do negócio no painel Horarius',
        mock: {
          kpis: [
            { label: 'Faturamento estimado', value: 'R$ 12.400', hint: '+18% vs mês anterior' },
            { label: 'Ticket médio', value: 'R$ 66' },
            { label: 'Concluídos', value: '187', hint: 'atendimentos no mês' },
            { label: 'Agendado à frente', value: 'R$ 3.180', hint: '48 agendamentos' },
          ],
          chartTitle: 'Faturamento por dia',
          chartHint: 'últimos 30 dias',
          recovered: {
            title: 'Recuperado pelo Horarius',
            value: 'R$ 1.240',
            description:
              '18 horários que seriam perdidos, preenchidos automaticamente neste mês — fila de espera e lembretes.',
          },
        },
      },
    },
    segmentVariants: {
      barbershops: {
        businessName: 'Barbearia Aurora',
        services: ['Corte + barba', 'Corte'],
        serviceInline: 'corte com barba',
      },
      salons: {
        businessName: 'Studio Ellas',
        services: ['Corte + escova', 'Coloração'],
        serviceInline: 'corte com escova',
      },
      aesthetics: {
        businessName: 'Espaço Lumine',
        services: ['Limpeza de pele', 'Massagem'],
        serviceInline: 'limpeza de pele',
      },
      pets: {
        businessName: 'PetShop Amigo',
        services: ['Banho + tosa', 'Só banho'],
        serviceInline: 'banho e tosa',
      },
    },
  },
  en: {
    eyebrow: 'Inside the system',
    title: 'The panel that works while WhatsApp does the talking',
    description:
      'Every bot conversation becomes an organized schedule, a filled slot, and a number in your report — in real time, no spreadsheets.',
    hint: 'Scroll to walk through the screens',
    brand: 'Horarius',
    businessName: 'Aurora Barbershop',
    topbarDate: 'Friday, August 8',
    services: ['Cut + beard', 'Haircut'],
    serviceInline: 'a cut and beard trim',
    screens: {
      agenda: {
        navLabel: 'Schedule',
        headline: 'The whole day on a single screen',
        description:
          'Bookings by professional, occupancy, and free slots. Whatever the bot books on WhatsApp shows up here instantly.',
        ariaLabel: 'Illustrative preview of the daily schedule in the Horarius panel',
        mock: {
          kpis: [
            { label: 'Bookings today', value: '14', hint: '+3 vs yesterday' },
            { label: 'Expected revenue', value: 'R$ 1,240', hint: '+12% vs yesterday' },
            { label: 'Free slots', value: '6', hint: 'until 7 PM' },
          ],
          toolbar: { today: 'Today', date: 'Fri, August 8', views: ['Day', 'Week', 'Month'] },
          hourLabels: ['09:00', '10:00', '11:00', '12:00'],
          statusLabels: {
            pending: 'Pending',
            confirmed: 'Confirmed',
            in_progress: 'In service',
            completed: 'Completed',
          },
          professionals: [
            {
              name: 'Ryan',
              meta: '5 bookings today',
              nextChip: 'Next: 11:30',
              occupancy: 82,
              occupancyLabel: '82% booked',
              appointments: [
                { time: '09:00 – 09:45', client: 'Liam B.', status: 'completed', start: 0, span: 3 },
                { time: '10:00 – 11:00', client: 'Noah S.', status: 'in_progress', start: 4, span: 4 },
                { time: '11:30 – 12:15', client: 'Ethan F.', status: 'confirmed', start: 10, span: 3 },
              ],
            },
            {
              name: 'Mia',
              meta: '4 bookings today',
              nextChip: 'Next: 10:30',
              occupancy: 64,
              occupancyLabel: '64% booked',
              appointments: [
                { time: '09:30 – 10:15', client: 'Ava T.', status: 'completed', start: 2, span: 3 },
                { time: '10:30 – 11:15', client: 'Oliver D.', status: 'confirmed', start: 6, span: 3 },
                { time: '12:00 – 12:45', client: 'Lucas W.', status: 'pending', start: 12, span: 3 },
              ],
            },
            {
              name: 'Zoe',
              meta: '3 bookings today',
              nextChip: 'Next: 11:00',
              occupancy: 48,
              occupancyLabel: '48% booked',
              appointments: [
                { time: '09:00 – 10:00', client: 'Mason K.', status: 'completed', start: 0, span: 4 },
                { time: '11:00 – 11:45', client: 'Grace V.', status: 'confirmed', start: 8, span: 3 },
              ],
            },
          ],
        },
      },
      conversations: {
        navLabel: 'Conversations',
        headline: 'The AI answers; you see everything',
        description:
          'Every conversation is logged with who replied — bot or team — and you can take over the keyboard anytime.',
        ariaLabel: 'Illustrative preview of WhatsApp conversations in the Horarius panel',
        mock: {
          listTitle: '12 active',
          searchPlaceholder: 'Search by name or phone…',
          filters: [
            { label: 'All', active: true },
            { label: 'Unread', badge: '3' },
            { label: 'AI' },
            { label: 'Manual' },
          ],
          items: [
            {
              name: 'Emma R.',
              time: '14:32',
              preview: 'Perfect, confirmed! See you tomorrow 😉',
              active: true,
              badge: 'AI',
            },
            { name: 'Marcus A.', time: '14:20', preview: 'Any openings Saturday morning?', unread: '2' },
            { name: 'Bella L.', time: '13:58', preview: 'Thanks! I’ll arrive 10 min early.', badge: 'AI' },
          ],
          thread: {
            name: 'Emma R.',
            phone: '+1 (555) 9•• ••21',
            aiToggle: 'AI on',
            messages: [
              { direction: 'in', text: 'Hi! I’d like to book {service} for tomorrow afternoon.', meta: '14:31' },
              {
                direction: 'out',
                text: 'Hi, Emma! I have 14:30 and 16:00 with Ryan. Which works best?',
                meta: '14:31 · Bot · read',
              },
              { direction: 'in', text: '14:30 is great!', meta: '14:32' },
              {
                direction: 'out',
                text: 'Done! {service} tomorrow at 14:30 with Ryan — I’ll remind you 1h before 😉',
                meta: '14:32 · Bot · read',
              },
            ],
          },
          composer: {
            status: 'AI on — you can still send manual messages',
            placeholder: 'Type a message…',
            send: 'Send',
          },
        },
      },
      waitlist: {
        navLabel: 'Waitlist',
        headline: 'A cancellation? Another client takes the spot',
        description:
          'Clients who found no opening join the waitlist right on WhatsApp. A slot frees up, Horarius offers it — revenue stays.',
        ariaLabel: 'Illustrative preview of the waitlist in the Horarius panel',
        mock: {
          metrics: [
            { label: 'Joined the list', value: '9' },
            { label: 'Offers sent', value: '5' },
            { label: 'Confirmed', value: '4' },
            { label: 'Revenue recovered', value: 'R$ 380' },
          ],
          tableTitle: 'Today’s waitlist',
          tableSubtitle: '3 waiting',
          columns: ['Client', 'Service', 'Time', 'Status', 'Offer'],
          statusLabels: { waiting: 'Waiting', offered: 'Offer sent', confirmed: 'Confirmed' },
          rows: [
            { client: 'Peter G.', service: 0, time: '≈ 10:00', status: 'waiting', offer: '—' },
            { client: 'Tyler F.', service: 1, time: '≈ 14:00', status: 'confirmed', offer: '14:30 · Ryan' },
            { client: 'Ronan D.', service: 0, time: 'Afternoon', status: 'waiting', offer: '—' },
          ],
        },
      },
      reviews: {
        navLabel: 'Reviews',
        headline: 'Ratings arrive on their own after each visit',
        description:
          'When the service ends, the client gets an invite on WhatsApp. Your reputation becomes a number — and a selling point.',
        ariaLabel: 'Illustrative preview of reviews in the Horarius panel',
        mock: {
          summaryTitle: 'Reviews summary',
          average: '4.8',
          countLine: '127 reviews · 92% positive',
          distribution: [
            { stars: '5★', pct: 78, count: '99' },
            { stars: '4★', pct: 14, count: '18' },
            { stars: '3★', pct: 5, count: '6' },
            { stars: '2★', pct: 2, count: '3' },
            { stars: '1★', pct: 1, count: '1' },
          ],
          quote: {
            text: '“Booked on WhatsApp in a minute and was seen right on time. It’s never been this easy.”',
            author: 'Emma R.',
            service: 0,
          },
          tableTitle: 'Latest reviews',
          rows: [
            { client: 'Liam B.', stars: 5, comment: '“Flawless service.”', service: 0 },
            { client: 'Ava T.', stars: 4, comment: '“Quick and no fuss.”', service: 1 },
          ],
        },
      },
      reminders: {
        navLabel: 'Reminders',
        headline: 'No one forgets their appointment anymore',
        description:
          'Confirmations and reminders go out on WhatsApp by themselves, right on time. Fewer no-shows, fuller chairs.',
        ariaLabel: 'Illustrative preview of automatic reminders in the Horarius panel',
        mock: {
          title: 'Tomorrow’s reminders',
          statusLabels: { sent: 'Sent', delivered: 'Delivered', read: 'Read' },
          rows: [
            { client: 'Emma R.', service: 0, time: '14:30', status: 'read' },
            { client: 'Oliver D.', service: 1, time: '10:30', status: 'delivered' },
            { client: 'Lucas W.', service: 0, time: '12:00', status: 'sent' },
          ],
          preview: {
            label: 'Message sent',
            text: 'Hi, Emma! Reminder: {service} tomorrow at 14:30 with Ryan. See you there!',
            meta: 'Reminder · WhatsApp',
          },
          stat: { label: 'No-shows this month', value: '↓ 34%', hint: 'since automatic reminders' },
        },
      },
      insights: {
        navLabel: 'Business overview',
        headline: 'The month closes on numbers, not guesswork',
        description:
          'Revenue, average ticket, and what Horarius recovered for you — straight from the real booking flow.',
        ariaLabel: 'Illustrative preview of the business overview in the Horarius panel',
        mock: {
          kpis: [
            { label: 'Estimated revenue', value: 'R$ 12,400', hint: '+18% vs last month' },
            { label: 'Average ticket', value: 'R$ 66' },
            { label: 'Completed', value: '187', hint: 'services this month' },
            { label: 'Booked ahead', value: 'R$ 3,180', hint: '48 bookings' },
          ],
          chartTitle: 'Revenue per day',
          chartHint: 'last 30 days',
          recovered: {
            title: 'Recovered by Horarius',
            value: 'R$ 1,240',
            description:
              '18 slots that would have been lost, filled automatically this month — waitlist and reminders.',
          },
        },
      },
    },
    segmentVariants: {
      barbershops: {
        businessName: 'Aurora Barbershop',
        services: ['Cut + beard', 'Haircut'],
        serviceInline: 'a cut and beard trim',
      },
      salons: {
        businessName: 'Ellas Studio',
        services: ['Cut + blowout', 'Coloring'],
        serviceInline: 'a cut and blowout',
      },
      aesthetics: {
        businessName: 'Lumine Spa',
        services: ['Facial cleansing', 'Massage'],
        serviceInline: 'a facial cleansing',
      },
      pets: {
        businessName: 'Buddy PetShop',
        services: ['Bath + grooming', 'Bath only'],
        serviceInline: 'a bath and grooming',
      },
    },
  },
  es: {
    eyebrow: 'Por dentro del sistema',
    title: 'El panel que trabaja mientras WhatsApp conversa',
    description:
      'Cada conversación del bot se convierte en agenda organizada, hueco ocupado y número en el reporte — en tiempo real, sin planillas.',
    hint: 'Desplázate para recorrer las pantallas',
    brand: 'Horarius',
    businessName: 'Barbería Aurora',
    topbarDate: 'viernes, 08 de agosto',
    services: ['Corte + barba', 'Corte'],
    serviceInline: 'un corte con barba',
    screens: {
      agenda: {
        navLabel: 'Agenda',
        headline: 'Todo el día en una sola pantalla',
        description:
          'Reservas por profesional, ocupación y horarios libres. Lo que el bot agenda en WhatsApp aparece aquí al instante.',
        ariaLabel: 'Vista ilustrativa de la agenda del día en el panel Horarius',
        mock: {
          kpis: [
            { label: 'Reservas hoy', value: '14', hint: '+3 vs ayer' },
            { label: 'Ingresos previstos', value: 'R$ 1.240', hint: '+12% vs ayer' },
            { label: 'Horarios libres', value: '6', hint: 'hasta las 19h' },
          ],
          toolbar: { today: 'Hoy', date: 'vie, 8 de agosto', views: ['Día', 'Semana', 'Mes'] },
          hourLabels: ['09:00', '10:00', '11:00', '12:00'],
          statusLabels: {
            pending: 'Pendiente',
            confirmed: 'Confirmado',
            in_progress: 'En atención',
            completed: 'Concluido',
          },
          professionals: [
            {
              name: 'Mateo',
              meta: '5 reservas hoy',
              nextChip: 'Próximo: 11:30',
              occupancy: 82,
              occupancyLabel: '82% ocupado',
              appointments: [
                { time: '09:00 – 09:45', client: 'Diego M.', status: 'completed', start: 0, span: 3 },
                { time: '10:00 – 11:00', client: 'Pablo S.', status: 'in_progress', start: 4, span: 4 },
                { time: '11:30 – 12:15', client: 'Andrés F.', status: 'confirmed', start: 10, span: 3 },
              ],
            },
            {
              name: 'Lucía',
              meta: '4 reservas hoy',
              nextChip: 'Próximo: 10:30',
              occupancy: 64,
              occupancyLabel: '64% ocupado',
              appointments: [
                { time: '09:30 – 10:15', client: 'Valentina T.', status: 'completed', start: 2, span: 3 },
                { time: '10:30 – 11:15', client: 'Bruno D.', status: 'confirmed', start: 6, span: 3 },
                { time: '12:00 – 12:45', client: 'Tomás W.', status: 'pending', start: 12, span: 3 },
              ],
            },
            {
              name: 'Sofía',
              meta: '3 reservas hoy',
              nextChip: 'Próximo: 11:00',
              occupancy: 48,
              occupancyLabel: '48% ocupado',
              appointments: [
                { time: '09:00 – 10:00', client: 'Martín K.', status: 'completed', start: 0, span: 4 },
                { time: '11:00 – 11:45', client: 'Elena V.', status: 'confirmed', start: 8, span: 3 },
              ],
            },
          ],
        },
      },
      conversations: {
        navLabel: 'Conversaciones',
        headline: 'La IA atiende; tú lo ves todo',
        description:
          'Cada conversación queda registrada con quién respondió — bot o equipo — y tomas el teclado cuando quieras.',
        ariaLabel: 'Vista ilustrativa de las conversaciones de WhatsApp en el panel Horarius',
        mock: {
          listTitle: '12 activas',
          searchPlaceholder: 'Buscar por nombre o teléfono…',
          filters: [
            { label: 'Todas', active: true },
            { label: 'No leídas', badge: '3' },
            { label: 'IA' },
            { label: 'Manual' },
          ],
          items: [
            {
              name: 'Camila R.',
              time: '14:32',
              preview: '¡Perfecto, confirmado! Hasta mañana 😉',
              active: true,
              badge: 'IA',
            },
            { name: 'Marcos A.', time: '14:20', preview: '¿Hay horario el sábado por la mañana?', unread: '2' },
            { name: 'Bianca L.', time: '13:58', preview: '¡Gracias! Llego 10 min antes.', badge: 'IA' },
          ],
          thread: {
            name: 'Camila R.',
            phone: '+54 11 9•••• ••21',
            aiToggle: 'IA activa',
            messages: [
              { direction: 'in', text: '¡Hola! Quería reservar {service} para mañana por la tarde.', meta: '14:31' },
              {
                direction: 'out',
                text: '¡Hola, Camila! Tengo 14:30 y 16:00 con Mateo. ¿Cuál prefieres?',
                meta: '14:31 · Bot · leído',
              },
              { direction: 'in', text: '¡14:30 me viene genial!', meta: '14:32' },
              {
                direction: 'out',
                text: '¡Listo! Tu turno de {service} mañana a las 14:30 con Mateo. Te recuerdo 1h antes 😉',
                meta: '14:32 · Bot · leído',
              },
            ],
          },
          composer: {
            status: 'IA activa — aún puedes enviar mensajes manuales',
            placeholder: 'Escribe un mensaje…',
            send: 'Enviar',
          },
        },
      },
      waitlist: {
        navLabel: 'Lista de espera',
        headline: '¿Cancelaron? Otro cliente toma el lugar',
        description:
          'Quien no encontró horario entra a la lista desde el propio WhatsApp. Se libera un hueco, Horarius lo ofrece — y el ingreso no se escapa.',
        ariaLabel: 'Vista ilustrativa de la lista de espera en el panel Horarius',
        mock: {
          metrics: [
            { label: 'Entraron a la lista', value: '9' },
            { label: 'Ofertas enviadas', value: '5' },
            { label: 'Confirmaron', value: '4' },
            { label: 'Ingresos recuperados', value: 'R$ 380' },
          ],
          tableTitle: 'Lista del día',
          tableSubtitle: '3 en espera',
          columns: ['Cliente', 'Servicio', 'Horario', 'Estado', 'Oferta'],
          statusLabels: { waiting: 'En espera', offered: 'Oferta enviada', confirmed: 'Confirmado' },
          rows: [
            { client: 'Pedro G.', service: 0, time: '≈ 10:00', status: 'waiting', offer: '—' },
            { client: 'Tiago F.', service: 1, time: '≈ 14:00', status: 'confirmed', offer: '14:30 · Mateo' },
            { client: 'Renán D.', service: 0, time: 'Tarde', status: 'waiting', offer: '—' },
          ],
        },
      },
      reviews: {
        navLabel: 'Reseñas',
        headline: 'La nota llega sola después de la atención',
        description:
          'Terminó la atención y el cliente recibe la invitación por WhatsApp. La reputación se vuelve número — y argumento de venta.',
        ariaLabel: 'Vista ilustrativa de las reseñas en el panel Horarius',
        mock: {
          summaryTitle: 'Resumen de reseñas',
          average: '4,8',
          countLine: '127 reseñas · 92% positivas',
          distribution: [
            { stars: '5★', pct: 78, count: '99' },
            { stars: '4★', pct: 14, count: '18' },
            { stars: '3★', pct: 5, count: '6' },
            { stars: '2★', pct: 2, count: '3' },
            { stars: '1★', pct: 1, count: '1' },
          ],
          quote: {
            text: '“Reservé por WhatsApp en un minuto y me atendieron puntual. Nunca fue tan fácil.”',
            author: 'Camila R.',
            service: 0,
          },
          tableTitle: 'Últimas reseñas',
          rows: [
            { client: 'Diego M.', stars: 5, comment: '“Atención impecable.”', service: 0 },
            { client: 'Valentina T.', stars: 4, comment: '“Rápido y sin vueltas.”', service: 1 },
          ],
        },
      },
      reminders: {
        navLabel: 'Recordatorios',
        headline: 'Nadie vuelve a olvidar su turno',
        description:
          'Confirmaciones y recordatorios salen solos por WhatsApp, a la hora justa. Menos ausencias, más sillas ocupadas.',
        ariaLabel: 'Vista ilustrativa de los recordatorios automáticos en el panel Horarius',
        mock: {
          title: 'Recordatorios de mañana',
          statusLabels: { sent: 'Enviado', delivered: 'Entregado', read: 'Leído' },
          rows: [
            { client: 'Camila R.', service: 0, time: '14:30', status: 'read' },
            { client: 'Bruno D.', service: 1, time: '10:30', status: 'delivered' },
            { client: 'Tomás W.', service: 0, time: '12:00', status: 'sent' },
          ],
          preview: {
            label: 'Mensaje enviado',
            text: '¡Hola, Camila! Recordatorio de tu turno de {service} mañana a las 14:30 con Mateo. ¡Hasta pronto!',
            meta: 'Recordatorio · WhatsApp',
          },
          stat: { label: 'Ausencias del mes', value: '↓ 34%', hint: 'desde los recordatorios automáticos' },
        },
      },
      insights: {
        navLabel: 'Visión del negocio',
        headline: 'El mes cierra con números, no con intuiciones',
        description:
          'Facturación, ticket promedio y lo que Horarius recuperó para ti — directo del flujo real de reservas.',
        ariaLabel: 'Vista ilustrativa de la visión del negocio en el panel Horarius',
        mock: {
          kpis: [
            { label: 'Facturación estimada', value: 'R$ 12.400', hint: '+18% vs mes anterior' },
            { label: 'Ticket promedio', value: 'R$ 66' },
            { label: 'Concluidos', value: '187', hint: 'atenciones en el mes' },
            { label: 'Agendado a futuro', value: 'R$ 3.180', hint: '48 reservas' },
          ],
          chartTitle: 'Facturación por día',
          chartHint: 'últimos 30 días',
          recovered: {
            title: 'Recuperado por Horarius',
            value: 'R$ 1.240',
            description:
              '18 horarios que se habrían perdido, ocupados automáticamente este mes — lista de espera y recordatorios.',
          },
        },
      },
    },
    segmentVariants: {
      barbershops: {
        businessName: 'Barbería Aurora',
        services: ['Corte + barba', 'Corte'],
        serviceInline: 'un corte con barba',
      },
      salons: {
        businessName: 'Studio Ellas',
        services: ['Corte + brushing', 'Coloración'],
        serviceInline: 'un corte con brushing',
      },
      aesthetics: {
        businessName: 'Espacio Lumine',
        services: ['Limpieza facial', 'Masaje'],
        serviceInline: 'una limpieza facial',
      },
      pets: {
        businessName: 'PetShop Amigo',
        services: ['Baño + corte', 'Solo baño'],
        serviceInline: 'un baño con corte',
      },
    },
  },
};
