import { peCseProcedure } from './pe/cse';
import type { Country, ProcedurePackage } from './types';

export type {
  Country,
  ContentJurisdiction,
  ContentInstitution,
  ContentValidity,
  ProcedureRequirement,
  ProcedureStep,
  LocalGuidance,
  ProcedureTranslation,
  ProcedurePackage,
} from './types';
export { peCseProcedure };

export const countries: readonly Country[] = [
  { code: 'PE', name: { es: 'Perú', en: 'Peru' }, status: 'available', procedures: ['cse'] },
  { code: 'MX', name: { es: 'México', en: 'Mexico' }, status: 'planned', procedures: [] },
  { code: 'CO', name: { es: 'Colombia', en: 'Colombia' }, status: 'planned', procedures: [] },
  { code: 'ES', name: { es: 'España', en: 'Spain' }, status: 'planned', procedures: [] },
];

const publishedProcedures: readonly ProcedurePackage[] = [peCseProcedure];

export function getCountry(code: string): Country | undefined {
  return countries.find(country => country.code === code.trim().toUpperCase());
}

export function getAvailableProcedures(countryCode: string): ProcedurePackage[] {
  const country = getCountry(countryCode);
  if (!country || country.status !== 'available') return [];

  return publishedProcedures.filter(procedure =>
    procedure.countryCode === country.code &&
    procedure.status === 'available' &&
    procedure.validity.state === 'reviewed-as-of' &&
    country.procedures.includes(procedure.id),
  );
}

/** Unknown countries, unpublished countries and unknown procedures never fall back to PE. */
export function getProcedure(countryCode: string, procedureId: string): ProcedurePackage | undefined {
  return getAvailableProcedures(countryCode).find(procedure => procedure.id === procedureId);
}
