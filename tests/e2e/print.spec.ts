import { test, expect } from '@playwright/test';
import es from '../../src/content/pe/cse/es.json' with { type: 'json' };
import en from '../../src/content/pe/cse/en.json' with { type: 'json' };
import { checklistItems } from '../../src/content/pe/cse/checklist';
import { officialSources, uleChiclayoInfo } from '../../src/content/pe/cse/sources';

test('preparation sheet opens a complete Spanish and English print document', async ({ page, context }) => {
  // Inspect the actual popup without opening an OS print dialog or consuming paper.
  await context.addInitScript(() => {
    window.print = () => { document.documentElement.dataset.printRequested = 'true'; };
  });
  for (const language of ['es', 'en'] as const) {
    await page.goto('/resources');
    await page.locator('header').first().getByRole('button', { name: language === 'es' ? 'Español' : 'English', exact: true }).click();
    const popupPromise = page.waitForEvent('popup');
    await page.locator('main').getByRole('button', { name: /imprimir|print/i }).click();
    const popup = await popupPromise;
    await expect(popup.locator('html')).toHaveAttribute('lang', language);
    await expect(popup.locator('html')).toHaveAttribute('data-print-requested', 'true');
    await expect(popup.locator('body')).toContainText('S100');
    await expect(popup.locator('body')).toContainText('CPP');
    await expect(popup.locator('body')).toContainText(/25[\s\S]*40/);
    await expect(popup.locator('body')).toContainText('San José 1394');
    await expect(popup.locator('a[href="https://www.gob.pe/81970"]')).toHaveCount(1);
    expect(await popup.locator('.checklist-item').count()).toBe(11);
    expect((await popup.locator('body').innerText()).length).toBeGreaterThan(3000);
    const content = language === 'es' ? es : en;
    // Screen disclosures must not omit or collapse anything in the print document.
    await expect(popup.locator('details:not([open])')).toHaveCount(0);
    for (const step of content.guide.steps) {
      for (const paragraph of step.content.split('\n\n')) {
        for (const line of paragraph.split('\n')) {
          const text = line.replace(/^\*\*|\*\*$/g, '').replace(/^(?:- |\d+\. )/, '');
          await expect(popup.locator('body').getByText(text, { exact: true })).toBeVisible();
        }
      }
    }
    for (const item of checklistItems) {
      const row = popup.locator('.checklist-item').filter({ hasText: item.item[language] });
      await expect(row).toHaveCount(1);
      await expect(row).toContainText(item.description![language]);
    }
    for (const source of officialSources) {
      await expect(popup.getByRole('heading', { name: source.name[language], exact: true })).toBeVisible();
      await expect(popup.getByRole('link', { name: source.url!, exact: true })).toHaveAttribute('href', source.url!);
      await expect(popup.getByText(source.description![language], { exact: true })).toBeVisible();
    }
    await expect(popup.getByText(uleChiclayoInfo.notes[language], { exact: true })).toBeVisible();
    await expect(popup.getByText(content.resources.disclaimer.content, { exact: true })).toBeVisible();
    await popup.close();
  }
});
