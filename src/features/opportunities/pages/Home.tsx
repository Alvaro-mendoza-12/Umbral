import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCountry } from '../../../content';
import ThresholdMark from '../../../components/common/ThresholdMark';
import { categories } from '../data/peru';
import { CountryEmpty, CountrySelect } from '../components/Shared';
import styles from '../Companion.module.css';

const iconPaths = {
  education: 'M3 5h7l2 2 2-2h7v15h-7l-2 2-2-2H3z M12 7v15',
  employment: 'M3 7h18v14H3z M8 7V3h8v4 M3 12h18 M10 12v3h4v-3',
  training: 'm12 3 9 5-9 5-9-5z M6 10v6c3 3 9 3 12 0v-6 M21 8v9',
  enterprise: 'M4 21V8l8-5 8 5v13 M8 21v-6h8v6 M8 8h.01 M16 8h.01 M8 11h.01 M16 11h.01',
  family: 'm3 11 9-8 9 8 M5 10v11h14V10 M9 21v-7h6v7',
};
export default function OpportunityHome() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const country = (params.get('country') ?? 'PE').toUpperCase();
  const available = getCountry(country)?.status === 'available';
  return <main id="main-content">
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroIntro}><ThresholdMark /><p>{t('companion.identity')}</p></div>
        <h1>{t('companion.question')}</h1>
        <p className={styles.lead}>{t('companion.intro')}</p>
        <div className={styles.homeCountry}><CountrySelect value={country} onChange={value => setParams({ country: value })} /></div>
        {available ? <nav aria-label={t('companion.question')} className={styles.goals}>
          {categories.map(category => <Link key={category} className={styles.goal} to={`/discover?country=${country}&category=${category}`}>
            <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"><path d={iconPaths[category]} /></svg>
            <span className={styles.goalTitle}>{t(`companion.goals.${category}`)}</span>
            <span className={styles.goalDescription}>{t(`companion.goalDescriptions.${category}`)}</span>
          </Link>)}
        </nav> : <CountryEmpty onReturn={() => setParams({ country: 'PE' })} />}
      </div>
    </section>
    <div className={`${styles.container} ${styles.homeSupport}`}>
      <p className={styles.coverage}>{t('companion.coverage')}</p>
      {available && <Link className={styles.primary} to={`/discover?country=${country}`}>{t('companion.allOpportunities')}</Link>}
      <section className={styles.how}><h2>{t('companion.howTitle')}</h2><p>{t('companion.howText')}</p><Link to="/my-route">{t('companion.goRoute')}</Link></section>
      <p className={styles.motto}>{t('companion.motto')}</p>
      <p className={styles.small}>{t('companion.privacy')}</p>
    </div>
  </main>;
}
