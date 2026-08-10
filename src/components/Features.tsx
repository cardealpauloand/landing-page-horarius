import { Check } from 'lucide-react';

import { siteContent, type Language } from '../content/landingContent';
import BenefitVisual from './BenefitVisual';
import Reveal from './Reveal';
import './Features.css';

interface FeaturesProps {
  language: Language;
}

const Features = ({ language }: FeaturesProps) => {
  const benefits = siteContent[language].benefits;

  return (
    <section id="benefits" className="features section">
      <div className="container">
        {/* Sem intro de seção: o título dela e o do primeiro bloco ficavam
            empilhados dizendo a mesma coisa. Por isso os títulos dos blocos
            são h2 — são o nível de topo daqui, e h3 solto pularia nível. */}
        <div className="features-blocks">
          {benefits.items.map((feature, index) => (
            <Reveal
              key={feature.title}
              /* Ímpares invertem lado no desktop; no mobile a ordem volta a ser
                 sempre texto → tela, senão metade dos blocos abriria pelo
                 mockup e o leitor perderia o fio da copy. */
              className={`feature-block${index % 2 === 1 ? ' feature-block-mirrored' : ''}`}
            >
              <div className="feature-block-copy">
                <span className="feature-eyebrow">{feature.eyebrow}</span>
                <h2 className="feature-title">{feature.title}</h2>
                <p className="feature-description">{feature.description}</p>

                <ul className="feature-bullets">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="feature-bullet">
                      <span className="feature-bullet-mark" aria-hidden="true">
                        <Check />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="feature-block-visual">
                <BenefitVisual kind={feature.visual} visuals={benefits.visuals} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
