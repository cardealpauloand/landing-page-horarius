import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ComponentType, RefObject } from 'react';
import { siteContent, type Language } from '../content/landingContent';
import { FINALE_ORDER, IDENTITY_HUES, STAGE_BOUNDARIES } from './brandStoryShared';
import Reveal from './Reveal';
import './BrandStory.css';

/* Props do chunk 3D. Os TIPOS moram aqui (import type é apagado em runtime)
   para manter o firewall SSR: nenhum identifier de three/gsap pode entrar no
   grafo ESTÁTICO de imports do App — scripts/prerender.mjs executa o bundle
   SSR em Node puro e qualquer módulo 3D avaliado ali derruba o build. O
   código do chunk só chega via import() dinâmico, no effect abaixo. */
export interface BrandStoryChatMessage {
  name: string;
  clientMessage: string;
  replyMessage: string;
  time: string;
}

export interface BrandStoryChatContent {
  status: string;
  /* Placeholder do campo de mensagem ("Mensagem"). */
  placeholder: string;
  /* A conversa neutra do celular genérico do primeiro ato. */
  generic: BrandStoryChatMessage;
  brands: BrandStoryChatMessage[];
}

export interface BrandStoryExperienceProps {
  trackRef: RefObject<HTMLDivElement | null>;
  /* Canal shell → cena: clique numa tab pede a identidade correspondente. */
  identityRequestRef: RefObject<{ index: number | null }>;
  chat: BrandStoryChatContent;
  onReady: () => void;
  onFail: () => void;
}

/* data-stage em que cada legenda aparece (escrito pelo ProgressBridge no modo
   vivo): 0 = celular genérico, 1 = o problema, 3 = identidade nasce,
   4 = respiro ("Agora ela é sua."). O estágio 2 é a travessia, sem texto;
   o 5 é o ecossistema final (tagline + tabs). */
const CAPTION_STAGE = ['0', '1', '3', '4'];

interface BrandStoryProps {
  language: Language;
}

