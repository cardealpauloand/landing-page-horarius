import {
  getBusinessSignupHref,
  siteContent,
  type Language,
} from '../content/landingContent';
import HeroPhone from './HeroPhone';
import Reveal from './Reveal';
import './Hero.css';

interface HeroProps {
  language: Language;
  howItWorksHref: string;
}

const Hero = ({ language, howItWorksHref }: HeroProps) => {
  const hero = siteContent[language].hero;

  return (
    <section className="hero section">
      <div className="container hero-container">
        <Reveal className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          {/* Título 100% estático e visível — sem typewriter, sem sr-only.
              A única coisa que se move no hero é a demo do celular; o crawler
              vê exatamente o que o usuário vê. */}
          <h1 className="hero-title">
            {hero.title}{' '}
            <span className="hero-title-accent">{hero.titleAccent}</span>
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
          <HeroPhone hero={hero} />

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
