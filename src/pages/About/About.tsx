import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import styles from './About.module.css';

export default function About() {
  const { t } = useTranslation();

  const examples = t('about.purpose.examples', { returnObjects: true }) as string[];
  const requirements = t('about.whoCanApply.requirements', { returnObjects: true }) as string[];
  const notes = t('about.important.notes', { returnObjects: true }) as string[];

  return (
    <main id="main-content" className={styles.about}>
      <div className="container">
        <h1>{t('about.title')}</h1>

        {/* Definition */}
        <section className={styles.section}>
          <Card>
            <h2>{t('about.definition.title')}</h2>
            <p className={styles.content}>{t('about.definition.content')}</p>
          </Card>
        </section>

        {/* Purpose */}
        <section className={styles.section}>
          <Card>
            <h2>{t('about.purpose.title')}</h2>
            <p className={styles.content}>{t('about.purpose.content')}</p>
            <h3>{t('about.purpose.title')}</h3>
            <ul className={styles.list}>
              {examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Who can apply */}
        <section className={styles.section}>
          <Card>
            <h2>{t('about.whoCanApply.title')}</h2>
            <p className={styles.content}>{t('about.whoCanApply.content')}</p>
            <ul className={styles.list}>
              {requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Important */}
        <section className={styles.section}>
          <Card variant="highlighted">
            <h2>{t('about.important.title')}</h2>
            <ul className={styles.importantList}>
              {notes.map((note, index) => (
                <li key={index} className={styles.importantItem}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <div className={styles.cta}>
          <Link to="/guide">
            <Button size="lg">{t('about.cta')}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
