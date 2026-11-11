import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { normalizeLanguage } from '../../../services/i18n';
import { audiences, categories, jurisdictions, catalogCountries, opportunities } from '../data/catalog';
import { filterOpportunities, matchesCountry } from '../domain/catalog';
import { useDiscoveryCountry } from '../application/countryContext';
import type { CatalogFilters } from '../domain/types';
import { CountryEmpty, CountrySelect, OpportunityCard } from '../components/Shared';
import styles from '../Companion.module.css';

export default function Catalog() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const [params, setParams] = useSearchParams();
  const { country, selectCountry } = useDiscoveryCountry();
  const [filtersOpen, setFiltersOpen] = useState(() => window.matchMedia('(min-width: 1024px)').matches);
  const filters: CatalogFilters = { country, region: params.get('region') ?? '', category: params.get('category') ?? '', audience: params.get('audience') ?? '', status: params.get('status') ?? '' };
  const results = filterOpportunities(filters);
  const available = catalogCountries.some(item => item.code === filters.country);
  const complementary = opportunities.filter(item => item.placement === 'supplementary' && matchesCountry(item, country) && (!filters.category || item.category === filters.category));
  const update = (key: keyof CatalogFilters, value: string) => {
    const next = key === 'country' ? new URLSearchParams() : new URLSearchParams(params);
    if (key === 'country') selectCountry(value);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next);
  };
  const select = (key: keyof CatalogFilters, label: string, values: readonly { value: string; label: string }[]) => <div className={styles.field}>
    <label htmlFor={`filter-${key}`}>{t(label)}</label>
    <select id={`filter-${key}`} value={filters[key]} onChange={event => update(key, event.target.value)} aria-describedby={key === 'region' ? 'region-help' : undefined}>
      <option value="">{t(key === 'status' ? 'companion.availableNow' : 'companion.all')}</option>
      {filters[key] && !values.some(option => option.value === filters[key]) && <option value={filters[key]}>{t('companion.noResults')}</option>}
      {values.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </div>;
  return <main id="main-content" className={styles.page}>
    <div className={styles.container}>
      <h1>{filters.category && categories.some(category => category === filters.category) ? t(`companion.categories.${filters.category}`) : t('companion.discover')}</h1>
      <p className={styles.catalogHint}>{t('companion.catalogIntro')}</p>
      <div className={styles.catalogCountry}><CountrySelect value={filters.country} onChange={value => update('country', value)} /><p className={styles.small}>{t('companion.clearCountryFilters')}</p></div>
      <div className={`${styles.catalogLayout} ${!available ? styles.noCountryLayout : ''}`}>
        {available && <details className={styles.filters} open={filtersOpen} onToggle={event => setFiltersOpen(event.currentTarget.open)}>
          <summary>{t('companion.filters')}</summary>
          {available && <>
            {select('region', 'companion.region', jurisdictions.filter(region => region.countryCode === country).map(region => ({ value: region.id, label: region.name[language] })))}
            {select('category', 'companion.category', categories.map(category => ({ value: category, label: t(`companion.categories.${category}`) })))}
            {select('audience', 'companion.audience', audiences.map(audience => ({ value: audience, label: t(`companion.audiences.${audience}`) })))}
            {select('status', 'companion.callStatus', ['open', 'ongoing', 'closed', 'upcoming', 'unconfirmed', 'all'].map(status => ({ value: status, label: status === 'all' ? t('companion.includeClosed') : t(`companion.status.${status}`) })))}
            <button type="button" className={styles.secondary} onClick={() => setParams({ country: filters.country })}>{t('companion.resetFilters')}</button>
            <p id="region-help" className={styles.small}>{t('companion.regionHelp')}</p>
          </>}
        </details>}
        <section aria-label={t('companion.discover')}>
          {available ? <>
            <p className={styles.resultCount} role="status" aria-live="polite">{t('companion.resultCount', { count: results.length })}</p>
            <p className={styles.small}>{t('companion.countryMeaning')}</p>
            {results.length ? <div className={styles.cardGrid}>{results.map(opportunity => <OpportunityCard key={opportunity.id} opportunity={opportunity} />)}</div> : <div className={styles.empty}><p>{t('companion.noResults')}</p></div>}
          </> : <CountryEmpty onReturn={() => setParams({ country: 'PE' })} />}
        </section>
      </div>
      {available && complementary.length > 0 && <details className={styles.complementary}><summary>{t('companion.complementary')}</summary><p>{t('companion.complementaryNote')}</p><ul>{complementary.map(item => <li key={item.id}><a href={item.officialUrl}>{item.title[language]}</a></li>)}</ul></details>}
      <p className={styles.footnote}>{t('companion.coverage')}</p>
      <p className={styles.small}>{t('companion.catalogReview')}</p>
    </div>
  </main>;
}
