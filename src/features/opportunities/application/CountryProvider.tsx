import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { catalogCountries } from '../data/catalog';
import { CountryContext } from './countryContext';

const known = (value: unknown): value is string => typeof value === 'string' && catalogCountries.some(country => country.code === value);
export default function CountryProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useLocalStorage('umbral:discoveryCountry', 'PE', value => known(value) ? value : 'PE');
  const { search } = useLocation();
  const queryCountry = new URLSearchParams(search).get('country')?.toUpperCase();
  const country = queryCountry ?? saved;
  useEffect(() => { if (queryCountry && known(queryCountry) && queryCountry !== saved) setSaved(queryCountry); }, [queryCountry, saved, setSaved]);
  return <CountryContext.Provider value={{ country, selectCountry: value => { if (known(value)) setSaved(value); } }}>{children}</CountryContext.Provider>;
}
