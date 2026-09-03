import { useEffect, useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  CatmullRomCurve3,
  Color,
  DoubleSide,
  InstancedBufferAttribute,
  Matrix4,
  Quaternion,
  Vector3,
} from 'three';
import type { InstancedMesh, ShaderMaterial } from 'three';
import {
  CAMERA_KEYFRAMES,
  CORE_POS,
  MAIN_POS,
  SCENE_BG,
  SCENE_BG_LIFT,
  type QualityPreset,
} from './constants';
import { clamp01, createRng, createRoundedPlateGeometry } from './helpers';
import type { ProgressStore } from './Experience';
import type { SceneChannels } from './timeline';

interface CloneFieldProps {
  channels: SceneChannels;
  progress: RefObject<ProgressStore>;
  quality: QualityPreset;
}

/* O mundo genérico: um campo de celulares IDÊNTICOS em profundidade — "essa
   IA poderia ser de qualquer empresa". Dois InstancedMesh (corpos + telas)
   com matrizes escritas UMA vez; todo movimento (drift ligado ao scroll,
   espiral de absorção rumo ao núcleo) vive no vertex shader — o padrão do
   TransitionParticles. Por frame, só uniforms. */

/* Chunk compartilhado: decompõe a matriz da instância, aplica drift ligado
   ao progresso e, a partir de aAbsorbStart, espirala a ORIGEM da instância
   para o núcleo enquanto a forma encolhe — reversível por construção. */
const CLONE_TRANSFORM = /* glsl */ `
  uniform float uProgress;
  uniform vec3 uCore;
  attribute vec3 aDrift;
  attribute float aAbsorbStart;
  attribute float aSwirl;
  attribute float aPhase;
  varying float vFogDepth;
  varying float vLight;
  varying float vPhase;
  varying vec2 vUv;

  float easeInCubic(float t) { return t * t * t; }
  float easeInOutSine(float t) { return -(cos(3.14159265 * t) - 1.0) / 2.0; }

  vec4 cloneWorldPosition() {
    float q = clamp((uProgress - aAbsorbStart) / 0.1, 0.0, 1.0);

    vec3 origin = instanceMatrix[3].xyz + aDrift * min(uProgress, aAbsorbStart);
    vec3 rel = origin - uCore;
    float radius = length(rel.xz) * (1.0 - easeInCubic(q));
    float angle = atan(rel.z, rel.x) + aSwirl * easeInOutSine(q);
    float height = rel.y * (1.0 - q * q);
    vec3 swirled = uCore + vec3(cos(angle) * radius, height, sin(angle) * radius);

    float shrink = 1.0 - q * q;
    vec4 world = instanceMatrix * vec4(position, 1.0);
    vec3 shape = (world.xyz - instanceMatrix[3].xyz) * shrink;

    vec3 lightDir = normalize(vec3(0.45, 0.7, 0.75));
    vec3 worldNormal = normalize(mat3(instanceMatrix) * normal);
    vLight = 0.42 + 0.58 * max(dot(worldNormal, lightDir), 0.0);
    vPhase = aPhase;
    vUv = uv;

    return vec4(swirled + shape, 1.0);
  }
`;

const CLONE_VERTEX = /* glsl */ `
  ${CLONE_TRANSFORM}

  void main() {
    vec4 world = cloneWorldPosition();
    vec4 mvPosition = viewMatrix * world;
    vFogDepth = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/* Névoa exp2 manual (ShaderMaterial não entra no sistema de fog da cena):
   mesma fórmula/cor do Backdrop para os clones sumirem na distância. */
const CLONE_FOG = /* glsl */ `
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  varying float vFogDepth;

  vec3 applyFog(vec3 color) {
    float factor = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
    return mix(color, uFogColor, factor);
  }
`;

const BODY_FRAGMENT = /* glsl */ `
  ${CLONE_FOG}
  varying float vLight;
  varying float vPhase;
  varying vec2 vUv;

  void main() {
    vec3 slab = vec3(0.075, 0.11, 0.10);
    gl_FragColor = vec4(applyFog(slab * vLight), 1.0);
  }
