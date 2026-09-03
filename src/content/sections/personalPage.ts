import { personalPlanAnchorPrice, personalPlanMonthlyPrice } from '../config';
import { formatBrl } from '../format';
import type { Language, PersonalPageContent } from '../types';
import { personalFaq, personalHeaderCta } from './personalCore';

const price = (language: Language) => formatBrl(personalPlanMonthlyPrice, language);
const anchor = (language: Language) => formatBrl(personalPlanAnchorPrice, language);

/* Página do Horarius Pessoal (/pessoal). Regras da copy, decididas no plano:
   - promete só o que o bot faz hoje (lançar/corrigir/resumir finanças, anotar,
     concluir e consultar tarefas, lembretes com recorrência, áudio);
   - NÃO promete leitura de nota fiscal, Open Finance nem Google Agenda;
   - sem métricas de prova social inventadas;
   - o argumento central: "o sistema é seu, você paga só pelo WhatsApp". */
export const personalPage: Record<Language, PersonalPageContent> = {
  pt: {
    hero: {
      eyebrow: 'Horarius Pessoal',
      title: 'Seu assistente pessoal no WhatsApp',
      titleAccent: 'anota, lembra e organiza por você.',
      subtitle:
        'Manda um áudio: ele anota a tarefa, lembra do compromisso e registra o gasto. Dinheiro, agenda e tarefas no mesmo lugar — sem planilha, sem app novo para aprender.',
      primaryCta: personalHeaderCta.pt.label,
      secondaryCta: 'Ver como funciona',
      ctaNote: 'Sem cartão · Financeiro grátis para sempre · Cancele quando quiser',
      assistantName: 'Horarius Pessoal',
      assistantStatus: 'Assistente · online',
      inputPlaceholder: 'Mensagem',
      dayDivider: 'Hoje',
      demoLabel:
        'Demonstração: conversa no WhatsApp com o assistente pessoal do Horarius',
      scenarios: [
        {
          label: 'Lançamento de gasto por áudio, com transcrição',
          steps: [
            {
              kind: 'audio',
              duration: '0:04',
              time: '12:31',
              transcript: 'Gastei 45 no Uber agora',
            },
            {
              kind: 'in',
              text: 'Anotado ✅ Uber — R$ 45,00 em Transporte, hoje.\nNo mês, Transporte já soma R$ 182.',
              time: '12:31',
            },
          ],
        },
        {
          label: 'Lembrete que chega no dia certo',
          steps: [
            { kind: 'out', text: 'Me lembra da parcela do carro dia 10', time: '19:02' },
            {
              kind: 'in',
              text: 'Combinado! Dia 10, às 9h, eu te lembro: parcela do carro.',
              time: '19:02',
            },
            { kind: 'divider', label: 'Dia 10' },
            {
              kind: 'in',
              text: '🔔 Lembrete: a parcela do carro vence hoje. Me avisa quando pagar que eu lanço.',
              time: '09:00',
            },
          ],
        },
        {
          label: 'Resumo do mês na hora',
          steps: [
            { kind: 'out', text: 'Quanto gastei esse mês?', time: '21:14' },
            {
              kind: 'in',
              text: 'Até hoje, R$ 2.340 em saídas.\nMercado R$ 860 · Transporte R$ 412 · Lazer R$ 295\nEntradas: R$ 4.500. Sobram R$ 2.160.',
              time: '21:14',
            },
          ],
        },
        {
          label: 'Tarefa anotada com prazo',
          steps: [
            { kind: 'out', text: 'Anota aí: renovar o passaporte', time: '10:05' },
            { kind: 'in', text: 'Anotado na sua lista ✅ Quer colocar um prazo?', time: '10:05' },
            { kind: 'out', text: 'Sexta', time: '10:06' },
            {
              kind: 'in',
              text: 'Feito: “Renovar o passaporte” para sexta. Te aviso na quinta.',
              time: '10:06',
            },
          ],
        },
      ],
    },
    roles: {
      eyebrow: 'Um assistente, três frentes',
      title: 'Como ter uma equipe cuidando da sua vida — pelo WhatsApp',
      description:
        'Cada frente tem um cargo e uma responsabilidade clara. Você fala do jeito que fala; ele entende o que é gasto, o que é compromisso e o que é tarefa.',
      items: [
        {
          icon: 'money',
          title: 'Dinheiro',
          role: 'Gerente financeiro',
          description:
            'Registra entradas e saídas por áudio ou texto, categoriza sozinho e responde “quanto gastei?” na hora.',
        },
        {
          icon: 'calendar',
          title: 'Agenda & lembretes',
          role: 'Secretária do seu dia',
          description:
            'Guarda compromissos, manda o lembrete no dia certo e repete o que é recorrente — “todo dia 10”.',
        },
        {
          icon: 'tasks',
          title: 'Tarefas & notas',
          role: 'Organização',
          description:
            'Anota o que você pede, cobra o prazo e marca como concluído quando você avisa que fez.',
        },
      ],
    },
    features: {
      eyebrow: 'Por dentro',
      title: 'Tudo pela conversa. Tudo no painel.',
      items: [
        {
          visual: 'chat',
          eyebrow: 'Controle financeiro',
          title: 'Errou o valor? Corrige na conversa, sem duplicar.',
          description:
            'Lançar é falar. Corrigir também: o assistente edita o lançamento em vez de criar outro — a soma do mês continua certa.',
          bullets: [
            'Áudio ou texto viram lançamento categorizado',
            '“Na verdade foi 39” edita o registro, não duplica',
            'Resumo do mês por categoria quando você pedir',
          ],
          chat: {
            label: 'Correção de um lançamento pela conversa',
            steps: [
              { kind: 'out', text: 'Paguei 42 na farmácia', time: '18:20' },
              { kind: 'in', text: 'Anotado ✅ Farmácia — R$ 42,00 em Saúde.', time: '18:20' },
              { kind: 'out', text: 'Na verdade foi 39', time: '18:21' },
              {
                kind: 'in',
                text: 'Corrigido ✅ Farmácia — R$ 39,00 em Saúde. Nada duplicado.',
                time: '18:21',
              },
            ],
          },
        },
        {
          visual: 'panel',
          eyebrow: 'Seu painel',
          title: 'O que você fala no WhatsApp aparece organizado aqui.',
          description:
            'Entradas, saídas e o que ficou fora do mês — com o “Guardado” separado do gasto. Agenda e tarefas nas abas ao lado. Funciona no navegador e no celular, de graça.',
          bullets: [
            'Dinheiro, Agenda e Tarefas em abas',
            '“Guardado” e “Resgatado” fora da conta do mês',
            'Edite qualquer coisa na mão, quando preferir',
          ],
        },
        {
          visual: 'chat',
          eyebrow: 'Agenda & lembretes',
          title: 'O resumo do dia chega antes do dia começar.',
          description:
            'Compromissos, contas que vencem e o que ficou para hoje, numa mensagem só. O que se repete, você diz uma vez.',
          bullets: [
            'Resumo diário opcional, na hora que você escolher',
            'Recorrência em uma frase: “todo dia 10”',
            'Lembrete chega no WhatsApp, no push ou por e-mail',
          ],
          chat: {
            label: 'Resumo do dia e lembrete recorrente',
            steps: [
              {
                kind: 'in',
                text: 'Bom dia! Hoje:\n10h Dentista · 15h Contadora · 19h Academia\nVence amanhã: aluguel.',
                time: '07:30',
              },
              { kind: 'out', text: 'Me lembra todo dia 10 do aluguel', time: '07:32' },
              {
                kind: 'in',
                text: 'Recorrente criado ✅ Todo dia 10, às 9h: aluguel.',
                time: '07:32',
              },
            ],
          },
        },
        {
          visual: 'chat',
          eyebrow: 'Tarefas & notas',
          title: 'Anotou pela conversa, concluiu pela conversa.',
          description:
            'Sem abrir app: “anota aí” cria a tarefa e “já fiz” conclui. As notas ficam guardadas para quando você perguntar.',
          bullets: [
            '“Anota aí” cria; “já fiz” conclui',
            'Prazo opcional, com aviso na véspera',
            'Notas soltas ficam pesquisáveis',
          ],
          chat: {
            label: 'Tarefa criada e concluída pela conversa',
            steps: [
              { kind: 'out', text: 'Anota: comprar o presente da Ju', time: '13:40' },
              { kind: 'in', text: 'Anotado ✅ “Comprar o presente da Ju”.', time: '13:40' },
              { kind: 'divider', label: 'Sábado' },
              { kind: 'out', text: 'Já comprei o presente', time: '11:15' },
              {
                kind: 'in',
                text: 'Concluída ✅ Sobram 3 tarefas na sua semana.',
                time: '11:15',
              },
            ],
          },
        },
        {
          visual: 'shared',
          eyebrow: 'Conta compartilhada',
          title: 'Até 4 pessoas, um assistente só.',
          description:
            'Convide pelo WhatsApp. Quem entra vê e lança na mesma conta: as contas da casa, os lembretes da família, os cuidados de quem você cuida.',
          bullets: [
            'Convite pelo WhatsApp, com o número confirmado',
            'Cada pessoa fala com o assistente do próprio celular',
            'Você decide quem entra — e quem sai',
          ],
        },
        {
          visual: 'bridge',
          eyebrow: 'Ponte com o negócio',
          title: 'Mesma conta do seu negócio. Vidas separadas.',
          description:
            'Se você já usa o Horarius na sua empresa, o Pessoal está na mesma conta: um alternador troca o contexto. O que é pessoal não aparece no negócio — nem para sócios, nem para a equipe.',
          bullets: [
            'Um login, dois contextos',
            'Privacidade dura: o negócio não enxerga o pessoal',
            'Sem segunda conta, sem segundo número',
          ],
        },
      ],
    },
    visuals: {
      panel: {
        tabs: { money: 'Dinheiro', agenda: 'Agenda', tasks: 'Tarefas' },
        month: 'Agosto',
        income: 'Entradas',
        incomeValue: 'R$ 4.500',
        expenses: 'Saídas',
        expensesValue: 'R$ 2.340',
        entries: [
          { name: 'Uber', category: 'Transporte', value: '- R$ 45,00' },
          { name: 'Farmácia', category: 'Saúde', value: '- R$ 39,00' },
          { name: 'Mercado', category: 'Mercado', value: '- R$ 212,40' },
        ],
        outsideMonth: 'Fora do mês',
        saved: 'Guardado',
        savedValue: 'R$ 600',
        redeemed: 'Resgatado',
        redeemedValue: 'R$ 0',
        todayTitle: 'Hoje',
        agendaItems: ['10:00 · Dentista', '15:00 · Contadora', '19:00 · Academia'],
        tasksTitle: 'Esta semana',
        tasks: [
          { text: 'Renovar o passaporte', done: false },
          { text: 'Comprar o presente da Ju', done: true },
          { text: 'Trocar o óleo do carro', done: false },
        ],
      },
      shared: {
        title: 'Casa',
        seatsLabel: '3 de 4 pessoas',
        cases: [
          'Casal: as contas da casa num lugar só',
          'Família: o lembrete chega para quem precisa',
          'Cuidadores: remédios e consultas de quem você cuida',
        ],
      },
      bridge: {
        switcherLabel: 'Você está em',
        business: 'Barbearia Aurora',
        personal: 'Pessoal',
        privacyTitle: 'Privacidade dura',
        privacyText: 'O que é pessoal não aparece no negócio — nem para sócios, nem para a equipe.',
      },
    },
    pricing: {
      eyebrow: 'Preço',
      title: 'O Financeiro é seu para sempre. O resto você testa antes.',
      description:
        'Toda conta Horarius controla o dinheiro de graça, sem limite. Agenda, Anotações, Arquivos e o assistente no WhatsApp vêm com 7 dias de teste — e uma assinatura só.',
      free: {
        name: 'Grátis',
        price: 'R$ 0',
        period: 'para sempre',
        description: 'Financeiro completo, para toda conta Horarius.',
        features: [
          'Lançamentos, contas a pagar e categorias',
          'Resumo do mês e “Guardado”',
          'Painel no navegador e no celular',
          'Notificações push e por e-mail',
        ],
        ctaLabel: 'Criar conta grátis',
      },
      paid: {
        name: 'Completo',
        anchorPrice: anchor('pt'),
        price: price('pt'),
        period: '/mês',
        description: 'Tudo do grátis + Agenda, Anotações, Arquivos e o assistente no WhatsApp.',
        features: [
          'Agenda com lembretes e recorrência',
          'Anotações e arquivos guardados',
          'Conversa ilimitada com o assistente no WhatsApp',
          'Conta compartilhada com até 4 pessoas',
        ],
        ctaLabel: 'Testar tudo grátis por 7 dias',
        badge: '7 dias grátis · sem cartão',
      },
      note: 'Acabou o teste e não assinou? O Financeiro continua; Agenda, Anotações e Arquivos ficam em leitura — nada é apagado.',
    },
    faq: personalFaq.pt,
    cta: {
      eyebrow: 'Comece hoje',
      title: 'Crie a conta, use o painel de graça e ligue o WhatsApp quando quiser testar.',
      description:
        `Leva menos de dois minutos. Se o assistente não valer os ${price('pt')}, o sistema continua seu.`,
      primaryCta: 'Criar conta grátis',
      whatsappCta: 'Falar com a gente no WhatsApp',
    },
  },
  en: {
    hero: {
      eyebrow: 'Horarius Personal',
      title: 'Your personal assistant on WhatsApp',
      titleAccent: 'notes it, reminds you and keeps you organized.',
      subtitle:
        'Send a voice note: it logs the task, remembers the appointment and records the expense. Money, calendar and to-dos in one place — no spreadsheet, no new app to learn.',
      primaryCta: personalHeaderCta.en.label,
      secondaryCta: 'See how it works',
      ctaNote: 'No card · Finance free forever · Cancel anytime',
      assistantName: 'Horarius Personal',
      assistantStatus: 'Assistant · online',
      inputPlaceholder: 'Message',
      dayDivider: 'Today',
      demoLabel: 'Demo: WhatsApp conversation with the Horarius personal assistant',
      scenarios: [
        {
          label: 'Expense logged from a voice note, with transcription',
          steps: [
            { kind: 'audio', duration: '0:04', time: '12:31', transcript: 'Spent 45 on Uber just now' },
            {
              kind: 'in',
              text: 'Logged ✅ Uber — R$ 45.00 in Transport, today.\nTransport is at R$ 182 this month.',
              time: '12:31',
            },
          ],
        },
        {
          label: 'Reminder arriving on the right day',
          steps: [
            { kind: 'out', text: 'Remind me of the car payment on the 10th', time: '19:02' },
            { kind: 'in', text: 'Done! On the 10th at 9am I will remind you: car payment.', time: '19:02' },
            { kind: 'divider', label: 'The 10th' },
            {
              kind: 'in',
              text: '🔔 Reminder: the car payment is due today. Tell me when you pay and I will log it.',
              time: '09:00',
            },
          ],
        },
        {
          label: 'Monthly summary on demand',
          steps: [
            { kind: 'out', text: 'How much did I spend this month?', time: '21:14' },
            {
              kind: 'in',
              text: 'So far, R$ 2,340 out.\nGroceries R$ 860 · Transport R$ 412 · Leisure R$ 295\nIn: R$ 4,500. R$ 2,160 left.',
              time: '21:14',
            },
          ],
        },
        {
          label: 'Task noted with a due date',
          steps: [
            { kind: 'out', text: 'Note this: renew my passport', time: '10:05' },
            { kind: 'in', text: 'Added to your list ✅ Want a due date?', time: '10:05' },
            { kind: 'out', text: 'Friday', time: '10:06' },
            { kind: 'in', text: 'Done: “Renew my passport” for Friday. I will nudge you on Thursday.', time: '10:06' },
          ],
        },
      ],
    },
    roles: {
      eyebrow: 'One assistant, three fronts',
      title: 'Like having a team looking after your life — on WhatsApp',
      description:
        'Each front has a role and a clear responsibility. You talk the way you talk; it works out what is an expense, what is an appointment and what is a task.',
      items: [
        {
          icon: 'money',
          title: 'Money',
          role: 'Finance manager',
          description:
            'Records income and expenses from voice or text, categorizes on its own and answers “how much did I spend?” instantly.',
        },
        {
          icon: 'calendar',
          title: 'Calendar & reminders',
          role: 'Secretary for your day',
          description:
            'Keeps appointments, sends the reminder on the right day and repeats what recurs — “every 10th”.',
        },
        {
          icon: 'tasks',
          title: 'Tasks & notes',
          role: 'Organization',
          description:
            'Writes down what you ask, chases the deadline and marks it done when you say you did it.',
        },
      ],
    },
    features: {
      eyebrow: 'Inside',
      title: 'Everything through the chat. Everything on the panel.',
      items: [
        {
          visual: 'chat',
          eyebrow: 'Money',
          title: 'Wrong amount? Fix it in the chat, no duplicates.',
          description:
            'Logging is talking. So is correcting: the assistant edits the entry instead of creating another one — the month stays right.',
          bullets: [
            'Voice or text become a categorized entry',
            '“Actually it was 39” edits the record, never duplicates',
            'Monthly summary by category whenever you ask',
          ],
          chat: {
            label: 'Correcting an entry in the chat',
            steps: [
              { kind: 'out', text: 'Paid 42 at the pharmacy', time: '18:20' },
              { kind: 'in', text: 'Logged ✅ Pharmacy — R$ 42.00 in Health.', time: '18:20' },
              { kind: 'out', text: 'Actually it was 39', time: '18:21' },
              { kind: 'in', text: 'Fixed ✅ Pharmacy — R$ 39.00 in Health. Nothing duplicated.', time: '18:21' },
            ],
          },
        },
        {
          visual: 'panel',
          eyebrow: 'Your panel',
          title: 'What you say on WhatsApp shows up organized here.',
          description:
            'Income, expenses and what sits outside the month — with “Saved” kept apart from spending. Calendar and tasks in the tabs next to it. Works in the browser and on your phone, for free.',
          bullets: [
            'Money, Calendar and Tasks in tabs',
            '“Saved” and “Redeemed” outside the monthly total',
            'Edit anything by hand whenever you prefer',
          ],
        },
        {
          visual: 'chat',
          eyebrow: 'Calendar & reminders',
          title: 'The day’s summary arrives before the day starts.',
          description:
            'Appointments, bills due and what is left for today, in one message. Whatever repeats, you say once.',
          bullets: [
            'Optional daily summary, at the time you choose',
            'Recurrence in one sentence: “every 10th”',
            'Reminders on WhatsApp, push or email',
          ],
          chat: {
            label: 'Daily summary and a recurring reminder',
            steps: [
              {
                kind: 'in',
                text: 'Good morning! Today:\n10am Dentist · 3pm Accountant · 7pm Gym\nDue tomorrow: rent.',
                time: '07:30',
              },
              { kind: 'out', text: 'Remind me of the rent every 10th', time: '07:32' },
              { kind: 'in', text: 'Recurring reminder set ✅ Every 10th at 9am: rent.', time: '07:32' },
            ],
          },
        },
        {
          visual: 'chat',
          eyebrow: 'Tasks & notes',
          title: 'Noted in the chat, completed in the chat.',
          description:
            'No app to open: “note this” creates the task and “done” completes it. Notes stay saved for whenever you ask.',
          bullets: [
            '“Note this” creates; “done” completes',
            'Optional due date, with a nudge the day before',
            'Loose notes stay searchable',
          ],
          chat: {
            label: 'Task created and completed in the chat',
            steps: [
              { kind: 'out', text: 'Note: buy Ju’s present', time: '13:40' },
              { kind: 'in', text: 'Noted ✅ “Buy Ju’s present”.', time: '13:40' },
              { kind: 'divider', label: 'Saturday' },
              { kind: 'out', text: 'Bought the present', time: '11:15' },
              { kind: 'in', text: 'Completed ✅ 3 tasks left this week.', time: '11:15' },
            ],
          },
        },
        {
          visual: 'shared',
          eyebrow: 'Shared account',
          title: 'Up to 4 people, one assistant.',
          description:
            'Invite through WhatsApp. Whoever joins sees and logs in the same account: household bills, family reminders, the care of someone you look after.',
          bullets: [
            'Invite via WhatsApp, with a verified number',
            'Each person talks to the assistant from their own phone',
            'You decide who joins — and who leaves',
          ],
        },
        {
          visual: 'bridge',
          eyebrow: 'Bridge to your business',
          title: 'Same account as your business. Separate lives.',
          description:
            'If you already use Horarius at your business, Personal lives in the same account: a switcher changes context. What is personal never shows up in the business — not to partners, not to staff.',
          bullets: [
            'One login, two contexts',
            'Hard privacy: the business cannot see the personal side',
            'No second account, no second number',
          ],
        },
      ],
    },
    visuals: {
      panel: {
        tabs: { money: 'Money', agenda: 'Calendar', tasks: 'Tasks' },
        month: 'August',
        income: 'Income',
        incomeValue: 'R$ 4,500',
        expenses: 'Expenses',
        expensesValue: 'R$ 2,340',
        entries: [
          { name: 'Uber', category: 'Transport', value: '- R$ 45.00' },
          { name: 'Pharmacy', category: 'Health', value: '- R$ 39.00' },
          { name: 'Groceries', category: 'Groceries', value: '- R$ 212.40' },
        ],
        outsideMonth: 'Outside the month',
        saved: 'Saved',
        savedValue: 'R$ 600',
        redeemed: 'Redeemed',
        redeemedValue: 'R$ 0',
        todayTitle: 'Today',
        agendaItems: ['10:00 · Dentist', '15:00 · Accountant', '19:00 · Gym'],
        tasksTitle: 'This week',
        tasks: [
          { text: 'Renew my passport', done: false },
          { text: 'Buy Ju’s present', done: true },
          { text: 'Change the car oil', done: false },
        ],
      },
      shared: {
        title: 'Home',
        seatsLabel: '3 of 4 people',
        cases: [
          'Couples: household bills in one place',
          'Families: the reminder reaches whoever needs it',
          'Caregivers: medication and appointments for someone you care for',
        ],
      },
      bridge: {
        switcherLabel: 'You are in',
        business: 'Aurora Barbers',
        personal: 'Personal',
        privacyTitle: 'Hard privacy',
        privacyText: 'What is personal never shows up in the business — not to partners, not to staff.',
      },
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Finance is yours forever. Try the rest first.',
      description:
        'Every Horarius account tracks money for free, no limits. Calendar, Notes, Files and the WhatsApp assistant come with a 7-day trial — and a single subscription.',
      free: {
        name: 'Free',
        price: 'R$ 0',
        period: 'forever',
        description: 'Full finance, for every Horarius account.',
        features: [
          'Entries, bills and categories',
          'Monthly summary and “Saved”',
          'Panel in the browser and on your phone',
          'Push and email notifications',
        ],
        ctaLabel: 'Create free account',
      },
      paid: {
        name: 'Complete',
        anchorPrice: anchor('en'),
        price: price('en'),
        period: '/month',
        description: 'Everything in Free + Calendar, Notes, Files and the assistant on your WhatsApp.',
        features: [
          'Calendar with reminders and recurrence',
          'Notes and files kept for you',
          'Unlimited conversation with the WhatsApp assistant',
          'Shared account with up to 4 people',
        ],
        ctaLabel: 'Try everything free for 7 days',
        badge: '7 days free · no card',
      },
      note: 'Trial over and did not subscribe? Finance stays; Calendar, Notes and Files become read-only — nothing is deleted.',
    },
    faq: personalFaq.en,
    cta: {
      eyebrow: 'Start today',
      title: 'Create the account, use the panel for free and switch WhatsApp on when you want to try it.',
      description:
        `It takes under two minutes. If the assistant is not worth ${price('en')}, the system is still yours.`,
      primaryCta: 'Create free account',
      whatsappCta: 'Talk to us on WhatsApp',
    },
  },
  es: {
    hero: {
      eyebrow: 'Horarius Personal',
      title: 'Tu asistente personal en WhatsApp',
      titleAccent: 'anota, recuerda y organiza por ti.',
      subtitle:
        'Manda un audio: anota la tarea, recuerda la cita y registra el gasto. Dinero, agenda y tareas en un solo lugar — sin planilla, sin una app nueva que aprender.',
      primaryCta: personalHeaderCta.es.label,
      secondaryCta: 'Ver cómo funciona',
      ctaNote: 'Sin tarjeta · Finanzas gratis para siempre · Cancela cuando quieras',
      assistantName: 'Horarius Personal',
      assistantStatus: 'Asistente · en línea',
      inputPlaceholder: 'Mensaje',
      dayDivider: 'Hoy',
      demoLabel: 'Demostración: conversación en WhatsApp con el asistente personal de Horarius',
      scenarios: [
        {
          label: 'Gasto registrado por audio, con transcripción',
          steps: [
            { kind: 'audio', duration: '0:04', time: '12:31', transcript: 'Gasté 45 en Uber ahora' },
            {
              kind: 'in',
              text: 'Anotado ✅ Uber — R$ 45,00 en Transporte, hoy.\nEn el mes, Transporte ya suma R$ 182.',
              time: '12:31',
            },
          ],
        },
        {
          label: 'Recordatorio que llega el día correcto',
          steps: [
            { kind: 'out', text: 'Recuérdame la cuota del auto el día 10', time: '19:02' },
            { kind: 'in', text: '¡Listo! El día 10, a las 9, te recuerdo: cuota del auto.', time: '19:02' },
            { kind: 'divider', label: 'Día 10' },
            {
              kind: 'in',
              text: '🔔 Recordatorio: la cuota del auto vence hoy. Avísame cuando pagues y la registro.',
              time: '09:00',
            },
          ],
        },
        {
          label: 'Resumen del mes al instante',
          steps: [
            { kind: 'out', text: '¿Cuánto gasté este mes?', time: '21:14' },
            {
              kind: 'in',
              text: 'Hasta hoy, R$ 2.340 en salidas.\nSupermercado R$ 860 · Transporte R$ 412 · Ocio R$ 295\nEntradas: R$ 4.500. Quedan R$ 2.160.',
              time: '21:14',
            },
          ],
        },
        {
          label: 'Tarea anotada con plazo',
          steps: [
            { kind: 'out', text: 'Anota: renovar el pasaporte', time: '10:05' },
            { kind: 'in', text: 'Anotado en tu lista ✅ ¿Le pongo un plazo?', time: '10:05' },
            { kind: 'out', text: 'Viernes', time: '10:06' },
            { kind: 'in', text: 'Hecho: “Renovar el pasaporte” para el viernes. Te aviso el jueves.', time: '10:06' },
          ],
        },
      ],
    },
    roles: {
      eyebrow: 'Un asistente, tres frentes',
      title: 'Como tener un equipo cuidando tu vida — por WhatsApp',
      description:
        'Cada frente tiene un cargo y una responsabilidad clara. Hablas como hablas; él entiende qué es gasto, qué es cita y qué es tarea.',
      items: [
        {
          icon: 'money',
          title: 'Dinero',
          role: 'Gerente financiero',
          description:
            'Registra entradas y salidas por audio o texto, categoriza solo y responde “¿cuánto gasté?” al instante.',
        },
        {
          icon: 'calendar',
          title: 'Agenda y recordatorios',
          role: 'Secretaria de tu día',
          description:
            'Guarda citas, manda el recordatorio el día correcto y repite lo recurrente — “todos los 10”.',
        },
        {
          icon: 'tasks',
          title: 'Tareas y notas',
          role: 'Organización',
          description:
            'Anota lo que pides, cobra el plazo y lo marca como hecho cuando avisas que lo hiciste.',
        },
      ],
    },
    features: {
      eyebrow: 'Por dentro',
      title: 'Todo por la conversación. Todo en el panel.',
      items: [
        {
          visual: 'chat',
          eyebrow: 'Control financiero',
          title: '¿Te equivocaste de monto? Corrige en la conversación, sin duplicar.',
          description:
            'Registrar es hablar. Corregir también: el asistente edita el registro en vez de crear otro — la suma del mes sigue correcta.',
          bullets: [
            'Audio o texto se vuelven un registro categorizado',
            '“En realidad fueron 39” edita el registro, no duplica',
            'Resumen del mes por categoría cuando lo pidas',
          ],
          chat: {
            label: 'Corrección de un registro por la conversación',
            steps: [
              { kind: 'out', text: 'Pagué 42 en la farmacia', time: '18:20' },
              { kind: 'in', text: 'Anotado ✅ Farmacia — R$ 42,00 en Salud.', time: '18:20' },
              { kind: 'out', text: 'En realidad fueron 39', time: '18:21' },
              { kind: 'in', text: 'Corregido ✅ Farmacia — R$ 39,00 en Salud. Nada duplicado.', time: '18:21' },
            ],
          },
        },
        {
          visual: 'panel',
          eyebrow: 'Tu panel',
          title: 'Lo que dices en WhatsApp aparece organizado aquí.',
          description:
            'Entradas, salidas y lo que quedó fuera del mes — con lo “Guardado” separado del gasto. Agenda y tareas en las pestañas de al lado. Funciona en el navegador y en el celular, gratis.',
          bullets: [
            'Dinero, Agenda y Tareas en pestañas',
            '“Guardado” y “Rescatado” fuera de la cuenta del mes',
            'Edita lo que quieras a mano, cuando prefieras',
          ],
        },
        {
          visual: 'chat',
          eyebrow: 'Agenda y recordatorios',
          title: 'El resumen del día llega antes de que empiece el día.',
          description:
            'Citas, cuentas que vencen y lo que quedó para hoy, en un solo mensaje. Lo que se repite, lo dices una vez.',
          bullets: [
            'Resumen diario opcional, a la hora que elijas',
            'Recurrencia en una frase: “todos los 10”',
            'El recordatorio llega por WhatsApp, push o e-mail',
          ],
          chat: {
            label: 'Resumen del día y recordatorio recurrente',
            steps: [
              {
                kind: 'in',
                text: '¡Buen día! Hoy:\n10 h Dentista · 15 h Contadora · 19 h Gimnasio\nVence mañana: alquiler.',
                time: '07:30',
              },
              { kind: 'out', text: 'Recuérdame el alquiler todos los 10', time: '07:32' },
              { kind: 'in', text: 'Recurrente creado ✅ Todos los 10, a las 9: alquiler.', time: '07:32' },
            ],
          },
        },
        {
          visual: 'chat',
          eyebrow: 'Tareas y notas',
          title: 'Anotado por la conversación, terminado por la conversación.',
          description:
            'Sin abrir una app: “anota” crea la tarea y “ya lo hice” la completa. Las notas quedan guardadas para cuando preguntes.',
          bullets: [
            '“Anota” crea; “ya lo hice” completa',
            'Plazo opcional, con aviso el día anterior',
            'Las notas sueltas quedan buscables',
          ],
          chat: {
            label: 'Tarea creada y completada por la conversación',
            steps: [
              { kind: 'out', text: 'Anota: comprar el regalo de Ju', time: '13:40' },
              { kind: 'in', text: 'Anotado ✅ “Comprar el regalo de Ju”.', time: '13:40' },
              { kind: 'divider', label: 'Sábado' },
              { kind: 'out', text: 'Ya compré el regalo', time: '11:15' },
              { kind: 'in', text: 'Completada ✅ Te quedan 3 tareas esta semana.', time: '11:15' },
            ],
          },
        },
        {
          visual: 'shared',
          eyebrow: 'Cuenta compartida',
          title: 'Hasta 4 personas, un solo asistente.',
          description:
            'Invita por WhatsApp. Quien entra ve y registra en la misma cuenta: las cuentas de la casa, los recordatorios de la familia, los cuidados de quien cuidas.',
          bullets: [
            'Invitación por WhatsApp, con el número confirmado',
            'Cada persona habla con el asistente desde su propio celular',
            'Tú decides quién entra — y quién sale',
          ],
        },
        {
          visual: 'bridge',
          eyebrow: 'Puente con el negocio',
          title: 'La misma cuenta de tu negocio. Vidas separadas.',
          description:
            'Si ya usas Horarius en tu empresa, Personal está en la misma cuenta: un selector cambia el contexto. Lo personal no aparece en el negocio — ni para socios, ni para el equipo.',
          bullets: [
            'Un login, dos contextos',
            'Privacidad dura: el negocio no ve lo personal',
            'Sin segunda cuenta, sin segundo número',
          ],
        },
      ],
    },
    visuals: {
      panel: {
        tabs: { money: 'Dinero', agenda: 'Agenda', tasks: 'Tareas' },
        month: 'Agosto',
        income: 'Entradas',
        incomeValue: 'R$ 4.500',
        expenses: 'Salidas',
        expensesValue: 'R$ 2.340',
        entries: [
          { name: 'Uber', category: 'Transporte', value: '- R$ 45,00' },
          { name: 'Farmacia', category: 'Salud', value: '- R$ 39,00' },
          { name: 'Supermercado', category: 'Supermercado', value: '- R$ 212,40' },
        ],
        outsideMonth: 'Fuera del mes',
        saved: 'Guardado',
        savedValue: 'R$ 600',
        redeemed: 'Rescatado',
        redeemedValue: 'R$ 0',
        todayTitle: 'Hoy',
        agendaItems: ['10:00 · Dentista', '15:00 · Contadora', '19:00 · Gimnasio'],
        tasksTitle: 'Esta semana',
        tasks: [
          { text: 'Renovar el pasaporte', done: false },
          { text: 'Comprar el regalo de Ju', done: true },
          { text: 'Cambiar el aceite del auto', done: false },
        ],
      },
      shared: {
        title: 'Casa',
        seatsLabel: '3 de 4 personas',
        cases: [
          'Pareja: las cuentas de la casa en un solo lugar',
          'Familia: el recordatorio llega a quien lo necesita',
          'Cuidadores: remedios y citas de quien cuidas',
        ],
      },
      bridge: {
        switcherLabel: 'Estás en',
        business: 'Barbería Aurora',
        personal: 'Personal',
        privacyTitle: 'Privacidad dura',
        privacyText: 'Lo personal no aparece en el negocio — ni para socios, ni para el equipo.',
      },
    },
    pricing: {
      eyebrow: 'Precio',
      title: 'Las finanzas son tuyas para siempre. El resto lo pruebas antes.',
      description:
        'Toda cuenta Horarius controla el dinero gratis, sin límite. Agenda, Notas, Archivos y el asistente en WhatsApp vienen con 7 días de prueba — y una sola suscripción.',
      free: {
        name: 'Gratis',
        price: 'R$ 0',
        period: 'para siempre',
        description: 'Finanzas completas, para toda cuenta Horarius.',
        features: [
          'Registros, cuentas por pagar y categorías',
          'Resumen del mes y “Guardado”',
          'Panel en el navegador y en el celular',
          'Notificaciones push y por e-mail',
        ],
        ctaLabel: 'Crear cuenta gratis',
      },
      paid: {
        name: 'Completo',
        anchorPrice: anchor('es'),
        price: price('es'),
        period: '/mes',
        description: 'Todo lo gratis + Agenda, Notas, Archivos y el asistente en tu WhatsApp.',
        features: [
          'Agenda con recordatorios y recurrencia',
          'Notas y archivos guardados',
          'Conversación ilimitada con el asistente en WhatsApp',
          'Cuenta compartida con hasta 4 personas',
        ],
        ctaLabel: 'Probar todo gratis 7 días',
        badge: '7 días gratis · sin tarjeta',
      },
      note: '¿Terminó la prueba y no te suscribiste? Las finanzas siguen; Agenda, Notas y Archivos quedan en solo lectura — nada se borra.',
    },
    faq: personalFaq.es,
    cta: {
      eyebrow: 'Empieza hoy',
      title: 'Crea la cuenta, usa el panel gratis y enciende WhatsApp cuando quieras probar.',
      description:
        `Toma menos de dos minutos. Si el asistente no vale los ${price('es')}, el sistema sigue siendo tuyo.`,
      primaryCta: 'Crear cuenta gratis',
      whatsappCta: 'Hablar con nosotros por WhatsApp',
    },
  },
};
