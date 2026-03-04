import React from 'react';
import logo from '../assets/horarius-logo.png';
import './Header.css';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  navigateTo: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, navigateTo }) => {

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigateTo('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateTo('/');
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <a href="/" className="logo-link" onClick={handleLogoClick}>
            <img src={logo} alt="Logo Horarius" className="logo" />
            <span className="logo-text">Horarius</span>
          </a>
        </div>
        <nav className="nav">
          <a href="/#features" className="nav-link" onClick={(e) => handleNavClick(e, 'features')}>Funcionalidades</a>
          <a href="/#how-it-works" className="nav-link" onClick={(e) => handleNavClick(e, 'how-it-works')}>Como Funciona</a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </button>
          <a href="https://wa.me/5544988657557?text=Ol%C3%A1!%20Gostaria%20de%20come%C3%A7ar." target="_blank" rel="noopener noreferrer" className="btn-primary">Começar Agora</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

