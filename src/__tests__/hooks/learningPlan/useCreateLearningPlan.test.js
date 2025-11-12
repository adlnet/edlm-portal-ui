import { axiosInstance } from '@/config/axiosConfig';
import { renderHook} from '@testing-library/react';
import { useCreateLearningPlan } from '@/hooks/learningPlan/useCreateLearningPlan';
import { useMutation, useQueryClient } from 'react-query';

jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlansUrl: '/mocked-learning-plans-url'
}));

describe('useCreateLearningPlan', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn(),
    setQueryData: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('calls useMutation with correct mutation function and options', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useCreateLearningPlan());

    const mockPlan = { planName: 'Test Plan', timeframe: 'Q1' };
    const mockResponse = { id: '123', name: 'Test Plan', timeframe: 'Q1' };
    axiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const data = await result.current.mutateAsync(mockPlan);

    expect(axiosInstance.post).toHaveBeenCalledWith('/mocked-learning-plans-url', {
      name: mockPlan.planName,
      timeframe: mockPlan.timeframe
    });
    expect(data).toEqual(mockResponse);
  });

  it('onSuccess invalidates and sets cache for the created learning plan', async () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useCreateLearningPlan());

    const newPlan = { id: '111', name: 'X', timeframe: 'Y' };
    optionsObj.onSuccess(newPlan);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plans']);
    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(['learning-plan', '111'], newPlan);
  });
});