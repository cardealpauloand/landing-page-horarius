import { useEffect, useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { CircleGeometry } from 'three';
import Backdrop from './Backdrop';
import CloneField from './CloneField';
import FleetPhones from './FleetPhones';
import HorariusCore from './HorariusCore';
import MainPhone from './MainPhone';
import SceneLighting from './SceneLighting';
import ScrollCamera from './ScrollCamera';
import TransitionParticles from './TransitionParticles';
import type { BrandStoryChatContent } from '../BrandStory';
import { createSpotlightState, type QualityPreset } from './constants';
import type { PhoneGeometries } from './PhoneModel';
import { createRoundedPlaneGeometry, createRoundedPlateGeometry } from './helpers';
import type { ProgressStore } from './Experience';
import type { SceneChannels } from './timeline';

interface SceneProps {
  channels: SceneChannels;
  progress: RefObject<ProgressStore>;
  quality: QualityPreset;
  /* Estágio narrativo grosso (0..5) — governa mounts, nunca o contínuo. */
  act: number;
  trackRef: RefObject<HTMLDivElement | null>;
  identityRequestRef: RefObject<{ index: number | null }>;
  chat: BrandStoryChatContent;
}

/* Raiz da cena: composição + recursos compartilhados. As geometrias do
   celular são UM set (Extrude é caro) reusado por protagonista + fleet; o
   estado do spotlight é um ref compartilhado (FleetPhones escreve, MainPhone
   e IdentityProps leem). Fleet/props montam um ato ANTES da janela visual
   (act ≥ 3) para a entrada nunca "popar".
   IMPORTANTE: os filhos ficam direto sob a raiz (sem <group> em volta) para
   o attach="fog" do Backdrop cair na própria cena. */
const Scene = ({
  channels,
  progress,
  quality,
  act,
  trackRef,
  identityRequestRef,
  chat,
}: SceneProps) => {
  /* Proporções do celular do HERO (iPhone ~0.48 de aspecto, cantos bem
     redondos) — o mesmo aparelho da demo, agora em 3D. O holePunch é o
     occluder do card DOM: tamanho-mundo do elemento (280×597px × df/400) e
     raio idêntico ao border-radius (41px) — cantos redondos de verdade. */
  const cardScale = (quality.mobile ? 2.05 : 2.2) / 400;
  const phoneGeometries = useMemo<PhoneGeometries>(
    () => ({
      frame: createRoundedPlateGeometry(1.72, 3.42, 0.12, 0.28),
      body: createRoundedPlateGeometry(1.64, 3.34, 0.14, 0.26),
      screen: createRoundedPlateGeometry(1.5, 3.2, 0.02, 0.22),
      button: createRoundedPlateGeometry(0.05, 0.24, 0.03, 0.02),
      stage: new CircleGeometry(1, 40),
      /* 1.5% menor que o card de propósito: a borda do card cobre o furo com
         folga — nenhuma costura aparece em nenhum DPR/zoom. */
      holePunch: createRoundedPlaneGeometry(
        280 * cardScale * 0.985,
        597 * cardScale * 0.985,
        39 * cardScale,
      ),
    }),
    [cardScale],
  );

  useEffect(
    () => () => {
      Object.values(phoneGeometries).forEach((geometry) => geometry.dispose());
    },
    [phoneGeometries],
  );

  const spotlightRef = useRef(createSpotlightState());

  return (
    <>
      <ScrollCamera progress={progress} quality={quality} />
      <SceneLighting channels={channels} />
      <Backdrop channels={channels} />
      <CloneField channels={channels} progress={progress} quality={quality} />
      <HorariusCore channels={channels} progress={progress} quality={quality} />
      <TransitionParticles channels={channels} progress={progress} quality={quality} />
      <MainPhone
        channels={channels}
        quality={quality}
        geometries={phoneGeometries}
        chat={chat}
        spotlightRef={spotlightRef}
      />
      {act >= 3 ? (
        <FleetPhones
          channels={channels}
          quality={quality}
          geometries={phoneGeometries}
          chat={chat}
          trackRef={trackRef}
          identityRequestRef={identityRequestRef}
          spotlightRef={spotlightRef}
        />
      ) : null}
    </>
  );
};

export default Scene;
