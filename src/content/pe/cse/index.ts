import type { ProcedurePackage, ProcedureStep } from '../../types';
import es from './es.json' with { type: 'json' };
import en from './en.json' with { type: 'json' };
import { checklistItems } from './checklist';
import { officialSources, uleChiclayoInfo } from './sources';

const stepSourceIds = [
  ['directiva_010', 'solicitar_cse', 'faq_midis'],
  ['directiva_010', 'solicitar_cse', 'faq_midis'],
  ['directiva_010', 'solicitar_cse'],
  ['directiva_010', 'solicitar_cse', 'directorio_ule'],
  ['directiva_010', 'solicitar_cse', 'consulta_cse', 'faq_midis'],
];

// Steps and requirements reference the preserved, manually maintained language versions.
const steps: ProcedureStep[] = es.guide.steps.map((step, index) => ({
  id: `step-${index + 1}`,
  order: index + 1,
  title: { es: step.title, en: en.guide.steps[index].title },
  content: { es: step.content, en: en.guide.steps[index].content },
  sourceIds: stepSourceIds[index],
  localGuidanceIds: index === 3 ? ['chiclayo-140101'] : [],
}));

export const peCseProcedure = {
  id: 'cse',
  countryCode: 'PE',
  status: 'available',
  title: { es: 'Clasificación Socioeconómica', en: 'Socioeconomic Classification' },
  displayName: {
    es: 'Clasificación Socioeconómica — Perú',
    en: 'Socioeconomic Classification — Peru',
  },
  // Preserve the current route while the content is resolved explicitly by country and ID.
  path: '/guide',
  jurisdictionId: 'PE-national',
  jurisdictions: [
    {
      id: 'PE-national',
      countryCode: 'PE',
      level: 'national',
      name: { es: 'Perú', en: 'Peru' },
    },
    {
      id: 'PE-140101',
      countryCode: 'PE',
      level: 'local',
      administrativeType: 'district',
      name: { es: 'Distrito de Chiclayo', en: 'Chiclayo district' },
      parentId: 'PE-national',
      officialCode: '140101',
    },
  ],
  institutions: [
    {
      id: 'ofis',
      countryCode: 'PE',
      name: { es: 'OFIS', en: 'OFIS' },
      role: 'national-information-service',
      sourceIds: ['solicitar_cse', 'consulta_cse', 'directorio_ule'],
    },
    {
      id: 'ule',
      countryCode: 'PE',
      name: {
        es: 'Unidad Local de Empadronamiento (ULE)',
        en: 'Local Registration Unit (ULE)',
      },
      role: 'municipal-application-intake',
      sourceIds: ['directiva_010', 'solicitar_cse', 'directorio_ule'],
    },
  ],
  availableLanguages: ['es', 'en'],
  languagePolicy: 'manual-country-specific',
  translations: { es, en },
  requirements: [
    {
      id: 'adult-household-applicant',
      countryCode: 'PE',
      jurisdictionId: 'PE-national',
      kind: 'applicant',
      description: {
        es: es.about.whoCanApply.requirements[0],
        en: en.about.whoCanApply.requirements[0],
      },
      applicability: 'adult-household-member',
      sourceIds: ['directiva_010', 'solicitar_cse'],
    },
    {
      id: 'household-identification',
      countryCode: 'PE',
      jurisdictionId: 'PE-national',
      kind: 'document',
      description: {
        es: es.about.whoCanApply.requirements[1],
        en: en.about.whoCanApply.requirements[1],
      },
      applicability: 'identification-as-applicable',
      sourceIds: ['directiva_010', 'solicitar_cse'],
    },
    {
      id: 'conditional-electricity-bill',
      countryCode: 'PE',
      jurisdictionId: 'PE-national',
      kind: 'document',
      description: {
        es: es.about.whoCanApply.requirements[2],
        en: en.about.whoCanApply.requirements[2],
      },
      applicability: 'dwelling-has-electricity',
      sourceIds: ['directiva_010', 'solicitar_cse'],
    },
  ],
  steps,
  preparation: {
    kind: 'preparation-only',
    items: checklistItems,
    sourceIds: ['directiva_010', 'solicitar_cse', 'faq_midis', 'consulta_cse', 'directorio_ule'],
  },
  localGuidance: [
    {
      id: 'chiclayo-140101',
      countryCode: 'PE',
      jurisdictionId: 'PE-140101',
      scope: '140101',
      institutionId: 'ule',
      office: uleChiclayoInfo,
      sourceIds: ['directorio_ule'],
      verifiedAt: '2026-11-10',
      validity: {
        state: 'reviewed-as-of',
        assurance: 'documentary',
        description: uleChiclayoInfo.notes,
      },
    },
  ],
  sources: officialSources,
  verifiedAt: '2026-11-10',
  validity: {
    state: 'reviewed-as-of',
    assurance: 'documentary',
    description: { es: es.resources.description, en: en.resources.description },
  },
} satisfies ProcedurePackage;
