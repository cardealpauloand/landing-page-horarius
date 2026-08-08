import { Hourglass } from 'lucide-react';

import type { InsideSystemContent } from '../../../content/landingContent';
import { FakeBadge, FakeStat } from '../MockUI';
import './ScreenWaitlist.css';

type WaitlistMock = InsideSystemContent['screens']['waitlist']['mock'];

interface ScreenWaitlistProps {
  mock: WaitlistMock;
  services: string[];
}

/* Índice da linha encenada: badge Aguardando → Oferta enviada → Confirmado.
   O SSR emite o estado final; o motor rebobina e avança de novo no scrub. */
const ANIMATED_ROW = 1;

const ScreenWaitlist = ({ mock, services }: ScreenWaitlistProps) => (
  <div className="its-wl">
    <div className="its-wl-metrics">
      {mock.metrics.map((metric, index) => (
        <FakeStat
          key={metric.label}
          label={metric.label}
          value={metric.value}
          tone={index === mock.metrics.length - 1 ? 'money' : 'plain'}
        />
      ))}
    </div>

    <div className="its-table its-wl-table">
      <div className="its-wl-tablehead">
        <span className="its-wl-tabletitle">
          <Hourglass className="its-wl-icon" aria-hidden="true" />
          <strong>{mock.tableTitle}</strong>
        </span>
        <span className="its-wl-subtitle">{mock.tableSubtitle}</span>
      </div>
      <div className="its-table-head its-wl-grid">
        {mock.columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      {mock.rows.map((row, index) => {
        const animated = index === ANIMATED_ROW;
        return (
          <div
            key={row.client}
            className={`its-table-row its-wl-grid ${animated ? 'its-wl-row--animated' : ''}`.trim()}
          >
            <span className="its-table-strong">{row.client}</span>
            <span className="its-table-muted">{services[row.service]}</span>
            <span className="its-table-muted">{row.time}</span>
            {animated ? (
              <span className="its-wl-badges">
                <FakeBadge
                  label={mock.statusLabels.waiting}
                  tone="gray"
                  className="its-wl-badge its-wl-badge--waiting"
                />
                <FakeBadge
                  label={mock.statusLabels.offered}
                  tone="brand"
                  className="its-wl-badge its-wl-badge--offered"
                />
                <FakeBadge
                  label={mock.statusLabels.confirmed}
                  tone="green"
                  className="its-wl-badge its-wl-badge--confirmed"
                />
              </span>
            ) : (
              <span>
                <FakeBadge
                  label={mock.statusLabels[row.status]}
                  tone={row.status === 'confirmed' ? 'green' : 'gray'}
                />
              </span>
            )}
            <span className={`its-table-muted ${animated ? 'its-wl-offer' : ''}`.trim()}>
              {row.offer}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export default ScreenWaitlist;
