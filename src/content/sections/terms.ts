import { contactEmail } from '../config';
import type { Language, LegalDocumentContent } from '../types';

export const terms: Record<Language, LegalDocumentContent> = {
  pt: {
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
  en: {
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
  es: {
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
};
