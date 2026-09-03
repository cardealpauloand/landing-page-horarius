import type { CSSProperties } from 'react';
import {
  Camera,
  ChevronLeft,
  CircleCheck,
  EllipsisVertical,
  MessageCircle,
  Mic,
  Paperclip,
  PawPrint,
  Phone,
  Scissors,
  Smile,
  Sparkles as SparkleMark,
} from 'lucide-react';
import { IconBattery, IconSignal, IconTicks, IconWifi } from '../icons/device';
import { IconTooth } from '../icons/logos';
import type { BrandStoryChatMessage } from '../BrandStory';
import { IDENTITY_HUES } from './constants';

/* Mesmas marcas dos avatares da demo do hero (LOGO_MARKS em HeroPhone.tsx),
   por índice do array `brands`: barbearia, studio, clínica, pet. */
const AVATAR_MARKS = [Scissors, SparkleMark, IconTooth, PawPrint];

/* "Hue" do card genérico: um cinza-esverdeado morto — o mesmo pipeline de
   tingimento das marcas produz, com ele, uma interface sem cara. */
const GENERIC_HUE = '#6a7472';

interface ChatCardProps {
  /* 'generic' = a conversa neutra do primeiro ato; número = índice da marca. */
  variant: 'generic' | number;
  message: BrandStoryChatMessage;
  status: string;
  placeholder: string;
  /* Classe de janela de visibilidade (bs-card--pinned / bs-card--morph),
     aplicada pelo dono — o crossfade é 100% CSS via data-stage/identity. */
  className?: string;
}

/* A TELA do celular 3D — WhatsApp dark-mode TINGIDO pela marca (direção de
   arte da referência): fundo e chrome escuros no hue do negócio, balão do
   cliente claro, resposta num pastel da marca, mic no hue. Todo o tingimento
   deriva de UMA var (--bsc-hue, via color-mix no CSS) — o hue entra por
   inline style a partir de IDENTITY_HUES (fonte única). DOM real via drei
   Html: texto nítido em qualquer DPR e i18n grátis. */
const ChatCard = ({
  variant,
  message,
  status,
  placeholder,
  className,
}: ChatCardProps) => {
  const isGeneric = variant === 'generic';
  const Mark = isGeneric ? MessageCircle : AVATAR_MARKS[variant];
  const hue = isGeneric ? GENERIC_HUE : IDENTITY_HUES[variant];

  return (
    <div
      className={['bs-card', isGeneric ? 'bs-card--generic' : '', className]
        .filter(Boolean)
        .join(' ')}
      data-card={isGeneric ? 'generic' : variant}
      style={{ '--bsc-hue': hue } as CSSProperties}
    >
      {/* status bar + Dynamic Island — hardware, existe em qualquer marca */}
      <div className="bs-card-statusbar">
        <span className="bs-card-clock">{message.time}</span>
        <span className="bs-card-island" aria-hidden="true" />
        <span className="bs-card-signal">
          <IconSignal />
          <IconWifi />
          <IconBattery />
        </span>
      </div>

      <header className="bs-card-header">
        <ChevronLeft className="bs-card-back" strokeWidth={2.4} />
        <span className="bs-card-avatar" style={{ backgroundColor: hue }}>
          <Mark className="bs-card-avatar-mark" strokeWidth={2.2} />
        </span>
        <span className="bs-card-id">
          <span className="bs-card-name">
            {message.name}
            {isGeneric ? null : (
              <CircleCheck className="bs-card-verified" strokeWidth={2.8} />
            )}
          </span>
          <span className="bs-card-status">{status}</span>
        </span>
        <span className="bs-card-actions">
          <Phone strokeWidth={2} />
          <EllipsisVertical strokeWidth={2} />
        </span>
      </header>
      {/* linha de acento da marca sob o header (apagada no genérico) */}
      <span className="bs-card-accent" aria-hidden="true" />

      <div className="bs-card-chat">
        <p className="bs-card-msg bs-card-msg-in">
          {message.clientMessage}
          <span className="bs-card-meta">{message.time}</span>
        </p>
        <p className="bs-card-msg bs-card-msg-out">
          {message.replyMessage}
          <span className="bs-card-meta">
            {message.time}
            <IconTicks />
          </span>
        </p>
      </div>

      {/* barra de mensagem com os ícones do hero — decorativa */}
      <div className="bs-card-input" aria-hidden="true">
        <span className="bs-card-input-field">
          <Smile strokeWidth={2} />
          <span className="bs-card-input-hint">{placeholder}</span>
          <Paperclip strokeWidth={2} />
          <Camera strokeWidth={2} />
        </span>
        <span className="bs-card-send">
          <Mic strokeWidth={2.2} />
        </span>
      </div>
    </div>
  );
};

export default ChatCard;
