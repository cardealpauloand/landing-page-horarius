import { useEffect, useRef } from 'react';

import { ArrowRight } from 'lucide-react';

import {
  getBusinessSignupHref,
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
    /* Guarda na ordem do HeroPhone: com reduced-motion fica o layout
       empilhado estático (o CSS do modo armed está atrás da mesma media
       query, então nada arma). */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    const blocks = section.querySelectorAll('.its-copy, .its-screen');

    if (typeof window.IntersectionObserver === 'undefined') {
      /* Sem IO não há motor nem reveal — garante tudo visível no empilhado. */
      blocks.forEach((block) => block.classList.add('its-inview'));
      return undefined;
    }

    let cancelled = false;
    let teardown: (() => void) | null = null;
    let idleTimer = 0;
    let idleListener: (() => void) | null = null;

    if (desktop) {
      /* Liga o palco sticky já no mount (a seção está abaixo da dobra;
         ninguém vê o layout trocar). */
      section.classList.add('its-armed');
    } else {
      /* Mobile: carrossel horizontal com scroll-snap nativo — a seção vira
         ~1 tela de altura em vez de 6 blocos empilhados. O swipe é do CSS;
         o motor cuida dos beats por slide, da headline ativa e do
         progresso. */
      section.classList.add('its-carousel');
    }

    /* Seletor Computador/Celular: no desktop o modo "phone" troca o frame
       do painel pela moldura de telefone (CSS); no mobile o modo "desk"
       mostra o painel em miniatura (o motor cuida da troca de telas lá). */
    const deviceButtons = section.querySelectorAll<HTMLButtonElement>('.its-device-btn');
    const applyDevice = (phoneView: boolean) => {
      section.classList.remove('its-navopen', 'its-notifopen');
      if (desktop) {
        section.classList.toggle('its-phone', phoneView);
      } else {
        section.classList.toggle('its-deskview', !phoneView);
      }
      /* Vendo o "celular" (no aparelho do desktop OU no carrossel mobile),
         as telas usam o layout REAL do app no celular — chat de coluna
         única, agenda de um profissional, tabelas estreitas. */
      section.classList.toggle('its-mobileui', phoneView);
      deviceButtons.forEach((button) => {
        button.setAttribute(
          'aria-pressed',
          String((button.dataset.device === 'phone') === phoneView),
        );
      });
    };
    applyDevice(!desktop);
    const onDeviceClick = (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      applyDevice(button.dataset.device === 'phone');
    };
    deviceButtons.forEach((button) => button.addEventListener('click', onDeviceClick));

    /* Botão de menu da topbar, como no painel real: no computador colapsa
       a sidebar num trilho de ícones; no celular abre o menu como DRAWER
       por cima da tela (overlay fecha; navegar também fecha). */
    const navToggle = section.querySelector<HTMLElement>('.its-topbar-toggle');
    const onNavToggle = () => {
      if (section.classList.contains('its-mobileui')) {
        section.classList.toggle('its-navopen');
      } else {
        section.classList.toggle('its-navmini');
      }
    };
    navToggle?.addEventListener('click', onNavToggle);
    const navOverlay = section.querySelector<HTMLElement>('.its-navoverlay');
    const sidebarNav = section.querySelector<HTMLElement>('.its-sidebar-nav');
    const closeDrawer = () => section.classList.remove('its-navopen');
    navOverlay?.addEventListener('click', closeDrawer);
    sidebarNav?.addEventListener('click', closeDrawer);

    /* Sino: abre/fecha o card de notificações, como no painel real. */
    const bell = section.querySelector<HTMLElement>('.its-topbar-bell');
    const onBellClick = () => section.classList.toggle('its-notifopen');
    bell?.addEventListener('click', onBellClick);

    /* O motor GSAP (chunk lazy) baixa quando a seção se aproxima — no
       desktop dirige o palco pinado; no mobile, os beats do carrossel. */
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }
        io.disconnect();
        import('./insideSystemMotion')
          .then(({ initInsideSystemMotion }) => {
            if (cancelled) {
              return;
            }
            /* Espera o scroll ASSENTAR antes de inicializar: o refresh do
               ScrollTrigger no meio de um smooth scroll (âncora do menu,
               por exemplo) congela a rolagem no caminho. */
            const start = () => {
              if (idleListener) {
                window.removeEventListener('scroll', idleListener);
                idleListener = null;
              }
              if (!cancelled) {
                teardown = initInsideSystemMotion(section);
              }
            };
            idleListener = () => {
              window.clearTimeout(idleTimer);
              idleTimer = window.setTimeout(start, 180);
            };
            window.addEventListener('scroll', idleListener, { passive: true });
            idleTimer = window.setTimeout(start, 180);
          })
          .catch(() => {
            /* Sem motor não há modo animado: volta ao empilhado íntegro,
               com tudo visível. */
            section.classList.remove('its-armed', 'its-carousel');
            blocks.forEach((block) => block.classList.add('its-inview'));
          });
      },
      { rootMargin: '150% 0px' },
    );
    io.observe(section);

    return () => {
      cancelled = true;
      io.disconnect();
      window.clearTimeout(idleTimer);
      if (idleListener) {
        window.removeEventListener('scroll', idleListener);
      }
      deviceButtons.forEach((button) => button.removeEventListener('click', onDeviceClick));
      navToggle?.removeEventListener('click', onNavToggle);
      navOverlay?.removeEventListener('click', closeDrawer);
      sidebarNav?.removeEventListener('click', closeDrawer);
      bell?.removeEventListener('click', onBellClick);
      if (teardown) {
        teardown();
      }
      section.classList.remove(
        'its-armed',
        'its-carousel',
        'its-phone',
        'its-deskview',
        'its-mobileui',
        'its-navmini',
        'its-navopen',
        'its-notifopen',
      );
    };
  }, []);

  const headlineFor = (id: InsideSystemScreenId) =>
    variant?.headlines?.[id] ?? content.screens[id].headline;

  const renderScreen = (id: InsideSystemScreenId) => {
    switch (id) {
      case 'agenda':
        return <ScreenAgenda mock={content.screens.agenda.mock} services={services} />;
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
        return <ScreenInsights mock={content.screens.insights.mock} services={services} />;
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
              {/* Barrinhas estilo stories do carrossel mobile: uma por tela,
                  enchendo com o tempo do autoplay. */}
              <span className="its-stories">
                {SCREEN_ORDER.map((id) => (
                  <span key={id} className="its-stories-seg" data-seg={id}>
                    <span className="its-stories-fill" />
                  </span>
                ))}
              </span>
              <span className="its-progress-hint its-progress-hint--scroll">{content.hint}</span>
              <span className="its-progress-hint its-progress-hint--swipe">
                {content.hintSwipe}
              </span>
            </div>
            {/* Seletor de dispositivo: ver o painel como no computador ou
                como no celular. Estado gerido via atributos no effect (sem
                setState) — o motor reage aos mesmos cliques. */}
            <div className="its-device">
              <button
                type="button"
                className="its-device-btn"
                data-device="desktop"
                aria-pressed="true"
              >
                {content.deviceDesktop}
              </button>
              <button
                type="button"
                className="its-device-btn"
                data-device="phone"
                aria-pressed="false"
              >
                {content.devicePhone}
              </button>
            </div>
            {/* CTA do fim do tour: nos modos animados o motor o revela na
                última tela (its-showcta); no empilhado/prerender fecha a
                seção sempre visível. */}
            <a
              href={getBusinessSignupHref(language)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary its-cta"
            >
              {content.cta}
              <ArrowRight aria-hidden="true" />
            </a>
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
