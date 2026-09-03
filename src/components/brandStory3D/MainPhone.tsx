import { useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, MathUtils } from 'three';
import type {
  Group,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PointLight,
} from 'three';
import { Html } from '@react-three/drei';
import ChatCard from './ChatCard';
import PhoneModel from './PhoneModel';
import type { PhoneGeometries } from './PhoneModel';
import type { BrandStoryChatContent } from '../BrandStory';
import {
  FINALE_SLOTS,
  FRAME_ANODIZE_DARK,
  FRAME_ANODIZE_MIX,
  FRAME_TITANIUM,
  IDENTITY_HUES,
  MAIN_POS,
  MORPH_DURATION,
  type QualityPreset,
  type SpotlightState,
} from './constants';
import { clamp01, easeInOutSine } from './helpers';
import type { SceneChannels } from './timeline';

interface MainPhoneProps {
  channels: SceneChannels;
  quality: QualityPreset;
  geometries: PhoneGeometries;
  chat: BrandStoryChatContent;
  spotlightRef: RefObject<SpotlightState>;
}

/* O protagonista: o MESMO celular do primeiro ao último ato. Nasce genérico
   (card neutro dessaturado), atravessa o flash (emissivo da tela pulsa com a
   shockwave), ganha identidade (aro anodizado/acento/luz sobem com
   screenIdentity — Barbearia Aurora) e recua para o slot 0 do ecossistema no
   respiro.

   O card é UM drei Html com a pilha de conversas; o crossfade
   genérico→marca (e, no mobile, marca→marca via tabs) é 100% CSS keyed em
   data-stage/data-identity — o DOM nunca re-renderiza por troca. O card
   genérico é visível desde p=0 DE PROPÓSITO: o celular é o protagonista. */
