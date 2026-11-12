import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import es from '../../src/locales/es/companion.json' with { type: 'json' };
import en from '../../src/locales/en/companion.json' with { type: 'json' };
import { setLanguage, expectReflow } from './helpers';

for (const language of ['es', 'en'] as const) {
  const copy = language === 'es' ? es : en;
  test('finds varied domestic jobs in every country and exposes eligibility before applying in ' + language, async ({ page }) => {
    for (const [country, count] of [['PE', 4], ['US', 2], ['MX', 3], ['CO', 3], ['ES', 3]] as const) {
      await page.goto('/discover?country=' + country + '&category=employment');
      await setLanguage(page, language);
      const cards = page.locator('main article');
      await expect(cards).toHaveCount(count);
      for (const card of await cards.all()) {
        await expect(card.getByRole('link', { name: new RegExp('^' + copy.details + ':') })).toHaveText(copy.details + '→');
        await expect(card).toContainText(copy.keyRequirement);
        expect((await card.locator('p').allTextContents()).every(text => text.length < 220)).toBe(true);
      }
      if (country !== 'PE') await expect(cards.filter({ hasText: 'CONADIS' })).toHaveCount(0);
      await expectReflow(page);
      await cards.first().getByRole('heading').getByRole('link').click();
      const eligibility = page.locator('[data-eligibility]');
      await expect(eligibility.locator('dl > div')).toHaveCount(7);
      await expect(eligibility).toContainText(copy.eligibilityFields.residence);
      await expect(eligibility).toContainText(copy.eligibilityFields.international);
      expect(await eligibility.evaluate(node => Boolean(node.compareDocumentPosition(document.querySelector('[data-official-action]')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
      expect(await page.locator('[data-key-condition]').evaluate(node => Boolean(node.compareDocumentPosition(document.querySelector('[data-save]')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
      await expect(page.locator('[data-official-action]')).toHaveAttribute('href', /^https:\/\//);
      await expectReflow(page);
    }
  });

  test('distinguishes required experience, preferred experience and inclusive restrictions in ' + language, async ({ page }) => {
    await page.goto('/opportunities/pe-xylem-electromechanical'); await setLanguage(page, language);
    await expect(page.locator('[data-eligibility]')).toContainText(language === 'es' ? 'discapacidad física leve' : 'mild physical disability');
    await page.goto('/opportunities/mx-concentrix-customer');
    await expect(page.locator('[data-eligibility]')).toContainText(language === 'es' ? 'inglés' : 'English');
    await expect(page.locator('[data-eligibility]')).toContainText(language === 'es' ? 'no publicados como obligatorios' : 'not listed as mandatory');
    await page.goto('/opportunities/es-ikea-logistics');
    await expect(page.locator('[data-eligibility]')).toContainText(language === 'es' ? 'valorables' : 'preferred');
    await page.goto('/opportunities/co-amazon-business-analyst');
    await expect(page.locator('[data-eligibility]')).toContainText('VBA');
    await expect(page.locator('[data-key-condition]')).toContainText(language === 'es' ? 'no práctica ni primer empleo' : 'not an internship or first job');
  });

  test('separates full scholarships, partial funding, older courses and a current paid credential in ' + language, async ({ page }) => {
    await page.goto('/discover?country=ES&category=education'); await setLanguage(page, language);
    await expect(page.locator('main article').filter({ hasText: 'ETH ESOP' })).toContainText(copy.supportTypes['full-scholarship']);
    const partial = page.locator('main article').filter({ hasText: 'Leiden LExS' });
    await expect(partial).toContainText(copy.supportTypes['partial-scholarship']);
    await partial.getByRole('heading').getByRole('link').click();
    await expect(page.locator('[data-eligibility]')).toContainText(language === 'es' ? 'Pasaporte español' : 'Spanish passport');
    await expect(page.locator('[data-key-condition]')).toContainText(language === 'es' ? 'fondos propios' : 'Personal funds');
    await page.goto('/opportunities/int-google-it-support');
    await expect(page.locator('[data-key-condition]')).toContainText(language === 'es' ? 'pago' : 'Paid');
    await expect(page.locator('[data-key-condition]')).toContainText('CompTIA A+');
    await page.goto('/opportunities/mx-unam-excel');
    await expect(page.locator('main h1')).toContainText('2010');
    await expect(page.locator('[data-key-condition]')).toContainText(language === 'es' ? 'no es certificación profesional actual' : 'not a current professional certification');
  });

  test('shows debt equity and training commitments before save, with late applications clearly labelled in ' + language, async ({ page }) => {
    await page.goto('/opportunities/es-enisa-digital-women'); await setLanguage(page, language);
    await expect(page.locator('[data-key-condition]')).toContainText(language === 'es' ? 'devolución' : 'Repayable');
    await page.goto('/opportunities/int-yc-winter-2027');
    await expect(page.locator('main')).toContainText(copy.lateApplications);
    await expect(page.locator('[data-key-condition]')).toContainText('SAFE');
    await expect(page.locator('[data-key-condition]')).toContainText('7');
    await expect(page.locator('[data-key-condition]')).toBeVisible();
    await page.getByRole('button', { name: copy.save, exact: true }).click();
    await page.getByRole('link', { name: copy.goRoute, exact: true }).click();
    await expect(page.locator('main article')).toContainText('SAFE');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: copy.download, exact: true }).click();
    const download = await downloadPromise;
    expect(await readFile((await download.path())!, 'utf8')).toContain('SAFE');
    await page.goto('/opportunities/int-yc-startup-school');
    await expect(page.locator('[data-key-condition]')).toContainText(language === 'es' ? 'No entrega capital' : 'Does not provide capital');
  });

  test('new eligibility and compact catalogue reflow and pass automated accessibility checks in ' + language, async ({ page }) => {
    for (const path of ['/discover?country=MX&category=employment', '/opportunities/mx-concentrix-customer', '/opportunities/int-leiden-lexs', '/opportunities/int-yc-winter-2027']) {
      await page.goto(path); await setLanguage(page, language); await expectReflow(page);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(results.violations.map(item => item.id)).toEqual([]);
      await page.addStyleTag({ content: ':root { font-size: 200% !important; }' }); await expectReflow(page);
    }
  });
}

test('unreviewed jobs disappear from discovery and lose their application action', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-15T15:00:00Z') });
  await page.goto('/discover?country=MX&category=employment'); await expect(page.locator('main article')).toHaveCount(0);
  await page.goto('/opportunities/mx-amazon-process');
  await expect(page.locator('[data-official-action]')).toHaveCount(0);
  await expect(page.locator('main')).toContainText(es.status.unconfirmed);
});
