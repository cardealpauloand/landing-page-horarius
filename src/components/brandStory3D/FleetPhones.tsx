import { useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, Vector3 } from 'three';
import type {
  Group,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
} from 'three';
import { Html } from '@react-three/drei';
import ChatCard from './ChatCard';
import PhoneModel from './PhoneModel';
import type { PhoneGeometries } from './PhoneModel';
import type { BrandStoryChatContent } from '../BrandStory';
import {
  AUTO_INTERVAL,
  FINALE_SLOTS,
  FLEET_INDICES,
  FRAME_ANODIZE_DARK,
  FRAME_ANODIZE_MIX,
  IDENTITY_HUES,
  MANUAL_HOLD,
  MORPH_DURATION,
  SPOTLIGHT_CYCLE,
  type QualityPreset,
  type SpotlightState,
} from './constants';
import { clamp01, easeInOutSine, easeOutCubic } from './helpers';
import type { SceneChannels } from './timeline';

interface FleetPhonesProps {
  channels: SceneChannels;
  quality: QualityPreset;
  geometries: PhoneGeometries;
  chat: BrandStoryChatContent;
  trackRef: RefObject<HTMLDivElement | null>;
  identityRequestRef: RefObject<{ index: number | null }>;
  spotlightRef: RefObject<SpotlightState>;
}

/* Os outros negócios do ecossistema: celulares IGUAIS em forma, distintos em
   identidade — cada um com avatar, nome e VOZ próprios no card (desktop) ou
   com a tela acesa no hue da marca (mobile, sem Html). Entram da profundidade
   com stagger derivado de fleetReveal (determinístico, reversível).

   Este componente também é o ENGINE do spotlight: relógio da cena avança a
   identidade ativa (4.5s), cliques nas tabs chegam por identityRequestRef, e
   o resultado vira data-identity no track (CSS faz o resto) + uma luz
   roaming + ênfase de escala/brilho no celular ativo. Montado só a partir do
   ato 4 (gate no Scene) — antes disso não existe nem no DOM. */
