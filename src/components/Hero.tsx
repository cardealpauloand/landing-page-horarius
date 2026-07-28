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
        </Reveal>

        {/* Só o aparelho. Métricas, eyebrow e os dois cards de apoio saíram: o
            hero vive do título à esquerda e da demo à direita. */}
        <Reveal className="hero-showcase" delay={120}>
          <HeroPhone hero={hero} />
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
