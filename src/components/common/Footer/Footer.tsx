import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useOnlineStatus from '../../../hooks/useOnlineStatus';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const isOnline = useOnlineStatus();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.appName}>{t('common.appName')}</h3>
            <p className={styles.tagline}>{t('companion.footer')}</p>
            <p className={styles.privacy}>{t('companion.privacy')}</p>
          </div>

          <div className={styles.links}>
            <h4>{t('companion.cseNavigation')}</h4>
            <ul>
              <li>
                <Link to="/about">{t('footer.links.about')}</Link>
              </li>
              <li>
                <Link to="/resources">{t('footer.links.resources')}</Link>
              </li>
              <li>
                <Link to="/faq">{t('footer.links.faq')}</Link>
              </li>
            </ul>
          </div>

          <div className={styles.status}>
            <div className={styles.statusIndicator}>
              <span
                className={`${styles.dot} ${isOnline ? styles.online : styles.offline}`}
                aria-hidden="true"
              />
              <span>
                {isOnline
                  ? t('footer.status.online')
                  : t('footer.status.offline')}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.credits}>{t('footer.credits')}</p>
          <p className={styles.disclaimer}>{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
