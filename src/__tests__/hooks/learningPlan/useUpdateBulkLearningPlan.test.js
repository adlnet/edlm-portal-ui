import { act, renderHook } from '@testing-library/react';
import { useQueryClient } from 'react-query';
import { useUpdateBulkLearningPlan } from '@/hooks/learningPlan/useUpdateBulkLearningPlan';


// Mock hooks
jest.mock('@/hooks/learningPlan/useUpdateLearningPlan');
jest.mock('@/hooks/learningPlan/useCreateLearningPlanCompetency');
jest.mock('@/hooks/learningPlan/useUpdateLearningPlanCompetency');
jest.mock('@/hooks/learningPlan/useDeleteLearningPlanCompetency');
jest.mock('@/hooks/learningPlan/useCreateLearningPlanGoal');
jest.mock('@/hooks/learningPlan/useUpdateLearningPlanGoal');
jest.mock('@/hooks/learningPlan/useDeleteLearningPlanGoal');
jest.mock('@/hooks/learningPlan/useCreateLearningPlanGoalKsa');
jest.mock('@/hooks/learningPlan/useUpdateLearningPlanGoalKsa');
jest.mock('@/hooks/learningPlan/useDeleteLearningPlanGoalKsa');
jest.mock('react-query');

const mockUpdatePlan    = jest.fn();
const mockCreateComp    = jest.fn();
const mockUpdateComp    = jest.fn();
const mockDeleteComp    = jest.fn();
const mockCreateGoal    = jest.fn();
const mockUpdateGoal    = jest.fn();
const mockDeleteGoal    = jest.fn();
const mockCreateKsa     = jest.fn();
const mockUpdateKsa     = jest.fn();
const mockDeleteKsa     = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  require('@/hooks/learningPlan/useUpdateLearningPlan').useUpdateLearningPlan.mockReturnValue({ mutateAsync: mockUpdatePlan });
  require('@/hooks/learningPlan/useCreateLearningPlanCompetency').useCreateLearningPlanCompetency.mockReturnValue({ mutateAsync: mockCreateComp });
  require('@/hooks/learningPlan/useUpdateLearningPlanCompetency').useUpdateLearningPlanCompetency.mockReturnValue({ mutateAsync: mockUpdateComp });
  require('@/hooks/learningPlan/useDeleteLearningPlanCompetency').useDeleteLearningPlanCompetency.mockReturnValue({ mutateAsync: mockDeleteComp });
  require('@/hooks/learningPlan/useCreateLearningPlanGoal').useCreateLearningPlanGoal.mockReturnValue({ mutateAsync: mockCreateGoal });
  require('@/hooks/learningPlan/useUpdateLearningPlanGoal').useUpdateLearningPlanGoal.mockReturnValue({ mutateAsync: mockUpdateGoal });
  require('@/hooks/learningPlan/useDeleteLearningPlanGoal').useDeleteLearningPlanGoal.mockReturnValue({ mutateAsync: mockDeleteGoal });
  require('@/hooks/learningPlan/useCreateLearningPlanGoalKsa').useCreateLearningPlanGoalKsa.mockReturnValue({ mutateAsync: mockCreateKsa });
  require('@/hooks/learningPlan/useUpdateLearningPlanGoalKsa').useUpdateLearningPlanGoalKsa.mockReturnValue({ mutateAsync: mockUpdateKsa });
  require('@/hooks/learningPlan/useDeleteLearningPlanGoalKsa').useDeleteLearningPlanGoalKsa.mockReturnValue({ mutateAsync: mockDeleteKsa });
  useQueryClient.mockReturnValue({
    invalidateQueries: jest.fn()
  });
});

