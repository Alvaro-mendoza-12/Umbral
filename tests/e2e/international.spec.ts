import { expect, test } from '@playwright/test';
import { countries, getAvailableProcedures, getCountry, getProcedure, peCseProcedure } from '../../src/content';
import { captureReviewState, setLanguage } from './helpers';

test('the real content registry publishes one Peru guide and never falls back for other countries', () => {
  expect(countries.map(country => country.code)).toEqual(expect.arrayContaining(['PE', 'MX', 'CO', 'ES']));
  expect(getCountry('PE')).toMatchObject({ status: 'available', procedures: ['cse'] });
  expect(getAvailableProcedures('PE')).toEqual([peCseProcedure]);
  expect(getProcedure('PE', 'cse')).toBe(peCseProcedure);
  expect(getProcedure('PE', 'unpublished-procedure')).toBeUndefined();
  for (const code of ['MX', 'CO', 'ES']) {
    expect(getCountry(code)).toMatchObject({ status: 'planned', procedures: [] });
    expect(getAvailableProcedures(code)).toEqual([]);
    expect(getProcedure(code, 'cse')).toBeUndefined();
  }
  expect(getCountry('ZZ')).toBeUndefined();
  expect(getAvailableProcedures('ZZ')).toEqual([]);
  expect(getProcedure('ZZ', 'cse')).toBeUndefined();
  expect(peCseProcedure.availableLanguages).toEqual(['es', 'en']);
  expect(peCseProcedure.languagePolicy).toBe('manual-country-specific');
  expect(peCseProcedure.countryCode).toBe('PE');
  expect(peCseProcedure.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(peCseProcedure.validity).toMatchObject({ state: 'reviewed-as-of', assurance: 'documentary' });
  const jurisdictionIds = new Set<string>(peCseProcedure.jurisdictions.map(jurisdiction => jurisdiction.id));
  const sourceIds = new Set(peCseProcedure.sources.map(source => source.id));
  expect(jurisdictionIds.has(peCseProcedure.jurisdictionId)).toBe(true);
  expect(peCseProcedure.jurisdictions.every(jurisdiction => jurisdiction.countryCode === 'PE')).toBe(true);
  expect(peCseProcedure.institutions.length).toBeGreaterThan(0);
  for (const institution of peCseProcedure.institutions) {
    expect(institution.countryCode).toBe('PE');
    expect(institution.sourceIds.length).toBeGreaterThan(0);
    expect(institution.sourceIds.every(id => sourceIds.has(id))).toBe(true);
  }
  expect(peCseProcedure.requirements.every(requirement => requirement.countryCode === 'PE')).toBe(true);
  for (const requirement of peCseProcedure.requirements) {
    expect(jurisdictionIds.has(requirement.jurisdictionId)).toBe(true);
    expect(requirement.sourceIds.every(id => sourceIds.has(id))).toBe(true);
  }
  expect(peCseProcedure.steps).toHaveLength(5);
  expect(peCseProcedure.steps.every(step => step.sourceIds.length > 0 && step.sourceIds.every(id => sourceIds.has(id)))).toBe(true);
  expect(peCseProcedure.sources).toHaveLength(5);
  expect(peCseProcedure.preparation.items).toHaveLength(11);
  expect(peCseProcedure.localGuidance).toEqual(expect.arrayContaining([
    expect.objectContaining({ countryCode: 'PE', jurisdictionId: 'PE-140101', scope: '140101' }),
  ]));
});

for (const language of ['es', 'en'] as const) {
  for (const country of ['MX', 'CO', 'ES']) {
    test(`${country} transparently has no verified guide in ${language} and can return to Peru`, async ({ page }) => {
      await page.goto(`/?country=${country}`);
      await setLanguage(page, language);
      const main = page.locator('main');
      const selector = page.getByLabel(language === 'es' ? 'País' : 'Country', { exact: true });
      await expect(selector).toHaveAttribute('id', 'country');
      await expect(selector).toHaveValue(country);
      await expect(main.getByRole('link', { name: language === 'es' ? 'Comenzar' : 'Start', exact: true })).toHaveCount(0);
      await expect(main.locator('a[href^="/guide"]')).toHaveCount(0);
      await expect(main.getByRole('heading', { name: peCseProcedure.displayName[language], exact: true })).toHaveCount(0);
      if (language === 'es') {
        await expect(main.getByText('Todavía no hay guías verificadas para este país.', { exact: true })).toBeVisible();
      } else {
        await expect(main).toContainText(/no verified guides|verified guides.*not.*available|don.t have.*verified guides/i);
      }
      // No imported legal requirements or personal-data entry for a planned country.
      await expect(main).not.toContainText(/\b(?:CSE|S100|SISFOH|ULE|DNI|CPP)\b|Chiclayo|San José 1394/i);
      await expect(main.locator('input:not([type="checkbox"]), textarea, input[type="file"]')).toHaveCount(0);
      if (country === 'MX') await captureReviewState(page, `home-no-guides-${language}`);

      await page.reload();
      await expect(selector).toHaveValue(country);
      const returnToPeru = main.getByRole('button', { name: language === 'es' ? 'Ver la guía de Perú' : 'View the Peru guide', exact: true });
      await returnToPeru.click();
      await expect(page).toHaveURL(/\?country=PE$/);
      await expect(selector).toHaveValue('PE');
      await expect(main.getByRole('link', { name: language === 'es' ? 'Comenzar' : 'Start', exact: true })).toBeVisible();
      await expect(page.locator('#available-service')).toHaveText(peCseProcedure.displayName[language]);

      // The selector itself must update the route, not just its selected option.
      await selector.selectOption(country);
      await expect(page).toHaveURL(new RegExp(`\\?country=${country}$`));
      await expect(main.locator('a[href^="/guide"]')).toHaveCount(0);
      await selector.selectOption('PE');
      await expect(page.locator('#available-service')).toHaveText(peCseProcedure.displayName[language]);
    });
  }
}
