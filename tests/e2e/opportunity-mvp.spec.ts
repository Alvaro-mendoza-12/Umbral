import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { opportunities, catalogCountries } from '../../src/features/opportunities/data/catalog';
import es from '../../src/locales/es/companion.json' with { type: 'json' };
import en from '../../src/locales/en/companion.json' with { type: 'json' };
import { setLanguage, expectReflow, captureReviewState, tabTo } from './helpers';

for (const language of ['es', 'en'] as const) {
  const copy=language==='es'?es:en;
  test('Peru job search reaches a specific vacancy, requirements and a concrete application path in '+language, async({page})=>{
    await page.goto('/?country=PE');await setLanguage(page,language);
    await expect(page.locator('main h1')).toHaveText(copy.question);
    const goals=page.getByRole('navigation',{name:copy.question});await expect(goals.getByRole('link')).toHaveCount(6);
    await goals.getByRole('link',{name:copy.goals.employment,exact:true}).click();
    await expect(page.locator('main article')).toHaveCount(2);
    await expect(page.locator('main article').filter({hasText:'Empleos Perú'})).toHaveCount(0);
    const job=page.locator('main article').filter({hasText:opportunities[0].title[language]});
    await expect(job).toContainText(language==='es'?'2.100':'2,100');await expect(job).toContainText('Trujillo');
    await job.getByRole('heading').getByRole('link').click();
    await expect(page.locator('main h1')).toHaveText(opportunities[0].title[language]);
    const apply=page.locator('[data-official-action]');await expect(apply).toHaveAttribute('href',opportunities[0].access!.actionUrl);
    const box=await apply.boundingBox();expect(box).not.toBeNull();expect(box!.y+box!.height).toBeLessThanOrEqual(page.viewportSize()!.height);
    await expect(page.locator('aside')).toContainText('tania.guimac@promigas.pe');
    await page.locator('summary').filter({hasText:copy.requirements}).click();
    await expect(page.getByText(opportunities[0].requirements[0].text[language],{exact:true})).toBeVisible();
    await page.locator('summary').filter({hasText:copy.conditions}).click();
    await expect(page.getByText(opportunities[0].conditions[0].text[language],{exact:true})).toBeVisible();
    await captureReviewState(page,'concrete-job-'+language);
  });

  test('US education explains citizenship eligibility and links to the correct FAFSA process in '+language,async({page})=>{
    await page.goto('/discover?country=US&category=education');await setLanguage(page,language);
    const card=page.locator('main article').filter({hasText:'Federal Pell Grant'});await expect(card).toBeVisible();
    await expect(page.locator('main article').filter({hasText:'CSE'})).toHaveCount(0);
    await card.getByRole('heading').getByRole('link').click();
    await page.locator('summary').filter({hasText:copy.requirements}).click();
    const record=opportunities.find(item=>item.id==='us-pell-2026')!;
    await expect(page.getByText(record.requirements[0].text[language],{exact:true})).toBeVisible();
    await expect(page.locator('[data-official-action]')).toHaveAttribute('href','https://studentaid.gov/sites/default/files/2026-27-fafsa-form.pdf');
    await expect(page.locator('aside')).toContainText('2026–27');await expect(page.locator('aside')).toContainText('2027');
    await captureReviewState(page,'us-education-'+language);
  });

  test('Mexico Colombia Spain show domestic funding and explicit loan or grant conditions in '+language,async({page})=>{
    for(const [country,id] of [['MX','mx-nafin-women'],['CO','co-fondo-emprender-168'],['ES','es-enisa-digital-women']]) {
      await page.goto('/discover?country='+country+'&category=enterprise');await setLanguage(page,language);
      const opportunity=opportunities.find(item=>item.id===id)!;const card=page.locator('main article').filter({hasText:opportunity.title[language]});
      await expect(card).toBeVisible();await expect(card).toContainText(copy.kinds[opportunity.kind]);
      await expect(page.locator('main article').filter({hasText:'CSE'})).toHaveCount(0);
      await card.getByRole('heading').getByRole('link').click();
      await expect(page.locator('main')).toContainText(catalogCountries.find(item=>item.code===country)!.name[language]);
      await expect(page.locator('[data-official-action]')).toHaveAttribute('href',opportunity.access!.actionUrl);
      await page.locator('summary').filter({hasText:copy.conditions}).click();
      await expect(page.getByText(opportunity.conditions[0].text[language],{exact:true})).toBeVisible();
      await captureReviewState(page,'domestic-'+country+'-'+language);
    }
  });

  test('filters exclude closed calls by default, retain specific scopes and explain empty categories in '+language,async({page})=>{
    await page.goto('/discover?country=PE');await setLanguage(page,language);
    await expect(page.locator('main article').filter({hasText:'Beca 18'})).toHaveCount(0);
    const filterPanel=page.locator('main details').first();if(!await filterPanel.evaluate(node=>(node as HTMLDetailsElement).open))await filterPanel.locator('summary').click();
    await page.getByLabel(copy.category,{exact:true}).selectOption('employment');
    await page.getByLabel(copy.region,{exact:true}).selectOption('PE-LaLibertad');
    await expect(page.locator('main article')).toHaveCount(1);await expect(page.locator('main article')).toContainText('Trujillo');
    await page.getByRole('button',{name:copy.resetFilters,exact:true}).click();
    await expect(page.getByLabel(copy.region,{exact:true})).toHaveValue('');
    await page.getByLabel(copy.callStatus,{exact:true}).selectOption('closed');
    await expect(page.locator('main article')).toHaveCount(1);await expect(page.locator('main article')).toContainText('Beca 18');
    await page.locator('main article').getByRole('heading').getByRole('link').click();
    await expect(page.locator('[data-official-action]')).toHaveCount(0);await expect(page.getByText(copy.notAvailable,{exact:true})).toBeVisible();
    await page.goto('/discover?country=MX&category=employment');await expect(page.getByText(copy.noResults,{exact:true})).toBeVisible();
    await expect(page.locator('main article')).toHaveCount(0);
    await page.goto('/discover?country=INT&category=technology');await expect(page.locator('main article')).toHaveCount(1);
    await expect(page.locator('main article')).toContainText('CS50');
  });

  test('saved opportunities preserve country, custom preparation, dates and next step after reload and export in '+language,async({page,context})=>{
    await context.addInitScript(()=>{window.print=()=>{document.body.dataset.printRequested='true';};});
    await page.goto('/opportunities/pe-promigas-billing');await setLanguage(page,language);
    await page.getByRole('button',{name:copy.save,exact:true}).click();await page.getByRole('link',{name:copy.goRoute,exact:true}).click();
    const card=page.locator('main article');await expect(card).toContainText(copy.nextStep);await expect(card).toContainText('2026');
    await card.getByRole('checkbox').first().check();await card.getByLabel(copy.taskLabel,{exact:true}).fill('Confirmar el puesto / Confirm the role');
    await card.getByRole('button',{name:copy.addTask,exact:true}).click();await card.getByRole('checkbox',{name:'Confirmar el puesto / Confirm the role',exact:true}).check();
    await page.reload();await expect(card.getByRole('progressbar')).toHaveAttribute('value','2');await expect(card.getByRole('progressbar')).toHaveAttribute('max','4');
    const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:copy.download,exact:true}).click();const file=await downloadPromise;
    const text=await readFile((await file.path())!,'utf8');expect(text).toContain('[x] Confirmar el puesto / Confirm the role');expect(text).toContain('vacante-196b171e');
    const popupPromise=page.waitForEvent('popup');await page.getByRole('button',{name:copy.print,exact:true}).click();const popup=await popupPromise;
    await expect(popup.locator('body')).toHaveAttribute('data-print-requested','true');await expect(popup.locator('body')).toContainText('vacante-196b171e');await popup.close();
    await page.goto('/discover?country=ES&category=enterprise');
    await page.locator('main article').getByRole('heading').getByRole('link').click();await page.getByRole('button',{name:copy.save,exact:true}).click();
    await page.getByRole('link',{name:copy.goRoute,exact:true}).click();await expect(page.locator('main article')).toHaveCount(2);
    const peru=page.locator('main article').filter({hasText:'Trujillo'});await expect(peru).toHaveCount(0);
    await expect(page.locator('main article').first()).toContainText(language==='es'?'Perú':'Peru');
    await expect(page.locator('main article').last()).toContainText(language==='es'?'España':'Spain');
    await expect(page.locator('main article').first().getByRole('progressbar')).toHaveAttribute('value','2');
  });

  test('country and language survive reload without importing Peru records into another jurisdiction in '+language,async({page})=>{
    await page.goto('/');await setLanguage(page,language);
    await page.getByRole('combobox',{name:copy.country,exact:true}).selectOption('US');
    await page.getByRole('navigation',{name:copy.question}).getByRole('link',{name:copy.goals.education,exact:true}).click();
    await expect(page.getByRole('combobox',{name:copy.country,exact:true})).toHaveValue('US');
    await page.reload();await expect(page.locator('html')).toHaveAttribute('lang',language);
    await expect(page.getByRole('combobox',{name:copy.country,exact:true})).toHaveValue('US');
    await page.goto('/');await expect(page.getByRole('combobox',{name:copy.country,exact:true})).toHaveValue('US');
    await page.getByRole('combobox',{name:copy.country,exact:true}).selectOption('CO');
    await page.getByRole('navigation',{name:copy.question}).getByRole('link',{name:copy.goals.training,exact:true}).click();
    await expect(page.locator('main article').filter({hasText:'English Does Work'})).toHaveCount(1);
    await expect(page.locator('main article').filter({hasText:'ABC Digital'})).toHaveCount(0);
    await expect(page.locator('main article').filter({hasText:'CSE'})).toHaveCount(0);
  });

  for(const route of ['/?country=PE','/discover?country=PE&category=employment','/opportunities/pe-promigas-billing','/opportunities/us-pell-2026','/my-route']) {
    test('readability keyboard and WCAG rules for '+route+' in '+language,async({page})=>{
      await page.goto('/opportunities/cse-peru');await setLanguage(page,language);await page.getByRole('button',{name:copy.save,exact:true}).click();
      await page.goto(route);await expectReflow(page);
      await expect(page.locator('main').getByRole('heading',{level:1})).toHaveCount(1);
      const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(result.violations.map(item=>({id:item.id,targets:item.nodes.map(node=>node.target)}))).toEqual([]);
      await captureReviewState(page,'evolution-'+route.replaceAll('/','-').replaceAll('?','-').replaceAll('&','-')+'-'+language);
      await page.addStyleTag({content:':root {font-size:200% !important;}'});await expectReflow(page);
    });
  }
}

