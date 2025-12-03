import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import { useUpdateLearningPlanGoal } from '@/hooks/learningPlan/useUpdateLearningPlanGoal'; // Update as needed!


// Mocks
jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanGoalsUrl: '/mocked-learning-plan-goals-url/'
}));
jest.mock('@/utils/convertTimelineToInt', () => ({
  convertTimelineToInt: (timeline) => {
    const map = {
      '1-3 months': 3,
      '3-6 months': 6,
      '6-9 months': 9
    };
    return map[timeline] || null;
  }
}));

describe('useUpdateLearningPlanGoal', () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useQueryClient.mockReturnValue(mockQueryClient);
  });

  it('should patch with correct URL and payload; return data', async () => {
    useMutation.mockImplementation((mutationFn, options) => ({
      mutateAsync: mutationFn,
      ...options
    }));

    const { result } = renderHook(() => useUpdateLearningPlanGoal());

    const goalId = 'g601';
    const payload = {
      goalId,
      goalData: {
        goalName: 'Grow skills',
        timeline: '2027',
        resources: ['Book', 'Mentor'],
        obstacles: ['Time'],
        resourcesOther: 'Podcast',
        obstaclesOther: 'None'
      }
    };
    const mockRes = { data: { id: goalId, goal_name: 'Grow skills' } };

    axiosInstance.patch.mockResolvedValueOnce(mockRes);

    const ret = await result.current.mutateAsync(payload);

    expect(axiosInstance.patch).toHaveBeenCalledWith(
      '/mocked-learning-plan-goals-url/g601/',
      {
        goal_name: 'Grow skills',
        timeline: null, // '2027' is not in the timeline map, converts to null
        resources_support: ['Book', 'Mentor'],
        obstacles: ['Time'],
        resources_support_other: 'Podcast',
        obstacles_other: 'None'
      }
    );
    expect(ret).toEqual(mockRes.data);
  });

  it('onSuccess invalidates the proper queries', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useUpdateLearningPlanGoal());

    const someData = { id: 'goalX' };
    optionsObj.onSuccess(someData);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goals']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-competencies']);
  });
});