import { siteContent, type Language } from '../content/landingContent';
import Reveal from './Reveal';
import './FAQ.css';

interface FAQProps {
  language: Language;
}

const FAQ = ({ language }: FAQProps) => {
  const faq = siteContent[language].faq;

  return (
    <section id="faq" className="faq section">
      <div className="container faq-container">
        <Reveal className="section-intro faq-intro">
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2 className="section-title">{faq.title}</h2>
          <p className="section-description">{faq.description}</p>
        </Reveal>

        <div className="faq-list">
          {faq.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <details className="faq-item surface-card">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
