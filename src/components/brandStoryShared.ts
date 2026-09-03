/* Dados compartilhados entre o shell (BrandStory.tsx) e o chunk 3D
   (brandStory3D/). CONTRATO: este módulo é livre de imports de propósito —
   ele vive no grafo ESTÁTICO do App (o prerender roda o bundle SSR em Node
   puro), então nada de three/gsap/DOM pode entrar aqui. É a fonte única de
   hues e estágios; o BrandStory.css mantém literais equivalentes com
   comentário de sincronia (CSS não lê TS). */

/* Hues por índice do array `brands` do conteúdo — mesmos AVATAR_HUES da demo
   do hero (HeroPhone.tsx): 0 = Barbearia Aurora (verde) · 1 = Studio Bela
   Pele (rosa) · 2 = Sorriso Odonto (azul) · 3 = Pet Amigo Fiel (âmbar). */
export const IDENTITY_HUES = ['#1b7552', '#a2547e', '#3c6fa5', '#b0793c'];

/* Ordem das tabs do ecossistema final (índices de `brands`). O pet (3)
   existe no conteúdo/hero mas não sobe ao palco da BrandStory. */
export const FINALE_ORDER = [0, 1, 2];

/* Fronteiras dos estágios narrativos (data-stage 0..5) sobre o progresso
   0..1 do scroll — mantidas em sincronia com as janelas de visibilidade das
   legendas no BrandStory.css:
   0 = celular genérico · 1 = o problema (campo de clones) · 2 = travessia
   (sem texto) · 3 = identidade nasce · 4 = respiro ("Agora ela é sua.") ·
   5 = ecossistema final. */
export const STAGE_BOUNDARIES = [0.2, 0.36, 0.56, 0.72, 0.82];
