import { siteContent, type Language } from '../content/landingContent';
import LegalDocument from './LegalDocument';

interface PrivacyPolicyProps {
  language: Language;
}

const PrivacyPolicy = ({ language }: PrivacyPolicyProps) => (
  <LegalDocument content={siteContent[language].privacy} />
);

export default PrivacyPolicy;
