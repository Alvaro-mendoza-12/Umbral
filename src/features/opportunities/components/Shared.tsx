import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { countries } from '../../../content';
import { normalizeLanguage } from '../../../services/i18n';
import { institutions } from '../data/peru';
import { formatDate, opportunityStatus, opportunityStatusLabelKey } from '../domain/catalog';
import type { Opportunity } from '../domain/types';
import { useMyRoute } from '../application/routeContext';
import styles from '../Companion.module.css';

export function CountrySelect({ value, onChange, id = 'opportunity-country' }: { value: string; onChange: (value: string) => void; id?: string }) {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  return <div className={styles.field}>
    <label htmlFor={id}>{t('companion.country')}</label>
    <select id={id} value={countries.some(country => country.code === value) ? value : ''} onChange={event => onChange(event.target.value)}>
      {!countries.some(country => country.code === value) && <option value="" disabled>{t('home.chooseCountry')}</option>}
      {countries.map(country => <option key={country.code} value={country.code}>{country.name[language]}{country.status === 'planned' ? ` — ${t('companion.countryPlanned')}` : ''}</option>)}
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
  return <article className={styles.card}>
    <div className={styles.cardMeta}><span>{t(`companion.categories.${opportunity.category}`)}</span><StatusBadge opportunity={opportunity} /></div>
    <h2><Link to={`/opportunities/${opportunity.id}`}>{opportunity.title[language]}</Link></h2>
    <p>{opportunity.summary[language]}</p>
    <p className={styles.muted}>{institutions.find(institution => institution.id === opportunity.institutionId)?.name[language]}</p>
    <p className={styles.small}>{t('companion.reviewed', { date: formatDate(opportunity.verification.checkedAt, language) })}</p>
    {route.entries[opportunity.id] && <p className={styles.saved}>{t('companion.saved')}</p>}
    <Link className={styles.cardAction} to={`/opportunities/${opportunity.id}`} aria-label={`${t('companion.details')}: ${opportunity.title[language]}`}>{t('companion.details')}<span aria-hidden="true">→</span></Link>
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
