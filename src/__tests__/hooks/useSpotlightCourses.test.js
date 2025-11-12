// tests for useSpotlightCourses hook

import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useQuery, useQueryClient } from 'react-query';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';

jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  spotlightCourses: '/mocked-spotlight-courses'
}));

describe('useSpotlightCourses', () => {
  const mockQueryClient = {
    setQueryData: jest.fn(),
    setQueryDefaults: jest.fn(),
  };

  beforeEach(() => {
    useQueryClient.mockReturnValue(mockQueryClient);
    jest.clearAllMocks();
  });

  it('calls useQuery with correct arguments and fetcher', async () => {
    const mockResponse = { data: [{ meta: { metadata_key_hash: 'k1', id: 'i1' } }] };
    axiosInstance.get.mockResolvedValueOnce(mockResponse);

    // useQuery will receive the fetcher as second arg, let's test its behavior
    let fetcher;
    useQuery.mockImplementation((key, fn, opts) => {
      fetcher = fn;
      return { data: mockResponse.data, isLoading: false };
    });

    const { result } = renderHook(() => useSpotlightCourses());

    expect(useQuery).toHaveBeenCalledWith(
      'spotlight-courses',
      expect.any(Function),
      expect.objectContaining({
        staleTime: expect.anything(),
        onSuccess: expect.any(Function)
      })
    );

    // Simulate fetcher call
    await fetcher();
    expect(axiosInstance.get).toHaveBeenCalledWith('/mocked-spotlight-courses');
  });

  it('onSuccess caches each course by metadata_key_hash and sets query defaults', () => {
    const fakeCourses = [
      { meta: { metadata_key_hash: 'abc123', id: 'id1' }, value: 10 },
      { meta: { metadata_key_hash: 'xyz789', id: 'id2' }, value: 20 }
    ];
    useQuery.mockImplementation((key, fn, opts) => {
      // Simulate a successful fetch
      opts.onSuccess(fakeCourses);
      return { data: fakeCourses, isLoading: false };
    });

    renderHook(() => useSpotlightCourses());

    // Each course should be cached and defaults set
    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(
      ['course', 'abc123'],
      fakeCourses[0]
    );
    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(
      ['course', 'xyz789'],
      fakeCourses[1]
    );
    expect(mockQueryClient.setQueryDefaults).toHaveBeenCalledWith(
      ['course', 'id1'],
      expect.objectContaining({
        staleTime: expect.anything(),
        cacheTime: expect.anything()
      })
    );
    expect(mockQueryClient.setQueryDefaults).toHaveBeenCalledWith(
      ['course', 'id2'],
      expect.objectContaining({
        staleTime: expect.anything(),
        cacheTime: expect.anything()
      })
    );
  });

  it('onSuccess does nothing if data is not an array', () => {
    useQuery.mockImplementation((key, fn, opts) => {
      opts.onSuccess(undefined);
      return { data: undefined, isLoading: false };
    });

    renderHook(() => useSpotlightCourses());

    expect(mockQueryClient.setQueryData).not.toHaveBeenCalled();
    expect(mockQueryClient.setQueryDefaults).not.toHaveBeenCalled();
  });
});