import { CheckCheck, CircleCheck } from 'lucide-react';

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
              <span className="conversation-status">
                <span className="conversation-status-dot" aria-hidden="true" />
                {howItWorks.status}
              </span>
            </div>

            <div className="conversation-thread">
              {howItWorks.messages.map((message) => (
                <div
                  key={message.text}
                  className={`conversation-bubble conversation-bubble-${message.role}`}
                >
                  <p>{message.text}</p>
                  {/* Horário + tiques no canto, como no WhatsApp — os tiques só
                      nos balões da IA (o lado "nosso" da conversa). */}
                  <span className="conversation-bubble-meta">
                    {message.time}
                    {message.role === 'assistant' && (
                      <CheckCheck
                        className="conversation-bubble-ticks"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="conversation-confirmation">
              <CircleCheck
                className="conversation-confirmation-icon"
                aria-hidden="true"
              />
              <div className="conversation-summary">
                {howItWorks.summary.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
