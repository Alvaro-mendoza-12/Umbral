import { opportunities } from '../data/catalog';
import type { CatalogFilters, Opportunity, OpportunityStatus } from './types';

export function peruToday(): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)?.value).join('-');
}
export function opportunityStatus(opportunity: Opportunity, today = peruToday()): OpportunityStatus {
  if (opportunity.access?.deadlineAt && today === peruToday() && Date.now() > Date.parse(opportunity.access.deadlineAt)) return 'closed';
  if (opportunity.availability.closesOn && today > opportunity.availability.closesOn) return 'closed';
  if (opportunity.verification.reviewBy < today) return 'unconfirmed';
  if (opportunity.availability.opensOn && today < opportunity.availability.opensOn) return 'upcoming';
  return opportunity.availability.status;
}
/** A procedure without an annual call must not be presented as an ongoing service. */
export function opportunityStatusLabelKey(opportunity: Opportunity, today = peruToday()): string {
  const status = opportunityStatus(opportunity, today);
  return status === 'ongoing' && opportunity.kind !== 'service'
    ? `companion.kinds.${opportunity.kind}`
    : `companion.status.${status}`;
}
export function getOpportunity(id: string): Opportunity | undefined {
  return opportunities.find(opportunity => opportunity.id === id);
}
export function filterOpportunities(filters: CatalogFilters, today = peruToday()): Opportunity[] {
  return opportunities.filter(opportunity =>
    opportunity.placement !== 'supplementary' &&
    matchesCountry(opportunity, filters.country) &&
    (!filters.region || opportunity.jurisdictionId === filters.region || opportunity.localGuidanceIds.includes(filters.region) || (filters.region === `${filters.country}-national` && opportunity.countryCode === filters.country)) &&
    (!filters.category || opportunity.category === filters.category || opportunity.secondaryCategories?.some(category => category === filters.category)) &&
    (!filters.audience || opportunity.audiences.some(audience => audience === filters.audience)) &&
    (filters.status === 'all' || (!filters.status ? ['open', 'ongoing', 'upcoming'].includes(opportunityStatus(opportunity, today)) : opportunityStatus(opportunity, today) === filters.status)),
  );
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
