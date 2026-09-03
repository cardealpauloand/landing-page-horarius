import type { Language, LandingContent } from '../types';

/* Seção 3D "Uma IA. Infinitas identidades.": narrativa centrada em celulares
   — um atendimento genérico atravessa o Horarius e vira a identidade de cada
   negócio. As etapas viram legendas sincronizadas ao scroll; as marcas são o
   MESMO elenco fictício da demo do hero (coerência: o 3D escala a história
   que o celular do hero já insinua). A ordem de `brands` é fixa — barbearia,
   studio, clínica, pet — e casa com o mapa de cores por índice em
   brandStoryShared.ts (IDENTITY_HUES). `title` e `tagline` são asseridos no
   HTML estático por scripts/seo.e2e.mjs — não mude sem atualizar o teste. */
export const brandStory: Record<Language, LandingContent['brandStory']> = {
  pt: {
    eyebrow: 'Identidade',
    title: 'O atendimento com a cara do seu negócio',
    description:
      'IA genérica responde como robô — igual para todo mundo. Role e veja o Horarius transformar um atendimento qualquer em uma extensão da sua marca.',
    visualLabel:
      'Animação: um atendimento genérico atravessa o Horarius e ganha a identidade de cada negócio — barbearia, estética, clínica e pet shop',
    stages: [
      {
        title: 'Toda IA de atendimento parece igual.',
        caption: 'Mesmas respostas. Mesmo tom. Nenhuma cara.',
      },
      {
        title: 'Seu cliente não sente diferença.',
        caption: 'Atendimento genérico apaga a sua marca da conversa.',
      },
      {
        title: 'O Horarius aprende a sua marca.',
        caption: 'Tom de voz, serviços, jeito de atender — tudo seu.',
      },
      {
        title: 'Agora ela é sua.',
      },
    ],
    tagline: 'Uma IA. Infinitas identidades.',
    taglineAccent: 'Infinitas',
    taglineNote: 'O Horarius atende com a cara do seu negócio — seja ele qual for.',
    chatStatus: 'Online agora',
    chatPlaceholder: 'Mensagem',
    genericChat: {
      name: 'Atendimento',
      clientMessage: 'Oi, queria agendar um horário.',
      replyMessage: 'Claro. Informe o dia desejado.',
      time: '09:12',
    },
    brands: [
      {
        name: 'Barbearia Aurora',
        clientMessage: 'Fala! Tem horário pro corte amanhã?',
        replyMessage:
          'Fala, Rafa! Bora deixar o corte na régua? Tenho 16:30 com o Lucas amanhã. Fechou?',
        time: '16:04',
      },
      {
        name: 'Studio Bela Pele',
        clientMessage: 'Oi! Queria cuidar da pele essa semana.',
        replyMessage:
          'Oi, Ana! Quinta às 10h tenho limpeza de pele com a Carla. Sua pele agradece ✨',
        time: '10:37',
      },
      {
        name: 'Sorriso Odonto',
        clientMessage: 'Preciso marcar uma avaliação.',
        replyMessage:
          'Olá, Marcos! Tenho terça às 10h com a Dra. Paula. Confirmo sua avaliação?',
        time: '11:26',
      },
      {
        name: 'Pet Amigo Fiel',
        clientMessage: 'O Thor tá precisando de banho 🐶',
        replyMessage:
          'Oba, o Thor por aqui! 🐾 Tenho banho e tosa sábado às 9h. Confirmo pra ele?',
        time: '15:48',
      },
    ],
  },
  en: {
    eyebrow: 'Identity',
    title: 'Service with your business written all over it',
    description:
      'Generic AI sounds like a robot — the same for everyone. Scroll and watch Horarius turn a generic front desk into an extension of your brand.',
    visualLabel:
      'Animation: a generic conversation passes through Horarius and takes on each business’s identity — barbershop, skincare, dental and pet care',
    stages: [
      {
        title: 'Every AI receptionist looks the same.',
        caption: 'Same answers. Same tone. No face.',
      },
      {
        title: 'Your customer can’t tell the difference.',
        caption: 'Generic service erases your brand from the conversation.',
      },
      {
        title: 'Horarius learns your brand.',
        caption: 'Tone of voice, services, way of serving — all yours.',
      },
      {
        title: 'Now it’s yours.',
      },
    ],
    tagline: 'One AI. Infinite identities.',
    taglineAccent: 'Infinite',
    taglineNote: 'Horarius answers with the face of your business — whatever it is.',
    chatStatus: 'Online now',
    chatPlaceholder: 'Message',
    genericChat: {
      name: 'Support',
      clientMessage: 'Hi, I’d like to book an appointment.',
      replyMessage: 'Sure. What day works for you?',
      time: '9:12 am',
    },
    brands: [
      {
        name: 'Aurora Barbers',
        clientMessage: 'Hey! Any slots for a haircut tomorrow?',
        replyMessage:
          'Hey Rafa! Ready to keep that fade sharp? I have 4:30 pm with Lucas tomorrow. Deal?',
        time: '4:04 pm',
      },
      {
        name: 'Pure Skin Studio',
        clientMessage: 'Hi! I’d love a skincare session this week.',
        replyMessage:
          'Hi Ana! Thursday at 10 am I have a deep cleanse with Carla. Your skin will thank you ✨',
        time: '10:37 am',
      },
      {
        name: 'Sunrise Dental',
        clientMessage: 'I need to book a check-up.',
        replyMessage:
          'Hello Marcos! I have Tuesday at 10 am with Dr. Paula. Shall I confirm your check-up?',
        time: '11:26 am',
      },
      {
        name: 'Happy Paws Pets',
        clientMessage: 'Thor really needs a bath 🐶',
        replyMessage:
          'Yay, Thor’s here! 🐾 I have bath & grooming Saturday at 9 am. Book it for him?',
        time: '3:48 pm',
      },
    ],
  },
  es: {
    eyebrow: 'Identidad',
    title: 'Atención con la cara de tu negocio',
    description:
      'La IA genérica responde como robot — igual para todos. Desplázate y mira cómo Horarius convierte una atención cualquiera en una extensión de tu marca.',
    visualLabel:
      'Animación: una atención genérica atraviesa Horarius y toma la identidad de cada negocio — barbería, estética, clínica y mascotas',
    stages: [
      {
        title: 'Toda IA de atención parece igual.',
        caption: 'Mismas respuestas. Mismo tono. Ninguna cara.',
      },
      {
        title: 'Tu cliente no nota la diferencia.',
        caption: 'La atención genérica borra tu marca de la conversación.',
      },
      {
        title: 'Horarius aprende tu marca.',
        caption: 'Tono de voz, servicios, forma de atender — todo tuyo.',
      },
      {
        title: 'Ahora es tuya.',
      },
    ],
    tagline: 'Una IA. Infinitas identidades.',
    taglineAccent: 'Infinitas',
    taglineNote: 'Horarius atiende con la cara de tu negocio — sea cual sea.',
    chatStatus: 'En línea',
    chatPlaceholder: 'Mensaje',
    genericChat: {
      name: 'Atención',
      clientMessage: 'Hola, quisiera agendar una cita.',
      replyMessage: 'Claro. Indique el día deseado.',
      time: '09:12',
    },
    brands: [
      {
        name: 'Barbería Aurora',
        clientMessage: '¡Hola! ¿Hay horario para un corte mañana?',
        replyMessage:
          '¡Hola, Rafa! ¿Dejamos ese corte impecable? Tengo 16:30 con Lucas mañana. ¿Lo cierro?',
        time: '16:04',
      },
      {
        name: 'Studio Piel Viva',
        clientMessage: '¡Hola! Quiero cuidar mi piel esta semana.',
        replyMessage:
          '¡Hola, Ana! El jueves a las 10h tengo limpieza facial con Carla. Tu piel lo agradece ✨',
        time: '10:37',
      },
      {
        name: 'Dental Sonrisa',
        clientMessage: 'Necesito agendar una evaluación.',
        replyMessage:
          '¡Hola, Marcos! Tengo el martes a las 10h con la Dra. Paula. ¿Confirmo tu evaluación?',
        time: '11:26',
      },
      {
        name: 'Huellas Felices',
        clientMessage: 'Thor necesita un baño 🐶',
        replyMessage:
          '¡Thor por aquí! 🐾 Tengo baño y corte el sábado a las 9h. ¿Lo agendo?',
        time: '15:48',
      },
    ],
  },
};
