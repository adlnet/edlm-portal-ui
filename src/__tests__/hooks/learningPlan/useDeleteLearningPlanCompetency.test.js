import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useDeleteLearningPlanCompetency } from '@/hooks/learningPlan/useDeleteLearningPlanCompetency'; // Adjust the import path as necessary
import { useMutation, useQueryClient } from 'react-query';

jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanCompetenciesUrl: '/mocked-learning-plan-competencies-url/'
}));

describe('useDeleteLearningPlanCompetency', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('uses useMutation with the correct mutation function (calls axios.delete with correct URL)', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useDeleteLearningPlanCompetency());

    const fakeCompetencyId = 'comp123';
    const mockResponse = { deleted: true };
    axiosInstance.delete.mockResolvedValueOnce({ data: mockResponse });

    const data = await result.current.mutateAsync(fakeCompetencyId);

    expect(axiosInstance.delete).toHaveBeenCalledWith('/mocked-learning-plan-competencies-url/comp123/');
    expect(data).toEqual(mockResponse);
  });

  it('onSuccess invalidates the learning-plan-competencies query', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useDeleteLearningPlanCompetency());

    optionsObj.onSuccess();

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-competencies']);
  });
});