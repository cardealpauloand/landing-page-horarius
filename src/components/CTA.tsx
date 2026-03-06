import {
  getWhatsappHref,
  siteContent,
  type Language,
} from '../content/landingContent';
import Reveal from './Reveal';
import './CTA.css';

interface CTAProps {
  language: Language;
}

const CTA = ({ language }: CTAProps) => {
  const cta = siteContent[language].cta;

  return (
    <section className="cta-section section">
      <div className="container cta-container">
        <Reveal className="cta-content surface-card">
          <span className="eyebrow">{cta.eyebrow}</span>
          <h2 className="cta-title">{cta.title}</h2>
          <p className="cta-subtitle">{cta.description}</p>
          <div className="button-group cta-buttons">
            <a
              href={getWhatsappHref(language, 'primary')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {cta.primaryCta}
            </a>
            <a
              href={getWhatsappHref(language, 'sales')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              {cta.secondaryCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTA;
