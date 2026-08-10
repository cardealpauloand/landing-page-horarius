import { useEffect, useRef, type CSSProperties } from 'react';

import { siteContent, type Language } from '../content/landingContent';
import Reveal from './Reveal';
import './HowItWorks.css';

interface HowItWorksProps {
  language: Language;
}

const HowItWorks = ({ language }: HowItWorksProps) => {
  const howItWorks = siteContent[language].howItWorks;
  const stepsRef = useRef<HTMLDivElement | null>(null);

  /* A trilha só "acende" quando a seção entra na tela — é o que transforma
     três passos parados numa sequência. Classe via ref.classList, sem
     setState, para não re-renderizar a seção inteira por causa de animação. */
  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps || typeof window === 'undefined') {
      return undefined;
    }

    const arm = () => steps.classList.add('steps-armed');

    /* Sem IntersectionObserver ou com reduced-motion, arma na hora: o estado
       final é o mesmo, só chega sem o desenho da linha. */
    if (
      typeof window.IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      arm();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          arm();
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 },
    );

    observer.observe(steps);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="how-it-works section">
      <div className="container">
        <Reveal className="section-intro how-it-works-intro">
          <span className="eyebrow">{howItWorks.eyebrow}</span>
          <h2 className="section-title">{howItWorks.title}</h2>
          <p className="section-description">{howItWorks.description}</p>
        </Reveal>

        <div ref={stepsRef} className="steps">
          {/* Trilho contínuo ligando os três marcadores. Decorativo: a ordem
              real já está no 01/02/03 de cada passo. */}
          <div className="steps-track" aria-hidden="true">
            <span className="steps-track-progress" />
          </div>

          {howItWorks.steps.map((step, index) => (
            <Reveal
              key={step.number}
              className="step-card"
              delay={index * 140}
            >
              <span
                className="step-number"
                style={{ '--step-index': index } as CSSProperties}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
