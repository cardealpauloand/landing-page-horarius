import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { preloadRoute } from './routePreload';
import './styles/global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found');
}

const app = (
  <React.StrictMode>
    <App initialPathname={window.location.pathname} />
  </React.StrictMode>
);

/* Rotas em chunk próprio (a /pessoal) precisam do módulo resolvido antes de
   hidratar; nas demais o preload resolve na hora. */
preloadRoute(window.location.pathname).then(() => {
  if (container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
});

