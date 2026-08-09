import { BellRing } from 'lucide-react';

import type { InsideSystemContent } from '../../../content/landingContent';
import { applyService } from '../insideSystemShared';
import { FakeBadge, FakeStat, type BadgeTone } from '../MockUI';
import './ScreenReminders.css';

type RemindersMock = InsideSystemContent['screens']['reminders']['mock'];

/* Semântica do WhatsApp: enviado (cinza) → entregue (slate) → lido (azul). */
const STATUS_TONE: Record<keyof RemindersMock['statusLabels'], BadgeTone> = {
  sent: 'gray',
  delivered: 'slate',
  read: 'blue',
};

interface ScreenRemindersProps {
  mock: RemindersMock;
  services: string[];
  serviceInline: string;
}

const ScreenReminders = ({ mock, services, serviceInline }: ScreenRemindersProps) => (
  <div className="its-rem">
    <div className="its-table">
      <div className="its-rem-tablehead">
        <span className="its-rem-tabletitle">
          <BellRing className="its-rem-icon" aria-hidden="true" />
          <strong>{mock.title}</strong>
        </span>
      </div>
      <div className="its-table-head its-rem-grid">
        {mock.columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      {mock.rows.map((row) => (
        <div key={row.client} className="its-table-row its-rem-grid" data-status={row.status}>
          <span className="its-table-strong">{row.client}</span>
          <span className="its-table-muted">{services[row.service]}</span>
          <span className="its-rem-time">{row.time}</span>
          <span className="its-rem-status">
            <FakeBadge label={mock.statusLabels[row.status]} tone={STATUS_TONE[row.status]} />
          </span>
        </div>
      ))}
    </div>

    <div className="its-rem-foot">
      <div className="its-card-box its-rem-preview">
        <span className="its-rem-previewlabel">{mock.preview.label}</span>
        <div className="its-rem-bubble">
          <p>{applyService(mock.preview.text, serviceInline)}</p>
          <span className="its-rem-bubblemeta">{mock.preview.meta}</span>
        </div>
      </div>
      <FakeStat
        label={mock.stat.label}
        value={mock.stat.value}
        hint={mock.stat.hint}
        tone="money"
      />
    </div>
  </div>
);

export default ScreenReminders;
