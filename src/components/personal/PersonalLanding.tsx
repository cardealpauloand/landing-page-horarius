import { useMemo, type ComponentType, type MouseEvent as ReactMouseEvent } from 'react';

import { ArrowRight, CalendarDays, Check, ListChecks, Play, Wallet } from 'lucide-react';

import {
  getPersonalSignupHref,
  getWhatsappHref,
  type Language,
  type PersonalPageContent,
  type PersonalRoleIcon,
} from '../../content/landingContent';
import { personalPage } from '../../content/sections/personalPage';
import { IconWhatsapp } from '../icons/logos';
import ChatDemo from './ChatDemo';
import { BridgeVisual, PanelVisual, SharedVisual } from './PersonalVisual';
import './PersonalLanding.css';

export interface PersonalLandingProps {
  language: Language;
}

const ROLE_ICONS: Record<PersonalRoleIcon, ComponentType<{ className?: string }>> = {
  money: Wallet,
  calendar: CalendarDays,
  tasks: ListChecks,
};

const FEATURES_ID = 'personal-features';

type Chrome = Parameters<typeof ChatDemo>[0]['chrome'];
type Feature = PersonalPageContent['features']['items'][number];
type Plan = PersonalPageContent['pricing']['free'];

/* Conversa de um bloco da esteira. O ChatDemo reinicia o loop quando a lista
   de cenários muda de identidade, então a lista de um item só nasce aqui,
   memoizada — um `[feature.chat]` inline no map recriaria o array (e
   reiniciaria a conversa) a cada render da página. */
const FeatureChat = ({ scenario, chrome }: { scenario: Feature & { visual: 'chat' }; chrome: Chrome }) => {
  const scenarios = useMemo(() => [scenario.chat], [scenario.chat]);
  return <ChatDemo scenarios={scenarios} chrome={chrome} variant="card" />;
};

const FeatureVisual = ({
  feature,
  visuals,
  chrome,
}: {
  feature: Feature;
  visuals: PersonalPageContent['visuals'];
  chrome: Chrome;
}) => {
  switch (feature.visual) {
    case 'chat':
      return <FeatureChat scenario={feature} chrome={chrome} />;
    case 'panel':
      return <PanelVisual content={visuals.panel} />;
    case 'shared':
      return <SharedVisual content={visuals.shared} />;
    case 'bridge':
      return <BridgeVisual content={visuals.bridge} />;
  }
};

/* Card de plano: o mesmo template para o grátis e o pago; o destaque, o selo e
   a âncora riscada são opcionais nos dois. */
