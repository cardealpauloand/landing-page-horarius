import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
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

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

