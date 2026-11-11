import { test, expect } from '@playwright/test';

test('preparation sheet opens a complete Spanish and English print document', async ({ page, context }) => {
  // Inspect the actual popup without opening an OS print dialog or consuming paper.
  await context.addInitScript(() => {
    window.print = () => { document.documentElement.dataset.printRequested = 'true'; };
  });
  for (const language of ['es', 'en']) {
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
    await popup.close();
  }
});
