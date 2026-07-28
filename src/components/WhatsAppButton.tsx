import {
  getWhatsappHref,
  siteContent,
  type Language,
} from '../content/landingContent';
import { IconWhatsapp } from './icons/logos';
import './WhatsAppButton.css';

interface WhatsAppButtonProps {
  language: Language;
}

const WhatsAppButton = ({ language }: WhatsAppButtonProps) => {
  const whatsappButton = siteContent[language].whatsappButton;

  return (
    <a
      href={getWhatsappHref(language, 'floating')}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label={whatsappButton.ariaLabel}
    >
      <span className="whatsapp-button-copy">
        <strong>{whatsappButton.label}</strong>
        <span>{whatsappButton.sublabel}</span>
      </span>
      <IconWhatsapp className="whatsapp-icon" />
    </a>
  );
};

export default WhatsAppButton;
