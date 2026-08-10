import type { ComponentType } from 'react';

import { ArrowRight, Headphones, ShieldCheck, Zap } from 'lucide-react';

import {
  getWhatsappHref,
  siteContent,
  type FaqHighlightIcon,
  type Language,
} from '../content/landingContent';
import { IconWhatsapp } from './icons/logos';
import Reveal from './Reveal';
import './FAQ.css';

interface FAQProps {
  language: Language;
}

const FAQ_HIGHLIGHT_ICONS: Record<
  FaqHighlightIcon,
  ComponentType<{ className?: string }>
> = {
  shield: ShieldCheck,
  bolt: Zap,
  support: Headphones,
};

const FAQ = ({ language }: FAQProps) => {
  const faq = siteContent[language].faq;

  return (
    <section id="faq" className="faq section">
      <div className="container faq-container">
        {/* Coluna da esquerda: o título sozinho deixava meia tela vazia ao lado
            de uma lista alta. Os selos ocupam o espaço respondendo as objeções
            que ninguém abre o acordeão para descobrir. */}
        <div className="faq-aside">
          <Reveal className="section-intro faq-intro">
            <span className="eyebrow">{faq.eyebrow}</span>
            <h2 className="section-title">{faq.title}</h2>
            <p className="section-description">{faq.description}</p>
          </Reveal>

          <div className="faq-highlights">
            {faq.highlights.map((highlight, index) => {
              const Icon = FAQ_HIGHLIGHT_ICONS[highlight.icon];

              return (
                <Reveal
                  key={highlight.title}
                  className="faq-highlight surface-card"
                  delay={index * 70}
                >
                  <span className="faq-highlight-icon" aria-hidden="true">
                    <Icon className="faq-highlight-icon-mark" />
                  </span>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="faq-list">
          {faq.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <details className="faq-item surface-card">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>

        {/* Saída para quem leu a lista e não achou a resposta — sem ela o FAQ
            termina num beco. */}
        <Reveal className="faq-support surface-card">
          <span className="faq-support-mark" aria-hidden="true">
            <IconWhatsapp className="faq-support-mark-icon" />
          </span>

          <div className="faq-support-copy">
            <h3>{faq.support.title}</h3>
            <p>{faq.support.description}</p>
          </div>

          <a
            className="btn-primary faq-support-cta"
            href={getWhatsappHref(language, 'sales')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsapp className="faq-support-cta-icon" aria-hidden="true" />
            {faq.support.ctaLabel}
            <ArrowRight className="faq-support-cta-arrow" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;