const PlanCard = ({ plan, featured, href }: { plan: Plan; featured: boolean; href: string }) => (
  <article className={`personal-plan surface-card${featured ? ' personal-plan-featured' : ''}`}>
    {plan.badge && <span className="personal-plan-badge">{plan.badge}</span>}
    <h3 className="personal-plan-name">{plan.name}</h3>
    <p className="personal-plan-description">{plan.description}</p>
    <p className="personal-plan-price">
      {plan.anchorPrice && <s className="personal-plan-anchor">{plan.anchorPrice}</s>}
      <strong>{plan.price}</strong>
      <span>{plan.period}</span>
    </p>
    <ul className="personal-plan-features">
      {plan.features.map((feature) => (
        <li key={feature}>
          <Check aria-hidden="true" />
          {feature}
        </li>
      ))}
    </ul>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${featured ? 'btn-primary' : 'btn-secondary'} personal-plan-cta`}
    >
      {plan.ctaLabel}
    </a>
  </article>
);

/**
 * Página do Horarius Pessoal (/pessoal): funil freemium do assistente de
 * tarefas, lembretes e finanças no WhatsApp. Estrutura aprovada seção a
 * seção (PLANO-HORARIUS-PESSOAL.md §6): hero com conversa animada, três
 * "cargos", esteira texto+visual alternando lados, preço em duas colunas,
 * FAQ e CTA final.
 *
 * Entrada via CSS puro (.landing-enter), como a /para-voce: o conteúdo
 * aparece no primeiro paint, sem esperar hidratação. Carregada em chunk
 * próprio (PersonalRoute.tsx): a home não paga por esta página.
 */
const PersonalLanding = ({ language }: PersonalLandingProps) => {
  const content = personalPage[language];
  const signupHref = getPersonalSignupHref();
  const chrome: Chrome = {
    name: content.hero.assistantName,
    status: content.hero.assistantStatus,
    placeholder: content.hero.inputPlaceholder,
    dayDivider: content.hero.dayDivider,
    label: content.hero.demoLabel,
  };

  const scrollToFeatures = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (typeof document === 'undefined') {
      return;
    }
    const section = document.getElementById(FEATURES_ID);
    if (!section) {
      return;
    }
    event.preventDefault();
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="personal-landing">
      {/* ------------------------------------------------------------ hero */}
      <section className="personal-hero theme-dark section">
        <div className="container personal-hero-container">
          <div className="landing-enter personal-hero-copy">
            <span className="eyebrow">{content.hero.eyebrow}</span>
            <h1 className="personal-hero-title">
              {content.hero.title}{' '}
              <span className="personal-hero-title-accent">{content.hero.titleAccent}</span>
            </h1>
            <p className="personal-hero-subtitle">{content.hero.subtitle}</p>

            <div className="button-group personal-hero-actions">
              <a
                href={signupHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary personal-cta"
              >
                {content.hero.primaryCta}
                <span className="personal-cta-badge" aria-hidden="true">
                  <ArrowRight />
                </span>
              </a>
              <a
                href={`#${FEATURES_ID}`}
                className="btn-secondary personal-cta"
                onClick={scrollToFeatures}
              >
                {content.hero.secondaryCta}
                <span className="personal-cta-badge" aria-hidden="true">
                  <Play />
                </span>
              </a>
            </div>
            <p className="personal-hero-note">{content.hero.ctaNote}</p>
          </div>

          <div className="landing-enter personal-hero-showcase">
            <ChatDemo scenarios={content.hero.scenarios} chrome={chrome} variant="phone" />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- cargos */}
      <section id="personal-roles" className="personal-roles section">
        <div className="container">
          <div className="landing-enter section-intro personal-intro">
            <span className="eyebrow">{content.roles.eyebrow}</span>
            <h2 className="section-title">{content.roles.title}</h2>
            <p className="section-description">{content.roles.description}</p>
          </div>

          <div className="landing-enter personal-roles-grid">
            {content.roles.items.map((item) => {
              const Icon = ROLE_ICONS[item.icon];
              return (
                <article key={item.title} className="personal-role surface-card">
                  <span className="personal-role-icon" aria-hidden="true">
                    <Icon className="personal-role-icon-mark" />
                  </span>
                  <span className="personal-role-tag">{item.role}</span>
                  <h3 className="personal-role-title">{item.title}</h3>
                  <p className="personal-role-description">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- esteira */}
      <section id={FEATURES_ID} className="personal-features section">
        <div className="container">
          <div className="landing-enter section-intro personal-intro">
            <span className="eyebrow">{content.features.eyebrow}</span>
            <h2 className="section-title">{content.features.title}</h2>
          </div>

          <div className="personal-feature-blocks">
            {content.features.items.map((feature, index) => (
              <div
                key={feature.title}
                className={`landing-enter personal-feature-block${
                  index % 2 === 1 ? ' personal-feature-block-mirrored' : ''
                }`}
              >
                <div className="personal-feature-copy">
                  <span className="personal-feature-eyebrow">{feature.eyebrow}</span>
                  <h3 className="personal-feature-title">{feature.title}</h3>
                  <p className="personal-feature-description">{feature.description}</p>
                  <ul className="personal-feature-bullets">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="personal-feature-bullet">
                        <span className="personal-feature-bullet-mark" aria-hidden="true">
                          <Check />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="personal-feature-visual">
                  <FeatureVisual feature={feature} visuals={content.visuals} chrome={chrome} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ preço */}
      <section id="personal-pricing" className="personal-pricing section">
        <div className="container">
          <div className="landing-enter section-intro personal-intro">
            <span className="eyebrow">{content.pricing.eyebrow}</span>
            <h2 className="section-title">{content.pricing.title}</h2>
            <p className="section-description">{content.pricing.description}</p>
          </div>

          <div className="landing-enter personal-pricing-grid">
            <PlanCard plan={content.pricing.free} featured={false} href={signupHref} />
            <PlanCard plan={content.pricing.paid} featured href={signupHref} />
          </div>

          <p className="landing-enter personal-pricing-note">{content.pricing.note}</p>
        </div>
      </section>

      {/* -------------------------------------------------------------- faq */}
      <section id="personal-faq" className="personal-faq section">
        <div className="container personal-faq-container">
          <div className="landing-enter section-intro personal-intro personal-faq-intro">
            <span className="eyebrow">{content.faq.eyebrow}</span>
            <h2 className="section-title">{content.faq.title}</h2>
          </div>

          <div className="landing-enter personal-faq-list">
            {content.faq.items.map((item) => (
              <details key={item.question} className="faq-item surface-card">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- cta */}
      <section className="personal-final section">
        <div className="container personal-final-container">
          <div className="landing-enter personal-final-card theme-dark surface-card">
            <span className="eyebrow">{content.cta.eyebrow}</span>
            <h2 className="personal-final-title">{content.cta.title}</h2>
            <p className="personal-final-description">{content.cta.description}</p>
            <div className="button-group personal-final-actions">
              <a
                href={signupHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {content.cta.primaryCta}
              </a>
              <a
                href={getWhatsappHref(language, 'personal')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary personal-final-whatsapp"
              >
                <IconWhatsapp className="personal-final-whatsapp-icon" />
                {content.cta.whatsappCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalLanding;
