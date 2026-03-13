import { type MouseEvent } from "react";
import {
  contactEmail,
  getWhatsappHref,
  siteContent,
  type Language,
} from "../content/landingContent";
import { buildSectionHref, getLocalizedPagePath } from "../seo/siteRoutes";
import "./Footer.css";

interface FooterProps {
  language: Language;
  navigateTo: (path: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const Footer = ({ language, navigateTo, scrollToSection }: FooterProps) => {
  const footer = siteContent[language].footer;
  const navItems = siteContent[language].header.navItems;

  const handleInternalLink = (
    event: MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    event.preventDefault();
    navigateTo(path);
  };

  const handleSectionLink = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-mark footer-brand-mark">
              <span className="brand-mark-badge">H</span>
              <span className="brand-mark-copy">
                <span className="brand-mark-word">Horarius</span>
                <span className="brand-mark-tag">
                  {siteContent[language].header.brandTag}
                </span>
              </span>
            </div>
            <p className="footer-tagline">{footer.tagline}</p>
            <div className="footer-contact">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a
                href={getWhatsappHref(language, "primary")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {footer.whatsappLabel}
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>{footer.navigationTitle}</h4>
            <ul>
              {navItems.map((link) => (
                <li key={link.sectionId}>
                  <a
                    href={buildSectionHref(language, link.sectionId)}
                    onClick={(event) =>
                      handleSectionLink(event, link.sectionId)
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>{footer.legalTitle}</h4>
            <ul>
              <li>
                <a
                  href={getLocalizedPagePath(language, "privacy")}
                  onClick={(event) =>
                    handleInternalLink(
                      event,
                      getLocalizedPagePath(language, "privacy"),
                    )
                  }
                >
                  {footer.privacyLabel}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedPagePath(language, "terms")}
                  onClick={(event) =>
                    handleInternalLink(
                      event,
                      getLocalizedPagePath(language, "terms"),
                    )
                  }
                >
                  {footer.termsLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Horarius. {footer.copyright}
          </p>
          <p>{footer.bottomRight}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
