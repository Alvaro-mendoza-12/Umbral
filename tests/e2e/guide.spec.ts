import { test, expect } from '@playwright/test';

test.describe('Interactive Guide', () => {
  test('should navigate through guide steps', async ({ page }) => {
    await page.goto('/guide/1');
    
    // Check first step is displayed
    await expect(page.locator('main h1')).toContainText(/antes de comenzar/i);
    
    // Navigate to next step
    const nextButton = page.locator('main').getByRole('link', { name: /siguiente/i });
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    
    await expect(page).toHaveURL('/guide/2');
    await expect(page.locator('main h1')).toContainText(/paso/i);
  });

  test('should navigate using sidebar', async ({ page }) => {
    await page.goto('/guide/1');
    
    // Find navigation in aside or nav
    const navigation = page.locator('aside, nav').filter({ hasText: /pasos/i }).first();
    await expect(navigation).toBeVisible();
    
    // Click on a step in navigation
    await navigation.getByRole('link', { name: /paso 2/i }).first().click();
    await expect(page).toHaveURL('/guide/2');
  });

  test('should display progress indicator', async ({ page }) => {
    await page.goto('/guide/1');
    
    // Progress should be visible somewhere in the page
    await expect(page.locator('text=/paso 1/i')).toBeVisible();
    
    await page.goto('/guide/3');
    await expect(page.locator('text=/paso 3/i')).toBeVisible();
  });
});
