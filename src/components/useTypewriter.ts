import { useEffect, useState } from 'react';

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 4800;
const GAP_MS = 450;

/**
 * Efeito typewriter em loop: mostra a frase, segura, apaga letra a letra e
 * digita a próxima.
 *
 * - O estado inicial é a PRIMEIRA frase completa. Como efeitos não rodam no
 *   servidor, o SSR/prerender sai com o texto inteiro no HTML estático — nada
 *   de h1 vazio para SEO nem para quem está sem JS.
 * - Com prefers-reduced-motion: reduce, mantém a primeira frase completa e
 *   estática, sem digitar/apagar.
 * - Trocar o array (ex.: troca de idioma) reinicia o ciclo do zero.
 */
export function useTypewriter(phrases: readonly string[]): string {
  const [text, setText] = useState(() => phrases[0] ?? '');

  // Reset quando o array muda (troca de idioma), feito durante o render —
  // padrão oficial de estado derivado, sem setState síncrono dentro de efeito.
  const [prevPhrases, setPrevPhrases] = useState(phrases);
  if (prevPhrases !== phrases) {
    setPrevPhrases(phrases);
    setText(phrases[0] ?? '');
  }

  useEffect(() => {
    if (phrases.length < 2) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let index = 0;
    let timer = 0;
    const schedule = (fn: () => void, ms: number) => {
      timer = window.setTimeout(fn, ms);
    };

    const eraseTo = (length: number) => {
      setText(phrases[index].slice(0, length));
      if (length === 0) {
        index = (index + 1) % phrases.length;
        schedule(() => typeTo(1), GAP_MS);
        return;
      }
      schedule(() => eraseTo(length - 1), DELETE_MS);
    };

    const typeTo = (length: number) => {
      setText(phrases[index].slice(0, length));
      if (length === phrases[index].length) {
        schedule(() => eraseTo(length - 1), HOLD_MS);
        return;
      }
      schedule(() => typeTo(length + 1), TYPE_MS);
    };

    schedule(() => eraseTo(phrases[0].length - 1), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [phrases]);

  return text;
}
