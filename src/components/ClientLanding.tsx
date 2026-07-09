import {
  appLoginHref,
  appRegisterHref,
  siteContent,
  type Language,
} from '../content/landingContent';
import Reveal from './Reveal';
import './ClientLanding.css';

interface ClientLandingProps {
  language: Language;
}

/**
 * Página do cliente final (/para-voce): funil B2C da landing. Os CTAs levam
 * ao app (cadastro de CLIENTE em /register e login) — diferente da home, que
 * vende o SaaS para negócios e aponta para o WhatsApp de vendas.
 */
const ClientLanding = ({ language }: ClientLandingProps) => {
  const content = siteContent[language].clientPage;

  return (
    <section className="client-landing section">
      <div className="container client-landing-container">
        <Reveal className="client-landing-hero surface-card">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1 className="client-landing-title">{content.title}</h1>
          <p className="client-landing-subtitle">{content.subtitle}</p>
          <div className="button-group client-landing-actions">
            <a
              href={appRegisterHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {content.primaryCta}
            </a>
            <a
              href={appLoginHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              {content.secondaryCta}
            </a>
          </div>
          <p className="client-landing-note">{content.note}</p>
        </Reveal>

        <Reveal className="client-landing-block" delay={80}>
          <h2 className="section-title">{content.stepsTitle}</h2>
          <div className="client-landing-steps">
            {content.steps.map((step) => (
              <article key={step.number} className="client-landing-step surface-card">
                <span className="client-landing-step-number" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="client-landing-step-title">{step.title}</h3>
                <p className="client-landing-step-description">{step.description}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="client-landing-block" delay={120}>
          <h2 className="section-title">{content.highlightsTitle}</h2>
          <ul className="client-landing-highlights">
            {content.highlights.map((item) => (
              <li key={item} className="client-landing-highlight surface-card">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default ClientLanding;
