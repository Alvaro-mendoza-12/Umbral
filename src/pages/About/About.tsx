import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import buttonStyles from '../../components/common/Button/Button.module.css';
import Card from '../../components/common/Card';
import Disclosure from '../../components/common/Disclosure/Disclosure';
import styles from './About.module.css';
import ProcedureScope from '../../components/common/ProcedureScope';

export default function About() {
  const { t } = useTranslation();

  const examples = t('about.purpose.examples', { returnObjects: true }) as string[];
  const requirements = t('about.whoCanApply.requirements', { returnObjects: true }) as string[];
  const notes = t('about.important.notes', { returnObjects: true }) as string[];

  return (
    <main id="main-content" className={styles.about}>
      <div className="container">
        <ProcedureScope />
        <h1>{t('about.title')}</h1>

        {/* Definition */}
        <section className={styles.section}>
          <Card>
            <h2>{t('about.definition.title')}</h2>
            <p className={styles.content}>{t('about.definition.content')}</p>
          </Card>
        </section>

        <p className={styles.notice}>{notes[0]}</p>

        <div className={styles.cta}>
          <Link to="/guide" className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.lg}`}>
            {t('about.cta')}
          </Link>
        </div>

        <div className={styles.detailsList}>
          <Disclosure title={t('about.purpose.title')} headingLevel={2}>
            <p className={styles.content}>{t('about.purpose.content')}</p>
            <h3>{t('about.purpose.examplesTitle')}</h3>
            <ul className={styles.list}>
              {examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </Disclosure>

          <Disclosure title={t('about.whoCanApply.title')} headingLevel={2}>
            <p className={styles.content}>{t('about.whoCanApply.content')}</p>
            <ul className={styles.list}>
              {requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </Disclosure>

          <Disclosure title={t('about.important.title')} headingLevel={2}>
            <ul className={styles.importantList}>
              {notes.slice(1).map((note, index) => (
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
          </Disclosure>
        </div>
      </div>
    </main>
  );
}
