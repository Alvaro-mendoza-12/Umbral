import { useState, useEffect, useCallback, useRef } from 'react';
import { readStorageItem, setStorageItem } from '../utils/storage';

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  normalize?: (value: unknown) => T
): [T, (value: T | ((val: T) => T)) => void, boolean] {
  const defaults = useRef({ initialValue, normalize });
  const readValue = useCallback(
    () => readStorageItem(key, defaults.current.initialValue, defaults.current.normalize),
    [key]
  );
  const [initial] = useState(readValue);
  const [storedValue, setStoredValue] = useState(initial.value);
  const [storageAvailable, setStorageAvailable] = useState(initial.available);
  const valueRef = useRef(storedValue);
  const hasUnsavedChanges = useRef(false);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(valueRef.current) : value;
    valueRef.current = valueToStore;
    setStoredValue(valueToStore);
    const saved = setStorageItem(key, valueToStore);
    hasUnsavedChanges.current = !saved;
    setStorageAvailable(saved);
  }, [key]);

  useEffect(() => {
    const refreshValue = (externalChange = false) => {
      if (hasUnsavedChanges.current && !externalChange) return;
      const result = readValue();
      setStorageAvailable(result.available);
      // Keep in-memory edits usable if the browser denies storage access.
      if (result.available) {
        hasUnsavedChanges.current = false;
        valueRef.current = result.value;
        setStoredValue(result.value);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) {
        refreshValue(true);
      }
    };
    const handleFocus = () => refreshValue();

    refreshValue(true);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
  }, [key, readValue]);

  return [storedValue, setValue, storageAvailable];
}

export default useLocalStorage;
