import type { Language, PersonalPageContent } from '../types';

/* A parte do conteúdo do Horarius Pessoal que o bundle PRINCIPAL precisa:
   o CTA do header (App.tsx) e o FAQ (JSON-LD em seo/head.ts). O resto da
   página (personalPage.ts, ~1000 linhas em três línguas) só entra no chunk
   lazy da /pessoal — importar `personalPage` daqui de fora puxaria tudo de
   volta para o bundle da home. */

export const personalHeaderCta: Record<Language, { label: string; compactLabel: string }> = {
  pt: { label: 'Testar grátis por 14 dias', compactLabel: 'Testar grátis' },
  en: { label: 'Try free for 14 days', compactLabel: 'Try free' },
  es: { label: 'Probar gratis 14 días', compactLabel: 'Probar gratis' },
};

export const personalFaq: Record<Language, PersonalPageContent['faq']> = {
  pt: {
    eyebrow: 'Perguntas frequentes',
    title: 'O que as pessoas perguntam antes de testar',
    items: [
      {
        question: 'O que acontece quando o teste acaba?',
        answer:
          'Você continua usando o sistema, só sem o WhatsApp. O painel, seus lançamentos, tarefas e notas ficam onde estão, e você segue lançando na mão. Se assinar depois, o assistente volta com tudo que já estava lá.',
      },
      {
        question: 'Preciso de cartão para testar?',
        answer:
          'Não. O teste de 14 dias começa sem cartão e sem cobrança automática no fim. Só é cobrado quem escolhe assinar.',
      },
      {
        question: 'O que conta como “lembrete proativo”?',
        answer:
          'É a mensagem que o assistente manda por conta própria: o lembrete do compromisso, o aviso da conta que vence, o resumo do dia. Conversa que você começa não conta e é ilimitada. Ao chegar em 80% do mês a gente avisa; se passar de 100, os lembretes continuam chegando por push e e-mail.',
      },
      {
        question: 'Ele lê nota fiscal ou conecta com o meu banco?',
        answer:
          'Não. Você registra por áudio ou texto e ele categoriza — leva o tempo de mandar uma mensagem. Preferimos prometer só o que funciona hoje.',
      },
      {
        question: 'Já uso o Horarius no meu negócio. Preciso de outra conta?',
        answer:
          'Não. O Pessoal fica na mesma conta, com um alternador entre o negócio e a sua vida. O que é pessoal não aparece para sócios nem para a equipe.',
      },
      {
        question: 'Como funciona a conta compartilhada?',
        answer:
          'Você convida pelo WhatsApp e a pessoa confirma o próprio número antes de entrar. Até 4 pessoas lançam e recebem lembretes na mesma conta. Antes de aceitar, a pessoa é avisada de que verá o que já está lá.',
      },
    ],
  },
  en: {
    eyebrow: 'FAQ',
    title: 'What people ask before trying',
    items: [
      {
        question: 'What happens when the trial ends?',
        answer:
          'You keep using the system, just without WhatsApp. The panel, your entries, tasks and notes stay where they are and you keep logging by hand. Subscribe later and the assistant comes back with everything already there.',
      },
      {
        question: 'Do I need a card to try it?',
        answer:
          'No. The 14-day trial starts without a card and there is no automatic charge at the end. Only people who choose to subscribe are billed.',
      },
      {
        question: 'What counts as a “proactive reminder”?',
        answer:
          'A message the assistant sends on its own: the appointment reminder, the bill-due notice, the daily summary. Conversations you start do not count and are unlimited. At 80% of the month we warn you; past 100, reminders keep arriving by push and email.',
      },
      {
        question: 'Does it read receipts or connect to my bank?',
        answer:
          'No. You record by voice or text and it categorizes — it takes as long as sending a message. We would rather promise only what works today.',
      },
      {
        question: 'I already use Horarius at my business. Do I need another account?',
        answer:
          'No. Personal lives in the same account, with a switcher between the business and your life. What is personal is never visible to partners or staff.',
      },
      {
        question: 'How does the shared account work?',
        answer:
          'You invite through WhatsApp and the person confirms their own number before joining. Up to 4 people log entries and get reminders in the same account. Before accepting, the person is told they will see what is already there.',
      },
    ],
  },
  es: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que la gente pregunta antes de probar',
    items: [
      {
        question: '¿Qué pasa cuando termina la prueba?',
        answer:
          'Sigues usando el sistema, solo sin WhatsApp. El panel, tus registros, tareas y notas quedan donde están, y sigues registrando a mano. Si te suscribes después, el asistente vuelve con todo lo que ya estaba.',
      },
      {
        question: '¿Necesito tarjeta para probar?',
        answer:
          'No. La prueba de 14 días empieza sin tarjeta y sin cobro automático al final. Solo se cobra a quien elige suscribirse.',
      },
      {
        question: '¿Qué cuenta como “recordatorio proactivo”?',
        answer:
          'Es el mensaje que el asistente manda por su cuenta: el recordatorio de la cita, el aviso de la cuenta que vence, el resumen del día. La conversación que tú empiezas no cuenta y es ilimitada. Al llegar al 80 % del mes te avisamos; si pasas de 100, los recordatorios siguen llegando por push y e-mail.',
      },
      {
        question: '¿Lee facturas o se conecta con mi banco?',
        answer:
          'No. Registras por audio o texto y él categoriza — tarda lo que tarda mandar un mensaje. Preferimos prometer solo lo que funciona hoy.',
      },
      {
        question: 'Ya uso Horarius en mi negocio. ¿Necesito otra cuenta?',
        answer:
          'No. Personal queda en la misma cuenta, con un selector entre el negocio y tu vida. Lo personal no aparece para socios ni para el equipo.',
      },
      {
        question: '¿Cómo funciona la cuenta compartida?',
        answer:
          'Invitas por WhatsApp y la persona confirma su propio número antes de entrar. Hasta 4 personas registran y reciben recordatorios en la misma cuenta. Antes de aceptar, la persona sabe que verá lo que ya está ahí.',
      },
    ],
  },
};
