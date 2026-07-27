/* Ícones de chrome do aparelho — os únicos que NÃO vêm do Lucide.

   Motivo: o Lucide é um set de contorno uniforme (grade 24, traço 2). Isso é
   ótimo para ícone de interface e ruim aqui: sinal, wi-fi e bateria da status
   bar do iOS são sólidos e, renderizados a ~11px de altura, um contorno vira
   borrão e o mockup deixa de parecer um iPhone. Os dois tiques do WhatsApp
   também são mais apertados e sobrepostos que o CheckCheck do Lucide.

   A classe .pw-icon (em HeroPhone.css) é quem define o tamanho — o viewBox de
   cada um é proporcional ao ícone real, então não são quadrados. */

export const IconSignal = () => (
  <svg className="pw-icon" viewBox="0 0 20 14" fill="currentColor" aria-hidden="true">
    <rect x="0" y="9.5" width="3" height="4.5" rx="1" />
    <rect x="5.5" y="6.5" width="3" height="7.5" rx="1" />
    <rect x="11" y="3.5" width="3" height="10.5" rx="1" />
    <rect x="16.5" y="0" width="3" height="14" rx="1" />
  </svg>
);

export const IconWifi = () => (
  <svg
    className="pw-icon"
    viewBox="0 0 20 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M1.4 4.6a13 13 0 0 1 17.2 0" />
    <path d="M4.4 7.9a8.4 8.4 0 0 1 11.2 0" />
    <path d="M7.4 11.1a4 4 0 0 1 5.2 0" />
  </svg>
);

export const IconBattery = () => (
  <svg className="pw-icon pw-icon-battery" viewBox="0 0 26 14" aria-hidden="true">
    <rect
      x="0.6"
      y="0.6"
      width="21"
      height="12.8"
      rx="4"
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.4"
      strokeWidth="1.2"
    />
    <rect x="2.6" y="2.6" width="16" height="8.8" rx="2.4" fill="currentColor" />
    <path d="M23.4 4.9v4.2a2.6 2.6 0 0 0 0-4.2z" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

/* Confirmação de leitura: dois tiques sobrepostos, com o primeiro cortado pelo
   segundo — é assim que o WhatsApp desenha. */
export const IconTicks = () => (
  <svg
    className="pw-icon pw-icon-ticks"
    viewBox="0 0 17 11"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1 6.1 3.9 9 9.7 1.9" />
    <path d="M7.3 6.1 8.5 7.3" />
    <path d="M10.1 9 15.9 1.9" />
  </svg>
);
