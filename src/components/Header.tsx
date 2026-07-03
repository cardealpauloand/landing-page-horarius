import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import {
  appLoginHref,
  appRegisterHref,
  languageOptions,
  siteContent,
  type Language,
} from '../content/landingContent';
import { buildSectionHref } from '../seo/siteRoutes';
import horariusLogo from '../assets/horarius-logo.webp';
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
  // false no SSR/prerender: o painel nasce fechado e não pisca no first paint.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const headerContent = siteContent[language].header;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trava o scroll do body enquanto o menu está aberto. Restaurar '' devolve o
  // controle ao stylesheet (body { overflow-x: hidden } do global.css).
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = 'hidden';

    return () => {
      style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Fecha ao redimensionar acima do breakpoint — necessário para soltar o
  // scroll-lock (o CSS sozinho só esconderia o painel).
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1081px)');

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Foco: ao abrir, vai para o primeiro link; ao fechar, volta ao toggle (só
  // se o foco estava dentro do painel — evita roubo de foco no mount).
  useEffect(() => {
    if (isMenuOpen) {
      menuPanelRef.current?.querySelector<HTMLElement>('.menu-panel-link')?.focus();
    } else if (menuPanelRef.current?.contains(document.activeElement)) {
      menuToggleRef.current?.focus();
    }
  }, [isMenuOpen]);

  const handleNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  const handleMenuNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    setIsMenuOpen(false);
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
    <header
      className={`header ${isHomePage ? 'header-home' : ''} ${isScrolled ? 'header-scrolled' : ''}`}
    >
      <div className="container header-container">
        <a href={homePath} className="brand-mark" onClick={handleLogoClick} aria-label="Horarius">
          <img src={horariusLogo} alt="" aria-hidden="true" className="brand-mark-logo" />
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
                onClick={() => onLanguageChange(option.code)}
              >
                {option.label}
              </button>
            ))}
          </div>

          {isHomePage ? (
            <div className="header-actions">
              <a
                href={appLoginHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary header-cta header-cta-login"
              >
                <span className="header-cta-label">{headerContent.ctaLabel}</span>
                <span className="header-cta-label-compact">
                  {headerContent.ctaCompactLabel}
                </span>
              </a>
              <a
                href={appRegisterHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary header-cta header-cta-register"
              >
                <span className="header-cta-label">{headerContent.registerLabel}</span>
                <span className="header-cta-label-compact">
                  {headerContent.registerCompactLabel}
                </span>
              </a>
            </div>
          ) : (
            <a
              href={homePath}
              className="btn-primary header-cta"
              onClick={handleCtaClick}
            >
              <span className="header-cta-label">{headerContent.backLabel}</span>
              <span className="header-cta-label-compact">
                {headerContent.backCompactLabel}
              </span>
            </a>
          )}

          <button
            type="button"
            ref={menuToggleRef}
            className={`menu-toggle ${isMenuOpen ? 'menu-toggle-open' : ''}`}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={
              isMenuOpen ? headerContent.menuCloseAriaLabel : headerContent.menuOpenAriaLabel
            }
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="menu-toggle-box" aria-hidden="true">
              <span className="menu-toggle-line" />
              <span className="menu-toggle-line" />
              <span className="menu-toggle-line" />
            </span>
          </button>
        </div>
      </div>

      {/* Overlay e painel são irmãos do .header-container de propósito: o
          container tem backdrop-filter + transform animado, o que o tornaria
          containing block e clipparia estes elementos position: fixed. */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'menu-overlay-open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        ref={menuPanelRef}
        className={`menu-panel ${isMenuOpen ? 'menu-panel-open' : ''}`}
        inert={!isMenuOpen}
      >
        <nav className="menu-panel-nav" aria-label={headerContent.menuAriaLabel}>
          {headerContent.navItems.map((item, index) => (
            <a
              key={item.sectionId}
              href={buildSectionHref(language, item.sectionId)}
              className="menu-panel-link menu-panel-item"
              style={{ '--i': index } as CSSProperties}
              onClick={(event) => handleMenuNavClick(event, item.sectionId)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div
          className="menu-panel-footer menu-panel-item"
          style={{ '--i': headerContent.navItems.length } as CSSProperties}
        >
          <a
            href={appRegisterHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary menu-panel-cta"
          >
            {headerContent.registerLabel}
          </a>
          <div
            className="menu-panel-languages"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
