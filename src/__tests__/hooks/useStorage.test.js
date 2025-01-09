import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, useSessionStorage } from '@/hooks/useStorage';

describe('useStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  describe('useLocalStorage', () => {
    it('should return the default value', () => {
      const { result } = renderHook(() => useLocalStorage('test', '777'));
      expect(result.current[0]).toBe('777');
    });

    it('should return the value from local storage', () => {
      window.localStorage.setItem('test', JSON.stringify('999'));
      const { result } = renderHook(() => useLocalStorage('test', '777'));
      expect(result.current[0]).toBe('999');
    });

    it('should set the value to local storage', () => {
      const { result } = renderHook(() => useLocalStorage('test', '777'));
      act(() => {
        result.current[1]('999');
      });
      expect(window.localStorage.getItem('test')).toBe(JSON.stringify('999'));
    });

    it('should remove the value from local storage', () => {
      window.localStorage.setItem('test', JSON.stringify('999'));
      const { result } = renderHook(() => useLocalStorage('test', '777'));
      act(() => {
        result.current[2]();
      });
      expect(window.localStorage.getItem('test')).toBe(null);
    });
  });

  describe('useSessionStorage', () => {
    it('should return the default value', () => {
      const { result } = renderHook(() => useSessionStorage('test', '777'));
      expect(result.current[0]).toBe('777');
    });

    it('should return the value from session storage', () => {
      window.sessionStorage.setItem('test', JSON.stringify('999'));
      const { result } = renderHook(() => useSessionStorage('test', '777'));
      expect(result.current[0]).toBe('999');
    });

    it('should set the value to session storage', () => {
      const { result } = renderHook(() => useSessionStorage('test', '777'));
      act(() => {
        result.current[1]('999');
      });
      expect(window.sessionStorage.getItem('test')).toBe(JSON.stringify('999'));
    });

    it('should remove the value from session storage', () => {
      window.sessionStorage.setItem('test', JSON.stringify('999'));
      const { result } = renderHook(() => useSessionStorage('test', '777'));
      act(() => {
        result.current[2]();
      });
      expect(window.sessionStorage.getItem('test')).toBe(null);
    });
  });

});