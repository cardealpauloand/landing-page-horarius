import { useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, DoubleSide, MathUtils } from 'three';
import type {
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  ShaderMaterial,
} from 'three';
import { CORE_POS, type QualityPreset } from './constants';
import { clamp01, easeInCubic, smoothstep } from './helpers';
import type { ProgressStore } from './Experience';
import type { SceneChannels } from './timeline';

interface HorariusCoreProps {
  channels: SceneChannels;
  progress: RefObject<ProgressStore>;
  quality: QualityPreset;
}

/* Inclinações base (tortas) dos dois anéis; no flash eles dão "snap" para o
   alinhamento horizontal e depois se expandem e dissolvem — o mundo solta a
   maquinaria quando termina o trabalho. */
const RING_TILTS: [number, number][] = [
  [0.9, 0.35],
  [2.2, -0.5],
];

/* Ruído de valor + fbm (iq) — compartilhado pelos shaders do planeta e das
   nuvens. Procedural de ponta a ponta: nenhuma textura externa. */
const NOISE_GLSL = /* glsl */ `
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0, 0, 0)), hash(i + vec3(1, 0, 0)), f.x),
          mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
          mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }
`;

const PLANET_VERTEX = /* glsl */ `
  varying vec3 vObjDir;
  varying vec3 vWorldNormal;
  varying vec3 vView;

  void main() {
    vObjDir = normalize(position);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vView = cameraPosition - world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

/* O mundo Horarius: continentes esmeralda sobre oceano profundo, terminador
   dia/noite com specular no mar, luzes de cidade acendendo no lado noturno
   e rim atmosférico — tudo na paleta da marca. */
const PLANET_FRAGMENT = /* glsl */ `
  uniform float uEmissive;
  varying vec3 vObjDir;
  varying vec3 vWorldNormal;
  varying vec3 vView;

  ${NOISE_GLSL}

  void main() {
    vec3 n = normalize(vWorldNormal);
    vec3 view = normalize(vView);
    vec3 light = normalize(vec3(4.0, 6.0, 8.0));
    vec3 dir = normalize(vObjDir);

    /* continentes: fbm com limiar suave — geografia estilizada, não literal */
    float shape = fbm(dir * 2.6 + vec3(3.7));
    float land = smoothstep(0.50, 0.56, shape);
    float relief = fbm(dir * 7.0 + vec3(11.0));

    vec3 oceanDeep = vec3(0.024, 0.082, 0.068);
    vec3 oceanShallow = vec3(0.05, 0.145, 0.118);
    vec3 ocean = mix(oceanDeep, oceanShallow, fbm(dir * 4.0 + vec3(5.0)));
    vec3 lowland = vec3(0.106, 0.459, 0.322);
    vec3 highland = vec3(0.29, 0.68, 0.49);
    vec3 landColor = mix(lowland, highland, smoothstep(0.35, 0.78, relief));
    /* costa clara — dá o recorte de mapa premium */
    float coast = smoothstep(0.47, 0.50, shape) - land;
    vec3 albedo = mix(ocean, landColor, land) + coast * vec3(0.10, 0.22, 0.17);

    /* dia/noite com wrap suave */
    float ndl = dot(n, light);
    float day = clamp(ndl * 0.62 + 0.38, 0.0, 1.0);
    vec3 color = albedo * (0.22 + 0.95 * day);

    /* glint do sol no oceano */
    vec3 h = normalize(light + view);
    float spec = pow(max(dot(n, h), 0.0), 42.0) * (1.0 - land) * day * 0.4;
    color += spec * vec3(0.72, 1.0, 0.9);

    /* luzes de cidade no lado noturno, só em terra */
    float night = 1.0 - smoothstep(-0.12, 0.28, ndl);
    float cities = smoothstep(0.78, 0.95, noise(dir * 40.0 + vec3(1.5))) * land * night;
    color += cities * vec3(0.55, 1.0, 0.8) * 0.7;

    /* rim atmosférico interno (acende junto do flash) */
    float fres = pow(1.0 - max(dot(n, view), 0.0), 2.6);
    color += fres * vec3(0.56, 0.91, 0.77) * (0.22 + 0.30 * uEmissive);

    color *= 1.0 + uEmissive * 0.32;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const CLOUD_VERTEX = /* glsl */ `
  varying vec3 vObjDir;
  varying vec3 vWorldNormal;

  void main() {
    vObjDir = normalize(position);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* Véus de nuvem à deriva — discretos de propósito (o mundo é da marca, não
   um globo meteorológico). */
const CLOUD_FRAGMENT = /* glsl */ `
  uniform float uTime;
  varying vec3 vObjDir;
  varying vec3 vWorldNormal;

  ${NOISE_GLSL}

  void main() {
    vec3 dir = normalize(vObjDir);
    vec3 light = normalize(vec3(4.0, 6.0, 8.0));
    float wisps = fbm(dir * 3.1 + vec3(uTime * 0.012, 0.0, uTime * 0.008));
    float alpha = smoothstep(0.55, 0.78, wisps) * 0.28;
    float day = clamp(dot(normalize(vWorldNormal), light) * 0.6 + 0.4, 0.0, 1.0);
    gl_FragColor = vec4(vec3(0.85, 0.97, 0.92), alpha * (0.35 + 0.65 * day));
  }
`;

const ATMOSPHERE_VERTEX = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vView;

  void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vView = cameraPosition - world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

/* Halo atmosférico: fresnel aditivo — o "respiro" mint na borda do mundo. */
const ATMOSPHERE_FRAGMENT = /* glsl */ `
  uniform float uEmissive;
  varying vec3 vWorldNormal;
  varying vec3 vView;

  void main() {
    float fres = pow(1.0 - max(dot(normalize(vWorldNormal), normalize(vView)), 0.0), 3.2);
    vec3 glow = vec3(0.56, 0.91, 0.77);
    gl_FragColor = vec4(glow, fres * (0.32 + 0.30 * uEmissive));
  }
`;

const HorariusCore = ({ channels, progress, quality }: HorariusCoreProps) => {
  const coreGroupRef = useRef<Group>(null);
  const planetRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);
  const planetMaterialRef = useRef<ShaderMaterial>(null);
  const cloudMaterialRef = useRef<ShaderMaterial>(null);
  const atmosphereMaterialRef = useRef<ShaderMaterial>(null);
  const ringPivotRefs = useRef<(Group | null)[]>([]);
  const ringRefs = useRef<(Mesh | null)[]>([]);
  const ringMaterialRefs = useRef<(MeshStandardMaterial | null)[]>([]);
  const shockRef = useRef<Mesh>(null);
  const shockMaterialRef = useRef<MeshBasicMaterial>(null);

  const planetUniforms = useMemo(() => ({ uEmissive: { value: 0 } }), []);
  const cloudUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const atmosphereUniforms = useMemo(() => ({ uEmissive: { value: 0 } }), []);

  useFrame(({ camera, clock }) => {
    const p = clamp01(progress.current.damped);
    const now = clock.elapsedTime;

    /* Manifestação (coreAppear) e recolhimento (settle): o mundo não existe
       antes do ato 2 e, feito o trabalho, encolhe e afunda até sair por
       baixo do enquadramento — o protagonista é o celular. */
    const coreGroup = coreGroupRef.current;
    const settle = smoothstep(0, 1, clamp01((p - 0.58) / 0.14));
    if (coreGroup) {
      const appear = channels.coreAppear;
      coreGroup.visible = appear > 0.001 && settle < 0.999;
      coreGroup.scale.setScalar(
        Math.max(appear * MathUtils.lerp(1, 0.45, settle), 0.0001),
      );
      /* Afunda 2.6u: fora do quadro também no mobile (câmera alta + fov+). */
      coreGroup.position.set(
        CORE_POS[0],
        CORE_POS[1] - 2.6 * settle,
        CORE_POS[2],
      );
    }

    /* Rotação do mundo: ligada ao scroll (reversível) + deriva de relógio
       enquanto houver frames — o planeta nunca parece congelado em cena. */
    const planet = planetRef.current;
    if (planet) {
      planet.rotation.y = p * 1.6 + now * 0.03;
    }
    const clouds = cloudsRef.current;
    if (clouds) {
      clouds.rotation.y = p * 1.6 + now * 0.045;
    }

    const planetMaterial = planetMaterialRef.current;
    if (planetMaterial) {
      planetMaterial.uniforms.uEmissive.value = channels.coreEmissive;
    }
    const cloudMaterial = cloudMaterialRef.current;
    if (cloudMaterial) {
      cloudMaterial.uniforms.uTime.value = now;
    }
    const atmosphereMaterial = atmosphereMaterialRef.current;
    if (atmosphereMaterial) {
      atmosphereMaterial.uniforms.uEmissive.value = channels.coreEmissive;
    }

    /* Precessão ligada ao scroll, acelerando até o flash. */
    const spin = p * 3 + easeInCubic(clamp01((p - 0.36) / 0.14)) * 4;
    RING_TILTS.forEach((tilt, index) => {
      const pivot = ringPivotRefs.current[index];
      const ring = ringRefs.current[index];
      const material = ringMaterialRefs.current[index];
      if (!pivot || !ring || !material) {
        return;
      }
      pivot.rotation.y = spin * (index === 0 ? 1 : -0.8);
      ring.rotation.x = MathUtils.lerp(tilt[0], Math.PI / 2, channels.ringState);
      ring.rotation.z = MathUtils.lerp(tilt[1], 0, channels.ringState);
      ring.scale.setScalar(1 + 0.6 * channels.ringDissolve);
      material.opacity = 0.9 * (1 - channels.ringDissolve);
      ring.visible = channels.ringDissolve < 0.999;
    });

    const shock = shockRef.current;
    const shockMaterial = shockMaterialRef.current;
    if (shock && shockMaterial) {
      const wave = channels.shockwave;
      shock.visible = wave > 0.001 && wave < 0.999;
      /* Expande o suficiente para varrer o quadro inteiro (e o celular). */
      shock.scale.setScalar(1 + 9 * wave);
      shockMaterial.opacity = 0.5 * (1 - wave);
      /* Billboard: o anel de choque sempre encara a câmera. */
      shock.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={coreGroupRef} position={CORE_POS} visible={false}>
      {/* o planeta */}
      <mesh ref={planetRef} rotation={[0.35, 0, -0.12]}>
        <sphereGeometry args={[0.95, quality.planetSegments[0], quality.planetSegments[1]]} />
        <shaderMaterial
          ref={planetMaterialRef}
          uniforms={planetUniforms}
          vertexShader={PLANET_VERTEX}
          fragmentShader={PLANET_FRAGMENT}
        />
      </mesh>

      {/* véus de nuvem */}
      <mesh ref={cloudsRef} rotation={[0.35, 1.2, -0.12]}>
        <sphereGeometry args={[0.985, quality.planetSegments[0], quality.planetSegments[1]]} />
        <shaderMaterial
          ref={cloudMaterialRef}
          uniforms={cloudUniforms}
          vertexShader={CLOUD_VERTEX}
          fragmentShader={CLOUD_FRAGMENT}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* halo atmosférico */}
      <mesh>
        <sphereGeometry args={[1.13, 48, 32]} />
        <shaderMaterial
          ref={atmosphereMaterialRef}
          uniforms={atmosphereUniforms}
          vertexShader={ATMOSPHERE_VERTEX}
          fragmentShader={ATMOSPHERE_FRAGMENT}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      {RING_TILTS.map((tilt, index) => (
        <group
          key={tilt.join(',')}
          ref={(pivot) => {
            ringPivotRefs.current[index] = pivot;
          }}
        >
          <mesh
            ref={(ring) => {
              ringRefs.current[index] = ring;
            }}
            rotation={[tilt[0], 0, tilt[1]]}
          >
            <torusGeometry args={[1.45, 0.015, 8, 96]} />
            <meshStandardMaterial
              ref={(material) => {
                ringMaterialRefs.current[index] = material;
              }}
              color="#2a3a37"
              metalness={0.9}
              roughness={0.35}
              emissive="#63b0a5"
              emissiveIntensity={0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* depthTest off + renderOrder alto: a onda ATRAVESSA o celular em vez
          de ser cortada pelo slab — é o momento-chave da travessia. */}
      <mesh ref={shockRef} visible={false} renderOrder={30}>
        <ringGeometry args={[0.98, 1, 64]} />
        <meshBasicMaterial
          ref={shockMaterialRef}
          color="#8fe8c4"
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default HorariusCore;
