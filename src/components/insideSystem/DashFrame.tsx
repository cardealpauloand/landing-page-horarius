import type { ComponentType, ReactNode, SVGProps } from 'react';

import {
  Bell,
  BellRing,
  CalendarDays,
  Hourglass,
  LayoutDashboard,
  MessageCircle,
  MousePointer2,
  Star,
} from 'lucide-react';

import type { InsideSystemContent, InsideSystemScreenId } from '../../content/landingContent';
import horariusLogo from '../../assets/horarius-logo.webp';
import { SCREEN_ORDER } from './insideSystemShared';
import './DashFrame.css';

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
  <div className="its-frame">
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
      <span className="its-topbar-toggle" />
      <span className="its-topbar-crumb">{businessName}</span>
      <span className="its-topbar-date">{content.topbarDate}</span>
      <span className="its-topbar-bell">
        <Bell className="its-topbar-bell-icon" />
      </span>
    </div>
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
);

export default DashFrame;
