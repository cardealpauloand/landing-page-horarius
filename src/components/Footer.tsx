import React from 'react';
import './Footer.css';
import logo from '../assets/horarius-logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="Logo Horarius" className="logo-sm" />
              <span>Horarius</span>
            </div>
            <p className="footer-tagline">
              O assistente de IA que impulsiona sua automação de agendamentos. 
              Disponível 24/7 no WhatsApp.
            </p>
            <div className="footer-contact" style={{ marginTop: '1.5rem' }}>
              <a href="mailto:contato.horarius@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                contato.horarius@gmail.com
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Produto</h4>
            <ul>
              <li><a href="#features">Funcionalidades</a></li>
              <li><a href="#how-it-works">Como Funciona</a></li>
              <li><a href="#">Preços</a></li>
              <li><a href="#">Vitrine</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Termos de Serviço</a></li>
              <li><a href="#">Política de Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Horarius. Todos os direitos reservados.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
