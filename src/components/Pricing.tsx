import { useState, type ComponentType } from 'react';
import {
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

import {
  getBusinessSignupHref,
  getWhatsappHref,
  siteContent,
  type Language,
  type PricingFeatureGroupIcon,
  type PricingPlanSlug,
} from '../content/landingContent';
import Reveal from './Reveal';
import './Pricing.css';

interface PricingProps {
  language: Language;
}

type BillingPeriod = 'monthly' | 'yearly';

const LOCALE_BY_LANGUAGE: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

const PLAN_ICONS: Record<
  PricingPlanSlug,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  starter: Zap,
  pro: Sparkles,
  business: Users,
};

const FEATURE_GROUP_ICONS: Record<
  PricingFeatureGroupIcon,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  assistant: Bot,
  calendar: CalendarDays,
  growth: BarChart3,
};

const formatBrl = (value: number, language: Language) =>
  new Intl.NumberFormat(LOCALE_BY_LANGUAGE[language], {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

const Pricing = ({ language }: PricingProps) => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const pricing = siteContent[language].pricing;

  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <div className="pricing-heading">
          <Reveal className="section-intro pricing-intro">
            <span className="eyebrow">{pricing.eyebrow}</span>
            <h2 className="section-title">{pricing.title}</h2>
            <p className="section-description">{pricing.description}</p>
          </Reveal>
        </div>

        <Reveal className="pricing-platform surface-card" delay={70}>
          <div className="pricing-platform-copy">
            <span className="pricing-platform-eyebrow">{pricing.platformEyebrow}</span>
            <h3>{pricing.platformTitle}</h3>
            <p>{pricing.platformDescription}</p>
          </div>

          <div className="pricing-feature-groups">
            {pricing.featureGroups.map((group) => {
              const GroupIcon = FEATURE_GROUP_ICONS[group.icon];

              return (
                <div key={group.title} className="pricing-feature-group">
                  <div className="pricing-feature-group-title">
                    <span aria-hidden="true">
                      <GroupIcon strokeWidth={1.8} />
                    </span>
                    <h4>{group.title}</h4>
                  </div>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>
                        <Check aria-hidden="true" strokeWidth={2.4} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="pricing-plans-heading">
          <Reveal>
            <h3 className="pricing-plans-title">{pricing.plansTitle}</h3>
          </Reveal>

          <Reveal className="pricing-billing-wrap" delay={80}>
            <div className="pricing-billing" aria-label={pricing.billingAriaLabel}>
              <button
                type="button"
                className={billingPeriod === 'monthly' ? 'pricing-billing-active' : ''}
                aria-pressed={billingPeriod === 'monthly'}
                onClick={() => setBillingPeriod('monthly')}
              >
                {pricing.monthlyLabel}
              </button>
              <button
                type="button"
                className={billingPeriod === 'yearly' ? 'pricing-billing-active' : ''}
                aria-pressed={billingPeriod === 'yearly'}
                onClick={() => setBillingPeriod('yearly')}
              >
                {pricing.yearlyLabel}
              </button>
            </div>
            <span className="pricing-saving-badge">{pricing.yearlyBadge}</span>
          </Reveal>
        </div>

        <div className="pricing-grid" aria-live="polite">
          {pricing.plans.map((plan, index) => {
            const Icon = PLAN_ICONS[plan.slug];
            const { monthlyPrice, yearlyPrice } = plan;
            const hasPrice = monthlyPrice !== null && yearlyPrice !== null;
            const yearlyMonthlyPrice =
              yearlyPrice !== null && billingPeriod === 'yearly' ? yearlyPrice / 12 : null;
            const displayedPrice =
              yearlyMonthlyPrice ?? monthlyPrice;
            const yearlySavings =
              monthlyPrice !== null && yearlyPrice !== null && billingPeriod === 'yearly'
                ? monthlyPrice * 12 - yearlyPrice
                : null;
            const href =
              plan.slug === 'business'
                ? getWhatsappHref(language, 'sales')
                : getBusinessSignupHref(language);

            return (
              <Reveal
                key={plan.slug}
                className={`pricing-card surface-card ${
                  plan.highlighted ? 'pricing-card-featured' : ''
                }`.trim()}
                delay={index * 70}
              >
                {plan.highlighted && (
                  <span className="pricing-popular-badge">{pricing.popularLabel}</span>
                )}

                <div className="pricing-card-header">
                  <span className="pricing-plan-icon" aria-hidden="true">
                    <Icon strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3>{plan.name}</h3>
                    <p>{plan.description}</p>
                  </div>
                </div>

                <div className="pricing-price">
                  {displayedPrice === null ? (
                    <strong className="pricing-consultation">{plan.priceLabel}</strong>
                  ) : (
                    <div className="pricing-price-main">
                      <strong>{formatBrl(displayedPrice, language)}</strong>
                      <span>{pricing.perMonthLabel}</span>
                    </div>
                  )}

                  {hasPrice && billingPeriod === 'yearly' ? (
                    <div className="pricing-price-details">
                      <span>
                        {pricing.billedYearlyLabel.replace(
                          '{price}',
                          formatBrl(yearlyPrice ?? 0, language),
                        )}
                      </span>
                      <strong>
                        {pricing.savingsLabel.replace(
                          '{price}',
                          formatBrl(yearlySavings ?? 0, language),
                        )}
                      </strong>
                    </div>
                  ) : hasPrice ? (
                    <span className="pricing-price-note">{pricing.billedMonthlyLabel}</span>
                  ) : (
                    <span className="pricing-price-note">&nbsp;</span>
                  )}
                </div>

                <span className="pricing-capacity-label">{pricing.planCapacityLabel}</span>
                <ul className="pricing-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check aria-hidden="true" strokeWidth={2.4} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.highlighted ? 'btn-primary' : 'btn-secondary'}
                >
                  {plan.ctaLabel}
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="pricing-footnote" delay={180}>
          <Check aria-hidden="true" strokeWidth={2.4} />
          <p>{pricing.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;
