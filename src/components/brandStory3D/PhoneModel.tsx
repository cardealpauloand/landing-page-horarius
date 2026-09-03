import type { ReactNode } from 'react';
import { AdditiveBlending } from 'three';
import type {
  BufferGeometry,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PointLight,
} from 'three';
import { FRAME_TITANIUM } from './constants';

/* Geometrias do celular — criadas UMA vez no Scene e compartilhadas por
   protagonista + fleet (1 ExtrudeGeometry de cada, N draws). */
export type PhoneGeometries = {
  /* Aro metálico externo — o rim que vende o aparelho real. */
  frame: BufferGeometry;
  body: BufferGeometry;
  screen: BufferGeometry;
  /* Botão lateral (deitado no eixo da borda). */
  button: BufferGeometry;
  /* Círculo do brilho de chão (elipse via scale do mesh). */
  stage: BufferGeometry;
  /* Occluder arredondado do card DOM (drei Html occlude="blending"). */
  holePunch: BufferGeometry;
};

interface PhoneModelProps {
  geometries: PhoneGeometries;
  /* Callbacks de ref: o dono guarda os materiais nos próprios useRefs e os
     muta por frame — o único padrão de escrita que o lint do React Compiler
     aceita (nada de objeto de refs mutável passado como prop). */
  screenRef: (material: MeshStandardMaterial | null) => void;
  accentBarRef: (material: MeshBasicMaterial | null) => void;
  /* Aro dinâmico (protagonista: titânio → anodizado da marca por frame). */
  frameRef?: (material: MeshPhysicalMaterial | null) => void;
  /* Aro fixo (fleet: a "bordinha" anodizada de cada marca). */
  frameColor?: string;
  /* Brilho de chão sob o aparelho (referência: cada celular ilumina o piso
     na cor da marca). */
  stageRef?: (material: MeshBasicMaterial | null) => void;
  accentLightRef?: (light: PointLight | null) => void;
  /* Hue inicial da barra de acento (o dono muta cor/opacidade por frame). */
  accent: string;
  /* Emissivo da tela: flash de travessia no protagonista, brilho de marca
     no fleet. Intensidade sempre começa em 0. */
  screenEmissive: string;
  /* Conteúdo projetado na face (drei Html) e extras. */
  children?: ReactNode;
}

/* O celular físico "burro": slab de vidro escuro + tela + barra de acento
   (+ luz de acento opcional). A cor da marca no hardware mora SÓ no aro
   (frameColor/frameRef). Nenhum useFrame próprio — toda a coreografia é do
   dono, via refs. */
const PhoneModel = ({
  geometries,
  screenRef,
  accentBarRef,
  frameRef,
  frameColor = FRAME_TITANIUM,
  stageRef,
  accentLightRef,
  accent,
  screenEmissive,
  children,
}: PhoneModelProps) => (
  <>
    {/* aro metálico por trás do corpo: sobra um rim de 0.04u em volta do
        bezel preto — a "bordinha" que carrega a cor no finale */}
    <mesh geometry={geometries.frame} position={[0, 0, -0.015]}>
      <meshPhysicalMaterial
        ref={frameRef}
        color={frameColor}
        roughness={0.24}
        metalness={0.95}
        clearcoat={0.6}
        clearcoatRoughness={0.28}
      />
    </mesh>

    {/* corpo + tela — bezel quase-preto, como o aparelho do hero */}
    <mesh geometry={geometries.body}>
      <meshPhysicalMaterial
        color="#05090b"
        roughness={0.32}
        metalness={0.3}
        clearcoat={1}
        clearcoatRoughness={0.22}
      />
    </mesh>
    <mesh geometry={geometries.screen} position={[0, 0, 0.075]}>
      <meshStandardMaterial
        ref={screenRef}
        color="#0c1714"
        roughness={0.25}
        metalness={0.1}
        emissive={screenEmissive}
        emissiveIntensity={0}
      />
    </mesh>

    {/* botões laterais (silenciador + volumes à esquerda, power à direita) —
        no metal do aro; detalhe que vende o aparelho nos perfis da travessia */}
    <mesh geometry={geometries.button} position={[-0.885, 1.02, -0.015]} scale={[1, 0.55, 1]}>
      <meshStandardMaterial color="#7a8285" roughness={0.3} metalness={0.9} />
    </mesh>
    <mesh geometry={geometries.button} position={[-0.885, 0.68, -0.015]}>
      <meshStandardMaterial color="#7a8285" roughness={0.3} metalness={0.9} />
    </mesh>
    <mesh geometry={geometries.button} position={[-0.885, 0.38, -0.015]}>
      <meshStandardMaterial color="#7a8285" roughness={0.3} metalness={0.9} />
    </mesh>
    <mesh geometry={geometries.button} position={[0.885, 0.72, -0.015]} scale={[1, 1.35, 1]}>
      <meshStandardMaterial color="#7a8285" roughness={0.3} metalness={0.9} />
    </mesh>

    {/* barra de acento na base da tela */}
    <mesh position={[0, -1.44, 0.095]}>
      <boxGeometry args={[0.9, 0.028, 0.015]} />
      <meshBasicMaterial
        ref={accentBarRef}
        color={accent}
        transparent
        opacity={0}
      />
    </mesh>

    {stageRef ? (
      <mesh
        geometry={geometries.stage}
        rotation-x={-Math.PI / 2}
        position={[0, -1.98, 0.25]}
        scale={[1.5, 0.62, 1]}
      >
        <meshBasicMaterial
          ref={stageRef}
          color={accent}
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    ) : null}

    {accentLightRef ? (
      <pointLight
        ref={accentLightRef}
        position={[0, 0.6, 1.8]}
        color={accent}
        intensity={0}
        distance={7}
        decay={2}
      />
    ) : null}

    {children}
  </>
);

export default PhoneModel;
