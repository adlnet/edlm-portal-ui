import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useCreateLearningPlanGoal } from '@/hooks/learningPlan/useCreateLearningPlanGoal';
import { useMutation, useQueryClient } from 'react-query';

jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanGoalsUrl: '/mocked-learning-plan-goals-url'
}));
jest.mock('@/utils/convertTimelineToInt', () => ({
  convertTimelineToInt: (timeline) => {
    const map = {
      '1-3 months': 3,
      '3-6 months': 6,
      '6-9 months': 9,
      'Q4': null
    };
    return map[timeline] || null;
  }
}));

describe('useCreateLearningPlanGoal', () => {
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

    const { result } = renderHook(() => useCreateLearningPlanGoal());

    const mockInput = {
      planCompetencyId: 'pc-1',
      goalName: 'Achieve X',
      timeline: '3-6 months',
      resources: ['Resource A'],
      obstacles: ['Obstacle B'],
      resourcesOther: 'Other resources',
      obstaclesOther: 'Other obstacles'
    };
    const mockResponse = {
      id: 'goal-321',
      plan_competency: 'pc-1',
      goal_name: 'Achieve X',
      timeline: '3-6 months',
      resources_support: ['Resource A'],
      obstacles: ['Obstacle B'],
      resources_support_other: 'Other resources',
      obstacles_other: 'Other obstacles'
    };
    axiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const data = await result.current.mutateAsync(mockInput);

    expect(axiosInstance.post).toHaveBeenCalledWith('/mocked-learning-plan-goals-url', {
      plan_competency: mockInput.planCompetencyId,
      goal_name: mockInput.goalName,
      timeline: 6, // '3-6 months' converts to 6
      resources_support: mockInput.resources,
      obstacles: mockInput.obstacles,
      resources_support_other: mockInput.resourcesOther,
      obstacles_other: mockInput.obstaclesOther
    });

    expect(data).toEqual(mockResponse);
  });

  it('handles default arrays and strings when values are omitted', async () => {
    useMutation.mockImplementation((mutationFn) => ({
      mutateAsync: mutationFn
    }));

    const { result } = renderHook(() => useCreateLearningPlanGoal());

    const inputWithDefaults = {
      planCompetencyId: 'pc-2',
      goalName: 'Default',
      timeline: 'Q4'
    };

    const mockResponse = {
      id: 'goal-default'
    };
    axiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    await result.current.mutateAsync(inputWithDefaults);

    expect(axiosInstance.post).toHaveBeenCalledWith('/mocked-learning-plan-goals-url', {
      plan_competency: 'pc-2',
      goal_name: 'Default',
      timeline: null,
      resources_support: [],
      obstacles: [],
      resources_support_other: '',
      obstacles_other: ''
    });
  });

  it('onSuccess invalidates learning plan goal and competencies queries', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useCreateLearningPlanGoal());

    const newGoal = { id: 'goal-777' };
    optionsObj.onSuccess(newGoal);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goals']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-competencies']);
  });
});
