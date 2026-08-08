import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SCREEN_ORDER } from './insideSystemShared';

/* Motor de scroll da seção "Por dentro do sistema".

   Este módulo é carregado por import() dinâmico quando a seção se aproxima
   da viewport — ele (e o GSAP inteiro) vive num chunk separado que nunca
   entra no caminho crítico da página.

   O layout "pinado" é do CSS (palco sticky), não do ScrollTrigger: aqui só
   existe UMA timeline com labels (uma por tela) dirigida por scrub contra a
   altura da seção. Sem pin-spacer → sem CLS, âncoras estáveis. */

gsap.registerPlugin(ScrollTrigger);

/* 1 unidade de timeline por tela. Dentro dela: transição de entrada
   (0–0.3), micro-beats da tela (0.3–0.75) e hold de leitura (0.75–1). */
const SEG_IN = 0.22;

export function initInsideSystemMotion(root: HTMLElement): () => void {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const screens = SCREEN_ORDER.map((id) =>
      root.querySelector<HTMLElement>(`.its-screen[data-screen='${id}']`),
    );
    const copies = SCREEN_ORDER.map((id) =>
      root.querySelector<HTMLElement>(`.its-copy[data-copy='${id}']`),
    );
    const navItems = SCREEN_ORDER.map((id) =>
      root.querySelector<HTMLElement>(`.its-nav-item[data-nav='${id}']`),
    );
    const glow = root.querySelector<HTMLElement>('.its-nav-glow');
    const progressFill = root.querySelector<HTMLElement>('.its-progress-fill');

    if (screens.some((el) => !el) || copies.some((el) => !el)) {
      return;
    }

    /* Estado inicial do modo animado: só a primeira tela/headline visível.
       (O HTML estático já nasce assim via CSS; os sets deixam tudo sob
       controle inline do GSAP para o scrub ser 100% reversível.) */
    screens.forEach((el, index) => {
      gsap.set(el, { autoAlpha: index === 0 ? 1 : 0, y: 0, scale: 1 });
    });
    copies.forEach((el, index) => {
      gsap.set(el, { autoAlpha: index === 0 ? 1 : 0, y: 0 });
    });

    const setProgress = progressFill ? gsap.quickSetter(progressFill, 'scaleX') : null;

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        snap: {
          snapTo: 'labelsDirectional',
          duration: { min: 0.2, max: 0.6 },
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          if (setProgress) {
            setProgress(self.progress);
          }
        },
      },
    });

    SCREEN_ORDER.forEach((id, index) => {
      tl.addLabel(id, index);

      if (index > 0) {
        /* Crossfade com leve deslocamento: a tela anterior sobe/encolhe de
           leve enquanto a nova entra por baixo — sobrepostas por ~0.15. */
        tl.to(
          screens[index - 1],
          { autoAlpha: 0, y: -18, scale: 0.985, duration: SEG_IN, ease: 'power2.in' },
          index,
        );
        tl.fromTo(
          screens[index],
          { autoAlpha: 0, y: 22, scale: 0.99 },
          { autoAlpha: 1, y: 0, scale: 1, duration: SEG_IN + 0.03 },
          index + 0.07,
        );

        tl.to(
          copies[index - 1],
          { autoAlpha: 0, y: -10, duration: SEG_IN, ease: 'power2.in' },
          index,
        );
        tl.fromTo(
          copies[index],
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: SEG_IN + 0.03 },
          index + 0.07,
        );
      }

      /* Pílula ativa da sidebar desliza até o item da tela corrente. */
      const navItem = navItems[index];
      if (glow && navItem && navItems[0]) {
        tl.to(
          glow,
          { y: navItem.offsetTop - navItems[0].offsetTop, duration: 0.3 },
          index === 0 ? 0 : index + 0.05,
        );
      }
    });

    /* Hold final: a última tela (Visão do negócio) segura 1 unidade inteira
       antes de a seção liberar o scroll. */
    tl.to({}, { duration: 1 }, SCREEN_ORDER.length - 1);

    /* Fontes chegando depois mudam alturas fora do frame — recalcula. */
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
    }
  });

  return () => mm.revert();
}
