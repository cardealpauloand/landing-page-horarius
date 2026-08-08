import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { InsideSystemScreenId } from '../../content/landingContent';
import { SCREEN_ORDER } from './insideSystemShared';

/* Motor de scroll da seção "Por dentro do sistema".

   Este módulo é carregado por import() dinâmico quando a seção se aproxima
   da viewport — ele (e o GSAP inteiro) vive num chunk separado que nunca
   entra no caminho crítico da página.

   O layout "pinado" é do CSS (palco sticky), não do ScrollTrigger: aqui só
   existe UMA timeline com scrub contra a altura da seção. Sem pin-spacer →
   sem CLS, âncoras estáveis.

   Estrutura de cada segmento de tela (1 unidade de timeline por tela):
   transição de entrada (0–0.25) → micro-beats (0.26–~0.76) → hold. Os
   labels de snap ficam em i+0.78, onde a tela está completa. Os beats usam
   fromTo (immediateRender): na construção, todo estado "from" é aplicado —
   como as telas 2..6 nascem invisíveis, ninguém vê; e o scrub fica 100%
   reversível. A Agenda (tela 1) é exceção: os beats dela rodam numa
   timeline própria disparada UMA vez na aproximação — se fossem no scrub,
   a seção chegaria "vazia" enquanto o usuário ainda se aproxima. */

gsap.registerPlugin(ScrollTrigger);

const SEG_IN = 0.22;

interface BeatContext {
  tl: gsap.core.Timeline;
  el: HTMLElement;
  /* Início da janela de beats do segmento (i + 0.26). */
  base: number;
}

/* Anima o número de um valor tipo "R$ 12.400", "4,8" ou "380" contando até o
   valor final que JÁ está no HTML (o SSR sempre emite o estado completo).
   Formatação derivada do próprio texto — funciona nas 3 línguas. */
const addCounter = (
  tl: gsap.core.Timeline,
  el: Element | null,
  base: number,
  duration: number,
  startOffset?: number,
) => {
  const node = el as HTMLElement | null;
  if (!node || !node.textContent) {
    return;
  }
  const template = node.textContent;
  const match = /\d[\d.,]*\d|\d/.exec(template);
  if (!match) {
    return;
  }
  const raw = match[0];
  const decimalMatch = /^(\d+)([.,])(\d)$/.exec(raw);
  const separator = decimalMatch
    ? decimalMatch[2]
    : raw.includes('.')
      ? '.'
      : raw.includes(',')
        ? ','
        : '';
  const target = decimalMatch
    ? parseFloat(`${decimalMatch[1]}.${decimalMatch[3]}`)
    : parseInt(raw.replace(/[.,]/g, ''), 10);
  const from = startOffset != null ? Math.max(0, target - startOffset) : 0;
  const format = (value: number): string => {
    if (decimalMatch) {
      return value.toFixed(1).replace('.', separator);
    }
    const rounded = Math.round(value).toString();
    return separator ? rounded.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : rounded;
  };
  const proxy = { value: from };
  tl.fromTo(
    proxy,
    { value: from },
    {
      value: target,
      duration,
      ease: 'none',
      onUpdate: () => {
        node.textContent = template.replace(raw, format(proxy.value));
      },
    },
    base,
  );
};

/* Balão de chat entrando: vem de fora (esq/dir conforme a direção) e só
   ocupa espaço a partir do seu beat (display none → block). */
const addMessageIn = (tl: gsap.core.Timeline, message: Element, at: number) => {
  const fromX = message.classList.contains('its-msg--in') ? -12 : 12;
  tl.fromTo(
    message,
    { display: 'none', autoAlpha: 0, x: fromX },
    { display: 'block', autoAlpha: 1, x: 0, duration: 0.05 },
    at,
  );
};

