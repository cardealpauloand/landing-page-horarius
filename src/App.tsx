import { useEffect, useMemo, useState } from 'react';
import CTA from './components/CTA';
import DataDeletion from './components/DataDeletion';
import FAQ from './components/FAQ';
import Features from './components/Features';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import PrivacyPolicy from './components/PrivacyPolicy';
import Segments from './components/Segments';
import SocialProof from './components/SocialProof';
import TermsOfService from './components/TermsOfService';
import WhatsAppButton from './components/WhatsAppButton';
import { applyHead } from './seo/head';
import {
  buildSectionHref,
  getEquivalentPath,
  getHomePath,
  getSeoPage,
  normalizePathname,
} from './seo/siteRoutes';

interface AppProps {
  initialPathname?: string;
}

const getHashSection = (hash: string) => hash.replace(/^#/u, '') || null;

function App({ initialPathname = '/' }: AppProps) {
  const [currentPath, setCurrentPath] = useState(() => normalizePathname(initialPathname));
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  const currentPage = useMemo(() => getSeoPage(currentPath), [currentPath]);
  const isHomePage = currentPage.kind === 'home';
  const homePath = getHomePath(currentPage.language);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const browserPath = normalizePathname(window.location.pathname);
    if (browserPath !== currentPath) {
      setCurrentPath(browserPath);
    }

    const hashSection = getHashSection(window.location.hash);
    if (hashSection) {
      setPendingSection(hashSection);
    }
  }, [currentPath]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const onPopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
      setPendingSection(getHashSection(window.location.hash));
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    applyHead(currentPath);
  }, [currentPath]);

  useEffect(() => {
    if (typeof window === 'undefined' || currentPage.kind !== 'home' || !pendingSection) {
      return;
    }

    requestAnimationFrame(() => {
      const section = document.getElementById(pendingSection);

      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState({}, '', buildSectionHref(currentPage.language, pendingSection));
      }

      setPendingSection(null);
    });
  }, [currentPage.kind, currentPage.language, pendingSection]);

  const navigateTo = (path: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    const normalizedPath = normalizePathname(path);
    const currentLocation = `${normalizePathname(window.location.pathname)}${window.location.hash}`;

    if (currentLocation !== normalizedPath) {
      window.history.pushState({}, '', normalizedPath);
    }

    setCurrentPath(normalizedPath);
    setPendingSection(null);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!isHomePage) {
      const nextHomePath = getHomePath(currentPage.language);
      window.history.pushState({}, '', buildSectionHref(currentPage.language, sectionId));
      setCurrentPath(nextHomePath);
      setPendingSection(sectionId);
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState({}, '', buildSectionHref(currentPage.language, sectionId));
  };

  const changeLanguage = (language: 'pt' | 'en' | 'es') => {
    if (typeof window === 'undefined') {
      return;
    }

    const currentSection = isHomePage ? getHashSection(window.location.hash) : null;
    const nextPath = getEquivalentPath(currentPage.pathname, language);
    const nextUrl = currentSection ? `${nextPath}#${currentSection}` : nextPath;

    window.history.pushState({}, '', nextUrl);
    setCurrentPath(nextPath);
    setPendingSection(currentSection);

    if (!currentSection) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  return (
    <div className="page-shell">
      <Header
        isHomePage={isHomePage}
        language={currentPage.language}
        homePath={homePath}
        navigateTo={navigateTo}
        onLanguageChange={changeLanguage}
        scrollToSection={scrollToSection}
      />

      {currentPage.kind === 'privacy' ? (
        <PrivacyPolicy language={currentPage.language} />
      ) : currentPage.kind === 'terms' ? (
        <TermsOfService language={currentPage.language} />
      ) : currentPage.kind === 'data-deletion' ? (
        <DataDeletion />
      ) : (
        <>
          <Hero
            language={currentPage.language}
            howItWorksHref={buildSectionHref(currentPage.language, 'how-it-works')}
          />
          <SocialProof language={currentPage.language} />
          <Features language={currentPage.language} />
          <HowItWorks language={currentPage.language} />
          <Segments language={currentPage.language} />
          <FAQ language={currentPage.language} />
          <CTA language={currentPage.language} />
        </>
      )}

      <Footer
        language={currentPage.language}
        navigateTo={navigateTo}
        scrollToSection={scrollToSection}
      />
      <WhatsAppButton language={currentPage.language} />
    </div>
  );
}

export default App;

