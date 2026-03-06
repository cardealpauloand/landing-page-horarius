import { siteContent, type Language } from '../content/landingContent';
import Reveal from './Reveal';
import './Segments.css';

interface SegmentsProps {
  language: Language;
}

const Segments = ({ language }: SegmentsProps) => {
  const segments = siteContent[language].segments;

  return (
    <section id="segments" className="segments section">
      <div className="container">
        <Reveal className="section-intro">
          <span className="eyebrow">{segments.eyebrow}</span>
          <h2 className="section-title">{segments.title}</h2>
          <p className="section-description">{segments.description}</p>
        </Reveal>

        <div className="segments-grid">
          {segments.items.map((segment, index) => (
            <Reveal
              key={segment.title}
              className="segment-card surface-card"
              delay={index * 70}
            >
              <span className="segment-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{segment.title}</h3>
              <p>{segment.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Segments;
