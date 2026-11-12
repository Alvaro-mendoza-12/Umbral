import { describe, expect, it, vi } from 'vitest';
import { opportunities, sources, institutions, jurisdictions, catalogCountries } from '../../src/features/opportunities/data/catalog';
import { filterOpportunities, getOpportunity, opportunityStatus, opportunityStatusLabelKey, canAct } from '../../src/features/opportunities/domain/catalog';
import { emptyRoute, normalizeMyRoute, routeProgress } from '../../src/features/opportunities/domain/myRoute';
import es from '../../src/locales/es/companion.json' with { type: 'json' };
import en from '../../src/locales/en/companion.json' with { type: 'json' };
const filters = { country: 'PE', region: '', category: '', audience: '', status: '' };
const today = '2026-11-11';
describe('specific verified international opportunities', () => {
  it('covers five jurisdictions and six categories using concrete records rather than portals', () => {
    for(const country of ['PE','US','MX','CO','ES']) {
      expect(catalogCountries.some(item=>item.code===country)).toBe(true);
      const domestic=filterOpportunities({...filters,country},today).filter(item=>item.countryCode===country);
      expect(domestic.length).toBeGreaterThan(0);
      expect(domestic.every(item=>item.access && item.placement!=='supplementary')).toBe(true);
    }
    expect(new Set(opportunities.filter(item=>!item.placement).map(item=>item.category)).size).toBe(6);
    const jobs=filterOpportunities({...filters,category:'employment'},today);
    expect(jobs.map(item=>item.id)).toEqual(['pe-concentrix-customer','pe-concentrix-cleaning','pe-promigas-billing','pe-xylem-electromechanical']);
    expect(jobs.every(item=>item.kind==='job' && item.access?.location && item.access.instructions && /\/job/.test(item.officialUrl))).toBe(true);
    for(const [country,count] of [['PE',4],['US',2],['MX',3],['CO',3],['ES',3]] as const) expect(filterOpportunities({...filters,category:'employment',country},today)).toHaveLength(count);
  });
  it('resolves source, institution, jurisdiction and action without losing provenance', () => {
    const ids=new Set(sources.map(source=>source.id));
    expect(new Set(opportunities.map(item=>item.id)).size).toBe(opportunities.length);
    for(const opportunity of opportunities) {
      expect(institutions.some(item=>item.id===opportunity.institutionId)).toBe(true);
      expect(jurisdictions.some(item=>item.id===opportunity.jurisdictionId)).toBe(true);
      expect(opportunity.sourceIds.every(id=>ids.has(id))).toBe(true);
      for(const item of [...opportunity.requirements,...opportunity.conditions,...opportunity.steps]) {
        expect(item.text.es).toBeTruthy();expect(item.text.en).toBeTruthy();
        expect(item.sourceIds.length).toBeGreaterThan(0);
        expect(item.sourceIds.every(id=>opportunity.sourceIds.includes(id))).toBe(true);
      }
      if(opportunity.access) {
        expect(opportunity.access.actionUrl).toMatch(/^https:\/\//);
        expect(opportunity.access.instructions.es.length).toBeGreaterThan(30);
        expect(opportunity.access.instructions.en.length).toBeGreaterThan(30);
      }
    }
  });
  it('keeps territorial eligibility separate from international access', () => {
    expect(filterOpportunities({...filters,country:'US',category:'education'},today).map(item=>item.id)).toContain('us-pell-2026');
    expect(filterOpportunities({...filters,country:'MX'},today).map(item=>item.id)).not.toContain('us-pell-2026');
    expect(filterOpportunities({...filters,country:'CO'},today).map(item=>item.id)).not.toContain('cse-peru');
    expect(filterOpportunities({...filters,country:'INT'},today)).toHaveLength(6);
    expect(filterOpportunities({...filters,country:'MX'},today).findIndex(item=>item.countryCode==='INT')).toBeGreaterThan(0);
    expect(filterOpportunities({...filters,country:'MX',category:'technology'},today).map(item=>item.id)).toContain('int-cs50x-2026');
    expect(filterOpportunities({...filters,country:'ZZ'},today)).toEqual([]);
    expect(getOpportunity('missing')).toBeUndefined();
  });
  it('does not present old calls or stale records as available; preserves saved legacy IDs', () => {
    expect(filterOpportunities(filters,today).map(item=>item.id)).not.toContain('beca-18-2027');
    expect(filterOpportunities({...filters,status:'closed'},today).map(item=>item.id)).toContain('beca-18-2027');
    expect(opportunityStatus(getOpportunity('pe-promigas-billing')!,'2026-11-28')).toBe('closed');
    expect(opportunityStatus(getOpportunity('pe-promigas-billing')!,'2026-11-19')).toBe('unconfirmed');
    expect(opportunityStatus(getOpportunity('pe-innovasuyu-libertad')!,'2026-11-12')).toBe('open');
    expect(opportunityStatus(getOpportunity('pe-innovasuyu-libertad')!,'2026-11-14')).toBe('closed');
    expect(opportunityStatus(getOpportunity('us-pell-2026')!,'2026-11-10')).toBe('open');
    expect(filterOpportunities({...filters,status:'all'},today).map(item=>item.id)).not.toContain('empleos-peru');
    expect(getOpportunity('empleos-peru')).toBeTruthy();
    expect(canAct(getOpportunity('empleos-peru')!)).toBe(false);
  });
  it('distinguishes course, debt, grant and CSE without inventing salary or certification', () => {
    expect(getOpportunity('cse-peru')).toMatchObject({kind:'procedure',guidePath:'/cse'});
    expect(opportunityStatusLabelKey(getOpportunity('cse-peru')!,today)).toBe('companion.procedureAvailable');
    expect(getOpportunity('es-enisa-digital-women')?.kind).toBe('loan');
    expect(getOpportunity('pe-innovasuyu-libertad')?.kind).toBe('grant');
    expect(getOpportunity('mx-unam-excel')?.access?.certification?.es).toContain('no disponibles');
    expect(getOpportunity('pe-promigas-billing')?.access?.publishedOn).toBeUndefined();
    expect(getOpportunity('us-va-nurse')?.access?.publishedOn).toBe('2026-10-19');
    expect(getOpportunity('pe-innovasuyu-libertad')?.access?.deadlineAt).toBe('2026-11-13T13:00:00-05:00');
  });
  it('combines category, geography and audience; secondary categories stay explicit', () => {
    expect(filterOpportunities({...filters,region:'PE-LaLibertad',category:'employment'},today).map(item=>item.id)).toEqual(['pe-promigas-billing']);
    expect(filterOpportunities({...filters,country:'US',category:'employment'},today).map(item=>item.id)).toEqual(['us-amazon-process-assistant','us-va-nurse']);
    expect(filterOpportunities({...filters,category:'technology'},today).map(item=>item.id)).toContain('pe-abc-digital');
    expect(filterOpportunities({...filters,region:'ZZ'},today)).toEqual([]);
  });
  it('keeps translations complete in ES and EN', () => {
    const paths=(value:object,prefix=''):string[]=>Object.entries(value).flatMap(([key,item])=>typeof item==='object'?paths(item,prefix+key+'.'):[prefix+key]);
    expect(paths(es).sort()).toEqual(paths(en).sort());
  });
  it('exposes eligibility and the commitment for every active record, including unpublished facts', () => {
    for(const item of opportunities.filter(item=>item.access && !item.placement)) {
      expect(item.access?.keyCondition?.es).toBeTruthy();expect(item.access?.keyCondition?.en).toBeTruthy();
      for(const field of ['priority','age','residence','education','experience','restrictions','international'] as const) {
        expect(item.access?.eligibilityFacts?.[field].es).toBeTruthy();expect(item.access?.eligibilityFacts?.[field].en).toBeTruthy();
      }
      expect(item.access!.eligibilityFacts!.priority.es.length).toBeLessThanOrEqual(180);
    }
    expect(getOpportunity('mx-concentrix-customer')?.access?.eligibilityFacts?.restrictions.es).toContain('inglés');
    expect(getOpportunity('pe-xylem-electromechanical')?.access?.eligibilityFacts?.priority.es).toContain('discapacidad física leve');
    expect(getOpportunity('int-leiden-lexs')?.access?.eligibilityFacts?.restrictions.es).toContain('Pasaporte español');
  });
  it('distinguishes complete and partial scholarships, paid credentials, seed capital, debt and equity', () => {
    const expected={ 'int-eth-esop-2027':'full-scholarship','int-leiden-lexs':'partial-scholarship','us-pell-2026':'education-aid','mx-unam-excel':'free-course','int-google-it-support':'professional-certificate','co-fondo-emprender-168':'seed-capital','es-enisa-digital-women':'loan','int-yc-winter-2027':'accelerator','int-yc-startup-school':'business-training' };
    for(const [id,type] of Object.entries(expected)) expect(getOpportunity(id)?.access?.supportType).toBe(type);
    expect(getOpportunity('int-yc-winter-2027')?.access?.keyCondition?.es).toContain('7 %');
    expect(getOpportunity('int-google-it-support')?.access?.price?.es).toContain('De pago');
    expect(getOpportunity('int-leiden-lexs')?.access?.keyCondition?.es).toContain('fondos propios');
  });
  it('closes an exact international deadline at its published local time', () => {
    const record=getOpportunity('int-eth-esop-2027')!;
    const reviewed={...record,verification:{...record.verification,reviewBy:'2026-11-30'}};
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-11-30T10:58:00Z'));expect(opportunityStatus(reviewed)).toBe('open');
      vi.setSystemTime(new Date('2026-11-30T10:59:01Z'));expect(opportunityStatus(reviewed)).toBe('closed');
    } finally {vi.useRealTimers();}
    expect(opportunityStatus(getOpportunity('int-yc-winter-2027')!,'2026-11-13')).toBe('unconfirmed');
    expect(opportunityStatusLabelKey(getOpportunity('int-yc-winter-2027')!,today)).toBe('companion.lateApplications');
  });
  it('uses the destination calendar rather than Peru for a date-only European deadline', () => {
    const record=getOpportunity('int-leiden-lexs')!;
    const reviewed={...record,verification:{...record.verification,reviewBy:'2026-12-05'}};
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-12-01T23:01:00Z'));
      expect(opportunityStatus(reviewed)).toBe('closed');
    } finally {vi.useRealTimers();}
  });
  it('uses the IKEA hiring-platform deadlines even though the public career pages omit them', () => {
    const granada=getOpportunity('es-ikea-logistics')!;
    const marbella=getOpportunity('es-ikea-sales')!;
    expect(granada.availability.closesOn).toBe('2026-11-12');
    expect(marbella.availability.closesOn).toBe('2026-11-15');
    expect(granada.sourceIds).toContain('ikea-granada-application');
    expect(marbella.sourceIds).toContain('ikea-marbella-application');
    expect(opportunityStatus(granada,'2026-11-12')).toBe('open');
    expect(opportunityStatus(granada,'2026-11-13')).toBe('closed');
    expect(opportunityStatus(marbella,'2026-11-16')).toBe('closed');
    expect(granada.availability.description.es).not.toContain('Sin cierre');
  });
});
describe('local My Route boundary', () => {
  it.each([null, [], 'bad', { version: 2, entries: {} }, { version: 1, entries: null }])('recovers malformed storage without inventing progress: %j', value => {
    expect(normalizeMyRoute(value)).toEqual(emptyRoute);
  });
  it('drops unknown records, steps, malformed tasks and duplicate task IDs', () => {
    const route = normalizeMyRoute({ version: 1, entries: {
      fake: { completedStepIds: ['all'], tasks: [] },
      'empleos-peru': { completedStepIds: ['profile', 'profile', 'fake'], tasks: [null, { id: 'task-one', title: ' Preparar preguntas ', completed: true }, { id: 'task-one', title: 'Duplicate', completed: false }, { id: 'task-two', title: 'Invalid', completed: 'yes' }] },
    } });
    expect(Object.keys(route.entries)).toEqual(['empleos-peru']);
    expect(route.entries['empleos-peru']).toEqual({ completedStepIds: ['profile'], tasks: [{ id: 'task-one', title: 'Preparar preguntas', completed: true }] });
    expect(routeProgress(route.entries['empleos-peru'], 'empleos-peru')).toEqual({ completed: 2, total: 4, percent: 50 });
  });
  it('bounds custom tasks and excludes oversized text', () => {
    const tasks = [{ id: 'task-long', title: 'a'.repeat(141), completed: true }, ...Array.from({ length: 35 }, (_, index) => ({ id: `task-${index}`, title: 'Preparar una pregunta', completed: false }))];
    const route = normalizeMyRoute({ version: 1, entries: { 'empleos-peru': { completedStepIds: [], tasks } } });
    expect(route.entries['empleos-peru'].tasks).toHaveLength(30);
    expect(route.entries['empleos-peru'].tasks.some(task => task.id === 'task-long')).toBe(false);
    expect(routeProgress(route.entries['empleos-peru'], 'empleos-peru').completed).toBe(0);
  });
});
