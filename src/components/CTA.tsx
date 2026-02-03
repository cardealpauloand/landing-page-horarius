import React from 'react';
import './CTA.css';

const CTA: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Pronto para automatizar sua agenda?</h2>
          <p className="cta-subtitle">Junte-se a centenas de empresas usando IA para economizar tempo e aumentar agendamentos.</p>
          <div className="cta-buttons">
            <a href="https://wa.me/5544988657557?text=Ol%C3%A1!%20Gostaria%20de%20come%C3%A7ar%20agora." target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">Começar Agora</a>
            <a href="https://wa.me/5544988657557?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20vendas." target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">Falar com Vendas</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
