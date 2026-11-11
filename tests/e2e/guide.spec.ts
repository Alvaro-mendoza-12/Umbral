import { test, expect } from '@playwright/test';

test.describe('Interactive Guide', () => {
  test('should navigate through guide steps', async ({ page }) => {
    await page.goto('/guide/1');
    
    // Check first step is displayed
    await expect(page.locator('main h1')).toContainText(/guía de preparación/i);
    await expect(page.locator('main h2[data-route-focus]')).toHaveText('Antes de empezar');
    
    // Navigate to next step
    const nextButton = page.locator('main').getByRole('button', { name: /siguiente/i });
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    
    await expect(page).toHaveURL('/guide/2');
    await expect(page.locator('main').getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
  });

  test('should navigate using sidebar', async ({ page }) => {
    await page.goto('/guide/1');
    
    // Find navigation in aside or nav
    const navigation = page.locator('main aside').getByRole('navigation');
    await expect(navigation).toBeVisible();
    
    // Click on a step in navigation
    await navigation.getByRole('button').nth(1).click();
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
