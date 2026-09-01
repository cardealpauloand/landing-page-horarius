import { preloadPersonalLanding } from './components/personal/personalLoader';
import { getSeoPage } from './seo/siteRoutes';

/* Baixa o chunk da rota ANTES de renderizar/hidratar: o HTML prerenderizado
   já traz a página inteira, então o módulo precisa estar resolvido quando o
   React montar — senão a hidratação encontra o DOM cheio e o componente
   vazio. Quem chama: main.tsx (hydrateRoot) e entry-server.tsx (prerender). */
export const preloadRoute = async (pathname: string): Promise<void> => {
  if (getSeoPage(pathname).kind === 'personal') {
    await preloadPersonalLanding();
  }
};
