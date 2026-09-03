import { useMemo } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, MathUtils, Vector3 } from 'three';
import type { PerspectiveCamera } from 'three';
import {
  CAMERA_KEYFRAMES,
  MOBILE_CAMERA_OVERRIDES,
  type CameraKeyframe,
  type QualityPreset,
} from './constants';
import { clamp01 } from './helpers';
import type { ProgressStore } from './Experience';

interface ScrollCameraProps {
  progress: RefObject<ProgressStore>;
  quality: QualityPreset;
}

/* A câmera é 100% função do progresso suavizado: posição e alvo correm em
   splines Catmull-Rom pelos keyframes; fov e roll interpolam por segmento.
   O remapeamento p→t respeita os knots não uniformes (o timing dos waypoints
   é parte da coreografia). Reversível por construção. */
const ScrollCamera = ({ progress, quality }: ScrollCameraProps) => {
  const { positionCurve, targetCurve, keyframes } = useMemo(() => {
    let frames: CameraKeyframe[] = CAMERA_KEYFRAMES;

    if (quality.mobile) {
      /* Retrato: amplitudes laterais ×0.55, fov +5 e enquadramento final
         mais alto/afastado para a coluna protagonista + ambiência. */
      frames = CAMERA_KEYFRAMES.map((keyframe) => {
        const override = MOBILE_CAMERA_OVERRIDES[keyframe.p];
        if (override) {
          return { ...keyframe, ...override };
        }
        return {
          ...keyframe,
          position: [
            keyframe.position[0] * 0.55,
            keyframe.position[1],
            keyframe.position[2],
          ] as [number, number, number],
          target: [
            keyframe.target[0] * 0.55,
            keyframe.target[1],
            keyframe.target[2],
          ] as [number, number, number],
          fov: keyframe.fov + 5,
        };
      });
      frames[frames.length - 1] = {
        ...frames[frames.length - 1],
        /* Alvo ACIMA do protagonista: ele desce no quadro e libera o topo
           para a tagline (tabs ancoram na base, acima do FAB). */
        position: [0, 1.4, 6.6],
        target: [0, 0.6, -2],
        fov: 48,
      };
    }

    return {
      keyframes: frames,
      positionCurve: new CatmullRomCurve3(
        frames.map((keyframe) => new Vector3(...keyframe.position)),
        false,
        'catmullrom',
        0.5,
      ),
      targetCurve: new CatmullRomCurve3(
        frames.map((keyframe) => new Vector3(...keyframe.target)),
        false,
        'catmullrom',
        0.5,
      ),
    };
  }, [quality]);

  const scratch = useMemo(
    () => ({ position: new Vector3(), target: new Vector3() }),
    [],
  );

  useFrame(({ camera }) => {
    const p = clamp01(progress.current.damped);

    let index = 0;
    while (index < keyframes.length - 2 && p > keyframes[index + 1].p) {
      index += 1;
    }
    const from = keyframes[index];
    const to = keyframes[index + 1];
    const local = clamp01((p - from.p) / (to.p - from.p));

    /* getPoint divide a curva uniformemente por segmento — o mesmo espaço do
       remapeamento (índice + fração local). */
    const t = (index + local) / (keyframes.length - 1);
    positionCurve.getPoint(t, scratch.position);
    targetCurve.getPoint(t, scratch.target);

    camera.position.copy(scratch.position);
    camera.lookAt(scratch.target);

    const roll = MathUtils.degToRad(MathUtils.lerp(from.roll, to.roll, local));
    if (roll !== 0) {
      camera.rotateZ(roll);
    }

    const perspective = camera as PerspectiveCamera;
    const fov = MathUtils.lerp(from.fov, to.fov, local);
    if (perspective.fov !== fov) {
      perspective.fov = fov;
      perspective.updateProjectionMatrix();
    }
  }, -1);

  return null;
};

export default ScrollCamera;
