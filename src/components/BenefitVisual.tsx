import { Check, CheckCheck, Send, Sparkles } from 'lucide-react';

import type { BenefitVisualKey, LandingContent } from '../content/types';
import './BenefitVisual.css';

type Visuals = LandingContent['benefits']['visuals'];

/* As telas simuladas são decorativas: o conteúdo de verdade é a copy ao lado.
   Por isso a raiz de cada uma vai com aria-hidden — leitor de tela lendo uma
   agenda falsa, nome por nome, é ruído puro. */

/* Quatro tons por profissional/categoria, no mesmo valor de luminosidade para
   o grid não virar arco-íris. Todos passam contraste com texto branco. */
type Tone = 1 | 2 | 3 | 4;

const fill = (template: string, token: string, value: number) =>
  template.replace(`{${token}}`, String(value));

/* ------------------------------------------------------------------ inbox */

const INBOX_SECONDS = [8, 12, 6];

const InboxVisual = ({ content }: { content: Visuals['inbox'] }) => (
  <div className="benefit-visual benefit-inbox surface-card" aria-hidden="true">
    <header className="benefit-visual-header">
      <h4>{content.title}</h4>
      <span className="benefit-chip benefit-chip-muted">{content.badge}</span>
    </header>

    <ul className="benefit-inbox-list">
      {content.rows.map((row, index) => (
        <li key={row.when} className="benefit-inbox-row">
          <span className="benefit-inbox-when">{row.when}</span>
          <p className="benefit-inbox-text">{row.text}</p>
          <span className="benefit-inbox-reply">
            <CheckCheck className="benefit-inbox-ticks" />
            {fill(content.replyLabel, 'seconds', INBOX_SECONDS[index])}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

/* ----------------------------------------------------------------- agenda */

type Slot = {
  time: string;
  name: string;
  tone: Tone;
  /* 'filled' é a vaga que a lista de espera recuperou — é o que o rodapé
     do card comenta, então os dois precisam continuar apontando pro 14h. */
  state?: 'filled';
};

const AGENDA: (Slot | null)[][] = [
  [
    { time: '09:00', name: 'Camila', tone: 1 },
    { time: '10:30', name: 'Bruno', tone: 3 },
    { time: '14:00', name: 'Mariana', tone: 2, state: 'filled' },
    { time: '16:30', name: 'Juliana', tone: 4 },
  ],
  [
    { time: '09:30', name: 'Rafael', tone: 4 },
    { time: '11:00', name: 'Beatriz', tone: 2 },
    null,
    { time: '15:30', name: 'Felipe', tone: 1 },
    { time: '17:30', name: 'Andreia', tone: 3 },
  ],
  [
    { time: '09:00', name: 'Ana', tone: 1 },
    { time: '10:30', name: 'Lucas', tone: 3 },
    { time: '13:30', name: 'Patrícia', tone: 4 },
    { time: '15:30', name: 'Thiago', tone: 2 },
    { time: '17:00', name: 'Gabriela', tone: 1 },
  ],
  [
    { time: '09:30', name: 'Estêvão', tone: 3 },
    { time: '11:00', name: 'Larissa', tone: 4 },
    { time: '13:00', name: 'Alice', tone: 3 },
    { time: '16:00', name: 'Bruno', tone: 1 },
    { time: '18:00', name: 'Gustavo', tone: 2 },
  ],
  [
    { time: '09:00', name: 'Marina', tone: 2 },
    { time: '10:30', name: 'João', tone: 1 },
    { time: '13:30', name: 'Henrique', tone: 3 },
    { time: '15:00', name: 'Clara', tone: 4 },
    { time: '17:00', name: 'Paulo', tone: 1 },
  ],
  [
    { time: '09:00', name: 'Viviane', tone: 1 },
    { time: '10:30', name: 'Fernando', tone: 3 },
    null,
    { time: '15:00', name: 'Roberta', tone: 2 },
  ],
];

const AgendaVisual = ({ content }: { content: Visuals['agenda'] }) => (
  <div className="benefit-visual benefit-agenda surface-card" aria-hidden="true">
    <header className="benefit-visual-header">
      <h4>{content.title}</h4>
      <span className="benefit-chip benefit-chip-positive">{content.badge}</span>
    </header>

    <div className="benefit-agenda-grid">
      {content.days.map((day, column) => (
        <div key={day} className="benefit-agenda-column">
          <span className="benefit-agenda-day">{day}</span>
          {AGENDA[column].map((slot, row) =>
            slot ? (
              <span
                key={`${day}-${slot.time}-${slot.name}`}
                className={`benefit-slot benefit-slot-t${slot.tone}${
                  slot.state === 'filled' ? ' benefit-slot-filled' : ''
                }`}
              >
                <strong>{slot.time}</strong>
                <span className="benefit-slot-name">{slot.name}</span>
                {slot.state === 'filled' && (
                  <Check className="benefit-slot-check" />
                )}
              </span>
            ) : (
              <span key={`${day}-gap-${row}`} className="benefit-slot benefit-slot-empty" />
            ),
          )}
        </div>
      ))}
    </div>

    <footer className="benefit-visual-footer">
      <Check className="benefit-visual-footer-icon" />
      {content.footer}
    </footer>
  </div>
);

/* ---------------------------------------------------------------- winback */

const WINBACK: {
  name: string;
  days: number;
  tone: Tone;
  status: keyof Visuals['winback']['statuses'];
}[] = [
  { name: 'Marina R.', days: 64, tone: 1, status: 'invited' },
  { name: 'Diego S.', days: 58, tone: 3, status: 'returned' },
  { name: 'Letícia M.', days: 47, tone: 4, status: 'booked' },
  { name: 'Rafael A.', days: 39, tone: 2, status: 'invited' },
];

const WinbackVisual = ({ content }: { content: Visuals['winback'] }) => (
  <div className="benefit-visual benefit-winback surface-card" aria-hidden="true">
    <header className="benefit-visual-header">
      <h4>{content.title}</h4>
      <span className="benefit-chip benefit-chip-accent">
        <Sparkles className="benefit-chip-icon" />
        {content.badge}
      </span>
    </header>

    <ul className="benefit-winback-list">
      {WINBACK.map((client) => (
        <li key={client.name} className="benefit-winback-row">
          <span className={`benefit-avatar benefit-avatar-t${client.tone}`}>
            {client.name.charAt(0)}
          </span>
          <span className="benefit-winback-identity">
            <strong>{client.name}</strong>
            <span>{fill(content.awayLabel, 'days', client.days)}</span>
          </span>
          <span
            className={`benefit-chip benefit-chip-${
              client.status === 'invited' ? 'muted' : 'positive'
            }`}
          >
            {client.status === 'invited' ? (
              <Send className="benefit-chip-icon" />
            ) : (
              <Check className="benefit-chip-icon" />
            )}
            {content.statuses[client.status]}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

/* ---------------------------------------------------------------- summary */

const SUMMARY_VALUES = ['86%', '24', '2'];

const OCCUPANCY = [
  { name: 'Rafael', value: 92 },
  { name: 'Camila', value: 84 },
  { name: 'Bruno', value: 71 },
];

const SummaryVisual = ({ content }: { content: Visuals['summary'] }) => (
  <div className="benefit-visual benefit-summary surface-card" aria-hidden="true">
    <header className="benefit-visual-header">
      <h4>{content.title}</h4>
      <span className="benefit-chip benefit-chip-muted">{content.badge}</span>
    </header>

    <div className="benefit-summary-metrics">
      {content.metrics.map((label, index) => (
        <div key={label} className="benefit-metric">
          <strong>{SUMMARY_VALUES[index]}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>

    <div className="benefit-summary-occupancy">
      <span className="benefit-summary-occupancy-label">{content.occupancyLabel}</span>
      {OCCUPANCY.map((person) => (
        <div key={person.name} className="benefit-bar-row">
          <span className="benefit-bar-name">{person.name}</span>
          <span className="benefit-bar-track">
            <span className="benefit-bar-fill" style={{ width: `${person.value}%` }} />
          </span>
          <span className="benefit-bar-value">{person.value}%</span>
        </div>
      ))}
    </div>
  </div>
);

/* -------------------------------------------------------------------- mux */

interface BenefitVisualProps {
  kind: BenefitVisualKey;
  visuals: Visuals;
}

const BenefitVisual = ({ kind, visuals }: BenefitVisualProps) => {
  switch (kind) {
    case 'inbox':
      return <InboxVisual content={visuals.inbox} />;
    case 'agenda':
      return <AgendaVisual content={visuals.agenda} />;
    case 'winback':
      return <WinbackVisual content={visuals.winback} />;
    case 'summary':
      return <SummaryVisual content={visuals.summary} />;
  }
};

export default BenefitVisual;
