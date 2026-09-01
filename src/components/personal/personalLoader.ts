import type { ComponentType } from 'react';

import type { PersonalLandingProps } from './PersonalLanding';

/* Carregador do chunk da /pessoal. Não é React.lazy de propósito: o lazy
   suspende na primeira renderização mesmo com o módulo já baixado, o que no
   renderToString do prerender viraria o fallback (página vazia) e na
   hidratação, um mismatch. Aqui o módulo é carregado ANTES de renderizar —
   `preloadPersonalLanding` roda no prerender (entry-server) e antes do
   hydrateRoot (main.tsx) — e o PersonalRoute lê o módulo já resolvido. */

export type PersonalLandingComponent = ComponentType<PersonalLandingProps>;

let loaded: PersonalLandingComponent | null = null;

export const getLoadedPersonalLanding = () => loaded;

export const preloadPersonalLanding = async (): Promise<PersonalLandingComponent> => {
  if (!loaded) {
    const module = await import('./PersonalLanding');
    loaded = module.default;
  }
  return loaded;
};
