import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigationType } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Guide from './pages/Guide';
import Checklist from './pages/Checklist';
import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import OpportunityHome from './features/opportunities/pages/Home';
import Catalog from './features/opportunities/pages/Catalog';
import Detail from './features/opportunities/pages/Detail';
import MyRoutePage from './features/opportunities/pages/MyRoute';
import RouteProvider from './features/opportunities/application/RouteProvider';
import CountryProvider from './features/opportunities/application/CountryProvider';
import { getOpportunity } from './features/opportunities/domain/catalog';
import { normalizeLanguage } from './services/i18n';
import './styles/tokens.css';
import './styles/global.css';
import './styles/utils.css';

function RouteAccessibility() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(pathname);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'seo.title',
      '/cse': 'home.hero.title',
      '/discover': 'companion.discover',
      '/my-route': 'companion.myRoute',
      '/about': 'about.title',
      '/checklist': 'checklist.title',
      '/resources': 'resources.title',
      '/faq': 'faq.title',
    };
    const canonicalPath = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
    const guideStep = /^\/guide\/([1-5])$/.exec(canonicalPath);
    const opportunityId = /^\/opportunities\/([^/]+)$/.exec(canonicalPath)?.[1];
    const opportunity = opportunityId ? getOpportunity(opportunityId) : undefined;
    const title = opportunity
      ? opportunity.title[normalizeLanguage(i18n.resolvedLanguage)]
      : guideStep
      ? `${t('guide.title')}: ${t(`guide.steps.${Number(guideStep[1]) - 1}.title`)}`
      : t(titles[canonicalPath] ?? 'notFound.title');
    document.title = canonicalPath === '/'
      ? `${t('common.appName')} | ${title}`
      : `${title} | ${t('common.appName')}`;

    const main = document.getElementById('main-content');
    if (main) main.tabIndex = -1;

    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    // History navigation keeps the browser's scroll and focus behavior.
    if (!pathChanged || navigationType === 'POP' || !main) return;

    const heading = main.querySelector<HTMLElement>('[data-route-focus]') ?? main.querySelector<HTMLElement>('h1');
    const target = heading ?? main;
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, navigationType, t, i18n.resolvedLanguage]);

  return null;
}

function App() {
  return (
    <RouteProvider><BrowserRouter><CountryProvider>
      <RouteAccessibility />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<OpportunityHome />} />
            <Route path="/discover" element={<Catalog />} />
            <Route path="/opportunities/:id" element={<Detail />} />
            <Route path="/my-route" element={<MyRoutePage />} />
            <Route path="/cse" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/guide" element={<Navigate to="/guide/1" replace />} />
            <Route path="/guide/:step" element={<Guide />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </CountryProvider></BrowserRouter></RouteProvider>
  );
}

export default App;
