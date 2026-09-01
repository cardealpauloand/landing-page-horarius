import { useEffect, useRef, type RefObject } from 'react';

import { useWhileOnScreen } from '../../hooks/useWhileOnScreen';

export type Schedule = (fn: () => void, ms: number) => void;

/* Fade entre cenários: chat e header apagam juntos e o ciclo novo nasce no
   fade-in — sem corte seco. */
const FADE_MS = 320;

type Options = {
  rootRef: RefObject<HTMLElement | null>;
  scenarioCount: number;
  /* Encena o cenário `index`: reseta o estado da conversa e agenda cada passo
     com `schedule` (offsets em ms a partir do reset). Devolve o instante em
     que a cena está completa; o loop soma `restMs` para a pessoa ler o final
     e só então troca de cenário. */
  runCycle: (index: number, schedule: Schedule) => number;
  restMs: number;
  onFading: (fading: boolean) => void;
  /* Mudar reinicia o loop (ex.: troca de idioma muda os roteiros). */
  resetKey?: unknown;
};

/* Motor comum das conversas animadas do WhatsApp simulado (HeroPhone na home,
   ChatDemo na /pessoal): loop entre cenários com fade, começa quando o
   aparelho entra na tela e PAUSA quando sai ou a aba vai para segundo plano
   (ao voltar, o cenário corrente recomeça do início). Com
   prefers-reduced-motion nada se move: fica o estado inicial, que é o
   primeiro cenário completo que o prerender emitiu.

   A primeira entrada repete o cenário que o HTML estático já mostrava — o
   header não pode trocar de nome do nada. */
export function useScenarioLoop({
  rootRef,
  scenarioCount,
  runCycle,
  restMs,
  onFading,
  resetKey,
}: Options) {
  const timersRef = useRef<number[]>([]);
  const indexRef = useRef(0);
  const goNextRef = useRef<() => void>(() => {});
  const runCycleRef = useRef(runCycle);
  const onFadingRef = useRef(onFading);

  useEffect(() => {
    runCycleRef.current = runCycle;
    onFadingRef.current = onFading;
  });

  const clearAll = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };
  const schedule: Schedule = (fn, ms) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  };

  useWhileOnScreen(
    rootRef,
    () => {
      const play = (index: number) => {
        /* Cada ciclo começa com a lista de timers limpa — nada acumula. */
        clearAll();
        indexRef.current = index;
        const end = runCycleRef.current(index, schedule);
        schedule(goNext, end + restMs);
      };
      const fadeTo = (index: number) => {
        onFadingRef.current(true);
        schedule(() => {
          onFadingRef.current(false);
          play(index);
        }, FADE_MS);
      };
      const goNext = () => fadeTo((indexRef.current + 1) % scenarioCount);

      goNextRef.current = goNext;
      fadeTo(indexRef.current % scenarioCount);

      return () => {
        clearAll();
        goNextRef.current = () => {};
        onFadingRef.current(false);
      };
    },
    resetKey,
  );

  /* Para quem congela a demo por interação (o clique num horário no
     HeroPhone): `freeze` cancela o roteiro em curso; `resumeAfter` agenda a
     retomada no próximo cenário. Cada novo `resumeAfter` reinicia a contagem. */
  const freeze = () => clearAll();
  const resumeAfter = (ms: number) => {
    clearAll();
    schedule(() => goNextRef.current(), ms);
  };

  return { freeze, resumeAfter };
}