const SCREEN_BEATS: Partial<Record<InsideSystemScreenId, (ctx: BeatContext) => void>> = {
  conversations: ({ tl, el, base }) => {
    tl.fromTo(
      el.querySelectorAll('.its-conv-chips .its-chip'),
      { y: 6, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.04, stagger: 0.015 },
      base,
    );
    tl.fromTo(
      el.querySelectorAll('.its-conv-item'),
      { x: -12, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.06, stagger: 0.03 },
      base + 0.03,
    );

    const messages = el.querySelectorAll('.its-conv-msgs .its-msg:not(.its-typing)');
    const typing = el.querySelector('.its-typing');
    if (messages.length === 4) {
      addMessageIn(tl, messages[0], base + 0.08);
      if (typing) {
        tl.set(typing, { display: 'flex', autoAlpha: 1 }, base + 0.13);
        tl.set(typing, { display: 'none', autoAlpha: 0 }, base + 0.19);
      }
      addMessageIn(tl, messages[1], base + 0.19);
      addMessageIn(tl, messages[2], base + 0.27);
      if (typing) {
        tl.set(typing, { display: 'flex', autoAlpha: 1 }, base + 0.32);
        tl.set(typing, { display: 'none', autoAlpha: 0 }, base + 0.38);
      }
      addMessageIn(tl, messages[3], base + 0.38);
    }

    const knob = el.querySelector('.its-switch-knob');
    if (knob) {
      tl.from(knob, { x: 0, duration: 0.04 }, base + 0.44);
    }
    tl.fromTo(
      el.querySelector('.its-conv-composer-status'),
      { autoAlpha: 0, y: 4 },
      { autoAlpha: 1, y: 0, duration: 0.04 },
      base + 0.46,
    );
  },

  waitlist: ({ tl, el, base }) => {
    tl.fromTo(
      el.querySelectorAll('.its-wl-metrics .its-stat'),
      { y: 12, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.08, stagger: 0.03 },
      base,
    );
    tl.fromTo(
      el.querySelectorAll('.its-wl-table .its-table-row'),
      { y: 8, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.06, stagger: 0.03 },
      base + 0.06,
    );

    /* A história da linha 2: Aguardando → Oferta enviada (com o horário
       aparecendo na coluna Oferta) → Confirmado → receita recuperada conta. */
    const waiting = el.querySelector('.its-wl-badge--waiting');
    const offered = el.querySelector('.its-wl-badge--offered');
    const confirmed = el.querySelector('.its-wl-badge--confirmed');
    const offer = el.querySelector('.its-wl-offer');
    if (waiting && offered && confirmed && offer) {
      tl.fromTo(waiting, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.02 }, base + 0.2);
      tl.fromTo(
        offered,
        { autoAlpha: 0, scale: 0.7 },
        { autoAlpha: 1, scale: 1, duration: 0.03, ease: 'back.out(2)' },
        base + 0.21,
      );
      tl.fromTo(
        offer,
        { autoAlpha: 0, x: -8 },
        { autoAlpha: 1, x: 0, duration: 0.04 },
        base + 0.24,
      );
      tl.to(offered, { autoAlpha: 0, duration: 0.02 }, base + 0.32);
      tl.fromTo(
        confirmed,
        { autoAlpha: 0, scale: 0.7 },
        { autoAlpha: 1, scale: 1, duration: 0.03, ease: 'back.out(2)' },
        base + 0.33,
      );
    }
    /* Receita recuperada sobe o valor do serviço confirmado. */
    addCounter(
      tl,
      el.querySelector('.its-wl-metrics .its-stat:last-child .its-stat-value'),
      base + 0.36,
      0.1,
      70,
    );
  },

  reviews: ({ tl, el, base }) => {
    addCounter(tl, el.querySelector('.its-rev-avgvalue'), base + 0.02, 0.12);
    const starsFill = el.querySelector<HTMLElement>('.its-rev-average .its-stars-fill');
    if (starsFill) {
      tl.fromTo(
        starsFill,
        { width: '0%' },
        { width: starsFill.style.width || '96%', duration: 0.12, ease: 'none' },
        base + 0.02,
      );
    }
    tl.fromTo(
      el.querySelectorAll('.its-rev-dist .its-meter-fill'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.08, stagger: 0.03 },
      base + 0.14,
    );
    tl.fromTo(
      el.querySelector('.its-rev-quote'),
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.08 },
      base + 0.28,
    );
    tl.fromTo(
      el.querySelectorAll('.its-rev-grid'),
      { y: 8, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.06, stagger: 0.04 },
      base + 0.36,
    );
  },

  reminders: ({ tl, el, base }) => {
    tl.fromTo(
      el.querySelectorAll('.its-rem-grid'),
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.06, stagger: 0.04 },
      base,
    );
    /* Badges pipocam em cascata: enviado → entregue → lido. */
    tl.fromTo(
      el.querySelectorAll('.its-rem-status .its-badge'),
      { scale: 0.6, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.05, ease: 'back.out(2)', stagger: 0.06 },
      base + 0.14,
    );
    tl.fromTo(
      el.querySelector('.its-rem-bubble'),
      { x: -14, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.06 },
      base + 0.3,
    );
    tl.fromTo(
      el.querySelector('.its-rem-foot .its-stat'),
      { scale: 0.9, y: 8, autoAlpha: 0 },
      { scale: 1, y: 0, autoAlpha: 1, duration: 0.06, ease: 'back.out(1.7)' },
      base + 0.4,
    );
  },

  insights: ({ tl, el, base }) => {
    tl.fromTo(
      el.querySelectorAll('.its-ins-kpis .its-stat'),
      { y: 12, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.08, stagger: 0.04 },
      base,
    );
    addCounter(
      tl,
      el.querySelector('.its-ins-kpis .its-stat:first-child .its-stat-value'),
      base + 0.04,
      0.14,
    );

    /* O traço do gráfico se desenha (pathLength=1 no JSX). */
    const line = el.querySelector<SVGPathElement>('.its-ins-line');
    if (line) {
      gsap.set(line, { strokeDasharray: 1 });
      tl.fromTo(
        line,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.2, ease: 'none' },
        base + 0.1,
      );
    }
    tl.fromTo(
      el.querySelector('.its-ins-area'),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.08 },
      base + 0.26,
    );

    /* Clímax: o card "Recuperado pelo Horarius". */
    tl.fromTo(
      el.querySelector('.its-ins-recovered'),
      { y: 12, scale: 0.96, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.08 },
      base + 0.32,
    );
    addCounter(tl, el.querySelector('.its-ins-recvalue'), base + 0.34, 0.12);
  },
};

