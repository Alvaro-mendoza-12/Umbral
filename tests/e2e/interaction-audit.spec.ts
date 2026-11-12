import { expect, test } from '@playwright/test';
import es from '../../src/locales/es/translation.json' with { type: 'json' };
import en from '../../src/locales/en/translation.json' with { type: 'json' };
import { setLanguage } from './helpers';

const routes = ['/', '/about', '/guide/1', '/guide/2', '/guide/3', '/guide/4', '/guide/5', '/checklist', '/resources', '/faq', '/not-found-product-review'];

for (const language of ['es', 'en'] as const) {
  test(`all internal hyperlinks resolve and controls have names across the seven pages and guide steps in ${language}`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const destinations = new Map<string, { source: string; name: string }>();
    const inventory: Array<{ source: string; links: number; buttons: number }> = [];
    const translations = language === 'es' ? es : en;

    for (const route of routes) {
      await page.goto(route);
      await setLanguage(page, language);
      await expect(page.locator('main').getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.locator('body > #root footer').getByText(translations.footer.disclaimer, { exact: true })).toBeVisible();
      await expect(page.locator('main input:not([type="checkbox"]), main textarea, main input[type="file"]')).toHaveCount(0);

      // Include controls revealed on demand and the mobile navigation in the audit.
      const summaries = page.locator('main summary');
      for (let index = 0; index < await summaries.count(); index++) {
        await summaries.nth(index).click();
      }
      const menu = page.getByRole('button', { name: language === 'es' ? 'Abrir menú' : 'Open menu', exact: true });
      if (await menu.isVisible()) await menu.click();
      const links = page.getByRole('link');
      for (let index = 0; index < await links.count(); index++) {
        const link = links.nth(index);
        await expect(link).toHaveAccessibleName(/\S/);
        const href = await link.getAttribute('href');
        expect(href, `nonempty href at ${route}`).toBeTruthy();
        const url = new URL(href!, page.url());
        if (url.origin === new URL(page.url()).origin) {
          if (!href!.startsWith('#')) {
            const destination = `${url.pathname}${url.search}${url.hash}`;
            if (!destinations.has(destination)) destinations.set(destination, { source: route, name: (await link.innerText()).trim() });
          }
        } else {
          expect(url.protocol).toBe('https:');
          if (await link.getAttribute('target') === '_blank') {
            await expect(link).toHaveAttribute('rel', /noopener/);
          }
        }
      }
      const buttons = page.getByRole('button');
      for (let index = 0; index < await buttons.count(); index++) {
        await expect(buttons.nth(index)).toHaveAccessibleName(/\S/);
      }
      inventory.push({ source: route, links: await links.count(), buttons: await buttons.count() });
    }

    // Click each distinct destination from a real rendered link, including the
    // collapsed Home gateways. A successful SPA HTTP response alone is insufficient.
    for (const [destination, { source }] of destinations) {
      await page.goto(source);
      await setLanguage(page, language);
      const summaries = page.locator('main summary');
      for (let index = 0; index < await summaries.count(); index++) await summaries.nth(index).click();
      const menu = page.getByRole('button', { name: language === 'es' ? 'Abrir menú' : 'Open menu', exact: true });
      if (await menu.isVisible()) await menu.click();
      const target = page.locator('a[href]');
      // Match URL values directly, avoiding selectors interpolated from link text.
      const candidate = await target.evaluateAll((elements, expected) => elements.findIndex(element => {
        const url = new URL((element as HTMLAnchorElement).href);
        return element.getClientRects().length > 0 && `${url.pathname}${url.search}${url.hash}` === expected;
      }), destination);
      expect(candidate, `rendered link to ${destination} from ${source}`).toBeGreaterThanOrEqual(0);
      if (!(await target.nth(candidate).evaluate(element => Boolean(element.closest('header'))))) {
        const closeMenu = page.getByRole('button', { name: language === 'es' ? 'Cerrar menú' : 'Close menu', exact: true });
        if (await closeMenu.isVisible()) await closeMenu.click();
      }
      await target.nth(candidate).click();
      await expect.poll(() => new URL(page.url()).pathname).toBe(destination === '/guide' ? '/guide/1' : new URL(destination, page.url()).pathname);
      await expect(page.locator('main').getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('main').getByRole('heading', { level: 1 })).not.toHaveText('404');
    }

    await page.goto('/not-found-product-review');
    await setLanguage(page, language);
    await expect(page.locator('main h1')).toHaveText('404');
    await expect(page.locator('main h2')).toHaveText(translations.notFound.title);
    await page.locator('main').getByRole('link', { name: translations.notFound.backHome, exact: true }).click();
    await expect(page).toHaveURL('/');
    expect(errors).toEqual([]);
    await testInfo.attach('interaction-inventory', {
      body: JSON.stringify({ language, inventory, destinations: [...destinations] }, null, 2),
      contentType: 'application/json',
    });
  });
}
