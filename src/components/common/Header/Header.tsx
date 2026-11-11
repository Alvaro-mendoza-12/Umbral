import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <a href="#main-content" className="skip-link">
        {t('common.start')}
      </a>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          <span>{t('common.appName')}</span>
          <span className={styles.tagline}>{t('common.tagline')}</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navLinks}>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {t('common.about')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/guide"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {t('common.guide')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/checklist"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {t('common.checklist')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {t('common.resources')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {t('common.faq')}
              </NavLink>
            </li>
          </ul>

          <div className={styles.languageSelector} role="group" aria-label={t('common.language')}>
            <button
              className={`${styles.langButton} ${i18n.language === 'es' ? styles.active : ''}`}
              onClick={() => changeLanguage('es')}
              aria-label="Español"
            >
              ES
            </button>
            <button
              className={`${styles.langButton} ${i18n.language === 'en' ? styles.active : ''}`}
              onClick={() => changeLanguage('en')}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <button
            className={styles.menuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        </nav>
      </div>

      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
              }
              onClick={closeMobileMenu}
            >
              {t('common.about')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/guide"
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
              }
              onClick={closeMobileMenu}
            >
              {t('common.guide')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/checklist"
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
              }
              onClick={closeMobileMenu}
            >
              {t('common.checklist')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
              }
              onClick={closeMobileMenu}
            >
              {t('common.resources')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
              }
              onClick={closeMobileMenu}
            >
              {t('common.faq')}
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
