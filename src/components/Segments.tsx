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
  type SegmentKey,
} from '../content/landingContent';
import { getSegmentPagePath } from '../seo/siteRoutes';
import photoAesthetics from '../assets/segments/estetica.webp';
import photoBarbershops from '../assets/segments/barbearia.webp';
import photoSalons from '../assets/segments/salao-beleza.webp';
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

/* Foto por vertical. Quem não está aqui cai no card sem imagem — mesmo
   formato e mesma cor de texto, só que sobre o gradiente da marca, para a
   grade não ficar com buraco enquanto as outras fotos não chegam. */
const SEGMENT_CARD_PHOTOS: Partial<Record<SegmentKey, string>> = {
  barbershops: photoBarbershops,
  salons: photoSalons,
  aesthetics: photoAesthetics,
};

/* Dimensão real dos arquivos: reservam a caixa antes de a imagem baixar, o
   que evita o layout pular (CLS) quando a seção entra na tela. */
const PHOTO_WIDTH = 800;
const PHOTO_HEIGHT = 1000;

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
            const photo = segment.segment
              ? SEGMENT_CARD_PHOTOS[segment.segment]
              : undefined;

            return (
              <Reveal
                key={segment.title}
                className={`segment-card ${photo ? 'segment-card-shot' : 'segment-card-plain'}`}
                delay={index * 70}
              >
                {photo ? (
                  /* lazy: a seção fica bem abaixo da dobra, então nenhuma
                     destas fotos disputa banda com o hero. */
                  <img
                    className="segment-card-image"
                    src={photo}
                    alt={segment.imageAlt ?? ''}
                    width={PHOTO_WIDTH}
                    height={PHOTO_HEIGHT}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="segment-card-icon" aria-hidden="true">
                    <Icon className="segment-card-icon-mark" />
                  </span>
                )}

                <div className="segment-card-body">
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
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Segments;
