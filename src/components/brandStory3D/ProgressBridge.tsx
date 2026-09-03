import type { RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { STAGE_BOUNDARIES } from './constants';
import { damp } from './helpers';
import type { ProgressStore } from './Experience';
import type { SceneChannels } from './timeline';

interface ProgressBridgeProps {
  /* Sufixo Ref é significativo: o lint do React Compiler só permite mutação
     de .current em bindings que reconhece como refs. */
  progressRef: RefObject<ProgressStore>;
  timelineRef: RefObject<gsap.core.Timeline | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  inViewRef: RefObject<boolean>;
  channels: SceneChannels;
  /* Constante do damp exponencial (mais alta no mobile = resposta mais dura). */
  lambda: number;
  /* Estágio narrativo mudou (~5x por scroll completo) — o Experience usa
     para o estado grosso `act` que governa mounts (fleet, transmissão). */
  onStageChange: (stage: number) => void;
}

/* Ponte scroll → cena. Roda ANTES de todo o resto (priority -2): suaviza o
   progresso bruto que o ScrollTrigger escreveu, aplica na timeline GSAP
   pausada e mantém o frameloop="demand" vivo só enquanto o damp não
   convergiu — parado de verdade = GPU parada. Também publica o estágio
   narrativo em data-stage no track (mutação de DOM, nunca setState — as
   legendas fazem crossfade por CSS puro). */
const ProgressBridge = ({
  progressRef,
  timelineRef,
  trackRef,
  inViewRef,
  channels,
  lambda,
  onStageChange,
}: ProgressBridgeProps) => {
  const invalidate = useThree((state) => state.invalidate);

  useFrame((_, delta) => {
    const store = progressRef.current;
    store.damped = damp(store.damped, store.raw, lambda, Math.min(delta, 0.1));

    if (Math.abs(store.raw - store.damped) < 0.0004) {
      store.damped = store.raw;
    } else {
      invalidate();
    }

    /* Ecossistema vivo: com o fleet em cena E a seção visível, mantém o
       frameloop rodando (spotlight de identidades + micro-idle). Fora de
       vista ou antes do finale, nada disso pede frame — GPU parada. */
    if (inViewRef.current && channels.fleetReveal > 0.001) {
      invalidate();
    }

    timelineRef.current?.progress(store.damped);

    const track = trackRef.current;
    if (track) {
      let stage = 0;
      for (const boundary of STAGE_BOUNDARIES) {
        if (store.damped >= boundary) {
          stage += 1;
        }
      }
      const value = String(stage);
      if (track.dataset.stage !== value) {
        track.dataset.stage = value;
        /* setState fora de effect (callback de frame): o React ignora se o
           valor não mudou; ~5 disparos por scroll completo. */
        onStageChange(stage);
      }
    }
  }, -2);

  return null;
};

export default ProgressBridge;