/* Beats da Agenda: timeline própria (segundos, não unidades de scrub),
   disparada uma vez quando a seção se aproxima. */
const buildAgendaIntro = (root: HTMLElement, agendaEl: HTMLElement) => {
  const intro = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: { trigger: root, start: 'top 80%', once: true },
  });
  intro.from(
    agendaEl.querySelectorAll('.its-agenda-kpis .its-stat'),
    { y: 14, autoAlpha: 0, duration: 0.4, stagger: 0.08 },
    0,
  );
  intro.from(
    agendaEl.querySelector('.its-agenda-toolbar'),
    { y: 10, autoAlpha: 0, duration: 0.35 },
    0.15,
  );
  intro.from(
    agendaEl.querySelectorAll('.its-appt'),
    { y: 12, autoAlpha: 0, scale: 0.96, duration: 0.35, stagger: 0.05 },
    0.25,
  );
  intro.from(
    agendaEl.querySelectorAll('.its-agenda-occ .its-meter-fill'),
    { scaleX: 0, duration: 0.45, stagger: 0.08 },
    0.4,
  );
  intro.from(
    agendaEl.querySelectorAll('.its-agenda-next'),
    { scale: 0.6, autoAlpha: 0, duration: 0.35, ease: 'back.out(1.7)', stagger: 0.08 },
    0.55,
  );
};

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
       (O CSS já esconde as demais; os sets deixam tudo sob controle inline
       do GSAP para o scrub ser reversível.) */
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

    tl.addLabel('start', 0);

    SCREEN_ORDER.forEach((id, index) => {
      /* Label de snap no ponto em que a tela está completa. */
      tl.addLabel(id, index + 0.78);

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

      const beats = SCREEN_BEATS[id];
      const screenEl = screens[index];
      if (beats && screenEl) {
        beats({ tl, el: screenEl, base: index + 0.26 });
      }
    });

    /* Hold final: a última tela (Visão do negócio) segura o resto da unidade
       antes de a seção liberar o scroll. */
    tl.to({}, { duration: 1 }, SCREEN_ORDER.length - 1);

    const agendaEl = screens[0];
    if (agendaEl) {
      buildAgendaIntro(root, agendaEl);
    }

    /* Fontes chegando depois mudam alturas fora do frame — recalcula. */
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
    }
  });

  return () => mm.revert();
}
