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

/* Roteiro da visão SEMANA: blocos por dia (Seg..Sáb) com hora, cliente
   (índice `c` no pool da agenda) e serviço (índice `s` em services).
   `pro` indexa PRO_COLORS e o profissional; sexta (índice 4) é o "hoje". */
const WEEK_BLOCKS: {
  start: number;
  span: number;
  pro: number;
  status: string;
  t: string;
  c: number;
  s: number;
}[][] = [
  [
    { start: 0, span: 3, pro: 0, status: 'completed', t: '09:00', c: 2, s: 0 },
    { start: 6, span: 3, pro: 1, status: 'completed', t: '10:30', c: 3, s: 1 },
    { start: 12, span: 2, pro: 2, status: 'completed', t: '12:00', c: 6, s: 0 },
  ],
  [
    { start: 2, span: 3, pro: 1, status: 'completed', t: '09:30', c: 4, s: 1 },
    { start: 8, span: 4, pro: 0, status: 'completed', t: '11:00', c: 0, s: 0 },
  ],
  [
    { start: 0, span: 2, pro: 2, status: 'completed', t: '09:00', c: 7, s: 1 },
    { start: 5, span: 3, pro: 0, status: 'completed', t: '10:15', c: 1, s: 0 },
    { start: 10, span: 3, pro: 1, status: 'completed', t: '11:30', c: 5, s: 1 },
    { start: 14, span: 2, pro: 0, status: 'completed', t: '12:30', c: 3, s: 0 },
  ],
  [
    { start: 1, span: 3, pro: 0, status: 'completed', t: '09:15', c: 6, s: 1 },
    { start: 6, span: 2, pro: 1, status: 'completed', t: '10:30', c: 2, s: 0 },
    { start: 11, span: 4, pro: 2, status: 'completed', t: '11:45', c: 4, s: 1 },
  ],
  [
    { start: 0, span: 3, pro: 0, status: 'completed', t: '09:00', c: 0, s: 0 },
    { start: 4, span: 4, pro: 0, status: 'in_progress', t: '10:00', c: 1, s: 1 },
    { start: 9, span: 3, pro: 1, status: 'confirmed', t: '11:15', c: 4, s: 0 },
    { start: 13, span: 3, pro: 2, status: 'pending', t: '12:15', c: 5, s: 1 },
  ],
  [
    { start: 2, span: 3, pro: 0, status: 'confirmed', t: '09:30', c: 2, s: 0 },
    { start: 6, span: 3, pro: 1, status: 'pending', t: '10:30', c: 7, s: 1 },
    { start: 10, span: 4, pro: 2, status: 'confirmed', t: '11:30', c: 6, s: 0 },
  ],
];
const WEEK_TODAY = 4;

/* Roteiro da visão MÊS (calendário fictício coerente com "hoje = sexta, 8"):
   dia 1 cai na sexta (offset 4, semana começando na segunda) → domingos em
   3/10/17/24/31, fechados. Entradas por dia: {t: hora, c: índice no pool de
   clientes da agenda, s: status g(verde)/a(âmbar)/r(vermelho)}; `more` é o
   excedente do "+{n} mais". */
const MONTH_OFFSET = 4;
const MONTH_DAYS = 31;
const MONTH_TODAY = 8;
const MONTH_CLOSED_DAYS = new Set([3, 10, 17, 24, 31]);
type MonthEntry = { t: string; c: number; s: 'g' | 'a' | 'r' };
const MONTH_CELLS: Record<number, { entries: MonthEntry[]; more?: number }> = {
  1: { entries: [{ t: '09:00', c: 0, s: 'g' }, { t: '11:30', c: 3, s: 'g' }], more: 3 },
  2: { entries: [{ t: '14:30', c: 6, s: 'g' }, { t: '16:00', c: 4, s: 'g' }] },
  4: { entries: [{ t: '10:00', c: 1, s: 'g' }, { t: '11:00', c: 5, s: 'r' }], more: 4 },
  5: { entries: [{ t: '09:40', c: 2, s: 'g' }, { t: '09:40', c: 7, s: 'a' }], more: 3 },
  6: { entries: [{ t: '15:00', c: 3, s: 'g' }, { t: '16:30', c: 0, s: 'g' }] },
  7: { entries: [{ t: '10:00', c: 4, s: 'g' }, { t: '11:30', c: 6, s: 'r' }], more: 1 },
  8: { entries: [{ t: '09:00', c: 0, s: 'g' }, { t: '10:00', c: 1, s: 'a' }, { t: '12:00', c: 5, s: 'a' }], more: 11 },
  9: { entries: [{ t: '14:30', c: 2, s: 'g' }, { t: '16:00', c: 7, s: 'g' }] },
  11: { entries: [{ t: '11:20', c: 3, s: 'a' }] },
  12: { entries: [{ t: '13:00', c: 6, s: 'g' }] },
  13: { entries: [{ t: '12:20', c: 4, s: 'r' }] },
  14: { entries: [{ t: '10:30', c: 0, s: 'g' }, { t: '15:00', c: 2, s: 'g' }] },
  15: { entries: [{ t: '09:30', c: 5, s: 'a' }] },
  21: { entries: [{ t: '11:30', c: 1, s: 'a' }] },
};

