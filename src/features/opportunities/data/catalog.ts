import type { ContentInstitution, ContentJurisdiction } from '../../../content';
import type { Opportunity, OpportunitySource } from '../domain/types';
import { opportunities as previousOpportunities, sources as previousSources, institutions as previousInstitutions, jurisdictions as previousJurisdictions } from './peru';
import { concreteOpportunities, concreteSources, concreteInstitutions, concreteJurisdictions } from './verified';

export const categories = ['employment', 'education', 'training', 'enterprise', 'technology', 'family'] as const;
export const audiences = ['students', 'jobseekers', 'learners', 'entrepreneurs', 'households'] as const;
export const catalogCountries = [
  { code: 'PE', name: { es: 'Perú', en: 'Peru' } },
  { code: 'US', name: { es: 'Estados Unidos', en: 'United States' } },
  { code: 'MX', name: { es: 'México', en: 'Mexico' } },
  { code: 'CO', name: { es: 'Colombia', en: 'Colombia' } },
  { code: 'ES', name: { es: 'España', en: 'Spain' } },
  { code: 'INT', name: { es: 'Internacional', en: 'International' } },
] as const;
export const sources: readonly OpportunitySource[] = [...previousSources, ...concreteSources];
export const institutions: readonly ContentInstitution[] = [...previousInstitutions, ...concreteInstitutions];
export const jurisdictions: readonly ContentJurisdiction[] = [...previousJurisdictions, ...concreteJurisdictions];
export const opportunities: readonly Opportunity[] = [
  ...concreteOpportunities,
  ...previousOpportunities.map(opportunity => opportunity.id === 'cse-peru' ? {
    ...opportunity,
    access: {
      eligibleCountries: ['PE'], international: false, mode: 'onsite' as const,
      location: { es: 'ULE del distrito de residencia · Perú', en: 'ULE in your district of residence · Peru' },
      eligibility: opportunity.audienceDescription,
      benefit: { es: 'Preparar la solicitud de CSE; no concede un apoyo.', en: 'Prepare a CSE request; this does not award a benefit.' },
      action: 'procedure' as const, actionUrl: opportunity.officialUrl,
      instructions: { es: 'Acude a la ULE de tu distrito con los documentos. La guía local de Chiclayo sólo corresponde a ese distrito.', en: 'Visit your district ULE with the documents. Chiclayo office guidance applies only to that district.' },
    },
  } : opportunity.id === 'beca-18-2027' ? opportunity : { ...opportunity, placement: 'supplementary' as const }),
];
