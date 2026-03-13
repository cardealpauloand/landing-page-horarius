import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import {
  getWhatsappHref,
  languageOptions,
  siteContent,
  type Language,
} from '../content/landingContent';
import { buildSectionHref } from '../seo/siteRoutes';
import './Header.css';

interface HeaderProps {
  homePath: string;
  isHomePage: boolean;
  language: Language;
  navigateTo: (path: string) => void;
  onLanguageChange: (language: Language) => void;
  scrollToSection: (sectionId: string) => void;
}

const Header = ({
  homePath,
  isHomePage,
  language,
  navigateTo,
  onLanguageChange,
  scrollToSection,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const headerContent = siteContent[language].header;
  const currentLanguageLabel =
    languageOptions.find((option) => option.code === language)?.label ?? language.toUpperCase();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: globalThis.MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  const handleLogoClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo(homePath);
  };

  const handleCtaClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      return;
    }

    event.preventDefault();
    navigateTo(homePath);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <a href={homePath} className="brand-mark" onClick={handleLogoClick} aria-label="Horarius">
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
                href={buildSectionHref(language, item.sectionId)}
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
                onClick={() => {
                  onLanguageChange(option.code);
                  setIsLanguageMenuOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div
            ref={languageMenuRef}
            className={`mobile-language-menu ${isLanguageMenuOpen ? 'mobile-language-menu-open' : ''}`}
          >
            <button
              type="button"
              className="mobile-language-trigger"
              aria-label={headerContent.languageAriaLabel}
              aria-haspopup="menu"
              aria-expanded={isLanguageMenuOpen}
              onClick={() => setIsLanguageMenuOpen((current) => !current)}
            >
              <span>{currentLanguageLabel}</span>
            </button>

            <div className="mobile-language-dropdown" role="menu" aria-label={headerContent.languageAriaLabel}>
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={language === option.code}
                  className={`mobile-language-option ${language === option.code ? 'mobile-language-option-active' : ''}`}
                  onClick={() => {
                    onLanguageChange(option.code);
                    setIsLanguageMenuOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <a
            href={isHomePage ? getWhatsappHref(language, 'primary') : homePath}
            target={isHomePage ? '_blank' : undefined}
            rel={isHomePage ? 'noopener noreferrer' : undefined}
            className="btn-primary header-cta"
            onClick={handleCtaClick}
          >
            <span className="header-cta-label">
              {isHomePage ? headerContent.ctaLabel : headerContent.backLabel}
            </span>
            <span className="header-cta-label-compact">
              {isHomePage ? headerContent.ctaCompactLabel : headerContent.backCompactLabel}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
