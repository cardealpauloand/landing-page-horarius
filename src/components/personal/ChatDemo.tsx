import { useRef, useState } from 'react';

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

import type { ChatScenario } from '../../content/types';
import horariusLogo from '../../assets/horarius-logo.webp';
import { IconBattery, IconSignal, IconTicks, IconWifi } from '../icons/device';
import { useScenarioLoop, type Schedule } from '../whatsapp/useScenarioLoop';
import '../whatsapp/whatsappChrome.css';
import './ChatDemo.css';

/* Conversa animada do Horarius Pessoal.

   Diferente do HeroPhone (cuja história é fixa: saudação → pedido → horários →
   confirmação), aqui o roteiro é DADO: uma lista de passos (mensagem do
   assistente, mensagem da pessoa digitada no campo, áudio com transcrição,
   divisor de dia) que o motor encena em ordem. O loop, o fade e a pausa fora
   da tela vêm de whatsapp/useScenarioLoop, o mesmo do hero. O prerender emite
   o PRIMEIRO cenário completo — é o que crawlers e prefers-reduced-motion veem.

   Duas molduras: `phone` (aparelho inteiro, para o hero) e `card` (só a
   conversa num card, para a esteira). O cromo do WhatsApp (classes pw-*) é o
   compartilhado com o HeroPhone; as classes cd-* são só o que é daqui:
   molduras, áudio e transcrição. */

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

const TypingBubble = () => (
  <div className="pw-row pw-row-in" aria-hidden="true">
    <div className="pw-bubble pw-bubble-typing">
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
  /* Estado inicial = primeiro cenário completo, idêntico ao HTML do prerender.
     `visible` e `transcribed` contam PASSOS (índice + 1): um balão aparece
     quando index < visible; a transcrição de um áudio, quando index < transcribed. */
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [visible, setVisible] = useState(scenarios[0].steps.length);
  const [transcribed, setTranscribed] = useState(scenarios[0].steps.length);
  const [typing, setTyping] = useState(false);
  const [composeText, setComposeText] = useState('');
  const [fading, setFading] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  /* Na troca de idioma o índice guardado pelo loop pode passar do fim da lista
     nova: cai no primeiro cenário em vez de quebrar a página. */
  const scenario = scenarios[scenarioIndex] ?? scenarios[0];

  const runCycle = (index: number, schedule: Schedule) => {
    const { steps } = scenarios[index];
    setScenarioIndex(index);
    setVisible(0);
    setTranscribed(0);
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
        for (let c = 1; c <= step.text.length; c += 1) {
          schedule(() => setComposeText(step.text.slice(0, c)), t + c * CHAR_MS);
        }
        t += step.text.length * CHAR_MS + 380;
        schedule(() => {
          setComposeText('');
          show();
        }, t);
        t += 650;
        return;
      }

      if (step.kind === 'audio') {
        schedule(show, t);
        t += 1200;
        schedule(() => setTranscribed(i + 1), t);
        t += 1100;
        return;
      }

      /* divider: uma pausa antes — a passagem de tempo precisa ser lida. */
      t += 900;
      schedule(show, t);
      t += 600;
    });

    return t;
  };

  useScenarioLoop({
    rootRef,
    scenarioCount: scenarios.length,
    runCycle,
    /* Folga para ler o final antes de o loop trocar de cenário. */
    restMs: 3800,
    onFading: setFading,
    resetKey: scenarios,
  });

  const fadingClass = fading ? ' pw-fading' : '';

  const conversation = (
    <>
      <header className={`pw-header${fadingClass}`} aria-hidden="true">
        {variant === 'phone' && <ChevronLeft className="pw-icon pw-icon-back" strokeWidth={2.2} />}
        <span className="pw-avatar cd-avatar">
          <img src={horariusLogo} alt="" />
        </span>
        <span className="pw-header-id">
          <strong>
            <span className="pw-biz">{chrome.name}</span>
          </strong>
          <small>{chrome.status}</small>
        </span>
        <span className="pw-header-actions">
          <Video className="pw-icon" strokeWidth={1.9} />
          <Phone className="pw-icon" strokeWidth={1.9} />
        </span>
      </header>

      <div className={`pw-chat${fadingClass}`}>
        <span className="pw-day">{chrome.dayDivider}</span>

        {scenario.steps.slice(0, visible).map((step, index) => {
          if (step.kind === 'divider') {
            return (
              <span key={index} className="pw-day">
                {step.label}
              </span>
            );
          }

          if (step.kind === 'in') {
            return (
              <div key={index} className="pw-row pw-row-in">
                <div className="pw-bubble">
                  <p>
                    <Lines text={step.text} />
                  </p>
                  <span className="pw-meta">{step.time}</span>
                </div>
              </div>
            );
          }

          if (step.kind === 'out') {
            return (
              <div key={index} className="pw-row pw-row-out">
                <div className="pw-bubble">
                  <p>
                    <Lines text={step.text} />
                  </p>
                  <span className="pw-meta">
                    {step.time}
                    <IconTicks />
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="pw-row pw-row-out">
              <div className="pw-bubble cd-bubble-audio">
                <span className="cd-audio" aria-hidden="true">
                  <span className="cd-audio-play">
                    <Play className="pw-icon" strokeWidth={0} />
                  </span>
                  <span className="cd-audio-wave">
                    {WAVE.map((height, bar) => (
                      <span key={bar} style={{ height: `${height}px` }} />
                    ))}
                  </span>
                  <span className="cd-audio-avatar">
                    <Mic className="pw-icon" strokeWidth={2} />
                  </span>
                </span>
                <span className="cd-audio-duration" aria-hidden="true">
                  {step.duration}
                </span>
                {index < transcribed && (
                  <span className="cd-transcript">
                    <Captions className="pw-icon" strokeWidth={2} aria-hidden="true" />
                    {step.transcript}
                  </span>
                )}
                <span className="pw-meta">
                  {step.time}
                  <IconTicks />
                </span>
              </div>
            </div>
          );
        })}

        {typing && <TypingBubble />}
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
            <em>{chrome.placeholder}</em>
          )}
          <Paperclip className="pw-icon" strokeWidth={1.8} />
          {variant === 'phone' && <Camera className="pw-icon" strokeWidth={1.8} />}
        </span>
        <span className="pw-send">
          {composeText ? (
            <Send className="pw-icon" strokeWidth={1.9} />
          ) : (
            <Mic className="pw-icon" strokeWidth={1.9} />
          )}
        </span>
      </div>
    </>
  );

  if (variant === 'card') {
    return (
      <div
        ref={rootRef}
        className={`cd cd-card wa ${className}`.trim()}
        role="group"
        aria-label={`${chrome.label} — ${scenario.label}`}
      >
        {conversation}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`cd cd-phone wa ${className}`.trim()}>
      <div className="cd-device">
        <span className="cd-btn cd-btn-silence" />
        <span className="cd-btn cd-btn-up" />
        <span className="cd-btn cd-btn-down" />
        <span className="cd-btn cd-btn-power" />
        <div
          className="pw-screen"
          role="group"
          aria-label={`${chrome.label} — ${scenario.label}`}
        >
          <div className="pw-status" aria-hidden="true">
            <span className="pw-status-time">{CLOCK}</span>
            <span className="pw-status-icons">
              <IconSignal />
              <IconWifi />
              <IconBattery />
            </span>
          </div>
          <span className="pw-island" aria-hidden="true" />
          {conversation}
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
