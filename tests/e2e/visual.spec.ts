import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/guide/1', name: 'guide-step1' },
  { path: '/guide/3', name: 'guide-step3' },
  { path: '/checklist', name: 'checklist' },
  { path: '/resources', name: 'resources' },
  { path: '/faq', name: 'faq' },
  { path: '/not-found-audit', name: 'not-found' },
];

test.describe('Visual evidence and layout', () => {
  for (const page of pages) {
    test(`should capture ${page.name} page`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      
      // Wait for main content to be visible
      await expect(browserPage.locator('main')).toBeVisible();
      
      await browserPage.evaluate(() => document.fonts.ready);
      expect(await browserPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      
      // Take screenshot
      await browserPage.screenshot({
        path: `audit/screenshots/${test.info().project.name}/${page.name}.png`,
        fullPage: true,
      });
    });
  }

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check H1 exists and is unique
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Check heading structure
    await expect(page.locator('main h1')).toBeVisible();
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    const result = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    expect(result.violations).toEqual([]);
  });

  test('should display correctly on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Verify mobile menu behavior if needed
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Main content should be visible
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Hero title should not overflow
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    
    const box = await h1.boundingBox();
    expect(box).toBeTruthy();
    if (box) {
      const viewport = page.viewportSize();
      expect(box.width).toBeLessThanOrEqual(viewport!.width);
    }
  });
});
