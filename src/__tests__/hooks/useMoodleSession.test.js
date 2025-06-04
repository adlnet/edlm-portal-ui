import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@testing-library/react';
import { axiosInstance } from '@/config/axiosConfig';
import { useMoodleSession } from '@/hooks/useMoodleSession';

jest.mock('@/config/axiosConfig', () => ({
  axiosInstance: {
    get: jest.fn()
  }
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useMoodleSession', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
    
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
    
    jest.resetModules();
  });
  
  it('should not make API call when MoodleSession cookie exists', async () => {

    document.cookie = 'MoodleSession=test123';
    
    const { result } = renderHook(() => useMoodleSession(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(axiosInstance.get).not.toHaveBeenCalled();
    expect(result.current.data).toEqual({
      status: 'Session already exists',
      existedSession: true
    });
  });

  it('should make API call when no MoodleSession cookie exists', async () => {
    axiosInstance.get.mockResolvedValueOnce({});
    
    const { result } = renderHook(() => useMoodleSession(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(axiosInstance.get).toHaveBeenCalledWith('/my/', { maxRedirects: 0 });
    expect(result.current.data).toEqual({
      status: 'Session initialized',
      existedSession: false
    });
    expect(console.log).toHaveBeenCalledWith('Moodle session cookie initialized.');
  });
  
  it('should not make multiple API calls after first attempt', async () => {
    axiosInstance.get.mockResolvedValueOnce({});
    
    const { result } = renderHook(() => useMoodleSession(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });
    
    axiosInstance.get.mockClear();
    
    await act(async () => {
      await result.current.mutateAsync();
    });
    
    expect(axiosInstance.get).not.toHaveBeenCalled();
    expect(result.current.data).toEqual({
      status: 'Session already exists', 
      existedSession: true
    });
  });
});