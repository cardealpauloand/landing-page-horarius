import { useState, type ReactNode } from 'react';

import {
  BarChart2,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Columns,
  DollarSign,
  RefreshCw,
  Rows,
  SlidersHorizontal,
  Users,
  XCircle,
} from 'lucide-react';

import type { InsideSystemContent } from '../../../content/landingContent';
import { PRO_COLORS } from '../insideSystemShared';
import { FakeAvatar, FakeBadge, FakeMeter, FakeStat, type BadgeTone } from '../MockUI';
import './ScreenAgenda.css';

type AgendaMock = InsideSystemContent['screens']['agenda']['mock'];

/* Ícones dos KPIs (chave do conteúdo → componente, padrão da casa). */
const KPI_ICONS: Record<string, ReactNode> = {
  calendar: <Calendar />,
  money: <DollarSign />,
  users: <Users />,
  clock: <Clock />,
  cancel: <XCircle />,
};

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

/* Roteiro da visão SEMANA: blocos por dia (Seg..Sáb), sem texto — leitura de
   densidade. `pro` indexa PRO_COLORS; sexta (índice 4) é o "hoje". */
const WEEK_BLOCKS: { start: number; span: number; pro: number; status: string }[][] = [
  [
    { start: 0, span: 3, pro: 0, status: 'completed' },
    { start: 6, span: 3, pro: 1, status: 'completed' },
    { start: 12, span: 2, pro: 2, status: 'completed' },
  ],
  [
    { start: 2, span: 3, pro: 1, status: 'completed' },
    { start: 8, span: 4, pro: 0, status: 'completed' },
  ],
  [
    { start: 0, span: 2, pro: 2, status: 'completed' },
    { start: 5, span: 3, pro: 0, status: 'completed' },
    { start: 10, span: 3, pro: 1, status: 'completed' },
    { start: 14, span: 2, pro: 0, status: 'completed' },
  ],
  [
    { start: 1, span: 3, pro: 0, status: 'completed' },
    { start: 6, span: 2, pro: 1, status: 'completed' },
    { start: 11, span: 4, pro: 2, status: 'completed' },
  ],
  [
    { start: 0, span: 3, pro: 0, status: 'completed' },
    { start: 4, span: 4, pro: 0, status: 'in_progress' },
    { start: 9, span: 3, pro: 1, status: 'confirmed' },
    { start: 13, span: 3, pro: 2, status: 'pending' },
  ],
  [
    { start: 2, span: 3, pro: 0, status: 'confirmed' },
    { start: 6, span: 3, pro: 1, status: 'pending' },
    { start: 10, span: 4, pro: 2, status: 'confirmed' },
  ],
];
const WEEK_TODAY = 4;

/* Roteiro da visão MÊS: agosto/2026 começa num sábado (offset 5 com semana
   iniciando na segunda); contagens de agendamentos em dias úteis. */
const MONTH_OFFSET = 5;
const MONTH_DAYS = 31;
const MONTH_TODAY = 8;
const MONTH_COUNTS: Record<number, number> = {
  1: 6,
  3: 9,
  4: 11,
  5: 8,
  6: 12,
  7: 10,
  8: 14,
  10: 9,
  11: 12,
  12: 7,
  13: 11,
  14: 13,
  15: 9,
  17: 8,
  18: 10,
  19: 12,
  20: 9,
  21: 14,
  22: 11,
};

