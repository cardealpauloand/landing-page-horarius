import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [theme, setTheme] = useState('dark');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const isPrivacyPage = currentPath === '/privacy' || currentPath === '/politica-de-privacidade';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateTo = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} navigateTo={navigateTo} />
      
      {isPrivacyPage ? (
        <PrivacyPolicy />
      ) : (
        <>
          <Hero />
          <Features />
          <HowItWorks />
          <CTA />
        </>
      )}

      <Footer navigateTo={navigateTo} />
      <WhatsAppButton />
    </div>
  );
}

export default App;

