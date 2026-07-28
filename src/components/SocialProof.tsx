import type { ComponentType } from 'react';

import {
  Car,
  Dumbbell,
  House,
  PawPrint,
  Scissors,
  Smile,
  Sparkles,
  Stethoscope,
} from 'lucide-react';

import { siteContent, type Language, type SegmentIcon } from '../content/landingContent';
import { IconTooth } from './icons/logos';
import Reveal from './Reveal';
import './SocialProof.css';

interface SocialProofProps {
  language: Language;
}

/* Desenho de cada segmento. O dente é o único de casa (o Lucide não tem um) —
   os outros vêm do set, na mesma grade, para os nove lerem como família. */
const SEGMENT_ICONS: Record<
  SegmentIcon,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  scissors: Scissors,
  sparkles: Sparkles,
  face: Smile,
  tooth: IconTooth,
  stethoscope: Stethoscope,
  dumbbell: Dumbbell,
  paw: PawPrint,
  car: Car,
  home: House,
};

const SocialProof = ({ language }: SocialProofProps) => {
  const socialProof = siteContent[language].socialProof;

  return (
    <section className="social-proof">
      <div className="container social-proof-container">
        <Reveal className="social-proof-summary">
          <span className="eyebrow">{socialProof.eyebrow}</span>
          <h2>{socialProof.title}</h2>
          <div className="social-proof-description">
            {socialProof.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        {/* Segmentos atendidos em cartões de leitura, não de navegação: nada
            aqui leva a lugar nenhum, então nada de seta nem de estado que
            prometa um destino. Lista de verdade porque é uma enumeração. */}
        <Reveal className="social-proof-cards" delay={80}>
          <ul>
            {socialProof.pills.map((item) => {
              const Icon = SEGMENT_ICONS[item.icon];
              return (
                <li key={item.label} className="social-proof-card">
                  <span className="social-proof-card-icon" aria-hidden="true">
                    <Icon strokeWidth={1.6} />
                  </span>
                  {item.label}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default SocialProof;
