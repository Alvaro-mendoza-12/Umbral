import { createContext, useContext } from 'react';
import type { MyRoute } from '../domain/types';

export interface RouteActions {
  route: MyRoute;
  available: boolean;
  save: (id: string) => void;
  remove: (id: string) => void;
  toggleStep: (id: string, stepId: string) => void;
  addTask: (id: string, title: string) => void;
  toggleTask: (id: string, taskId: string) => void;
  removeTask: (id: string, taskId: string) => void;
}
export const RouteContext = createContext<RouteActions | null>(null);
export function useMyRoute(): RouteActions {
  const value = useContext(RouteContext);
  if (!value) throw new Error('My Route must be used inside RouteProvider');
  return value;
}
