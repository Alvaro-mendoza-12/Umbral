import { opportunities } from '../data/peru';
import type { CatalogFilters, Opportunity, OpportunityStatus } from './types';

export function peruToday(): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)?.value).join('-');
}
export function opportunityStatus(opportunity: Opportunity, today = peruToday()): OpportunityStatus {
  if (opportunity.availability.closesOn && today > opportunity.availability.closesOn) return 'closed';
  if (opportunity.verification.reviewBy < today) return 'unconfirmed';
  if (opportunity.availability.opensOn && today < opportunity.availability.opensOn) return 'upcoming';
  return opportunity.availability.status;
}
export function getOpportunity(id: string): Opportunity | undefined {
  return opportunities.find(opportunity => opportunity.id === id);
}
export function filterOpportunities(filters: CatalogFilters, today = peruToday()): Opportunity[] {
  return opportunities.filter(opportunity =>
    opportunity.countryCode === filters.country.toUpperCase() &&
    (!filters.region || opportunity.jurisdictionId === filters.region || opportunity.localGuidanceIds.includes(filters.region)) &&
    (!filters.category || opportunity.category === filters.category) &&
    (!filters.audience || opportunity.audiences.some(audience => audience === filters.audience)) &&
    (!filters.status || opportunityStatus(opportunity, today) === filters.status),
  );
}
export function formatDate(date: string, language: string): string {
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'es-PE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}