test('unknown countries never fall back, CSE remains a procedure and existing local task data stays safe',async({page,context})=>{
  await page.goto('/discover?country=ZZ');await expect(page.locator('main article')).toHaveCount(0);
  await page.goto('/discover?country=PE&category=family');await expect(page.locator('main article')).toHaveCount(1);
  await expect(page.locator('main article')).toContainText(es.kinds.procedure);await expect(page.locator('main article')).not.toContainText(es.kinds.service);
  await page.locator('main article').getByRole('heading').getByRole('link').click();
  await page.getByRole('link',{name:es.cseGuide,exact:true}).click();await expect(page).toHaveURL('/cse');
  await page.goto('/my-route');await page.evaluate(()=>localStorage.setItem('umbral:myRoute:v1','null'));await page.reload();await expect(page.locator('main article')).toHaveCount(0);
  await context.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('blocked','QuotaExceededError');};});
  await page.goto('/opportunities/pe-abc-digital');await page.getByRole('button',{name:es.save,exact:true}).click();await expect(page.getByText(es.storageUnavailable,{exact:true})).toBeVisible();
  await page.getByRole('link',{name:es.goRoute,exact:true}).click();await page.getByRole('checkbox').first().check();await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await expect(page.getByRole('checkbox').first()).toBeChecked();
});

test('keyboard can choose a category and reach the real opportunity',async({page})=>{
  await page.goto('/?country=PE');const goal=page.getByRole('navigation',{name:es.question}).getByRole('link',{name:es.goals.employment,exact:true});
  await tabTo(page,goal);await page.keyboard.press('Enter');await expect(page).toHaveURL(/category=employment/);await expect(page.locator('main h1')).toBeFocused();
});
