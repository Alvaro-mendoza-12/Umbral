import { getOpportunity } from './catalog';
import type { MyRoute, PersonalTask, RouteEntry } from './types';

export const MY_ROUTE_KEY = 'umbral:myRoute:v1';
export const emptyRoute: MyRoute = { version: 1, entries: {} };
function isPersonalTask(task: unknown): task is PersonalTask {
  return Boolean(task && typeof task === 'object' && 'id' in task && typeof task.id === 'string' && /^task-[a-z0-9-]{1,60}$/i.test(task.id) && 'title' in task && typeof task.title === 'string' && task.title.trim() && task.title.length <= 140 && 'completed' in task && typeof task.completed === 'boolean');
}
export function normalizeMyRoute(value: unknown): MyRoute {
  if (!value || typeof value !== 'object' || !('version' in value) || value.version !== 1 || !('entries' in value) || !value.entries || typeof value.entries !== 'object' || Array.isArray(value.entries)) return emptyRoute;
  const entries: Record<string, RouteEntry> = {};
  for (const [id, entry] of Object.entries(value.entries)) {
    const opportunity = getOpportunity(id);
    if (!opportunity || !entry || typeof entry !== 'object') continue;
    const completed = 'completedStepIds' in entry && Array.isArray(entry.completedStepIds) ? entry.completedStepIds : [];
    const tasks: unknown[] = 'tasks' in entry && Array.isArray(entry.tasks) ? entry.tasks : [];
    const used = new Set<string>();
    entries[id] = {
      completedStepIds: opportunity.steps.filter(step => completed.includes(step.id)).map(step => step.id),
      tasks: tasks.filter((task): task is PersonalTask => {
        if (!isPersonalTask(task) || used.has(task.id)) return false;
        used.add(task.id);
        return true;
      }).slice(0, 30).map(task => ({ id: task.id, title: task.title.trim(), completed: task.completed })),
    };
  }
  return { version: 1, entries };
}
export function routeProgress(entry: RouteEntry, opportunityId: string) {
  const opportunity = getOpportunity(opportunityId);
  const total = (opportunity?.steps.length ?? 0) + entry.tasks.length;
  const completed = (opportunity?.steps.filter(step => entry.completedStepIds.includes(step.id)).length ?? 0) + entry.tasks.filter(task => task.completed).length;
  return { total, completed, percent: total ? Math.round(completed / total * 100) : 0 };
}
