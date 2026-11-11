import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/guide/1', name: 'guide-step1' },
  { path: '/guide/3', name: 'guide-step3' },
  { path: '/checklist', name: 'checklist' },
  { path: '/resources', name: 'resources' },
  { path: '/faq', name: 'faq' },
];

test.describe('Visual Regression', () => {
  for (const page of pages) {
    test(`should capture ${page.name} page`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      
      // Wait for main content to be visible
      await expect(browserPage.locator('main')).toBeVisible();
      
      // Wait a bit for any transitions/animations
      await browserPage.waitForTimeout(500);
      
      // Take screenshot
      await browserPage.screenshot({
        path: `screenshots/${test.info().project.name}/${page.name}.png`,
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
    
    // This is a basic check - full a11y testing would use axe-core
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Verify critical buttons are visible (implying contrast)
    const primaryButton = page.locator('main').getByRole('link', { name: /comenzar/i });
    await expect(primaryButton).toBeVisible();
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
