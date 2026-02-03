import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    number: "01",
    title: "Contrate o Horarius",
    description: "Cadastre-se e conte-nos sobre seus serviços e disponibilidade."
  },
  {
    number: "02",
    title: "Configuramos a IA",
    description: "Configuramos seu link de agendamento personalizado e assistente dedicado no WhatsApp."
  },
  {
    number: "03",
    title: "Automatize",
    description: "Compartilhe seu número. Clientes conversam com a IA e agendam automaticamente."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <h2 className="section-title">Como <span className="text-highlight">Funciona</span></h2>
        
        <div className="steps-container">
          <div className="steps-line"></div>
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
