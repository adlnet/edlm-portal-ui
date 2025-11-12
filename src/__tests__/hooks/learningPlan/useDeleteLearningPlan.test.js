import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useDeleteLearningPlan } from '@/hooks/learningPlan/useDeleteLearningPlan'; // Adjust path if needed
import { useMutation, useQueryClient } from 'react-query';


jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlansUrl: '/mocked-learning-plans-url/'
}));

describe('useDeleteLearningPlan', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('calls useMutation with correct mutation function (axios.delete with right URL)', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useDeleteLearningPlan());

    const fakePlanId = 'lp123';
    const mockResponse = { success: true };
    axiosInstance.delete.mockResolvedValueOnce({ data: mockResponse });

    const data = await result.current.mutateAsync(fakePlanId);

    expect(axiosInstance.delete).toHaveBeenCalledWith('/mocked-learning-plans-url/lp123/');
    expect(data).toEqual(mockResponse);
  });

  it('onSuccess invalidates the learning-plans query', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useDeleteLearningPlan());

    optionsObj.onSuccess();
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plans']);
  });
});