import {
  getBusinessSignupHref,
  siteContent,
  type Language,
} from '../content/landingContent';
import Reveal from './Reveal';
import { useTypewriter } from './useTypewriter';
import './Hero.css';

interface HeroProps {
  language: Language;
  howItWorksHref: string;
}

const Hero = ({ language, howItWorksHref }: HeroProps) => {
  const hero = siteContent[language].hero;
  const typedAccent = useTypewriter(hero.titleAccentRotating);
  // Frase mais longa do ciclo: dimensiona (invisível) o bloco verde para a
  // altura máxima, para a página não pular quando as frases trocam.
  const accentSizer = hero.titleAccentRotating.reduce(
    (longest, phrase) => (phrase.length > longest.length ? phrase : longest),
    '',
  );

  return (
    <section className="hero section">
      <div className="container hero-container">
        <Reveal className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          {/* O texto semântico do h1 é a frase completa em sr-only — estável no
              DOM para SEO e leitores de tela. O bloco animado (typewriter) é
              puramente visual e fica aria-hidden, sem duplicar a leitura. */}
          <h1 className="hero-title">
            <span className="sr-only">{hero.titleFull}</span>
            <span aria-hidden="true">
              {hero.title}
              <span className="hero-title-accent">
                <span className="hero-title-accent-sizer">{accentSizer}</span>
                <span className="hero-title-accent-typed">
                  {typedAccent}
                  <span className="hero-title-caret" />
                </span>
              </span>
            </span>
          </h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <div className="button-group hero-actions">
            <a
              href={getBusinessSignupHref(language)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {hero.primaryCta}
            </a>
            <a href={howItWorksHref} className="btn-secondary">
              {hero.secondaryCta}
            </a>
          </div>
          <div className="hero-metrics">
            {hero.metrics.map((metric) => (
              <div key={metric.value} className="hero-metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="hero-showcase" delay={120}>
          <div className="hero-phone surface-card">
            <div className="hero-phone-bar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="hero-conversation">
              <div className="hero-message hero-message-incoming">{hero.messages[0].text}</div>
              <div className="hero-message hero-message-outgoing">{hero.messages[1].text}</div>
              <div className="hero-selector">
                <div className="hero-selector-header">
                  <strong>{hero.selectorTitle}</strong>
                  <span>{hero.selectorLabel}</span>
                </div>
                <div className="hero-selector-options">
                  {hero.selectorOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={option === hero.selectorOptions[1] ? 'hero-selector-active' : ''}
                    >
                      <span>{option}</span>
                      {option === hero.selectorOptions[1] ? (
                        <span className="hero-selector-check" aria-hidden="true">
                          ✓
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
                <p className="hero-selector-hint">{hero.selectorHint}</p>
              </div>
              <div className="hero-message hero-message-confirmation">{hero.messages[2].text}</div>
            </div>
          </div>

          <div className="hero-supporting-cards">
            <div className="hero-side hero-side-start">
              <div className="hero-notice surface-card">
                <span className="hero-notice-label">{hero.noticeLabel}</span>
                <p>{hero.noticeText}</p>
              </div>
            </div>

            <div className="hero-side hero-side-end">
              <div className="hero-kicker surface-card">
                <span className="hero-kicker-value">{hero.kickerValue}</span>
                <span className="hero-kicker-text">{hero.kickerText}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
