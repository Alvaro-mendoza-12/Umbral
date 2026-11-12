import { expect, test, type Locator, type Page } from '@playwright/test';

export type Language = 'es' | 'en';

export async function setLanguage(page: Page, language: Language) {
  if (await page.locator('html').getAttribute('lang') !== language) {
    await page.locator('body > #root header').first().getByRole('button', {
      name: language === 'en' ? 'English' : 'Español',
      exact: true,
    }).click();
  }
  await expect(page.locator('html')).toHaveAttribute('lang', language);
}

export async function tabTo(page: Page, target: Locator) {
  const controls = await page.locator('a[href], button, input, select, textarea, summary, [tabindex="0"]').count();
  for (let attempt = 0; attempt <= controls; attempt++) {
    if (await target.evaluate(element => element === document.activeElement)) break;
    await page.keyboard.press('Tab');
  }
  await expect(target).toBeFocused();
}

export async function captureReviewState(page: Page, name: string, fullPage = true) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, 0);
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  });
  await page.screenshot({
    path: `${process.env.UMBRAL_SCREENSHOTS_DIR || 'audit/screenshots'}/${test.info().project.name}/${name}.png`,
    fullPage,
    animations: 'disabled',
  });
}

export async function expectReflow(page: Page) {
  await expect.poll(() => page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const clipped = Array.from(document.querySelectorAll<HTMLElement>('main h1, main h2, main p, main a, main button, main label, main summary, main select'))
      .filter(element => {
        const box = element.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && (box.left < -1 || box.right > width + 1 || element.scrollWidth > element.clientWidth + 1);
      })
      .map(element => element.textContent?.trim() || element.tagName);
    if (document.documentElement.scrollWidth > width) clipped.push('document');
    return clipped;
  })).toEqual([]);
}

export async function navigateFromHeader(page: Page, name: RegExp) {
  const header = page.locator('body > #root header').first();
  const link = header.getByRole('link', { name }).first();
  if (!(await link.isVisible())) {
    await header.getByRole('button', { name: /^(abrir menú|open menu)$/i }).click();
  }
  await expect(link).toBeVisible();
  await link.click();
}
