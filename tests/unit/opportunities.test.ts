import { describe, expect, it } from 'vitest';
import { opportunities, sources, institutions, jurisdictions } from '../../src/features/opportunities/data/peru';
import { filterOpportunities, getOpportunity, opportunityStatus, opportunityStatusLabelKey } from '../../src/features/opportunities/domain/catalog';
import { emptyRoute, normalizeMyRoute, routeProgress } from '../../src/features/opportunities/domain/myRoute';
import es from '../../src/locales/es/companion.json' with { type: 'json' };
import en from '../../src/locales/en/companion.json' with { type: 'json' };

const filters = { country: 'PE', region: '', category: '', audience: '', status: '' };
const today = '2026-11-11';
describe('verified opportunity catalogue', () => {
  it('has five distinct categories, traceable requirements and official sources', () => {
    expect(new Set(opportunities.map(item => item.category)).size).toBe(5);
    expect(new Set(opportunities.map(item => item.id)).size).toBe(opportunities.length);
    const knownSources = new Set(sources.map(source => source.id));
    for (const opportunity of opportunities) {
      expect(opportunity.countryCode).toBe('PE');
      expect(institutions.find(item => item.id === opportunity.institutionId)?.countryCode).toBe('PE');
      expect(jurisdictions.find(item => item.id === opportunity.jurisdictionId)?.countryCode).toBe('PE');
      expect(opportunity.title.es).toBeTruthy(); expect(opportunity.title.en).toBeTruthy();
      expect(opportunity.verification.status).toBe('documentary');
      expect(opportunity.officialUrl).toMatch(/^https:\/\/[^/]+\.gob\.pe\//);
      for (const item of [...opportunity.requirements, ...opportunity.conditions, ...opportunity.steps]) {
        expect(item.sourceIds.length).toBeGreaterThan(0);
        expect(item.sourceIds.every(id => knownSources.has(id) && opportunity.sourceIds.includes(id))).toBe(true);
        expect(item.text.es).toBeTruthy(); expect(item.text.en).toBeTruthy();
      }
      for (const date of opportunity.availability.dates) expect(opportunity.sourceIds).toContain(date.sourceId);
      expect(sources.filter(source => opportunity.sourceIds.includes(source.id)).every(source => source.consultedAt === opportunity.verification.checkedAt)).toBe(true);
    }
  });
  it.each(['MX', 'CO', 'ES', 'ZZ'])('never falls back to Peru for %s', country => {
    expect(filterOpportunities({ ...filters, country }, today)).toEqual([]);
  });
  it('combines region, category, audience and call status without inventing local vacancies', () => {
    expect(filterOpportunities({ ...filters, region: 'PE-140101' }, today).map(item => item.id)).toEqual(['cse-peru']);
    expect(filterOpportunities({ ...filters, category: 'training', audience: 'jobseekers', status: 'ongoing' }, today).map(item => item.id)).toEqual(['capacita-t']);
    expect(filterOpportunities({ ...filters, category: 'enterprise', audience: 'students' }, today)).toEqual([]);
    expect(filterOpportunities({ ...filters, region: 'ZZ' }, today)).toEqual([]);
    expect(filterOpportunities({ ...filters, status: 'closed' }, today).map(item => item.id)).toEqual(['beca-18-2027']);
  });
  it('retains closed registration while exam dates are still in the future', () => {
    const scholarship = getOpportunity('beca-18-2027')!;
    expect(opportunityStatus(scholarship, today)).toBe('closed');
    expect(scholarship.availability.closesOn).toBe('2026-10-18');
    expect(scholarship.availability.dates.some(date => date.date > today)).toBe(true);
  });
  it('requires fresh confirmation for ongoing services after the review deadline', () => {
    expect(opportunityStatus(getOpportunity('empleos-peru')!, '2026-12-12')).toBe('unconfirmed');
    expect(opportunityStatus(getOpportunity('beca-18-2027')!, '2027-01-01')).toBe('closed');
    expect(getOpportunity('unknown')).toBeUndefined();
  });
  it('keeps CSE a family-support procedure with its original guide', () => {
    expect(getOpportunity('cse-peru')).toMatchObject({ category: 'family', kind: 'procedure', guidePath: '/cse', localGuidanceIds: ['PE-140101'] });
  });
  it('classifies CSE as a procedure in labels and excludes it from the ongoing service filter', () => {
    expect(opportunityStatusLabelKey(getOpportunity('cse-peru')!, today)).toBe('companion.kinds.procedure');
    expect(opportunityStatusLabelKey(getOpportunity('cse-peru')!, '2026-12-12')).toBe('companion.status.unconfirmed');
    expect(opportunityStatusLabelKey(getOpportunity('beca-18-2027')!, today)).toBe('companion.status.closed');
    for (const id of ['empleos-peru', 'capacita-t', 'tu-empresa']) {
      expect(opportunityStatusLabelKey(getOpportunity(id)!, today)).toBe('companion.status.ongoing');
    }
    expect(filterOpportunities({ ...filters, status: 'ongoing' }, today).map(item => item.id)).toEqual(['empleos-peru', 'capacita-t', 'tu-empresa']);
    expect(filterOpportunities({ ...filters, category: 'family', status: 'ongoing' }, today)).toEqual([]);
    expect(filterOpportunities({ ...filters, category: 'family' }, today).map(item => item.id)).toEqual(['cse-peru']);
  });
  it('maintains the same interface key set in Spanish and English', () => {
    const paths = (value: object, prefix = ''): string[] => Object.entries(value).flatMap(([key, item]) => typeof item === 'object' ? paths(item, `${prefix}${key}.`) : [`${prefix}${key}`]);
    expect(paths(es)).toEqual(paths(en));
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
