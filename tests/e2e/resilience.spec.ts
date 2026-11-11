import { test, expect } from '@playwright/test';
import { navigateFromHeader } from './helpers';

test('invalid guide paths recover without a rendering exception', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const path of ['/guide/0', '/guide/6', '/guide/abc', '/guide/1.5', '/guide/02']) {
    await page.goto(path);
    await expect(page).toHaveURL('/guide/1');
    await expect(page.locator('main h2[data-route-focus]')).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('corrupt checklist storage cannot crash or invent completed tasks', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  for (const value of ['null', '[]', '"not a checklist"', '{"unknown":true,"dni_holder":"yes"}']) {
    await page.evaluate(value => localStorage.setItem('umbral:checklist', value), value);
    await page.goto('/checklist');
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    await expect(page.getByRole('checkbox')).toHaveCount(11);
  }
  expect(errors).toEqual([]);
});

test('checklist stays usable and explains when saving is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException('Storage is blocked', 'QuotaExceededError'); };
  });
  await page.goto('/checklist');
  const first = page.getByRole('checkbox').first();
  await first.check();
  await expect(first).toBeChecked();
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  await expect(page.locator('main').getByRole('status')).toContainText(/no puede guardar/i);
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect(first).toBeChecked();
});

test('another tab clearing storage resets the visible checklist', async ({ page, context }) => {
  await page.goto('/checklist');
  await page.getByRole('checkbox').first().check();
  const other = await context.newPage();
  await other.goto('/');
  await other.evaluate(() => localStorage.removeItem('umbral:checklist'));
  await expect(page.getByRole('checkbox').first()).not.toBeChecked();
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  await other.close();
});

test('mobile disclosure closes with Escape and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /abrir menú/i });
  await toggle.click();
  await expect(page.getByRole('button', { name: /cerrar menú/i })).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('resizing an open mobile menu cannot leave a blocking overlay', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /abrir menú/i }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole('button', { name: /abrir menú/i })).not.toBeVisible();
  await navigateFromHeader(page, /acerca/i);
  await expect(page).toHaveURL('/about');
});

test('previously loaded production app supports offline deep links and English', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise<void>(resolve => navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true }));
    }
  });
  await context.setOffline(true);
  await page.goto('/guide/2');
  await expect(page.locator('main').getByRole('heading', { level: 1 })).toBeVisible();
  await page.locator('header').first().getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/resources');
  await expect(page.locator('main').getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await context.setOffline(false);
});
