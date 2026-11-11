import { expect, type Page } from '@playwright/test';

export async function navigateFromHeader(page: Page, name: RegExp) {
  const header = page.locator('body > #root header').first();
  const link = header.getByRole('link', { name }).first();
  if (!(await link.isVisible())) {
    await header.getByRole('button', { name: /^(abrir menú|open menu)$/i }).click();
  }
  await expect(link).toBeVisible();
  await link.click();
}
