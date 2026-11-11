import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizeLanguage } from '../../../services/i18n';
import { getOpportunity, formatDate } from '../domain/catalog';
import { institutions, sources } from '../data/peru';
import { useMyRoute } from '../application/routeContext';
import { OpportunityDates, StatusBadge } from '../components/Shared';
import type { SourcedText } from '../domain/types';
import styles from '../Companion.module.css';

export default function Detail() {
  const { id = '' } = useParams();
  const opportunity = getOpportunity(id);
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const { route, save, available } = useMyRoute();
  if (!opportunity) return <main id="main-content" className={styles.page}><div className={styles.container}><h1>{t('companion.notFound')}</h1><p>{t('companion.notFoundText')}</p><Link className={styles.primary} to="/discover">{t('companion.backCatalog')}</Link></div></main>;
  const saved = Boolean(route.entries[id]);
  const list = (items: readonly SourcedText[]) => <ul>{items.map(item => <li key={item.id}>{item.text[language]}</li>)}</ul>;
  return <main id="main-content" className={styles.page}>
    <div className={`${styles.container} ${styles.detail}`}>
      <Link to={`/discover?country=${opportunity.countryCode}&category=${opportunity.category}`}>{t('companion.backCatalog')}</Link>
      <div className={styles.cardMeta}><span>{t(`companion.categories.${opportunity.category}`)} · Perú</span><StatusBadge opportunity={opportunity} /></div>
      <h1>{opportunity.title[language]}</h1>
      <p className={styles.kind}>{t(`companion.kinds.${opportunity.kind}`)}</p>
      <p className={styles.lead}>{opportunity.summary[language]}</p>
      <div className={styles.savePanel}>
        {saved ? <><p role="status" className={styles.saved}>{t('companion.saved')}</p><Link className={styles.primary} to="/my-route">{t('companion.goRoute')}</Link></> : <button type="button" className={styles.primary} onClick={() => save(id)}>{t('companion.save')}</button>}
        <p className={styles.small}>{t('companion.saveExplainer')}</p>
        {!available && <p role="status" className={styles.notice}>{t('companion.storageUnavailable')}</p>}
      </div>
      <section><h2>{t('companion.provider')}</h2><p>{institutions.find(institution => institution.id === opportunity.institutionId)?.name[language]}</p><h2>{t('companion.forWhom')}</h2><p>{opportunity.audienceDescription[language]}</p></section>
      <section><h2>{t('companion.requirements')}</h2>{list(opportunity.requirements)}</section>
      <details className={styles.disclosure} open><summary>{t('companion.conditions')}</summary>{list(opportunity.conditions)}</details>
      <section><h2>{t('companion.availability')}</h2><OpportunityDates opportunity={opportunity} /></section>
      <details className={styles.disclosure}><summary>{t('companion.steps')}</summary><ol>{opportunity.steps.map(step => <li key={step.id}>{step.text[language]}</li>)}</ol></details>
      {opportunity.guidePath && <p><Link className={styles.secondary} to={opportunity.guidePath}>{t('companion.cseGuide')}</Link></p>}
      <section className={styles.officialPanel}><h2>{t('companion.official')}</h2><p>{t('companion.externalNote')}</p><a className={styles.secondary} href={opportunity.officialUrl} rel="noreferrer">{t('companion.official')}</a></section>
      <section aria-labelledby="official-sources"><h2 id="official-sources">{t('companion.sources')}</h2><p>{t('companion.reviewed', { date: formatDate(opportunity.verification.checkedAt, language) })}</p><p className={styles.small}>{t('companion.documentaryNote')}</p>
        <ul>{opportunity.sourceIds.map(sourceId => sources.find(source => source.id === sourceId)).map(source => source && <li key={source.id}><a href={source.url} rel="noreferrer">{source.title[language]}</a><span className={styles.sourceDate}>{t('companion.sourceConsulted', { date: formatDate(source.consultedAt, language) })}</span></li>)}</ul>
      </section>
      <p className={styles.notice}>{t('companion.disclaimer')}</p>
    </div>
  </main>;
}
