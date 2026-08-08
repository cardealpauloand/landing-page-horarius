import { useEffect, useRef } from 'react';

import {
  siteContent,
  type InsideSystemScreenId,
  type Language,
  type SegmentKey,
} from '../../content/landingContent';
import DashFrame from './DashFrame';
import { SCREEN_ORDER } from './insideSystemShared';
import ScreenAgenda from './screens/ScreenAgenda';
import ScreenConversations from './screens/ScreenConversations';
import ScreenInsights from './screens/ScreenInsights';
import ScreenReminders from './screens/ScreenReminders';
import ScreenReviews from './screens/ScreenReviews';
import ScreenWaitlist from './screens/ScreenWaitlist';
import './InsideSystem.css';

interface InsideSystemProps {
  language: Language;
  /* Nas landings por segmento, troca nome do negócio/serviços dos mockups. */
  segment?: SegmentKey;
}

/* Seção "Por dentro do sistema": as telas do painel desenhadas em código.

   Dois layouts, um DOM só:
   - BASE (mobile / sem JS / reduced-motion / crawler): blocos empilhados
     headline+tela, tudo visível no estado final — é o que o prerender emite.
   - ARMED (desktop + JS): a classe .its-armed liga o palco sticky; as telas
     se sobrepõem dentro do DashFrame e o motor GSAP (chunk lazy, fase 6)
     faz o scroll dirigir a troca. Classe via ref.classList — sem setState
     em efeito, sem mismatch de hidratação. */
const InsideSystem = ({ language, segment }: InsideSystemProps) => {
  const content = siteContent[language].insideSystem;
  const variant = segment ? content.segmentVariants[segment] : null;
  const services = variant ? variant.services : content.services;
  const serviceInline = variant ? variant.serviceInline : content.serviceInline;
  const businessName = variant ? variant.businessName : content.businessName;

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === 'undefined') {
      return undefined;
    }
    /* Guardas na ordem do HeroPhone: reduced-motion e ambientes sem IO ficam
       no layout empilhado estático; mobile idem (o CSS do modo armed também
       está atrás da mesma media query, então a classe lá é inerte). */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    /* Mobile: nada de GSAP — reveal leve por IntersectionObserver nos blocos
       empilhados (mesma semântica do Reveal, sem o wrapper, porque copy e
       tela moram em pais diferentes e se intercalam via order). */
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      const blocks = section.querySelectorAll('.its-copy, .its-screen');
      if (typeof window.IntersectionObserver === 'undefined') {
        blocks.forEach((block) => block.classList.add('its-inview'));
        return undefined;
      }
      const blockIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('its-inview');
              blockIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      blocks.forEach((block) => blockIo.observe(block));
      return () => blockIo.disconnect();
    }

    if (typeof window.IntersectionObserver === 'undefined') {
      return undefined;
    }

    let cancelled = false;
    let teardown: (() => void) | null = null;

    /* Liga o palco sticky já no mount (a seção está abaixo da dobra; ninguém
       vê o layout trocar). O motor GSAP só baixa quando a seção se aproxima:
       chunk lazy fora do caminho crítico. */
    section.classList.add('its-armed');

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }
        io.disconnect();
        import('./insideSystemMotion')
          .then(({ initInsideSystemMotion }) => {
            if (!cancelled) {
              teardown = initInsideSystemMotion(section);
            }
          })
          .catch(() => {
            /* Sem motor não há modo animado: volta ao empilhado íntegro. */
            section.classList.remove('its-armed');
          });
      },
      { rootMargin: '150% 0px' },
    );
    io.observe(section);

    return () => {
      cancelled = true;
      io.disconnect();
      if (teardown) {
        teardown();
      }
      section.classList.remove('its-armed');
    };
  }, []);

  const headlineFor = (id: InsideSystemScreenId) =>
    variant?.headlines?.[id] ?? content.screens[id].headline;

  const renderScreen = (id: InsideSystemScreenId) => {
    switch (id) {
      case 'agenda':
        return <ScreenAgenda mock={content.screens.agenda.mock} />;
      case 'conversations':
        return (
          <ScreenConversations
            mock={content.screens.conversations.mock}
            serviceInline={serviceInline}
          />
        );
      case 'waitlist':
        return <ScreenWaitlist mock={content.screens.waitlist.mock} services={services} />;
      case 'reviews':
        return <ScreenReviews mock={content.screens.reviews.mock} services={services} />;
      case 'reminders':
        return (
          <ScreenReminders
            mock={content.screens.reminders.mock}
            services={services}
            serviceInline={serviceInline}
          />
        );
      case 'insights':
        return <ScreenInsights mock={content.screens.insights.mock} />;
    }
  };

  return (
    <section id="inside-system" ref={sectionRef} className="inside-system section">
      <div className="its-sticky">
        <div className="container its-container">
          <div className="its-rail">
            <div className="section-intro its-intro">
              <span className="eyebrow">{content.eyebrow}</span>
              <h2 className="section-title">{content.title}</h2>
              <p className="section-description">{content.description}</p>
            </div>
            <div className="its-copies">
              {SCREEN_ORDER.map((id) => (
                <div key={id} className="its-copy" data-copy={id}>
                  <h3 className="its-copy-headline">{headlineFor(id)}</h3>
                  <p className="its-copy-description">{content.screens[id].description}</p>
                </div>
              ))}
            </div>
            <div className="its-progress" aria-hidden="true">
              <span className="its-progress-track">
                <span className="its-progress-fill" />
              </span>
              <span className="its-progress-hint">{content.hint}</span>
            </div>
          </div>
          <DashFrame content={content} businessName={businessName}>
            {SCREEN_ORDER.map((id) => (
              <div
                key={id}
                className="its-screen"
                data-screen={id}
                role="group"
                aria-label={content.screens[id].ariaLabel}
              >
                {renderScreen(id)}
              </div>
            ))}
          </DashFrame>
        </div>
      </div>
    </section>
  );
};

export default InsideSystem;
