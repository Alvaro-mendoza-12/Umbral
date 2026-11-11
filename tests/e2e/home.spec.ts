import { test, expect } from '@playwright/test';
import { navigateFromHeader } from './helpers';

test.describe('Home Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('main h1')).toHaveText('Los trámites públicos, más fáciles de entender');
    await expect(page.locator('main').getByRole('link', { name: 'Comenzar', exact: true })).toBeVisible();
  });

  test('should navigate to guide', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('main').getByRole('link', { name: 'Comenzar', exact: true }).click();
    await expect(page).toHaveURL(/\/guide/);
  });

  test('should display quick links', async ({ page }) => {
    await page.goto('/');
    
    // Check quick links section exists
    const quickLinksSection = page.locator('main section').filter({ hasText: /accesos rápidos/i });
    await expect(quickLinksSection).toBeVisible();
    
    // Verify links within main content area only
    await expect(page.locator('main').getByRole('link', { name: /¿qué es la cse\?/i })).toBeVisible();
    await expect(page.locator('main').getByRole('link', { name: /guía paso a paso/i })).toBeVisible();
    await expect(page.locator('main').getByRole('link', { name: /checklist de documentos/i })).toBeVisible();
    await expect(page.locator('main').getByRole('link', { name: /preguntas frecuentes/i })).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check main navigation exists
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Verify navigation links - using more specific selectors
    await expect(header.getByRole('link', { name: 'UMBRAL' })).toBeVisible();
    await navigateFromHeader(page, /acerca/i);
    await expect(page).toHaveURL('/about');
    await expect(page.locator('main h1')).toBeFocused();
  });
});
