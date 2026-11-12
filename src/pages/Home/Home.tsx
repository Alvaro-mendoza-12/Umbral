import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { countries, getCountry, getAvailableProcedures } from '../../content';
import { normalizeLanguage } from '../../services/i18n';
import ThresholdMark from '../../components/common/ThresholdMark';
import Disclosure from '../../components/common/Disclosure/Disclosure';
import buttonStyles from '../../components/common/Button/Button.module.css';
import styles from './Home.module.css';

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = normalizeLanguage(i18n.resolvedLanguage);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCode = (searchParams.get('country') ?? 'PE').toUpperCase();
  const selectedCountry = getCountry(selectedCode);
  const procedures = getAvailableProcedures(selectedCode);
  const procedure = procedures[0];
  const routeLabels = t('threshold.routeLabels', { returnObjects: true }) as string[];
  const chooseCountry = (code: string) => setSearchParams({ country: code });

  return (
    <main id="main-content" className={styles.home}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroLayout}`}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>{t('home.hero.title')}</h1>
            <p className={styles.heroDescription}>{t('home.hero.description')}</p>
          </div>
          <div className={styles.entry}>
            <div className={styles.countryField}>
              <label htmlFor="country">{t('home.countryLabel')}</label>
              <select id="country" value={selectedCountry?.code ?? ''} onChange={event => chooseCountry(event.target.value)}>
                {!selectedCountry && <option value="" disabled>{t('home.chooseCountry')}</option>}
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name[lang]}{country.status === 'planned' ? ` — ${t('home.noGuidesShort')}` : ''}
                  </option>
                ))}
              </select>
            </div>
            {procedure ? (
              <div className={styles.service}>
                <div className={styles.serviceHeading}>
                  <span className={styles.doorway}><ThresholdMark /></span>
                  <div>
                    <p className={styles.serviceLabel}>{t('home.availableGuide')}</p>
                    <h2 id="available-service">{procedure.displayName[lang]}</h2>
                  </div>
                </div>
                <Link to={procedure.path} className={`${buttonStyles.button} ${styles.beginButton}`} aria-describedby="available-service">
                  {t('home.hero.cta')}<span aria-hidden="true">→</span>
                </Link>
              </div>
            ) : (
              <div className={styles.emptyCountry} role="status">
                <h2>{selectedCountry?.name[lang] ?? t('home.chooseCountry')}</h2>
                <p>{t('home.noGuides')}</p>
                <button type="button" onClick={() => chooseCountry('PE')} className={`${buttonStyles.button} ${styles.beginButton}`}>
                  {t('home.backToPeru')}
                </button>
              </div>
            )}
            <p className={styles.coverageNote}>{t('home.coverageNote')}</p>
          </div>
          <p className={styles.reassurance}>{t('threshold.reassurance')}</p>
        </div>
      </section>

      <div className={`container ${styles.supportingContent}`}>
        {procedure && (
          <Disclosure title={t('home.viewSteps')}>
            <nav aria-label={t('threshold.routeName')}>
              <ol className={styles.routeList}>
                {routeLabels.map((label, index) => (
                  <li key={index}>
                    <Link to={`/guide/${index + 1}`}>
                      <span className={styles.routeNumber}>{index + 1}</span>{label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </Disclosure>
        )}
        <Disclosure title={t('home.whatIs.title')}>
          <p>{t('home.whatIs.description')}</p>
          <p>{t('home.scopeNote')}</p>
        </Disclosure>
        {procedure && (
          <section className={styles.quickLinks}>
            <h2>{t('home.quickLinks.title')}</h2>
            <div className={styles.quickGrid}>
              <Link to="/about">{t('home.quickLinks.aboutCSE.title')}</Link>
              <Link to="/guide">{t('home.quickLinks.guide.title')}</Link>
              <Link to="/checklist">{t('home.quickLinks.checklist.title')}</Link>
              <Link to="/faq">{t('home.quickLinks.faq.title')}</Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
