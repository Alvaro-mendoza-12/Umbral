import { opportunities } from '../data/catalog';
import type { CatalogFilters, Opportunity, OpportunityStatus } from './types';

function opportunityToday(opportunity: Opportunity): string {
  const timeZones: Record<string, string> = { PE: 'America/Lima', US: 'America/New_York', MX: 'America/Mexico_City', CO: 'America/Bogota', ES: 'Europe/Madrid' };
  const timeZone = opportunity.availability.timeZone ?? timeZones[opportunity.countryCode] ?? 'UTC';
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)?.value).join('-');
}
export function opportunityStatus(opportunity: Opportunity, today?: string): OpportunityStatus {
  const currentDate = opportunityToday(opportunity);
  const day = today ?? currentDate;
  if (opportunity.access?.deadlineAt && day === currentDate && Date.now() >= Date.parse(opportunity.access.deadlineAt)) return 'closed';
  if (opportunity.availability.closesOn && day > opportunity.availability.closesOn) return 'closed';
  if (opportunity.verification.reviewBy < day) return 'unconfirmed';
  if (opportunity.availability.opensOn && day < opportunity.availability.opensOn) return 'upcoming';
  return opportunity.availability.status;
}
/** A procedure without an annual call must not be presented as an ongoing service. */
export function opportunityStatusLabelKey(opportunity: Opportunity, today?: string): string {
  const status = opportunityStatus(opportunity, today);
  if (status === 'open' && opportunity.availability.lateApplications) return 'companion.lateApplications';
  return status === 'ongoing' && opportunity.kind === 'procedure'
    ? 'companion.procedureAvailable'
    : `companion.status.${status}`;
}
export function getOpportunity(id: string): Opportunity | undefined {
  return opportunities.find(opportunity => opportunity.id === id);
}
export function filterOpportunities(filters: CatalogFilters, today?: string): Opportunity[] {
  return opportunities.filter(opportunity =>
    opportunity.placement !== 'supplementary' &&
    matchesCountry(opportunity, filters.country) &&
    (!filters.region || opportunity.jurisdictionId === filters.region || opportunity.localGuidanceIds.includes(filters.region) || (filters.region === `${filters.country}-national` && opportunity.countryCode === filters.country)) &&
    (!filters.category || opportunity.category === filters.category || opportunity.secondaryCategories?.some(category => category === filters.category)) &&
    (!filters.audience || opportunity.audiences.some(audience => audience === filters.audience)) &&
    (filters.status === 'all' || (!filters.status ? ['open', 'ongoing', 'upcoming'].includes(opportunityStatus(opportunity, today)) : opportunityStatus(opportunity, today) === filters.status)),
  ).sort((left, right) => Number(right.countryCode === filters.country) - Number(left.countryCode === filters.country));
}
export function matchesCountry(opportunity: Opportunity, code: string): boolean {
  const country = code.toUpperCase();
  return opportunity.countryCode === country || Boolean(opportunity.access?.international && opportunity.access.eligibleCountries.includes(country));
}
export function canAct(opportunity: Opportunity): boolean {
  return opportunity.placement !== 'supplementary' && ['open', 'ongoing'].includes(opportunityStatus(opportunity));
}
export function formatDate(date: string, language: string): string {
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'es-PE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}
