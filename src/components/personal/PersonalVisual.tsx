import { useRef, useState } from 'react';

import {
  ArrowLeftRight,
  Bell,
  Check,
  Lock,
  PiggyBank,
  Store,
  TrendingDown,
  TrendingUp,
  UserRound,
} from 'lucide-react';

import type { PersonalPageContent } from '../../content/types';
import { useWhileOnScreen } from '../../hooks/useWhileOnScreen';
import './PersonalVisual.css';

/* Mockups da esteira que NÃO são conversa: painel, conta compartilhada e
   ponte com o negócio. Decorativos (aria-hidden): a copy ao lado é o
   conteúdo de verdade. Rótulos e dados de cena vêm do conteúdo (trilíngue):
   o painel aparece ao lado de uma conversa traduzida, então categoria e
   formato de moeda acompanham o idioma. */

type Visuals = PersonalPageContent['visuals'];

/* ------------------------------------------------------------------ painel */

type PanelTab = 'money' | 'agenda' | 'tasks';
const TAB_ORDER: PanelTab[] = ['money', 'agenda', 'tasks'];
const TAB_MS = 3200;

export const PanelVisual = ({ content }: { content: Visuals['panel'] }) => {
  /* O prerender emite a aba Dinheiro; a rotação só roda no cliente, e só
     enquanto o card está na tela (useWhileOnScreen). */
  const [tab, setTab] = useState<PanelTab>('money');
  const rootRef = useRef<HTMLDivElement | null>(null);

  useWhileOnScreen(rootRef, () => {
    const timer = window.setInterval(() => {
      setTab((current) => TAB_ORDER[(TAB_ORDER.indexOf(current) + 1) % TAB_ORDER.length]);
    }, TAB_MS);
    return () => window.clearInterval(timer);
  });

  return (
    <div ref={rootRef} className="pv pv-panel surface-card" aria-hidden="true">
      <div className="pv-tabs">
        {TAB_ORDER.map((key) => (
          <span key={key} className={`pv-tab${tab === key ? ' pv-tab-on' : ''}`}>
            {content.tabs[key]}
          </span>
        ))}
      </div>

      {tab === 'money' && (
        <div className="pv-pane" key="money">
          <header className="pv-pane-head">
            <strong>{content.month}</strong>
          </header>
          <div className="pv-stats">
            <div className="pv-stat">
              <span className="pv-stat-label">
                <TrendingUp className="pv-icon pv-icon-up" />
                {content.income}
              </span>
              <strong>{content.incomeValue}</strong>
            </div>
            <div className="pv-stat">
              <span className="pv-stat-label">
                <TrendingDown className="pv-icon pv-icon-down" />
                {content.expenses}
              </span>
              <strong>{content.expensesValue}</strong>
            </div>
          </div>
          <ul className="pv-list">
            {content.entries.map((entry, index) => (
              <li key={entry.name} className="pv-entry">
                <span className={`pv-dot pv-dot-t${index + 1}`} />
                <span className="pv-entry-name">
                  {entry.name}
                  <small>{entry.category}</small>
                </span>
                <span className="pv-entry-value">{entry.value}</span>
              </li>
            ))}
          </ul>
          <div className="pv-outside">
            <span className="pv-outside-title">
              <PiggyBank className="pv-icon" />
              {content.outsideMonth}
            </span>
            <span className="pv-outside-row">
              <span>{content.saved}</span>
              <strong>{content.savedValue}</strong>
            </span>
            <span className="pv-outside-row">
              <span>{content.redeemed}</span>
              <strong>{content.redeemedValue}</strong>
            </span>
          </div>
        </div>
      )}

      {tab === 'agenda' && (
        <div className="pv-pane" key="agenda">
          <header className="pv-pane-head">
            <strong>{content.todayTitle}</strong>
            <Bell className="pv-icon" />
          </header>
          <ul className="pv-list">
            {content.agendaItems.map((item, index) => (
              <li key={item} className="pv-entry pv-entry-agenda">
                <span className={`pv-dot pv-dot-t${(index % 3) + 1}`} />
                <span className="pv-entry-name">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'tasks' && (
        <div className="pv-pane" key="tasks">
          <header className="pv-pane-head">
            <strong>{content.tasksTitle}</strong>
          </header>
          <ul className="pv-list">
            {content.tasks.map((task) => (
              <li key={task.text} className={`pv-entry pv-task${task.done ? ' pv-task-done' : ''}`}>
                <span className="pv-check">{task.done && <Check className="pv-icon" />}</span>
                <span className="pv-entry-name">{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------- compartilhada */

const PEOPLE = [
  { initial: 'A', tone: 1 },
  { initial: 'J', tone: 2 },
  { initial: 'M', tone: 3 },
];

export const SharedVisual = ({ content }: { content: Visuals['shared'] }) => (
  <div className="pv pv-shared surface-card" aria-hidden="true">
    <div className="pv-orbit">
      <span className="pv-orbit-ring" />
      <span className="pv-orbit-center">
        <span className="pv-orbit-center-name">{content.title}</span>
        <small>{content.seatsLabel}</small>
      </span>
      {PEOPLE.map((person, index) => (
        <span
          key={person.initial}
          className={`pv-orbit-seat pv-orbit-seat-${index + 1} pv-avatar pv-avatar-t${person.tone}`}
        >
          {person.initial}
        </span>
      ))}
      <span className="pv-orbit-seat pv-orbit-seat-4 pv-avatar pv-avatar-empty">
        <UserRound className="pv-icon" />
      </span>
    </div>
    <ul className="pv-cases">
      {content.cases.map((item) => (
        <li key={item}>
          <Check className="pv-icon" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/* -------------------------------------------------------------- ponte */

export const BridgeVisual = ({ content }: { content: Visuals['bridge'] }) => (
  <div className="pv pv-bridge surface-card" aria-hidden="true">
    <span className="pv-bridge-label">{content.switcherLabel}</span>
    <div className="pv-switch">
      <span className="pv-switch-option">
        <Store className="pv-icon" />
        {content.business}
      </span>
      <span className="pv-switch-arrow">
        <ArrowLeftRight className="pv-icon" />
      </span>
      <span className="pv-switch-option pv-switch-on">
        <UserRound className="pv-icon" />
        {content.personal}
      </span>
    </div>

    <div className="pv-bridge-panes">
      <div className="pv-bridge-pane">
        <span className="pv-skeleton pv-skeleton-w70" />
        <span className="pv-skeleton pv-skeleton-w50" />
        <span className="pv-skeleton pv-skeleton-w60" />
      </div>
      <div className="pv-bridge-pane pv-bridge-pane-locked">
        <span className="pv-skeleton pv-skeleton-w60" />
        <span className="pv-skeleton pv-skeleton-w40" />
        <span className="pv-skeleton pv-skeleton-w70" />
        <span className="pv-lock">
          <Lock className="pv-icon" />
        </span>
      </div>
    </div>

    <div className="pv-privacy">
      <span className="pv-privacy-mark">
        <Lock className="pv-icon" />
      </span>
      <span>
        <strong>{content.privacyTitle}</strong>
        <small>{content.privacyText}</small>
      </span>
    </div>
  </div>
);
