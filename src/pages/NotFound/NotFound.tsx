import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import buttonStyles from '../../components/common/Button/Button.module.css';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main id="main-content" tabIndex={-1} className={styles.notFound}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2>{t('notFound.title')}</h2>
          <p>{t('notFound.message')}</p>
          <Link to="/" className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.md}`}>
            {t('notFound.backHome')}
          </Link>
        </div>
      </div>
    </main>
  );
}
