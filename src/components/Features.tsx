import { siteContent, type Language } from '../content/landingContent';
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
        <Reveal className="section-intro">
          <span className="eyebrow">{benefits.eyebrow}</span>
          <h2 className="section-title">{benefits.title}</h2>
          <p className="section-description">{benefits.description}</p>
        </Reveal>

        <div className="features-grid">
          {benefits.items.map((feature, index) => (
            <Reveal
              key={feature.title}
              className="feature-card surface-card"
              delay={index * 80}
            >
              <span className="feature-eyebrow">{feature.eyebrow}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
