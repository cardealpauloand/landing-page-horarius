import { TrendingUp } from 'lucide-react';

import type { InsideSystemContent } from '../../../content/landingContent';
import { FakeStat } from '../MockUI';
import './ScreenInsights.css';

type InsightsMock = InsideSystemContent['screens']['insights']['mock'];

/* Curva fixa de faturamento (30 dias, tendência de alta). O traço leva
   pathLength={1} para o motor animar stroke-dashoffset 1 → 0. */
const LINE_PATH =
  'M0,32 C6,30 10,27 16,28 C22,29 26,22 32,23 C38,24 42,26 48,22 C54,18 58,20 64,17 C70,14 74,16 80,12 C86,8 92,10 100,6';
const AREA_PATH = `${LINE_PATH} L100,42 L0,42 Z`;

const ScreenInsights = ({ mock }: { mock: InsightsMock }) => (
  <div className="its-ins">
    <div className="its-ins-kpis">
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

    <div className="its-card-box its-ins-chart">
      <span className="its-ins-chartline">
        <strong>{mock.chartTitle}</strong>
        <span>{mock.chartHint}</span>
      </span>
      <svg
        className="its-ins-svg"
        viewBox="0 0 100 42"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="its-ins-area" d={AREA_PATH} />
        <path className="its-ins-line" d={LINE_PATH} pathLength={1} />
      </svg>
    </div>

    <div className="its-card-box its-ins-recovered">
      <span className="its-ins-rectitle">
        <TrendingUp className="its-ins-recicon" aria-hidden="true" />
        <strong>{mock.recovered.title}</strong>
      </span>
      <strong className="its-ins-recvalue">{mock.recovered.value}</strong>
      <p className="its-ins-recdesc">{mock.recovered.description}</p>
    </div>
  </div>
);

export default ScreenInsights;
