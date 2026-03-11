export type Language = 'pt' | 'en' | 'es';

type NavItem = {
  label: string;
  sectionId: string;
};

type Metric = {
  value: string;
  label: string;
};

type Benefit = {
  eyebrow: string;
  title: string;
  description: string;
};

type Step = {
  number: string;
  title: string;
  description: string;
};

type TimelineMessage = {
  role: 'client' | 'assistant';
  text: string;
};

type Segment = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type SummaryItem = {
  label: string;
  value: string;
};

type LegalSubsection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

type LegalContactField = {
  label: string;
  value: string;
  href?: string;
};

type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  subsections?: LegalSubsection[];
  contactEmail?: string;
  contactInfo?: LegalContactField[];
};

export type LegalDocumentContent = {
  eyebrow: string;
  title: string;
  appInfoTitle: string;
  appInfoDescription: string;
  lastUpdated: string;
  sections: LegalSection[];
};

type SiteContent = {
  header: {
    brandTag: string;
    navItems: NavItem[];
    ctaLabel: string;
    ctaCompactLabel: string;
    backLabel: string;
    backCompactLabel: string;
    languageAriaLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: Metric[];
    noticeLabel: string;
    noticeText: string;
    messages: TimelineMessage[];
    selectorTitle: string;
    selectorLabel: string;
    selectorHint: string;
    selectorOptions: string[];
    kickerValue: string;
    kickerText: string;
  };
  socialProof: {
    eyebrow: string;
    title: string;
    pills: string[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    description: string;
    items: Benefit[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Step[];
    exampleEyebrow: string;
    exampleTitle: string;
    status: string;
    messages: TimelineMessage[];
    summary: SummaryItem[];
  };
  segments: {
    eyebrow: string;
    title: string;
    description: string;
    items: Segment[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: FaqItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    navigationTitle: string;
    legalTitle: string;
    privacyLabel: string;
    termsLabel: string;
    whatsappLabel: string;
    bottomRight: string;
  };
  whatsappButton: {
    label: string;
    sublabel: string;
    ariaLabel: string;
  };
  privacy: LegalDocumentContent;
  terms: LegalDocumentContent;
};

export const defaultLanguage: Language = 'pt';

export const languageOptions = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
] as const;

export const contactEmail = 'contato.horarius@gmail.com';
export const whatsappNumber = '5544988657557';

const whatsappMessages: Record<
  Language,
  { primary: string; sales: string; floating: string }
> = {
  pt: {
    primary: 'Olá! Quero entender como o Horarius pode automatizar meus agendamentos.',
    sales: 'Olá! Quero falar com o time comercial do Horarius.',
    floating: 'Olá! Gostaria de saber mais sobre o Horarius.',
  },
  en: {
    primary: 'Hello! I want to understand how Horarius can automate my bookings.',
    sales: 'Hello! I would like to speak with the Horarius sales team.',
    floating: 'Hello! I would like to learn more about Horarius.',
  },
  es: {
    primary: 'Hola. Quiero entender cómo Horarius puede automatizar mis reservas.',
    sales: 'Hola. Quiero hablar con el equipo comercial de Horarius.',
    floating: 'Hola. Quiero saber más sobre Horarius.',
  },
};

const buildWhatsappLink = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const getWhatsappHref = (
  language: Language,
  variant: keyof (typeof whatsappMessages)[Language] = 'primary',
) => buildWhatsappLink(whatsappMessages[language][variant]);

export const isSupportedLanguage = (value: string | null): value is Language =>
  value === 'pt' || value === 'en' || value === 'es';

export const siteContent: Record<Language, SiteContent> = {
  pt: {
    header: {
      brandTag: 'agenda inteligente no WhatsApp',
      navItems: [
        { label: 'Benefícios', sectionId: 'benefits' },
        { label: 'Fluxo', sectionId: 'how-it-works' },
        { label: 'Segmentos', sectionId: 'segments' },
        { label: 'FAQ', sectionId: 'faq' },
      ],
      ctaLabel: 'Agendar uma conversa',
      ctaCompactLabel: 'Agendar',
      backLabel: 'Voltar para a landing',
      backCompactLabel: 'Voltar',
      languageAriaLabel: 'Selecionar idioma',
    },
    hero: {
      eyebrow: 'Recepção automatizada para negócios com agenda',
      title: 'Menos conversa perdida.',
      titleAccent: ' Mais horários preenchidos.',
      subtitle:
        'O Horarius transforma o WhatsApp em um fluxo de atendimento elegante e operacional para barbearias, clínicas, salões, pet shops e qualquer operação que dependa de agenda para vender.',
      primaryCta: 'Falar com o comercial',
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
    socialProof: {
      eyebrow: 'Feito para operações com agenda viva',
      title: 'Projetado para negócios em que cada horário perdido custa faturamento.',
      pills: [
        'Barbearias',
        'Salões de beleza',
        'Clínicas de estética',
        'Dentistas',
        'Clínicas médicas',
        'Personal trainers',
        'Pet shops',
        'Serviços automotivos',
        'Serviços domiciliares',
      ],
    },
    benefits: {
      eyebrow: 'Benefícios principais',
      title: 'Uma operação de agenda com mais ritmo e menos atrito',
      description:
        'Em vez de empilhar mensagens, sua equipe ganha um fluxo que responde rápido, organiza disponibilidade e segura a agenda ao longo do dia.',
      items: [
        {
          eyebrow: 'Velocidade operacional',
          title: 'Respostas instantâneas sem depender de alguém no celular',
          description:
            'O Horarius transforma o WhatsApp em uma recepção ativa que responde, apresenta horários e conduz o cliente até o agendamento.',
        },
        {
          eyebrow: 'Menos no-show',
          title: 'Confirmações e lembretes automáticos para proteger a agenda',
          description:
            'Clientes recebem confirmações rápidas, lembretes e opções de remarcação sem sua equipe precisar perseguir cada conversa.',
        },
        {
          eyebrow: 'Rotina centralizada',
          title: 'Agenda, equipe e disponibilidade organizadas no mesmo fluxo',
          description:
            'Evite desencontro entre horários, profissionais e serviços com uma lógica única de atendimento para toda a operação.',
        },
        {
          eyebrow: 'Mais clareza comercial',
          title: 'Uma operação mais previsível para vender melhor os horários',
          description:
            'Entenda o volume de demanda, horários de pico e gargalos de atendimento sem depender de improviso ou planilhas soltas.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'Como funciona',
      title: 'Do primeiro “oi” até a confirmação, tudo no mesmo ritmo',
      description:
        'O fluxo foi pensado para reduzir trabalho manual sem parecer frio. Ele mantém a conversa natural e avança a agenda com contexto.',
      steps: [
        {
          number: '01',
          title: 'Configure a operação',
          description:
            'Defina serviços, duração, profissionais, disponibilidade e regras de atendimento para o Horarius falar no tom certo da sua marca.',
        },
        {
          number: '02',
          title: 'Receba pedidos pelo WhatsApp',
          description:
            'O cliente conversa com a IA, escolhe serviço, horário e profissional, sem depender de troca manual de mensagens.',
        },
        {
          number: '03',
          title: 'Confirme e mantenha a agenda viva',
          description:
            'Confirmações, lembretes e remarcações acontecem no mesmo fluxo para sua agenda continuar organizada durante todo o dia.',
        },
      ],
      exampleEyebrow: 'Exemplo de fluxo',
      exampleTitle: 'WhatsApp com lógica de agenda',
      status: 'Ao vivo 24/7',
      messages: [
        { role: 'client', text: 'Oi! Quero agendar um corte para amanhã à tarde.' },
        {
          role: 'assistant',
          text: 'Tenho 14h, 15h30 e 17h. Quer ver com qual profissional?',
        },
        { role: 'client', text: 'Pode ser 15h30 com o Rafael.' },
        {
          role: 'assistant',
          text: 'Perfeito. Agendamento confirmado e lembrete ativado.',
        },
      ],
      summary: [
        { label: 'Serviço', value: 'Consulta inicial' },
        { label: 'Horário', value: 'Terça, 15h30' },
        { label: 'Status', value: 'Confirmado' },
      ],
    },
    segments: {
      eyebrow: 'Segmentos atendidos',
      title: 'Uma estrutura flexível para rotinas muito diferentes',
      description:
        'O Horarius atende operações que precisam responder rápido, manter contexto e organizar disponibilidade sem depender de improviso.',
      items: [
        {
          title: 'Beleza e bem-estar',
          description:
            'Barbearias, salões, esmalterias, clínicas de estética e studios que precisam reduzir o vai-e-volta no atendimento.',
        },
        {
          title: 'Saúde',
          description:
            'Dentistas, clínicas médicas, psicólogos e profissionais que dependem de triagem rápida e agenda previsível.',
        },
        {
          title: 'Fitness e aulas',
          description:
            'Personal trainers, studios e escolas com turmas, avaliações e encaixes recorrentes.',
        },
        {
          title: 'Pets',
          description:
            'Pet shops, banho e tosa e clínicas veterinárias com alta recorrência e muitos pedidos por mensagem.',
        },
        {
          title: 'Automotivo',
          description:
            'Lavagens, estética automotiva, oficinas e serviços rápidos que precisam organizar janelas e confirmações.',
        },
        {
          title: 'Serviços em campo',
          description:
            'Instalações, manutenção, suporte técnico e atendimentos domiciliares com agenda móvel e alta urgência.',
        },
      ],
    },
    faq: {
      eyebrow: 'Perguntas frequentes',
      title: 'As dúvidas que normalmente aparecem antes da decisão',
      description:
        'O foco do Horarius é transformar atendimento por mensagem em fluxo operacional, sem complicar a rotina da equipe.',
      items: [
        {
          question: 'O Horarius serve só para barbearias ou salões?',
          answer:
            'Não. Ele foi pensado para qualquer operação que viva de agenda e atendimento recorrente por WhatsApp, de clínicas a serviços automotivos.',
        },
        {
          question: 'O cliente fala com uma IA ou com alguém da equipe?',
          answer:
            'O fluxo inicial acontece com a IA do Horarius. Ela coleta contexto, mostra disponibilidade, confirma o horário e pode reduzir bastante o trabalho manual.',
        },
        {
          question: 'Dá para usar como canal principal de agendamento?',
          answer:
            'Sim. A proposta é transformar o WhatsApp em um canal operacional, não apenas em um inbox informal de mensagens soltas.',
        },
        {
          question: 'E se eu tiver mais de um profissional ou serviço?',
          answer:
            'O fluxo contempla serviços com durações diferentes, equipes e regras de disponibilidade para evitar conflito na agenda.',
        },
        {
          question: 'Como começo a testar?',
          answer:
            'Basta chamar no WhatsApp. O time coleta seu cenário, entende volume e rotina de agenda e orienta a configuração inicial.',
        },
      ],
    },
    cta: {
      eyebrow: 'Pronto para subir o nível da sua agenda?',
      title: 'Troque mensagens soltas por um fluxo que realmente fecha horários',
      description:
        'Se sua operação já recebe demanda pelo WhatsApp, o próximo passo é organizar essa demanda com velocidade, contexto e consistência.',
      primaryCta: 'Começar uma conversa',
      secondaryCta: 'Falar com vendas',
    },
    footer: {
      copyright: 'Todos os direitos reservados.',
      tagline:
        'Atendimento, confirmação e organização da agenda em um fluxo mais sofisticado para negócios que vendem por horário.',
      navigationTitle: 'Navegação',
      legalTitle: 'Legal',
      privacyLabel: 'Política de Privacidade',
      termsLabel: 'Termos de Serviço',
      whatsappLabel: 'Conversar no WhatsApp',
      bottomRight: 'Feito para operações que precisam de uma agenda previsível.',
    },
    whatsappButton: {
      label: 'WhatsApp',
      sublabel: 'Fale agora',
      ariaLabel: 'Conversar no WhatsApp',
    },
    privacy: {
      eyebrow: 'Legal',
      title: 'Política de Privacidade',
      appInfoTitle: 'Aplicativo: Horarius',
      appInfoDescription:
        'O Horarius é um assistente de inteligência artificial especializado em automação de agendamentos e atendimento ao cliente via WhatsApp. Nossa plataforma é projetada para barbearias, clínicas, salões de beleza e prestadores de serviços em geral que desejam otimizar a gestão de seus atendimentos.',
      lastUpdated: 'Última atualização: março de 2026',
      sections: [
        {
          title: '1. Introdução',
          paragraphs: [
            'A sua privacidade é importante para nós. Esta Política de Privacidade tem como objetivo informar de forma clara e transparente como o Horarius ("nós", "nosso" ou "plataforma") coleta, utiliza, armazena, protege e compartilha os dados pessoais dos usuários e clientes finais que interagem com nosso serviço.',
            'Ao utilizar o Horarius, seja como estabelecimento cadastrado ou como cliente final que interage via WhatsApp, você concorda com as práticas descritas nesta política. Caso não concorde com qualquer termo, solicitamos que não utilize nossos serviços.',
          ],
        },
        {
          title: '2. Informações que coletamos',
          paragraphs: [
            'Para fornecer e aprimorar nossos serviços, podemos coletar as seguintes categorias de dados:',
          ],
          subsections: [
            {
              title: 'Dados dos estabelecimentos (usuários da plataforma):',
              list: [
                'Nome do responsável e da empresa',
                'Número de telefone e WhatsApp comercial',
                'Endereço do estabelecimento',
                'Horários de funcionamento',
                'Catálogo de serviços oferecidos e profissionais vinculados',
              ],
            },
            {
              title: 'Dados dos clientes finais (consumidores):',
              list: [
                'Nome',
                'Número de telefone celular (WhatsApp)',
                'Conteúdo das mensagens trocadas via integração com o WhatsApp',
                'Histórico de agendamentos (datas, horários e serviços solicitados)',
              ],
            },
            {
              title: 'Dados coletados automaticamente:',
              list: [
                'Informações de acesso à plataforma (endereço IP, tipo de navegador, sistema operacional)',
                'Dados de uso e navegação dentro da plataforma',
              ],
            },
          ],
        },
        {
          title: '3. Como usamos os dados',
          paragraphs: ['Os dados coletados são utilizados exclusivamente para as seguintes finalidades:'],
          list: [
            'Gerenciamento de agendamentos: facilitar a criação, confirmação, reagendamento e cancelamento de atendimentos entre clientes e estabelecimentos.',
            'Comunicação via WhatsApp: enviar e receber mensagens de confirmação, lembretes, atualizações de status e respostas automáticas por meio da API oficial do WhatsApp (Meta).',
            'Atendimento ao cliente: permitir que os estabelecimentos interajam de forma eficiente com seus clientes pelo WhatsApp, utilizando o assistente de IA do Horarius.',
            'Melhoria do serviço: analisar padrões de uso para aprimorar funcionalidades, corrigir erros e otimizar a experiência do usuário.',
            'Segurança: garantir a integridade, disponibilidade e proteção da plataforma contra acessos não autorizados ou atividades fraudulentas.',
          ],
        },
        {
          title: '4. Compartilhamento de dados',
          paragraphs: [
            'O Horarius não vende, aluga ou comercializa dados pessoais de seus usuários. O compartilhamento de informações ocorre apenas nas seguintes situações:',
          ],
          list: [
            'Com o estabelecimento parceiro: os dados do cliente final (nome, telefone e histórico de agendamento) são compartilhados exclusivamente com o estabelecimento onde o atendimento foi ou será realizado.',
            'Provedores de infraestrutura e tecnologia: compartilhamos dados com prestadores de serviço terceirizados estritamente necessários para o funcionamento da plataforma, incluindo serviços de hospedagem em nuvem, banco de dados e a API oficial do WhatsApp Business (Meta).',
            'Cumprimento legal: podemos divulgar dados quando exigido por legislação vigente, ordem judicial, decisão administrativa ou para proteger os direitos, segurança ou propriedade do Horarius e de seus usuários.',
          ],
        },
        {
          title: '5. Armazenamento e segurança',
          paragraphs: [
            'O Horarius adota medidas técnicas e organizacionais adequadas para proteger os dados pessoais sob nossa responsabilidade. Entre as práticas de segurança implementadas, destacamos:',
            'Apesar de nossos esforços, nenhum sistema é completamente imune a riscos. Em caso de incidente de segurança que possa impactar seus dados, notificaremos os usuários afetados conforme exigido pela legislação aplicável.',
          ],
          list: [
            'Criptografia de dados em trânsito (HTTPS/TLS) e em repouso',
            'Controle de acesso restrito aos sistemas e bases de dados',
            'Monitoramento contínuo de vulnerabilidades e ameaças',
            'Backups regulares e procedimentos de recuperação de dados',
          ],
        },
        {
          title: '6. Retenção de dados',
          paragraphs: [
            'Os dados pessoais são mantidos apenas pelo período estritamente necessário para o cumprimento das finalidades descritas nesta política, ou conforme exigido por obrigações legais e regulatórias. Após esse período, os dados serão eliminados ou anonimizados de forma segura.',
            'Dados de agendamentos e histórico de conversas poderão ser retidos por até 12 meses após a última interação, salvo solicitação de exclusão pelo titular dos dados.',
          ],
        },
        {
          title: '7. Direitos do usuário',
          paragraphs: [
            'Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e demais legislações aplicáveis, você tem o direito de:',
          ],
          list: [
            'Acesso: solicitar uma cópia dos dados pessoais que armazenamos sobre você.',
            'Correção: exigir a retificação de dados incompletos, inexatos ou desatualizados.',
            'Exclusão: solicitar a eliminação de dados pessoais desnecessários, excessivos ou tratados em desconformidade com a legislação.',
            'Portabilidade: solicitar a transferência dos seus dados para outro fornecedor de serviço, quando aplicável.',
            'Revogação do consentimento: retirar o consentimento para o tratamento de dados a qualquer momento, sem comprometer a licitude do tratamento realizado anteriormente.',
          ],
        },
        {
          title: '8. Solicitação de exclusão de dados',
          paragraphs: [
            'Se você deseja solicitar a exclusão dos seus dados pessoais da nossa plataforma, ou exercer qualquer outro direito previsto nesta política, envie um e-mail para:',
            'Na sua solicitação, inclua seu nome completo e o número de telefone associado à sua conta ou interação, para que possamos identificar e processar seu pedido. Responderemos no prazo máximo de 15 dias úteis, conforme previsto na legislação vigente.',
          ],
          contactEmail,
        },
        {
          title: '9. Alterações nesta política',
          paragraphs: [
            'O Horarius reserva-se o direito de atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossos serviços, tecnologias utilizadas ou na legislação aplicável. Quando realizarmos alterações significativas, notificaremos os usuários por meio de aviso em nossa plataforma ou pelos canais de comunicação cadastrados.',
            'Recomendamos que você revise esta política periodicamente para manter-se informado sobre como protegemos seus dados.',
          ],
        },
        {
          title: '10. Contato',
          paragraphs: [
            'Se você tiver dúvidas, sugestões ou reclamações sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais, entre em contato conosco:',
          ],
          contactInfo: [
            { label: 'E-mail', value: contactEmail, href: `mailto:${contactEmail}` },
            { label: 'Aplicativo', value: 'Horarius' },
          ],
        },
      ],
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Termos de Serviço',
      appInfoTitle: 'Aplicativo: Horarius',
      appInfoDescription:
        'O Horarius é uma plataforma de automação de atendimento e agendamentos via WhatsApp para negócios que operam com agenda, como barbearias, clínicas, salões e prestadores de serviço em geral.',
      lastUpdated: 'Última atualização: março de 2026',
      sections: [
        {
          title: '1. Objeto dos serviços',
          paragraphs: [
            'Estes Termos de Serviço regulam o acesso e uso do Horarius por estabelecimentos contratantes e, quando aplicável, por clientes finais que interagem com fluxos automatizados operados pela plataforma.',
            'O Horarius oferece recursos para organizar disponibilidade, automatizar conversas, registrar solicitações de atendimento, confirmar agendamentos, enviar lembretes e apoiar rotinas operacionais relacionadas a serviços com horário marcado.',
          ],
        },
        {
          title: '2. Cadastro e responsabilidades do estabelecimento',
          paragraphs: [
            'Para utilizar a plataforma, o estabelecimento deve fornecer informações verdadeiras, atualizadas e suficientes para configuração da operação, incluindo dados de contato, serviços, duração, horários de funcionamento, profissionais e regras de agenda.',
            'O estabelecimento é responsável por manter esses dados corretos, proteger suas credenciais de acesso e revisar periodicamente sua disponibilidade, políticas comerciais e capacidade de atendimento.',
          ],
          list: [
            'Garantir que possui autorização para usar os números, contas e canais conectados à operação.',
            'Responder pela legalidade das ofertas, serviços e mensagens enviadas aos seus clientes.',
            'Validar antes do uso em produção as regras de agenda, duração, buffers, profissionais e exceções configuradas.',
          ],
        },
        {
          title: '3. Uso por clientes finais via WhatsApp',
          paragraphs: [
            'Os clientes finais interagem com o Horarius em nome do estabelecimento para consultar horários, solicitar, confirmar, remarcar ou cancelar atendimentos, conforme as regras definidas pela operação contratante.',
            'O Horarius atua como camada tecnológica de atendimento e não substitui a responsabilidade do estabelecimento pelo serviço prestado, pela agenda oferecida e pela comunicação comercial realizada com o cliente final.',
          ],
        },
        {
          title: '4. Disponibilidade, integrações e limites operacionais',
          paragraphs: [
            'O Horarius busca operar com alta disponibilidade, mas o funcionamento pode depender de serviços de terceiros, como provedores de hospedagem, infraestrutura, internet e integrações com APIs externas, incluindo WhatsApp.',
            'Instabilidades, indisponibilidades temporárias, atrasos em mensagens, limitações de terceiros ou falhas de configuração podem impactar a operação sem que isso represente garantia de funcionamento ininterrupto ou isento de erros.',
          ],
          list: [
            'Integrações externas podem alterar regras, limites, preços, disponibilidade técnica e políticas de uso sem controle direto do Horarius.',
            'O estabelecimento deve manter processos mínimos de conferência para agendas críticas, especialmente em períodos de implantação, alteração de regras ou alto volume.',
            'O Horarius poderá realizar manutenções, evoluções técnicas e ajustes operacionais para preservar segurança, desempenho e continuidade do serviço.',
          ],
        },
        {
          title: '5. Limitações de responsabilidade',
          paragraphs: [
            'O Horarius presta uma solução de software e automação operacional. Não garantimos aumento de faturamento, ocupação integral da agenda, conversão comercial específica ou eliminação total de faltas, cancelamentos e erros humanos.',
            'Na extensão permitida pela legislação aplicável, o Horarius não se responsabiliza por perdas indiretas, lucros cessantes, danos decorrentes de informações incorretas fornecidas pelo estabelecimento, uso indevido da plataforma, falhas de terceiros ou indisponibilidade de canais externos.',
          ],
        },
        {
          title: '6. Propriedade intelectual e uso permitido',
          paragraphs: [
            'Todo o conteúdo, software, identidade visual, fluxos, textos, interfaces, marcas e elementos tecnológicos do Horarius permanecem de titularidade do Horarius ou de seus licenciadores, conforme aplicável.',
            'É vedado copiar, distribuir, modificar, revender, criar obras derivadas, realizar engenharia reversa ou explorar comercialmente a plataforma fora das hipóteses autorizadas por escrito.',
          ],
        },
        {
          title: '7. Suspensão, cancelamento e encerramento',
          paragraphs: [
            'O acesso poderá ser suspenso ou encerrado em caso de uso ilícito, violação destes termos, fraude, tentativa de acesso indevido, risco à segurança da plataforma, inadimplência contratual ou uso que comprometa a operação de terceiros ou de outros clientes.',
            'O estabelecimento também poderá solicitar o encerramento do uso do serviço, observadas eventuais obrigações contratuais pendentes, prazos operacionais de desligamento e retenção de dados aplicável.',
          ],
        },
        {
          title: '8. Alterações destes termos',
          paragraphs: [
            'O Horarius poderá atualizar estes Termos de Serviço para refletir mudanças no produto, nas integrações, nos modelos comerciais ou em exigências legais e regulatórias.',
            'Quando houver alterações relevantes, a versão atualizada poderá ser publicada nesta página e comunicada pelos canais disponíveis da plataforma.',
          ],
        },
        {
          title: '9. Contato',
          paragraphs: [
            'Se você tiver dúvidas sobre estes Termos de Serviço ou precisar tratar assuntos relacionados ao uso da plataforma, entre em contato conosco:',
          ],
          contactInfo: [
            { label: 'E-mail', value: contactEmail, href: `mailto:${contactEmail}` },
            { label: 'Aplicativo', value: 'Horarius' },
          ],
        },
      ],
    },
  },
  en: {
    header: {
      brandTag: 'smart scheduling on WhatsApp',
      navItems: [
        { label: 'Benefits', sectionId: 'benefits' },
        { label: 'Flow', sectionId: 'how-it-works' },
        { label: 'Segments', sectionId: 'segments' },
        { label: 'FAQ', sectionId: 'faq' },
      ],
      ctaLabel: 'Book a call',
      ctaCompactLabel: 'Book',
      backLabel: 'Back to landing page',
      backCompactLabel: 'Back',
      languageAriaLabel: 'Select language',
    },
    hero: {
      eyebrow: 'Automated front desk for appointment-based businesses',
      title: 'Fewer lost conversations.',
      titleAccent: ' More filled slots.',
      subtitle:
        'Horarius turns WhatsApp into an elegant, operational booking flow for barbershops, clinics, salons, pet shops, and any business that depends on appointments to sell.',
      primaryCta: 'Talk to sales',
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
    socialProof: {
      eyebrow: 'Built for live booking operations',
      title: 'Designed for businesses where every empty slot means lost revenue.',
      pills: [
        'Barbershops',
        'Beauty salons',
        'Aesthetic clinics',
        'Dentists',
        'Medical clinics',
        'Personal trainers',
        'Pet shops',
        'Automotive services',
        'Home services',
      ],
    },
    benefits: {
      eyebrow: 'Core benefits',
      title: 'A booking operation with more rhythm and less friction',
      description:
        'Instead of stacking messages, your team gets a flow that answers fast, organizes availability, and protects the schedule throughout the day.',
      items: [
        {
          eyebrow: 'Operational speed',
          title: 'Instant responses without depending on someone holding the phone',
          description:
            'Horarius turns WhatsApp into an active front desk that replies, presents available slots, and guides the customer all the way to the booking.',
        },
        {
          eyebrow: 'Less no-show',
          title: 'Automatic confirmations and reminders to protect the schedule',
          description:
            'Customers receive quick confirmations, reminders, and rescheduling options without your team chasing every conversation.',
        },
        {
          eyebrow: 'Centralized routine',
          title: 'Schedule, staff, and availability organized in a single flow',
          description:
            'Avoid conflicts between time slots, professionals, and services with one consistent booking logic for the whole operation.',
        },
        {
          eyebrow: 'Commercial clarity',
          title: 'A more predictable operation to sell your available time better',
          description:
            'Understand demand volume, peak hours, and service bottlenecks without relying on improvisation or scattered spreadsheets.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'From the first hello to confirmation, everything moves in one rhythm',
      description:
        'The flow was designed to reduce manual work without feeling cold. It keeps the conversation natural and moves the schedule forward with context.',
      steps: [
        {
          number: '01',
          title: 'Configure the operation',
          description:
            'Define services, duration, professionals, availability, and service rules so Horarius speaks in the right tone for your brand.',
        },
        {
          number: '02',
          title: 'Receive requests through WhatsApp',
          description:
            'The customer talks to the AI, chooses service, time slot, and professional without manual back-and-forth.',
        },
        {
          number: '03',
          title: 'Confirm and keep the schedule active',
          description:
            'Confirmations, reminders, and rescheduling happen in the same flow so your calendar stays organized all day.',
        },
      ],
      exampleEyebrow: 'Flow example',
      exampleTitle: 'WhatsApp with booking logic',
      status: 'Live 24/7',
      messages: [
        { role: 'client', text: 'Hi! I want to book a haircut for tomorrow afternoon.' },
        {
          role: 'assistant',
          text: 'I have 2 PM, 3:30 PM, and 5 PM. Would you like to choose a professional?',
        },
        { role: 'client', text: '3:30 PM with Rafael works.' },
        {
          role: 'assistant',
          text: 'Perfect. The booking is confirmed and the reminder is active.',
        },
      ],
      summary: [
        { label: 'Service', value: 'Initial consultation' },
        { label: 'Time', value: 'Tuesday, 3:30 PM' },
        { label: 'Status', value: 'Confirmed' },
      ],
    },
    segments: {
      eyebrow: 'Supported segments',
      title: 'A flexible structure for very different routines',
      description:
        'Horarius serves operations that need to answer quickly, keep context, and organize availability without relying on improvisation.',
      items: [
        {
          title: 'Beauty and wellness',
          description:
            'Barbershops, salons, nail studios, aesthetic clinics, and studios that need to reduce back-and-forth in service.',
        },
        {
          title: 'Healthcare',
          description:
            'Dentists, medical clinics, psychologists, and professionals who rely on fast triage and a predictable calendar.',
        },
        {
          title: 'Fitness and classes',
          description:
            'Personal trainers, studios, and schools with classes, assessments, and recurring bookings.',
        },
        {
          title: 'Pets',
          description:
            'Pet shops, grooming businesses, and veterinary clinics with high repeat demand and many message-based requests.',
        },
        {
          title: 'Automotive',
          description:
            'Detailing, car wash, repair shops, and quick services that need to manage time windows and confirmations.',
        },
        {
          title: 'Field services',
          description:
            'Installations, maintenance, technical support, and home visits with mobile schedules and urgent demand.',
        },
      ],
    },
    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'The questions that usually come up before the decision',
      description:
        'Horarius is focused on turning message-based service into an operational flow without making the team’s routine more complex.',
      items: [
        {
          question: 'Is Horarius only for barbershops or beauty salons?',
          answer:
            'No. It was built for any operation that runs on appointments and recurring WhatsApp conversations, from clinics to automotive services.',
        },
        {
          question: 'Does the customer speak to AI or to someone on the team?',
          answer:
            'The initial flow is handled by Horarius AI. It gathers context, shows availability, confirms the slot, and can greatly reduce manual work.',
        },
        {
          question: 'Can it be used as the main booking channel?',
          answer:
            'Yes. The idea is to turn WhatsApp into an operational channel, not just an informal inbox full of loose messages.',
        },
        {
          question: 'What if I have more than one professional or service?',
          answer:
            'The flow supports services with different durations, teams, and availability rules to avoid schedule conflicts.',
        },
        {
          question: 'How do I start testing?',
          answer:
            'Just reach out on WhatsApp. The team will review your scenario, understand your booking routine, and guide the initial setup.',
        },
      ],
    },
    cta: {
      eyebrow: 'Ready to level up your schedule?',
      title: 'Replace scattered messages with a flow that actually closes bookings',
      description:
        'If your operation already receives demand through WhatsApp, the next step is to organize that demand with speed, context, and consistency.',
      primaryCta: 'Start a conversation',
      secondaryCta: 'Talk to sales',
    },
    footer: {
      copyright: 'All rights reserved.',
      tagline:
        'Service, confirmations, and schedule organization in a more sophisticated flow for businesses that sell by the hour.',
      navigationTitle: 'Navigation',
      legalTitle: 'Legal',
      privacyLabel: 'Privacy Policy',
      termsLabel: 'Terms of Service',
      whatsappLabel: 'Chat on WhatsApp',
      bottomRight: 'Built for operations that need a predictable schedule.',
    },
    whatsappButton: {
      label: 'WhatsApp',
      sublabel: 'Talk now',
      ariaLabel: 'Chat on WhatsApp',
    },
    privacy: {
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      appInfoTitle: 'Application: Horarius',
      appInfoDescription:
        'Horarius is an artificial intelligence assistant specialized in appointment automation and customer service through WhatsApp. Our platform is designed for barbershops, clinics, beauty salons, and service providers in general who want to optimize how they manage their appointments.',
      lastUpdated: 'Last updated: March 2026',
      sections: [
        {
          title: '1. Introduction',
          paragraphs: [
            'Your privacy is important to us. This Privacy Policy aims to explain clearly and transparently how Horarius ("we", "our", or "platform") collects, uses, stores, protects, and shares personal data from users and end customers who interact with our service.',
            'By using Horarius, whether as a registered business or as an end customer interacting through WhatsApp, you agree to the practices described in this policy. If you do not agree with any term, please do not use our services.',
          ],
        },
        {
          title: '2. Information we collect',
          paragraphs: [
            'To provide and improve our services, we may collect the following categories of data:',
          ],
          subsections: [
            {
              title: 'Business data (platform users):',
              list: [
                'Name of the owner or manager and company name',
                'Business phone number and WhatsApp number',
                'Business address',
                'Opening hours',
                'Catalog of services offered and linked professionals',
              ],
            },
            {
              title: 'End-customer data:',
              list: [
                'Name',
                'Mobile phone number (WhatsApp)',
                'Content of messages exchanged through the WhatsApp integration',
                'Booking history (dates, times, and requested services)',
              ],
            },
            {
              title: 'Automatically collected data:',
              list: [
                'Platform access information (IP address, browser type, operating system)',
                'Usage and navigation data within the platform',
              ],
            },
          ],
        },
        {
          title: '3. How we use data',
          paragraphs: ['Collected data is used exclusively for the following purposes:'],
          list: [
            'Appointment management: facilitate the creation, confirmation, rescheduling, and cancellation of bookings between customers and businesses.',
            'WhatsApp communication: send and receive confirmations, reminders, status updates, and automated replies through the official WhatsApp API (Meta).',
            'Customer service: allow businesses to interact efficiently with their customers on WhatsApp using the Horarius AI assistant.',
            'Service improvement: analyze usage patterns to improve features, fix issues, and optimize the user experience.',
            'Security: ensure the integrity, availability, and protection of the platform against unauthorized access or fraudulent activity.',
          ],
        },
        {
          title: '4. Data sharing',
          paragraphs: [
            'Horarius does not sell, rent, or trade personal data. Information is shared only in the following situations:',
          ],
          list: [
            'With the partner business: end-customer data (name, phone number, and booking history) is shared exclusively with the business where the service took place or will take place.',
            'Infrastructure and technology providers: we share data with third-party providers strictly necessary for the platform to operate, including cloud hosting, databases, and the official WhatsApp Business API (Meta).',
            'Legal compliance: we may disclose data when required by law, court order, administrative decision, or to protect the rights, safety, or property of Horarius and its users.',
          ],
        },
        {
          title: '5. Storage and security',
          paragraphs: [
            'Horarius adopts appropriate technical and organizational measures to protect personal data under our responsibility. Our security practices include:',
            'Despite our efforts, no system is completely immune to risks. If a security incident affects your data, we will notify affected users as required by applicable law.',
          ],
          list: [
            'Encryption of data in transit (HTTPS/TLS) and at rest',
            'Restricted access control to systems and databases',
            'Continuous monitoring of vulnerabilities and threats',
            'Regular backups and data recovery procedures',
          ],
        },
        {
          title: '6. Data retention',
          paragraphs: [
            'Personal data is kept only for the period strictly necessary to fulfill the purposes described in this policy, or as required by legal and regulatory obligations. After that period, data will be securely deleted or anonymized.',
            'Booking data and conversation history may be retained for up to 12 months after the last interaction, unless the data subject requests deletion.',
          ],
        },
        {
          title: '7. User rights',
          paragraphs: [
            'In accordance with applicable data protection laws, you have the right to:',
          ],
          list: [
            'Access: request a copy of the personal data we store about you.',
            'Correction: request correction of incomplete, inaccurate, or outdated data.',
            'Deletion: request the deletion of unnecessary, excessive, or unlawfully processed personal data.',
            'Portability: request transfer of your data to another service provider when applicable.',
            'Withdrawal of consent: withdraw consent for data processing at any time, without affecting the lawfulness of prior processing.',
          ],
        },
        {
          title: '8. Data deletion request',
          paragraphs: [
            'If you want to request deletion of your personal data from our platform, or exercise any other right described in this policy, please send an email to:',
            'In your request, include your full name and the phone number associated with your account or interaction so we can identify and process your request. We will respond within 15 business days, as required by applicable law.',
          ],
          contactEmail,
        },
        {
          title: '9. Changes to this policy',
          paragraphs: [
            'Horarius may update this Privacy Policy periodically to reflect changes in our services, technologies, or applicable laws. When we make significant changes, we will notify users through a notice on our platform or through the registered communication channels.',
            'We recommend that you review this policy regularly to stay informed about how we protect your data.',
          ],
        },
        {
          title: '10. Contact',
          paragraphs: [
            'If you have questions, suggestions, or complaints about this Privacy Policy or about the processing of your personal data, contact us:',
          ],
          contactInfo: [
            { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
            { label: 'Application', value: 'Horarius' },
          ],
        },
      ],
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Terms of Service',
      appInfoTitle: 'Application: Horarius',
      appInfoDescription:
        'Horarius is a WhatsApp-based customer service and scheduling automation platform for appointment-driven businesses such as barbershops, clinics, salons, and service providers in general.',
      lastUpdated: 'Last updated: March 2026',
      sections: [
        {
          title: '1. Scope of the services',
          paragraphs: [
            'These Terms of Service govern access to and use of Horarius by subscribing businesses and, when applicable, by end customers interacting with automated flows operated through the platform.',
            'Horarius provides tools to organize availability, automate conversations, register service requests, confirm appointments, send reminders, and support operational routines related to appointment-based services.',
          ],
        },
        {
          title: '2. Business registration and responsibilities',
          paragraphs: [
            'To use the platform, the business must provide truthful, updated, and sufficient information for operational setup, including contact details, services, duration, business hours, professionals, and booking rules.',
            'The business is responsible for keeping this information accurate, protecting its access credentials, and periodically reviewing availability, commercial policies, and service capacity.',
          ],
          list: [
            'Ensure it has authorization to use the phone numbers, accounts, and channels connected to the operation.',
            'Remain responsible for the legality of the offers, services, and messages sent to its customers.',
            'Validate booking rules, duration, buffers, professionals, and configured exceptions before using the platform in production.',
          ],
        },
        {
          title: '3. Use by end customers through WhatsApp',
          paragraphs: [
            'End customers interact with Horarius on behalf of the business to check available slots, request, confirm, reschedule, or cancel appointments according to the rules defined by the subscribing operation.',
            'Horarius acts as the technology layer for customer service and does not replace the business responsibility for the service delivered, the availability offered, or the commercial communication maintained with the end customer.',
          ],
        },
        {
          title: '4. Availability, integrations, and operational limits',
          paragraphs: [
            'Horarius aims to operate with high availability, but the service may depend on third-party providers such as hosting, infrastructure, internet connectivity, and external APIs, including WhatsApp.',
            'Instability, temporary downtime, message delays, third-party limitations, or configuration failures may affect the operation and do not constitute a guarantee of uninterrupted or error-free performance.',
          ],
          list: [
            'External integrations may change their rules, limits, pricing, technical availability, and usage policies without direct control from Horarius.',
            'The business must keep minimum verification procedures for critical schedules, especially during onboarding, rule changes, or high-demand periods.',
            'Horarius may perform maintenance, technical upgrades, and operational adjustments to preserve service security, performance, and continuity.',
          ],
        },
        {
          title: '5. Limitation of liability',
          paragraphs: [
            'Horarius provides software and operational automation. We do not guarantee revenue growth, full schedule occupancy, any specific conversion rate, or complete elimination of no-shows, cancellations, or human errors.',
            'To the extent permitted by applicable law, Horarius is not liable for indirect losses, lost profits, damages arising from incorrect information provided by the business, misuse of the platform, third-party failures, or unavailability of external channels.',
          ],
        },
        {
          title: '6. Intellectual property and permitted use',
          paragraphs: [
            'All software, content, visual identity, workflows, texts, interfaces, trademarks, and technology elements of Horarius remain the property of Horarius or its licensors, as applicable.',
            'You may not copy, distribute, modify, resell, create derivative works from, reverse engineer, or commercially exploit the platform beyond the uses expressly authorized in writing.',
          ],
        },
        {
          title: '7. Suspension, cancellation, and termination',
          paragraphs: [
            'Access may be suspended or terminated in cases of unlawful use, breach of these terms, fraud, attempted unauthorized access, security risk to the platform, contractual default, or use that compromises third parties or other customers.',
            'The business may also request termination of the service, subject to any outstanding contractual obligations, operational offboarding periods, and applicable data retention requirements.',
          ],
        },
        {
          title: '8. Changes to these terms',
          paragraphs: [
            'Horarius may update these Terms of Service to reflect changes in the product, integrations, commercial models, or legal and regulatory requirements.',
            'When relevant changes occur, the updated version may be published on this page and communicated through the platform channels available at the time.',
          ],
        },
        {
          title: '9. Contact',
          paragraphs: [
            'If you have questions about these Terms of Service or need to address matters related to the use of the platform, contact us:',
          ],
          contactInfo: [
            { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
            { label: 'Application', value: 'Horarius' },
          ],
        },
      ],
    },
  },
  es: {
    header: {
      brandTag: 'agenda inteligente en WhatsApp',
      navItems: [
        { label: 'Beneficios', sectionId: 'benefits' },
        { label: 'Flujo', sectionId: 'how-it-works' },
        { label: 'Segmentos', sectionId: 'segments' },
        { label: 'FAQ', sectionId: 'faq' },
      ],
      ctaLabel: 'Agendar una llamada',
      ctaCompactLabel: 'Agendar',
      backLabel: 'Volver a la landing',
      backCompactLabel: 'Volver',
      languageAriaLabel: 'Seleccionar idioma',
    },
    hero: {
      eyebrow: 'Recepción automatizada para negocios con agenda',
      title: 'Menos conversaciones perdidas.',
      titleAccent: ' Más horarios ocupados.',
      subtitle:
        'Horarius convierte WhatsApp en un flujo de atención elegante y operativo para barberías, clínicas, salones, tiendas de mascotas y cualquier negocio que dependa de reservas para vender.',
      primaryCta: 'Hablar con ventas',
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
    socialProof: {
      eyebrow: 'Hecho para operaciones con agenda activa',
      title: 'Diseñado para negocios donde cada horario vacío significa ingresos perdidos.',
      pills: [
        'Barberías',
        'Salones de belleza',
        'Clínicas estéticas',
        'Dentistas',
        'Clínicas médicas',
        'Entrenadores personales',
        'Tiendas de mascotas',
        'Servicios automotrices',
        'Servicios a domicilio',
      ],
    },
    benefits: {
      eyebrow: 'Beneficios principales',
      title: 'Una operación de agenda con más ritmo y menos fricción',
      description:
        'En lugar de acumular mensajes, tu equipo gana un flujo que responde rápido, organiza la disponibilidad y protege la agenda durante todo el día.',
      items: [
        {
          eyebrow: 'Velocidad operativa',
          title: 'Respuestas instantáneas sin depender de alguien con el celular',
          description:
            'Horarius convierte WhatsApp en una recepción activa que responde, muestra horarios disponibles y guía al cliente hasta la reserva.',
        },
        {
          eyebrow: 'Menos ausencias',
          title: 'Confirmaciones y recordatorios automáticos para proteger la agenda',
          description:
            'Los clientes reciben confirmaciones rápidas, recordatorios y opciones para reprogramar sin que tu equipo persiga cada conversación.',
        },
        {
          eyebrow: 'Rutina centralizada',
          title: 'Agenda, equipo y disponibilidad organizados en un solo flujo',
          description:
            'Evita conflictos entre horarios, profesionales y servicios con una lógica consistente para toda la operación.',
        },
        {
          eyebrow: 'Claridad comercial',
          title: 'Una operación más predecible para vender mejor tus horarios',
          description:
            'Entiende el volumen de demanda, los horarios pico y los cuellos de botella sin depender de improvisación o planillas dispersas.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'Cómo funciona',
      title: 'Del primer “hola” hasta la confirmación, todo avanza con el mismo ritmo',
      description:
        'El flujo fue pensado para reducir trabajo manual sin sentirse frío. Mantiene la conversación natural y hace avanzar la agenda con contexto.',
      steps: [
        {
          number: '01',
          title: 'Configura la operación',
          description:
            'Define servicios, duración, profesionales, disponibilidad y reglas de atención para que Horarius hable con el tono correcto de tu marca.',
        },
        {
          number: '02',
          title: 'Recibe solicitudes por WhatsApp',
          description:
            'El cliente conversa con la IA, elige servicio, horario y profesional sin el intercambio manual de mensajes.',
        },
        {
          number: '03',
          title: 'Confirma y mantén la agenda activa',
          description:
            'Confirmaciones, recordatorios y reprogramaciones suceden en el mismo flujo para que tu agenda siga organizada durante todo el día.',
        },
      ],
      exampleEyebrow: 'Ejemplo de flujo',
      exampleTitle: 'WhatsApp con lógica de agenda',
      status: 'Activo 24/7',
      messages: [
        { role: 'client', text: 'Hola. Quiero agendar un corte para mañana por la tarde.' },
        {
          role: 'assistant',
          text: 'Tengo 14:00, 15:30 y 17:00. ¿Quieres elegir con qué profesional?',
        },
        { role: 'client', text: 'Puede ser a las 15:30 con Rafael.' },
        {
          role: 'assistant',
          text: 'Perfecto. La reserva quedó confirmada y el recordatorio está activo.',
        },
      ],
      summary: [
        { label: 'Servicio', value: 'Consulta inicial' },
        { label: 'Horario', value: 'Martes, 15:30' },
        { label: 'Estado', value: 'Confirmado' },
      ],
    },
    segments: {
      eyebrow: 'Segmentos atendidos',
      title: 'Una estructura flexible para rutinas muy diferentes',
      description:
        'Horarius atiende operaciones que necesitan responder rápido, mantener contexto y organizar disponibilidad sin depender de improvisación.',
      items: [
        {
          title: 'Belleza y bienestar',
          description:
            'Barberías, salones, estudios de uñas, clínicas estéticas y estudios que necesitan reducir el ida y vuelta en la atención.',
        },
        {
          title: 'Salud',
          description:
            'Dentistas, clínicas médicas, psicólogos y profesionales que dependen de una triage rápida y una agenda predecible.',
        },
        {
          title: 'Fitness y clases',
          description:
            'Entrenadores personales, estudios y escuelas con clases, evaluaciones y reservas recurrentes.',
        },
        {
          title: 'Mascotas',
          description:
            'Tiendas de mascotas, peluquerías caninas y clínicas veterinarias con alta recurrencia y muchos pedidos por mensaje.',
        },
        {
          title: 'Automotriz',
          description:
            'Lavaderos, estética automotriz, talleres y servicios rápidos que necesitan organizar ventanas de tiempo y confirmaciones.',
        },
        {
          title: 'Servicios en campo',
          description:
            'Instalaciones, mantenimiento, soporte técnico y visitas a domicilio con agenda móvil y demanda urgente.',
        },
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Las dudas que suelen aparecer antes de decidir',
      description:
        'El foco de Horarius es convertir la atención por mensajes en un flujo operativo, sin complicar la rutina del equipo.',
      items: [
        {
          question: '¿Horarius sirve solo para barberías o salones?',
          answer:
            'No. Fue pensado para cualquier operación que viva de reservas y conversaciones recurrentes por WhatsApp, desde clínicas hasta servicios automotrices.',
        },
        {
          question: '¿El cliente habla con una IA o con alguien del equipo?',
          answer:
            'El flujo inicial ocurre con la IA de Horarius. Recoge contexto, muestra disponibilidad, confirma el horario y puede reducir mucho el trabajo manual.',
        },
        {
          question: '¿Se puede usar como canal principal de reservas?',
          answer:
            'Sí. La propuesta es convertir WhatsApp en un canal operativo, no solo en una bandeja informal llena de mensajes sueltos.',
        },
        {
          question: '¿Y si tengo más de un profesional o servicio?',
          answer:
            'El flujo contempla servicios con distintas duraciones, equipos y reglas de disponibilidad para evitar conflictos en la agenda.',
        },
        {
          question: '¿Cómo empiezo a probarlo?',
          answer:
            'Solo tienes que escribir por WhatsApp. El equipo revisará tu escenario, entenderá tu rutina de agenda y te guiará en la configuración inicial.',
        },
      ],
    },
    cta: {
      eyebrow: '¿Listo para llevar tu agenda a otro nivel?',
      title: 'Cambia mensajes sueltos por un flujo que realmente cierre reservas',
      description:
        'Si tu operación ya recibe demanda por WhatsApp, el siguiente paso es organizar esa demanda con velocidad, contexto y consistencia.',
      primaryCta: 'Iniciar una conversación',
      secondaryCta: 'Hablar con ventas',
    },
    footer: {
      copyright: 'Todos los derechos reservados.',
      tagline:
        'Atención, confirmación y organización de la agenda en un flujo más sofisticado para negocios que venden por horario.',
      navigationTitle: 'Navegación',
      legalTitle: 'Legal',
      privacyLabel: 'Política de Privacidad',
      termsLabel: 'Términos del Servicio',
      whatsappLabel: 'Hablar por WhatsApp',
      bottomRight: 'Hecho para operaciones que necesitan una agenda predecible.',
    },
    whatsappButton: {
      label: 'WhatsApp',
      sublabel: 'Habla ahora',
      ariaLabel: 'Hablar por WhatsApp',
    },
    privacy: {
      eyebrow: 'Legal',
      title: 'Política de Privacidad',
      appInfoTitle: 'Aplicación: Horarius',
      appInfoDescription:
        'Horarius es un asistente de inteligencia artificial especializado en la automatización de reservas y atención al cliente a través de WhatsApp. Nuestra plataforma está diseñada para barberías, clínicas, salones de belleza y prestadores de servicios en general que desean optimizar la gestión de sus citas.',
      lastUpdated: 'Última actualización: marzo de 2026',
      sections: [
        {
          title: '1. Introducción',
          paragraphs: [
            'Tu privacidad es importante para nosotros. Esta Política de Privacidad tiene como objetivo explicar de forma clara y transparente cómo Horarius ("nosotros", "nuestro" o "plataforma") recopila, usa, almacena, protege y comparte los datos personales de usuarios y clientes finales que interactúan con nuestro servicio.',
            'Al utilizar Horarius, ya sea como establecimiento registrado o como cliente final que interactúa a través de WhatsApp, aceptas las prácticas descritas en esta política. Si no estás de acuerdo con algún término, te pedimos que no utilices nuestros servicios.',
          ],
        },
        {
          title: '2. Información que recopilamos',
          paragraphs: [
            'Para ofrecer y mejorar nuestros servicios, podemos recopilar las siguientes categorías de datos:',
          ],
          subsections: [
            {
              title: 'Datos de los establecimientos (usuarios de la plataforma):',
              list: [
                'Nombre del responsable y de la empresa',
                'Número de teléfono y WhatsApp comercial',
                'Dirección del establecimiento',
                'Horarios de funcionamiento',
                'Catálogo de servicios ofrecidos y profesionales vinculados',
              ],
            },
            {
              title: 'Datos de los clientes finales:',
              list: [
                'Nombre',
                'Número de teléfono móvil (WhatsApp)',
                'Contenido de los mensajes intercambiados mediante la integración con WhatsApp',
                'Historial de reservas (fechas, horarios y servicios solicitados)',
              ],
            },
            {
              title: 'Datos recopilados automáticamente:',
              list: [
                'Información de acceso a la plataforma (dirección IP, tipo de navegador, sistema operativo)',
                'Datos de uso y navegación dentro de la plataforma',
              ],
            },
          ],
        },
        {
          title: '3. Cómo usamos los datos',
          paragraphs: ['Los datos recopilados se utilizan exclusivamente para los siguientes fines:'],
          list: [
            'Gestión de reservas: facilitar la creación, confirmación, reprogramación y cancelación de citas entre clientes y establecimientos.',
            'Comunicación por WhatsApp: enviar y recibir confirmaciones, recordatorios, actualizaciones de estado y respuestas automáticas mediante la API oficial de WhatsApp (Meta).',
            'Atención al cliente: permitir que los establecimientos interactúen de forma eficiente con sus clientes por WhatsApp utilizando el asistente de IA de Horarius.',
            'Mejora del servicio: analizar patrones de uso para mejorar funcionalidades, corregir errores y optimizar la experiencia del usuario.',
            'Seguridad: garantizar la integridad, disponibilidad y protección de la plataforma frente a accesos no autorizados o actividades fraudulentas.',
          ],
        },
        {
          title: '4. Compartición de datos',
          paragraphs: [
            'Horarius no vende, alquila ni comercializa datos personales. La información se comparte solo en las siguientes situaciones:',
          ],
          list: [
            'Con el establecimiento asociado: los datos del cliente final (nombre, teléfono e historial de reservas) se comparten exclusivamente con el establecimiento donde el servicio se realizó o se realizará.',
            'Proveedores de infraestructura y tecnología: compartimos datos con proveedores externos estrictamente necesarios para el funcionamiento de la plataforma, incluidos alojamiento en la nube, bases de datos y la API oficial de WhatsApp Business (Meta).',
            'Cumplimiento legal: podemos divulgar datos cuando lo exija la ley, una orden judicial, una decisión administrativa o para proteger los derechos, la seguridad o la propiedad de Horarius y de sus usuarios.',
          ],
        },
        {
          title: '5. Almacenamiento y seguridad',
          paragraphs: [
            'Horarius adopta medidas técnicas y organizativas adecuadas para proteger los datos personales bajo nuestra responsabilidad. Entre nuestras prácticas de seguridad destacamos:',
            'A pesar de nuestros esfuerzos, ningún sistema es completamente inmune a riesgos. Si un incidente de seguridad afecta tus datos, notificaremos a los usuarios afectados según lo exija la legislación aplicable.',
          ],
          list: [
            'Cifrado de datos en tránsito (HTTPS/TLS) y en reposo',
            'Control de acceso restringido a sistemas y bases de datos',
            'Monitoreo continuo de vulnerabilidades y amenazas',
            'Copias de seguridad regulares y procedimientos de recuperación de datos',
          ],
        },
        {
          title: '6. Retención de datos',
          paragraphs: [
            'Los datos personales se conservan solo durante el período estrictamente necesario para cumplir con las finalidades descritas en esta política, o según lo exijan obligaciones legales y regulatorias. Después de ese período, los datos serán eliminados o anonimizados de forma segura.',
            'Los datos de reservas y el historial de conversaciones pueden conservarse hasta 12 meses después de la última interacción, salvo solicitud de eliminación por parte del titular.',
          ],
        },
        {
          title: '7. Derechos del usuario',
          paragraphs: [
            'De acuerdo con la legislación aplicable en materia de protección de datos, tienes derecho a:',
          ],
          list: [
            'Acceso: solicitar una copia de los datos personales que almacenamos sobre ti.',
            'Corrección: solicitar la corrección de datos incompletos, inexactos o desactualizados.',
            'Eliminación: solicitar la eliminación de datos personales innecesarios, excesivos o tratados de forma indebida.',
            'Portabilidad: solicitar la transferencia de tus datos a otro proveedor de servicios cuando corresponda.',
            'Retiro del consentimiento: retirar el consentimiento para el tratamiento de datos en cualquier momento, sin afectar la legalidad del tratamiento previo.',
          ],
        },
        {
          title: '8. Solicitud de eliminación de datos',
          paragraphs: [
            'Si deseas solicitar la eliminación de tus datos personales de nuestra plataforma, o ejercer cualquier otro derecho previsto en esta política, envía un correo a:',
            'En tu solicitud, incluye tu nombre completo y el número de teléfono asociado a tu cuenta o interacción para que podamos identificar y procesar tu pedido. Responderemos en un plazo de hasta 15 días hábiles, según lo exija la legislación aplicable.',
          ],
          contactEmail,
        },
        {
          title: '9. Cambios en esta política',
          paragraphs: [
            'Horarius puede actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestros servicios, tecnologías o en la legislación aplicable. Cuando realicemos cambios relevantes, notificaremos a los usuarios mediante un aviso en la plataforma o por los canales de comunicación registrados.',
            'Recomendamos revisar esta política periódicamente para mantenerse informado sobre cómo protegemos tus datos.',
          ],
        },
        {
          title: '10. Contacto',
          paragraphs: [
            'Si tienes preguntas, sugerencias o reclamos sobre esta Política de Privacidad o sobre el tratamiento de tus datos personales, contáctanos:',
          ],
          contactInfo: [
            { label: 'Correo electrónico', value: contactEmail, href: `mailto:${contactEmail}` },
            { label: 'Aplicación', value: 'Horarius' },
          ],
        },
      ],
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Términos del Servicio',
      appInfoTitle: 'Aplicación: Horarius',
      appInfoDescription:
        'Horarius es una plataforma de automatización de atención y reservas por WhatsApp para negocios que operan con agenda, como barberías, clínicas, salones y prestadores de servicios en general.',
      lastUpdated: 'Última actualización: marzo de 2026',
      sections: [
        {
          title: '1. Objeto de los servicios',
          paragraphs: [
            'Estos Términos del Servicio regulan el acceso y uso de Horarius por parte de establecimientos contratantes y, cuando corresponda, por clientes finales que interactúan con flujos automatizados operados por la plataforma.',
            'Horarius ofrece recursos para organizar disponibilidad, automatizar conversaciones, registrar solicitudes de atención, confirmar reservas, enviar recordatorios y apoyar rutinas operativas relacionadas con servicios por cita.',
          ],
        },
        {
          title: '2. Registro y responsabilidades del establecimiento',
          paragraphs: [
            'Para utilizar la plataforma, el establecimiento debe proporcionar información veraz, actualizada y suficiente para configurar la operación, incluidos datos de contacto, servicios, duración, horarios de funcionamiento, profesionales y reglas de agenda.',
            'El establecimiento es responsable de mantener esa información correcta, proteger sus credenciales de acceso y revisar periódicamente su disponibilidad, políticas comerciales y capacidad de atención.',
          ],
          list: [
            'Garantizar que cuenta con autorización para usar los números, cuentas y canales conectados a la operación.',
            'Responder por la legalidad de las ofertas, servicios y mensajes enviados a sus clientes.',
            'Validar antes del uso en producción las reglas de agenda, duración, buffers, profesionales y excepciones configuradas.',
          ],
        },
        {
          title: '3. Uso por clientes finales a través de WhatsApp',
          paragraphs: [
            'Los clientes finales interactúan con Horarius en nombre del establecimiento para consultar horarios, solicitar, confirmar, reprogramar o cancelar citas según las reglas definidas por la operación contratante.',
            'Horarius actúa como capa tecnológica de atención y no sustituye la responsabilidad del establecimiento por el servicio prestado, la disponibilidad ofrecida o la comunicación comercial mantenida con el cliente final.',
          ],
        },
        {
          title: '4. Disponibilidad, integraciones y límites operativos',
          paragraphs: [
            'Horarius busca operar con alta disponibilidad, pero el servicio puede depender de terceros como proveedores de alojamiento, infraestructura, conectividad a internet e integraciones con APIs externas, incluido WhatsApp.',
            'Inestabilidades, indisponibilidades temporales, retrasos en mensajes, limitaciones de terceros o fallas de configuración pueden afectar la operación y no constituyen garantía de funcionamiento ininterrumpido o libre de errores.',
          ],
          list: [
            'Las integraciones externas pueden cambiar sus reglas, límites, precios, disponibilidad técnica y políticas de uso sin control directo de Horarius.',
            'El establecimiento debe mantener procedimientos mínimos de verificación para agendas críticas, especialmente durante la implantación, cambios de reglas o períodos de alta demanda.',
            'Horarius puede realizar mantenimientos, mejoras técnicas y ajustes operativos para preservar la seguridad, el rendimiento y la continuidad del servicio.',
          ],
        },
        {
          title: '5. Limitación de responsabilidad',
          paragraphs: [
            'Horarius ofrece una solución de software y automatización operativa. No garantizamos aumento de ingresos, ocupación total de la agenda, una conversión comercial específica ni la eliminación completa de ausencias, cancelaciones o errores humanos.',
            'En la medida permitida por la legislación aplicable, Horarius no será responsable por pérdidas indirectas, lucro cesante, daños derivados de información incorrecta proporcionada por el establecimiento, uso indebido de la plataforma, fallas de terceros o indisponibilidad de canales externos.',
          ],
        },
        {
          title: '6. Propiedad intelectual y uso permitido',
          paragraphs: [
            'Todo el software, contenido, identidad visual, flujos, textos, interfaces, marcas y elementos tecnológicos de Horarius permanecen bajo titularidad de Horarius o de sus licenciantes, según corresponda.',
            'Queda prohibido copiar, distribuir, modificar, revender, crear obras derivadas, realizar ingeniería inversa o explotar comercialmente la plataforma fuera de los usos expresamente autorizados por escrito.',
          ],
        },
        {
          title: '7. Suspensión, cancelación y finalización',
          paragraphs: [
            'El acceso puede ser suspendido o finalizado en caso de uso ilícito, incumplimiento de estos términos, fraude, intento de acceso no autorizado, riesgo para la seguridad de la plataforma, incumplimiento contractual o uso que comprometa a terceros o a otros clientes.',
            'El establecimiento también puede solicitar la finalización del servicio, sujeto a las obligaciones contractuales pendientes, plazos operativos de desconexión y requisitos aplicables de retención de datos.',
          ],
        },
        {
          title: '8. Cambios en estos términos',
          paragraphs: [
            'Horarius puede actualizar estos Términos del Servicio para reflejar cambios en el producto, las integraciones, los modelos comerciales o las exigencias legales y regulatorias.',
            'Cuando existan cambios relevantes, la versión actualizada podrá publicarse en esta página y comunicarse por los canales de la plataforma disponibles en ese momento.',
          ],
        },
        {
          title: '9. Contacto',
          paragraphs: [
            'Si tienes preguntas sobre estos Términos del Servicio o necesitas tratar asuntos relacionados con el uso de la plataforma, contáctanos:',
          ],
          contactInfo: [
            { label: 'Correo electrónico', value: contactEmail, href: `mailto:${contactEmail}` },
            { label: 'Aplicación', value: 'Horarius' },
          ],
        },
      ],
    },
  },
};
