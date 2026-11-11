import { createContext, useContext } from 'react';

export const CountryContext = createContext<{ country: string; selectCountry: (country: string) => void } | null>(null);
export function useDiscoveryCountry() {
  const context = useContext(CountryContext);
  if (!context) throw new Error('Discovery country provider is missing');
  return context;
}