const ScreenAgenda = ({ mock }: { mock: AgendaMock }) => {
  /* O botão "Indicadores" abre/fecha a fileira de KPIs, como no produto. */
  const [showKpis, setShowKpis] = useState(true);
  /* O switcher Dia/Semana/Mês troca a visão de verdade. */
  const [view, setView] = useState(0);

  return (
  <div className="its-agenda">
    {showKpis ? (
      <div className="its-agenda-kpis">
        {mock.kpis.map((kpi) => (
          <FakeStat
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
            tone={kpi.hint?.startsWith('+') ? 'up' : 'plain'}
            icon={kpi.icon ? KPI_ICONS[kpi.icon] : undefined}
          />
        ))}
      </div>
    ) : null}

    {/* Toolbar no desenho da Timeline real: visões, orientação, navegação,
        pílula de data e ações à direita. Só o Indicadores é funcional. */}
    <div className="its-agenda-toolbar its-card-box">
      <span className="its-seg">
        {mock.toolbar.views.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={index === view}
            onClick={() => setView(index)}
            className={`its-seg-item its-seg-item--button ${
              index === view ? 'its-seg-item--active' : ''
            }`.trim()}
          >
            {label}
          </button>
        ))}
      </span>
      <span className="its-agenda-orient">
        <Columns className="its-agenda-ticon" />
        <Rows className="its-agenda-ticon" />
      </span>
      <span className="its-agenda-nav">
        <ChevronLeft className="its-agenda-ticon" />
        <span className="its-agenda-today">
          <Calendar className="its-agenda-ticon" />
          {mock.toolbar.today}
        </span>
        <ChevronRight className="its-agenda-ticon" />
      </span>
      <span className="its-agenda-datepill">
        <Calendar className="its-agenda-ticon" />
        {mock.toolbar.date}
        <ChevronDown className="its-agenda-ticon" />
      </span>
      <span className="its-agenda-spacer" />
      <span className="its-agenda-tbtn">
        <SlidersHorizontal className="its-agenda-ticon" />
        {mock.toolbar.filters}
        <ChevronDown className="its-agenda-ticon" />
      </span>
      <button
        type="button"
        aria-pressed={showKpis}
        onClick={() => setShowKpis((current) => !current)}
        className={`its-agenda-tbtn its-agenda-tbtn--button ${
          showKpis ? 'its-agenda-tbtn--pressed' : ''
        }`.trim()}
      >
        <BarChart2 className="its-agenda-ticon" />
        {mock.toolbar.indicators}
      </button>
      <span className="its-agenda-tbtn its-agenda-tbtn--solid">
        <RefreshCw className="its-agenda-ticon" />
        {mock.toolbar.refresh}
      </span>
    </div>

    {view === 0 ? (
    <div className="its-agenda-grid its-card-box">
      <div className="its-agenda-hours" aria-hidden="true">
        <span className="its-agenda-hourshead">{mock.hourHeader}</span>
        <div className="its-agenda-hoursarea">
          {mock.hourLabels.map((hour, index) => (
            <span key={hour} style={{ top: `${(index / mock.hourLabels.length) * 100}%` }}>
              {hour}
            </span>
          ))}
        </div>
      </div>
      {mock.professionals.map((pro, column) => (
        <div key={pro.name} className="its-agenda-col">
          <div className="its-agenda-colhead">
            <div className="its-agenda-prorow">
              <FakeAvatar name={pro.name} color="#eceae4" />
              <span className="its-agenda-proinfo">
                <strong>{pro.name}</strong>
                <span className="its-agenda-metarow">
                  {pro.meta}
                  <span className="its-agenda-next">{pro.nextChip}</span>
                </span>
              </span>
            </div>
            <span className="its-agenda-occ">
              <FakeMeter pct={pro.occupancy} tone={occupancyTone(pro.occupancy)} />
              <span className={`its-agenda-occlabel its-occ--${occupancyTone(pro.occupancy)}`}>
                {pro.occupancyLabel}
              </span>
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
                <span className="its-appt-time" style={{ color: PRO_COLORS[column] }}>
                  {appt.time}
                </span>
                <span className="its-appt-client">{appt.client}</span>
                <FakeBadge
                  label={mock.statusLabels[appt.status]}
                  tone={STATUS_TONE[appt.status]}
                  className="its-appt-badge"
                />
                <span className="its-appt-dots" aria-hidden="true">
                  ⋮
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    ) : null}

    {/* Visão SEMANA: seis dias com blocos de densidade (hoje destacado). */}
    {view === 1 ? (
      <div className="its-agenda-week its-card-box">
        {mock.weekDays.map((day, dayIndex) => (
          <div
            key={day}
            className={`its-agenda-weekcol ${
              dayIndex === WEEK_TODAY ? 'its-agenda-weekcol--today' : ''
            }`.trim()}
          >
            <span className="its-agenda-weekday">{day}</span>
            <div className="its-agenda-weekslots">
              {WEEK_BLOCKS[dayIndex].map((block, blockIndex) => (
                <span
                  key={blockIndex}
                  className={`its-agenda-weekblock its-appt--${block.status}`}
                  style={{
                    top: `${(block.start / UNITS) * 100}%`,
                    height: `${(block.span / UNITS) * 100}%`,
                    borderLeftColor: PRO_COLORS[block.pro],
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    ) : null}

    {/* Visão MÊS: calendário com contagem de agendamentos por dia. */}
    {view === 2 ? (
      <div className="its-agenda-month its-card-box">
        <span className="its-agenda-monthlabel">{mock.monthLabel}</span>
        <div className="its-agenda-monthgrid">
          {Array.from({ length: MONTH_OFFSET }, (_, index) => (
            <span key={`blank-${index}`} className="its-agenda-monthcell its-agenda-monthcell--blank" />
          ))}
          {Array.from({ length: MONTH_DAYS }, (_, index) => {
            const day = index + 1;
            const count = MONTH_COUNTS[day];
            return (
              <span
                key={day}
                className={`its-agenda-monthcell ${
                  day === MONTH_TODAY ? 'its-agenda-monthcell--today' : ''
                }`.trim()}
              >
                <span className="its-agenda-monthday">{day}</span>
                {count ? <span className="its-agenda-monthcount">{count}</span> : null}
              </span>
            );
          })}
        </div>
      </div>
    ) : null}
  </div>
  );
};

export default ScreenAgenda;
