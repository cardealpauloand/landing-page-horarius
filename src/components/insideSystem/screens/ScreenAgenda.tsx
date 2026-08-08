import type { InsideSystemContent } from '../../../content/landingContent';
import { PRO_COLORS } from '../insideSystemShared';
import { FakeAvatar, FakeBadge, FakeMeter, FakeStat, type BadgeTone } from '../MockUI';
import './ScreenAgenda.css';

type AgendaMock = InsideSystemContent['screens']['agenda']['mock'];

/* Mesmo esquema de cor por status do produto (status.utils.ts). */
const STATUS_TONE: Record<keyof AgendaMock['statusLabels'], BadgeTone> = {
  pending: 'amber',
  confirmed: 'green',
  in_progress: 'blue',
  completed: 'slate',
};

/* Faixas de ocupação do produto: alta = verde, média = âmbar, baixa = vermelho. */
const occupancyTone = (pct: number): 'green' | 'amber' | 'red' =>
  pct >= 70 ? 'green' : pct >= 55 ? 'amber' : 'red';

/* Janela visível da grade: 16 unidades de 15 min (09:00–13:00). Geometria em
   PORCENTAGEM da área de slots — a grade estica junto com a tela no palco. */
const UNITS = 16;

const ScreenAgenda = ({ mock }: { mock: AgendaMock }) => (
  <div className="its-agenda">
    <div className="its-agenda-kpis">
      {mock.kpis.map((kpi) => (
        <FakeStat
          key={kpi.label}
          label={kpi.label}
          value={kpi.value}
          hint={kpi.hint}
          tone={kpi.hint?.startsWith('+') ? 'up' : 'plain'}
        />
      ))}
    </div>

    <div className="its-agenda-toolbar its-card-box">
      <span className="its-seg">
        {mock.toolbar.views.map((view, index) => (
          <span
            key={view}
            className={`its-seg-item ${index === 0 ? 'its-seg-item--active' : ''}`.trim()}
          >
            {view}
          </span>
        ))}
      </span>
      <span className="its-agenda-today">{mock.toolbar.today}</span>
      <span className="its-agenda-date">{mock.toolbar.date}</span>
    </div>

    <div className="its-agenda-grid its-card-box">
      <div className="its-agenda-hours" aria-hidden="true">
        <div className="its-agenda-hoursarea">
          {mock.hourLabels.map((hour, index) => (
            <span key={hour} style={{ top: `${(index / (mock.hourLabels.length)) * 100}%` }}>
              {hour}
            </span>
          ))}
        </div>
      </div>
      {mock.professionals.map((pro, column) => (
        <div key={pro.name} className="its-agenda-col">
          <div className="its-agenda-colhead">
            <div className="its-agenda-prorow">
              <FakeAvatar name={pro.name} color={PRO_COLORS[column]} />
              <span className="its-agenda-proinfo">
                <strong>{pro.name}</strong>
                <span>{pro.meta}</span>
              </span>
            </div>
            <span className="its-agenda-next">{pro.nextChip}</span>
            <span className="its-agenda-occ">
              <FakeMeter pct={pro.occupancy} tone={occupancyTone(pro.occupancy)} />
              <span>{pro.occupancyLabel}</span>
            </span>
          </div>
          <div className="its-agenda-slots">
            {pro.appointments.map((appt) => (
              <div
                key={appt.time}
                className={`its-appt its-appt--${appt.status}`}
                style={{
                  top: `${(appt.start / UNITS) * 100}%`,
                  height: `${(appt.span / UNITS) * 100}%`,
                  borderLeftColor: PRO_COLORS[column],
                }}
              >
                <span className="its-appt-time">{appt.time}</span>
                <span className="its-appt-client">{appt.client}</span>
                <FakeBadge
                  label={mock.statusLabels[appt.status]}
                  tone={STATUS_TONE[appt.status]}
                  className="its-appt-badge"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ScreenAgenda;
