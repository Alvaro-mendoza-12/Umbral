import { test, expect } from '@playwright/test';
import { navigateFromHeader } from './helpers';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/cse');
    
    // About - use header navigation
    await navigateFromHeader(page, /acerca/i);
    await expect(page).toHaveURL('/about');
    await expect(page.locator('main h1')).toContainText('Clasificación Socioeconómica');
    
    // Guide
    await navigateFromHeader(page, /guía/i);
    await expect(page).toHaveURL(/\/guide/);
    
    // Checklist
    await navigateFromHeader(page, /checklist/i);
    await expect(page).toHaveURL('/checklist');
    
    // Resources
    await navigateFromHeader(page, /recursos/i);
    await expect(page).toHaveURL('/resources');
    
    // FAQ
    await navigateFromHeader(page, /preguntas/i);
    await expect(page).toHaveURL('/faq');
    
    // Back home via logo
    await page.locator('header').getByRole('link', { name: 'UMBRAL' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should handle 404 pages', async ({ page }) => {
    await page.goto('/non-existent-page');
    
    await expect(page.locator('main')).toContainText('404');
    await expect(page.locator('main')).toContainText(/página no encontrada/i);
    
    // Should have link back home
    await page.locator('main').getByRole('link', { name: /volver al inicio/i }).click();
    await expect(page).toHaveURL('/');
  });
});
