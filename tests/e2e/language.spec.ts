import { test, expect } from '@playwright/test';
import { navigateFromHeader } from './helpers';

test.describe('Language Switching', () => {
  test('should switch from Spanish to English', async ({ page }) => {
    await page.goto('/');
    
    // Default should be Spanish
    await expect(page.locator('main h1')).toContainText('Prepárate');
    
    // Switch to English - use header button specifically
    await page.locator('header').getByRole('button', { name: 'EN' }).first().click();
    
    // Content should change
    await expect(page.locator('main h1')).toContainText('Prepare');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    
    // Button should now show ES
    await expect(page.locator('header').getByRole('button', { name: 'ES' }).first()).toBeVisible();
  });

  test('should persist language preference', async ({ page }) => {
    await page.goto('/');
    
    // Switch to English
    await page.locator('header').getByRole('button', { name: 'EN' }).first().click();
    await expect(page.locator('main h1')).toContainText('Prepare');
    
    // Reload page
    await page.reload();
    
    // Should still be English
    await expect(page.locator('main h1')).toContainText('Prepare');
    await expect(page.locator('header').getByRole('button', { name: 'ES' }).first()).toBeVisible();
  });

  test('should translate all pages', async ({ page }) => {
    await page.goto('/');
    await page.locator('header').getByRole('button', { name: 'EN' }).first().click();
    
    // Navigate to About page
    await navigateFromHeader(page, /about/i);
    await expect(page.locator('main h1')).toContainText('Socioeconomic Classification');
    
    // Navigate to Guide
    await navigateFromHeader(page, /guide/i);
    await expect(page).toHaveURL(/\/guide/);
    await expect(page.locator('main')).toContainText(/Before you start/i);
  });
});
