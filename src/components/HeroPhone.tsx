import { useEffect, useRef, useState, type ComponentType } from 'react';

import {
  Camera,
  Calendar,
  ChevronLeft,
  CircleCheck,
  Menu,
  Mic,
  Paperclip,
  PawPrint,
  Phone,
  Scissors,
  Send,
  Smile,
  Sparkles,
} from 'lucide-react';

import type { LandingContent, PhoneLogo } from '../content/types';
import { IconBattery, IconSignal, IconTicks, IconWifi } from './icons/device';
import { IconTooth } from './icons/logos';
import './HeroPhone.css';

/* Linha do tempo do print. A conversa inteira dura ~3 minutos e o relógio da
   status bar fica logo depois da última mensagem — é o que faz o mockup ler
   como "isso acabou de acontecer". Valores fixos de propósito: hora real
   quebraria a hidratação (o HTML pré-renderizado traria um horário e o
   cliente, outro). */
const SENT_AT = {
  greeting: '09:40',
  request: '09:41',
  offer: '09:41',
  pick: '09:42',
  confirm: '09:42',
};
const CLOCK = '09:43';

/* Beats da história que a demo encena, em ordem. Um balão fica visível quando
   stage >= seu beat; os beats TYPING_* mostram o "digitando…" no lugar da
   próxima mensagem. Entre GREETING e REQUEST a mensagem do cliente se digita
   no campo de texto (composeText), com o stage parado em GREETING. */
const STAGE = {
  EMPTY: 0,
  TYPING_GREETING: 1,
  GREETING: 2,
  REQUEST: 3,
  TYPING_OFFER: 4,
  OFFER: 5,
  SLOTS: 6,
  PICKED: 7,
  PICK_SENT: 8,
  TYPING_CONFIRM: 9,
  CONFIRM: 10,
} as const;

/* Estado final = conversa completa. É o que o prerender emite (crawler e
   navegador sem JS veem a história inteira, no primeiro cenário) e onde a
   demo pausa quando o visitante clica num horário. */
const FULL_STAGE = STAGE.CONFIRM;

/* Digitação no campo de mensagem, por caractere. */
const CHAR_MS = 42;

/* Clique do visitante pausa a demo por este tempo — o suficiente para ler a
   confirmação com o horário escolhido — e o loop volta no próximo cenário. */
const RESUME_MS = 7000;

/* Cor do "logo" de cada cenário, por índice — mesmo padrão do avatar do
   WhatsApp. Tons escuros porque a marca dentro do círculo é branca. */
const AVATAR_HUES = ['#1b7552', '#3c6fa5', '#a2547e', '#b0793c'];

/* A marca de cada negócio. Só o dente é desenhado aqui (o Lucide não tem um);
   o resto vem do set, na mesma grade, para os quatro logos parecerem família. */
const LOGO_MARKS: Record<
  PhoneLogo,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  scissors: Scissors,
  tooth: IconTooth,
  /* Estética/pele: brilho em vez de flor. A Flower2 do Lucide tem miolo
     pontilhado e vaso, e a 17px isso vira uma mancha; o brilho fica limpo. */
  sparkle: Sparkles,
  paw: PawPrint,
};

interface HeroPhoneProps {
  hero: LandingContent['hero'];
}

const TypingBubble = () => (
  <div className="pw-row pw-row-in" aria-hidden="true">
    <div className="pw-bubble pw-bubble-typing">
      <span />
      <span />
      <span />
    </div>
  </div>
);

/* Mockup do WhatsApp em CSS + SVG (nada de imagem raster): fica nítido em
   qualquer DPI e acompanha os 3 idiomas. A inclinação é um transform 3D — para
   deixar reto, basta remover o `transform` de .pw-device no CSS.

   A conversa é uma demo animada em loop, e a cada volta o aparelho vira o
   WhatsApp de um negócio fictício diferente (hero.phoneScenarios): outro nome
   no header, outro dia, outros horários. Clicar num horário pausa a demo na
   conversa completa com a escolha do visitante e, depois de RESUME_MS, o loop
   segue para o próximo cenário. Com prefers-reduced-motion nada se move: fica
   o primeiro cenário completo, estático (cliques continuam funcionando).

   Ícones: Lucide para os genéricos, `icons/device` para o chrome do aparelho
   (ver o comentário lá sobre por que esses quatro não vêm do Lucide). */
