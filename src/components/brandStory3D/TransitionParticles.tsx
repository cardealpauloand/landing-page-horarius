import { useEffect, useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color } from 'three';
import type { ShaderMaterial } from 'three';
import { CORE_POS, IDENTITY_HUES, MAIN_POS, type QualityPreset } from './constants';
import { clamp01, createRng } from './helpers';
import type { ProgressStore } from './Experience';
import type { SceneChannels } from './timeline';

interface TransitionParticlesProps {
  channels: SceneChannels;
  progress: RefObject<ProgressStore>;
  quality: QualityPreset;
}

/* Ambos os sistemas são 100% vertex-shader: atributos fixos + uniform de
   progresso — zero CPU por frame, reversíveis por construção. */

const ABSORB_VERTEX = /* glsl */ `
  uniform float uProgress;
  uniform float uPixelRatio;
  attribute vec3 aCyl;
  attribute float aWindow;
  attribute float aSwirl;
  attribute float aSize;
  varying float vQ;
  varying float vFade;

  float easeInCubic(float t) { return t * t * t; }
  float easeInQuad(float t) { return t * t; }
  float easeInOutSine(float t) { return -(cos(3.14159265 * t) - 1.0) / 2.0; }

  void main() {
    float q = clamp((uProgress - aWindow) / 0.09, 0.0, 1.0);
    float radius = aCyl.x * (1.0 - easeInCubic(q));
    float angle = aCyl.y + aSwirl * easeInOutSine(q);
    float height = aCyl.z * (1.0 - easeInQuad(q));
    vec3 transformed = vec3(cos(angle) * radius, height, sin(angle) * radius);

    vQ = q;
    vFade = 1.0 - smoothstep(0.85, 1.0, q);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_PointSize = aSize * uPixelRatio * (6.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const ABSORB_FRAGMENT = /* glsl */ `
  uniform float uRamp;
  varying float vQ;
  varying float vFade;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.15, dist) * uRamp * vFade;
    if (alpha < 0.002) discard;
    vec3 gray = vec3(0.42, 0.45, 0.44);
    vec3 tint = vec3(0.561, 0.910, 0.769);
    gl_FragColor = vec4(mix(gray, tint, smoothstep(0.2, 0.9, vQ)), alpha);
  }
