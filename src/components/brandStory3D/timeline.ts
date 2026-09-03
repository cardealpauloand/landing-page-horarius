import gsap from 'gsap';

/* Canais escalares que a timeline GSAP escreve e a cena lê a cada frame.
   São objetos mutáveis fora do React (nada de estado): o ProgressBridge faz
   timeline.progress(p) com o progresso suavizado do scroll, e como a timeline
   pausada é função pura do progresso, o scrub reverte perfeitamente. */
export type SceneChannels = {
  /* Núcleo: emissivo do miolo e intensidade do point light central. */
  coreEmissive: number;
  coreLight: number;
  /* Manifestação do núcleo (escala/visibilidade — ele não existe antes). */
  coreAppear: number;
  /* Rig de luz global: rim e blend neutro→verde da key. */
  rimIntensity: number;
  keyBlend: number;
  fogDensity: number;
  /* Respiro do fundo no flash (#0a1512 → #0e1f19 → volta). */
  bgLift: number;
  /* Anel-shockwave do flash: 0 = parado, 1 = expandido e apagado. */
  shockwave: number;
  /* Anéis do núcleo: 0 = tortos, 1 = alinhados (snap no flash). */
  ringState: number;
  /* Anéis se expandem e somem depois da travessia. */
  ringDissolve: number;
  /* Opacidade global dos dois sistemas de partículas. */
  absorbRamp: number;
  emitRamp: number;
  /* Envelope global do campo de clones (1 = mundo genérico vivo). */
  cloneFade: number;
  /* Protagonista: 0 = tela genérica, 1 = identidade (halo/acento/luz). */
  screenIdentity: number;
  /* Viagem do protagonista MAIN_POS → FINALE_SLOTS[0] no respiro. */
  mainRecede: number;
  /* Entrada dos celulares secundários no ecossistema (com stagger derivado
     por celular). Também mantém o frameloop vivo no finale. */
  fleetReveal: number;
};

export const createChannels = (): SceneChannels => ({
  coreEmissive: 0.25,
  coreLight: 0,
  coreAppear: 0,
  rimIntensity: 0.25,
  keyBlend: 0,
  fogDensity: 0.055,
  bgLift: 0,
  shockwave: 0,
  ringState: 0,
  ringDissolve: 0,
  absorbRamp: 0,
  emitRamp: 0,
  cloneFade: 1,
  screenIdentity: 0,
  mainRecede: 0,
  fleetReveal: 0,
});

/* A timeline inteira vive no espaço do progresso: duração total = 1, posições
   = valores de scroll. Nenhuma propriedade tem tweens sobrepostos (scrub
   reverso fica determinístico) — tweens adjacentes podem se encostar num
   ponto exato, nunca cruzar. */
export const buildTimeline = (channels: SceneChannels): gsap.core.Timeline => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });

  /* Trava a duração total em 1 mesmo que o último tween termine antes. */
  tl.to({}, { duration: 1 }, 0);

  /* Névoa: adensa no ato 2 (o campo de clones parece sem fim), abre depois
     do flash e clareia de vez no ecossistema. */
  tl.to(channels, { fogDensity: 0.068, duration: 0.12 }, 0.2);
  tl.to(channels, { fogDensity: 0.04, duration: 0.18 }, 0.5);
  tl.to(channels, { fogDensity: 0.03, duration: 0.1 }, 0.84);

  /* Luz: esfria/apaga no ato 2 (mundo genérico morto) e renasce quente logo
     depois do flash — a virada de cor do mundo é da ILUMINAÇÃO. */
  tl.to(channels, { rimIntensity: 0.12, duration: 0.1, ease: 'sine.inOut' }, 0.22);
  tl.to(channels, { rimIntensity: 0.7, duration: 0.14, ease: 'sine.inOut' }, 0.5);
  tl.to(channels, { keyBlend: 1, duration: 0.16, ease: 'sine.inOut' }, 0.5);

  /* O núcleo se manifesta atrás do protagonista e desperta. */
  tl.to(channels, { coreAppear: 1, duration: 0.08, ease: 'power2.out' }, 0.36);
  tl.to(channels, { coreLight: 0.8, duration: 0.08, ease: 'sine.in' }, 0.36);
  tl.to(channels, { coreEmissive: 1, duration: 0.08, ease: 'power1.in' }, 0.38);

  /* Absorção: os clones dissolvem em poeira tragada pelo núcleo. */
  tl.to(channels, { absorbRamp: 0.7, duration: 0.06 }, 0.38);
  tl.to(channels, { cloneFade: 0, duration: 0.12, ease: 'sine.in' }, 0.4);

  /* O flash da travessia (pico exatamente em p=0.5): a onda de energia
     atravessa o celular. */
  tl.to(channels, { coreEmissive: 2.4, duration: 0.04, ease: 'power2.in' }, 0.46);
  tl.to(channels, { coreLight: 6, duration: 0.04, ease: 'power2.in' }, 0.46);
  tl.to(channels, { bgLift: 1, duration: 0.04, ease: 'power2.in' }, 0.46);
  tl.to(channels, { ringState: 1, duration: 0.04 }, 0.46);
  tl.to(channels, { shockwave: 1, duration: 0.08, ease: 'sine.out' }, 0.5);
  tl.to(channels, { coreEmissive: 0.8, duration: 0.12, ease: 'power1.out' }, 0.5);
  tl.to(channels, { coreLight: 1.6, duration: 0.1, ease: 'power1.out' }, 0.5);
  tl.to(channels, { bgLift: 0, duration: 0.12, ease: 'power1.out' }, 0.5);

  /* A identidade nasce colada no choque: jets coloridos condensam no celular
     enquanto a tela troca de genérica para marca. */
  tl.to(channels, { emitRamp: 1, duration: 0.05 }, 0.52);
  tl.to(channels, { screenIdentity: 1, duration: 0.08, ease: 'power2.out' }, 0.52);
  tl.to(channels, { absorbRamp: 0, duration: 0.05 }, 0.53);
  tl.to(channels, { ringDissolve: 1, duration: 0.12, ease: 'sine.in' }, 0.56);
  tl.to(channels, { emitRamp: 0, duration: 0.06 }, 0.7);
  tl.to(channels, { coreLight: 0.9, duration: 0.1 }, 0.72);

  /* Respiro → ecossistema: o protagonista recua para o slot dele enquanto os
     outros negócios emergem da profundidade. */
  tl.to(channels, { mainRecede: 1, duration: 0.12, ease: 'sine.inOut' }, 0.72);
  tl.to(channels, { fleetReveal: 1, duration: 0.14, ease: 'power2.out' }, 0.76);

  return tl;
};
