import { useEffect, useRef, useState } from 'react';

import {
  Camera,
  Captions,
  ChevronLeft,
  Mic,
  Paperclip,
  Phone,
  Play,
  Send,
  Smile,
  Video,
} from 'lucide-react';

import type { ChatScenario, ChatStep } from '../../content/types';
import horariusLogo from '../../assets/horarius-logo.webp';
import { IconBattery, IconSignal, IconTicks, IconWifi } from '../icons/device';
import './ChatDemo.css';

/* Motor de conversa animada do Horarius Pessoal.

   Diferente do HeroPhone (cuja história é fixa: saudação → pedido → horários →
   confirmação), aqui o roteiro é DADO: uma lista de passos (mensagem do
   assistente, mensagem da pessoa digitada no campo, áudio com transcrição,
   divisor de dia) que o motor encena em ordem, faz loop entre cenários e
   pausa quando o aparelho está fora da tela. O prerender emite o PRIMEIRO
   cenário completo — é o que crawlers e prefers-reduced-motion veem.

   Duas molduras: `phone` (aparelho inteiro, para o hero) e `card` (só a
   conversa num card, para a esteira). Mesmo motor, mesmo CSS. */

const CHAR_MS = 42;
const TYPING_MS = 1300;
const CLOCK = '09:41';

/* Alturas fixas das barras do "áudio": estáveis entre servidor e cliente
   (aleatório quebraria a hidratação). */
const WAVE = [4, 8, 12, 7, 14, 10, 6, 13, 9, 5, 11, 8, 14, 6, 10, 7, 12, 5, 9, 4];

type Chrome = {
  name: string;
  status: string;
  placeholder: string;
  dayDivider: string;
  label: string;
};

interface ChatDemoProps {
  scenarios: ChatScenario[];
  chrome: Chrome;
  variant: 'phone' | 'card';
  className?: string;
}

/* Tempo de leitura de um balão do assistente, proporcional ao texto. */
const readMs = (text: string) => Math.min(2600, 700 + text.length * 22);

const countAudios = (steps: ChatStep[], upTo: number) =>
  steps.slice(0, upTo).filter((step) => step.kind === 'audio').length;

const TypingBubble = () => (
  <div className="cd-row cd-row-in" aria-hidden="true">
    <div className="cd-bubble cd-bubble-typing">
      <span />
      <span />
      <span />
    </div>
  </div>
);

const Lines = ({ text }: { text: string }) => (
  <>
    {text.split('\n').map((line, index) => (
      <span key={index} className="cd-line">
        {line}
      </span>
    ))}
  </>
);

