import { siteContent, type Language } from '../content/landingContent';
import { getLocalizedPagePath } from '../seo/siteRoutes';
import Reveal from './Reveal';
import './ClientCallout.css';

interface ClientCalloutProps {
  language: Language;
  navigateTo: (path: string) => void;
}

/**
 * Seção curta na home (B2B) apontando o visitante que é CLIENTE FINAL para a
 * página dedicada /para-voce — a home continua vendendo para negócios.
 */
const ClientCallout = ({ language, navigateTo }: ClientCalloutProps) => {
  const content = siteContent[language].clientCallout;
  const clientPath = getLocalizedPagePath(language, 'client');

  return (
    <section className="client-callout section" id="para-voce">
      <div className="container">
        <Reveal className="client-callout-card surface-card">
          <div className="client-callout-copy">
            <span className="eyebrow">{content.eyebrow}</span>
            <h2 className="client-callout-title">{content.title}</h2>
            <p className="client-callout-description">{content.description}</p>
          </div>
          <a
            href={clientPath}
            className="btn-secondary client-callout-cta"
            onClick={(event) => {
              event.preventDefault();
              navigateTo(clientPath);
            }}
          >
            {content.ctaLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default ClientCallout;
