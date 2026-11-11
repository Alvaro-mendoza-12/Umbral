import type { ReactNode } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { getOpportunity } from '../domain/catalog';
import { emptyRoute, MY_ROUTE_KEY, normalizeMyRoute } from '../domain/myRoute';
import type { RouteEntry } from '../domain/types';
import { RouteContext } from './routeContext';

export default function RouteProvider({ children }: { children: ReactNode }) {
  const [route, setRoute, available] = useLocalStorage(MY_ROUTE_KEY, emptyRoute, normalizeMyRoute);
  const update = (id: string, change: (entry: RouteEntry) => RouteEntry) => setRoute(current => {
    const entry = current.entries[id];
    return entry ? { ...current, entries: { ...current.entries, [id]: change(entry) } } : current;
  });
  return <RouteContext.Provider value={{
    route, available,
    save: id => { if (getOpportunity(id)) setRoute(current => current.entries[id] ? current : { ...current, entries: { ...current.entries, [id]: { completedStepIds: [], tasks: [] } } }); },
    remove: id => setRoute(current => ({ ...current, entries: Object.fromEntries(Object.entries(current.entries).filter(([key]) => key !== id)) })),
    toggleStep: (id, stepId) => { if (getOpportunity(id)?.steps.some(step => step.id === stepId)) update(id, entry => ({ ...entry, completedStepIds: entry.completedStepIds.includes(stepId) ? entry.completedStepIds.filter(key => key !== stepId) : [...entry.completedStepIds, stepId] })); },
    addTask: (id, title) => {
      const clean = title.trim();
      if (clean && clean.length <= 140) update(id, entry => entry.tasks.length >= 30 ? entry : { ...entry, tasks: [...entry.tasks, { id: `task-${crypto.randomUUID()}`, title: clean, completed: false }] });
    },
    toggleTask: (id, taskId) => update(id, entry => ({ ...entry, tasks: entry.tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task) })),
    removeTask: (id, taskId) => update(id, entry => ({ ...entry, tasks: entry.tasks.filter(task => task.id !== taskId) })),
  }}>{children}</RouteContext.Provider>;
}
