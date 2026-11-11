import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className={styles.notFound}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2>{t('notFound.title')}</h2>
          <p>{t('notFound.message')}</p>
          <Link to="/">
            <Button>{t('notFound.backHome')}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
