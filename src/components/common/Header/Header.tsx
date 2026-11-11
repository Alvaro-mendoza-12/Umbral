import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import ThresholdMark from '../ThresholdMark';

const cseLinks = [
  { to: '/about', label: 'common.about' },
  { to: '/guide', label: 'common.guide' },
  { to: '/checklist', label: 'common.checklist' },
  { to: '/resources', label: 'common.resources' },
  { to: '/faq', label: 'common.faq' },
];
const navigationLinks = [
  { to: '/', label: 'companion.home' },
  { to: '/discover', label: 'companion.discover' },
  { to: '/my-route', label: 'companion.myRoute' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { pathname, search } = useLocation();
  const country = (new URLSearchParams(search).get('country') ?? 'PE').toUpperCase();
  const links = navigationLinks.map(link => country !== 'PE' && link.to !== '/my-route' ? { ...link, to: `${link.to}?country=${encodeURIComponent(country)}` } : link);
  const showCseNavigation = /^\/(?:cse|about|guide|checklist|resources|faq)(?:\/|$)/.test(pathname) && (pathname !== '/cse' || country === 'PE');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const language = i18n.resolvedLanguage ?? i18n.language;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (!desktop.matches) return;
      const focused = document.activeElement;
      if (focused === menuButtonRef.current || document.getElementById('mobile-navigation')?.contains(focused)) {
        headerRef.current?.querySelector<HTMLAnchorElement>('[data-brand-link]')?.focus();
      }
      setMobileMenuOpen(false);
    };
    closeOnDesktop();
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMobileMenuOpen(false);
        if (document.getElementById('mobile-navigation')?.contains(document.activeElement)) {
          menuButtonRef.current?.focus();
        }
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      onKeyDown={event => {
        if (event.key === 'Escape' && mobileMenuOpen) {
          event.preventDefault();
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
      onBlur={event => {
        if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
          setMobileMenuOpen(false);
        }
      }}
    >
      <a href="#main-content" className="skip-link" onClick={closeMobileMenu}>
        {t('common.skipToContent')}
      </a>
      <div className={styles.container}>
        <Link data-brand-link to={country === 'PE' ? '/' : `/?country=${encodeURIComponent(country)}`} className={styles.logo} onClick={closeMobileMenu}>
          <ThresholdMark />
          <span>{t('common.appName')}</span>
          <span className={styles.tagline}>{t('companion.identity')}</span>
        </Link>

        <div className={styles.nav}>
          {links.length > 0 && <nav aria-label={t('common.mainNavigation')} className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {links.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.label === 'companion.home'}
                    className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {t(link.label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>}

          <div className={styles.languageSelector} role="group" aria-label={t('common.language')}>
            <button
              type="button"
              className={`${styles.langButton} ${language === 'es' ? styles.active : ''}`}
              onClick={() => void i18n.changeLanguage('es')}
              aria-label="Español"
              aria-pressed={language === 'es'}
              lang="es"
            >
              ES
            </button>
            <button
              type="button"
              className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
              onClick={() => void i18n.changeLanguage('en')}
              aria-label="English"
              aria-pressed={language === 'en'}
              lang="en"
            >
              EN
            </button>
          </div>

          {links.length > 0 && <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            onClick={() => setMobileMenuOpen(open => !open)}
            aria-label={t(mobileMenuOpen ? 'common.closeMenu' : 'common.openMenu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>}
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={styles.mobileMenu}
        aria-label={t('common.mainNavigation')}
        hidden={!mobileMenuOpen}
      >
        <ul className={styles.mobileNavLinks}>
          {links.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.label === 'companion.home'}
                className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                onClick={() => {
                  closeMobileMenu();
                  if (pathname === link.to) document.getElementById('main-content')?.focus();
                }}
              >
                {t(link.label)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {showCseNavigation && <nav aria-label={t('companion.cseNavigation')} className={styles.cseNav}>
        <Link to="/opportunities/cse-peru">{t('companion.categories.family')}</Link>
        {cseLinks.map(link => <NavLink key={link.to} to={link.to}>{t(link.label)}</NavLink>)}
      </nav>}
    </header>
  );
}
