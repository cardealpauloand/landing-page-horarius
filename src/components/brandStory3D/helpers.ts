import { ExtrudeGeometry, Shape, ShapeGeometry } from 'three';

/* Utilidades do chunk 3D. Nada aqui toca DOM — mas o módulo importa three,
   então ele NUNCA pode entrar no grafo estático do App (firewall SSR). */

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const easeInCubic = (t: number) => t * t * t;

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

/* Damp exponencial independente de framerate (mesma família do damp do
   maath, sem a dependência). */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(target, current, Math.exp(-lambda * dt));

/* mulberry32: RNG determinístico com seed fixa. A cena precisa ser IDÊNTICA
   entre montagens (StrictMode remonta em dev) e reversível — nada de
   Math.random. */
export const createRng = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const createRoundedShape = (width: number, height: number, radius: number) => {
  const shape = new Shape();
  const w = width / 2 - radius;
  const h = height / 2 - radius;
  shape.absarc(w, h, radius, 0, Math.PI / 2, false);
  shape.absarc(-w, h, radius, Math.PI / 2, Math.PI, false);
  shape.absarc(-w, -h, radius, Math.PI, Math.PI * 1.5, false);
  shape.absarc(w, -h, radius, Math.PI * 1.5, Math.PI * 2, false);
  return shape;
};

/* Placa com cantos arredondados (balões, tiles, monólito): Shape + Extrude do
   three core — sem depender de three-stdlib. Cantos arredondados só no
   contorno 2D, que é o que se lê de perto nos pass-bys. */
export const createRoundedPlateGeometry = (
  width: number,
  height: number,
  depth: number,
  radius: number,
) => {
  const geometry = new ExtrudeGeometry(createRoundedShape(width, height, radius), {
    depth,
    bevelEnabled: false,
    curveSegments: 5,
  });
  geometry.center();
  return geometry;
};

/* Plano chato com cantos arredondados — o "furo" da oclusão dos cards (drei
   Html occlude="blending"): precisa vir JÁ no tamanho-mundo do elemento
   (com geometry customizada o drei não redimensiona o occluder) e com o
   MESMO raio do border-radius do card, senão o retângulo corta os cantos
   arredondados do aparelho atrás. */
export const createRoundedPlaneGeometry = (
  width: number,
  height: number,
  radius: number,
) => {
  const geometry = new ShapeGeometry(
    createRoundedShape(width, height, radius),
    6,
  );
  geometry.center();
  return geometry;
};
