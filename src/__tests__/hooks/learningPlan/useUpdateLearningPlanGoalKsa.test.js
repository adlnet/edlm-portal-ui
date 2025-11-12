import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import { useUpdateLearningPlanGoalKsa } from '@/hooks/learningPlan/useUpdateLearningPlanGoalKsa';


jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanGoalKsasUrl: '/mocked-learning-plan-goal-ksas-url/'
}));

describe('useUpdateLearningPlanGoalKsa', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('patches correct URL and body, returns response data', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useUpdateLearningPlanGoalKsa());

    const ksaId = 'ksa200';
    const payload = {
      ksaId,
      ksaData: {
        ksaExternalReference: 'ref-x',
        currentLevel: 3,
        targetLevel: 5
      }
    };
    const mockRes = { data: { id: ksaId, ksa_external_reference: 'ref-x' } };
    axiosInstance.patch.mockResolvedValueOnce(mockRes);

    const ret = await result.current.mutateAsync(payload);

    expect(axiosInstance.patch).toHaveBeenCalledWith(
      '/mocked-learning-plan-goal-ksas-url/ksa200/',
      {
        ksa_external_reference: 'ref-x',
        current_proficiency: 3,
        target_proficiency: 5
      }
    );
    expect(ret).toEqual(mockRes.data);
  });

  it('invalidates ksa and goal queries on success', () => {
    let opts;
    useMutation.mockImplementation((mutationFn, options) => {
      opts = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useUpdateLearningPlanGoalKsa());
    opts.onSuccess({ id: 'k456' });

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goal-ksas']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goals']);
  });
});