import type { Language, LandingContent } from '../types';

export const segments: Record<Language, LandingContent['segments']> = {
  pt: {
    eyebrow: 'Segmentos atendidos',
    title: 'Feito para o seu tipo de negócio',
    description:
      'O Horarius atende operações que precisam responder rápido, manter contexto e organizar disponibilidade sem depender de improviso. Os principais segmentos têm página própria, com as dores e as soluções do nicho.',
    itemLinkLabel: 'Ver página completa',
    items: [
      {
        icon: 'scissors',
        title: 'Barbearias',
        description:
          'A IA atende o WhatsApp enquanto você corta: agenda, confirma e preenche o horário de quem cancelou.',
        segment: 'barbershops',
        photo: 'barbershops',
        imageAlt: 'Barbeiro finalizando o corte de um cliente na cadeira da barbearia',
      },
      {
        icon: 'sparkles',
        title: 'Salões de beleza',
        description:
          'Várias profissionais, durações diferentes e clientes que somem — agenda organizada e campanhas de retorno.',
        segment: 'salons',
        photo: 'salons',
        imageAlt: 'Cabeleireira escovando o cabelo de uma cliente no salão de beleza',
      },
      {
        icon: 'flower',
        title: 'Clínicas de estética',
        description:
          'Sessões confirmadas, faltas controladas e retorno pós-procedimento na hora certa, com planos para pacotes.',
        segment: 'aesthetics',
        photo: 'aesthetics',
        imageAlt: 'Esteticista aplicando um procedimento facial em uma cliente na maca',
      },
      {
        icon: 'hand',
        title: 'Esmalterias',
        description:
          'Serviços curtos e agenda cheia o dia todo: encaixes automáticos, lembretes e as clientes fixas voltando na semana certa.',
        segment: 'nails',
        photo: 'nails',
        imageAlt: 'Manicure lixando as unhas de uma cliente na esmalteria',
      },
      {
        icon: 'eye',
        title: 'Sobrancelhas e cílios',
        description:
          'Manutenção tem hora certa: o retorno é agendado na janela ideal e a recorrência vira faturamento previsível.',
        segment: 'brows',
        photo: 'brows',
        imageAlt: 'Profissional aplicando extensão de cílios em uma cliente deitada na maca',
      },
      {
        icon: 'massage',
        title: 'Massagem e terapias',
        description:
          'Sessões longas sem buraco na agenda: confirmação antecipada, lista de espera e pacotes com sessões recorrentes.',
        segment: 'massage',
        photo: 'massage',
        imageAlt: 'Massagista massageando as costas de uma cliente deitada na maca',
      },
    ],
  },
  en: {
    eyebrow: 'Supported segments',
    title: 'Built for your kind of business',
    description:
      'Horarius serves operations that need to answer quickly, keep context, and organize availability without relying on improvisation. The main segments have their own page, with the pains and solutions of each niche.',
    itemLinkLabel: 'See the full page',
    items: [
      {
        icon: 'scissors',
        title: 'Barbershops',
        description:
          'The AI answers WhatsApp while you cut: it books, confirms and refills the slot when someone cancels.',
        segment: 'barbershops',
        photo: 'barbershops',
        imageAlt: 'Barber finishing a client\'s haircut in the barbershop chair',
      },
      {
        icon: 'sparkles',
        title: 'Beauty salons',
        description:
          'Several professionals, different durations and clients who vanish — an organized calendar plus win-back campaigns.',
        segment: 'salons',
        photo: 'salons',
        imageAlt: 'Hairstylist blow-drying a client\'s hair at the beauty salon',
      },
      {
        icon: 'flower',
        title: 'Aesthetic clinics',
        description:
          'Confirmed sessions, no-shows under control and post-procedure follow-ups on time, with plans for packages.',
        segment: 'aesthetics',
        photo: 'aesthetics',
        imageAlt: 'Aesthetician performing a facial treatment on a client',
      },
      {
        icon: 'hand',
        title: 'Nail salons',
        description:
          'Short services and a full day: automatic fill-ins, reminders and regulars coming back on the right week.',
        segment: 'nails',
        photo: 'nails',
        imageAlt: 'Manicurist filing a client\'s nails at the nail salon',
      },
      {
        icon: 'eye',
        title: 'Brows and lashes',
        description:
          'Touch-ups have a right moment: the return is booked in the ideal window and recurrence turns into predictable revenue.',
        segment: 'brows',
        photo: 'brows',
        imageAlt: 'Technician applying lash extensions to a client lying on the bed',
      },
      {
        icon: 'massage',
        title: 'Massage and therapies',
        description:
          'Long sessions with no gaps: early confirmation, a waitlist and packages with recurring sessions.',
        segment: 'massage',
        photo: 'massage',
        imageAlt: 'Massage therapist working on a client\'s back on the massage table',
      },
    ],
  },
  es: {
    eyebrow: 'Segmentos atendidos',
    title: 'Hecho para tu tipo de negocio',
    description:
      'Horarius atiende operaciones que necesitan responder rápido, mantener contexto y organizar disponibilidad sin depender de improvisación. Los segmentos principales tienen página propia, con los dolores y las soluciones de cada nicho.',
    itemLinkLabel: 'Ver la página completa',
    items: [
      {
        icon: 'scissors',
        title: 'Barberías',
        description:
          'La IA atiende WhatsApp mientras cortas: agenda, confirma y vuelve a llenar el horario cuando alguien cancela.',
        segment: 'barbershops',
        photo: 'barbershops',
        imageAlt: 'Barbero terminando el corte de un cliente en la silla de la barbería',
      },
      {
        icon: 'sparkles',
        title: 'Salones de belleza',
        description:
          'Varias profesionales, duraciones distintas y clientas que desaparecen — agenda organizada y campañas de regreso.',
        segment: 'salons',
        photo: 'salons',
        imageAlt: 'Peluquera secando el cabello de una clienta en el salón de belleza',
      },
      {
        icon: 'flower',
        title: 'Clínicas de estética',
        description:
          'Sesiones confirmadas, ausencias bajo control y seguimiento post-procedimiento a tiempo, con planes para paquetes.',
        segment: 'aesthetics',
        photo: 'aesthetics',
        imageAlt: 'Esteticista aplicando un tratamiento facial a una clienta',
      },
      {
        icon: 'hand',
        title: 'Esmalterías',
        description:
          'Servicios cortos y agenda llena todo el día: encajes automáticos, recordatorios y clientas fijas que vuelven en la semana correcta.',
        segment: 'nails',
        photo: 'nails',
        imageAlt: 'Manicurista limando las uñas de una clienta en la esmaltería',
      },
      {
        icon: 'eye',
        title: 'Cejas y pestañas',
        description:
          'El retoque tiene su momento: el regreso se agenda en la ventana ideal y la recurrencia se vuelve facturación previsible.',
        segment: 'brows',
        photo: 'brows',
        imageAlt: 'Profesional aplicando extensiones de pestañas a una clienta acostada en la camilla',
      },
      {
        icon: 'massage',
        title: 'Masajes y terapias',
        description:
          'Sesiones largas sin huecos en la agenda: confirmación anticipada, lista de espera y paquetes con sesiones recurrentes.',
        segment: 'massage',
        photo: 'massage',
        imageAlt: 'Masajista trabajando la espalda de una clienta en la camilla',
      },
    ],
  },
};
