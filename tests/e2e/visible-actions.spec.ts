import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import es from '../../src/locales/es/companion.json' with { type: 'json' };
import en from '../../src/locales/en/companion.json' with { type: 'json' };
import { captureReviewState, expectReflow, setLanguage, tabTo } from './helpers';

for (const language of ['es', 'en'] as const) {
  const copy = language === 'es' ? es : en;
  test('CSE has a direct country-specific entrance and an early guide action in ' + language, async ({ page }) => {
    await page.goto('/?country=PE');
    await setLanguage(page, language);
    const entrance = page.locator('main').getByRole('link', { name: copy.cseHome, exact: true });
    const box = await entrance.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThan(page.viewportSize()!.height);
    await tabTo(page, entrance);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/cse');
    await page.goto('/?country=US');
    await expect(page.locator('main').getByRole('link', { name: copy.cseHome, exact: true })).toHaveCount(0);
    await page.goto('/opportunities/cse-peru');
    const guide = page.getByRole('link', { name: copy.cseGuide, exact: true });
    expect((await guide.boundingBox())!.y).toBeLessThan(900);
    await expectReflow(page);
    await captureReviewState(page, 'visible-cse-' + language);
    await guide.click();
    await expect(page).toHaveURL('/cse');
  });

  test('early save keeps conditions, persists and leaves the complete requirements accessible in ' + language, async ({ page }) => {
    await page.goto('/opportunities/pe-promigas-billing');
    await setLanguage(page, language);
    const save = page.getByRole('button', { name: copy.save, exact: true });
    await expect(save).toHaveCount(1);
    expect((await save.boundingBox())!.y).toBeLessThan(900);
    await expect(page.locator('[data-key-condition]')).toContainText('CONADIS');
    await expect(page.getByText(copy.saveExplainer, { exact: true })).toBeVisible();
    for (const label of [copy.requirements, copy.conditions]) {
      const disclosure = page.locator('main details').filter({ has: page.getByText(label, { exact: true }) });
      await disclosure.locator('summary').click();
      await expect(disclosure.locator('li')).toHaveCount(2);
    }
    await expectReflow(page);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(axe.violations.map(item => item.id)).toEqual([]);
    await captureReviewState(page, 'visible-save-' + language);
    await tabTo(page, save);
    await page.keyboard.press('Space');
    await expect(page.getByRole('status').filter({ hasText: copy.saved })).toBeVisible();
    await page.getByRole('link', { name: copy.goRoute, exact: true }).click();
    await page.reload();
    await expect(page.locator('main article')).toHaveCount(1);
    await page.addStyleTag({ content: ':root { font-size: 200% !important; }' });
    await expectReflow(page);
  });
}
