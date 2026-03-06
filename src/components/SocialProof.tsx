import { siteContent, type Language } from '../content/landingContent';
import Reveal from './Reveal';
import './SocialProof.css';

interface SocialProofProps {
  language: Language;
}

const SocialProof = ({ language }: SocialProofProps) => {
  const socialProof = siteContent[language].socialProof;

  return (
    <section className="social-proof">
      <div className="container social-proof-container">
        <Reveal className="social-proof-summary">
          <span className="eyebrow">{socialProof.eyebrow}</span>
          <h2>{socialProof.title}</h2>
        </Reveal>

        <Reveal className="social-proof-pills" delay={80}>
          {socialProof.pills.map((item) => (
            <span key={item} className="social-proof-pill">
              {item}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default SocialProof;
