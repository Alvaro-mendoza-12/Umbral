import { expect, test, type Locator } from '@playwright/test';

async function controlContrast(target: Locator) {
  return target.evaluate(element => {
    const luminance = (color: string) => {
      const channels = (color.match(/[\d.]+/g) || []).slice(0, 3).map(Number)
        .map(value => value / 255)
        .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const ratio = (first: string, second: string) => {
      const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };
    const style = getComputedStyle(element);
    return {
      borderAgainstFill: ratio(style.borderTopColor, style.backgroundColor),
      borderAgainstPage: ratio(style.borderTopColor, getComputedStyle(document.body).backgroundColor),
      outlineWidth: Number.parseFloat(style.borderTopWidth),
    };
  });
}

test('doorway boundaries and unlit checklist segments have at least 3:1 contrast', async ({ page }) => {
  await page.goto('/guide/3');
  const upcoming = page.getByRole('navigation', { name: 'Pasos de la guía' }).locator('[data-journey-state="upcoming"]').first();
  const door = await controlContrast(upcoming);
  expect(door.outlineWidth).toBeGreaterThanOrEqual(1);
  expect(door.borderAgainstFill).toBeGreaterThanOrEqual(3);
  expect(door.borderAgainstPage).toBeGreaterThanOrEqual(3);

  await page.goto('/checklist');
  const unlit = await controlContrast(page.locator('[data-preparation-light="off"]').first());
  expect(unlit.outlineWidth).toBeGreaterThanOrEqual(1);
  expect(unlit.borderAgainstFill).toBeGreaterThanOrEqual(3);
  expect(unlit.borderAgainstPage).toBeGreaterThanOrEqual(3);
});
