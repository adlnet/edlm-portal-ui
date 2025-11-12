import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import { useUpdateLearningPlanCompetency } from '@/hooks/learningPlan/useUpdateLearningPlanCompetency'; // Adjust the path as needed


jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanCompetenciesUrl: '/mocked-learning-plan-comps-url/'
}));

describe('useUpdateLearningPlanCompetency', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('uses useMutation with correct PATCH logic and endpoint', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useUpdateLearningPlanCompetency());

    const competencyId = 'c456';
    const payload = {
      competencyId,
      competencyData: { competencyExternalReference: 'cex1', priority: 2 }
    };
    const fakeResponse = { data: { id: 'c456', learning_plan: 'planX' } };
    axiosInstance.patch.mockResolvedValueOnce(fakeResponse);

    // Act
    const data = await result.current.mutateAsync(payload);

    expect(axiosInstance.patch).toHaveBeenCalledWith(
      '/mocked-learning-plan-comps-url/c456/',
      { competency_external_reference: 'cex1', priority: 2 }
    );
    expect(data).toEqual(fakeResponse.data);
  });

  it('onSuccess invalidates correct queries with returned data', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useUpdateLearningPlanCompetency());

    const updated = { id: 'c2', learning_plan: 'pl2' };
    optionsObj.onSuccess(updated);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-competencies']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan', 'pl2']);
  });
});