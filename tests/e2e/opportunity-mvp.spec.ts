import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { opportunities } from '../../src/features/opportunities/data/peru';
import es from '../../src/locales/es/companion.json' with { type: 'json' };
import en from '../../src/locales/en/companion.json' with { type: 'json' };
import { setLanguage, expectReflow, captureReviewState, tabTo } from './helpers';

for (const language of ['es', 'en'] as const) {
  const copy = language === 'es' ? es : en;
  test(`complete discovery, preparation, persistence, download and printing in ${language}`, async ({ page, context }) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await context.addInitScript(() => { window.print = () => { document.body.dataset.printRequested = 'true'; }; });
    await page.goto('/'); await setLanguage(page, language);
    await expect(page.locator('main h1')).toHaveText(copy.question);
    const goals = page.getByRole('navigation', { name: copy.question });
    await expect(goals.getByRole('link')).toHaveCount(5);
    await goals.getByRole('link', { name: new RegExp(copy.goals.employment) }).click();
    await expect(page).toHaveURL(/\/discover\?.*category=employment/);
    await expect(page.locator('main article')).toHaveCount(1);
    await page.locator('main article').getByRole('link', { name: opportunities[1].title[language], exact: true }).click();
    await expect(page.locator('main h1')).toHaveText(opportunities[1].title[language]);
    await expect(page.getByText(opportunities[1].requirements[0].text[language], { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: copy.sources, exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: copy.official, exact: true })).toHaveAttribute('href', opportunities[1].officialUrl);
    await page.getByRole('button', { name: copy.save, exact: true }).click();
    await expect(page.getByRole('status')).toContainText(copy.saved);
    await page.getByRole('link', { name: copy.goRoute, exact: true }).click();
    const card = page.locator('main article');
    await expect(card.getByRole('progressbar')).toHaveAttribute('value', '0');
    await card.getByRole('checkbox').first().check();
    await card.getByRole('checkbox').nth(1).check();
    const task = language === 'es' ? 'Revisar mi lista de preguntas' : 'Review my list of questions';
    await card.getByLabel(copy.taskLabel, { exact: true }).fill(task);
    await card.getByRole('button', { name: copy.addTask, exact: true }).click();
    await card.getByRole('checkbox', { name: task, exact: true }).check();
    await expect(card.getByRole('progressbar')).toHaveAttribute('value', '3');
    await expect(card.getByRole('progressbar')).toHaveAttribute('max', '4');
    await page.reload();
    await expect(card.getByRole('checkbox', { name: task, exact: true })).toBeChecked();
    await expect(card.getByRole('progressbar')).toHaveAttribute('value', '3');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: copy.download, exact: true }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('umbral-mi-ruta.txt');
    const downloaded = await readFile((await download.path())!, 'utf8');
    expect(downloaded).toContain(`[x] ${task}`);
    expect(downloaded).toContain(opportunities[1].officialUrl);
    expect(downloaded).toContain(copy.progressNote);
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: copy.print, exact: true }).click();
    const popup = await popupPromise;
    await expect(popup.locator('html')).toHaveAttribute('lang', language);
    await expect(popup.locator('body')).toHaveAttribute('data-print-requested', 'true');
    await expect(popup.getByText(`[${copy.completed}] ${task}`, { exact: true })).toBeVisible();
    await expect(popup.getByText(opportunities[1].officialUrl, { exact: true })).toBeVisible();
    await popup.close();
    await card.getByRole('button', { name: copy.removeTask.replace('{{title}}', task), exact: true }).click();
    await expect(card.getByRole('progressbar')).toHaveAttribute('value', '2');
    await expect(card.getByRole('progressbar')).toHaveAttribute('max', '3');
    page.once('dialog', dialog => dialog.accept());
    await card.getByRole('button', { name: copy.remove, exact: true }).click();
    await expect(page.getByText(copy.emptyRoute, { exact: true })).toBeVisible();
    await page.reload(); await expect(page.locator('main article')).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test(`all five filters, reset, empty results and unsupported countries in ${language}`, async ({ page }) => {
    await page.goto('/discover'); await setLanguage(page, language);
    const filters = page.locator('main details').first();
    if (!(await filters.evaluate(element => (element as HTMLDetailsElement).open))) await filters.locator('summary').click();
    await page.getByLabel(copy.region, { exact: true }).selectOption('PE-140101');
    await expect(page.locator('main article')).toHaveCount(1);
    await expect(page.locator('main article h2')).toContainText('CSE');
    await page.getByLabel(copy.category, { exact: true }).selectOption('employment');
    await expect(page.getByText(copy.noResults, { exact: true })).toBeVisible();
    await page.getByRole('button', { name: copy.resetFilters, exact: true }).click();
    await expect(page.locator('main article')).toHaveCount(5);
    await page.getByLabel(copy.audience, { exact: true }).selectOption('learners');
    await expect(page.locator('main article')).toHaveCount(1);
    await expect(page.locator('main article h2')).toContainText('Capacíta-T');
    await page.getByRole('button', { name: copy.resetFilters, exact: true }).click();
    await expect(page.getByLabel(copy.audience, { exact: true })).toHaveValue('');
    await page.getByLabel(copy.callStatus, { exact: true }).selectOption('closed');
    await expect(page.locator('main article')).toHaveCount(1);
    await expect(page.locator('main article')).toContainText('2027');
    await page.reload(); await expect(page.getByLabel(copy.callStatus, { exact: true })).toHaveValue('closed');
    for (const country of ['MX', 'CO', 'ES']) {
      await page.getByRole('combobox', { name: copy.country, exact: true }).selectOption(country);
      await expect(page.getByText(copy.noCountry, { exact: true })).toBeVisible();
      await expect(page.locator('main article')).toHaveCount(0);
      await expect(page.locator('main')).not.toContainText(/S100|SISFOH|DNI/);
      await expect(page).toHaveURL(new RegExp(`country=${country}$`));
    }
    await page.getByRole('button', { name: copy.returnPeru, exact: true }).click();
    await expect(page.locator('main article')).toHaveCount(5);
    await expect(page).toHaveURL(/country=PE$/);
  });

  test(`each real record has requirements, sources, date and the correct kind in ${language}`, async ({ page }) => {
    for (const opportunity of opportunities) {
      await page.goto(`/opportunities/${opportunity.id}`); await setLanguage(page, language);
      await expect(page.locator('main h1')).toHaveText(opportunity.title[language]);
      for (const requirement of opportunity.requirements) await expect(page.getByText(requirement.text[language], { exact: true })).toBeVisible();
      for (const condition of opportunity.conditions) await expect(page.getByText(condition.text[language], { exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: copy.official, exact: true })).toHaveAttribute('href', opportunity.officialUrl);
      await expect(page.getByText(copy.kinds[opportunity.kind], { exact: true })).toBeVisible();
      await expectReflow(page);
      if (opportunity.id === 'beca-18-2027') await expect(page.getByText(copy.status.closed, { exact: true })).toBeVisible();
      if (opportunity.id === 'cse-peru') {
        await page.getByRole('link', { name: copy.cseGuide, exact: true }).click();
        await expect(page).toHaveURL('/cse');
        await page.locator('main').getByRole('link', { name: language === 'es' ? 'Comenzar' : 'Start', exact: true }).click();
        await expect(page).toHaveURL('/guide/1');
      }
    }
  });

  for (const route of ['/', '/discover', '/opportunities/beca-18-2027', '/my-route']) {
    test(`WCAG rules and responsive layout for ${route} in ${language}`, async ({ page }) => {
      await page.goto('/opportunities/capacita-t'); await setLanguage(page, language);
      await page.getByRole('button', { name: copy.save, exact: true }).click();
      await page.goto(route);
      await expectReflow(page);
      await expect(page.locator('main').getByRole('heading', { level: 1 })).toHaveCount(1);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(result.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) }))).toEqual([]);
      await captureReviewState(page, `opportunity-${route.replaceAll('/', '-') || 'home'}-${language}`);
      await page.addStyleTag({ content: ':root { font-size: 200% !important; }' });
      await expectReflow(page);
    });
  }
}

