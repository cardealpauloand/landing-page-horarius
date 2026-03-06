import { useEffect, useState, type MouseEvent } from 'react';
import {
  getWhatsappHref,
  languageOptions,
  siteContent,
  type Language,
} from '../content/landingContent';
import './Header.css';

interface HeaderProps {
  currentPath: string;
  language: Language;
  navigateTo: (path: string) => void;
  onLanguageChange: (language: Language) => void;
  scrollToSection: (sectionId: string) => void;
}

const Header = ({
  currentPath,
  language,
  navigateTo,
  onLanguageChange,
  scrollToSection,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerContent = siteContent[language].header;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo('/');
  };

  const handleCtaClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (currentPath === '/') {
      return;
    }

    event.preventDefault();
    navigateTo('/');
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <a href="/" className="brand-mark" onClick={handleLogoClick} aria-label="Horarius">
          <span className="brand-mark-badge">H</span>
          <span className="brand-mark-copy">
            <span className="brand-mark-word">Horarius</span>
            <span className="brand-mark-tag">{headerContent.brandTag}</span>
          </span>
        </a>

        <div className="header-controls">
          <nav className="nav">
            {headerContent.navItems.map((item) => (
              <a
                key={item.sectionId}
                href={`/#${item.sectionId}`}
                className="nav-link"
                onClick={(event) => handleNavClick(event, item.sectionId)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div
            className="language-switcher"
            role="group"
            aria-label={headerContent.languageAriaLabel}
          >
            {languageOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                className={`language-button ${language === option.code ? 'language-button-active' : ''}`}
                onClick={() => onLanguageChange(option.code)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <a
            href={currentPath === '/' ? getWhatsappHref(language, 'primary') : '/'}
            target={currentPath === '/' ? '_blank' : undefined}
            rel={currentPath === '/' ? 'noopener noreferrer' : undefined}
            className="btn-primary header-cta"
            onClick={handleCtaClick}
          >
            <span className="header-cta-label">
              {currentPath === '/' ? headerContent.ctaLabel : headerContent.backLabel}
            </span>
            <span className="header-cta-label-compact">
              {currentPath === '/' ? headerContent.ctaCompactLabel : headerContent.backCompactLabel}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
