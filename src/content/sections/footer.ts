import type { Language, LandingContent } from '../types';

export const footer: Record<Language, LandingContent['footer']> = {
  pt: {
    copyright: 'Todos os direitos reservados.',
    tagline:
      'Atendimento, confirmação e organização da agenda em um fluxo mais sofisticado para negócios que vendem por horário.',
    navigationTitle: 'Navegação',
    solutionsTitle: 'Soluções',
    solutionsLabels: {
      barbershops: 'Barbearias',
      salons: 'Salões de beleza',
      aesthetics: 'Clínicas de estética',
      pets: 'Pet shops',
      nails: 'Esmalterias',
      brows: 'Sobrancelhas e cílios',
      massage: 'Massagem e terapias',
    },
    legalTitle: 'Legal',
    privacyLabel: 'Política de Privacidade',
    termsLabel: 'Termos de Serviço',
    whatsappLabel: 'Conversar no WhatsApp',
    bottomRight: 'Feito para operações que precisam de uma agenda previsível.',
  },
  en: {
    copyright: 'All rights reserved.',
    tagline:
      'Service, confirmations, and schedule organization in a more sophisticated flow for businesses that sell by the hour.',
    navigationTitle: 'Navigation',
    solutionsTitle: 'Solutions',
    solutionsLabels: {
      barbershops: 'Barbershops',
      salons: 'Beauty salons',
      aesthetics: 'Aesthetic clinics',
      pets: 'Pet shops',
      nails: 'Nail salons',
      brows: 'Brows and lashes',
      massage: 'Massage and therapies',
    },
    legalTitle: 'Legal',
    privacyLabel: 'Privacy Policy',
    termsLabel: 'Terms of Service',
    whatsappLabel: 'Chat on WhatsApp',
    bottomRight: 'Built for operations that need a predictable schedule.',
  },
  es: {
    copyright: 'Todos los derechos reservados.',
    tagline:
      'Atención, confirmación y organización de la agenda en un flujo más sofisticado para negocios que venden por horario.',
    navigationTitle: 'Navegación',
    solutionsTitle: 'Soluciones',
    solutionsLabels: {
      barbershops: 'Barberías',
      salons: 'Salones de belleza',
      aesthetics: 'Clínicas de estética',
      pets: 'Pet shops',
      nails: 'Esmalterías',
      brows: 'Cejas y pestañas',
      massage: 'Masajes y terapias',
    },
    legalTitle: 'Legal',
    privacyLabel: 'Política de Privacidad',
    termsLabel: 'Términos del Servicio',
    whatsappLabel: 'Hablar por WhatsApp',
    bottomRight: 'Hecho para operaciones que necesitan una agenda predecible.',
  },
};
