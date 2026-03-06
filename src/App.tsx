import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Segments from './components/Segments';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PrivacyPolicy from './components/PrivacyPolicy';
import {
  defaultLanguage,
  isSupportedLanguage,
  type Language,
} from './content/landingContent';

const getInitialLanguage = (): Language => {
  const storedLanguage = window.localStorage.getItem('horarius-language');
  if (isSupportedLanguage(storedLanguage)) {
    return storedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith('es')) {
    return 'es';
  }

  if (browserLanguage.startsWith('en')) {
    return 'en';
  }

  return defaultLanguage;
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const isPrivacyPage = currentPath === '/privacy' || currentPath === '/politica-de-privacidade';

  useEffect(() => {
    window.localStorage.setItem('horarius-language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
      setPendingSection(window.location.hash ? window.location.hash.replace('#', '') : null);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (currentPath !== '/' || !pendingSection) {
      return;
    }

    requestAnimationFrame(() => {
      const section = document.getElementById(pendingSection);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState({}, '', `/#${pendingSection}`);
      }
      setPendingSection(null);
    });
  }, [currentPath, pendingSection]);

  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      setPendingSection(sectionId);
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState({}, '', `/#${sectionId}`);
  };

  return (
    <div className="page-shell">
      <Header
        currentPath={currentPath}
        language={language}
        navigateTo={navigateTo}
        onLanguageChange={setLanguage}
        scrollToSection={scrollToSection}
      />

      {isPrivacyPage ? (
        <PrivacyPolicy language={language} />
      ) : (
        <>
          <Hero language={language} />
          <SocialProof language={language} />
          <Features language={language} />
          <HowItWorks language={language} />
          <Segments language={language} />
          <FAQ language={language} />
          <CTA language={language} />
        </>
      )}

      <Footer
        language={language}
        navigateTo={navigateTo}
        scrollToSection={scrollToSection}
      />
      <WhatsAppButton language={language} />
    </div>
  );
}

export default App;
