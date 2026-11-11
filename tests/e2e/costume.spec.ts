import { expect, test, type Locator, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type Language = 'es' | 'en';

const copy = {
  es: {
    homeNavigation: 'Tu recorrido de preparación',
    stepsNavigation: 'Pasos de la guía',
    currentPosition: 'Estás aquí',
    shortTitles: ['Inicio', 'Reunir', 'Datos', 'Acudir', 'Después'],
    titles: [
      'Antes de empezar',
      'Documentos que debo reunir',
      'Información que me solicitarán',
      'Dónde y cómo hacer la solicitud',
      'Después de la solicitud',
    ],
  },
  en: {
    homeNavigation: 'Your preparation route',
    stepsNavigation: 'Guide steps',
    currentPosition: 'You are here',
    shortTitles: ['Start', 'Gather', 'Details', 'Request', 'After'],
    titles: [
      'Before you start',
      'Documents I need to gather',
      'Information they will request from me',
      'Where and how to submit the application',
      'After the application',
    ],
  },
} satisfies Record<Language, {
  homeNavigation: string;
  stepsNavigation: string;
  currentPosition: string;
  shortTitles: string[];
  titles: string[];
}>;

async function openRoute(page: Page, path: string, language: Language = 'es') {
  await page.goto(path);
  if (language === 'en') {
    await page.locator('header').first().getByRole('button', { name: 'English', exact: true }).click();
  }
  await expect(page.locator('html')).toHaveAttribute('lang', language);
}

function guideNavigation(page: Page, language: Language) {
  return page.locator('main').getByRole('navigation', {
    name: copy[language].stepsNavigation,
    exact: true,
  });
}

async function captureState(page: Page, name: 'guide-current' | 'checklist-partial') {
  await page.evaluate(async () => {
    await document.fonts.ready;
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo(0, 0);
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  });
  await page.screenshot({ path: `${process.env.UMBRAL_SCREENSHOTS_DIR || 'audit/costume-contest/after'}/${test.info().project.name}/${name}.png`, fullPage: true });
}

async function expectVisibleGuideLabelsInNames(page: Page, language: Language) {
  const buttons = guideNavigation(page, language).getByRole('button');
  await expect(buttons).toHaveCount(5);
  for (let index = 0; index < 5; index++) {
    const button = buttons.nth(index);
    const shortTitle = copy[language].shortTitles[index];
    await expect(button.getByText(shortTitle, { exact: true })).toBeVisible();
    await expect(button).toHaveAccessibleName(new RegExp(shortTitle));
  }
}

async function expectGuidePosition(page: Page, language: Language, currentStep: number) {
  const navigation = guideNavigation(page, language);
  const buttons = navigation.getByRole('button');
  await expect(buttons).toHaveCount(5);
  await expect(navigation.locator('[aria-current="step"]')).toHaveCount(1);

  for (let index = 0; index < 5; index++) {
    const button = buttons.nth(index);
    const state = index + 1 < currentStep ? 'previous' : index + 1 === currentStep ? 'current' : 'upcoming';
    await expect(button).toHaveAccessibleName(new RegExp(copy[language].titles[index]));
    await expect(button).toHaveAttribute('data-journey-state', state);
    if (index + 1 === currentStep) {
      await expect(button).toHaveAttribute('aria-current', 'step');
      await expect(button.getByText(copy[language].currentPosition, { exact: true })).toBeVisible();
    } else {
      await expect(button).not.toHaveAttribute('aria-current', 'step');
      // Earlier pages describe position in the guide, not verified procedures.
      await expect(button).not.toHaveAccessibleName(/completad|verificad|aprobado|completed|verified|approved/i);
    }
  }

  await expect(navigation.getByText(copy[language].currentPosition, { exact: true })).toHaveCount(1);
  const progress = page.locator('main').getByRole('progressbar');
  await expect(progress).toHaveAttribute('aria-valuenow', String(currentStep));
  await expect(progress).toHaveAttribute('aria-valuemax', '5');
  await expect(progress).toHaveAttribute(
    'aria-valuetext',
    language === 'es' ? `Paso ${currentStep} de 5` : `Step ${currentStep} of 5`,
  );
}

async function expectPreparation(page: Page, completed: number, language: Language = 'es') {
  const progress = page.locator('main').getByRole('progressbar');
  await expect(progress).toHaveAttribute('aria-valuemin', '0');
  await expect(progress).toHaveAttribute('aria-valuemax', '11');
  await expect(progress).toHaveAttribute('aria-valuenow', String(completed));
  await expect(progress).toHaveAttribute(
    'aria-valuetext',
    language === 'es' ? `${completed} de 11 completados` : `${completed} of 11 completed`,
  );
  await expect(page.getByRole('checkbox')).toHaveCount(11);
  await expect(page.getByRole('checkbox', { checked: true })).toHaveCount(completed);

  // The progress role can remain on the fill while the decorative lights are siblings.
  const track = progress.locator('..');
  const lights = track.locator('span[data-preparation-light]');
  await expect(lights).toHaveCount(11);
  await expect(track.locator('span[data-preparation-light="on"]')).toHaveCount(completed);
  await expect(track.locator('span[data-preparation-light="off"]')).toHaveCount(11 - completed);
  expect(await lights.evaluateAll(elements => elements.every(element => element.closest('[aria-hidden="true"]')))).toBe(true);
}

async function tabTo(page: Page, target: Locator) {
  // Bound traversal by the available controls, so an unreachable gateway fails clearly.
  const controls = await page.locator('a[href], button, input, select, textarea, summary, [tabindex="0"]').count();
  for (let attempt = 0; attempt <= controls; attempt++) {
    if (await target.evaluate(element => element === document.activeElement)) break;
    await page.keyboard.press('Tab');
  }
  await expect(target).toBeFocused();
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const overflow = Array.from(document.querySelectorAll<HTMLElement>('main h1, main h2, main button, main label, main [role="progressbar"]'))
      .filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.left < -1 || rect.right > viewport + 1 || element.scrollWidth > element.clientWidth + 1);
      })
      .map(element => element.textContent?.trim() || element.getAttribute('aria-label') || element.tagName);
    if (document.documentElement.scrollWidth > viewport) overflow.push('document');
    return overflow;
  })).toEqual([]);
}

