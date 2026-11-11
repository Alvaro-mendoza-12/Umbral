import { test, expect } from '@playwright/test';

test.describe('Checklist', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checklist');
    // Clear any stored state
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display progress correctly', async ({ page }) => {
    // Initial progress should be 0%
    await expect(page.locator('text=/0%/i').or(page.locator('text=/progreso/i'))).toBeVisible();
  });

  test('should check and uncheck items', async ({ page }) => {
    // Find first checkbox
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    
    // Check it
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();
    
    // Uncheck it
    await firstCheckbox.uncheck();
    await expect(firstCheckbox).not.toBeChecked();
  });

  test('should persist checked items', async ({ page }) => {
    // Check first item
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();
    
    // Reload page
    await page.reload();
    
    // Should still be checked
    const firstCheckboxAfterReload = page.locator('input[type="checkbox"]').first();
    await expect(firstCheckboxAfterReload).toBeChecked();
  });

  test('should reset checklist with confirmation', async ({ page }) => {
    // Check some items first
    await page.locator('input[type="checkbox"]').first().check();
    await page.locator('input[type="checkbox"]').nth(1).check();
    
    // Find and click reset button
    page.on('dialog', dialog => dialog.accept());
    await page.locator('button', { hasText: /reiniciar|reset/i }).first().click();
    
    // All checkboxes should be unchecked
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).not.toBeChecked();
    }
  });
});
