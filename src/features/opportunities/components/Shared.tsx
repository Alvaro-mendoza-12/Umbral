import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { normalizeLanguage } from '../../../services/i18n';
import { institutions, catalogCountries } from '../data/catalog';
import { formatDate, opportunityStatus, opportunityStatusLabelKey } from '../domain/catalog';
import type { Opportunity } from '../domain/types';
import { useMyRoute } from '../application/routeContext';
import styles from '../Companion.module.css';

export function CountrySelect({ value, onChange, id = 'opportunity-country' }: { value: string; onChange: (value: string) => void; id?: string }) {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  return <div className={styles.field}>
    <label htmlFor={id}>{t('companion.country')}</label>
    <select id={id} value={catalogCountries.some(country => country.code === value) ? value : ''} onChange={event => onChange(event.target.value)}>
      {!catalogCountries.some(country => country.code === value) && <option value="" disabled>{t('home.chooseCountry')}</option>}
      {catalogCountries.map(country => <option key={country.code} value={country.code}>{country.name[language]}</option>)}
    </select>
  </div>;
}
export function CountryEmpty({ onReturn }: { onReturn: () => void }) {
  const { t } = useTranslation();
  return <section className={styles.empty} aria-label={t('companion.country')}>
    <p role="status">{t('companion.noCountry')}</p>
    <button type="button" className={styles.primary} onClick={onReturn}>{t('companion.returnPeru')}</button>
  </section>;
}
export function StatusBadge({ opportunity }: { opportunity: Opportunity }) {
  const { t } = useTranslation();
  const status = opportunityStatus(opportunity);
  return <span className={`${styles.badge} ${status === 'closed' || status === 'unconfirmed' ? styles.caution : ''}`}>{t(opportunityStatusLabelKey(opportunity))}</span>;
}
export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const { route } = useMyRoute();
  const access = opportunity.access;
  return <article className={styles.card}>
    <div className={styles.cardMeta}><span>{t(access?.supportType ? `companion.supportTypes.${access.supportType}` : `companion.kinds.${opportunity.kind}`)}</span><StatusBadge opportunity={opportunity} /></div>
    <h2><Link to={`/opportunities/${opportunity.id}`}>{opportunity.title[language]}</Link></h2>
    <p className={styles.muted}>{institutions.find(institution => institution.id === opportunity.institutionId)?.name[language]}</p>
    {access && <p className={styles.location}>{access.location[language]} · {t(`companion.modes.${access.mode}`)}</p>}
    <p className={styles.offer}>{access?.salary?.[language] ?? access?.benefit[language] ?? opportunity.summary[language]}</p>
    <p className={styles.cardRequirement}><strong>{t('companion.keyRequirement')}: </strong>{access?.eligibilityFacts?.priority[language] ?? opportunity.audienceDescription[language]}</p>
    <div className={styles.cardFacts}>
      {access?.duration && <span>{access.duration[language]}</span>}
      {access?.price && <span>{access.price[language]}</span>}
      <span>{opportunity.availability.closesOn ? `${t('companion.closes')}: ${formatDate(opportunity.availability.closesOn, language)}` : t('companion.noFixedDeadline')}</span>
    </div>
    {route.entries[opportunity.id] && <p className={styles.saved}>{t('companion.saved')}</p>}
    <Link className={styles.cardAction} to={`/opportunities/${opportunity.id}`} aria-label={`${t('companion.details')}: ${opportunity.title[language]}`}>{t('companion.details')}<span aria-hidden="true">→</span></Link>
    <span className={styles.checked}>{t('companion.checkedShort', { date: formatDate(opportunity.verification.checkedAt, language) })}</span>
  </article>;
}
export function OpportunityDates({ opportunity }: { opportunity: Opportunity }) {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  return <>
    <p>{opportunity.availability.description[language]}</p>
    {opportunity.availability.dates.length > 0 ? <ul className={styles.dates}>
      {opportunity.availability.dates.map(({ date, label }) => <li key={`${date}-${label.es}`}><time dateTime={date}>{formatDate(date, language)}</time><span>{label[language]}</span></li>)}
    </ul> : <p className={styles.muted}>{t('companion.noDeadline')}</p>}
    {opportunityStatus(opportunity) === 'unconfirmed' && <p className={styles.notice}>{t('companion.stale')}</p>}
  </>;
}