describe('useUpdateBulkLearningPlan', () => {
  it('performs full create/update/delete logic and invalidates queries on success', async () => {
    // Arrange
    const planId = 'plan1';
    mockUpdatePlan.mockResolvedValueOnce();
    mockCreateComp.mockResolvedValueOnce({ id: 'newComp1' });
    mockUpdateComp.mockResolvedValueOnce();
    mockDeleteComp.mockResolvedValueOnce();
    mockCreateGoal.mockResolvedValueOnce({ id: 'newGoal1' });
    mockUpdateGoal.mockResolvedValueOnce();
    mockDeleteGoal.mockResolvedValueOnce();
    mockCreateKsa.mockResolvedValueOnce({ id: 'newKsa1' });
    mockUpdateKsa.mockResolvedValueOnce();
    mockDeleteKsa.mockResolvedValueOnce();

    const invalidateQueries = jest.fn();
    useQueryClient.mockReturnValue({ invalidateQueries });

    const planData = {
      planId,
      planName: 'Test Plan',
      timeframe: '2026',
      competencies: [
        {
          id: 'compA',
          isNew: true,
          priority: 1,
          competencyId: 'cExt1',
          name: 'CompA',
          goals: [
            {
              id: 'goalA',
              isNew: true,
              goal: 'GoalA',
              timeline: 'Q1',
              resources: ['res1'],
              obstacles: ['obs1'],
              ksas: [
                { isNew: true, ksaId: 'ksa1', type: 'TYPE1', currentLevel: 0, targetLevel: 3 }
              ]
            }
          ]
        },
        {
          id: 'compB',
          isDeleted: true,
          goals: []
        },
        {
          id: 'compC',
          isNew: false,
          goals: [
            {
              id: 'goalB',
              isDeleted: true,
              ksas: []
            },
            {
              id: 'goalC',
              isNew: false,
              goal: 'GoalC',
              timeline: 'Q2',
              ksas: [
                { id: 'ksaOld', isNew: false, isDeleted: false, ksaId: 'ksa2', currentLevel: 1, targetLevel: 5 }
              ]
            }
          ]
        }
      ]
    };

    const { result } = renderHook(() => useUpdateBulkLearningPlan());

    // Act
    let success;
    await act(async () => {
      success = await result.current.updateCompleteLearningPlan(planData);
    });

    // Assert: create first new comp, delete compB, update compC, etc
    expect(mockUpdatePlan).toHaveBeenCalledWith({
      planId,
      planData: { planName: 'Test Plan', timeframe: '2026' }
    });

    expect(mockCreateComp).toHaveBeenCalled();
    expect(mockDeleteComp).toHaveBeenCalledWith('compB');
    expect(mockUpdateComp).toHaveBeenCalledWith({
      competencyId: 'compC',
      competencyData: { competencyExternalReference: undefined, priority: undefined }
    });

    expect(mockCreateGoal).toHaveBeenCalled();
    expect(mockDeleteGoal).toHaveBeenCalledWith('goalB');
    expect(mockUpdateGoal).toHaveBeenCalledWith({
      goalId: 'goalC',
      goalData: expect.any(Object)
    });

    expect(mockCreateKsa).toHaveBeenCalled();
    expect(mockUpdateKsa).toHaveBeenCalled();
    expect(mockDeleteKsa).not.toHaveBeenCalled(); // since no isDeleted ksas in this mock

    expect(invalidateQueries).toHaveBeenCalledWith(['learning-plan', planId]);
    expect(invalidateQueries).toHaveBeenCalledWith(['learning-plans']);

    expect(success).toBe(true);
  });

  it('returns false and logs error if an exception occurs', async () => {
    mockUpdatePlan.mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useUpdateBulkLearningPlan());
    let ret;
    await act(async () => {
      ret = await result.current.updateCompleteLearningPlan({
        planId: 'plan1',
        planName: 'err',
        timeframe: '',
        competencies: []
      });
    });
    expect(ret).toBe(false);
  });

  it('isLoading is always false', () => {
    const { result } = renderHook(() => useUpdateBulkLearningPlan());
    expect(result.current.isLoading).toBe(false);
  });
});