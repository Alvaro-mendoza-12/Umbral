import type { TranslatedContent } from '../../../types';

export type CategoryId = 'education' | 'employment' | 'training' | 'enterprise' | 'technology' | 'family';
export type AudienceId = 'students' | 'jobseekers' | 'learners' | 'entrepreneurs' | 'households';
export type OpportunityStatus = 'ongoing' | 'open' | 'closed' | 'upcoming' | 'unconfirmed';
export type SupportType = 'full-scholarship' | 'partial-scholarship' | 'education-aid' | 'free-course' | 'paid-course' | 'professional-certificate' | 'seed-capital' | 'subsidy' | 'loan' | 'incubator' | 'accelerator' | 'business-training';
export interface EligibilityFacts {
  priority: TranslatedContent;
  age: TranslatedContent;
  residence: TranslatedContent;
  education: TranslatedContent;
  experience: TranslatedContent;
  restrictions: TranslatedContent;
  international: TranslatedContent;
}
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
  kind: 'scholarship' | 'service' | 'procedure' | 'job' | 'course' | 'grant' | 'loan' | 'accelerator' | 'incubator';
  placement?: 'supplementary';
  secondaryCategories?: readonly CategoryId[];
  access?: {
    eligibleCountries: readonly string[];
    international: boolean;
    location: TranslatedContent;
    eligibility: TranslatedContent;
    mode: 'onsite' | 'hybrid' | 'remote' | 'online' | 'not-published';
    benefit: TranslatedContent;
    supportType?: SupportType;
    eligibilityFacts?: EligibilityFacts;
    keyCondition?: TranslatedContent;
    publishedOn?: string;
    salary?: TranslatedContent;
    duration?: TranslatedContent;
    price?: TranslatedContent;
    certification?: TranslatedContent;
    action: 'apply' | 'enroll' | 'request' | 'procedure';
    actionUrl: string;
    actionLabel?: TranslatedContent;
    instructions: TranslatedContent;
    deadlineAt?: string;
  };
  title: TranslatedContent;
  summary: TranslatedContent;
  audienceDescription: TranslatedContent;
  requirements: readonly SourcedText[];
  conditions: readonly SourcedText[];
  steps: readonly SourcedText[];
  availability: {
    status: OpportunityStatus;
    lateApplications?: boolean;
    timeZone?: string;
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
