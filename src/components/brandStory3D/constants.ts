/* Constantes da experiência 3D. Puro dado — nada de three/DOM aqui.
   Hues e fronteiras de estágio vêm de brandStoryShared.ts (fonte única
   compartilhada com o shell; importar dali é seguro — o proibido é o
   contrário: o grafo estático importar DESTE diretório). */
import { IDENTITY_HUES, STAGE_BOUNDARIES } from '../brandStoryShared';

export { IDENTITY_HUES, STAGE_BOUNDARIES };

/* O aro metálico é a ÚNICA parte do hardware que carrega a cor da marca —
   uma "bordinha" anodizada em volta do corpo preto (pedido de arte: celular
   realista, sem moldura colorida). MIX = quanto do hue afunda no grafite. */
export const FRAME_TITANIUM = '#858d91';
export const FRAME_ANODIZE_DARK = '#1c2326';
export const FRAME_ANODIZE_MIX = 0.35;

export type CameraKeyframe = {
  /* Progresso (0..1) em que a câmera cruza este waypoint. */
  p: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  /* Graus, aplicado DEPOIS do lookAt (banking sutil nas curvas, ≤3°). */
  roll: number;
};

/* Layout da cena: o celular protagonista encara a câmera em MAIN_POS; o
   núcleo Horarius se manifesta atrás e À DIREITA dele em CORE_POS — o
   off-axis é de propósito: o celular é opaco, e com o núcleo fora do eixo a
   câmera consegue enquadrar os dois na travessia (a shockwave expande de lá
   e atravessa o celular em p=0.5). O campo de clones ocupa o volume ao
   redor/atrás. */
export const MAIN_POS: [number, number, number] = [0, 0.35, 0];
export const CORE_POS: [number, number, number] = [1.1, 0.75, -2.8];

export type FinaleSlot = {
  position: [number, number, number];
  rotY: number;
};

/* Slots do ecossistema final, índice = índice de `brands` (0 barbearia —
   o protagonista viaja até lá — 1 studio, 2 clínica, 3 pet). Arco simétrico
   da referência: Barbearia FRONTAL ao centro, Sorriso e Studio à esquerda,
   Pet à direita — os laterais rotacionados PARA o centro. Compostos para os
   cards de chat (Html pinta acima do canvas) não se cobrirem a partir da
   câmera final. */
export const FINALE_SLOTS: Record<'desktop' | 'mobile', FinaleSlot[]> = {
  desktop: [
    /* Baixos de propósito: a faixa superior é da tagline (a câmera final
       mira acima do centro dos aparelhos). Tríptico: studio à esquerda,
       barbearia frontal ao centro, SORRISO à direita (o pet está fora do
       palco E das tabs — o slot 3 só existe para o índice fechar). */
    { position: [0, 0.5, -1.0], rotY: 0 },
    { position: [-2.15, 0.6, -2.2], rotY: 0.18 },
    { position: [2.2, 0.6, -2.3], rotY: -0.2 },
    { position: [0, 0.5, -1.0], rotY: 0 },
  ],
  /* Mobile: protagonista central (o card dele é a interface das tabs);
     studio e sorriso ficam de ambiência ao fundo. */
  mobile: [
    { position: [0, 0.3, -0.7], rotY: 0 },
    { position: [1.35, 0.55, -2.6], rotY: -0.2 },
    { position: [-1.5, 0.7, -3.5], rotY: 0.24 },
    { position: [0, 0.3, -0.7], rotY: 0 },
  ],
};

/* Quais slots ganham celular físico no fleet (além do protagonista no 0). */
export const FLEET_INDICES: Record<'desktop' | 'mobile', number[]> = {
  desktop: [1, 2],
  mobile: [1, 2],
};