`;

const EMIT_VERTEX = /* glsl */ `
  uniform float uProgress;
  uniform float uPixelRatio;
  attribute float aDelay;
  attribute vec3 aTarget;
  attribute vec3 aHue;
  attribute float aSize;
  varying vec3 vColor;
  varying float vAlpha;

  float easeOutCubic(float t) { return 1.0 - pow(1.0 - t, 3.0); }

  void main() {
    float q = clamp((uProgress - 0.52 - aDelay) / 0.13, 0.0, 1.0);
    float e = easeOutCubic(q);

    /* Bézier quadrática núcleo → arco elevado → celular: jatos DESENHADOS,
       não espalhados. */
    vec3 mid = aTarget * 0.5 + vec3(0.0, 2.2, 0.0);
    vec3 legA = mix(vec3(0.0), mid, e);
    vec3 legB = mix(mid, aTarget, e);
    vec3 transformed = mix(legA, legB, e);

    vColor = mix(vec3(0.851, 1.0, 0.941), aHue, smoothstep(0.15, 0.7, q));
    vAlpha = step(0.001, q);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    float size = aSize * (0.4 + 0.6 * sin(3.14159265 * e));
    gl_PointSize = size * uPixelRatio * (6.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const EMIT_FRAGMENT = /* glsl */ `
  uniform float uRamp;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.12, dist) * uRamp * vAlpha;
    if (alpha < 0.002) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const TransitionParticles = ({ channels, progress, quality }: TransitionParticlesProps) => {
  const { absorbGeometry, emitGeometry, absorbUniforms, emitUniforms } = useMemo(() => {
    const rng = createRng(0x69646e74);

    /* Ambos os sistemas vivem num grupo em CORE_POS: as coordenadas abaixo
       são RELATIVAS ao núcleo (a espiral converge para a origem local). */

    /* Poeira da absorção: nasce no volume do campo de clones, espirala pro
       núcleo. */
    const fieldX = quality.mobile ? 4 : 6.5;
    const absorbCount = quality.absorbCount;
    const absorbCyl = new Float32Array(absorbCount * 3);
    const absorbWindow = new Float32Array(absorbCount);
    const absorbSwirl = new Float32Array(absorbCount);
    const absorbSize = new Float32Array(absorbCount);
    for (let i = 0; i < absorbCount; i += 1) {
      const x = (rng() * 2 - 1) * fieldX;
      const y = (rng() * 2 - 1) * 2.2 - 0.4;
      const z = -9.4 + rng() * 10.4;
      absorbCyl[i * 3] = Math.hypot(x, z);
      absorbCyl[i * 3 + 1] = Math.atan2(z, x);
      absorbCyl[i * 3 + 2] = y;
      absorbWindow[i] = 0.36 + 0.12 * rng();
      absorbSwirl[i] = (rng() > 0.5 ? 1 : -1) * (0.8 + rng() * 0.8);
      absorbSize[i] = 6 + rng() * 8;
    }

    const absorbGeometry = new BufferGeometry();
    absorbGeometry.setAttribute('position', new BufferAttribute(new Float32Array(absorbCount * 3), 3));
    absorbGeometry.setAttribute('aCyl', new BufferAttribute(absorbCyl, 3));
    absorbGeometry.setAttribute('aWindow', new BufferAttribute(absorbWindow, 1));
    absorbGeometry.setAttribute('aSwirl', new BufferAttribute(absorbSwirl, 1));
    absorbGeometry.setAttribute('aSize', new BufferAttribute(absorbSize, 1));

    /* Erupção de identidade: do núcleo para o volume do celular protagonista,
       num fluxo com os hues das marcas misturados — a energia de "todas as
       identidades" condensando na mesma interface. Alvos relativos ao núcleo. */
    const mainRel: [number, number, number] = [
      MAIN_POS[0] - CORE_POS[0],
      MAIN_POS[1] - CORE_POS[1],
      MAIN_POS[2] - CORE_POS[2],
    ];
    const emitCount = quality.emitCount;
    const emitDelay = new Float32Array(emitCount);
    const emitTarget = new Float32Array(emitCount * 3);
    const emitHue = new Float32Array(emitCount * 3);
    const emitSize = new Float32Array(emitCount);
    const hueColor = new Color();
    for (let i = 0; i < emitCount; i += 1) {
      emitDelay[i] = rng() * 0.05;
      emitTarget[i * 3] = mainRel[0] + (rng() * 2 - 1) * 1.1;
      emitTarget[i * 3 + 1] = mainRel[1] + (rng() * 2 - 1) * 1.5;
      emitTarget[i * 3 + 2] = mainRel[2] + (rng() * 2 - 1) * 0.3;
      hueColor
        .set(IDENTITY_HUES[i % IDENTITY_HUES.length])
        .offsetHSL(0, 0, (rng() - 0.5) * 0.08);
      emitHue[i * 3] = hueColor.r;
      emitHue[i * 3 + 1] = hueColor.g;
      emitHue[i * 3 + 2] = hueColor.b;
      emitSize[i] = 8 + rng() * 10;
    }

    const emitGeometry = new BufferGeometry();
    emitGeometry.setAttribute('position', new BufferAttribute(new Float32Array(emitCount * 3), 3));
    emitGeometry.setAttribute('aDelay', new BufferAttribute(emitDelay, 1));
    emitGeometry.setAttribute('aTarget', new BufferAttribute(emitTarget, 3));
    emitGeometry.setAttribute('aHue', new BufferAttribute(emitHue, 3));
    emitGeometry.setAttribute('aSize', new BufferAttribute(emitSize, 1));

    return {
      absorbGeometry,
      emitGeometry,
      absorbUniforms: {
        uProgress: { value: 0 },
        uPixelRatio: { value: 1 },
        uRamp: { value: 0 },
      },
      emitUniforms: {
        uProgress: { value: 0 },
        uPixelRatio: { value: 1 },
        uRamp: { value: 0 },
      },
    };
  }, [quality]);

  useEffect(
    () => () => {
      absorbGeometry.dispose();
      emitGeometry.dispose();
    },
    [absorbGeometry, emitGeometry],
  );

  /* Uniforms são atualizados pelos refs dos materiais (mutação via .current
     — o único padrão de escrita por frame que o lint do Compiler aceita). */
  const absorbMaterialRef = useRef<ShaderMaterial>(null);
  const emitMaterialRef = useRef<ShaderMaterial>(null);

  useFrame(({ gl }) => {
    const p = clamp01(progress.current.damped);
    const pixelRatio = gl.getPixelRatio();

    const absorbMaterial = absorbMaterialRef.current;
    if (absorbMaterial) {
      absorbMaterial.uniforms.uProgress.value = p;
      absorbMaterial.uniforms.uPixelRatio.value = pixelRatio;
      absorbMaterial.uniforms.uRamp.value = channels.absorbRamp;
    }

    const emitMaterial = emitMaterialRef.current;
    if (emitMaterial) {
      emitMaterial.uniforms.uProgress.value = p;
      emitMaterial.uniforms.uPixelRatio.value = pixelRatio;
      emitMaterial.uniforms.uRamp.value = channels.emitRamp;
    }
  });

  return (
    <group position={CORE_POS}>
      <points geometry={absorbGeometry} frustumCulled={false}>
        <shaderMaterial
          ref={absorbMaterialRef}
          uniforms={absorbUniforms}
          vertexShader={ABSORB_VERTEX}
          fragmentShader={ABSORB_FRAGMENT}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
      <points geometry={emitGeometry} frustumCulled={false}>
        <shaderMaterial
          ref={emitMaterialRef}
          uniforms={emitUniforms}
          vertexShader={EMIT_VERTEX}
          fragmentShader={EMIT_FRAGMENT}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default TransitionParticles;