`;

/* Telas: brilho frio com "linhas de mensagem" procedurais alternando
   esquerda/direita — de perto lê como conversa, de longe como janelas
   acesas. uCloneFade apaga as telas conforme o núcleo drena o mundo. */
const SCREEN_FRAGMENT = /* glsl */ `
  ${CLONE_FOG}
  uniform float uCloneFade;
  varying float vLight;
  varying float vPhase;
  varying vec2 vUv;

  void main() {
    vec3 screenBase = vec3(0.052, 0.082, 0.075);
    vec3 barTone = vec3(0.30, 0.36, 0.34);

    /* header: faixa no topo com um "avatar" redondo apagado */
    float header = step(0.86, vUv.y);
    float avatar = smoothstep(0.05, 0.03, distance(vUv, vec2(0.14, 0.92)));

    /* linhas de mensagem: 5 fileiras, lado alternando por fileira + fase */
    float rowH = 0.14;
    float row = floor((0.84 - vUv.y) / rowH);
    float inRow = fract((0.84 - vUv.y) / rowH);
    float rowMask = step(0.2, inRow) * step(inRow, 0.78) * step(0.0, row) * step(row, 4.0);
    float side = mod(row + floor(vPhase * 4.0), 2.0);
    float barW = 0.42 + 0.2 * fract(sin(row * 37.7 + vPhase * 61.0) * 43758.5453);
    float x0 = mix(0.08, 0.92 - barW, side);
    float bar = step(x0, vUv.x) * step(vUv.x, x0 + barW) * rowMask * (1.0 - header);

    float glow = 0.35 + 0.65 * uCloneFade;
    vec3 color = screenBase * (0.6 + 0.4 * vLight) * glow;
    color += barTone * (bar * 0.5 + header * 0.14 + avatar * 0.6) * glow;

    gl_FragColor = vec4(applyFog(color), 1.0);
  }
