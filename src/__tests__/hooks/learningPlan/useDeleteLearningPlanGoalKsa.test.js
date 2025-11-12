import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useDeleteLearningPlanGoalKsa } from '@/hooks/learningPlan/useDeleteLearningPlanGoalKsa'; // Adjust import path if needed
import { useMutation, useQueryClient } from 'react-query';


jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanGoalKsasUrl: '/mocked-learning-plan-goal-ksas-url/'
}));

describe('useDeleteLearningPlanGoalKsa', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('calls useMutation with correct mutation function and API arguments', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useDeleteLearningPlanGoalKsa());

    const fakeKsaId = 'ksa321';
    const mockResponse = { deleted: true };
    axiosInstance.delete.mockResolvedValueOnce({ data: mockResponse });

    const data = await result.current.mutateAsync(fakeKsaId);

    expect(axiosInstance.delete).toHaveBeenCalledWith('/mocked-learning-plan-goal-ksas-url/ksa321/');
    expect(data).toEqual(mockResponse);
  });

  it('onSuccess invalidates learning-plan-goal-ksas and learning-plan-goals queries', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useDeleteLearningPlanGoalKsa());

    optionsObj.onSuccess();

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goal-ksas']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goals']);
  });
});