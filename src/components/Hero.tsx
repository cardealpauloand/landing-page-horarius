import React from 'react';
import firstImage from '../assets/photo1.png';

import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Inteligência Artificial para seus <span className="highlight">agendamentos</span>
          </h1>
          <p className="hero-subtitle">
            Automatize seus agendamentos com um assistente de IA dedicado no WhatsApp. 
            Economize tempo, reduza faltas e faça seu negócio crescer 24/7.
          </p>
          <div className="hero-cta">
            <a href="https://wa.me/5544988657557?text=Ol%C3%A1!%20Gostaria%20de%20testar%20gr%C3%A1tis." target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">Teste Grátis</a>
            <a href="https://wa.me/5544988657557?text=Ol%C3%A1!%20Gostaria%20de%20ver%20uma%20demo." target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">Ver Demo</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Disponibilidade</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Automatizado</span>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-glow"></div>
          <img src={firstImage} alt="Interface do App Horarius" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
