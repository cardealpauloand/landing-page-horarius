import { siteContent, type Language } from '../content/landingContent';
import Reveal from './Reveal';
import './HowItWorks.css';

interface HowItWorksProps {
  language: Language;
}

const HowItWorks = ({ language }: HowItWorksProps) => {
  const howItWorks = siteContent[language].howItWorks;

  return (
    <section id="how-it-works" className="how-it-works section">
      <div className="container">
        <Reveal className="section-intro how-it-works-intro">
          <span className="eyebrow">{howItWorks.eyebrow}</span>
          <h2 className="section-title">{howItWorks.title}</h2>
          <p className="section-description">{howItWorks.description}</p>
        </Reveal>

        <div className="how-it-works-layout">
          <div className="steps-container">
            <div className="steps-line"></div>
            {howItWorks.steps.map((step, index) => (
              <Reveal key={step.number} className="step-card" delay={index * 90}>
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="conversation-board surface-card" delay={120}>
            <div className="conversation-board-header">
              <div>
                <span className="eyebrow">{howItWorks.exampleEyebrow}</span>
                <h3>{howItWorks.exampleTitle}</h3>
              </div>
              <span className="conversation-status">{howItWorks.status}</span>
            </div>

            <div className="conversation-thread">
              {howItWorks.messages.map((message) => (
                <div
                  key={message.text}
                  className={`conversation-bubble conversation-bubble-${message.role}`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="conversation-summary">
              {howItWorks.summary.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
