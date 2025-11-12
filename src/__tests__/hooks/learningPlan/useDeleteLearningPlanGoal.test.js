import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useDeleteLearningPlanGoal } from '@/hooks/learningPlan/useDeleteLearningPlanGoal'; // Adjust path if needed
import { useMutation, useQueryClient } from 'react-query';


jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanGoalsUrl: '/mocked-learning-plan-goals-url/'
}));

describe('useDeleteLearningPlanGoal', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('uses useMutation that calls axios.delete with the correct URL', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useDeleteLearningPlanGoal());

    const fakeGoalId = 'goal456';
    const mockResponse = { deleted: true };
    axiosInstance.delete.mockResolvedValueOnce({ data: mockResponse });

    const data = await result.current.mutateAsync(fakeGoalId);

    expect(axiosInstance.delete).toHaveBeenCalledWith('/mocked-learning-plan-goals-url/goal456/');
    expect(data).toEqual(mockResponse);
  });

  it('onSuccess invalidates learning-plan-goals and learning-plan-competencies queries', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useDeleteLearningPlanGoal());

    optionsObj.onSuccess();

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goals']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-competencies']);
  });
});