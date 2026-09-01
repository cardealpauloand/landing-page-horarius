import { renderToString } from 'react-dom/server';
import App from './App';
import { preloadRoute } from './routePreload';
import { renderHeadTags } from './seo/head';
import {
  getAlternatePages,
  getSeoPage,
  getXDefaultUrl,
  publishedSeoPages,
  seoPages,
} from './seo/siteRoutes';

/* Tudo prerenderiza (inclusive páginas em revisão, para abrir no navegador);
   sitemap e llms.txt só listam as publicadas. Os helpers de alternates são
   exportados para o sitemap usar a MESMA regra do <head>. */
export const prerenderPages = seoPages;
export const publishedPages = publishedSeoPages;
export { getAlternatePages, getXDefaultUrl };

/* Rotas em chunk próprio precisam do módulo antes do renderToString. */
export const preload = preloadRoute;

export function render(pathname: string) {
  const page = getSeoPage(pathname);

  return {
    appHtml: renderToString(<App initialPathname={page.pathname} />),
    headTags: renderHeadTags(page.pathname),
    htmlLang: page.htmlLang,
  };
}
