import { axiosInstance } from '@/config/axiosConfig';
import { renderHook } from '@testing-library/react';
import { useCreateLearningPlanGoalCourse } from '@/hooks/learningPlan/useCreateLearningPlanGoalCourse';
import { useMutation, useQueryClient } from 'react-query';


jest.mock('react-query');
jest.mock('@/config/axiosConfig');
jest.mock('@/config/endpoints', () => ({
  learningPlanGoalCoursesUrl: '/mocked-learning-plan-goal-courses-url'
}));

describe('useCreateLearningPlanGoalCourse', () => {
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

    const { result } = renderHook(() => useCreateLearningPlanGoalCourse());

    const mockInput = {
      planGoalId: 'goal-1',
      courseExternalReference: 'course-ext-ref'
    };
    const mockResponse = {
      id: 'lpgc-404',
      plan_goal: 'goal-1',
      course_external_reference: 'course-ext-ref'
    };
    axiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const data = await result.current.mutateAsync(mockInput);

    expect(axiosInstance.post).toHaveBeenCalledWith('/mocked-learning-plan-goal-courses-url', {
      plan_goal: mockInput.planGoalId,
      course_external_reference: mockInput.courseExternalReference
    });

    expect(data).toEqual(mockResponse);
  });

  it('onSuccess invalidates related learning plan goal course, goals, and parent plan caches', () => {
    let optionsObj;
    useMutation.mockImplementation((mutationFn, options) => {
      optionsObj = options;
      return { mutate: mutationFn };
    });

    renderHook(() => useCreateLearningPlanGoalCourse());

    const newCourse = { id: 'c-321', plan_goal: 'pg-987' };
    optionsObj.onSuccess(newCourse);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goal-courses']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan-goals']);
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['learning-plan']);
  });
});