const HeroPhone = ({ hero }: HeroPhoneProps) => {
  const scenarios = hero.phoneScenarios;

  /* Estado inicial = primeiro cenário com a conversa completa, idêntico ao
     HTML do prerender — a animação só assume depois de montar. */
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stage, setStage] = useState<number>(FULL_STAGE);
  const [chosenSlot, setChosenSlot] = useState(scenarios[0].slots[1]);
  const [composeText, setComposeText] = useState('');
  const [fading, setFading] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const scenarioIndexRef = useRef(0);
  /* Preenchido pelo efeito: avança para o próximo cenário. Fica em ref para o
     handlePick (fora do efeito) agendar a retomada sem recriar o efeito. */
  const resumeRef = useRef<() => void>(() => {});

  const scenario = scenarios[scenarioIndex];
  const LogoMark = LOGO_MARKS[scenario.logo];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const element = rootRef.current;
    if (!element) {
      return undefined;
    }

    const schedule = (fn: () => void, ms: number) => {
      timersRef.current.push(window.setTimeout(fn, ms));
    };
    const clearAll = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };

    const runCycle = (index: number) => {
      const current = scenarios[index];
      scenarioIndexRef.current = index;
      setScenarioIndex(index);
      setComposeText('');
      setChosenSlot(current.slots[1]);
      setStage(STAGE.EMPTY);

      /* Roteiro do ciclo (offsets em ms a partir do reset). O total fica em
         ~15s; a folga de 4,3s no final é o tempo de LER a confirmação antes de
         o loop trocar de cenário. */
      const tTypingGreeting = 450;
      const tGreeting = tTypingGreeting + 1250;
      const tComposeStart = tGreeting + 800;
      const tRequest = tComposeStart + current.request.length * CHAR_MS + 380;
      const tTypingOffer = tRequest + 600;
      const tOffer = tTypingOffer + 1350;
      const tSlots = tOffer + 700;
      const tPicked = tSlots + 1400;
      const tPickSent = tPicked + 650;
      const tTypingConfirm = tPickSent + 650;
      const tConfirm = tTypingConfirm + 1350;
      const tNext = tConfirm + 4300;

      schedule(() => setStage(STAGE.TYPING_GREETING), tTypingGreeting);
      schedule(() => setStage(STAGE.GREETING), tGreeting);
      for (let i = 1; i <= current.request.length; i += 1) {
        schedule(() => setComposeText(current.request.slice(0, i)), tComposeStart + i * CHAR_MS);
      }
      schedule(() => {
        setComposeText('');
        setStage(STAGE.REQUEST);
      }, tRequest);
      schedule(() => setStage(STAGE.TYPING_OFFER), tTypingOffer);
      schedule(() => setStage(STAGE.OFFER), tOffer);
      schedule(() => setStage(STAGE.SLOTS), tSlots);
      schedule(() => setStage(STAGE.PICKED), tPicked);
      schedule(() => setStage(STAGE.PICK_SENT), tPickSent);
      schedule(() => setStage(STAGE.TYPING_CONFIRM), tTypingConfirm);
      schedule(() => setStage(STAGE.CONFIRM), tConfirm);
      schedule(goNext, tNext);
    };

    /* Fade + troca de cenário. O header e o chat apagam juntos (classe
       pw-fading), o nome do negócio troca com a tela apagada e o ciclo novo
       nasce no fade-in — sem corte seco. */
    const goNext = () => {
      setFading(true);
      schedule(() => {
        setFading(false);
        runCycle((scenarioIndexRef.current + 1) % scenarios.length);
      }, 320);
    };

    /* Primeira entrada: mesmo fade, mas REPETINDO o cenário que o HTML
       estático já mostrava — o header não pode trocar de nome do nada. */
    const begin = () => {
      setFading(true);
      schedule(() => {
        setFading(false);
        runCycle(scenarioIndexRef.current);
      }, 320);
    };

    resumeRef.current = goNext;

    if (typeof window.IntersectionObserver === 'undefined') {
      schedule(begin, 0);
      return clearAll;
    }

    /* Só começa quando o celular entra na tela — no mobile ele fica abaixo da
       dobra e o loop rodaria no vazio. */
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          begin();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(element);

    return () => {
      io.disconnect();
      clearAll();
      resumeRef.current = () => {};
    };
  }, [scenarios]);

  /* Clique do visitante: congela a conversa completa com a escolha dele e
     agenda a retomada do loop. Cada novo clique reinicia a contagem. */
  const handlePick = (option: string) => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    setFading(false);
    setComposeText('');
    setChosenSlot(option);
    setStage(FULL_STAGE);
    timersRef.current.push(window.setTimeout(() => resumeRef.current(), RESUME_MS));
  };

  const showTyping =
    stage === STAGE.TYPING_GREETING ||
    stage === STAGE.TYPING_OFFER ||
    stage === STAGE.TYPING_CONFIRM;
  /* Na troca de idioma os rótulos mudam ('14h00' → '14:00') e o chosenSlot
     guardado pode não existir mais na lista — cai no padrão do cenário. */
  const activeSlot = scenario.slots.includes(chosenSlot) ? chosenSlot : scenario.slots[1];
  const selectionVisible = stage >= STAGE.PICKED;
  const fadingClass = fading ? ' pw-fading' : '';

  return (
    <div className="pw" ref={rootRef}>
      <div className="pw-device">
        <span className="pw-btn pw-btn-silence" />
        <span className="pw-btn pw-btn-up" />
        <span className="pw-btn pw-btn-down" />
        <span className="pw-btn pw-btn-power" />

        {/* A tela é um grupo rotulado como demonstração: a conversa é lida como
            texto e os chips são botões de verdade; só o cromo do aparelho
            (status bar, header, campo de mensagem) fica aria-hidden. */}
        <div className="pw-screen" role="group" aria-label={hero.phoneDemoLabel}>
          <div className="pw-status" aria-hidden="true">
            <span className="pw-status-time">{CLOCK}</span>
            <div className="pw-status-icons">
              <IconSignal />
              <IconWifi />
              <IconBattery />
            </div>
          </div>
          <span className="pw-island" aria-hidden="true" />

          <header className={`pw-header${fadingClass}`} aria-hidden="true">
            <ChevronLeft className="pw-icon pw-icon-back" strokeWidth={2.2} />
            <span
              className="pw-avatar"
              style={{ backgroundColor: AVATAR_HUES[scenarioIndex % AVATAR_HUES.length] }}
            >
              <LogoMark className="pw-avatar-mark" strokeWidth={2} />
            </span>
            <span className="pw-header-id">
              <strong>
                <span className="pw-biz">{scenario.business}</span>
                <CircleCheck className="pw-icon pw-icon-verified" strokeWidth={2.8} />
              </strong>
              <small>{hero.phoneBusinessLabel}</small>
            </span>
            <span className="pw-header-actions">
              <Phone className="pw-icon" strokeWidth={1.9} />
              <Menu className="pw-icon" strokeWidth={1.9} />
            </span>
          </header>

          <div className={`pw-chat${fadingClass}`}>
            <span className="pw-day">{hero.phoneDayDivider}</span>

            {stage >= STAGE.GREETING && (
              <div className="pw-row pw-row-in">
                <div className="pw-bubble">
                  <p>{scenario.greeting}</p>
                  <span className="pw-meta">{SENT_AT.greeting}</span>
                </div>
              </div>
            )}

            {stage >= STAGE.REQUEST && (
              <div className="pw-row pw-row-out">
                <div className="pw-bubble">
                  <p>{scenario.request}</p>
                  <span className="pw-meta">
                    {SENT_AT.request}
                    <IconTicks />
                  </span>
                </div>
              </div>
            )}

            {stage >= STAGE.OFFER && (
              <div className="pw-row pw-row-in">
                <div className="pw-bubble">
                  <p>{scenario.offer}</p>
                  <span className="pw-meta">{SENT_AT.offer}</span>
                </div>
              </div>
            )}

            {stage >= STAGE.SLOTS && (
              <div className="pw-row pw-row-in">
                <div className="pw-bubble pw-bubble-slots">
                  <span className="pw-date">
                    <Calendar className="pw-icon" strokeWidth={2} />
                    {scenario.dayLabel}
                  </span>
                  <div className="pw-slots">
                    {scenario.slots.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`pw-slot ${
                          selectionVisible && option === activeSlot ? 'pw-slot-on' : ''
                        }`.trim()}
                        aria-pressed={selectionVisible && option === activeSlot}
                        aria-label={hero.phoneSlotAriaLabel.replace('{time}', option)}
                        /* Mouse age no pointerDOWN, não no click: congelar a demo
                           monta os balões que faltam e, se algo mudar de lugar
                           entre o down e o up, o click morre no ancestral (mesma
                           família do bug do :active com transform). No down, nada
                           muda entre a intenção e a ação. Toque e teclado seguem
                           no click: tap é rápido demais para o layout trair, e
                           Enter não tem geometria. */
                        onPointerDown={(event) => {
                          if (event.pointerType === 'mouse') {
                            handlePick(option);
                          }
                        }}
                        onClick={() => handlePick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {stage >= STAGE.PICK_SENT && (
              <div className="pw-row pw-row-out">
                <div className="pw-bubble pw-bubble-pick">
                  <p>{activeSlot}</p>
                  <span className="pw-meta">
                    {SENT_AT.pick}
                    <IconTicks />
                  </span>
                </div>
              </div>
            )}

            {stage >= STAGE.CONFIRM && (
              <div className="pw-row pw-row-in">
                <div className="pw-bubble">
                  <p>
                    <CircleCheck className="pw-icon pw-icon-badge" strokeWidth={2.6} />
                    {scenario.confirm.replace('{time}', activeSlot)}
                  </p>
                  <span className="pw-meta">{SENT_AT.confirm}</span>
                </div>
              </div>
            )}

            {showTyping && <TypingBubble />}
          </div>

          <div className="pw-input" aria-hidden="true">
            <span className="pw-input-field">
              <Smile className="pw-icon" strokeWidth={1.8} />
              {composeText ? (
                <em className="pw-typed">
                  <span>{composeText}</span>
                  <span className="pw-caret" />
                </em>
              ) : (
                <em>{hero.phoneInputPlaceholder}</em>
              )}
              <Paperclip className="pw-icon" strokeWidth={1.8} />
              <Camera className="pw-icon" strokeWidth={1.8} />
            </span>
            <span className="pw-send">
              {composeText ? (
                <Send className="pw-icon" strokeWidth={1.9} />
              ) : (
                <Mic className="pw-icon" strokeWidth={1.9} />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPhone;
