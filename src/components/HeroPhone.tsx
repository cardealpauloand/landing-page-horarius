import { useState } from 'react';

import {
  Camera,
  Calendar,
  ChevronLeft,
  CircleCheck,
  Menu,
  Mic,
  Paperclip,
  Phone,
  Smile,
} from 'lucide-react';

import type { LandingContent } from '../content/types';
import { IconBattery, IconSignal, IconTicks, IconWifi } from './icons/device';
import horariusLogo from '../assets/horarius-logo.webp';
import './HeroPhone.css';

/* Linha do tempo do print. A conversa inteira dura ~3 minutos e o relógio da
   status bar fica logo depois da última mensagem — é o que faz o mockup ler
   como "isso acabou de acontecer". Mexeu num, confira os outros: com o relógio
   fora dessa janela o print se contradiz sozinho.

   Valores fixos de propósito: hora real quebraria a hidratação (o HTML
   pré-renderizado traria um horário e o cliente, outro). */
const SENT_AT = {
  greeting: '09:40',
  request: '09:41',
  offer: '09:41',
  pick: '09:42',
  confirm: '09:42',
};
const CLOCK = '09:43';

interface HeroPhoneProps {
  hero: LandingContent['hero'];
}

/* Mockup do WhatsApp em CSS + SVG (nada de imagem raster): fica nítido em
   qualquer DPI, acompanha os 3 idiomas e reaproveita o conteúdo já traduzido
   de `hero`. A inclinação é um transform 3D — para deixar reto, basta remover
   o `transform` de .pw-device no CSS.

   Ícones: Lucide para os genéricos, `icons/device` para o chrome do aparelho
   (ver o comentário lá sobre por que esses quatro não vêm do Lucide). O
   tamanho de todos vem da classe .pw-icon, não das props. */
const HeroPhone = ({ hero }: HeroPhoneProps) => {
  /* O horário escolhido é o estado da demo: ele alimenta o chip marcado, o
     balão de resposta e a frase de confirmação. Começa no segundo da lista —
     o mesmo valor que o prerender emite, senão a hidratação acusa diferença. */
  const [chosenSlot, setChosenSlot] = useState(hero.selectorOptions[1]);

  return (
    <div className="pw">
      <div className="pw-device">
        <span className="pw-btn pw-btn-silence" />
        <span className="pw-btn pw-btn-up" />
        <span className="pw-btn pw-btn-down" />
        <span className="pw-btn pw-btn-power" />

        {/* Antes a tela inteira era aria-hidden dentro de um role="img". Com os
            chips clicáveis isso deixou de servir: botão focável em subárvore
            escondida é armadilha — o teclado para nele e o leitor de tela não
            anuncia nada. Agora a tela é um grupo rotulado como demonstração, a
            conversa é lida como texto e só o cromo do aparelho segue oculto. */}
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

          <header className="pw-header" aria-hidden="true">
            <ChevronLeft className="pw-icon pw-icon-back" strokeWidth={2.2} />
            <img className="pw-avatar" src={horariusLogo} alt="" />
            <span className="pw-header-id">
              <strong>
                Horarius
                <CircleCheck className="pw-icon pw-icon-verified" strokeWidth={2.8} />
              </strong>
              <small>{hero.phoneBusinessLabel}</small>
            </span>
            <span className="pw-header-actions">
              <Phone className="pw-icon" strokeWidth={1.9} />
              <Menu className="pw-icon" strokeWidth={1.9} />
            </span>
          </header>

          <div className="pw-chat">
            <span className="pw-day">{hero.phoneDayDivider}</span>

            <div className="pw-row pw-row-in">
              <div className="pw-bubble">
                <p>{hero.phoneGreeting}</p>
                <span className="pw-meta">{SENT_AT.greeting}</span>
              </div>
            </div>

            <div className="pw-row pw-row-out">
              <div className="pw-bubble">
                <p>{hero.messages[0].text}</p>
                <span className="pw-meta">
                  {SENT_AT.request}
                  <IconTicks />
                </span>
              </div>
            </div>

            <div className="pw-row pw-row-in">
              <div className="pw-bubble">
                <p>{hero.messages[1].text}</p>
                <span className="pw-meta">{SENT_AT.offer}</span>
              </div>
            </div>

            <div className="pw-row pw-row-in">
              <div className="pw-bubble pw-bubble-slots">
                <span className="pw-date">
                  <Calendar className="pw-icon" strokeWidth={2} />
                  {hero.selectorLabel}
                </span>
                <div className="pw-slots">
                  {hero.selectorOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`pw-slot ${option === chosenSlot ? 'pw-slot-on' : ''}`.trim()}
                      aria-pressed={option === chosenSlot}
                      aria-label={hero.phoneSlotAriaLabel.replace('{time}', option)}
                      onClick={() => setChosenSlot(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pw-row pw-row-out">
              <div className="pw-bubble pw-bubble-pick">
                <p>{chosenSlot}</p>
                <span className="pw-meta">
                  {SENT_AT.pick}
                  <IconTicks />
                </span>
              </div>
            </div>

            <div className="pw-row pw-row-in">
              <div className="pw-bubble">
                <p>
                  <CircleCheck className="pw-icon pw-icon-badge" strokeWidth={2.6} />
                  {hero.messages[2].text.replace('{time}', chosenSlot)}
                </p>
                <span className="pw-meta">{SENT_AT.confirm}</span>
              </div>
            </div>
          </div>

          <div className="pw-input" aria-hidden="true">
            <span className="pw-input-field">
              <Smile className="pw-icon" strokeWidth={1.8} />
              <em>{hero.phoneInputPlaceholder}</em>
              <Paperclip className="pw-icon" strokeWidth={1.8} />
              <Camera className="pw-icon" strokeWidth={1.8} />
            </span>
            <span className="pw-send">
              <Mic className="pw-icon" strokeWidth={1.9} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPhone;
