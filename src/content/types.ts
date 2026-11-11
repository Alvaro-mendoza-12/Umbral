import type { ChecklistItem, Language, OfficialSource, TranslatedContent, ULEInfo } from '../types';

export interface Country {
  code: string;
  name: TranslatedContent;
  status: 'available' | 'planned';
  /** Only published, reviewed procedures may appear here. */
  procedures: readonly string[];
}

export interface ContentJurisdiction {
  id: string;
  countryCode: string;
  level: 'national' | 'regional' | 'local';
  /** Country-specific administrative type, without assuming equivalence across countries. */
  administrativeType?: string;
  name: TranslatedContent;
  parentId?: string;
  officialCode?: string;
}

export interface ContentInstitution {
  id: string;
  countryCode: string;
  name: TranslatedContent;
  /** A country-defined role, documented by this package's sources. */
  role: string;
  sourceIds: readonly string[];
}

export interface ContentValidity {
  state: 'reviewed-as-of' | 'needs-review' | 'withdrawn';
  assurance: 'documentary';
  /** A dated documentary review does not certify future validity or office service. */
  description: TranslatedContent;
}

export interface ProcedureRequirement {
  id: string;
  countryCode: string;
  jurisdictionId: string;
  kind: 'applicant' | 'document';
  description: TranslatedContent;
  /** A condition ID defined by this package, never inferred from another country's rules. */
  applicability: string;
  sourceIds: readonly string[];
}

export interface ProcedureStep {
  id: string;
  order: number;
  title: TranslatedContent;
  content: TranslatedContent;
  sourceIds: readonly string[];
  localGuidanceIds: readonly string[];
}

export interface LocalGuidance {
  id: string;
  countryCode: string;
  jurisdictionId: string;
  /** Official local code; this guidance does not extend to neighboring districts. */
  scope: string;
  institutionId: string;
  office: ULEInfo;
  sourceIds: readonly string[];
  verifiedAt: string;
  validity: ContentValidity;
}

export interface ProcedureTranslation {
  about: Record<string, unknown>;
  guide: {
    steps: { title: string; content: string }[];
    [key: string]: unknown;
  };
  checklist: Record<string, unknown>;
  resources: Record<string, unknown>;
  faq: Record<string, unknown>;
}

export interface ProcedurePackage {
  id: string;
  countryCode: string;
  status: 'available';
  title: TranslatedContent;
  displayName: TranslatedContent;
  path: string;
  jurisdictionId: string;
  jurisdictions: readonly ContentJurisdiction[];
  institutions: readonly ContentInstitution[];
  availableLanguages: readonly Language[];
  /** Each version is maintained within this country package, never auto-translated. */
  languagePolicy: 'manual-country-specific';
  translations: Record<Language, ProcedureTranslation>;
  requirements: readonly ProcedureRequirement[];
  steps: readonly ProcedureStep[];
  preparation: {
    kind: 'preparation-only';
    items: ChecklistItem[];
    sourceIds: readonly string[];
  };
  localGuidance: readonly LocalGuidance[];
  sources: OfficialSource[];
  verifiedAt: string;
  validity: ContentValidity;
}
