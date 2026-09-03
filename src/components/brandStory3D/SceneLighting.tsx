import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';
import type { DirectionalLight, PointLight } from 'three';
import { Environment, Lightformer } from '@react-three/drei';
import { CORE_POS } from './constants';
import type { SceneChannels } from './timeline';

interface SceneLightingProps {
  channels: SceneChannels;
}

const KEY_FROM = new Color('#cfd8d6');
const KEY_TO = new Color('#bfe6d2');

/* Rig 100% procedural (nenhum HDR de CDN): ambient + key + rim + point do
   núcleo, mais um Environment de Lightformers baked UMA vez (frames=1,
   resolution=64) só para dar vida aos metais e ao vidro. A monocromia do
   primeiro ato é física — luz neutra sobre materiais dessaturados — e a
   virada de cor acontece nas luzes, via canais da timeline. */
const SceneLighting = ({ channels }: SceneLightingProps) => {
  const keyRef = useRef<DirectionalLight>(null);
  const rimRef = useRef<DirectionalLight>(null);
  const coreRef = useRef<PointLight>(null);
  const scratchColor = useMemo(() => new Color(), []);

  useFrame(() => {
    const key = keyRef.current;
    if (key) {
      key.color.copy(scratchColor.copy(KEY_FROM).lerp(KEY_TO, channels.keyBlend));
      key.intensity = 0.9 + 0.2 * channels.keyBlend;
    }
    if (rimRef.current) {
      rimRef.current.intensity = channels.rimIntensity;
    }
    if (coreRef.current) {
      coreRef.current.intensity = channels.coreLight;
    }
  });

  return (
    <>
      <ambientLight color="#253230" intensity={0.35} />
      <directionalLight ref={keyRef} position={[4, 6, 8]} color="#cfd8d6" intensity={0.9} />
      <directionalLight ref={rimRef} position={[-6, 3, -6]} color="#63b0a5" intensity={0.25} />
      <pointLight
        ref={coreRef}
        position={CORE_POS}
        color="#1b7552"
        intensity={0}
        distance={12}
        decay={2}
      />
      <Environment resolution={64} frames={1}>
        <Lightformer
          intensity={1.1}
          color="#f2f7f5"
          position={[0, 4, 0]}
          rotation-x={Math.PI / 2}
          scale={[8, 3, 1]}
        />
        <Lightformer
          intensity={0.5}
          color="#63b0a5"
          position={[-4, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[4, 2, 1]}
        />
        <Lightformer
          intensity={0.3}
          color="#8a6a3f"
          position={[4, 0.5, 2]}
          rotation-y={-Math.PI / 2}
          scale={[3, 2, 1]}
        />
      </Environment>
    </>
  );
};

export default SceneLighting;