`;

const BG = new Color(SCENE_BG);
const BG_LIFT = new Color(SCENE_BG_LIFT);

const CloneField = ({ channels, progress, quality }: CloneFieldProps) => {
  const bodyRef = useRef<InstancedMesh>(null);
  const screenRef = useRef<InstancedMesh>(null);
  const bodyMaterialRef = useRef<ShaderMaterial>(null);
  const screenMaterialRef = useRef<ShaderMaterial>(null);

  const { bodyGeometry, screenGeometry, count, matrices, attributes, uniforms } =
    useMemo(() => {
      const rng = createRng(0x436c6f6e);
      const count = quality.cloneCount;

      /* Clones a meia escala, no MESMO aspecto de iPhone do protagonista:
         leem como "celulares em profundidade" sem competir com ele. A tela é
         deslocada no próprio buffer (+z) para os dois meshes compartilharem
         as MESMAS matrizes. */
      const bodyGeometry = createRoundedPlateGeometry(0.82, 1.7, 0.07, 0.13);
      const screenGeometry = createRoundedPlateGeometry(0.72, 1.56, 0.02, 0.1);
      screenGeometry.translate(0, 0, 0.05);

      /* Amostras da spline da câmera (mesma transformação mobile do
         ScrollCamera) para o rejection sampling: nada atravessa a lente. */
      const cameraPoints = CAMERA_KEYFRAMES.map(
        (keyframe) =>
          new Vector3(
            keyframe.position[0] * (quality.mobile ? 0.55 : 1),
            keyframe.position[1],
            keyframe.position[2],
          ),
      );
      const cameraSamples = new CatmullRomCurve3(
        cameraPoints,
        false,
        'catmullrom',
        0.5,
      ).getPoints(64);

      const fieldX = quality.mobile ? 4 : 7;
      const main = new Vector3(...MAIN_POS);

      const matrices = new Float32Array(count * 16);
      const drift = new Float32Array(count * 3);
      const absorbStart = new Float32Array(count);
      const swirl = new Float32Array(count);
      const phase = new Float32Array(count);

      const position = new Vector3();
      const quaternion = new Quaternion();
      const euler = new Vector3();
      const scale = new Vector3();
      const matrix = new Matrix4();

      for (let i = 0; i < count; i += 1) {
        for (let attempt = 0; attempt < 12; attempt += 1) {
          position.set(
            (rng() * 2 - 1) * fieldX,
            (rng() * 2 - 1) * 2.4 + 0.3,
            -12 + rng() * 11.5,
          );
          const clearOfCamera = cameraSamples.every(
            (sample) =>
              Math.abs(sample.z - position.z) > 0.9 ||
              Math.hypot(sample.x - position.x, sample.y - position.y) > 1.3,
          );
          const clearOfMain =
            Math.hypot(position.x - main.x, position.z - main.z) > 1.9;
          if (clearOfCamera && clearOfMain) {
            break;
          }
        }

        /* Encaram a câmera com variação sutil — são celulares, não confete. */
        euler.set((rng() - 0.5) * 0.24, (rng() - 0.5) * 0.9, (rng() - 0.5) * 0.16);
        quaternion.setFromAxisAngle(new Vector3(0, 1, 0), euler.y);
        quaternion.multiply(
          new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), euler.x),
        );
        quaternion.multiply(
          new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), euler.z),
        );

        matrix.compose(
          position,
          quaternion,
          scale.setScalar(0.85 + rng() * 0.4),
        );
        matrix.toArray(matrices, i * 16);

        drift[i * 3] = (rng() * 2 - 1) * 0.5;
        drift[i * 3 + 1] = (rng() * 2 - 1) * 0.3;
        drift[i * 3 + 2] = (rng() * 2 - 1) * 0.2;
        /* Janela apertada de propósito: a espiral (dur. 0.1 no shader) termina
           até p≈0.56, antes de o campo desligar (alive=false) — sem pop. */
        absorbStart[i] = 0.38 + 0.08 * rng();
        swirl[i] = (rng() > 0.5 ? 1 : -1) * (0.6 + rng() * 0.8);
        phase[i] = rng();
      }

      const attributes = {
        aDrift: new InstancedBufferAttribute(drift, 3),
        aAbsorbStart: new InstancedBufferAttribute(absorbStart, 1),
        aSwirl: new InstancedBufferAttribute(swirl, 1),
        aPhase: new InstancedBufferAttribute(phase, 1),
      };

      /* Uniforms compartilhados pelos DOIS materiais: um objeto por material
         (three exige identidade própria), mesmos valores por frame. */
      const makeUniforms = () => ({
        uProgress: { value: 0 },
        uCloneFade: { value: 1 },
        uCore: { value: new Vector3(...CORE_POS) },
        uFogColor: { value: new Color(SCENE_BG) },
        uFogDensity: { value: 0.055 },
      });

      return {
        bodyGeometry,
        screenGeometry,
        count,
        matrices,
        attributes,
        uniforms: { body: makeUniforms(), screen: makeUniforms() },
      };
    }, [quality]);

  /* Matrizes e atributos instanciados escritos UMA vez por montagem. */
  useEffect(() => {
    [bodyRef.current, screenRef.current].forEach((mesh) => {
      if (!mesh) {
        return;
      }
      mesh.instanceMatrix.array.set(matrices);
      mesh.instanceMatrix.needsUpdate = true;
      mesh.geometry.setAttribute('aDrift', attributes.aDrift);
      mesh.geometry.setAttribute('aAbsorbStart', attributes.aAbsorbStart);
      mesh.geometry.setAttribute('aSwirl', attributes.aSwirl);
      mesh.geometry.setAttribute('aPhase', attributes.aPhase);
    });
  }, [matrices, attributes]);

  useEffect(
    () => () => {
      bodyGeometry.dispose();
      screenGeometry.dispose();
    },
    [bodyGeometry, screenGeometry],
  );

  const scratchFog = useMemo(() => new Color(), []);

  useFrame(() => {
    /* O campo morre por completo depois da absorção — some da GPU. */
    const alive = channels.cloneFade > 0.001 || channels.absorbRamp > 0.001;
    const body = bodyRef.current;
    const screen = screenRef.current;
    if (body) {
      body.visible = alive;
    }
    if (screen) {
      screen.visible = alive;
    }
    if (!alive) {
      return;
    }

    scratchFog.copy(BG).lerp(BG_LIFT, channels.bgLift);
    const p = clamp01(progress.current.damped);

    [bodyMaterialRef.current, screenMaterialRef.current].forEach((material) => {
      if (!material) {
        return;
      }
      material.uniforms.uProgress.value = p;
      material.uniforms.uCloneFade.value = channels.cloneFade;
      material.uniforms.uFogDensity.value = channels.fogDensity;
      (material.uniforms.uFogColor.value as Color).copy(scratchFog);
    });
  });

  return (
    <>
      <instancedMesh
        ref={bodyRef}
        args={[bodyGeometry, undefined, count]}
        frustumCulled={false}
      >
        <shaderMaterial
          ref={bodyMaterialRef}
          uniforms={uniforms.body}
          vertexShader={CLONE_VERTEX}
          fragmentShader={BODY_FRAGMENT}
        />
      </instancedMesh>
      <instancedMesh
        ref={screenRef}
        args={[screenGeometry, undefined, count]}
        frustumCulled={false}
      >
        <shaderMaterial
          ref={screenMaterialRef}
          uniforms={uniforms.screen}
          vertexShader={CLONE_VERTEX}
          fragmentShader={SCREEN_FRAGMENT}
          side={DoubleSide}
        />
      </instancedMesh>
    </>
  );
};

export default CloneField;
