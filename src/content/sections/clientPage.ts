import type { Language, LandingContent } from '../types';

export const clientPage: Record<Language, LandingContent['clientPage']> = {
  pt: {
    eyebrow: 'Para você que agenda',
    title: 'Encontre um horário e agende online, sem ligação e sem espera',
    subtitle:
      'Com uma conta grátis no Horarius você descobre barbearias, salões, clínicas e estúdios perto de você, vê os horários livres de verdade e marca em segundos — com confirmação e lembretes no WhatsApp.',
    primaryCta: 'Criar conta grátis',
    secondaryCta: 'Já tenho conta — Entrar',
    stepsTitle: 'Como funciona',
    steps: [
      {
        number: '1',
        title: 'Crie sua conta',
        description:
          'Cadastro rápido com nome, e-mail e WhatsApp — é por ele que as empresas confirmam seus horários.',
      },
      {
        number: '2',
        title: 'Encontre a empresa',
        description:
          'Busque por categoria ou nome, veja fotos, serviços, preços e avaliações de quem já foi.',
      },
      {
        number: '3',
        title: 'Agende e pronto',
        description:
          'Escolha serviço, profissional e horário livre. Remarque ou cancele pelo app quando precisar.',
      },
    ],
    highlightsTitle: 'Por que agendar pelo Horarius',
    highlights: [
      'Horários reais, direto da agenda da empresa — sem “vou verificar e te retorno”.',
      'Seus agendamentos, favoritos e histórico em um só lugar.',
      'Lembretes automáticos para você não perder nenhum horário.',
    ],
    note: 'Prefere o WhatsApp? Sem problema: as empresas que usam o Horarius também atendem e agendam por lá.',
  },
  en: {
    eyebrow: 'For you who books',
    title: 'Find a slot and book online — no phone calls, no waiting',
    subtitle:
      'With a free Horarius account you discover barbershops, salons, clinics, and studios near you, see genuinely open slots, and book in seconds — with WhatsApp confirmations and reminders.',
    primaryCta: 'Create free account',
    secondaryCta: 'I already have an account — Log in',
    stepsTitle: 'How it works',
    steps: [
      {
        number: '1',
        title: 'Create your account',
        description:
          'Quick signup with name, email, and WhatsApp — that is how businesses confirm your appointments.',
      },
      {
        number: '2',
        title: 'Find the business',
        description:
          'Search by category or name, browse photos, services, prices, and reviews from other clients.',
      },
      {
        number: '3',
        title: 'Book and done',
        description:
          'Pick the service, professional, and an open slot. Reschedule or cancel from the app whenever you need.',
      },
    ],
    highlightsTitle: 'Why book through Horarius',
    highlights: [
      'Real availability, straight from the business calendar — no “let me check and get back to you”.',
      'Your appointments, favorites, and history in one place.',
      'Automatic reminders so you never miss an appointment.',
    ],
    note: 'Prefer WhatsApp? No problem: businesses on Horarius also chat and book right there.',
  },
  es: {
    eyebrow: 'Para ti que reservas',
    title: 'Encuentra un horario y reserva online, sin llamadas ni esperas',
    subtitle:
      'Con una cuenta gratis en Horarius descubres barberías, salones, clínicas y estudios cerca de ti, ves los horarios realmente libres y reservas en segundos — con confirmación y recordatorios por WhatsApp.',
    primaryCta: 'Crear cuenta gratis',
    secondaryCta: 'Ya tengo cuenta — Entrar',
    stepsTitle: 'Cómo funciona',
    steps: [
      {
        number: '1',
        title: 'Crea tu cuenta',
        description:
          'Registro rápido con nombre, correo y WhatsApp — por ahí las empresas confirman tus reservas.',
      },
      {
        number: '2',
        title: 'Encuentra el negocio',
        description:
          'Busca por categoría o nombre, mira fotos, servicios, precios y reseñas de otros clientes.',
      },
      {
        number: '3',
        title: 'Reserva y listo',
        description:
          'Elige servicio, profesional y un horario libre. Reprograma o cancela desde la app cuando lo necesites.',
      },
    ],
    highlightsTitle: 'Por qué reservar con Horarius',
    highlights: [
      'Disponibilidad real, directo de la agenda del negocio — sin “déjame revisar y te aviso”.',
      'Tus reservas, favoritos e historial en un solo lugar.',
      'Recordatorios automáticos para que no pierdas ninguna cita.',
    ],
    note: '¿Prefieres WhatsApp? Sin problema: los negocios que usan Horarius también atienden y agendan por ahí.',
  },
};