/* Coreografia da câmera (Catmull-Rom sobre os waypoints): hero shot do
   celular → deriva lateral revelando a profundidade dos clones → o campo
   sem fim → SWING para a lateral direita, abrindo o ângulo que revela o
   núcleo ao lado do celular (ele é opaco — de frente esconderia tudo) →
   flash em p=0.5 com celular à direita e núcleo à esquerda do quadro →
   volta para a frente no reveal da marca (recuada: o card precisa respirar)
   → pull-up de respiro → wide do ecossistema. */
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { p: 0.0, position: [0, 0.6, 7.4], target: [0, 0.35, 0], fov: 38, roll: 0 },
  { p: 0.12, position: [-1.3, 0.5, 6.3], target: [0, 0.3, -1.2], fov: 40, roll: -1.5 },
  { p: 0.24, position: [1.5, 0.85, 5.2], target: [0.2, 0.3, -3.2], fov: 43, roll: 1.5 },
  { p: 0.34, position: [1.9, 0.6, 4.4], target: [0.4, 0.55, -1.6], fov: 44, roll: 0 },
  { p: 0.44, position: [2.8, 0.7, 2.9], target: [0.3, 0.6, -1.7], fov: 45, roll: -1 },
  { p: 0.5, position: [3.1, 0.6, 1.6], target: [0.3, 0.62, -1.9], fov: 46, roll: 0 },
  { p: 0.6, position: [1.4, 0.55, 5.6], target: [0, 0.4, -0.3], fov: 42, roll: 1 },
  { p: 0.74, position: [0.4, 0.8, 5.0], target: [0, 0.4, -0.9], fov: 42, roll: 0 },
  /* Final frontal: o protagonista centrado, mirando ACIMA do centro dele —
     os aparelhos descem no quadro, topo livre para a tagline e base para as
     tabs. */
  { p: 1.0, position: [0, 1.1, 6.6], target: [0, 0.6, -1.4], fov: 38, roll: 0 },
];

/* Overrides mobile por waypoint (aplicados DEPOIS do mapa ×0.55/fov+5 do
   ScrollCamera): o retrato estreito não comporta o duo celular+núcleo da
   travessia com a mesma lateral do desktop — o celular de perfil viraria um
   paredão cobrindo metade do quadro. Aqui a câmera recua e abre o fov para
   deixar o núcleo ao centro-direita com a borda do celular de testemunha. */
export const MOBILE_CAMERA_OVERRIDES: Record<
  number,
  Pick<CameraKeyframe, 'position' | 'target' | 'fov'>
> = {
  0.44: { position: [2.6, 0.7, 4.6], target: [0.7, 0.65, -1.8], fov: 51 },
  0.5: { position: [3.0, 0.6, 4.2], target: [0.9, 0.68, -2.0], fov: 52 },
};

export type QualityPreset = {
  mobile: boolean;
  dpr: [number, number];
  /* Celulares-clone do mundo genérico (instanciados, GPU-only). */
  cloneCount: number;
  absorbCount: number;
  emitCount: number;
  /* Cards de chat individuais nos celulares do fleet (desktop only — no
     mobile as tabs trocam o card do protagonista). */
  fleetHtml: boolean;
  /* Segmentos (largura, altura) da esfera do mundo. */
  planetSegments: [number, number];
};

export const QUALITY: Record<'desktop' | 'mobile', QualityPreset> = {
  desktop: {
    mobile: false,
    dpr: [1, 2],
    cloneCount: 56,
    absorbCount: 600,
    emitCount: 800,
    fleetHtml: true,
    planetSegments: [72, 48],
  },
  mobile: {
    mobile: true,
    dpr: [1, 1.75],
    cloneCount: 22,
    absorbCount: 250,
    emitCount: 320,
    fleetHtml: false,
    planetSegments: [48, 32],
  },
};

/* Fundo da cena — IDÊNTICO ao CSS da seção (.brand-story), para a borda do
   canvas sumir sem emenda. SCENE_BG_LIFT é o respiro do flash em p=0.5. */
export const SCENE_BG = '#0a1512';
export const SCENE_BG_LIFT = '#0e1f19';

/* Spotlight do ecossistema: quanto tempo cada identidade fica em destaque no
   loop automático, a duração do morph e por quanto tempo um clique manual
   segura o loop. Em segundos de relógio da cena — que só anda com a seção
   visível (frameloop="demand"), então o loop pausa sozinho fora da viewport. */
export const AUTO_INTERVAL = 4.5;
export const MORPH_DURATION = 0.9;
export const MANUAL_HOLD = 9;
export const SPOTLIGHT_CYCLE = [0, 1, 2];

/* Estado mutável do spotlight — vive num ref do Scene, escrito pelo engine
   (FleetPhones) e lido por quem reage (MainPhone, IdentityProps). Zero
   estado React por troca; o DOM reage via data-identity + CSS. */
export type SpotlightState = {
  index: number;
  prevIndex: number;
  /* -1 = ainda não houve troca (o relógio zera no 1º frame com fleet vivo). */
  switchedAt: number;
  holdUntil: number;
};

export const createSpotlightState = (): SpotlightState => ({
  index: 0,
  prevIndex: 0,
  switchedAt: -1,
  holdUntil: 0,
});