const BrandStory = ({ language }: BrandStoryProps) => {
  const content = siteContent[language].brandStory;
  const trackRef = useRef<HTMLDivElement>(null);
  const identityRequestRef = useRef<{ index: number | null }>({ index: null });
  const [ExperienceComp, setExperienceComp] =
    useState<ComponentType<BrandStoryExperienceProps> | null>(null);
  /* false no servidor e no primeiro render do cliente — o HTML hidratado
     precisa bater com o prerender (mesma disciplina do HeroPhone). */
  const [enhanced, setEnhanced] = useState(false);
  const [ready, setReady] = useState(false);
  /* WebGL morreu DEPOIS de montado (context lost): o layout fica congelado
     (track alto + pin por translate3d) e só o visual volta ao poster. */
  const [fallen, setFallen] = useState(false);

  /* Navbar some enquanto o PALCO domina a viewport (pedido de arte: a
     experiência é fullscreen). Classe no <html> + CSS — sem estado React.
     Vale para os dois modos (vivo e poster). */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          document.documentElement.classList.toggle(
            'bs-stage-active',
            entry.isIntersecting,
          );
        });
      },
      /* Banda central: esconde quando o palco chega, devolve na saída. */
      { rootMargin: '-18% 0px -18% 0px' },
    );
    observer.observe(track);
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('bs-stage-active');
    };
  }, []);

  /* O "pin" do modo vivo: viewport absoluto + translate3d dirigido pelo
     scroll — a MESMA geometria do position:sticky (top do track → bottom),
     mas com layout e paint no mesmo referencial. Sticky não serve aqui: o
     Chromium pinta a subárvore perspective/preserve-3d do card (drei Html
     transform) ~56px fora do lugar na fase solta do sticky (antes/depois do
     pin). Mora no shell (não no chunk 3D) para continuar pinando no modo
     fallen — o mesmo contrato de mutação de DOM do ProgressBridge. */
  useEffect(() => {
    if (!enhanced) {
      return;
    }
    const track = trackRef.current;
    const viewport = track?.querySelector<HTMLElement>('.brand-story-viewport');
    if (!track || !viewport) {
      return;
    }

    const update = () => {
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - viewport.offsetHeight;
      const y = Math.min(Math.max(-rect.top, 0), Math.max(scrollable, 0));
      viewport.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      viewport.style.transform = '';
    };
  }, [enhanced]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    /* Guardas de upgrade: reduced-motion e Save-Data ficam no poster estático
       para sempre; sem IntersectionObserver (browser antigo) idem. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const track = trackRef.current;
    if (!track) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        observer.disconnect();

        /* Probe WebGL barato antes de pagar o download do chunk 3D. */
        const probe = document.createElement('canvas');
        const gl = probe.getContext('webgl2') ?? probe.getContext('webgl');
        if (!gl) {
          return;
        }

        setEnhanced(true);
      },
      /* ~1,5 viewport de antecedência: o chunk (~300 kB gz) chega antes do
         usuário — mas só para quem de fato se aproxima da seção. */
      { rootMargin: '150% 0px' },
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    /* `fallen` também bloqueia: sem ele, zerar ExperienceComp no handleFail
       (com enhanced ainda true) faria este effect REMONTAR a cena morta. */
    if (!enhanced || ExperienceComp || fallen) {
      return;
    }

    let cancelled = false;
    import('./brandStory3D/Experience')
      .then((module) => {
        if (!cancelled) {
          setExperienceComp(() => module.default);
        }
      })
      .catch(() => {
        /* Chunk não carregou (rede): volta ao poster, sem buraco de scroll. */
        if (!cancelled) {
          setEnhanced(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enhanced, ExperienceComp, fallen]);

  const handleReady = useCallback(() => setReady(true), []);

  /* Contraparte do pagehide do Experience: com a cena pronta (track já nas
     alturas finais), devolve o usuário ao progresso em que estava antes do
     reload. Uma vez só — a chave é consumida. */
  useEffect(() => {
    if (!ready) {
      return;
    }
    let saved: number | null = null;
    try {
      const raw = sessionStorage.getItem('horarius-brand-story-p');
      if (raw !== null) {
        sessionStorage.removeItem('horarius-brand-story-p');
        saved = Number(raw);
      }
    } catch {
      return;
    }
    if (saved === null || !Number.isFinite(saved) || saved <= 0 || saved >= 1) {
      return;
    }
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const top = track.getBoundingClientRect().top + window.scrollY;
    const scrollable = track.offsetHeight - window.innerHeight;
    if (scrollable > 0) {
      window.scrollTo(0, top + scrollable * saved);
    }
  }, [ready]);

  /* Memoizado: um literal novo a cada render faria o subtree inteiro do Html
     (drei) re-renderizar quando `ready` vira true. */
  const chatContent = useMemo<BrandStoryChatContent>(
    () => ({
      status: content.chatStatus,
      placeholder: content.chatPlaceholder,
      generic: content.genericChat,
      brands: content.brands,
    }),
    [content],
  );

  /* WebGL falhou depois de montado (context lost sem restore, erro no
     Canvas): desmonta o 3D — sem nova tentativa, um contexto que caiu tende
     a cair de novo. IMPORTANTE: `enhanced` NÃO é limpo — derrubar o .is-live
     colapsaria ~340vh de documento sob o usuário no meio do pin (teleporte
     de scroll). O track fica congelado e o poster reaparece por baixo. */
  const handleFail = useCallback(() => {
    setReady(false);
    setExperienceComp(null);
    setFallen(true);
  }, []);

  /* Com a cena morta no meio do pin, as legendas continuam acompanhando o
     scroll: listener passivo recalcula o estágio a partir da geometria do
     track — só mutação de DOM, o mesmo contrato do ProgressBridge. */
  useEffect(() => {
    if (!fallen) {
      return;
    }
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const update = () => {
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p =
        scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      let stage = 0;
      for (const boundary of STAGE_BOUNDARIES) {
        if (p >= boundary) {
          stage += 1;
        }
      }
      const value = String(stage);
      if (track.dataset.stage !== value) {
        track.dataset.stage = value;
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [fallen]);

  const trackClassName = [
    'brand-story-track',
    enhanced ? 'is-live' : '',
    ready ? 'is-ready' : '',
    fallen ? 'is-fallen' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id="identidade" className="brand-story section">
      <div className="container">
        <Reveal className="section-intro">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-description">{content.description}</p>
        </Reveal>
      </div>

      <div className={trackClassName} ref={trackRef}>
        <div className="brand-story-viewport">
          {/* Poster: rendição CSS/SVG do ecossistema final — 4 celulares em
              profundidade, cada um com sua identidade, nascendo de uma única
              fonte (o núcleo Horarius na base). É o visual do HTML
              prerenderizado (SEO/no-JS/reduced-motion) e fica no DOM também
              no modo vivo — o canvas faz fade-in por cima, sem troca seca. */}
          <div className="brand-story-poster" aria-hidden="true">
            <svg
              className="brand-story-poster-art"
              viewBox="0 0 600 340"
              role="presentation"
              focusable="false"
            >
              <defs>
                <radialGradient id="bs-core-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1b7552" stopOpacity="0.5" />
                  <stop offset="55%" stopColor="#1b7552" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#1b7552" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* halo do núcleo por trás do conjunto */}
              <ellipse cx="300" cy="195" rx="235" ry="130" fill="url(#bs-core-glow)" />

              {/* linhas do núcleo até cada celular: uma fonte, várias
                  identidades */}
              <g stroke="rgba(234, 243, 240, 0.14)" strokeWidth="1" fill="none">
                <path d="M300 288 C 280 278, 252 268, 234 258" />
                <path d="M300 288 C 250 276, 200 260, 172 244" />
                <path d="M300 288 C 350 276, 400 260, 428 244" />
              </g>

              {/* esquerda: Studio Bela Pele (rosa, tela dark tingida) */}
              <g opacity="0.8" transform="rotate(-4 170 170)">
                <rect x="132" y="92" width="76" height="156" rx="18" fill="#6d7578" />
                <rect x="134" y="94" width="72" height="152" rx="17" fill="#05090b" />
                <rect x="139" y="99" width="62" height="142" rx="13" fill="#1c1219" />
                <rect x="160" y="103" width="20" height="5" rx="2.5" fill="#04070a" />
                <circle cx="151" cy="119" r="5.5" fill="#a2547e" />
                <rect x="161" y="115" width="28" height="3.6" rx="1.8" fill="#eaf3f0" opacity="0.88" />
                <rect x="139" y="129" width="62" height="1.8" fill="#a2547e" opacity="0.9" />
                <rect x="144" y="136" width="34" height="12" rx="4" fill="#f5f6f4" />
                <rect x="164" y="153" width="33" height="15" rx="4" fill="#f2dcea" />
                <rect x="144" y="174" width="27" height="11" rx="4" fill="#f5f6f4" />
              </g>

              {/* direita: Sorriso Odonto (azul, tela dark tingida) */}
              <g opacity="0.8" transform="rotate(4 396 170)">
                <rect x="358" y="92" width="76" height="156" rx="18" fill="#6d7578" />
                <rect x="360" y="94" width="72" height="152" rx="17" fill="#05090b" />
                <rect x="365" y="99" width="62" height="142" rx="13" fill="#0e1620" />
                <rect x="386" y="103" width="20" height="5" rx="2.5" fill="#04070a" />
                <circle cx="377" cy="119" r="5.5" fill="#3c6fa5" />
                <rect x="387" y="115" width="28" height="3.6" rx="1.8" fill="#eaf3f0" opacity="0.88" />
                <rect x="365" y="129" width="62" height="1.8" fill="#3c6fa5" opacity="0.9" />
                <rect x="370" y="136" width="34" height="12" rx="4" fill="#f5f6f4" />
                <rect x="390" y="153" width="33" height="15" rx="4" fill="#cfdcec" />
                <rect x="370" y="174" width="27" height="11" rx="4" fill="#f5f6f4" />
              </g>

              {/* protagonista: Barbearia Aurora (verde, tela dark tingida) */}
              <g>
                <rect x="182" y="48" width="102" height="216" rx="25" fill="#6d7578" />
                <rect x="184" y="50" width="98" height="212" rx="24" fill="#05090b" />
                <rect x="190" y="56" width="86" height="200" rx="19" fill="#0d1d17" />
                <rect x="220" y="61" width="26" height="6" rx="3" fill="#04070a" />
                <circle cx="205" cy="83" r="7.5" fill="#1b7552" />
                <rect x="217" y="77" width="38" height="4.5" rx="2.25" fill="#f2f6f5" opacity="0.92" />
                <rect x="217" y="85" width="24" height="3.2" rx="1.6" fill="#9fb4b0" opacity="0.8" />
                <rect x="190" y="95" width="86" height="2" fill="#1b7552" />
                <rect x="195" y="104" width="50" height="16" rx="5" fill="#f5f6f4" />
                <rect x="221" y="126" width="50" height="24" rx="5" fill="#d9fdd3" />
                <rect x="195" y="156" width="42" height="14" rx="5" fill="#f5f6f4" />
                <rect
                  x="195"
                  y="234"
                  width="64"
                  height="11"
                  rx="5.5"
                  fill="#12211b"
                  stroke="rgba(255, 255, 255, 0.1)"
                />
                <circle cx="268" cy="239" r="6.5" fill="#1b7552" />
              </g>

              {/* o mundo Horarius na base: a fonte de onde tudo nasce */}
              <circle
                cx="300"
                cy="288"
                r="17"
                fill="none"
                stroke="#63b0a5"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
              <circle cx="300" cy="288" r="9" fill="#1b7552" />
              <ellipse
                cx="300"
                cy="288"
                rx="9"
                ry="3.5"
                fill="none"
                stroke="#8fe8c4"
                strokeOpacity="0.55"
                strokeWidth="0.8"
              />
              <ellipse
                cx="300"
                cy="288"
                rx="3.5"
                ry="9"
                fill="none"
                stroke="#8fe8c4"
                strokeOpacity="0.55"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          {ExperienceComp ? (
            <div className="brand-story-canvas-host" aria-hidden="true">
              <ExperienceComp
                trackRef={trackRef}
                identityRequestRef={identityRequestRef}
                chat={chatContent}
                onReady={handleReady}
                onFail={handleFail}
              />
            </div>
          ) : null}

          {/* As legendas são o conteúdo REAL da história: sempre no DOM, em
              ordem de leitura — leitor de tela e crawler leem tudo linear;
              no modo vivo viram overlays com crossfade por data-stage. */}
          <div
            className="brand-story-captions"
            role="group"
            aria-label={content.visualLabel}
          >
            {content.stages.map((stage, index) => (
              <div
                key={stage.title}
                className="brand-story-caption"
                data-caption={CAPTION_STAGE[index]}
              >
                <p className="brand-story-caption-title">{stage.title}</p>
                {stage.caption ? (
                  <p className="brand-story-caption-text">{stage.caption}</p>
                ) : null}
              </div>
            ))}

            <div
              className="brand-story-caption brand-story-finale"
              data-caption="5"
            >
              {/* A palavra-acento vira <em> itálico/verde (referência de
                  arte). O seo.e2e assere as METADES da tagline — o texto
                  contínuo é quebrado pela tag. */}
              <p className="brand-story-caption-title">
                {(() => {
                  const accent = content.taglineAccent;
                  const index = accent ? content.tagline.indexOf(accent) : -1;
                  if (index < 0) {
                    return content.tagline;
                  }
                  return (
                    <>
                      {content.tagline.slice(0, index)}
                      <em className="brand-story-tagline-accent">{accent}</em>
                      {content.tagline.slice(index + accent.length)}
                    </>
                  );
                })()}
              </p>
              <p className="brand-story-caption-text">{content.taglineNote}</p>
              {/* Tabs de identidade: no HTML estático (prerender/no-JS) são
                  rótulos simples — um <button disabled> permanente seria
                  semântica errada. Viram botões reais só quando a cena está
                  pronta para responder (ready começa false no servidor e no
                  primeiro render do cliente — hidratação bate). O destaque da
                  ativa vem por CSS via data-identity (escrito pela cena —
                  zero re-render). */}
              <div className="brand-story-brands">
                {FINALE_ORDER.map((brandIndex) => {
                  const brand = content.brands[brandIndex];
                  /* O hue vira var CSS: alimenta o dot e o sublinhado da
                     tab ativa (via [data-identity]). */
                  const hueStyle = {
                    '--bs-tab-hue': IDENTITY_HUES[brandIndex],
                  } as CSSProperties;
                  const label = (
                    <>
                      <span
                        className="brand-story-brand-dot"
                        aria-hidden="true"
                      />
                      {brand.name}
                    </>
                  );

                  return ready ? (
                    <button
                      key={brand.name}
                      type="button"
                      className="brand-story-brand"
                      data-brand={brandIndex}
                      style={hueStyle}
                      onClick={() => {
                        identityRequestRef.current.index = brandIndex;
                      }}
                    >
                      {label}
                    </button>
                  ) : (
                    <span
                      key={brand.name}
                      className="brand-story-brand"
                      data-brand={brandIndex}
                      style={hueStyle}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
