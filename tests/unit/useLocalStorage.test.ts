import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../../src/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when storage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    expect(result.current[0]).toBe('initial');
  });

  it('should store and retrieve values', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test-key')).toBe('"updated"');
  });

  it('should persist values across hook instances', () => {
    const { result: result1 } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    act(() => {
      result1.current[1]('persisted');
    });

    const { result: result2 } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    expect(result2.current[0]).toBe('persisted');
  });

  it('should handle complex objects', () => {
    const initialValue = { name: 'test', count: 0 };
    const { result } = renderHook(() =>
      useLocalStorage('test-obj', initialValue)
    );

    act(() => {
      result.current[1]({ name: 'updated', count: 5 });
    });

    expect(result.current[0]).toEqual({ name: 'updated', count: 5 });
  });

  it('should support functional updates', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-counter', 0)
    );

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });
});
