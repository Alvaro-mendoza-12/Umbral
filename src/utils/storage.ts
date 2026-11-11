import type { ChecklistState } from '../types';

const STORAGE_PREFIX = 'umbral:';

export const StorageKeys = {
  LANGUAGE: `${STORAGE_PREFIX}language`,
  CURRENT_STEP: `${STORAGE_PREFIX}currentStep`,
  CHECKLIST: `${STORAGE_PREFIX}checklist`,
  PWA_PROMPTED: `${STORAGE_PREFIX}pwaPrompted`,
} as const;

export interface StorageResult<T> {
  value: T;
  available: boolean;
}

export function normalizeChecklistState(
  value: unknown,
  validIds: readonly string[]
): ChecklistState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const allowedIds = new Set(validIds);
  return Object.fromEntries(
    Object.entries(value).filter(
      ([id, checked]) => allowedIds.has(id) && typeof checked === 'boolean'
    )
  );
}

export function readStorageItem<T>(
  key: string,
  defaultValue: T,
  normalize?: (value: unknown) => T
): StorageResult<T> {
  let item: string | null;
  try {
    item = localStorage.getItem(key);
  } catch (error) {
    console.warn(`Error reading from localStorage: ${key}`, error);
    return { value: defaultValue, available: false };
  }

  if (item === null) {
    return { value: defaultValue, available: true };
  }

  try {
    // The language detector writes a raw string; other stored values use JSON.
    const parsed: unknown = key === StorageKeys.LANGUAGE && /^(es|en)$/.test(item)
      ? item
      : JSON.parse(item);
    return {
      value: normalize ? normalize(parsed) : (parsed as T),
      available: true,
    };
  } catch (error) {
    console.warn(`Invalid localStorage value: ${key}`, error);
    return { value: defaultValue, available: true };
  }
}

export function getStorageItem<T>(key: string, defaultValue: T): T {
  return readStorageItem(key, defaultValue).value;
}

export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Error writing to localStorage: ${key}`, error);
    return false;
  }
}

export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing from localStorage: ${key}`, error);
  }
}
