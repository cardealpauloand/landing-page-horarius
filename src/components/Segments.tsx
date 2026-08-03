import { type ComponentType, type MouseEvent } from 'react';
import {
  ArrowRight,
  Flower2,
  PawPrint,
  Scissors,
  Sparkles,
  Stethoscope,
  Wrench,
} from 'lucide-react';

import {
  siteContent,
  type Language,
  type SegmentCardIcon,
} from '../content/landingContent';
import { getSegmentPagePath } from '../seo/siteRoutes';
import Reveal from './Reveal';
import './Segments.css';

interface SegmentsProps {
  language: Language;
  navigateTo: (path: string) => void;
}

const SEGMENT_CARD_ICONS: Record<SegmentCardIcon, ComponentType<{ className?: string }>> = {
  scissors: Scissors,
  sparkles: Sparkles,
  flower: Flower2,
  paw: PawPrint,
  stethoscope: Stethoscope,
  wrench: Wrench,
};

const Segments = ({ language, navigateTo }: SegmentsProps) => {
  const segments = siteContent[language].segments;

  const handleSegmentLink = (
    event: MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    event.preventDefault();
    navigateTo(path);
  };

  return (
    <section id="segments" className="segments section">
      <div className="container">
        <Reveal className="section-intro">
          <span className="eyebrow">{segments.eyebrow}</span>
          <h2 className="section-title">{segments.title}</h2>
          <p className="section-description">{segments.description}</p>
        </Reveal>

        <div className="segments-grid">
          {segments.items.map((segment, index) => {
            const Icon = SEGMENT_CARD_ICONS[segment.icon];
            const path = segment.segment
              ? getSegmentPagePath(language, segment.segment)
              : null;

            return (
              <Reveal
                key={segment.title}
                className="segment-card surface-card"
                delay={index * 70}
              >
                <div className="segment-card-top">
                  <span className="segment-card-icon" aria-hidden="true">
                    <Icon className="segment-card-icon-mark" />
                  </span>
                  <span className="segment-index">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{segment.title}</h3>
                <p>{segment.description}</p>
                {path && (
                  /* Link esticado: o ::after cobre o card inteiro, então o
                     card todo é área de clique de um único <a>. */
                  <a
                    className="segment-card-cta"
                    href={path}
                    onClick={(event) => handleSegmentLink(event, path)}
                  >
                    {segments.itemLinkLabel}
                    <ArrowRight className="segment-card-cta-icon" aria-hidden="true" />
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Segments;
