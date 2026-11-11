import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';

const navigationLinks = [
  { to: '/about', label: 'common.about' },
  { to: '/guide', label: 'common.guide' },
  { to: '/checklist', label: 'common.checklist' },
  { to: '/resources', label: 'common.resources' },
  { to: '/faq', label: 'common.faq' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const language = i18n.resolvedLanguage ?? i18n.language;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (!desktop.matches) return;
      const focused = document.activeElement;
      if (focused === menuButtonRef.current || document.getElementById('mobile-navigation')?.contains(focused)) {
        headerRef.current?.querySelector<HTMLAnchorElement>('a[href="/"]')?.focus();
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
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          <span>{t('common.appName')}</span>
          <span className={styles.tagline}>{t('common.tagline')}</span>
        </Link>

        <div className={styles.nav}>
          <nav aria-label={t('common.mainNavigation')} className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {navigationLinks.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {t(link.label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

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

          <button
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
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={styles.mobileMenu}
        aria-label={t('common.mainNavigation')}
        hidden={!mobileMenuOpen}
      >
        <ul className={styles.mobileNavLinks}>
          {navigationLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
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
    </header>
  );
}