/* Lista de cards do dia no CELULAR (modo Celular): os agendamentos da
   sexta (WEEK_BLOCKS[4]) como o app mostra — hora, cliente, serviço,
   preço, profissional e origem. Compartilhada pelas visões Semana e Mês. */
const MOBILE_CARDS: {
  t: string;
  c: number;
  s: number;
  pro: number;
  status: keyof AgendaMock['statusLabels'];
}[] = [
  { t: '09:00 – 09:45', c: 0, s: 0, pro: 0, status: 'completed' },
  { t: '10:00 – 11:00', c: 1, s: 1, pro: 0, status: 'in_progress' },
  { t: '11:15 – 12:00', c: 4, s: 0, pro: 1, status: 'confirmed' },
  { t: '12:15 – 13:00', c: 5, s: 1, pro: 2, status: 'pending' },
];

/* Datas da semana em cena (Seg 04 … Dom 10; hoje = Sex 08). */
const WEEK_DATES = ['04', '05', '06', '07', '08', '09', '10'];

interface ScreenAgendaProps {
  mock: AgendaMock;
  services: string[];
}

const ScreenAgenda = ({ mock, services }: ScreenAgendaProps) => {
  /* O botão "Indicadores" abre/fecha a fileira de KPIs, como no produto. */
  const [showKpis, setShowKpis] = useState(true);
  /* O switcher Dia/Semana/Mês troca a visão de verdade. */
  const [view, setView] = useState(0);
  /* Pool de nomes de clientes (já traduzidos) pras entradas do calendário. */
  const clientPool = mock.professionals.flatMap((pro) =>
    pro.appointments.map((appt) => appt.client),
  );

  /* Lista de cards do dia (só aparece no modo Celular, via CSS). */
  const mobileDayList = (
    <div className="its-agenda-mlist">
      <div className="its-agenda-mlisthead">
        <strong>{mock.mobile.dayTitle}</strong>
        <span className="its-agenda-mcountpill">
          {mock.mobile.countLabel.replace('{n}', String(MOBILE_CARDS.length))}
        </span>
      </div>
      {MOBILE_CARDS.map((card) => (
        <div
          key={card.t}
          className={`its-agenda-mcard its-appt--${card.status}`}
          style={{ borderLeftColor: PRO_COLORS[card.pro] }}
        >
          <span className="its-agenda-mcardtop">
            <strong className="its-agenda-mcardtime" style={{ color: PRO_COLORS[card.pro] }}>
              {card.t}
            </strong>
            <FakeBadge
              label={mock.statusLabels[card.status]}
              tone={STATUS_TONE[card.status]}
              className="its-agenda-mcardbadge"
            />
          </span>
          <span className="its-agenda-mcardclient">{clientPool[card.c]}</span>
          <span className="its-agenda-mcardmeta">
            {services[card.s]} · {mock.mobile.prices[card.s]}
          </span>
          <span className="its-agenda-mcardmeta its-agenda-mcardmeta--soft">
            {mock.professionals[card.pro].name} · {mock.mobile.origin}
          </span>
        </div>
      ))}
    </div>
  );

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

    {/* Visão SEMANA: seis dias com blocos de densidade (hoje destacado).
        No modo Celular vira faixa de dias + lista de cards, como o app. */}
    {view === 1 ? (
      <>
      <div className="its-agenda-week its-card-box">
        {mock.weekDays.slice(0, 6).map((day, dayIndex) => (
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
                >
                  <span className="its-agenda-weekline">
                    <strong>{block.t}</strong> {clientPool[block.c]}
                  </span>
                  <span className="its-agenda-weekline its-agenda-weekline--muted">
                    {services[block.s]} · {mock.professionals[block.pro].name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="its-agenda-mweek its-card-box">
        <div className="its-agenda-mstrip">
          {mock.weekDays.map((day, dayIndex) => (
            <span
              key={day}
              className={`its-agenda-mday ${
                dayIndex === WEEK_TODAY ? 'its-agenda-mday--today' : ''
              }`.trim()}
            >
              <span className="its-agenda-mdayname">{day}</span>
              <strong>{WEEK_DATES[dayIndex]}</strong>
              <span className="its-agenda-mcount">
                •{dayIndex < 6 ? WEEK_BLOCKS[dayIndex].length : 0}
              </span>
            </span>
          ))}
        </div>
        {mobileDayList}
      </div>
      </>
    ) : null}

    {/* Visão MÊS: calendário com os agendamentos do dia (pílulas hora+nome
        por status), "+N mais" e domingos fechados, como o produto. No modo
        Celular vira calendário de pontinhos + lista de cards do dia. */}
    {view === 2 ? (
      <>
      <div className="its-agenda-month its-card-box">
        <span className="its-agenda-monthlabel">{mock.monthLabel}</span>
        <div className="its-agenda-monthhead">
          {mock.weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="its-agenda-monthgrid">
          {Array.from({ length: MONTH_OFFSET }, (_, index) => (
            <span key={`prev-${index}`} className="its-agenda-monthcell its-agenda-monthcell--muted">
              <span className="its-agenda-monthday">{28 + index}</span>
            </span>
          ))}
          {Array.from({ length: MONTH_DAYS }, (_, index) => {
            const day = index + 1;
            const cell = MONTH_CELLS[day];
            const closed = MONTH_CLOSED_DAYS.has(day);
            return (
              <span
                key={day}
                className={`its-agenda-monthcell ${
                  day === MONTH_TODAY ? 'its-agenda-monthcell--today' : ''
                } ${closed ? 'its-agenda-monthcell--closed' : ''}`.trim()}
              >
                <span className="its-agenda-monthday">{String(day).padStart(2, '0')}</span>
                {closed ? (
                  <span className="its-agenda-monthclosed">{mock.closedLabel}</span>
                ) : null}
                {cell
                  ? cell.entries.map((entry, entryIndex) => (
                      <span
                        key={entryIndex}
                        className={`its-agenda-monthentry its-agenda-monthentry--${entry.s}`}
                      >
                        <strong>{entry.t}</strong> {clientPool[entry.c]}
                      </span>
                    ))
                  : null}
                {cell?.more ? (
                  <span className="its-agenda-monthmore">
                    {mock.monthMore.replace('{n}', String(cell.more))}
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>
      </div>
      <div className="its-agenda-mmonth its-card-box">
        <span className="its-agenda-monthlabel">{mock.monthLabel}</span>
        <div className="its-agenda-mcalhead" aria-hidden="true">
          {mock.weekDays.map((day) => (
            <span key={day}>{day.charAt(0)}</span>
          ))}
        </div>
        <div className="its-agenda-mcal">
          {Array.from({ length: MONTH_OFFSET }, (_, index) => (
            <span key={`mprev-${index}`} className="its-agenda-mcalday its-agenda-mcalday--muted">
              {28 + index}
            </span>
          ))}
          {Array.from({ length: MONTH_DAYS }, (_, index) => {
            const day = index + 1;
            const cell = MONTH_CELLS[day];
            const dots = cell ? Math.min(3, cell.entries.length + (cell.more ? 1 : 0)) : 0;
            return (
              <span
                key={day}
                className={`its-agenda-mcalday ${
                  day === MONTH_TODAY ? 'its-agenda-mcalday--today' : ''
                } ${MONTH_CLOSED_DAYS.has(day) ? 'its-agenda-mcalday--muted' : ''}`.trim()}
              >
                {day}
                <span className="its-agenda-mcaldots">{'•'.repeat(dots)}</span>
              </span>
            );
          })}
        </div>
        {mobileDayList}
      </div>
      </>
    ) : null}
  </div>
  );
};

export default ScreenAgenda;
