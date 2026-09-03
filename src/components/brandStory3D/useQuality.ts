import { useMemo } from 'react';
import { QUALITY, type QualityPreset } from './constants';

/* Decide o tier da cena UMA vez por montagem (sem listeners de resize):
   trocar contagem de instâncias/DPR ao vivo custaria reconstruir a cena
   inteira, e migração real desktop↔mobile numa mesma visita é raríssima.
   Módulo client-only (vive no chunk lazy), então window sempre existe. */
const useQuality = (): QualityPreset =>
  useMemo(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const narrowViewport = window.matchMedia('(max-width: 768px)').matches;
    return QUALITY[coarsePointer || narrowViewport ? 'mobile' : 'desktop'];
  }, []);

export default useQuality;