async function expectReducedProgressMotion(page: Page) {
  const progress = page.locator('main').getByRole('progressbar');
  await expect.poll(() => progress.locator('..').evaluate(track =>
    [track, ...track.querySelectorAll('*')]
      .map(element => getComputedStyle(element).transitionDuration)
      .filter(duration => duration.split(',').some(value => Number.parseFloat(value) !== 0)),
  )).toEqual([]);
}

test.describe('The Illuminated Threshold', () => {
  for (const language of ['es', 'en'] as const) {
    test(`Home exposes five named preparation gateways in ${language}`, async ({ page }) => {
      await openRoute(page, '/', language);
      const navigation = page.locator('main').getByRole('navigation', {
        name: copy[language].homeNavigation,
        exact: true,
      });
      const summary = page.locator('main summary').filter({
        hasText: language === 'es' ? 'Ver los cinco pasos' : 'View the five steps',
      });
      await expect(summary.locator('..')).not.toHaveAttribute('open');
      await expect(navigation).not.toBeVisible();
      await summary.click();
      const links = navigation.getByRole('link');
      await expect(links).toHaveCount(5);

      for (let step = 1; step <= 5; step++) {
        const gateway = links.nth(step - 1);
        await expect(gateway).toBeVisible();
        await expect(gateway).toHaveAttribute('href', `/guide/${step}`);
        await expect(gateway).toHaveAccessibleName(new RegExp(`(?:^|\\D)0?${step}(?:\\D|$)`));
        await expect(gateway).toHaveAccessibleName(/\p{L}{3,}/u);
      }
    });

    test(`a direct visit to guide 3 labels position without completing tasks in ${language}`, async ({ page }) => {
      await openRoute(page, '/guide/3', language);
      await expect(page.locator('main article').getByRole('heading', { level: 2 })).toHaveText(copy[language].titles[2]);
      await expectGuidePosition(page, language, 3);
      if (language === 'es') {
        await captureState(page, 'guide-current');
      }

      await page.setViewportSize({ width: 320, height: 844 });
      await expectVisibleGuideLabelsInNames(page, language);

      await guideNavigation(page, language).getByRole('button', { name: new RegExp(copy[language].titles[0]) }).click();
      await expect(page).toHaveURL('/guide/1');
      await expectGuidePosition(page, language, 1);
      await expect(page.locator('main article').getByRole('heading', { level: 2 })).toBeFocused();

      await page.goto('/checklist');
      await expectPreparation(page, 0, language);
    });
  }

  test('keyboard users can reach the Home gateways and enter the selected step', async ({ page }) => {
    await openRoute(page, '/');
    await page.keyboard.press('Tab');
    const skip = page.locator('a[href="#main-content"]');
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();

    const summary = page.locator('main summary').filter({ hasText: 'Ver los cinco pasos' });
    await tabTo(page, summary);
    await page.keyboard.press('Enter');
    const gateways = page.locator('main').getByRole('navigation', { name: copy.es.homeNavigation, exact: true }).getByRole('link');
    await expect(gateways).toHaveCount(5);
    await tabTo(page, gateways.first());
    await page.keyboard.press('Tab');
    await expect(gateways.nth(1)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(gateways.nth(2)).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL('/guide/3');
    await expect(page.locator('main article').getByRole('heading', { level: 2 })).toHaveText(copy.es.titles[2]);
    await expect(page.locator('main article').getByRole('heading', { level: 2 })).toBeFocused();
    await expectGuidePosition(page, 'es', 3);
  });

  test('each checked document lights one segment, persists, reaches eleven, and resets', async ({ page }) => {
    await openRoute(page, '/checklist');
    await expectPreparation(page, 0);
    const checkboxes = page.getByRole('checkbox');
    await checkboxes.first().check();
    await expectPreparation(page, 1);
    // A nonadjacent item catches a meter driven by item index instead of checked count.
    await checkboxes.nth(7).check();
    await expectPreparation(page, 2);
    await captureState(page, 'checklist-partial');

    await page.reload();
    await expect(checkboxes.first()).toBeChecked();
    await expect(checkboxes.nth(7)).toBeChecked();
    await expectPreparation(page, 2);

    for (let index = 0; index < 11; index++) {
      const checkbox = checkboxes.nth(index);
      if (!(await checkbox.isChecked())) await checkbox.check();
    }
    await expectPreparation(page, 11);
    await expect(page.locator('main').getByText(
      'Cada luz representa una casilla marcada. Prepararte no significa que tu solicitud esté aprobada.',
      { exact: true },
    )).toBeVisible();

    await Promise.all([
      page.waitForEvent('dialog').then(async dialog => {
        expect(dialog.type()).toBe('confirm');
        await dialog.accept();
      }),
      page.locator('main').getByRole('button', { name: 'Reiniciar checklist', exact: true }).click(),
    ]);
    await expectPreparation(page, 0);
    await page.reload();
    await expectPreparation(page, 0);
  });

  for (const route of ['/guide/4', '/checklist']) {
    test(`English ${route} has no axe violations with the mobile menu open`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await openRoute(page, route, 'en');
      if (route === '/checklist') {
        await page.getByRole('checkbox').first().check();
        await page.getByRole('checkbox').nth(7).check();
        await expectPreparation(page, 2, 'en');
      } else {
        await expectGuidePosition(page, 'en', 4);
      }

      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Close menu', exact: true })).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('navigation', { name: 'Main navigation', exact: true })).toBeVisible();
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(result.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(node => node.target) }))).toEqual([]);
    });
  }

  test('reduced motion removes progress transitions during actual state changes', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openRoute(page, '/guide/3');
    await guideNavigation(page, 'es').getByRole('button', { name: new RegExp(copy.es.titles[3]) }).click();
    await expectGuidePosition(page, 'es', 4);
    await expectReducedProgressMotion(page);

    await page.goto('/checklist');
    await page.getByRole('checkbox').first().check();
    await expectPreparation(page, 1);
    await expectReducedProgressMotion(page);
  });

  test('forced colors keeps the textual current position and preparation controls usable', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await openRoute(page, '/guide/3');
    await expectGuidePosition(page, 'es', 3);
    const previousStep = guideNavigation(page, 'es').getByRole('button', { name: new RegExp(copy.es.titles[1]) });
    await previousStep.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/guide/2');
    await expectGuidePosition(page, 'es', 2);

    await page.goto('/checklist');
    const checkbox = page.getByRole('checkbox').first();
    await checkbox.focus();
    await page.keyboard.press('Space');
    await expect(checkbox).toBeChecked();
    await expectPreparation(page, 1);
    await page.keyboard.press('Space');
    await expectPreparation(page, 0);
  });

  for (const route of ['/guide/4', '/checklist']) {
    test(`320px reflow keeps the current English ${route} controls readable and reachable`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 844 });
      await openRoute(page, route, 'en');
      if (route === '/guide/4') {
        await expectGuidePosition(page, 'en', 4);
        const currentStep = guideNavigation(page, 'en').getByRole('button', { name: new RegExp(copy.en.titles[3]) });
        await currentStep.scrollIntoViewIfNeeded();
        await expect(currentStep).toBeInViewport();
      } else {
        await page.getByRole('checkbox').first().check();
        const lastCheckbox = page.getByRole('checkbox').last();
        await lastCheckbox.check();
        await expect(lastCheckbox).toBeInViewport();
        await expectPreparation(page, 2, 'en');
      }
      await expectNoHorizontalOverflow(page);
    });
  }
});
