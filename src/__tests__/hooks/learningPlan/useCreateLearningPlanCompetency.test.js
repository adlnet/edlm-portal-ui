import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useCreateLearningPlanCompetency } from '@/hooks/learningPlan/useCreateLearningPlanCompetency'; 
import { useMutation, useQueryClient } from 'react-query';

jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanCompetenciesUrl: '/mocked-learning-plan-competencies-url'
}));

describe('useCreateLearningPlanCompetency', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
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

    const { result } = renderHook(() => useCreateLearningPlanCompetency());

    const mockInput = {
      learningPlanId: 'lp-123',
      competencyExternalReference: 'comp-ext-ref-456',
      competencyName: 'Team Leadership',
      priority: 1
    };
    const mockResponse = {
      id: '999',
      learning_plan: 'lp-123',
      competency_external_reference: 'comp-ext-ref-456',
      competency_external_name: 'Team Leadership',
      priority: 1
    };
    axiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const data = await result.current.mutateAsync(mockInput);

    expect(axiosInstance.post).toHaveBeenCalledWith('/mocked-learning-plan-competencies-url', {
      learning_plan: mockInput.learningPlanId,
      competency_external_reference: mockInput.competencyExternalReference,
      competency_external_name: mockInput.competencyName,
      priority: mockInput.priority
    });

    expect(data).toEqual(mockResponse);
  });

  it('onSuccess invalidates learning plan and competencies queries', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useCreateLearningPlanCompetency());

    const newComp = { id: 'abc', learning_plan: 'lp-777' };
    optionsObj.onSuccess(newComp);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-competencies']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan', 'lp-777']);
  });
});