const ChatDemo = ({ scenarios, chrome, variant, className = '' }: ChatDemoProps) => {
  /* Estado inicial = primeiro cenário completo, idêntico ao HTML do prerender. */
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [visible, setVisible] = useState(scenarios[0].steps.length);
  const [transcripts, setTranscripts] = useState(
    countAudios(scenarios[0].steps, scenarios[0].steps.length),
  );
  const [typing, setTyping] = useState(false);
  const [composeText, setComposeText] = useState('');
  const [fading, setFading] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const scenarioIndexRef = useRef(0);

  const scenario = scenarios[scenarioIndex];

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
      const { steps } = scenarios[index];
      scenarioIndexRef.current = index;
      setScenarioIndex(index);
      setVisible(0);
      setTranscripts(0);
      setTyping(false);
      setComposeText('');

      /* Roteiro do ciclo: offsets em ms a partir do reset. */
      let t = 500;
      steps.forEach((step, i) => {
        const show = () => setVisible(i + 1);

        if (step.kind === 'in') {
          schedule(() => setTyping(true), t);
          t += TYPING_MS;
          schedule(() => {
            setTyping(false);
            show();
          }, t);
          t += readMs(step.text);
          return;
        }

        if (step.kind === 'out') {
          if (step.typed) {
            for (let c = 1; c <= step.text.length; c += 1) {
              schedule(() => setComposeText(step.text.slice(0, c)), t + c * CHAR_MS);
            }
            t += step.text.length * CHAR_MS + 380;
            schedule(() => {
              setComposeText('');
              show();
            }, t);
          } else {
            schedule(show, t);
          }
          t += 650;
          return;
        }

        if (step.kind === 'audio') {
          schedule(show, t);
          t += 1200;
          schedule(() => setTranscripts(countAudios(steps, i + 1)), t);
          t += 1100;
          return;
        }

        /* divider: uma pausa antes — a passagem de tempo precisa ser lida. */
        t += 900;
        schedule(show, t);
        t += 600;
      });

      /* Folga para ler o final antes de o loop trocar de cenário. */
      schedule(goNext, t + 3800);
    };

    /* Fade + troca de cenário; o ciclo novo nasce no fade-in. */
    const goNext = () => {
      setFading(true);
      schedule(() => {
        setFading(false);
        runCycle((scenarioIndexRef.current + 1) % scenarios.length);
      }, 320);
    };

    /* Primeira entrada: repete o cenário que o HTML estático já mostrava. */
    const begin = () => {
      setFading(true);
      schedule(() => {
        setFading(false);
        runCycle(scenarioIndexRef.current);
      }, 320);
    };

    if (typeof window.IntersectionObserver === 'undefined') {
      schedule(begin, 0);
      return clearAll;
    }

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
    };
  }, [scenarios]);

  const fadingClass = fading ? ' cd-fading' : '';

  const conversation = (
    <>
      <header className={`cd-header${fadingClass}`} aria-hidden="true">
        {variant === 'phone' && <ChevronLeft className="cd-icon cd-icon-back" strokeWidth={2.2} />}
        <span className="cd-avatar">
          <img src={horariusLogo} alt="" />
        </span>
        <span className="cd-header-id">
          <strong>{chrome.name}</strong>
          <small>{chrome.status}</small>
        </span>
        <span className="cd-header-actions">
          <Video className="cd-icon" strokeWidth={1.9} />
          <Phone className="cd-icon" strokeWidth={1.9} />
        </span>
      </header>

      <div className={`cd-chat${fadingClass}`}>
        <span className="cd-day">{chrome.dayDivider}</span>

        {scenario.steps.slice(0, visible).map((step, index) => {
          if (step.kind === 'divider') {
            return (
              <span key={index} className="cd-day">
                {step.label}
              </span>
            );
          }

          if (step.kind === 'in') {
            return (
              <div key={index} className="cd-row cd-row-in">
                <div className="cd-bubble">
                  <p>
                    <Lines text={step.text} />
                  </p>
                  <span className="cd-meta">{step.time}</span>
                </div>
              </div>
            );
          }

          if (step.kind === 'out') {
            return (
              <div key={index} className="cd-row cd-row-out">
                <div className="cd-bubble">
                  <p>
                    <Lines text={step.text} />
                  </p>
                  <span className="cd-meta">
                    {step.time}
                    <IconTicks />
                  </span>
                </div>
              </div>
            );
          }

          /* Ordinal deste áudio na conversa (1-based): a transcrição aparece
             quando o contador de transcrições visíveis o alcança. */
          const transcriptVisible = transcripts >= countAudios(scenario.steps, index + 1);

          return (
            <div key={index} className="cd-row cd-row-out">
              <div className="cd-bubble cd-bubble-audio">
                <span className="cd-audio" aria-hidden="true">
                  <span className="cd-audio-play">
                    <Play className="cd-icon" strokeWidth={0} />
                  </span>
                  <span className="cd-audio-wave">
                    {WAVE.map((height, bar) => (
                      <span key={bar} style={{ height: `${height}px` }} />
                    ))}
                  </span>
                  <span className="cd-audio-avatar">
                    <Mic className="cd-icon" strokeWidth={2} />
                  </span>
                </span>
                <span className="cd-audio-duration" aria-hidden="true">
                  {step.duration}
                </span>
                {transcriptVisible && (
                  <span className="cd-transcript">
                    <Captions className="cd-icon" strokeWidth={2} aria-hidden="true" />
                    {step.transcript}
                  </span>
                )}
                <span className="cd-meta">
                  {step.time}
                  <IconTicks />
                </span>
              </div>
            </div>
          );
        })}

        {typing && <TypingBubble />}
      </div>

      <div className="cd-input" aria-hidden="true">
        <span className="cd-input-field">
          <Smile className="cd-icon" strokeWidth={1.8} />
          {composeText ? (
            <em className="cd-typed">
              <span>{composeText}</span>
              <span className="cd-caret" />
            </em>
          ) : (
            <em>{chrome.placeholder}</em>
          )}
          <Paperclip className="cd-icon" strokeWidth={1.8} />
          {variant === 'phone' && <Camera className="cd-icon" strokeWidth={1.8} />}
        </span>
        <span className="cd-send">
          {composeText ? (
            <Send className="cd-icon" strokeWidth={1.9} />
          ) : (
            <Mic className="cd-icon" strokeWidth={1.9} />
          )}
        </span>
      </div>
    </>
  );

  if (variant === 'card') {
    return (
      <div
        ref={rootRef}
        className={`cd cd-card ${className}`.trim()}
        role="group"
        aria-label={`${chrome.label} — ${scenario.label}`}
      >
        {conversation}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`cd cd-phone ${className}`.trim()}>
      <div className="cd-device">
        <span className="cd-btn cd-btn-silence" />
        <span className="cd-btn cd-btn-up" />
        <span className="cd-btn cd-btn-down" />
        <span className="cd-btn cd-btn-power" />
        <div
          className="cd-screen"
          role="group"
          aria-label={`${chrome.label} — ${scenario.label}`}
        >
          <div className="cd-status" aria-hidden="true">
            <span className="cd-status-time">{CLOCK}</span>
            <span className="cd-status-icons">
              <IconSignal />
              <IconWifi />
              <IconBattery />
            </span>
          </div>
          <span className="cd-island" aria-hidden="true" />
          {conversation}
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
