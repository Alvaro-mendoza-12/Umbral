import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import buttonStyles from '../../components/common/Button/Button.module.css';
import Card from '../../components/common/Card';
import styles from './Home.module.css';

export default function Home() {
  const { t } = useTranslation();

  const features = t('home.whatIs.features', { returnObjects: true }) as string[];
  const routeLabels = t('threshold.routeLabels', { returnObjects: true }) as string[];
  const reasons = t('home.whyUse.reasons', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <main id="main-content" className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroLayout}`}>
          <div className={styles.heroCopy}>
            <p className={styles.orientation}>{t('threshold.invitation')}</p>
            <h1 className={styles.heroTitle}>{t('home.hero.title')}</h1>
            <p className={styles.heroDescription}>{t('home.hero.description')}</p>
            <Link to="/guide" className={`${buttonStyles.button} ${buttonStyles.lg} ${styles.beginButton}`}>
              {t('home.hero.cta')}
              <span aria-hidden="true">→</span>
            </Link>
            <p className={styles.reassurance}>{t('threshold.reassurance')}</p>
          </div>
          <nav className={styles.gateway} aria-label={t('threshold.routeName')}>
            <p className={styles.gatewayTitle}>{t('threshold.routeTitle')}</p>
            <ol className={styles.gatewayList}>
              {routeLabels.map((label, index) => (
                <li key={index}>
                  <Link to={`/guide/${index + 1}`} className={styles.gatewayLink}>
                    <span className={styles.gatewayNumber}>{index + 1}</span>
                    <span>{label}</span>
                    <span className={styles.gatewayArrow} aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className={styles.gatewayNote}>{t('threshold.routeNote')}</p>
          </nav>
        </div>
      </section>

      <div className="container">
        {/* What is UMBRAL */}
        <section className={styles.section}>
          <h2>{t('home.whatIs.title')}</h2>
          <p className={styles.description}>{t('home.whatIs.description')}</p>
          <ul className={styles.featuresList}>
            {features.map((feature, index) => (
              <li key={index} className={styles.feature}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why use UMBRAL */}
        <section className={styles.section}>
          <h2>{t('home.whyUse.title')}</h2>
          <div className={styles.reasonsGrid}>
            {reasons.map((reason, index) => (
              <Card key={index}>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonDescription}>{reason.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className={styles.section}>
          <h2>{t('home.quickLinks.title')}</h2>
          <div className={styles.quickGrid}>
            <Link to="/about" className={styles.quickLinkCard}>
              <Card variant="interactive">
                <h3>{t('home.quickLinks.aboutCSE.title')}</h3>
                <p className={styles.linkDescription}>
                  {t('home.quickLinks.aboutCSE.description')}
                </p>
              </Card>
            </Link>

            <Link to="/guide" className={styles.quickLinkCard}>
              <Card variant="interactive">
                <h3>{t('home.quickLinks.guide.title')}</h3>
                <p className={styles.linkDescription}>
                  {t('home.quickLinks.guide.description')}
                </p>
              </Card>
            </Link>

            <Link to="/checklist" className={styles.quickLinkCard}>
              <Card variant="interactive">
                <h3>{t('home.quickLinks.checklist.title')}</h3>
                <p className={styles.linkDescription}>
                  {t('home.quickLinks.checklist.description')}
                </p>
              </Card>
            </Link>

            <Link to="/faq" className={styles.quickLinkCard}>
              <Card variant="interactive">
                <h3>{t('home.quickLinks.faq.title')}</h3>
                <p className={styles.linkDescription}>
                  {t('home.quickLinks.faq.description')}
                </p>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
