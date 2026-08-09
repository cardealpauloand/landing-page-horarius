import type { ComponentType, ReactNode, SVGProps } from 'react';

import {
  Bell,
  BellRing,
  CalendarDays,
  HelpCircle,
  Hourglass,
  LayoutDashboard,
  MessageCircle,
  MousePointer2,
  PanelLeft,
  Star,
} from 'lucide-react';

import type { InsideSystemContent, InsideSystemScreenId } from '../../content/landingContent';
import horariusLogo from '../../assets/horarius-logo.webp';
import { IconBattery, IconSignal, IconWifi } from '../icons/device';
import { SCREEN_ORDER } from './insideSystemShared';
import './DashFrame.css';

/* Relógio da status bar do modo celular — fixo, casando com os horários da
   tela de Conversas (mesmo racional do CLOCK do HeroPhone). */
const STATUS_CLOCK = '14:32';

/* Ícones da sidebar falsa — mesmos itens (e ícones) do menu real do produto. */
const NAV_ICONS: Record<InsideSystemScreenId, ComponentType<SVGProps<SVGSVGElement>>> = {
  agenda: CalendarDays,
  conversations: MessageCircle,
  waitlist: Hourglass,
  reviews: Star,
  reminders: BellRing,
  insights: LayoutDashboard,
};

interface DashFrameProps {
  content: InsideSystemContent;
  businessName: string;
  /* As seis .its-screen — filhos diretos do viewport. */
  children: ReactNode;
}

/* Cromo compartilhado do painel: sidebar escura + topbar + viewport. Todo o
   cromo é decorativo (aria-hidden); o conteúdo acessível são as telas. No
   layout empilhado (mobile/sem JS) sidebar e topbar somem via CSS. */
const DashFrame = ({ content, businessName, children }: DashFrameProps) => (
  /* No modo celular, o wrapper vira o APARELHO do hero (trilho metálico +
     botões físicos) e o .its-frame vira a tela; nos demais modos ele é
     display:contents e desaparece do layout. */
  <div className="its-deviceframe">
    <span className="its-devicebtn its-devicebtn--volup" aria-hidden="true" />
    <span className="its-devicebtn its-devicebtn--voldown" aria-hidden="true" />
    <span className="its-devicebtn its-devicebtn--power" aria-hidden="true" />
    <div className="its-frame">
      {/* Status bar do modo celular (mesma linguagem do HeroPhone). */}
    <div className="its-statusbar" aria-hidden="true">
      <span className="its-statusbar-time">{STATUS_CLOCK}</span>
      <span className="its-statusbar-icons">
        <IconSignal />
        <IconWifi />
        <IconBattery />
      </span>
    </div>
    <aside className="its-sidebar" aria-hidden="true">
      <div className="its-sidebar-brand">
        {/* Mesmo desenho do painel real: quadradinho branco com a logo. */}
        <span className="its-sidebar-logo">
          <img src={horariusLogo} alt="" aria-hidden="true" />
        </span>
        <span className="its-sidebar-brandcopy">
          <strong>{content.brand}</strong>
          <span>{businessName}</span>
        </span>
      </div>
      <nav className="its-sidebar-nav">
        <span className="its-nav-glow" />
        {SCREEN_ORDER.map((id) => {
          const Icon = NAV_ICONS[id];
          return (
            <span key={id} className="its-nav-item" data-nav={id}>
              <Icon className="its-nav-icon" />
              <span className="its-nav-label">{content.screens[id].navLabel}</span>
            </span>
          );
        })}
      </nav>
      <div className="its-sidebar-foot">
        <span className="its-sidebar-user" />
      </div>
    </aside>
    <div className="its-topbar" aria-hidden="true">
      <span className="its-topbar-toggle">
        <PanelLeft className="its-topbar-toggle-icon" />
      </span>
      {/* Breadcrumb como no painel real: "Visão geral / <tela ativa>" —
          o motor liga .its-active no crumb da tela corrente. No modo
          celular o breadcrumb sai e volta o nome do negócio. */}
      <span className="its-topbar-crumbs">
        <span className="its-topbar-root">{content.breadcrumbRoot}</span>
        <span className="its-topbar-sep">/</span>
        <span className="its-topbar-current">
          {SCREEN_ORDER.map((id) => (
            <span key={id} className="its-top-crumb" data-crumb={id}>
              {content.screens[id].navLabel}
            </span>
          ))}
        </span>
      </span>
      <span className="its-topbar-bizname">{businessName}</span>
      <span className="its-topbar-date">{content.topbarDate}</span>
      <span className="its-topbar-help">
        <HelpCircle className="its-topbar-bell-icon" />
      </span>
      <span className="its-topbar-bell">
        <Bell className="its-topbar-bell-icon" />
      </span>
    </div>
    {/* Véu do drawer do menu no modo celular (toque fecha). */}
    <span className="its-navoverlay" aria-hidden="true" />
    <div className="its-viewport">{children}</div>
    {/* Bottom-nav fake do carrossel mobile — o app real usa bottom-nav no
        celular; o item ativo troca junto com o slide. */}
    <nav className="its-bottomnav" aria-hidden="true">
      {SCREEN_ORDER.map((id) => {
        const Icon = NAV_ICONS[id];
        return (
          <span key={id} className="its-bottomnav-item" data-bottomnav={id}>
            <Icon className="its-bottomnav-icon" />
          </span>
        );
      })}
    </nav>
    {/* Cursor falso do desktop: o motor o desliza até o item da sidebar e
        dá o "clique" a cada troca de tela. */}
    <span className="its-cursor" aria-hidden="true">
      <span className="its-cursor-ring" />
      <MousePointer2 className="its-cursor-arrow" />
    </span>
    </div>
  </div>
);

export default DashFrame;
