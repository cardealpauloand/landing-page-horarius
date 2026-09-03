import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { BrandStoryExperienceProps } from '../BrandStory';
import ProgressBridge from './ProgressBridge';
import Scene from './Scene';
import useQuality from './useQuality';
import { CAMERA_KEYFRAMES } from './constants';
import { buildTimeline, createChannels } from './timeline';

/* Entrada do chunk 3D.

   INVARIANTE (firewall SSR): nada deste diretório pode ser importado
   estaticamente fora dele — scripts/prerender.mjs executa o bundle SSR em
   Node puro e a avaliação de three/gsap/drei ali derruba o build da Netlify.
   Este módulo só chega ao browser pelo import() dinâmico do BrandStory.

   Registrar plugins no topo do módulo é seguro pelo mesmo motivo: este
   arquivo nunca é avaliado fora do browser. */
gsap.registerPlugin(useGSAP, ScrollTrigger);

/* Política app-wide, declarada UMA vez no load do módulo (não por montagem):
   a barra de URL do mobile recolhendo não deve re-medir triggers — o palco
   usa 100svh no CSS justamente para não pular. Este chunk é o único
   consumidor de GSAP no site. */
ScrollTrigger.config({ ignoreMobileResize: true });

export type ProgressStore = {
  /* Progresso cru do ScrollTrigger e a versão suavizada que a cena consome. */
  raw: number;
  damped: number;
};

const Experience = ({
  trackRef,
  identityRequestRef,
  chat,
  onReady,
  onFail,
}: BrandStoryExperienceProps) => {
  const quality = useQuality();
  const progressRef = useRef<ProgressStore>({ raw: 0, damped: 0 });
  const invalidateRef = useRef<(() => void) | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  /* Seção dentro da viewport? O loop de identidades do ato final só pede
     frames enquanto isto for true — fora de vista, GPU parada. */
  const inViewRef = useRef(true);
  const channels = useMemo(() => createChannels(), []);
  /* Estado GROSSO do estágio narrativo (0..5, ~5 mudanças por scroll
     completo): governa mounts React — o fleet só existe no ecossistema.
     O contínuo fica nos canais. */
  const [act, setAct] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          invalidateRef.current?.();
        }
      });
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [trackRef]);

  /* Reload no meio do pin: o documento renasce CURTO (poster) e só cresce
     quando o 3D monta — a restauração nativa de scroll cai em outra seção.
     Guarda o progresso da história no pagehide; o shell restaura quando a
     cena volta (ver BrandStory.tsx). Só salva com o usuário DENTRO do pin. */
  useEffect(() => {
    const save = () => {
      const p = progressRef.current.raw;
      if (!inViewRef.current || p <= 0.01 || p >= 0.99) {
        return;
      }
      try {
        sessionStorage.setItem('horarius-brand-story-p', String(p));
      } catch {
        /* storage indisponível (modo privado): perde só a restauração */
      }
    };
    window.addEventListener('pagehide', save);
    return () => window.removeEventListener('pagehide', save);
  }, []);

  /* useGSAP: contexto com revert automático — mata o ScrollTrigger e os
     tweens na desmontagem E na remontagem sintética do StrictMode (dev). */
  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) {
        return;
      }

      track.dataset.stage = '0';
      track.dataset.identity = '0';

      timelineRef.current = buildTimeline(channels);

      /* Sem pin do GSAP: o "prender" é o translate3d do shell (BrandStory).
         O trigger só mede —
         progresso 0→1 ao longo do track alto — e o ProgressBridge aplica na
         timeline pausada. Scrub imediato aqui; a suavização mora no damp do
         bridge (o que permite frameloop="demand"). */
      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          progressRef.current.raw = self.progress;
          invalidateRef.current?.();
        },
      });

      return () => {
        timelineRef.current = null;
      };
    },
    { scope: trackRef },
  );

  return (
    <Canvas
      frameloop="demand"
      dpr={quality.dpr}
      camera={{
        fov: CAMERA_KEYFRAMES[0].fov,
        near: 0.1,
        far: 60,
        position: CAMERA_KEYFRAMES[0].position,
      }}
      gl={{
        antialias: true,
        /* alpha: os cards de chat vivem ATRÁS do canvas (occlude="blending"
           do drei) e aparecem pelos "furos" de profundidade — oclusão real
           por pixel entre DOM e 3D. O fundo é do backplane (Backdrop). */
        alpha: true,
        stencil: false,
        powerPreference: 'high-performance',
      }}
      onCreated={(state) => {
        invalidateRef.current = state.invalidate;

        /* Contexto perdido sem restore = GPU sob pressão: devolve o poster
           estático (o shell desmonta este componente). */
        state.gl.domElement.addEventListener(
          'webglcontextlost',
          (event) => {
            event.preventDefault();
            onFail();
          },
          { once: true },
        );

        state.invalidate();
        onReady();
      }}
    >
      <ProgressBridge
        progressRef={progressRef}
        timelineRef={timelineRef}
        trackRef={trackRef}
        inViewRef={inViewRef}
        channels={channels}
        lambda={quality.mobile ? 7 : 5}
        onStageChange={setAct}
      />
      <Scene
        channels={channels}
        progress={progressRef}
        quality={quality}
        act={act}
        trackRef={trackRef}
        identityRequestRef={identityRequestRef}
        chat={chat}
      />
    </Canvas>
  );
};

export default Experience;
