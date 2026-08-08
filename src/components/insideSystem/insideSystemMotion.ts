import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

/* Beats da Agenda em SEGUNDOS (não unidades de scrub): no desktop tocam
   numa timeline disparada na aproximação do palco; no carrossel mobile,
   numa timeline pausada que o slide ativa. */
const addAgendaBeats = (intro: gsap.core.Timeline, agendaEl: HTMLElement) => {
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
    const frame = root.querySelector<HTMLElement>('.its-frame');
    const cursor = root.querySelector<HTMLElement>('.its-cursor');
    const cursorRing = root.querySelector<HTMLElement>('.its-cursor-ring');

    if (screens.some((el) => !el) || copies.some((el) => !el)) {
      return;
    }

    /* Cursor falso: posição de cada item da sidebar relativa ao frame,
       medida uma vez no init (o layout do frame é estável em rem). */
    const cursorPosFor = (item: HTMLElement) => {
      if (!frame) {
        return null;
      }
      const frameRect = frame.getBoundingClientRect();
      const rect = item.getBoundingClientRect();
      return {
        x: rect.left - frameRect.left + rect.width * 0.72,
        y: rect.top - frameRect.top + rect.height * 0.58,
      };
    };
    if (cursor && navItems[0]) {
      const home = cursorPosFor(navItems[0]);
      if (home) {
        gsap.set(cursor, { x: home.x, y: home.y, autoAlpha: 1 });
      }
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
          /* Direcional com tolerância: 'labelsDirectional' avança para o
             PRÓXIMO label mesmo quando o scroll já parou em cima de um —
             a seção andava sozinha segundos depois do usuário parar.
             Perto de um label (±30% do vão entre telas), fica nele mesmo
             que isso volte um pouco; longe, segue a direção do gesto.
             Assim cada parada rende exatamente uma tela. */
          snapTo: (value: number, self?: ScrollTrigger) => {
            const labels = Object.values(tl.labels)
              .map((time) => time / tl.duration())
              .sort((a, b) => a - b);
            const settled = labels.find((label) => Math.abs(value - label) < 0.05);
            if (settled !== undefined) {
              return settled;
            }
            const forward = !self || self.direction >= 0;
            const next = forward
              ? labels.find((label) => label > value)
              : [...labels].reverse().find((label) => label < value);
            return next ?? gsap.utils.snap(labels, value);
          },
          duration: { min: 0.2, max: 0.6 },
          ease: 'power1.inOut',
          /* Sem projeção de momentum: um flick forte pulava uma tela
             inteira; com a posição real, o snap vai sempre para a tela
             adjacente e nenhuma etapa da história é atropelada. */
          inertia: false,
        },
        onUpdate: (self) => {
          if (setProgress) {
            setProgress(self.progress);
          }
        },
        /* Modo imersivo: com a seção pinada, o header da página sai de
           cena (regra CSS em InsideSystem.css). */
        onToggle: (self) => {
          document.documentElement.classList.toggle('its-immersed', self.isActive);
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

      /* O cursor "opera" o painel: desliza até o item e clica um instante
         ANTES de a tela trocar — o clique parece causar a navegação. */
      if (cursor && navItem && index > 0) {
        const pos = cursorPosFor(navItem);
        if (pos) {
          tl.to(cursor, { x: pos.x, y: pos.y, duration: 0.2, ease: 'power2.inOut' }, index - 0.26);
          tl.fromTo(
            cursor,
            { scale: 1 },
            { scale: 0.8, duration: 0.03, yoyo: true, repeat: 1 },
            index - 0.06,
          );
          if (cursorRing) {
            tl.fromTo(
              cursorRing,
              { scale: 0.2, autoAlpha: 0.8 },
              { scale: 1.9, autoAlpha: 0, duration: 0.09 },
              index - 0.05,
            );
          }
        }
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
      const intro = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      });
      addAgendaBeats(intro, agendaEl);
    }

    /* Fontes chegando depois mudam alturas fora do frame — recalcula. */
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
    }

    /* Sidebar clicável: cada item rola a página até o label daquela tela —
       o scrub passa acelerado pelas intermediárias, como um fast-forward.
       Duração proporcional à distância; autoKill devolve o controle se a
       pessoa rolar no meio do caminho. */
    const st = tl.scrollTrigger;
    const navCleanups: (() => void)[] = [];
    if (st) {
      navItems.forEach((item, index) => {
        if (!item) {
          return;
        }
        const onClick = () => {
          const targetProgress = (index + 0.78) / SCREEN_ORDER.length;
          const jump = Math.abs(tl.progress() - targetProgress) * SCREEN_ORDER.length;
          gsap.to(window, {
            scrollTo: { y: st.start + targetProgress * (st.end - st.start), autoKill: true },
            duration: Math.min(1.4, 0.5 + jump * 0.18),
            ease: 'power2.inOut',
          });
        };
        item.addEventListener('click', onClick);
        navCleanups.push(() => item.removeEventListener('click', onClick));
      });
    }

    /* mm.revert() mata os triggers, mas classe no <html> e listeners são
       nossos. */
    return () => {
      navCleanups.forEach((clean) => clean());
      document.documentElement.classList.remove('its-immersed');
    };
  });

  /* Mobile: "demo ao vivo". O CSS montou o carrossel com scroll-snap
     nativo (o swipe funciona até sem este código); o motor roda o show:
     cada tela fica SLIDE_SECS no palco encenando seus beats enquanto a
     barrinha de stories enche, e o trilho desliza sozinho para a próxima,
     em loop. Tocar/arrastar pausa e devolve o controle ao dedo; depois de
     RESUME_SECS parado, o show retoma do slide em que a pessoa estiver. */
  mm.add('(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)', () => {
    if (!root.classList.contains('its-carousel')) {
      return;
    }
    const viewport = root.querySelector<HTMLElement>('.its-viewport');
    if (!viewport) {
      return;
    }

    const SLIDE_SECS = 4.6;
    const RESUME_SECS = 8;

    const timelines = new Map<string, gsap.core.Timeline>();
    const copies = new Map<string, HTMLElement>();
    const navItems = new Map<string, HTMLElement>();
    const screens: HTMLElement[] = [];
    const fills = SCREEN_ORDER.map((id) =>
      root.querySelector<HTMLElement>(`.its-stories-seg[data-seg='${id}'] .its-stories-fill`),
    );

    SCREEN_ORDER.forEach((id) => {
      const copy = root.querySelector<HTMLElement>(`.its-copy[data-copy='${id}']`);
      if (copy) {
        copies.set(id, copy);
      }
      const navItem = root.querySelector<HTMLElement>(`.its-bottomnav-item[data-bottomnav='${id}']`);
      if (navItem) {
        navItems.set(id, navItem);
      }
      const el = root.querySelector<HTMLElement>(`.its-screen[data-screen='${id}']`);
      if (!el) {
        return;
      }
      screens.push(el);
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      if (id === 'agenda') {
        addAgendaBeats(tl, el);
      } else {
        const beats = SCREEN_BEATS[id];
        if (beats) {
          beats({ tl, el, base: 0.05 });
          tl.timeScale(0.38);
        }
      }
      timelines.set(id, tl);
    });

    const setActiveChrome = (id: string) => {
      copies.forEach((el, key) => el.classList.toggle('its-active', key === id));
      navItems.forEach((el, key) => el.classList.toggle('its-active', key === id));
    };

    /* scrollLeft que centraliza o slide i no trilho. */
    const slideX = (index: number) => {
      const el = screens[index];
      return el ? el.offsetLeft - (viewport.clientWidth - el.clientWidth) / 2 : 0;
    };

    const activeIndexFromScroll = () => {
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      screens.forEach((_el, index) => {
        const dist = Math.abs(slideX(index) - viewport.scrollLeft);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      return best;
    };

    let started = false;
    let manual = false;
    let segTween: gsap.core.Tween | null = null;
    let scrollTween: gsap.core.Tween | null = null;
    let resumeCall: gsap.core.Tween | null = null;

    const playSlide = (index: number) => {
      const id = SCREEN_ORDER[index];
      setActiveChrome(id);
      fills.forEach((fillEl, fillIndex) => {
        if (fillEl && fillIndex !== index) {
          gsap.set(fillEl, { scaleX: fillIndex < index ? 1 : 0 });
        }
      });
      scrollTween?.kill();
      scrollTween = gsap.to(viewport, {
        scrollLeft: slideX(index),
        duration: 0.65,
        ease: 'power2.inOut',
      });
      timelines.get(id)?.restart();
      segTween?.kill();
      const fillEl = fills[index];
      const advance = () => playSlide((index + 1) % SCREEN_ORDER.length);
      segTween = fillEl
        ? gsap.fromTo(
            fillEl,
            { scaleX: 0 },
            { scaleX: 1, duration: SLIDE_SECS, ease: 'none', onComplete: advance },
          )
        : gsap.delayedCall(SLIDE_SECS, advance);
    };

    /* Toque/arrasto: o show para na hora e o dedo assume; cada gesto ou
       rolagem renova o timer de retomada. */
    const scheduleResume = () => {
      resumeCall?.kill();
      resumeCall = gsap.delayedCall(RESUME_SECS, () => {
        manual = false;
        playSlide(activeIndexFromScroll());
      });
    };

    const takeOver = () => {
      manual = true;
      segTween?.pause();
      scrollTween?.kill();
      scheduleResume();
    };

    viewport.addEventListener('pointerdown', takeOver, { passive: true });
    viewport.addEventListener('wheel', takeOver, { passive: true });

    /* Bottom-nav clicável: pausa o show e desliza até a tela escolhida —
       o IO cuida de headline/beats quando o slide chega. */
    const navCleanups: (() => void)[] = [];
    navItems.forEach((item, id) => {
      const onClick = () => {
        const index = SCREEN_ORDER.indexOf(id as (typeof SCREEN_ORDER)[number]);
        if (index < 0) {
          return;
        }
        takeOver();
        scrollTween = gsap.to(viewport, {
          scrollLeft: slideX(index),
          duration: 0.55,
          ease: 'power2.inOut',
        });
      };
      item.addEventListener('click', onClick);
      navCleanups.push(() => item.removeEventListener('click', onClick));
    });

    /* Durante o modo manual, o IO mantém headline/bottom-nav e reencena a
       tela em que a pessoa parou. */
    const slideIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !manual) {
            return;
          }
          const id = (entry.target as HTMLElement).dataset.screen;
          if (!id) {
            return;
          }
          setActiveChrome(id);
          const index = SCREEN_ORDER.indexOf(id as (typeof SCREEN_ORDER)[number]);
          fills.forEach((fillEl, fillIndex) => {
            if (fillEl) {
              gsap.set(fillEl, { scaleX: fillIndex <= index ? 1 : 0 });
            }
          });
          timelines.get(id)?.restart();
        });
      },
      { root: viewport, threshold: 0.6 },
    );
    screens.forEach((el) => slideIo.observe(el));

    const onScroll = () => {
      if (manual) {
        scheduleResume();
      }
    };
    viewport.addEventListener('scroll', onScroll, { passive: true });

    /* O show começa quando a seção aparece e congela quando sai de cena. */
    const startIo = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !started) {
          started = true;
          playSlide(0);
        } else if (visible && !manual) {
          segTween?.resume();
        } else if (!visible && !manual) {
          segTween?.pause();
          scrollTween?.pause();
        }
      },
      { threshold: 0.3 },
    );
    startIo.observe(root);

    return () => {
      segTween?.kill();
      scrollTween?.kill();
      resumeCall?.kill();
      slideIo.disconnect();
      startIo.disconnect();
      viewport.removeEventListener('pointerdown', takeOver);
      viewport.removeEventListener('wheel', takeOver);
      viewport.removeEventListener('scroll', onScroll);
      navCleanups.forEach((clean) => clean());
      copies.forEach((el) => el.classList.remove('its-active'));
      navItems.forEach((el) => el.classList.remove('its-active'));
    };
  });

  return () => mm.revert();
}
