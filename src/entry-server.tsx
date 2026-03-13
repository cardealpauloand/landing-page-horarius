import { renderToString } from 'react-dom/server';
import App from './App';
import { renderHeadTags } from './seo/head';
import { seoPages, getSeoPage } from './seo/siteRoutes';

export const prerenderPages = seoPages;

export function render(pathname: string) {
  const page = getSeoPage(pathname);

  return {
    appHtml: renderToString(<App initialPathname={page.pathname} />),
    headTags: renderHeadTags(page.pathname),
    htmlLang: page.htmlLang,
  };
}

