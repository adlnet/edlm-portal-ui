import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useLearningPlan } from '@/hooks/learningPlan/useLearningPlan'; // Adjust path as needed
import { useQuery } from 'react-query';


jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlansUrl: '/mocked-learning-plans-url/'
}));
jest.mock('@/config/timeConstants', () => ({
  tenMinutes: 600000
}));

describe('useLearningPlan', () => {
  const mockQueryResult = { data: { id: 'abc123', name: 'Test Plan' } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses useQuery with correct key, function, and options when planId is provided', async () => {
    useQuery.mockImplementation((queryKey, queryFn, options) => {
      return {
        ...mockQueryResult,
        queryKey,
        options,
        fetchFn: queryFn
      };
    });

    const testPlanId = 'abc123';
    const { result } = renderHook(() => useLearningPlan(testPlanId));

    expect(useQuery).toHaveBeenCalledWith(
      ['learning-plan', testPlanId],
      expect.any(Function),
      {
        enabled: true,
        staleTime: 600000,
        cacheTime: 600000
      }
    );

    // Ensure the function fetches the right URL and returns the correct data
    const fakeResponse = { data: { id: testPlanId, name: 'Sample Plan' } };
    axiosInstance.get.mockResolvedValueOnce(fakeResponse);

    // Manually invoke the fetch function for isolated unit test
    const data = await result.current.fetchFn();
    expect(axiosInstance.get).toHaveBeenCalledWith('/mocked-learning-plans-url/abc123/');
    expect(data).toEqual(fakeResponse.data);
  });

  it('sets enabled to false if planId is falsy', () => {
    useQuery.mockImplementation(() => mockQueryResult);

    renderHook(() => useLearningPlan(undefined));

    expect(useQuery).toHaveBeenCalledWith(
      ['learning-plan', undefined],
      expect.any(Function),
      {
        enabled: false,
        staleTime: 600000,
        cacheTime: 600000
      }
    );
  });
});