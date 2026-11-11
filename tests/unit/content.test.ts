import { describe, expect, it } from 'vitest';
import { countries, getAvailableProcedures, getCountry, getProcedure, peCseProcedure } from '../../src/content';
import { checklistItems } from '../../src/data/checklistItems';
import { officialSources, uleChiclayoInfo } from '../../src/data/sources';
import esUi from '../../src/locales/es/translation.json';
import enUi from '../../src/locales/en/translation.json';
import esContent from '../../src/content/pe/cse/es.json';
import enContent from '../../src/content/pe/cse/en.json';
import i18n, { getTranslationResources } from '../../src/services/i18n';

describe('country-specific content resolution', () => {
  it('publishes only the reviewed PE procedure and accepts normalized country codes', () => {
    expect(countries.filter(country => country.status === 'available').map(country => country.code)).toEqual(['PE']);
    expect(getCountry(' pe ')?.name).toEqual({ es: 'Perú', en: 'Peru' });
    expect(getAvailableProcedures('pe')).toEqual([peCseProcedure]);
    expect(getProcedure('PE', 'cse')).toBe(peCseProcedure);
  });

  it.each(['MX', 'CO', 'ES'])('keeps %s planned without inventing or borrowing procedures', code => {
    expect(getCountry(code)).toMatchObject({ status: 'planned', procedures: [] });
    expect(getAvailableProcedures(code)).toEqual([]);
    expect(getProcedure(code, 'cse')).toBeUndefined();
    expect(getTranslationResources(code, 'cse')).toBeUndefined();
  });

  it.each(['', 'ZZ', 'Peru', 'PE/cse'])('does not fall back for unknown country %s', code => {
    expect(getCountry(code)).toBeUndefined();
    expect(getAvailableProcedures(code)).toEqual([]);
    expect(getProcedure(code, 'cse')).toBeUndefined();
    expect(getTranslationResources(code, 'cse')).toBeUndefined();
  });

  it('does not substitute CSE for an unknown procedure', () => {
    expect(getProcedure('PE', 'unknown')).toBeUndefined();
    expect(getProcedure('PE', '')).toBeUndefined();
    expect(getTranslationResources('PE', 'unknown')).toBeUndefined();
  });
});

describe('reviewed PE/CSE package', () => {
  it('separates national coverage from the documented Chiclayo office', () => {
    const national = peCseProcedure.jurisdictions.find(scope => scope.id === peCseProcedure.jurisdictionId);
    expect(national).toMatchObject({ countryCode: 'PE', level: 'national' });
    expect(peCseProcedure.path).toBe('/guide');
    expect(peCseProcedure.title.es).toBe('Clasificación Socioeconómica');
    expect(peCseProcedure.displayName.es).toBe('Clasificación Socioeconómica — Perú');
    expect(peCseProcedure.localGuidance).toHaveLength(1);
    expect(peCseProcedure.localGuidance[0]).toMatchObject({
      scope: '140101', countryCode: 'PE', jurisdictionId: 'PE-140101', institutionId: 'ule',
    });
    expect(peCseProcedure.localGuidance[0].office).toBe(uleChiclayoInfo);
    expect(peCseProcedure.jurisdictions.find(scope => scope.id === 'PE-140101')).toMatchObject({
      officialCode: '140101', level: 'local', administrativeType: 'district', parentId: national?.id,
    });
  });

  it('keeps conditional requirements distinct from optional preparation actions', () => {
    const electricity = peCseProcedure.requirements.find(requirement => requirement.id === 'conditional-electricity-bill');
    expect(electricity).toMatchObject({ kind: 'document', applicability: 'dwelling-has-electricity' });
    expect(electricity?.description.es).toBe(esContent.about.whoCanApply.requirements[2]);
    expect(peCseProcedure.preparation.kind).toBe('preparation-only');
    expect(peCseProcedure.preparation.items).toBe(checklistItems);
    expect(checklistItems.every(item => item.required === false)).toBe(true);
    expect(peCseProcedure.requirements.map(requirement => requirement.id).some(id => checklistItems.some(item => item.id === id))).toBe(false);
  });

  it('resolves every requirement, institution, step and local source inside this package', () => {
    const sourceIds = new Set(peCseProcedure.sources.map(source => source.id));
    expect(sourceIds.size).toBe(peCseProcedure.sources.length);
    const records = [
      ...peCseProcedure.requirements,
      ...peCseProcedure.institutions,
      ...peCseProcedure.steps,
      ...peCseProcedure.localGuidance,
      peCseProcedure.preparation,
    ];
    for (const record of records) {
      expect(record.sourceIds.length).toBeGreaterThan(0);
      for (const id of record.sourceIds) expect(sourceIds.has(id), `Unknown source ${id}`).toBe(true);
    }
    const jurisdictionIds = new Set(peCseProcedure.jurisdictions.map(jurisdiction => jurisdiction.id));
    for (const record of [...peCseProcedure.requirements, ...peCseProcedure.localGuidance]) {
      expect(record.countryCode).toBe(peCseProcedure.countryCode);
      expect(jurisdictionIds.has(record.jurisdictionId)).toBe(true);
    }
    expect(peCseProcedure.sources).toBe(officialSources);
    expect(peCseProcedure.institutions.map(institution => institution.id)).toEqual(['ofis', 'ule']);
  });

  it('retains the dated documentary review without asserting ongoing validity', () => {
    expect(peCseProcedure.verifiedAt).toBe('2026-11-10');
    expect(peCseProcedure.validity).toMatchObject({ state: 'reviewed-as-of', assurance: 'documentary' });
    expect(peCseProcedure.sources.every(source => source.verifiedDate === peCseProcedure.verifiedAt)).toBe(true);
    expect(peCseProcedure.localGuidance[0].validity.description).toBe(uleChiclayoInfo.notes);
  });

  it('uses the same manually maintained ES/EN content in metadata and live translations', () => {
    expect(peCseProcedure.availableLanguages).toEqual(['es', 'en']);
    expect(peCseProcedure.languagePolicy).toBe('manual-country-specific');
    expect(peCseProcedure.steps).toHaveLength(esContent.guide.steps.length);
    expect(esContent.guide.steps.length).toBe(enContent.guide.steps.length);
    for (const [index, step] of peCseProcedure.steps.entries()) {
      expect(step.content).toEqual({ es: esContent.guide.steps[index].content, en: enContent.guide.steps[index].content });
    }
    for (const [language, ui, procedure] of [['es', esUi, esContent], ['en', enUi, enContent]] as const) {
      const resources = getTranslationResources('PE', 'cse')!;
      expect(resources[language].translation).toEqual({ ...ui, ...procedure });
      for (const key of ['about', 'guide', 'checklist', 'resources', 'faq']) {
        expect(Object.hasOwn(ui, key)).toBe(false);
        expect(i18n.getResource(language, 'translation', key)).toEqual(procedure[key as keyof typeof procedure]);
      }
      expect(i18n.getResource(language, 'translation', 'home')).toEqual(ui.home);
    }
  });
});
