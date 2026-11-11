import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  StorageKeys,
} from '../../src/utils/storage';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getStorageItem', () => {
    it('should return default value when key does not exist', () => {
      const result = getStorageItem('nonexistent', 'default');
      expect(result).toBe('default');
    });

    it('should return stored value when key exists', () => {
      localStorage.setItem('test-key', JSON.stringify('stored'));
      const result = getStorageItem('test-key', 'default');
      expect(result).toBe('stored');
    });

    it('should handle objects', () => {
      const obj = { name: 'test', value: 42 };
      localStorage.setItem('test-obj', JSON.stringify(obj));
      const result = getStorageItem('test-obj', {});
      expect(result).toEqual(obj);
    });

    it('should return default value on parse error', () => {
      localStorage.setItem('invalid', 'not-json');
      const result = getStorageItem('invalid', 'default');
      expect(result).toBe('default');
    });
  });

  describe('setStorageItem', () => {
    it('should store string values', () => {
      setStorageItem('test-key', 'value');
      expect(localStorage.getItem('test-key')).toBe('"value"');
    });

    it('should store objects', () => {
      const obj = { name: 'test' };
      setStorageItem('test-obj', obj);
      expect(JSON.parse(localStorage.getItem('test-obj')!)).toEqual(obj);
    });

    it('should store numbers', () => {
      setStorageItem('test-num', 42);
      expect(localStorage.getItem('test-num')).toBe('42');
    });
  });

  describe('removeStorageItem', () => {
    it('should remove existing items', () => {
      localStorage.setItem('test-key', 'value');
      removeStorageItem('test-key');
      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should not throw on non-existent items', () => {
      expect(() => removeStorageItem('nonexistent')).not.toThrow();
    });
  });

  describe('StorageKeys', () => {
    it('should have correct prefix', () => {
      expect(StorageKeys.LANGUAGE).toContain('umbral:');
      expect(StorageKeys.CURRENT_STEP).toContain('umbral:');
      expect(StorageKeys.CHECKLIST).toContain('umbral:');
    });

    it('should be unique', () => {
      const keys = Object.values(StorageKeys);
      const uniqueKeys = new Set(keys);
      expect(keys.length).toBe(uniqueKeys.size);
    });
  });
});