test('keyboard can choose a goal, while unknown countries and records never fall back', async ({ page }) => {
  await page.goto('/');
  const goal = page.getByRole('navigation', { name: es.question }).getByRole('link').first();
  await tabTo(page, goal); await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/category=education/);
  await expect(page.locator('main h1')).toBeFocused();
  await page.goto('/discover?country=ZZ');
  await expect(page.locator('main article')).toHaveCount(0);
  await expect(page.getByText(es.noCountry, { exact: true })).toBeVisible();
  await page.goto('/opportunities/missing');
  await expect(page.locator('main h1')).toHaveText(es.notFound);
  await expect(page.getByRole('button', { name: es.save, exact: true })).toHaveCount(0);
});

test('route is usable with blocked storage, rejects corrupt data and escapes custom tasks in print', async ({ page, context }) => {
  await page.goto('/my-route');
  for (const invalid of ['null', '[]', '{"version":1,"entries":{"fake":{"completedStepIds":["all"]}}}']) {
    await page.evaluate(value => localStorage.setItem('umbral:myRoute:v1', value), invalid);
    await page.reload(); await expect(page.getByText(es.emptyRoute, { exact: true })).toBeVisible();
  }
  await context.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException('Blocked', 'QuotaExceededError'); }; window.print = () => {}; });
  await page.goto('/opportunities/capacita-t');
  await page.getByRole('button', { name: es.save, exact: true }).click();
  await expect(page.getByText(es.storageUnavailable, { exact: true })).toBeVisible();
  await page.getByRole('link', { name: es.goRoute, exact: true }).click();
  const task = '<img src=x onerror=alert(1)>';
  await page.getByLabel(es.taskLabel, { exact: true }).fill(task);
  await page.getByRole('button', { name: es.addTask, exact: true }).click();
  await expect(page.locator('main img')).toHaveCount(0);
  await page.getByRole('checkbox', { name: task, exact: true }).check();
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect(page.getByRole('checkbox', { name: task, exact: true })).toBeChecked();
  const popupPromise = page.waitForEvent('popup'); await page.getByRole('button', { name: es.print, exact: true }).click();
  const popup = await popupPromise; await expect(popup.locator('img')).toHaveCount(0); await expect(popup.locator('body')).toContainText(task); await popup.close();
});
