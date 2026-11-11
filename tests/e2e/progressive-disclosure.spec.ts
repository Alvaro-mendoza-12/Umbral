import { expect, test, type Locator, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import es from '../../src/content/pe/cse/es.json' with { type: 'json' };
import en from '../../src/content/pe/cse/en.json' with { type: 'json' };
import { checklistItems } from '../../src/content/pe/cse/checklist';
import { officialSources, uleChiclayoInfo } from '../../src/content/pe/cse/sources';
import { captureReviewState, expectReflow, setLanguage, tabTo } from './helpers';

const content = { es, en };

async function openWithKeyboard(page: Page, summary: Locator) {
  const details = summary.locator('..');
  await expect(details).not.toHaveAttribute('open');
  await tabTo(page, summary);
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
  await expect(summary).toBeFocused();
  return details;
}

async function expectParagraph(scope: Locator, paragraph: string) {
  const lines = paragraph.split('\n');
  if (lines.every(line => /^(?:- |\d+\. )/.test(line))) {
    for (const line of lines) {
      await expect(scope.getByRole('listitem').filter({ hasText: line.replace(/^(?:- |\d+\. )/, '') })).toBeVisible();
    }
  } else {
    await expect(scope.getByText(paragraph, { exact: true })).toBeVisible();
  }
}

for (const language of ['es', 'en'] as const) {
  test(`About keeps its summary, action and complete legal details in ${language}`, async ({ page }) => {
    await page.goto('/about');
    await setLanguage(page, language);
    const main = page.locator('main');
    const about = content[language].about;
    await expect(main.getByText(about.definition.content, { exact: true })).toBeVisible();
    await expect(main.getByText(about.important.notes[0], { exact: true })).toBeVisible();
    await expect(main.getByRole('link', { name: about.cta, exact: true })).toHaveAttribute('href', '/guide');
    await expect(main.locator('details')).toHaveCount(3);
    for (const section of [about.purpose, about.whoCanApply, about.important]) {
      const summary = main.locator('summary').filter({ hasText: section.title });
      await openWithKeyboard(page, summary);
    }
    await expect(main.getByText(about.purpose.content, { exact: true })).toBeVisible();
    await expect(main.getByText(about.whoCanApply.content, { exact: true })).toBeVisible();
    for (const text of [...about.purpose.examples, ...about.whoCanApply.requirements, ...about.important.notes.slice(1)]) {
      await expect(main.getByText(text, { exact: true })).toBeVisible();
    }
    const firstSummary = main.locator('summary').first();
    await tabTo(page, firstSummary);
    await page.keyboard.press('Space');
    await expect(firstSummary.locator('..')).not.toHaveAttribute('open');
    await expect(main.getByText(about.purpose.content, { exact: true })).not.toBeVisible();
    await page.keyboard.press('Space');
    await expect(main.getByText(about.purpose.content, { exact: true })).toBeVisible();
    await expectReflow(page);
  });

  test(`all five guide steps preserve the complete country-specific text behind keyboard disclosures in ${language}`, async ({ page }) => {
    test.setTimeout(60_000);
    for (let step = 1; step <= 5; step++) {
      await page.goto(`/guide/${step}`);
      await setLanguage(page, language);
      const article = page.locator('main article');
      const stepContent = content[language].guide.steps[step - 1];
      await expect(article.getByRole('heading', { level: 2 })).toHaveText(stepContent.title);
      await expectParagraph(article, stepContent.content.split('\n\n')[0]);
      const paragraphs = stepContent.content.split('\n\n');
      const sectionTitles = paragraphs.filter(paragraph => paragraph.startsWith('**') && paragraph.endsWith('**')).map(title => title.slice(2, -2));
      await expect(article.locator('details')).toHaveCount(sectionTitles.length);
      await expect(article.locator('details[open]')).toHaveCount(0);
      await expect(article).toContainText(language === 'es'
        ? 'No ingreses datos personales aquí.'
        : 'Do not enter personal information here.');
      for (const title of sectionTitles) {
        await openWithKeyboard(page, article.locator('summary').filter({ hasText: title }));
      }
      for (const paragraph of paragraphs.filter(text => !text.startsWith('**'))) {
        await expectParagraph(article, paragraph);
      }
      if (step === 4) {
        const submissionTitle = language === 'es' ? 'Al presentar tu solicitud' : 'When submitting your application';
        const submission = article.locator('details').filter({ has: page.locator('summary').filter({ hasText: submissionTitle }) });
        await expect(submission.getByRole('listitem')).toHaveCount(5);
        await expect(submission.getByRole('listitem').nth(1)).toContainText('S100');
        await captureReviewState(page, `guide-submission-open-${language}`);
      }
      await expectReflow(page);
    }
  });

  test(`all eleven checklist titles remain visible and details stay outside checkbox names in ${language}`, async ({ page }) => {
    await page.goto('/checklist');
    await setLanguage(page, language);
    const main = page.locator('main');
    await expect(main.getByRole('checkbox')).toHaveCount(11);
    await expect(main.getByText(content[language].checklist.description, { exact: true })).toBeVisible();
    for (const item of checklistItems) {
      const checkbox = main.getByRole('checkbox', { name: item.item[language], exact: true });
      await expect(checkbox).toBeVisible();
      const row = checkbox.locator('..').locator('..');
      await expect(row.locator('label summary')).toHaveCount(0);
      const detail = row.getByText(item.description![language], { exact: true });
      await expect(detail).not.toBeVisible();
      const summary = row.locator('summary');
      await expect(summary).toHaveAccessibleName(new RegExp(item.item[language].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      await openWithKeyboard(page, summary);
      await expect(detail).toBeVisible();
      await expect(checkbox).not.toBeChecked();
    }
    const checkbox = main.getByRole('checkbox').first();
    await tabTo(page, checkbox);
    await page.keyboard.press('Space');
    await expect(checkbox).toBeChecked();
    await expect(main.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
    await captureReviewState(page, `checklist-details-open-${language}`);
    await expectReflow(page);
  });

  test(`Resources exposes five official links and dates before optional certainty and local guidance in ${language}`, async ({ page }) => {
    await page.goto('/resources');
    await setLanguage(page, language);
    const main = page.locator('main');
    const resources = content[language].resources;
    await expect(main.getByText(resources.description, { exact: true }).first()).toBeVisible();
    await expect(main.getByRole('button', { name: resources.prepSheet.printButton, exact: true })).toBeVisible();
    await expect(main.getByText(resources.disclaimer.content, { exact: true }).first()).toBeVisible();
    for (const source of officialSources) {
      const heading = main.getByRole('heading', { name: source.name[language], exact: true });
      await expect(heading).toBeVisible();
      const card = heading.locator('..');
      const link = card.getByRole('link');
      await expect(link).toHaveAttribute('href', source.url!);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
      await expect(link).toBeVisible();
      await expect(card.getByText(new RegExp(source.verifiedDate))).toBeVisible();
      await expect(card.getByText(source.description![language], { exact: true })).not.toBeVisible();
      await openWithKeyboard(page, card.locator('summary'));
      await expect(card.getByText(source.description![language], { exact: true })).toBeVisible();
    }
    const localTitle = language === 'es' ? 'Orientación local: distrito de Chiclayo' : 'Local guidance: Chiclayo district';
    const local = await openWithKeyboard(page, main.locator('summary').filter({ hasText: localTitle }));
    await expect(local.getByText(uleChiclayoInfo.address![language], { exact: true })).toBeVisible();
    await expect(local.getByText(uleChiclayoInfo.hours![language], { exact: true })).toBeVisible();
    await expect(local.getByText(uleChiclayoInfo.notes[language], { exact: true })).toBeVisible();
    await expect(local.getByText(resources.uleNote, { exact: true })).toBeVisible();
    await captureReviewState(page, `resources-details-open-${language}`);
    await expectReflow(page);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(result.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) }))).toEqual([]);
  });

  test(`FAQ retains all questions and reveals each complete answer with the keyboard in ${language}`, async ({ page }) => {
    await page.goto('/faq');
    await setLanguage(page, language);
    const main = page.locator('main');
    for (const item of content[language].faq.items) {
      const question = main.getByRole('button', { name: item.question, exact: true });
      await expect(question).toBeVisible();
      await expect(question).toHaveAttribute('aria-expanded', 'false');
      await tabTo(page, question);
      await page.keyboard.press('Enter');
      await expect(question).toHaveAttribute('aria-expanded', 'true');
      const answer = page.locator(`#${await question.getAttribute('aria-controls')}`);
      await expect(answer).toHaveText(item.answer);
      await expect(answer).toBeVisible();
      await page.keyboard.press('Space');
      await expect(question).toHaveAttribute('aria-expanded', 'false');
      await expect(answer).not.toBeVisible();
    }
    await main.getByRole('button').first().click();
    await captureReviewState(page, `faq-answer-open-${language}`);
    await expectReflow(page);
  });
}
