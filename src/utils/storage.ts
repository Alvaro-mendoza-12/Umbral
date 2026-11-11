const STORAGE_PREFIX = 'umbral:';

export const StorageKeys = {
  LANGUAGE: `${STORAGE_PREFIX}language`,
  CURRENT_STEP: `${STORAGE_PREFIX}currentStep`,
  CHECKLIST: `${STORAGE_PREFIX}checklist`,
  PWA_PROMPTED: `${STORAGE_PREFIX}pwaPrompted`,
} as const;

export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.warn(`Error reading from localStorage: ${key}`, error);
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage: ${key}`, error);
  }
}

export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing from localStorage: ${key}`, error);
  }
}
