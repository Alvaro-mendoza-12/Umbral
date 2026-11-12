import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { captureReviewState, expectReflow, setLanguage, type Language } from './helpers';

const copy = {
  es: {
    title: 'Los trámites públicos, más fáciles de entender',
    description: 'Descubre qué necesitas, conoce los pasos y prepárate con información oficial.',
    start: 'Comenzar',
    service: 'Clasificación Socioeconómica — Perú',
  },
  en: {
    title: 'Simpler public service procedures',
    description: 'Discover what you need, understand the steps and prepare with official information.',
    start: 'Start',
    service: 'Socioeconomic Classification — Peru',
  },
} satisfies Record<Language, { title: string; description: string; start: string; service: string }>;

for (const language of ['es', 'en'] as const) {
  test(`first viewport communicates the value, action and available service in ${language}`, async ({ page }, testInfo) => {
    await page.goto('/cse');
    await setLanguage(page, language);
    await page.evaluate(() => document.fonts.ready);
    const title = page.locator('main h1');
    const start = page.locator('main').getByRole('link', { name: copy[language].start, exact: true });
    const service = page.locator('#available-service');
    const description = title.locator('..').getByText(copy[language].description, { exact: true });

    await expect(title).toHaveText(copy[language].title);
    await expect(description).toHaveText(copy[language].description);
    await expect(start).toHaveAttribute('href', '/guide');
    await expect(service).toHaveText(copy[language].service);
    await expect(service).toHaveRole('heading');
    await expect(service).toHaveJSProperty('tagName', 'H2');
    await expect(service).toHaveAttribute('id', 'available-service');

    // Visibility alone accepts content below the fold. Measure the rendered boxes
    // before any action that could scroll the document on the user's behalf.
    const viewport = page.viewportSize()!;
    const metrics = [];
    for (const [name, element, minimumFontSize] of [
      ['value', title, 28],
      ['description', description, 16],
      ['start', start, 16],
      ['service', service, 18],
    ] as const) {
      await expect(element).toBeVisible();
      const box = await element.boundingBox();
      expect(box, `${name} must have a rendered box`).not.toBeNull();
      expect(box!.y, `${name} starts inside the first viewport`).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height, `${name} ends inside ${viewport.width}×${viewport.height}`).toBeLessThanOrEqual(viewport.height);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
      const fontSize = await element.evaluate(node => Number.parseFloat(getComputedStyle(node).fontSize));
      expect(fontSize, `${name} retains readable type`).toBeGreaterThanOrEqual(minimumFontSize);
      metrics.push({ name, ...box, fontSize });
    }
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await expectReflow(page);
    await testInfo.attach('first-viewport-geometry', { body: JSON.stringify({ language, viewport, metrics }, null, 2), contentType: 'application/json' });
    await captureReviewState(page, `home-first-viewport-${language}`, false);
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(accessibility.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) }))).toEqual([]);

    await start.click();
    await expect(page).toHaveURL('/guide/1');
    await expect(page.locator('main h2[data-route-focus]')).toBeFocused();
  });

  test(`Home reflows at 320px and its primary action remains usable in ${language}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto('/cse');
    await setLanguage(page, language);
    await expectReflow(page);
    const summary = page.locator('main summary').filter({ hasText: language === 'es' ? 'Ver los cinco pasos' : 'View the five steps' });
    await summary.click();
    await expectReflow(page);
    await page.locator('main').getByRole('link', { name: copy[language].start, exact: true }).click();
    await expect(page).toHaveURL('/guide/1');
  });

  test(`Home tolerates 200% text resizing without clipping in ${language}`, async ({ page }) => {
    await page.goto('/cse');
    await setLanguage(page, language);
    const title = page.locator('main h1');
    const initialFontSize = await title.evaluate(node => Number.parseFloat(getComputedStyle(node).fontSize));
    // Root text resizing exercises rem-based layouts without changing browser UI.
    await page.addStyleTag({ content: ':root { font-size: 200% !important; }' });
    expect(await title.evaluate(node => Number.parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThan(initialFontSize);
    await expectReflow(page);
    const start = page.locator('main').getByRole('link', { name: copy[language].start, exact: true });
    await start.scrollIntoViewIfNeeded();
    await expect(start).toBeInViewport();
    await start.click();
    await expect(page).toHaveURL('/guide/1');
  });
}
