import { useEffect, useState } from 'react';

import type { PersonalLandingProps } from './PersonalLanding';
import {
  getLoadedPersonalLanding,
  preloadPersonalLanding,
  type PersonalLandingComponent,
} from './personalLoader';

/* A /pessoal em chunk próprio (ver personalLoader.ts). No prerender e na
   hidratação o módulo já está resolvido; o caminho assíncrono abaixo só vale
   para navegação client-side até a página (popstate), que hoje não tem link
   no site — fica por robustez. */
const PersonalRoute = ({ language }: PersonalLandingProps) => {
  const [Page, setPage] = useState<PersonalLandingComponent | null>(getLoadedPersonalLanding);

  useEffect(() => {
    if (Page) {
      return undefined;
    }
    let active = true;
    preloadPersonalLanding().then((component) => {
      if (active) {
        setPage(() => component);
      }
    });
    return () => {
      active = false;
    };
  }, [Page]);

  return Page ? <Page language={language} /> : null;
};

export default PersonalRoute;
