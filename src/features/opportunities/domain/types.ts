import type { TranslatedContent } from '../../../types';

export type CategoryId = 'education' | 'employment' | 'training' | 'enterprise' | 'family';
export type AudienceId = 'students' | 'jobseekers' | 'learners' | 'entrepreneurs' | 'households';
export type OpportunityStatus = 'ongoing' | 'open' | 'closed' | 'upcoming' | 'unconfirmed';
export interface OpportunitySource {
  id: string;
  title: TranslatedContent;
  url: string;
  institutionId: string;
  consultedAt: string;
}
export interface SourcedText {
  id: string;
  text: TranslatedContent;
  sourceIds: readonly string[];
}
export interface Opportunity {
  id: string;
  countryCode: string;
  jurisdictionId: string;
  localGuidanceIds: readonly string[];
  institutionId: string;
  category: CategoryId;
  audiences: readonly AudienceId[];
  kind: 'scholarship' | 'service' | 'procedure';
  title: TranslatedContent;
  summary: TranslatedContent;
  audienceDescription: TranslatedContent;
  requirements: readonly SourcedText[];
  conditions: readonly SourcedText[];
  steps: readonly SourcedText[];
  availability: {
    status: OpportunityStatus;
    description: TranslatedContent;
    opensOn?: string;
    closesOn?: string;
    dates: readonly { date: string; label: TranslatedContent; sourceId: string }[];
  };
  sourceIds: readonly string[];
  officialUrl: string;
  verification: { status: 'documentary'; checkedAt: string; reviewBy: string };
  guidePath?: string;
}
export interface CatalogFilters {
  country: string;
  region: string;
  category: string;
  audience: string;
  status: string;
}
export interface PersonalTask { id: string; title: string; completed: boolean }
export interface RouteEntry { completedStepIds: string[]; tasks: PersonalTask[] }
export interface MyRoute { version: 1; entries: Record<string, RouteEntry> }
