import { useEffect, useRef, type RefObject } from 'react';

/* Roda `start` enquanto o elemento está na tela (≥ 25% visível) E a aba está
   em primeiro plano; chama o `stop` devolvido ao sair de qualquer uma das duas
   condições, e recomeça do zero quando voltam. Com prefers-reduced-motion nada
   roda. É o que impede as demos animadas (celular do hero, conversas e painel
   da /pessoal) de ficarem consumindo timers para conteúdo que ninguém vê.

   `start` é lido de um ref: pode ser redefinido a cada render sem reiniciar o
   loop. `resetKey` reinicia (troca de idioma, por exemplo). */
export function useWhileOnScreen(
  ref: RefObject<Element | null>,
  start: () => () => void,
  resetKey?: unknown,
) {
  const startRef = useRef(start);

  useEffect(() => {
    startRef.current = start;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let stop: (() => void) | null = null;
    let onScreen = false;

    const sync = () => {
      const shouldRun = onScreen && !document.hidden;
      if (shouldRun && !stop) {
        stop = startRef.current();
      } else if (!shouldRun && stop) {
        stop();
        stop = null;
      }
    };

    document.addEventListener('visibilitychange', sync);

    let observer: IntersectionObserver | null = null;
    if (typeof window.IntersectionObserver === 'undefined') {
      onScreen = true;
      sync();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          onScreen = entries.some((entry) => entry.isIntersecting);
          sync();
        },
        { threshold: 0.25 },
      );
      observer.observe(element);
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      stop?.();
    };
  }, [ref, resetKey]);
}
