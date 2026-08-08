import { CircleCheckBig } from 'lucide-react';

import {
  getBusinessSignupHref,
  siteContent,
  type Language,
  type SegmentKey,
} from '../content/landingContent';
import { buildSectionHref } from '../seo/siteRoutes';
import InsideSystem from './insideSystem/InsideSystem';
import './SegmentLanding.css';

interface SegmentLandingProps {
  language: Language;
  segment: SegmentKey;
}

/**
 * Landing page por segmento (/sistema-para-barbearias etc.): funil B2B focado
 * em uma vertical, disputando as buscas "sistema para <nicho>". Mesma entrada
 * CSS pura da página do cliente — conteúdo visível sem esperar hidratação.
 *
 * A página é dividida em duas seções claras com a faixa escura "Por dentro do
 * sistema" no meio (prova de valor antes do FAQ/CTA), com os mockups
 * adaptados à vertical via prop `segment`.
 */
const SegmentLanding = ({ language, segment }: SegmentLandingProps) => {
  const content = siteContent[language].segmentPages[segment];
  const pricingHref = buildSectionHref(language, 'pricing');

  return (
    <>
      <section className="segment-landing section">
        <div className="container segment-landing-container">
          <div className="segment-landing-enter segment-landing-hero surface-card">
            <span className="eyebrow">{content.eyebrow}</span>
            <h1 className="segment-landing-title">
              {content.title}{' '}
              <span className="segment-landing-title-accent">{content.titleAccent}</span>
            </h1>
            <p className="segment-landing-subtitle">{content.subtitle}</p>
            <div className="button-group segment-landing-actions">
              <a
                href={getBusinessSignupHref(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {content.primaryCta}
              </a>
              <a href={pricingHref} className="btn-secondary">
                {content.secondaryCta}
              </a>
            </div>
            <p className="segment-landing-note">{content.ctaNote}</p>
          </div>

          <div className="segment-landing-enter segment-landing-block">
            <h2 className="section-title">{content.painsTitle}</h2>
            <ul className="segment-landing-pains">
              {content.pains.map((pain) => (
                <li key={pain} className="segment-landing-pain surface-card">
                  <CircleCheckBig className="segment-landing-pain-icon" aria-hidden="true" />
                  {pain}
                </li>
              ))}
            </ul>
          </div>

          <div className="segment-landing-enter segment-landing-block">
            <h2 className="section-title">{content.featuresTitle}</h2>
            <div className="segment-landing-features">
              {content.features.map((feature) => (
                <article key={feature.title} className="segment-landing-feature surface-card">
                  <h3 className="segment-landing-feature-title">{feature.title}</h3>
                  <p className="segment-landing-feature-description">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <InsideSystem language={language} segment={segment} />

      <section className="segment-landing segment-landing--tail section">
        <div className="container segment-landing-container">
          <div className="segment-landing-enter segment-landing-block">
            <h2 className="section-title">{content.faqTitle}</h2>
            <div className="segment-landing-faq">
              {content.faq.map((item) => (
                /* Mesmo accordion nativo (details/summary) do FAQ da home — a
                   resposta continua no HTML prerenderizado mesmo fechada. */
                <details key={item.question} className="segment-landing-faq-item surface-card">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="segment-landing-enter segment-landing-cta surface-card">
            <h2 className="segment-landing-cta-title">{content.ctaTitle}</h2>
            <div className="button-group segment-landing-actions">
              <a
                href={getBusinessSignupHref(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {content.primaryCta}
              </a>
              <a href={pricingHref} className="btn-secondary">
                {content.secondaryCta}
              </a>
            </div>
            <p className="segment-landing-note">{content.ctaNote}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SegmentLanding;
