import {
  getBusinessSignupHref,
  siteContent,
  type Language,
} from '../content/landingContent';
import HeroPhone from './HeroPhone';
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
          {/* O h1 carrega SÓ a frase completa e estável — é o que crawler e
              leitor de tela recebem. O bloco animado fica fora dele, como irmão
              aria-hidden: dentro do h1, o sizer invisível e o texto sendo
              digitado se emendavam à frase real e o título virava quatro frases
              coladas, com trecho oculto divergindo do visível. */}
          <h1 className="sr-only">{hero.titleFull}</h1>
          <div className="hero-title" aria-hidden="true">
            {hero.title}
            <span className="hero-title-accent">
              <span className="hero-title-accent-sizer">{accentSizer}</span>
              <span className="hero-title-accent-typed">
                {typedAccent}
                <span className="hero-title-caret" />
              </span>
            </span>
          </div>
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
