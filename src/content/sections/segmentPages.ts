import type { Language, LandingContent } from '../types';

/* Copy das landing pages por segmento. Regra de ouro: só prometer o que o
   produto entrega hoje (IA no número próprio via API oficial, lembretes e
   controle de faltas, lista de espera, compressão de agenda, link público,
   Google Agenda, campanhas de retorno, planos recorrentes, relatórios). */
export const segmentPages: Record<Language, LandingContent['segmentPages']> = {
  pt: {
    barbershops: {
      eyebrow: 'Horarius para barbearias',
      title: 'Sistema para barbearia',
      titleAccent: 'com IA que atende seu WhatsApp enquanto você corta.',
      subtitle:
        'O cliente marca o corte sozinho, a IA responde na hora — inclusive domingo à noite — e a cadeira não fica vazia quando alguém cancela.',
      painsTitle: 'Se a sua barbearia vive isso, é aqui que resolve',
      pains: [
        'Responder WhatsApp no meio do corte',
        'Cliente que marca e não aparece',
        'Cancelamento que deixa a cadeira vazia o resto do dia',
        'Agenda no caderno ou em planilha solta',
      ],
      featuresTitle: 'O que o Horarius faz pela sua barbearia',
      features: [
        {
          title: 'IA atendendo no número da barbearia',
          description:
            'Pela API oficial do WhatsApp, no número que seus clientes já têm salvo: responde preço, mostra horários livres, agenda e remarca. Quando o assunto precisa de você, é só assumir a conversa de onde ela parou.',
        },
        {
          title: 'Lembretes que derrubam as faltas',
          description:
            'Confirmação automática, lembrete perto do horário e controle de faltas por cliente — quem tem histórico de furar recebe tratamento diferente.',
        },
        {
          title: 'Cancelou? A fila cobre o buraco',
          description:
            'A lista de espera oferece o horário liberado para quem estava esperando, e a compressão de agenda junta os buracos do dia para render mais cortes.',
        },
        {
          title: 'Link de agendamento na bio do Instagram',
          description:
            'Seu link público aberto 24h: o cliente escolhe barbeiro, serviço e horário sem te chamar. Tudo sincronizado com o Google Agenda.',
        },
      ],
      faqTitle: 'Perguntas de quem tem barbearia',
      faq: [
        {
          question: 'Funciona no número de WhatsApp que a barbearia já usa?',
          answer:
            'Sim. O Horarius usa a API oficial do WhatsApp Business (Meta), no número do seu negócio — sem QR code, sem risco de banimento e sem depender de celular ligado.',
        },
        {
          question: 'E quando o cliente quer falar com o barbeiro de verdade?',
          answer:
            'A IA transfere a conversa para atendimento humano quando você quiser — você assume do ponto em que ela parou, sem o cliente repetir nada.',
        },
        {
          question: 'Quanto custa e como testo?',
          answer:
            'Os planos começam em R$ 110/mês. Você cria a conta grátis, configura serviços e equipe em minutos e testa a agenda e a IA antes de assinar — sem cartão de crédito.',
        },
      ],
      ctaTitle: 'Deixe o WhatsApp trabalhar enquanto você corta',
      primaryCta: 'Testar grátis',
      secondaryCta: 'Ver planos e preços',
      ctaNote: 'Grátis para testar · Configura em 3 minutos · Cancele quando quiser',
    },
    salons: {
      eyebrow: 'Horarius para salões de beleza',
      title: 'Sistema para salão de beleza',
      titleAccent: 'com IA que agenda, confirma e traz cliente de volta.',
      subtitle:
        'Várias profissionais, serviços com durações diferentes e o WhatsApp lotado — o Horarius organiza tudo isso e ainda chama de volta quem sumiu.',
      painsTitle: 'Se o seu salão vive isso, é aqui que resolve',
      pains: [
        'WhatsApp lotado enquanto todas estão atendendo',
        'Encaixar escova, mecha e manicure sem furar horário',
        'Cliente fiel que foi sumindo sem ninguém perceber',
        'Agenda de cada profissional em um caderno diferente',
      ],
      featuresTitle: 'O que o Horarius faz pelo seu salão',
      features: [
        {
          title: 'Recepção de IA no WhatsApp do salão',
          description:
            'Atende 24h no número oficial do salão: informa preços, oferece horários por profissional e fecha o agendamento. Sua equipe assume a conversa quando precisar.',
        },
        {
          title: 'Agenda por profissional, sem conflito',
          description:
            'Serviços com durações diferentes, bloqueios e encaixes em uma agenda só — cada profissional vê o próprio dia, você vê o salão inteiro, tudo no Google Agenda também.',
        },
        {
          title: 'Campanhas que trazem cliente de volta',
          description:
            'O Horarius identifica quem parou de vir e convida de volta pelo WhatsApp. Planos recorrentes transformam cliente ocasional em presença fixa do mês.',
        },
        {
          title: 'Confirmações que protegem o dia',
          description:
            'Confirmação e lembrete automáticos antes de cada horário, remarcação sem drama e fila de espera para preencher cancelamento de última hora.',
        },
      ],
      faqTitle: 'Perguntas de quem tem salão',
      faq: [
        {
          question: 'Funciona com várias profissionais e serviços diferentes?',
          answer:
            'Sim. Cada profissional tem a própria agenda e os próprios serviços, com durações e horários de trabalho independentes — a IA respeita tudo isso ao oferecer horários.',
        },
        {
          question: 'A IA sabe responder preço e duração de cada serviço?',
          answer:
            'Sabe. Ela usa seu catálogo de serviços real: preço, duração e profissional que executa. Você atualiza no painel e a IA passa a responder com o valor novo na hora.',
        },
        {
          question: 'Quanto custa e como testo?',
          answer:
            'Os planos começam em R$ 110/mês. A conta é grátis para criar, o onboarding leva uns 3 minutos e você testa a agenda e a IA antes de assinar — sem cartão de crédito.',
        },
      ],
      ctaTitle: 'Seu salão cheio, seu WhatsApp em paz',
      primaryCta: 'Testar grátis',
      secondaryCta: 'Ver planos e preços',
      ctaNote: 'Grátis para testar · Configura em 3 minutos · Cancele quando quiser',
    },
    aesthetics: {
      eyebrow: 'Horarius para clínicas de estética',
      title: 'Sistema para clínica de estética',
      titleAccent: 'com IA que agenda sessões e segura o retorno.',
      subtitle:
        'Sessão desmarcada é prejuízo direto. O Horarius confirma cada horário, preenche cancelamentos e lembra a cliente de voltar na hora certa.',
      painsTitle: 'Se a sua clínica vive isso, é aqui que resolve',
      pains: [
        'Falta em sessão que travou a sala por uma hora',
        'Pacote vendido que a cliente esquece de continuar',
        'Agenda dividida entre recepção e profissionais',
        'WhatsApp respondido só quando a recepção desocupa',
      ],
      featuresTitle: 'O que o Horarius faz pela sua clínica',
      features: [
        {
          title: 'Agendamento de sessões pela IA',
          description:
            'A cliente agenda avaliação ou sessão direto no WhatsApp oficial da clínica, com horários reais por profissional — e a recepção só entra quando precisa.',
        },
        {
          title: 'Confirmações que reduzem faltas',
          description:
            'Confirmação e lembrete automáticos antes de cada sessão, com controle de faltas por cliente. Cancelou? A lista de espera oferece o horário para outra cliente na hora.',
        },
        {
          title: 'Retorno pós-procedimento no tempo certo',
          description:
            'Mensagem automática depois do atendimento para colher retorno e puxar o próximo agendamento — a cliente volta antes de esfriar.',
        },
        {
          title: 'Planos recorrentes para pacotes',
          description:
            'Pacotes e planos com recorrência dentro do sistema, para a cliente manter o ciclo de sessões em dia sem a recepção perseguir ninguém.',
        },
      ],
      faqTitle: 'Perguntas de quem tem clínica',
      faq: [
        {
          question: 'Consigo agendas separadas por profissional e por sala?',
          answer:
            'Cada profissional tem agenda, serviços e horários próprios, com bloqueios e indisponibilidades — a IA só oferece horários que realmente existem.',
        },
        {
          question: 'A IA aguenta perguntas sobre procedimentos?',
          answer:
            'Ela responde com base no seu catálogo de serviços (preço, duração, profissional). Perguntas clínicas ou delicadas ela transfere para sua equipe, com todo o histórico da conversa.',
        },
        {
          question: 'Quanto custa e como testo?',
          answer:
            'Os planos começam em R$ 110/mês. Conta grátis, configuração em minutos e teste da agenda e da IA antes de assinar — sem cartão de crédito.',
        },
      ],
      ctaTitle: 'Sessões confirmadas, salas ocupadas, clientes voltando',
      primaryCta: 'Testar grátis',
      secondaryCta: 'Ver planos e preços',
      ctaNote: 'Grátis para testar · Configura em 3 minutos · Cancele quando quiser',
    },
    pets: {
      eyebrow: 'Horarius para pet shops',
      title: 'Sistema para pet shop e banho e tosa',
      titleAccent: 'com IA que agenda o banho enquanto sua equipe tosa.',
      subtitle:
        'Tutor pergunta preço, quer encaixe pro sábado e esquece do horário — a IA resolve as três coisas no WhatsApp, sem ninguém largar a tosa pra responder.',
      painsTitle: 'Se o seu pet shop vive isso, é aqui que resolve',
      pains: [
        'Telefone e WhatsApp tocando durante o banho',
        'Tutor que esquece o horário e não aparece',
        'Sábado lotado e semana com buraco',
        'Recorrência do banho quinzenal que se perde',
      ],
      featuresTitle: 'O que o Horarius faz pelo seu pet shop',
      features: [
        {
          title: 'IA agendando banho e tosa no WhatsApp',
          description:
            'O tutor marca sozinho, no número oficial do pet shop: escolhe serviço, dia e horário com os preços do seu catálogo. Sua equipe só entra quando o assunto precisa de gente.',
        },
        {
          title: 'Lembretes que evitam banho perdido',
          description:
            'Confirmação e lembrete automáticos para cada horário, com controle de faltas por tutor — e remarcação fácil quando o plano muda.',
        },
        {
          title: 'Fila de espera para lotar a semana',
          description:
            'Cancelou o horário de sábado? A lista de espera oferece a vaga para o próximo tutor na hora, e a compressão de agenda junta os buracos entre banhos.',
        },
        {
          title: 'Recorrência para o banho de sempre',
          description:
            'Planos recorrentes para banho semanal ou quinzenal e campanhas para chamar de volta o tutor que sumiu — a agenda anda sozinha.',
        },
      ],
      faqTitle: 'Perguntas de quem tem pet shop',
      faq: [
        {
          question: 'O tutor consegue marcar sem falar com ninguém?',
          answer:
            'Sim. Pela IA no WhatsApp ou pelo link público de agendamento — nos dois casos ele escolhe serviço, dia e horário reais, e a agenda atualiza na hora.',
        },
        {
          question: 'Funciona para banho, tosa e serviços com tempos diferentes?',
          answer:
            'Funciona. Cada serviço tem duração e preço próprios no catálogo, e a IA usa isso para oferecer horários que cabem de verdade na agenda.',
        },
        {
          question: 'Quanto custa e como testo?',
          answer:
            'Os planos começam em R$ 110/mês. Conta grátis, configuração em minutos e teste antes de assinar — sem cartão de crédito.',
        },
      ],
      ctaTitle: 'Agenda cheia de banho marcado, equipe focada no pet',
      primaryCta: 'Testar grátis',
      secondaryCta: 'Ver planos e preços',
      ctaNote: 'Grátis para testar · Configura em 3 minutos · Cancele quando quiser',
    },
    nails: {
      eyebrow: 'Horarius para esmalterias',
      title: 'Sistema para esmalteria',
      titleAccent: 'com IA que atende o WhatsApp enquanto você faz a unha.',
      subtitle:
        'Serviço curto, agenda picada e cliente mandando mensagem no meio do atendimento — a IA responde, encaixa e confirma sem você largar o alicate.',
      painsTitle: 'Se a sua esmalteria vive isso, é aqui que resolve',
      pains: [
        'WhatsApp tocando no meio do esmalte',
        'Buraco de quarenta minutos entre uma cliente e outra',
        'Cliente que sumiu e não voltou a marcar',
        'Fila no sábado e semana com horário sobrando',
      ],
      featuresTitle: 'O que o Horarius faz pela sua esmalteria',
      features: [
        {
          title: 'IA agendando no seu próprio WhatsApp',
          description:
            'A cliente escolhe serviço, dia e horário sozinha, no número oficial da esmalteria e com os preços do seu catálogo. Você entra na conversa só quando ela precisa de gente.',
        },
        {
          title: 'Encaixe automático entre serviços curtos',
          description:
            'A compressão de agenda junta os buracos do dia e a lista de espera oferece o horário vago para a próxima cliente na hora — sem ninguém remarcar na mão.',
        },
        {
          title: 'Lembretes que derrubam faltas',
          description:
            'Confirmação e lembrete automáticos para cada horário, com controle de faltas por cliente e remarcação fácil quando o plano muda.',
        },
        {
          title: 'Recorrência de quem vem toda semana',
          description:
            'Planos recorrentes para manutenção semanal ou quinzenal e campanhas para chamar de volta quem parou de aparecer.',
        },
      ],
      faqTitle: 'Perguntas de quem tem esmalteria',
      faq: [
        {
          question: 'A cliente consegue marcar sozinha, sem falar comigo?',
          answer:
            'Sim. Pela IA no WhatsApp ou pelo link público de agendamento — nos dois casos ela escolhe serviço, dia e horário reais, e a agenda atualiza na hora.',
        },
        {
          question: 'Dá para separar mão, pé, alongamento e manutenção com tempos diferentes?',
          answer:
            'Dá. Cada serviço tem duração e preço próprios no catálogo, e a IA só oferece horários que cabem de verdade na agenda.',
        },
        {
          question: 'Quanto custa e como testo?',
          answer:
            'Os planos começam em R$ 49,90/mês. Conta grátis, configuração em minutos e teste antes de assinar — sem cartão de crédito.',
        },
      ],
      ctaTitle: 'Agenda cheia sem largar o atendimento para responder mensagem',
      primaryCta: 'Testar grátis',
      secondaryCta: 'Ver planos e preços',
      ctaNote: 'Grátis para testar · Configura em 3 minutos · Cancele quando quiser',
    },
    brows: {
      eyebrow: 'Horarius para sobrancelhas e cílios',
      title: 'Sistema para studio de sobrancelhas e cílios',
      titleAccent: 'com IA que chama a cliente na hora da manutenção.',
      subtitle:
        'Extensão pede retorno em poucas semanas, design em outras — quem controla isso de cabeça perde faturamento. O Horarius agenda o retorno na janela certa e ainda atende o WhatsApp por você.',
      painsTitle: 'Se o seu studio vive isso, é aqui que resolve',
      pains: [
        'Cliente que some e volta só quando lembra',
        'Manutenção marcada tarde demais, com o trabalho já perdido',
        'WhatsApp cheio de pergunta de preço no meio da aplicação',
        'Falta em serviço longo que derruba o dia',
      ],
      featuresTitle: 'O que o Horarius faz pelo seu studio',
      features: [
        {
          title: 'IA que responde preço e agenda no WhatsApp',
          description:
            'No número oficial do studio, a IA tira dúvida de valor, mostra os horários livres e fecha o agendamento — com os serviços e as durações do seu catálogo.',
        },
        {
          title: 'Retorno de manutenção na janela certa',
          description:
            'As campanhas de retorno chamam a cliente no intervalo que você definir para cada serviço, em vez de esperar ela lembrar sozinha.',
        },
        {
          title: 'Lembretes e controle de faltas',
          description:
            'Confirmação e lembrete automáticos para cada sessão, com histórico de faltas por cliente — serviço longo não pode cair sem aviso.',
        },
        {
          title: 'Planos recorrentes para a cliente fixa',
          description:
            'A manutenção vira plano recorrente, e a lista de espera preenche na hora o horário de quem desmarcou.',
        },
      ],
      faqTitle: 'Perguntas de quem tem studio de sobrancelhas e cílios',
      faq: [
        {
          question: 'Dá para agendar design e extensão com durações diferentes?',
          answer:
            'Dá. Cada serviço tem duração e preço próprios, e a IA só oferece horários que cabem na agenda — inclusive as sessões mais longas.',
        },
        {
          question: 'Como o sistema sabe a hora de chamar para manutenção?',
          answer:
            'Pelo histórico da cliente: as campanhas de retorno usam o tempo desde a última sessão para convidar no intervalo que você configurar.',
        },
        {
          question: 'Quanto custa e como testo?',
          answer:
            'Os planos começam em R$ 49,90/mês. Conta grátis, configuração em minutos e teste antes de assinar — sem cartão de crédito.',
        },
      ],
      ctaTitle: 'Manutenção agendada sozinha, agenda previsível',
      primaryCta: 'Testar grátis',
      secondaryCta: 'Ver planos e preços',
      ctaNote: 'Grátis para testar · Configura em 3 minutos · Cancele quando quiser',
    },
    massage: {
      eyebrow: 'Horarius para massagem e terapias',
      title: 'Sistema para massoterapia e terapias',
      titleAccent: 'com IA que agenda enquanto você está em sessão.',
      subtitle:
        'Sessão de uma hora não pode cair sem aviso, e não dá para atender o celular no meio dela. A IA responde, confirma e preenche o horário vago sem interromper o atendimento.',
      painsTitle: 'Se o seu espaço vive isso, é aqui que resolve',
      pains: [
        'Celular tocando no meio da sessão',
        'Falta em horário longo que não tem como repor',
        'Pacote de sessões controlado no caderno',
        'Cliente que fez uma vez e não voltou',
      ],
      featuresTitle: 'O que o Horarius faz pelo seu espaço',
      features: [
        {
          title: 'IA atendendo enquanto você está em sessão',
          description:
            'A IA responde no número oficial do seu espaço, mostra os horários livres e fecha o agendamento. Você retoma a conversa depois, do ponto em que ela parou.',
        },
        {
          title: 'Confirmação antecipada para sessão longa',
          description:
            'Confirmação e lembrete automáticos com antecedência, e controle de faltas por cliente — o horário de uma hora não fica vago sem aviso.',
        },
        {
          title: 'Lista de espera para o horário que vagou',
          description:
            'Desmarcou? A vaga é oferecida na hora para quem está na fila, e a compressão de agenda junta os buracos entre sessões.',
        },
        {
          title: 'Pacotes e sessões recorrentes',
          description:
            'Planos recorrentes acompanham quem faz sessões seguidas, com campanhas para trazer de volta quem parou no meio.',
        },
      ],
      faqTitle: 'Perguntas de quem trabalha com massagem e terapias',
      faq: [
        {
          question: 'Funciona para sessões de uma hora ou mais?',
          answer:
            'Funciona. Cada serviço tem a própria duração no catálogo, e a IA só oferece horários que comportam a sessão inteira.',
        },
        {
          question: 'Dá para controlar pacote de várias sessões?',
          answer:
            'Dá. Os planos recorrentes acompanham quem fecha um pacote, e as campanhas de retorno avisam quem parou no meio do acompanhamento.',
        },
        {
          question: 'Quanto custa e como testo?',
          answer:
            'Os planos começam em R$ 49,90/mês. Conta grátis, configuração em minutos e teste antes de assinar — sem cartão de crédito.',
        },
      ],
      ctaTitle: 'Sessão sem interrupção, agenda sem buraco',
      primaryCta: 'Testar grátis',
      secondaryCta: 'Ver planos e preços',
      ctaNote: 'Grátis para testar · Configura em 3 minutos · Cancele quando quiser',
    },
  },
  en: {
    barbershops: {
      eyebrow: 'Horarius for barbershops',
      title: 'Barbershop booking software',
      titleAccent: 'with an AI that answers your WhatsApp while you cut.',
      subtitle:
        'Clients book their own haircut, the AI replies instantly — even on Sunday night — and the chair does not sit empty when someone cancels.',
      painsTitle: 'If your barbershop lives this, this is where it ends',
      pains: [
        'Answering WhatsApp mid-haircut',
        'Clients who book and never show up',
        'A cancellation that leaves the chair empty all day',
        'Schedules kept in a notebook or loose spreadsheet',
      ],
      featuresTitle: 'What Horarius does for your barbershop',
      features: [
        {
          title: 'AI answering on your shop’s own number',
          description:
            'Through the official WhatsApp API, on the number your clients already have saved: it quotes prices, shows open slots, books and reschedules. When it needs you, take over the conversation where it stopped.',
        },
        {
          title: 'Reminders that cut no-shows',
          description:
            'Automatic confirmation, a reminder near the time and per-client no-show tracking — repeat offenders get treated differently.',
        },
        {
          title: 'Cancelled? The waitlist fills the gap',
          description:
            'The waitlist offers the freed slot to whoever was waiting for it, and schedule compression closes the gaps so the day fits more cuts.',
        },
        {
          title: 'A booking link for your Instagram bio',
          description:
            'Your public link open 24/7: clients pick barber, service and time without messaging you. Everything synced with Google Calendar.',
        },
      ],
      faqTitle: 'Questions barbershop owners ask',
      faq: [
        {
          question: 'Does it work on the WhatsApp number my shop already uses?',
          answer:
            'Yes. Horarius uses the official WhatsApp Business API (Meta) on your own number — no QR code, no ban risk, no phone that needs to stay on.',
        },
        {
          question: 'What if a client wants to talk to a real barber?',
          answer:
            'The AI hands the conversation over to a human whenever you want — you pick up exactly where it stopped, and the client never repeats themselves.',
        },
        {
          question: 'How much does it cost and how do I try it?',
          answer:
            'Plans start at R$ 110/month. Create a free account, set up services and staff in minutes and test the calendar and the AI before subscribing — no credit card.',
        },
      ],
      ctaTitle: 'Let WhatsApp work while you cut',
      primaryCta: 'Try it free',
      secondaryCta: 'See plans and pricing',
      ctaNote: 'Free to try · Set up in 3 minutes · Cancel anytime',
    },
    salons: {
      eyebrow: 'Horarius for beauty salons',
      title: 'Salon booking software',
      titleAccent: 'with an AI that books, confirms and wins clients back.',
      subtitle:
        'Several professionals, services with different durations and a flooded WhatsApp — Horarius organizes all of it and even calls back the clients who vanished.',
      painsTitle: 'If your salon lives this, this is where it ends',
      pains: [
        'WhatsApp exploding while everyone is with a client',
        'Fitting color, blowout and nails without overlapping',
        'Loyal clients drifting away with nobody noticing',
        'Each professional’s schedule in a different notebook',
      ],
      featuresTitle: 'What Horarius does for your salon',
      features: [
        {
          title: 'An AI front desk on your salon’s WhatsApp',
          description:
            'Answers 24/7 on your official number: quotes prices, offers slots per professional and closes the booking. Your team takes over whenever a conversation needs a human.',
        },
        {
          title: 'Per-professional calendars, zero conflicts',
          description:
            'Different durations, blocks and squeeze-ins on one schedule — each professional sees their day, you see the whole salon, all synced with Google Calendar.',
        },
        {
          title: 'Campaigns that bring clients back',
          description:
            'Horarius spots who stopped coming and invites them back on WhatsApp. Recurring plans turn occasional visitors into monthly regulars.',
        },
        {
          title: 'Confirmations that protect the day',
          description:
            'Automatic confirmation and reminders before every slot, painless rescheduling and a waitlist to fill last-minute cancellations.',
        },
      ],
      faqTitle: 'Questions salon owners ask',
      faq: [
        {
          question: 'Does it handle several professionals and different services?',
          answer:
            'Yes. Each professional has their own calendar, services, durations and working hours — and the AI respects all of it when offering slots.',
        },
        {
          question: 'Does the AI know each service’s price and duration?',
          answer:
            'It does. It answers from your real service catalog: price, duration and who performs it. Update the panel and the AI quotes the new price immediately.',
        },
        {
          question: 'How much does it cost and how do I try it?',
          answer:
            'Plans start at R$ 110/month. The account is free to create, onboarding takes about 3 minutes and you test the calendar and the AI before subscribing — no credit card.',
        },
      ],
      ctaTitle: 'A full salon and a quiet WhatsApp',
      primaryCta: 'Try it free',
      secondaryCta: 'See plans and pricing',
      ctaNote: 'Free to try · Set up in 3 minutes · Cancel anytime',
    },
    aesthetics: {
      eyebrow: 'Horarius for aesthetic clinics',
      title: 'Aesthetic clinic booking software',
      titleAccent: 'with an AI that books sessions and secures the return.',
      subtitle:
        'A missed session is direct loss. Horarius confirms every appointment, fills cancellations and reminds clients to come back at the right time.',
      painsTitle: 'If your clinic lives this, this is where it ends',
      pains: [
        'A no-show that locked the room for an hour',
        'Sold packages clients forget to continue',
        'Schedules split between front desk and professionals',
        'WhatsApp answered only when the front desk is free',
      ],
      featuresTitle: 'What Horarius does for your clinic',
      features: [
        {
          title: 'Sessions booked by the AI',
          description:
            'Clients book evaluations or sessions right on the clinic’s official WhatsApp, with real slots per professional — the front desk only steps in when needed.',
        },
        {
          title: 'Confirmations that reduce no-shows',
          description:
            'Automatic confirmation and reminders before each session, with per-client no-show tracking. A cancellation? The waitlist offers the slot to another client instantly.',
        },
        {
          title: 'Post-procedure follow-up on time',
          description:
            'An automatic message after the visit to collect feedback and pull the next booking — clients return before the habit cools off.',
        },
        {
          title: 'Recurring plans for packages',
          description:
            'Packages and recurring plans inside the system, so clients keep their session cycle on track without the front desk chasing anyone.',
        },
      ],
      faqTitle: 'Questions clinic owners ask',
      faq: [
        {
          question: 'Can I keep separate calendars per professional?',
          answer:
            'Each professional has their own calendar, services and working hours, with blocks and time off — the AI only offers slots that actually exist.',
        },
        {
          question: 'Can the AI handle questions about procedures?',
          answer:
            'It answers from your service catalog (price, duration, professional). Clinical or sensitive questions are handed to your team with the full conversation history.',
        },
        {
          question: 'How much does it cost and how do I try it?',
          answer:
            'Plans start at R$ 110/month. Free account, minutes to set up, and you test the calendar and the AI before subscribing — no credit card.',
        },
      ],
      ctaTitle: 'Confirmed sessions, busy rooms, returning clients',
      primaryCta: 'Try it free',
      secondaryCta: 'See plans and pricing',
      ctaNote: 'Free to try · Set up in 3 minutes · Cancel anytime',
    },
    pets: {
      eyebrow: 'Horarius for pet shops',
      title: 'Pet shop and grooming software',
      titleAccent: 'with an AI that books baths while your team grooms.',
      subtitle:
        'Pet parents ask prices, want a Saturday squeeze-in and forget appointments — the AI solves all three on WhatsApp, and nobody drops the clippers to reply.',
      painsTitle: 'If your pet shop lives this, this is where it ends',
      pains: [
        'Phone and WhatsApp ringing during baths',
        'Pet parents who forget and never show',
        'Packed Saturdays and a week full of gaps',
        'The biweekly bath routine slipping away',
      ],
      featuresTitle: 'What Horarius does for your pet shop',
      features: [
        {
          title: 'AI booking baths and grooming on WhatsApp',
          description:
            'Pet parents book on their own, on your shop’s official number: service, day and time with your real catalog prices. Your team joins only when a human is needed.',
        },
        {
          title: 'Reminders that save lost baths',
          description:
            'Automatic confirmation and reminders for every slot, per-client no-show tracking — and easy rescheduling when plans change.',
        },
        {
          title: 'A waitlist that fills the week',
          description:
            'A cancelled Saturday slot is offered to the next pet parent immediately, and schedule compression closes the gaps between baths.',
        },
        {
          title: 'Recurrence for the usual bath',
          description:
            'Recurring plans for weekly or biweekly baths and win-back campaigns for pet parents who vanished — the calendar moves on its own.',
        },
      ],
      faqTitle: 'Questions pet shop owners ask',
      faq: [
        {
          question: 'Can pet parents book without talking to anyone?',
          answer:
            'Yes. Through the WhatsApp AI or the public booking link — either way they pick real services, days and times, and the calendar updates instantly.',
        },
        {
          question: 'Does it work for baths, grooming and services with different durations?',
          answer:
            'It does. Each service has its own duration and price in the catalog, and the AI uses that to offer slots that genuinely fit the schedule.',
        },
        {
          question: 'How much does it cost and how do I try it?',
          answer:
            'Plans start at R$ 110/month. Free account, minutes to set up, and you test before subscribing — no credit card.',
        },
      ],
      ctaTitle: 'A calendar full of booked baths, a team focused on pets',
      primaryCta: 'Try it free',
      secondaryCta: 'See plans and pricing',
      ctaNote: 'Free to try · Set up in 3 minutes · Cancel anytime',
    },
    nails: {
      eyebrow: 'Horarius for nail salons',
      title: 'Nail salon software',
      titleAccent: 'with AI answering WhatsApp while you do the nails.',
      subtitle:
        'Short services, a choppy schedule and clients messaging mid-appointment — the AI answers, fits them in and confirms without you putting the file down.',
      painsTitle: 'If your nail salon runs like this, this is where it gets fixed',
      pains: [
        'WhatsApp buzzing in the middle of a manicure',
        'A forty-minute hole between one client and the next',
        'Clients who disappeared and never booked again',
        'A packed Saturday and a week with slots to spare',
      ],
      featuresTitle: 'What Horarius does for your nail salon',
      features: [
        {
          title: 'AI booking on your own WhatsApp number',
          description:
            'Clients pick service, day and time on their own, on the salon official number and with the prices from your catalogue. You step in only when the conversation needs a person.',
        },
        {
          title: 'Automatic fill-ins between short services',
          description:
            'Schedule compression closes the gaps in the day and the waitlist offers the free slot to the next client right away — nobody rebooks by hand.',
        },
        {
          title: 'Reminders that cut no-shows',
          description:
            'Automatic confirmation and reminder for every slot, with no-show history per client and easy rescheduling when plans change.',
        },
        {
          title: 'Recurrence for the weekly regulars',
          description:
            'Recurring plans for weekly or fortnightly maintenance, and win-back campaigns for whoever stopped showing up.',
        },
      ],
      faqTitle: 'Questions from nail salon owners',
      faq: [
        {
          question: 'Can clients book on their own, without talking to me?',
          answer:
            'Yes. Through the WhatsApp AI or the public booking link — either way they pick a real service, day and time, and the calendar updates immediately.',
        },
        {
          question: 'Can I separate hands, feet, extensions and maintenance with different durations?',
          answer:
            'You can. Every service has its own duration and price in the catalogue, and the AI only offers slots that genuinely fit the schedule.',
        },
        {
          question: 'How much does it cost and how do I try it?',
          answer:
            'Plans start at R$ 49.90/month. Free account, minutes to set up, and you test before subscribing — no credit card.',
        },
      ],
      ctaTitle: 'A full schedule without dropping the appointment to reply',
      primaryCta: 'Try it free',
      secondaryCta: 'See plans and pricing',
      ctaNote: 'Free to try · Set up in 3 minutes · Cancel anytime',
    },
    brows: {
      eyebrow: 'Horarius for brows and lashes',
      title: 'Brow and lash studio software',
      titleAccent: 'with AI that calls the client back at touch-up time.',
      subtitle:
        'Extensions need a return in a few weeks, shaping in a few more — keeping that in your head costs revenue. Horarius books the return in the right window and answers WhatsApp for you.',
      painsTitle: 'If your studio runs like this, this is where it gets fixed',
      pains: [
        'Clients who vanish and come back only when they remember',
        'Touch-ups booked too late, with the work already lost',
        'WhatsApp full of price questions mid-application',
        'A no-show on a long service that wrecks the day',
      ],
      featuresTitle: 'What Horarius does for your studio',
      features: [
        {
          title: 'AI that quotes prices and books on WhatsApp',
          description:
            'On the studio official number, the AI answers price questions, shows the open slots and closes the booking — with the services and durations from your catalogue.',
        },
        {
          title: 'Touch-ups booked in the right window',
          description:
            'Win-back campaigns reach the client at the interval you set for each service, instead of waiting for her to remember on her own.',
        },
        {
          title: 'Reminders and no-show control',
          description:
            'Automatic confirmation and reminder for every session, with no-show history per client — a long service should not fall through without warning.',
        },
        {
          title: 'Recurring plans for the regulars',
          description:
            'Maintenance becomes a recurring plan, and the waitlist immediately fills the slot someone cancelled.',
        },
      ],
      faqTitle: 'Questions from brow and lash studio owners',
      faq: [
        {
          question: 'Can I book shaping and extensions with different durations?',
          answer:
            'You can. Every service has its own duration and price, and the AI only offers slots that fit the schedule — including the longer sessions.',
        },
        {
          question: 'How does the system know when to invite someone for a touch-up?',
          answer:
            'From the client history: win-back campaigns use the time since the last session to invite at the interval you configure.',
        },
        {
          question: 'How much does it cost and how do I try it?',
          answer:
            'Plans start at R$ 49.90/month. Free account, minutes to set up, and you test before subscribing — no credit card.',
        },
      ],
      ctaTitle: 'Touch-ups that book themselves, a predictable schedule',
      primaryCta: 'Try it free',
      secondaryCta: 'See plans and pricing',
      ctaNote: 'Free to try · Set up in 3 minutes · Cancel anytime',
    },
    massage: {
      eyebrow: 'Horarius for massage and therapies',
      title: 'Massage therapy software',
      titleAccent: 'with AI that books while you are in session.',
      subtitle:
        'An hour-long session cannot fall through without warning, and you cannot take the phone in the middle of it. The AI answers, confirms and fills the empty slot without interrupting the treatment.',
      painsTitle: 'If your practice runs like this, this is where it gets fixed',
      pains: [
        'The phone ringing in the middle of a session',
        'A no-show on a long slot with no way to refill it',
        'Session packages tracked in a notebook',
        'Clients who came once and never returned',
      ],
      featuresTitle: 'What Horarius does for your practice',
      features: [
        {
          title: 'AI answering while you are in session',
          description:
            'The AI replies on your practice official number, shows the open slots and closes the booking. You pick the conversation up later, from where it stopped.',
        },
        {
          title: 'Early confirmation for long sessions',
          description:
            'Automatic confirmation and reminder well in advance, with no-show history per client — an hour-long slot should not go empty unannounced.',
        },
        {
          title: 'A waitlist for the slot that opened up',
          description:
            'Someone cancelled? The slot goes straight to whoever is in the queue, and schedule compression closes the gaps between sessions.',
        },
        {
          title: 'Packages and recurring sessions',
          description:
            'Recurring plans follow clients doing a series of sessions, with campaigns to bring back whoever stopped halfway.',
        },
      ],
      faqTitle: 'Questions from massage and therapy professionals',
      faq: [
        {
          question: 'Does it work for sessions of an hour or more?',
          answer:
            'It does. Every service carries its own duration in the catalogue, and the AI only offers slots that fit the whole session.',
        },
        {
          question: 'Can I track a package of several sessions?',
          answer:
            'You can. Recurring plans follow whoever buys a package, and win-back campaigns flag anyone who stopped midway through.',
        },
        {
          question: 'How much does it cost and how do I try it?',
          answer:
            'Plans start at R$ 49.90/month. Free account, minutes to set up, and you test before subscribing — no credit card.',
        },
      ],
      ctaTitle: 'Sessions without interruption, a schedule without gaps',
      primaryCta: 'Try it free',
      secondaryCta: 'See plans and pricing',
      ctaNote: 'Free to try · Set up in 3 minutes · Cancel anytime',
    },
  },
  es: {
    barbershops: {
      eyebrow: 'Horarius para barberías',
      title: 'Software para barberías',
      titleAccent: 'con IA que atiende tu WhatsApp mientras cortas.',
      subtitle:
        'El cliente agenda su corte solo, la IA responde al instante — incluso el domingo por la noche — y la silla no queda vacía cuando alguien cancela.',
      painsTitle: 'Si tu barbería vive esto, aquí se termina',
      pains: [
        'Responder WhatsApp en medio del corte',
        'Clientes que agendan y no aparecen',
        'Una cancelación que deja la silla vacía todo el día',
        'La agenda en un cuaderno o una planilla suelta',
      ],
      featuresTitle: 'Qué hace Horarius por tu barbería',
      features: [
        {
          title: 'IA atendiendo en el número de tu barbería',
          description:
            'Por la API oficial de WhatsApp, en el número que tus clientes ya tienen guardado: responde precios, muestra horarios libres, agenda y reprograma. Cuando te necesita, tomas la conversación donde quedó.',
        },
        {
          title: 'Recordatorios que reducen ausencias',
          description:
            'Confirmación automática, recordatorio cerca del horario y control de ausencias por cliente — quien suele fallar recibe otro trato.',
        },
        {
          title: '¿Canceló? La lista de espera cubre el hueco',
          description:
            'La lista de espera ofrece el horario liberado a quien lo estaba esperando, y la compresión de agenda junta los huecos para que quepan más cortes.',
        },
        {
          title: 'Link de reservas para la bio de Instagram',
          description:
            'Tu link público abierto 24 h: el cliente elige barbero, servicio y horario sin escribirte. Todo sincronizado con Google Calendar.',
        },
      ],
      faqTitle: 'Preguntas de quien tiene barbería',
      faq: [
        {
          question: '¿Funciona en el número de WhatsApp que ya uso?',
          answer:
            'Sí. Horarius usa la API oficial de WhatsApp Business (Meta) en tu propio número — sin QR, sin riesgo de bloqueo y sin celular que deba quedar encendido.',
        },
        {
          question: '¿Y si el cliente quiere hablar con el barbero?',
          answer:
            'La IA transfiere la conversación a atención humana cuando quieras — la retomas exactamente donde quedó, sin que el cliente repita nada.',
        },
        {
          question: '¿Cuánto cuesta y cómo lo pruebo?',
          answer:
            'Los planes empiezan en R$ 110/mes. Creas la cuenta gratis, configuras servicios y equipo en minutos y pruebas la agenda y la IA antes de suscribirte — sin tarjeta.',
        },
      ],
      ctaTitle: 'Deja que WhatsApp trabaje mientras cortas',
      primaryCta: 'Probar gratis',
      secondaryCta: 'Ver planes y precios',
      ctaNote: 'Gratis para probar · Se configura en 3 minutos · Cancela cuando quieras',
    },
    salons: {
      eyebrow: 'Horarius para salones de belleza',
      title: 'Software para salones de belleza',
      titleAccent: 'con IA que agenda, confirma y recupera clientas.',
      subtitle:
        'Varias profesionales, servicios con duraciones distintas y el WhatsApp lleno — Horarius organiza todo eso y además llama de vuelta a quien desapareció.',
      painsTitle: 'Si tu salón vive esto, aquí se termina',
      pains: [
        'WhatsApp estallando mientras todas atienden',
        'Encajar color, brushing y uñas sin chocar horarios',
        'Clientas fieles que se van alejando sin que nadie lo note',
        'La agenda de cada profesional en un cuaderno distinto',
      ],
      featuresTitle: 'Qué hace Horarius por tu salón',
      features: [
        {
          title: 'Recepción de IA en el WhatsApp del salón',
          description:
            'Atiende 24 h en tu número oficial: informa precios, ofrece horarios por profesional y cierra la reserva. Tu equipo toma la conversación cuando hace falta.',
        },
        {
          title: 'Agenda por profesional, sin conflictos',
          description:
            'Duraciones distintas, bloqueos y encajes en una sola agenda — cada profesional ve su día, tú ves el salón entero, todo también en Google Calendar.',
        },
        {
          title: 'Campañas que traen clientas de vuelta',
          description:
            'Horarius detecta quién dejó de venir y la invita de vuelta por WhatsApp. Los planes recurrentes convierten visitas ocasionales en presencia fija del mes.',
        },
        {
          title: 'Confirmaciones que protegen el día',
          description:
            'Confirmación y recordatorios automáticos antes de cada horario, reprogramación sin drama y lista de espera para cubrir cancelaciones de último minuto.',
        },
      ],
      faqTitle: 'Preguntas de quien tiene salón',
      faq: [
        {
          question: '¿Maneja varias profesionales y servicios distintos?',
          answer:
            'Sí. Cada profesional tiene su propia agenda, servicios, duraciones y horarios de trabajo — y la IA respeta todo eso al ofrecer horarios.',
        },
        {
          question: '¿La IA sabe el precio y la duración de cada servicio?',
          answer:
            'Sí. Responde con tu catálogo real de servicios: precio, duración y quién lo realiza. Actualizas el panel y la IA cotiza el valor nuevo al instante.',
        },
        {
          question: '¿Cuánto cuesta y cómo lo pruebo?',
          answer:
            'Los planes empiezan en R$ 110/mes. La cuenta es gratis, el onboarding toma unos 3 minutos y pruebas la agenda y la IA antes de suscribirte — sin tarjeta.',
        },
      ],
      ctaTitle: 'Tu salón lleno, tu WhatsApp en paz',
      primaryCta: 'Probar gratis',
      secondaryCta: 'Ver planes y precios',
      ctaNote: 'Gratis para probar · Se configura en 3 minutos · Cancela cuando quieras',
    },
    aesthetics: {
      eyebrow: 'Horarius para clínicas de estética',
      title: 'Software para clínicas de estética',
      titleAccent: 'con IA que agenda sesiones y asegura el regreso.',
      subtitle:
        'Una sesión perdida es pérdida directa. Horarius confirma cada horario, cubre cancelaciones y recuerda a la clienta volver en el momento justo.',
      painsTitle: 'Si tu clínica vive esto, aquí se termina',
      pains: [
        'Una ausencia que bloqueó la sala por una hora',
        'Paquetes vendidos que la clienta olvida continuar',
        'La agenda dividida entre recepción y profesionales',
        'WhatsApp respondido solo cuando la recepción se libera',
      ],
      featuresTitle: 'Qué hace Horarius por tu clínica',
      features: [
        {
          title: 'Sesiones agendadas por la IA',
          description:
            'La clienta agenda evaluación o sesión directo en el WhatsApp oficial de la clínica, con horarios reales por profesional — la recepción solo entra cuando hace falta.',
        },
        {
          title: 'Confirmaciones que reducen ausencias',
          description:
            'Confirmación y recordatorios automáticos antes de cada sesión, con control de ausencias por clienta. ¿Canceló? La lista de espera ofrece el horario a otra clienta al instante.',
        },
        {
          title: 'Seguimiento post-procedimiento a tiempo',
          description:
            'Mensaje automático después de la visita para recoger feedback e impulsar la próxima reserva — la clienta vuelve antes de enfriarse.',
        },
        {
          title: 'Planes recurrentes para paquetes',
          description:
            'Paquetes y planes con recurrencia dentro del sistema, para que la clienta mantenga su ciclo de sesiones al día sin que la recepción persiga a nadie.',
        },
      ],
      faqTitle: 'Preguntas de quien tiene clínica',
      faq: [
        {
          question: '¿Puedo tener agendas separadas por profesional?',
          answer:
            'Cada profesional tiene agenda, servicios y horarios propios, con bloqueos e indisponibilidades — la IA solo ofrece horarios que realmente existen.',
        },
        {
          question: '¿La IA responde preguntas sobre procedimientos?',
          answer:
            'Responde con tu catálogo de servicios (precio, duración, profesional). Las preguntas clínicas o delicadas las transfiere a tu equipo con todo el historial.',
        },
        {
          question: '¿Cuánto cuesta y cómo lo pruebo?',
          answer:
            'Los planes empiezan en R$ 110/mes. Cuenta gratis, configuración en minutos y prueba antes de suscribirte — sin tarjeta.',
        },
      ],
      ctaTitle: 'Sesiones confirmadas, salas ocupadas, clientas que vuelven',
      primaryCta: 'Probar gratis',
      secondaryCta: 'Ver planes y precios',
      ctaNote: 'Gratis para probar · Se configura en 3 minutos · Cancela cuando quieras',
    },
    pets: {
      eyebrow: 'Horarius para pet shops',
      title: 'Software para pet shops y peluquería canina',
      titleAccent: 'con IA que agenda baños mientras tu equipo trabaja.',
      subtitle:
        'El tutor pregunta precios, quiere un hueco el sábado y olvida el horario — la IA resuelve las tres cosas por WhatsApp, sin que nadie suelte la máquina para responder.',
      painsTitle: 'Si tu pet shop vive esto, aquí se termina',
      pains: [
        'Teléfono y WhatsApp sonando durante el baño',
        'Tutores que olvidan el horario y no aparecen',
        'Sábado lleno y semana con huecos',
        'La rutina del baño quincenal que se pierde',
      ],
      featuresTitle: 'Qué hace Horarius por tu pet shop',
      features: [
        {
          title: 'IA agendando baño y peluquería por WhatsApp',
          description:
            'El tutor agenda solo, en el número oficial de tu negocio: servicio, día y horario con los precios de tu catálogo. Tu equipo entra solo cuando hace falta una persona.',
        },
        {
          title: 'Recordatorios que salvan baños perdidos',
          description:
            'Confirmación y recordatorios automáticos para cada horario, control de ausencias por tutor — y reprogramación fácil cuando cambian los planes.',
        },
        {
          title: 'Lista de espera para llenar la semana',
          description:
            'Un sábado cancelado se ofrece al siguiente tutor al instante, y la compresión de agenda junta los huecos entre baños.',
        },
        {
          title: 'Recurrencia para el baño de siempre',
          description:
            'Planes recurrentes para baños semanales o quincenales y campañas para recuperar al tutor que desapareció — la agenda avanza sola.',
        },
      ],
      faqTitle: 'Preguntas de quien tiene pet shop',
      faq: [
        {
          question: '¿El tutor puede reservar sin hablar con nadie?',
          answer:
            'Sí. Por la IA en WhatsApp o por el link público de reservas — en ambos casos elige servicios, días y horarios reales, y la agenda se actualiza al instante.',
        },
        {
          question: '¿Sirve para baño, peluquería y servicios con tiempos distintos?',
          answer:
            'Sí. Cada servicio tiene su duración y precio en el catálogo, y la IA usa eso para ofrecer horarios que de verdad caben en la agenda.',
        },
        {
          question: '¿Cuánto cuesta y cómo lo pruebo?',
          answer:
            'Los planes empiezan en R$ 110/mes. Cuenta gratis, configuración en minutos y prueba antes de suscribirte — sin tarjeta.',
        },
      ],
      ctaTitle: 'Agenda llena de baños, equipo enfocado en las mascotas',
      primaryCta: 'Probar gratis',
      secondaryCta: 'Ver planes y precios',
      ctaNote: 'Gratis para probar · Se configura en 3 minutos · Cancela cuando quieras',
    },
    nails: {
      eyebrow: 'Horarius para esmalterías',
      title: 'Software para esmaltería',
      titleAccent: 'con IA que atiende WhatsApp mientras haces las uñas.',
      subtitle:
        'Servicios cortos, agenda picada y clientas escribiendo en medio del turno — la IA responde, encaja y confirma sin que sueltes la lima.',
      painsTitle: 'Si tu esmaltería vive esto, aquí se resuelve',
      pains: [
        'WhatsApp sonando en medio del esmalte',
        'Un hueco de cuarenta minutos entre una clienta y otra',
        'Clientas que desaparecieron y no volvieron a reservar',
        'Sábado lleno y semana con horarios de sobra',
      ],
      featuresTitle: 'Qué hace Horarius por tu esmaltería',
      features: [
        {
          title: 'IA reservando en tu propio WhatsApp',
          description:
            'La clienta elige servicio, día y horario sola, en el número oficial de la esmaltería y con los precios de tu catálogo. Tú entras solo cuando la conversación necesita a una persona.',
        },
        {
          title: 'Encaje automático entre servicios cortos',
          description:
            'La compresión de agenda junta los huecos del día y la lista de espera ofrece el horario libre a la siguiente clienta al instante — sin reprogramar a mano.',
        },
        {
          title: 'Recordatorios que reducen ausencias',
          description:
            'Confirmación y recordatorio automáticos para cada turno, con historial de ausencias por clienta y reprogramación fácil cuando cambia el plan.',
        },
        {
          title: 'Recurrencia de quien viene cada semana',
          description:
            'Planes recurrentes para mantenimiento semanal o quincenal y campañas para recuperar a quien dejó de venir.',
        },
      ],
      faqTitle: 'Preguntas de quien tiene esmaltería',
      faq: [
        {
          question: '¿La clienta puede reservar sola, sin hablar conmigo?',
          answer:
            'Sí. Por la IA en WhatsApp o por el enlace público de reservas — en ambos casos elige servicio, día y horario reales, y la agenda se actualiza al instante.',
        },
        {
          question: '¿Puedo separar manos, pies, extensiones y mantenimiento con tiempos distintos?',
          answer:
            'Sí. Cada servicio tiene su propia duración y precio en el catálogo, y la IA solo ofrece horarios que caben de verdad en la agenda.',
        },
        {
          question: '¿Cuánto cuesta y cómo lo pruebo?',
          answer:
            'Los planes empiezan en R$ 49,90/mes. Cuenta gratis, configuración en minutos y prueba antes de suscribirte — sin tarjeta.',
        },
      ],
      ctaTitle: 'Agenda llena sin soltar el turno para responder mensajes',
      primaryCta: 'Probar gratis',
      secondaryCta: 'Ver planes y precios',
      ctaNote: 'Gratis para probar · Se configura en 3 minutos · Cancela cuando quieras',
    },
    brows: {
      eyebrow: 'Horarius para cejas y pestañas',
      title: 'Software para studio de cejas y pestañas',
      titleAccent: 'con IA que llama a la clienta a la hora del retoque.',
      subtitle:
        'Las extensiones piden retorno en pocas semanas, el diseño en otras — llevar eso de memoria cuesta facturación. Horarius agenda el regreso en la ventana correcta y además atiende WhatsApp por ti.',
      painsTitle: 'Si tu studio vive esto, aquí se resuelve',
      pains: [
        'Clientas que desaparecen y vuelven solo cuando se acuerdan',
        'Retoque agendado demasiado tarde, con el trabajo ya perdido',
        'WhatsApp lleno de preguntas de precio en plena aplicación',
        'Una ausencia en un servicio largo que arruina el día',
      ],
      featuresTitle: 'Qué hace Horarius por tu studio',
      features: [
        {
          title: 'IA que responde precios y reserva en WhatsApp',
          description:
            'En el número oficial del studio, la IA responde dudas de precio, muestra los horarios libres y cierra la reserva — con los servicios y las duraciones de tu catálogo.',
        },
        {
          title: 'Retoque agendado en la ventana correcta',
          description:
            'Las campañas de retorno contactan a la clienta en el intervalo que definas para cada servicio, en vez de esperar a que se acuerde sola.',
        },
        {
          title: 'Recordatorios y control de ausencias',
          description:
            'Confirmación y recordatorio automáticos para cada sesión, con historial de ausencias por clienta — un servicio largo no puede caerse sin aviso.',
        },
        {
          title: 'Planes recurrentes para la clienta fija',
          description:
            'El mantenimiento se vuelve plan recurrente, y la lista de espera llena al instante el horario de quien canceló.',
        },
      ],
      faqTitle: 'Preguntas de quien tiene studio de cejas y pestañas',
      faq: [
        {
          question: '¿Puedo agendar diseño y extensión con duraciones distintas?',
          answer:
            'Sí. Cada servicio tiene su propia duración y precio, y la IA solo ofrece horarios que caben en la agenda — incluidas las sesiones más largas.',
        },
        {
          question: '¿Cómo sabe el sistema cuándo invitar al retoque?',
          answer:
            'Por el historial de la clienta: las campañas de retorno usan el tiempo desde la última sesión para invitar en el intervalo que configures.',
        },
        {
          question: '¿Cuánto cuesta y cómo lo pruebo?',
          answer:
            'Los planes empiezan en R$ 49,90/mes. Cuenta gratis, configuración en minutos y prueba antes de suscribirte — sin tarjeta.',
        },
      ],
      ctaTitle: 'Retoques que se agendan solos, agenda previsible',
      primaryCta: 'Probar gratis',
      secondaryCta: 'Ver planes y precios',
      ctaNote: 'Gratis para probar · Se configura en 3 minutos · Cancela cuando quieras',
    },
    massage: {
      eyebrow: 'Horarius para masajes y terapias',
      title: 'Software para masoterapia y terapias',
      titleAccent: 'con IA que agenda mientras estás en sesión.',
      subtitle:
        'Una sesión de una hora no puede caerse sin aviso, y no puedes atender el celular en medio de ella. La IA responde, confirma y llena el horario libre sin interrumpir la atención.',
      painsTitle: 'Si tu espacio vive esto, aquí se resuelve',
      pains: [
        'El celular sonando en medio de la sesión',
        'Una ausencia en un horario largo que no hay cómo reponer',
        'Paquetes de sesiones controlados en un cuaderno',
        'Clientes que vinieron una vez y no volvieron',
      ],
      featuresTitle: 'Qué hace Horarius por tu espacio',
      features: [
        {
          title: 'IA atendiendo mientras estás en sesión',
          description:
            'La IA responde en el número oficial de tu espacio, muestra los horarios libres y cierra la reserva. Retomas la conversación después, desde donde quedó.',
        },
        {
          title: 'Confirmación anticipada para sesiones largas',
          description:
            'Confirmación y recordatorio automáticos con antelación, y control de ausencias por cliente — un horario de una hora no queda vacío sin aviso.',
        },
        {
          title: 'Lista de espera para el horario que se liberó',
          description:
            '¿Canceló? El horario se ofrece al instante a quien está en la fila, y la compresión de agenda junta los huecos entre sesiones.',
        },
        {
          title: 'Paquetes y sesiones recurrentes',
          description:
            'Los planes recurrentes acompañan a quien hace sesiones seguidas, con campañas para recuperar a quien se detuvo a mitad de camino.',
        },
      ],
      faqTitle: 'Preguntas de quien trabaja con masajes y terapias',
      faq: [
        {
          question: '¿Funciona para sesiones de una hora o más?',
          answer:
            'Funciona. Cada servicio tiene su propia duración en el catálogo, y la IA solo ofrece horarios que admiten la sesión entera.',
        },
        {
          question: '¿Puedo controlar un paquete de varias sesiones?',
          answer:
            'Sí. Los planes recurrentes acompañan a quien contrata un paquete, y las campañas de retorno avisan de quien se detuvo a mitad del seguimiento.',
        },
        {
          question: '¿Cuánto cuesta y cómo lo pruebo?',
          answer:
            'Los planes empiezan en R$ 49,90/mes. Cuenta gratis, configuración en minutos y prueba antes de suscribirte — sin tarjeta.',
        },
      ],
      ctaTitle: 'Sesiones sin interrupción, agenda sin huecos',
      primaryCta: 'Probar gratis',
      secondaryCta: 'Ver planes y precios',
      ctaNote: 'Gratis para probar · Se configura en 3 minutos · Cancela cuando quieras',
    },
  },
};
