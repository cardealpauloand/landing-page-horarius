import { useState } from 'react';

import { Eye, EyeOff, TrendingUp } from 'lucide-react';

import type { InsideSystemContent } from '../../../content/landingContent';
import { FakeStat } from '../MockUI';
import './ScreenInsights.css';

type InsightsMock = InsideSystemContent['screens']['insights']['mock'];

/* Curva fixa de faturamento (30 dias, tendência de alta). O motor revela
   o traço com wipe de clip-path — dasharray quebra nas emendas dos
   segmentos quando combinada com non-scaling-stroke. */
const LINE_PATH =
  'M0,32 C6,30 10,27 16,28 C22,29 26,22 32,23 C38,24 42,26 48,22 C54,18 58,20 64,17 C70,14 74,16 80,12 C86,8 92,10 100,6';
const AREA_PATH = `${LINE_PATH} L100,42 L0,42 Z`;

/* Eixos do gráfico — números universais, roteiro de cena. */
const Y_TICKS = ['600', '400', '200', '0'];
const X_TICKS = ['09/07', '19/07', '29/07', '08/08'];

interface ScreenInsightsProps {
  mock: InsightsMock;
  services: string[];
}

const ScreenInsights = ({ mock, services }: ScreenInsightsProps) => {
  /* O olho oculta os valores em R$, como no painel real. */
  const [hidden, setHidden] = useState(false);
  const mask = (value: string) => (hidden && value.includes('R$') ? 'R$ ••••' : value);

  return (
    <div className="its-ins">
      <div className="its-ins-head">
        <strong className="its-ins-headtitle">{mock.financeTitle}</strong>
        <span className="its-ins-estimate">{mock.estimateBadge}</span>
        <span className="its-ins-headspacer" />
        <button
          type="button"
          aria-label={mock.maskLabel}
          aria-pressed={hidden}
          onClick={() => setHidden((current) => !current)}
          className="its-ins-eye"
        >
          {hidden ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <div className="its-ins-kpis">
        {mock.kpis.map((kpi) => (
          <FakeStat
            key={kpi.label}
            label={kpi.label}
            value={mask(kpi.value)}
            hint={kpi.hint}
            tone={kpi.hint?.startsWith('+') ? 'up' : 'plain'}
          />
        ))}
      </div>

      <span className="its-ins-losses">{mock.lossesLine}</span>

      <div className="its-card-box its-ins-chart">
        <span className="its-ins-chartline">
          <strong>{mock.chartTitle}</strong>
          <span>{mock.chartHint}</span>
        </span>
        <div className="its-ins-chartbody">
          <span className="its-ins-yaxis" aria-hidden="true">
            {Y_TICKS.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </span>
          <svg
            className="its-ins-svg"
            viewBox="0 0 100 42"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="its-ins-area" d={AREA_PATH} />
            <path className="its-ins-line" d={LINE_PATH} />
          </svg>
        </div>
        <span className="its-ins-xaxis" aria-hidden="true">
          {X_TICKS.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </span>
      </div>

      <div className="its-ins-bottom">
        <div className="its-card-box its-ins-top">
          <strong className="its-ins-toptitle">{mock.topServicesTitle}</strong>
          {mock.topServices.map((row) => (
            <span key={row.service} className="its-ins-toprow">
              <span className="its-ins-topname">{services[row.service]}</span>
              <span className="its-ins-topvalue">
                {row.count} · <strong>{mask(row.value)}</strong>
              </span>
            </span>
          ))}
        </div>
        <div className="its-card-box its-ins-top">
          <strong className="its-ins-toptitle">{mock.topProfessionalsTitle}</strong>
          {mock.topProfessionals.map((row) => (
            <span key={row.name} className="its-ins-toprow">
              <span className="its-ins-topname">{row.name}</span>
              <span className="its-ins-topvalue">
                {row.count} · <strong>{mask(row.value)}</strong>
              </span>
            </span>
          ))}
        </div>
        <div className="its-card-box its-ins-recovered">
          <span className="its-ins-rectitle">
            <TrendingUp className="its-ins-recicon" aria-hidden="true" />
            <strong>{mock.recovered.title}</strong>
          </span>
          <strong className="its-ins-recvalue">{mask(mock.recovered.value)}</strong>
          <p className="its-ins-recdesc">{mock.recovered.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ScreenInsights;
