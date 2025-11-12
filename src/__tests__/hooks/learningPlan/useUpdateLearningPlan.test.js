import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import { useUpdateLearningPlan } from '@/hooks/learningPlan/useUpdateLearningPlan'; // Adjust import path as needed


jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlansUrl: '/mocked-learning-plans-url/'
}));

describe('useUpdateLearningPlan', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn(),
    setQueryData: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('calls useMutation with the correct mutation function and expected endpoint', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useUpdateLearningPlan());

    const planId = 'abc123';
    const payload = { planId, planData: { planName: 'Hello', timeframe: '2026' } };
    const fakeResponse = { data: { id: planId, name: 'Hello', timeframe: '2026' } };
    axiosInstance.patch.mockResolvedValueOnce(fakeResponse);

    // Act
    const data = await result.current.mutateAsync(payload);

    expect(axiosInstance.patch).toHaveBeenCalledWith(
      '/mocked-learning-plans-url/abc123/',
      { name: 'Hello', timeframe: '2026' }
    );
    expect(data).toEqual(fakeResponse.data);
  });

  it('onSuccess invalidates and sets correct queries', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useUpdateLearningPlan());

    const updatedPlan = { id: 'p1', name: 'New Plan' };
    optionsObj.onSuccess(updatedPlan);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plans']);
    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(['learning-plan', 'p1'], updatedPlan);
  });
});