import type { ReactNode } from 'react';

import { Star } from 'lucide-react';

import './MockUI.css';

/* Primitivos compartilhados dos mockups: a "sub-anatomia" que faz as seis
   telas parecerem o mesmo produto sem cada uma reinventar stat/badge/barra.
   Tudo aqui é decorativo e estático — animação é responsabilidade do motor
   GSAP, que mira os elementos por classe. */

type StatTone = 'plain' | 'up' | 'money';

interface FakeStatProps {
  label: string;
  value: string;
  hint?: string;
  tone?: StatTone;
  /* Ícone no canto superior direito, como o StatPanel do produto. */
  icon?: ReactNode;
}

export const FakeStat = ({ label, value, hint, tone = 'plain', icon }: FakeStatProps) => (
  <div className={`its-stat its-stat--${tone}`}>
    {icon ? (
      <span className="its-stat-icon" aria-hidden="true">
        {icon}
      </span>
    ) : null}
    <span className="its-stat-label">{label}</span>
    <strong className="its-stat-value">{value}</strong>
    {hint ? <span className="its-stat-hint">{hint}</span> : null}
  </div>
);

export type BadgeTone =
  | 'amber'
  | 'green'
  | 'blue'
  | 'slate'
  | 'gray'
  | 'brand'
  | 'red'
  | 'teal';

interface FakeBadgeProps {
  label: string;
  tone: BadgeTone;
  className?: string;
}

export const FakeBadge = ({ label, tone, className = '' }: FakeBadgeProps) => (
  <span className={`its-badge its-badge--${tone} ${className}`.trim()}>{label}</span>
);

interface FakeAvatarProps {
  name: string;
  color: string;
}

export const FakeAvatar = ({ name, color }: FakeAvatarProps) => (
  <span className="its-avatar" style={{ background: color }}>
    {name.slice(0, 1)}
  </span>
);

interface FakeMeterProps {
  /* 0–100. A largura final fica no CSS (width) e o GSAP anima só o scaleX —
     o HTML do prerender já sai com a barra cheia. */
  pct: number;
  tone: 'green' | 'amber' | 'red' | 'teal';
}

export const FakeMeter = ({ pct, tone }: FakeMeterProps) => (
  <span className="its-meter">
    <span className={`its-meter-fill its-meter-fill--${tone}`} style={{ width: `${pct}%` }} />
  </span>
);

interface FakeStarsProps {
  /* 0–5, aceita fração (4.8 → overlay a 96%). */
  value: number;
  small?: boolean;
}

export const FakeStars = ({ value, small = false }: FakeStarsProps) => {
  const row = Array.from({ length: 5 }, (_, index) => (
    <Star key={index} className="its-star" aria-hidden="true" />
  ));
  return (
    <span className={`its-stars ${small ? 'its-stars--small' : ''}`.trim()}>
      <span className="its-stars-base">{row}</span>
      <span className="its-stars-fill" style={{ width: `${(value / 5) * 100}%` }}>
        {row}
      </span>
    </span>
  );
};

interface FakeSwitchProps {
  on: boolean;
  label: string;
}

export const FakeSwitch = ({ on, label }: FakeSwitchProps) => (
  <span className="its-switch" data-on={on ? 'true' : 'false'}>
    <span className="its-switch-track">
      <span className="its-switch-knob" />
    </span>
    <span className="its-switch-label">{label}</span>
  </span>
);
