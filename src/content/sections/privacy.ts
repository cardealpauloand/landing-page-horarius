import { contactEmail } from '../config';
import type { Language, LegalDocumentContent } from '../types';

export const privacy: Record<Language, LegalDocumentContent> = {
  pt: {
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
  en: {
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
  es: {
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
};
