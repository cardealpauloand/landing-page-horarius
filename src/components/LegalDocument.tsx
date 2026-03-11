import type { LegalDocumentContent } from '../content/landingContent';
import './PrivacyPolicy.css';

interface LegalDocumentProps {
  content: LegalDocumentContent;
}

const LegalDocument = ({ content }: LegalDocumentProps) => (
  <div className="privacy-policy-container section">
    <div className="container">
      <div className="privacy-policy-content surface-card">
        <header className="privacy-header">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p className="app-info">
            <strong>{content.appInfoTitle}</strong>
            <br />
            {content.appInfoDescription}
          </p>
          <p className="last-updated">{content.lastUpdated}</p>
        </header>

        {content.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>

            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {section.subsections?.map((subsection) => (
              <div key={subsection.title}>
                <h3>{subsection.title}</h3>
                {subsection.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {subsection.list ? (
                  <ul>
                    {subsection.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            {section.list ? (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {section.contactEmail ? (
              <p className="contact-email">
                <a href={`mailto:${section.contactEmail}`}>{section.contactEmail}</a>
              </p>
            ) : null}

            {section.contactInfo ? (
              <div className="contact-info">
                {section.contactInfo.map((item) => (
                  <p key={`${item.label}-${item.value}`}>
                    <strong>{item.label}:</strong>{' '}
                    {item.href ? <a href={item.href}>{item.value}</a> : item.value}
                  </p>
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default LegalDocument;
