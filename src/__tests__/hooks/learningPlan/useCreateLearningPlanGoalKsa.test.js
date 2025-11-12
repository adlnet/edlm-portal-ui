import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useCreateLearningPlanGoalKsa } from '@/hooks/learningPlan/useCreateLearningPlanGoalKsa'; // Adjust path as needed
import { useMutation, useQueryClient } from 'react-query';


jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanGoalKsasUrl: '/mocked-learning-plan-goal-ksas-url'
}));

describe('useCreateLearningPlanGoalKsa', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('calls useMutation with the correct mutation function and API arguments', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useCreateLearningPlanGoalKsa());

    const mockInput = {
      planGoalId: 'pg-99',
      ksaExternalReference: 'ksa-abc',
      currentLevel: 2,
      targetLevel: 4
    };
    const mockResponse = {
      id: 'ksa-777',
      plan_goal: 'pg-99',
      ksa_external_reference: 'ksa-abc',
      current_proficiency: 2,
      target_proficiency: 4
    };
    axiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const data = await result.current.mutateAsync(mockInput);

    expect(axiosInstance.post).toHaveBeenCalledWith('/mocked-learning-plan-goal-ksas-url', {
      plan_goal: mockInput.planGoalId,
      ksa_external_reference: mockInput.ksaExternalReference,
      current_proficiency: mockInput.currentLevel,
      target_proficiency: mockInput.targetLevel
    });

    expect(data).toEqual(mockResponse);
  });

  it('onSuccess invalidates related caches for KSA and goals', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useCreateLearningPlanGoalKsa());

    const newKsa = { id: 'ksa-888' };
    optionsObj.onSuccess(newKsa);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goal-ksas']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goals']);
  });
});