import { siteContent, type Language } from '../content/landingContent';
import LegalDocument from './LegalDocument';

interface TermsOfServiceProps {
  language: Language;
}

const TermsOfService = ({ language }: TermsOfServiceProps) => (
  <LegalDocument content={siteContent[language].terms} />
);

export default TermsOfService;