const MainPhone = ({
  channels,
  quality,
  geometries,
  chat,
  spotlightRef,
}: MainPhoneProps) => {
  const variant = quality.mobile ? 'mobile' : 'desktop';
  const groupRef = useRef<Group>(null);
  const frameMaterialRef = useRef<MeshPhysicalMaterial | null>(null);
  const screenMaterialRef = useRef<MeshStandardMaterial | null>(null);
  const accentBarMaterialRef = useRef<MeshBasicMaterial | null>(null);
  const stageMaterialRef = useRef<MeshBasicMaterial | null>(null);
  const accentLightRef = useRef<PointLight | null>(null);
  const scratchRef = useRef({
    color: new Color(IDENTITY_HUES[0]),
    /* Aro: hue ativo afundado no grafite (anodizado) e a base titânio. */
    anodized: new Color(),
    anodizeDark: new Color(FRAME_ANODIZE_DARK),
    titanium: new Color(FRAME_TITANIUM),
  });
  const identityColors = useMemo(
    () => IDENTITY_HUES.map((hue) => new Color(hue)),
    [],
  );

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const now = clock.elapsedTime;
    const identity = channels.screenIdentity;
    const recede = channels.mainRecede;
    const fleet = channels.fleetReveal;
    const slot = FINALE_SLOTS[variant][0];

    /* Viagem MAIN_POS → slot 0 (o tween já traz o ease; aqui é lerp puro),
       com um respiro de flutuação só quando o ecossistema está vivo. */
    const bob = 0.03 * Math.sin(now * 0.7) * fleet;
    group.position.set(
      MathUtils.lerp(MAIN_POS[0], slot.position[0], recede),
      MathUtils.lerp(MAIN_POS[1], slot.position[1], recede) + bob,
      MathUtils.lerp(MAIN_POS[2], slot.position[2], recede),
    );
    group.rotation.y = slot.rotY * recede + 0.015 * Math.sin(now * 0.4) * fleet;

    /* Ênfase do spotlight no finale: no desktop o protagonista é a Barbearia
       (ativo quando identity=0); no mobile ele é o palco de TODAS as tabs. */
    const spot = spotlightRef.current;
    const morph =
      spot.switchedAt < 0
        ? 1
        : clamp01((now - spot.switchedAt) / MORPH_DURATION);
    const morphE = easeInOutSine(morph);
    let emphasis = 1;
    if (fleet > 0.001 && !quality.mobile) {
      const wasActive = spot.prevIndex === 0 ? 1 : 0;
      const isActive = spot.index === 0 ? 1 : 0;
      const active = wasActive + (isActive - wasActive) * morphE;
      emphasis = 1 - 0.06 * fleet * (1 - active);
    }
    group.scale.setScalar(emphasis);

    /* Cor do acento: fixa na barbearia no desktop; no mobile acompanha a
       identidade ativa (as tabs trocam o card DESTE celular). */
    const scratch = scratchRef.current;
    if (quality.mobile && fleet > 0.001) {
      scratch.color
        .copy(identityColors[spot.prevIndex])
        .lerp(identityColors[spot.index], morphE);
    } else {
      scratch.color.copy(identityColors[0]);
    }

    /* A "bordinha": o aro sai do titânio genérico para o anodizado da marca
       junto com o nascimento da identidade (no mobile, acompanha as tabs). */
    const frame = frameMaterialRef.current;
    if (frame) {
      scratch.anodized
        .copy(scratch.color)
        .lerp(scratch.anodizeDark, FRAME_ANODIZE_MIX);
      frame.color.copy(scratch.titanium).lerp(scratch.anodized, identity);
    }
    const accentBar = accentBarMaterialRef.current;
    if (accentBar) {
      accentBar.color.copy(scratch.color);
      accentBar.opacity = 0.95 * identity;
    }
    const accentLight = accentLightRef.current;
    if (accentLight) {
      accentLight.color.copy(scratch.color);
      accentLight.intensity = 1.4 * identity;
    }
    const stage = stageMaterialRef.current;
    if (stage) {
      stage.color.copy(scratch.color);
      stage.opacity = 0.14 * identity;
    }
    /* O flash da travessia pulsa NA tela — a onda passa por dentro. */
    const screen = screenMaterialRef.current;
    if (screen) {
      screen.emissiveIntensity =
        1.6 * Math.sin(Math.PI * clamp01(channels.shockwave));
    }
  });

  return (
    <group ref={groupRef} position={MAIN_POS}>
      <PhoneModel
        geometries={geometries}
        frameRef={(material) => {
          frameMaterialRef.current = material;
        }}
        screenRef={(material) => {
          screenMaterialRef.current = material;
        }}
        accentBarRef={(material) => {
          accentBarMaterialRef.current = material;
        }}
        stageRef={(material) => {
          stageMaterialRef.current = material;
        }}
        accentLightRef={(light) => {
          accentLightRef.current = light;
        }}
        accent={IDENTITY_HUES[0]}
        screenEmissive="#8fe8c4"
      >
        <Html
          transform
          /* Oclusão REAL por pixel: o card vive atrás do canvas (alpha) e
             aparece por um furo de profundidade — slabs 3D mais próximos o
             cobrem naturalmente ("cada um na sua camada"). O furo usa a
             geometria arredondada pré-dimensionada (cantos do card). */
          occlude="blending"
          geometry={<primitive object={geometries.holePunch} attach="geometry" />}
          position={[0, 0, 0.105]}
          /* Calibrado para o card (280×597px) preencher a tela (1.5×3.2u)
             com uma moldura fina — proporção do iPhone do hero. */
          distanceFactor={quality.mobile ? 2.05 : 2.2}
          wrapperClass="bs-card-html"
        >
          <div className="bs-main-card" aria-hidden="true">
            <ChatCard
              variant="generic"
              message={chat.generic}
              status={chat.status}
              placeholder={chat.placeholder}
            />
            {quality.mobile ? (
              chat.brands.map((brand, index) => (
                <ChatCard
                  key={brand.name}
                  variant={index}
                  message={brand}
                  status={chat.status}
                  placeholder={chat.placeholder}
                  className="bs-card--morph"
                />
              ))
            ) : (
              <ChatCard
                variant={0}
                message={chat.brands[0]}
                status={chat.status}
                placeholder={chat.placeholder}
                className="bs-card--pinned"
              />
            )}
          </div>
        </Html>
      </PhoneModel>
    </group>
  );
};

export default MainPhone;
