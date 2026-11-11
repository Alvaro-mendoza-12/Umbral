import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizeLanguage } from '../../../services/i18n';
import { getOpportunity, formatDate, canAct } from '../domain/catalog';
import { catalogCountries, institutions, sources } from '../data/catalog';
import { useMyRoute } from '../application/routeContext';
import { useDiscoveryCountry } from '../application/countryContext';
import { OpportunityDates, StatusBadge } from '../components/Shared';
import type { SourcedText } from '../domain/types';
import styles from '../Companion.module.css';

export default function Detail() {
  const { id = '' } = useParams();
  const opportunity = getOpportunity(id);
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const { route, save, available } = useMyRoute();
  const { country } = useDiscoveryCountry();
  if (!opportunity) return <main id="main-content" className={styles.page}><div className={styles.container}><h1>{t('companion.notFound')}</h1><p>{t('companion.notFoundText')}</p><Link className={styles.primary} to="/discover">{t('companion.backCatalog')}</Link></div></main>;
  const saved = Boolean(route.entries[id]);
  const access = opportunity.access;
  const list = (items: readonly SourcedText[]) => <ul>{items.map(item => <li key={item.id}>{item.text[language]}</li>)}</ul>;
  const label = access?.actionLabel?.[language] ?? t('companion.actions.' + (access?.action === 'apply' && opportunity.kind === 'job' ? 'job' : access?.action ?? 'procedure'));
  const countryName = catalogCountries.find(item => item.code === opportunity.countryCode)?.name[language] ?? opportunity.countryCode;
  return <main id="main-content" className={styles.page}>
    <div className={styles.container}>
      <Link to={'/discover?country=' + country + '&category=' + opportunity.category}>{t('companion.backCatalog')}</Link>
      <div className={styles.detailLayout}>
        <div className={styles.detailMain}>
          <div className={styles.cardMeta}><span>{countryName} · {t('companion.kinds.' + opportunity.kind)}</span><StatusBadge opportunity={opportunity} /></div>
          <h1>{opportunity.title[language]}</h1>
          <p className={styles.provider}>{institutions.find(item => item.id === opportunity.institutionId)?.name[language]}</p>
          <p className={styles.detailBenefit}>{access?.benefit[language] ?? opportunity.summary[language]}</p>
          <p className={styles.audiencePreview}><strong>{t('companion.forWhom')}: </strong>{opportunity.audienceDescription[language]}</p>
        </div>
        <aside className={styles.accessPanel} aria-label={t('companion.nextStep')}>
          <h2>{t('companion.nextStep')}</h2>
          <p className={styles.deadline}>{opportunity.availability.closesOn ? t('companion.closes') + ': ' + formatDate(opportunity.availability.closesOn, language) : t('companion.noFixedDeadline')}</p>
          {access?.deadlineAt && <p className={styles.small}>{opportunity.availability.description[language]}</p>}
          {canAct(opportunity) && access ? <a className={styles.primary} data-official-action href={access.actionUrl} target="_blank" rel="noopener noreferrer">{label}<span className="sr-only"> · {t('companion.newTab')}</span></a> : <p className={styles.notice}>{t('companion.notAvailable')}</p>}
          <p className={styles.actionHelp}>{access?.instructions[language] ?? t('companion.externalNote')}</p>
          {saved ? <><p role="status" className={styles.saved}>{t('companion.saved')}</p><Link className={styles.secondary} to="/my-route">{t('companion.goRoute')}</Link></> : <button type="button" className={styles.secondary} onClick={() => save(id)}>{t('companion.save')}</button>}
          <p className={styles.small}>{t('companion.saveExplainer')}</p>
          {!available && <p role="status" className={styles.notice}>{t('companion.storageUnavailable')}</p>}
          <a className={styles.sourceInline} href={opportunity.officialUrl} target="_blank" rel="noopener noreferrer">{t('companion.sourceOfficial')}</a>
          <p className={styles.small}>{t('companion.reviewed', { date: formatDate(opportunity.verification.checkedAt, language) })}</p>
        </aside>
      <div className={styles.detailSections}>
          {access && <dl className={styles.facts}>
            <div><dt>{t('companion.location')}</dt><dd>{access.location[language]}</dd></div>
            <div><dt>{t('companion.mode')}</dt><dd>{t('companion.modes.' + access.mode)}</dd></div>
            {access.salary && <div><dt>{t('companion.salary')}</dt><dd>{access.salary[language]}</dd></div>}
            {access.duration && <div><dt>{t('companion.duration')}</dt><dd>{access.duration[language]}</dd></div>}
            {access.price && <div><dt>{t('companion.price')}</dt><dd>{access.price[language]}</dd></div>}
            {opportunity.kind === 'job' && <div><dt>{t('companion.published')}</dt><dd>{access.publishedOn ? formatDate(access.publishedOn, language) : t('companion.notPublished')}</dd></div>}
          </dl>}
          <section className={styles.eligibility}><h2>{t('companion.forWhom')}</h2><p>{opportunity.audienceDescription[language]}</p></section>
        <details className={styles.disclosure}><summary>{t('companion.requirements')}</summary>{list(opportunity.requirements)}</details>
        <details className={styles.disclosure}><summary>{t('companion.conditions')}</summary>{list(opportunity.conditions)}</details>
        <details className={styles.disclosure}><summary>{t('companion.steps')}</summary><ol>{opportunity.steps.map(step => <li key={step.id}>{step.text[language]}</li>)}</ol>{access?.certification && <p>{access.certification[language]}</p>}</details>
        <details className={styles.disclosure}><summary>{t('companion.availability')}</summary><OpportunityDates opportunity={opportunity} /></details>
        {opportunity.guidePath && <p><Link className={styles.secondary} to={opportunity.guidePath}>{t('companion.cseGuide')}</Link></p>}
        <details className={styles.disclosure}><summary>{t('companion.sources')}</summary><p className={styles.small}>{t('companion.documentaryNote')}</p><ul>{opportunity.sourceIds.map(sourceId => sources.find(source => source.id === sourceId)).map(source => source && <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title[language]}</a><span className={styles.sourceDate}>{t('companion.sourceConsulted', { date: formatDate(source.consultedAt, language) })}</span></li>)}</ul></details>
        <p className={styles.small}>{t('companion.disclaimer')}</p>
      </div>
      </div>
    </div>
  </main>;
}