const FleetPhones = ({
  channels,
  quality,
  geometries,
  chat,
  trackRef,
  identityRequestRef,
  spotlightRef,
}: FleetPhonesProps) => {
  const variant = quality.mobile ? 'mobile' : 'desktop';
  const indices = FLEET_INDICES[variant];

  /* Arrays paralelos por ordem de entrada (k) — o padrão de refs que o lint
     do React Compiler aceita (mutação só de .current, dentro de callbacks). */
  const groupsRef = useRef<(Group | null)[]>([]);
  const screenMaterialsRef = useRef<(MeshStandardMaterial | null)[]>([]);
  const accentBarMaterialsRef = useRef<(MeshBasicMaterial | null)[]>([]);
  const stageMaterialsRef = useRef<(MeshBasicMaterial | null)[]>([]);
  const roamingLightRef = useRef<PointLight>(null);
  const scratchRef = useRef({
    color: new Color(),
    from: new Vector3(),
    to: new Vector3(),
  });
  const identityColors = useMemo(
    () => IDENTITY_HUES.map((hue) => new Color(hue)),
    [],
  );
  /* A "bordinha" de cada marca: hue anodizado (afundado no grafite) no aro —
     a única cor de marca no hardware; o resto do aparelho é preto realista. */
  const frameHues = useMemo(() => {
    const dark = new Color(FRAME_ANODIZE_DARK);
    return IDENTITY_HUES.map(
      (hue) =>
        `#${new Color(hue).lerp(dark, FRAME_ANODIZE_MIX).getHexString()}`,
    );
  }, []);

  useFrame(({ clock }) => {
    const fleet = channels.fleetReveal;
    const now = clock.elapsedTime;
    const spot = spotlightRef.current;

    /* Engine do spotlight — só com o ecossistema vivo. */
    if (fleet > 0.001) {
      const request = identityRequestRef.current;
      if (request.index !== null) {
        if (request.index !== spot.index) {
          spot.prevIndex = spot.index;
          spot.index = request.index;
          spot.switchedAt = now;
        }
        spot.holdUntil = now + MANUAL_HOLD;
        request.index = null;
      }

      /* Zera o cronômetro no PRIMEIRO frame com o fleet completo, senão a
         primeira troca dispararia na hora em que ele termina de entrar. */
      if (spot.switchedAt < 0 && fleet > 0.95) {
        spot.switchedAt = now;
      }

      if (
        fleet > 0.95 &&
        now > spot.holdUntil &&
        spot.switchedAt >= 0 &&
        now - spot.switchedAt > AUTO_INTERVAL
      ) {
        spot.prevIndex = spot.index;
        spot.index =
          SPOTLIGHT_CYCLE[
            (SPOTLIGHT_CYCLE.indexOf(spot.index) + 1) % SPOTLIGHT_CYCLE.length
          ];
        spot.switchedAt = now;
      }

      const track = trackRef.current;
      if (track && track.dataset.identity !== String(spot.index)) {
        track.dataset.identity = String(spot.index);
      }
    }

    const morph =
      spot.switchedAt < 0
        ? 1
        : clamp01((now - spot.switchedAt) / MORPH_DURATION);
    const morphE = easeInOutSine(morph);

    /* Luz roaming (desktop): viaja do slot anterior ao ativo, na cor da
       marca. No mobile a identidade mora no protagonista — a accentLight
       dele já faz esse papel. */
    const light = roamingLightRef.current;
    if (light && !quality.mobile) {
      const slots = FINALE_SLOTS[variant];
      const scratch = scratchRef.current;
      scratch.from.set(...slots[spot.prevIndex].position);
      scratch.to.set(...slots[spot.index].position);
      light.position.lerpVectors(scratch.from, scratch.to, morphE);
      light.position.y += 1.1;
      light.position.z += 1.6;
      light.color
        .copy(identityColors[spot.prevIndex])
        .lerp(identityColors[spot.index], morphE);
      light.intensity = 1.5 * fleet;
    }

    indices.forEach((brandIndex, k) => {
      const group = groupsRef.current[k];
      if (!group) {
        return;
      }
      /* Stagger por ordem de entrada (k), não por índice de marca. */
      const q = clamp01((fleet - k * 0.18) / 0.6);
      group.visible = q > 0.001;
      if (q <= 0.001) {
        group.scale.setScalar(0.0001);
        return;
      }

      const slot = FINALE_SLOTS[variant][brandIndex];
      const entrance = easeOutCubic(q);
      group.position.set(
        slot.position[0],
        slot.position[1] +
          0.04 * Math.sin(now * 0.8 + brandIndex * 1.7) * entrance,
        slot.position[2] - 2.8 * (1 - entrance),
      );
      group.rotation.y = slot.rotY;

      const wasActive = spot.prevIndex === brandIndex ? 1 : 0;
      const isActive = spot.index === brandIndex ? 1 : 0;
      const active = wasActive + (isActive - wasActive) * morphE;
      group.scale.setScalar(entrance * (0.94 + 0.08 * active));

      const accentBar = accentBarMaterialsRef.current[k];
      if (accentBar) {
        accentBar.opacity = (0.5 + 0.45 * active) * entrance;
      }
      const screen = screenMaterialsRef.current[k];
      if (screen) {
        /* Tela acesa no hue da marca — mais forte quando em destaque. */
        screen.emissiveIntensity = (0.12 + 0.22 * active) * entrance;
      }
      const stage = stageMaterialsRef.current[k];
      if (stage) {
        stage.opacity = (0.06 + 0.08 * active) * entrance;
      }
    });
  });

  return (
    <>
      {quality.mobile ? null : (
        <pointLight
          ref={roamingLightRef}
          color={IDENTITY_HUES[0]}
          intensity={0}
          distance={9}
          decay={2}
        />
      )}
      {indices.map((brandIndex, k) => (
        <group
          key={brandIndex}
          ref={(group) => {
            groupsRef.current[k] = group;
          }}
          position={FINALE_SLOTS[variant][brandIndex].position}
          visible={false}
        >
          <PhoneModel
            geometries={geometries}
            frameColor={frameHues[brandIndex]}
            screenRef={(material) => {
              screenMaterialsRef.current[k] = material;
            }}
            accentBarRef={(material) => {
              accentBarMaterialsRef.current[k] = material;
            }}
            stageRef={(material) => {
              stageMaterialsRef.current[k] = material;
            }}
            accent={IDENTITY_HUES[brandIndex]}
            screenEmissive={IDENTITY_HUES[brandIndex]}
          >
            {quality.fleetHtml ? (
              <Html
                transform
                /* Oclusão real por pixel (ver MainPhone): o card do celular
                   de trás fica DE VERDADE atrás do slab do da frente. */
                occlude="blending"
                geometry={
                  <primitive object={geometries.holePunch} attach="geometry" />
                }
                position={[0, 0, 0.105]}
                /* MESMA calibração do protagonista: a UI preenche a tela do
                   aparelho inteira — a perspectiva já cuida do tamanho. */
                distanceFactor={2.2}
                wrapperClass="bs-card-html bs-fleet-card"
              >
                <div className="bs-fleet-card-box" aria-hidden="true">
                  <ChatCard
                    variant={brandIndex}
                    message={chat.brands[brandIndex]}
                    status={chat.status}
                  placeholder={chat.placeholder}
                  />
                </div>
              </Html>
            ) : null}
          </PhoneModel>
        </group>
      ))}
    </>
  );
};

export default FleetPhones;
