import { useState, type ComponentType } from 'react';
import {
  BadgeCheck,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  Infinity as InfinityIcon,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

import {
  formatBrl,
  getBusinessSignupHref,
  getWhatsappHref,
  siteContent,
  type Language,
  type PricingAssuranceIcon,
  type PricingPlanSlug,
} from '../content/landingContent';
import Reveal from './Reveal';
import './Pricing.css';

interface PricingProps {
  language: Language;
}

type BillingPeriod = 'monthly' | 'yearly';

const PLAN_ICONS: Record<
  PricingPlanSlug,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  /* O starter agora se chama "Agenda" e é o plano sem IA — calendário lê
     melhor que o raio de "começar rápido" que estava aqui. */
  starter: CalendarDays,
  solo: Bot,
  pro: Sparkles,
  business: Users,
};

const ASSURANCE_ICONS: Record<
  PricingAssuranceIcon,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  shield: ShieldCheck,
  infinity: InfinityIcon,
  card: CreditCard,
  badge: BadgeCheck,
};

const Pricing = ({ language }: PricingProps) => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [expandedPlans, setExpandedPlans] = useState<PricingPlanSlug[]>([]);
  const pricing = siteContent[language].pricing;

  const togglePlanFeatures = (planSlug: PricingPlanSlug) => {
    setExpandedPlans((current) =>
      current.includes(planSlug)
        ? current.filter((slug) => slug !== planSlug)
        : [...current, planSlug],
    );
  };

  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <div className="pricing-heading">
          <Reveal className="section-intro pricing-intro">
            <span className="eyebrow">{pricing.eyebrow}</span>
            <h2 className="section-title">{pricing.title}</h2>
            <p className="section-description">{pricing.description}</p>
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

        <div className="pricing-grid">
          {pricing.plans.map((plan, index) => {
            const Icon = PLAN_ICONS[plan.slug];
            const isExpanded = expandedPlans.includes(plan.slug);
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
                } ${isExpanded ? 'pricing-card-expanded' : ''}`.trim()}
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

                <span className="pricing-capacity-label">
                  {plan.baseline ?? pricing.includedFeaturesLabel}
                </span>
                <ul id={`pricing-${plan.slug}-features`} className="pricing-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className={featureIndex >= 5 ? 'pricing-feature-extra' : undefined}
                    >
                      <Check aria-hidden="true" strokeWidth={2.4} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.features.length > 5 && (
                  <button
                    type="button"
                    className="pricing-card-more"
                    aria-expanded={isExpanded}
                    aria-controls={`pricing-${plan.slug}-features`}
                    onClick={() => togglePlanFeatures(plan.slug)}
                  >
                    {isExpanded ? pricing.showLessLabel : pricing.showMoreLabel}
                    <ChevronDown
                      className={
                        isExpanded
                          ? 'pricing-card-more-icon pricing-card-more-icon-open'
                          : 'pricing-card-more-icon'
                      }
                      aria-hidden="true"
                      strokeWidth={2}
                    />
                  </button>
                )}

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

        <Reveal className="pricing-assurances" delay={140}>
          {pricing.assurances.map((assurance) => {
            const AssuranceIcon = ASSURANCE_ICONS[assurance.icon];
            return (
              <span key={assurance.label} className="pricing-assurance">
                <AssuranceIcon
                  className="pricing-assurance-icon"
                  aria-hidden="true"
                  strokeWidth={2}
                />
                {assurance.label}
              </span>
            );
          })}
        </Reveal>

        <Reveal className="pricing-footnote" delay={180}>
          <Check aria-hidden="true" strokeWidth={2.4} />
          <p>{pricing.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;
