import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';
import type { FogExp2, ShaderMaterial } from 'three';
import { SCENE_BG, SCENE_BG_LIFT } from './constants';
import type { SceneChannels } from './timeline';

interface BackdropProps {
  channels: SceneChannels;
}

const BG = new Color(SCENE_BG);
const BG_LIFT = new Color(SCENE_BG_LIFT);

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* Quatro blobs radiais — a mesma linguagem dos radial-gradients do Hero/CTA
   — que migram de um verde-cinza monocromático para os hues das marcas
   conforme a identidade nasce (uniform uHue). uLift é o respiro do flash
   (o backplane É o fundo da cena — o canvas é alpha para a oclusão real dos
   cards DOM, então não existe scene.background). Sync: IDENTITY_HUES em
   brandStoryShared.ts (verde/rosa/azul/âmbar). */
const FRAGMENT_SHADER = /* glsl */ `
  uniform float uHue;
  uniform float uLift;
  varying vec2 vUv;

  float blob(vec2 uv, vec2 center, float radius) {
    return smoothstep(radius, 0.0, distance(uv, center));
  }

  void main() {
    /* #0a1512 → #0e1f19 no flash */
    vec3 base = mix(vec3(0.039, 0.082, 0.070), vec3(0.055, 0.122, 0.098), uLift);
    vec3 mono = vec3(0.16, 0.20, 0.19);
    vec3 auroraHue = vec3(0.106, 0.459, 0.322);
    vec3 belaHue = vec3(0.635, 0.329, 0.494);
    vec3 sorrisoHue = vec3(0.235, 0.435, 0.647);

    /* Centros alinhados ao tríptico do finale: bela à esquerda, aurora ao
       centro, sorriso à direita. */
    float blobAurora = blob(vUv, vec2(0.5, 0.44), 0.4);
    float blobBela = blob(vUv, vec2(0.32, 0.46), 0.36);
    float blobSorriso = blob(vUv, vec2(0.68, 0.46), 0.34);

    vec3 color = base
      + mix(mono, auroraHue, uHue) * blobAurora * 0.12
      + mix(mono, belaHue, uHue) * blobBela * 0.12
      + mix(mono, sorrisoHue, uHue) * blobSorriso * 0.10;

    gl_FragColor = vec4(color, 1.0);
  }
`;

/* Fundo do palco: com o canvas em alpha (oclusão real dos cards DOM), o
   backplane assume o papel de scene.background — cobre o frustum inteiro a
   z=-20 e carrega base + respiro do flash + blobs. A névoa continua na cena
   (cor mutada por frame); o ShaderMaterial ignora a névoa (fog: false por
   padrão) de propósito — quem some na névoa são os objetos, não o fundo. */
const Backdrop = ({ channels }: BackdropProps) => {
  const fogRef = useRef<FogExp2>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const scratchRef = useRef({ color: new Color(SCENE_BG) });
  const uniforms = useMemo(
    () => ({ uHue: { value: 0 }, uLift: { value: 0 } }),
    [],
  );

  useFrame(() => {
    const scratch = scratchRef.current;
    scratch.color.copy(BG).lerp(BG_LIFT, channels.bgLift);

    const fog = fogRef.current;
    if (fog) {
      fog.density = channels.fogDensity;
      fog.color.copy(scratch.color);
    }

    const material = materialRef.current;
    if (material) {
      /* O fundo ganha cor junto com a identidade e cresce com o ecossistema. */
      material.uniforms.uHue.value = Math.max(
        channels.screenIdentity,
        channels.fleetReveal,
      );
      material.uniforms.uLift.value = channels.bgLift;
    }
  });

  return (
    <>
      <fogExp2 ref={fogRef} attach="fog" args={[SCENE_BG, 0.06]} />
      <mesh position={[0, 1, -20]} frustumCulled={false}>
        <planeGeometry args={[80, 40]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};

export default Backdrop;
