import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { peCseProcedure, getCountry } from '../../content';
import { normalizeLanguage } from '../../services/i18n';
import styles from './ProcedureScope.module.css';

/** These routes show the PE/CSE package regardless of the interface language. */
export default function ProcedureScope() {
  const { i18n } = useTranslation();
  const lang = normalizeLanguage(i18n.resolvedLanguage);
  return (
    <p className={styles.scope}>
      <Link to="/cse?country=PE">{getCountry(peCseProcedure.countryCode)?.name[lang]}</Link>
      <span aria-hidden="true"> / </span>
      <span>{peCseProcedure.title[lang]}</span>
    </p>
  );
}
