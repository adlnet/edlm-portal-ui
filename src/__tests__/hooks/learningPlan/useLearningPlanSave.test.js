import { act, renderHook  } from '@testing-library/react';
import { useLearningPlanSave } from '@/hooks/learningPlan/useLearningPlanSave';

// All mocks are created inside factories and attached to __mock__ property
jest.mock('@/hooks/learningPlan/useCreateLearningPlan', () => {
  const mockCreatePlan = jest.fn();
  return {
    useCreateLearningPlan: () => ({ mutateAsync: mockCreatePlan }),
    __mock__: { mockCreatePlan }
  };
});
jest.mock('@/hooks/learningPlan/useUpdateLearningPlan', () => {
  const mockUpdatePlan = jest.fn();
  return {
    useUpdateLearningPlan: () => ({ mutateAsync: mockUpdatePlan }),
    __mock__: { mockUpdatePlan }
  };
});
jest.mock('@/hooks/learningPlan/useCreateLearningPlanCompetency', () => {
  const mockCreateCompetency = jest.fn();
  return {
    useCreateLearningPlanCompetency: () => ({ mutateAsync: mockCreateCompetency }),
    __mock__: { mockCreateCompetency }
  };
});
jest.mock('@/hooks/learningPlan/useUpdateLearningPlanCompetency', () => {
  const mockUpdateCompetency = jest.fn();
  return {
    useUpdateLearningPlanCompetency: () => ({ mutateAsync: mockUpdateCompetency }),
    __mock__: { mockUpdateCompetency }
  };
});
jest.mock('@/hooks/learningPlan/useCreateLearningPlanGoal', () => {
  const mockCreateGoal = jest.fn();
  return {
    useCreateLearningPlanGoal: () => ({ mutateAsync: mockCreateGoal }),
    __mock__: { mockCreateGoal }
  };
});
jest.mock('@/hooks/learningPlan/useUpdateLearningPlanGoal', () => {
  const mockUpdatePlanGoal = jest.fn();
  return {
    useUpdateLearningPlanGoal: () => ({ mutateAsync: mockUpdatePlanGoal }),
    __mock__: { mockUpdatePlanGoal }
  };
});
jest.mock('@/hooks/learningPlan/useCreateLearningPlanGoalKsa', () => {
  const mockCreateKsa = jest.fn();
  return {
    useCreateLearningPlanGoalKsa: () => ({ mutateAsync: mockCreateKsa }),
    __mock__: { mockCreateKsa }
  };
});
jest.mock('@/hooks/learningPlan/useUpdateLearningPlanGoalKsa', () => {
  const mockUpdateKsa = jest.fn();
  return {
    useUpdateLearningPlanGoalKsa: () => ({ mutateAsync: mockUpdateKsa }),
    __mock__: { mockUpdateKsa }
  };
});
jest.mock('@/hooks/learningPlan/useDeleteLearningPlanCompetency', () => {
  const mockDeleteCompetency = jest.fn();
  return {
    useDeleteLearningPlanCompetency: () => ({ mutateAsync: mockDeleteCompetency }),
    __mock__: { mockDeleteCompetency }
  };
});

// Helper to get the mocks (safe with module system)
function getMocks(modulePath) {
  return require(modulePath).__mock__;
}

// Helper to silence expected errors
function mockConsole(type = 'error') {
  const spy = jest.spyOn(console, type).mockImplementation(() => {});
  return spy;
}

const defaultFormState = {
  planName: 'abcd',
  timeframe: '2024',
  goals: [],
  competencyGoals: {},
  savedPlanId: null,
  setSavedPlanId: jest.fn(),
  competencyIds: {},
  setCompetencyIds: jest.fn(),
  nextStep: jest.fn(),
  setCurrentStep: jest.fn(),
};

beforeEach(() => {
  // Reset all mocks before each test
  Object.values(getMocks('@/hooks/learningPlan/useCreateLearningPlan')).forEach(fn => fn.mockReset());
  Object.values(getMocks('@/hooks/learningPlan/useUpdateLearningPlan')).forEach(fn => fn.mockReset());
  Object.values(getMocks('@/hooks/learningPlan/useCreateLearningPlanCompetency')).forEach(fn => fn.mockReset());
  Object.values(getMocks('@/hooks/learningPlan/useUpdateLearningPlanCompetency')).forEach(fn => fn.mockReset());
  Object.values(getMocks('@/hooks/learningPlan/useCreateLearningPlanGoal')).forEach(fn => fn.mockReset());
  Object.values(getMocks('@/hooks/learningPlan/useUpdateLearningPlanGoal')).forEach(fn => fn.mockReset());
  Object.values(getMocks('@/hooks/learningPlan/useCreateLearningPlanGoalKsa')).forEach(fn => fn.mockReset());
  Object.values(getMocks('@/hooks/learningPlan/useUpdateLearningPlanGoalKsa')).forEach(fn => fn.mockReset());
  Object.values(getMocks('@/hooks/learningPlan/useDeleteLearningPlanCompetency')).forEach(fn => fn.mockReset());
});

describe('useLearningPlanSave', () => {
  it('handleSaveStep(2): calls createPlan if no savedPlanId', async () => {
    const { mockCreatePlan } = getMocks('@/hooks/learningPlan/useCreateLearningPlan');
    mockCreatePlan.mockResolvedValue({ id: 42 });
    const formState = { ...defaultFormState, savedPlanId: null, setSavedPlanId: jest.fn() };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      await result.current.handleSaveStep(2);
    });
    expect(mockCreatePlan).toHaveBeenCalledWith({ planName: 'abcd', timeframe: '2024' });
    expect(formState.setSavedPlanId).toHaveBeenCalledWith(42);
  });

  it('handleSaveStep(2): calls updatePlan if savedPlanId', async () => {
    const { mockUpdatePlan } = getMocks('@/hooks/learningPlan/useUpdateLearningPlan');
    mockUpdatePlan.mockResolvedValue({});
    const formState = { ...defaultFormState, savedPlanId: 100 };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      await result.current.handleSaveStep(2);
    });
    expect(mockUpdatePlan).toHaveBeenCalledWith({
      planId: 100,
      planData: { planName: 'abcd', timeframe: '2024' },
    });
  });

  it('handleSaveStep(3): updates and creates competencies', async () => {
    const { mockUpdateCompetency } = getMocks('@/hooks/learningPlan/useUpdateLearningPlanCompetency');
    const { mockCreateCompetency } = getMocks('@/hooks/learningPlan/useCreateLearningPlanCompetency');
    mockUpdateCompetency.mockResolvedValue({});
    mockCreateCompetency.mockResolvedValue({ id: 'newid' });
    const formState = {
      ...defaultFormState,
      goals: [
        { competency: 'C1', competencyId: 'c1', priority: 1 }, // update
        { competency: 'C2', priority: 2 }, // create
      ],
      competencyIds: { 0: 'existingid' },
      savedPlanId: 'pid',
      setCompetencyIds: jest.fn(),
    };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      await result.current.handleSaveStep(3);
    });
    expect(mockUpdateCompetency).toHaveBeenCalledWith({
      competencyId: 'existingid',
      competencyData: {
        competencyExternalReference: 'c1',
        competencyName: 'C1',
        priority: 1,
      },
    });
    expect(mockCreateCompetency).toHaveBeenCalledWith({
      learningPlanId: 'pid',
      priority: 2,
      competencyExternalReference: 'C2',
      competencyName: 'C2'
    });
    expect(formState.setCompetencyIds).toHaveBeenCalled();
  });

  it('handleSaveStep(4): exits early and sets step if no savedPlanId', async () => {
    const formState = { ...defaultFormState, savedPlanId: null, setCurrentStep: jest.fn() };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      await result.current.handleSaveStep(4);
    });
    expect(formState.setCurrentStep).toHaveBeenCalledWith(2);
  });

  it('returns false for invalid step', async () => {
    const formState = { ...defaultFormState };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    let out;
    await act(async () => {
      out = await result.current.handleSaveStep(99);
    });
    expect(out).toBe(false);
  });

  it('isLoading is always false', () => {
    const formState = { ...defaultFormState };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    expect(result.current.isLoading).toBe(false);
  });

  it('handleSaveStep(2): catches error and returns false', async () => {
    const { mockCreatePlan } = getMocks('@/hooks/learningPlan/useCreateLearningPlan');
    const spy = mockConsole();
    mockCreatePlan.mockRejectedValue(new Error('fail'));
    const formState = { ...defaultFormState, savedPlanId: null };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    let ret;
    await act(async () => {
      ret = await result.current.handleSaveStep(2);
    });
    expect(ret).toBe(false);
    expect(spy).toHaveBeenCalledWith('Failed to save step 2');
    spy.mockRestore();
  });

  it('handleSaveStep(3): only updates competency if exists, else creates', async () => {
    const { mockUpdateCompetency } = getMocks('@/hooks/learningPlan/useUpdateLearningPlanCompetency');
    const { mockCreateCompetency } = getMocks('@/hooks/learningPlan/useCreateLearningPlanCompetency');
    mockUpdateCompetency.mockResolvedValue({});
    mockCreateCompetency.mockResolvedValue({ id: 'newid' });

    // Will update first, create second
    const setCompetencyIds = jest.fn();
    const formState = {
      ...defaultFormState,
      goals: [
        { competency: 'C1', competencyId: 'c1', priority: 1 }, // update
        { competency: 'C2', priority: 2 }, // create
      ],
      competencyIds: { 0: 'existingid' }, // first is update, second is create
      savedPlanId: 'pid',
      setCompetencyIds,
    };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      await result.current.handleSaveStep(3);
    });
    expect(mockUpdateCompetency).toHaveBeenCalled();
    expect(mockCreateCompetency).toHaveBeenCalled();
    expect(setCompetencyIds).toHaveBeenCalledWith({ C1: 'existingid', C2: 'newid' });
  });

  it('handleSaveStep(3): skips goals without competency', async () => {
    const { mockUpdateCompetency } = getMocks('@/hooks/learningPlan/useUpdateLearningPlanCompetency');
    const { mockCreateCompetency } = getMocks('@/hooks/learningPlan/useCreateLearningPlanCompetency');
    mockUpdateCompetency.mockResolvedValue({});
    mockCreateCompetency.mockResolvedValue({ id: 'newid' });
    const setCompetencyIds = jest.fn();
    const formState = {
      ...defaultFormState,
      goals: [{}, { competency: 'C2', priority: 2 }],
      competencyIds: {},
      savedPlanId: 'pid',
      setCompetencyIds,
    };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      await result.current.handleSaveStep(3);
    });
    expect(mockCreateCompetency).toHaveBeenCalledWith(expect.objectContaining({ competencyName: 'C2' }));
    expect(setCompetencyIds).toHaveBeenCalledWith({ C2: 'newid' });
  });

  it('handleSaveStep(4): exits early and sets step if no savedPlanId', async () => {
    const setCurrentStep = jest.fn();
    const formState = { ...defaultFormState, savedPlanId: null, setCurrentStep };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      await result.current.handleSaveStep(4);
    });
    expect(setCurrentStep).toHaveBeenCalledWith(2);
  });

  it('handleSaveStep(4): creates goals and KSAs for each competency', async () => {
    const { mockCreateGoal } = getMocks('@/hooks/learningPlan/useCreateLearningPlanGoal');
    const { mockCreateKsa } = getMocks('@/hooks/learningPlan/useCreateLearningPlanGoalKsa');
    mockCreateGoal.mockResolvedValue({ id: 'goalid1' });
    mockCreateKsa.mockResolvedValue({});

    const formState = {
      ...defaultFormState,
      savedPlanId: 'planid',
      goals: [
        { competency: 'C1' },
        { competency: 'C2' },
      ],
      competencyGoals: {
        C1: [
          {
            goal: 'Goal1',
            timeline: 'Q1',
            resources: ['Res1'],
            obstacles: ['Obs1'],
            resourcesOther: 'rO1',
            obstaclesOther: 'oO1',
            ksas: [
              {
                type: 'KSA1',
                ksaId: 'ksaRef-1',
                currentLevel: 1,
                targetLevel: 2
              },
              {
                // No type, should be skipped
              }
            ],
          }
        ],
        C2: [
          {
            goal: 'Goal2',
            timeline: 'Q2',
            ksas: []
          }
        ]
      },
      competencyIds: { C1: 'c1id', C2: 'c2id' },
      setCurrentStep: jest.fn()
    };

    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      const ret = await result.current.handleSaveStep(4);
      expect(ret).toBe(true);
    });
    expect(mockCreateGoal).toHaveBeenCalledWith(
      expect.objectContaining({
        planCompetencyId: 'c1id',
        goalName: 'Goal1',
        timeline: 'Q1',
        resources: ['Res1'],
        obstacles: ['Obs1'],
        resourcesOther: 'rO1',
        obstaclesOther: 'oO1'
      })
    );
    expect(mockCreateGoal).toHaveBeenCalledWith(
      expect.objectContaining({
        planCompetencyId: 'c2id',
        goalName: 'Goal2',
        timeline: 'Q2'
      })
    );

    // KSA with no type should be skipped, so only 1 called
    expect(mockCreateKsa).toHaveBeenCalledWith(
      expect.objectContaining({
        planGoalId: 'goalid1',
        ksaExternalReference: 'ksaRef-1',
        ksaName: 'KSA1',
        currentLevel: 1,
        targetLevel: 2
      })
    );
  });

  it('handleSaveStep(4): skip if competency ID is missing, logs error', async () => {
    const spy = mockConsole();
    const { mockCreateGoal } = getMocks('@/hooks/learningPlan/useCreateLearningPlanGoal');
    mockCreateGoal.mockResolvedValue({ id: 'goalid1' });

    const formState = {
      ...defaultFormState,
      savedPlanId: 'planid',
      goals: [{ competency: 'C1' }],
      competencyGoals: { C1: [{ goal: 'Goal1', timeline: 'Q1', ksas: []}] },
      competencyIds: {}, // No ID!
      setCurrentStep: jest.fn()
    };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      const ret = await result.current.handleSaveStep(4);
      expect(ret).toBe(true);
    });
    expect(mockCreateGoal).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('No competency ID found for');
    spy.mockRestore();
  });

  it('handleSaveStep(4): skips goals with no competency', async () => {
    const { mockCreateGoal } = getMocks('@/hooks/learningPlan/useCreateLearningPlanGoal');
    mockCreateGoal.mockResolvedValue({ id: 'goalid1' });

    const formState = {
      ...defaultFormState,
      savedPlanId: 'planid',
      goals: [{}, { competency: 'C2' }],
      competencyGoals: { C2: [{ goal: 'Goal2', timeline: 'Q2', ksas: [] }] },
      competencyIds: { C2: 'c2id' },
      setCurrentStep: jest.fn()
    };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    await act(async () => {
      await result.current.handleSaveStep(4);
    });

    // Only the second should be called
    expect(mockCreateGoal).toHaveBeenCalledTimes(1);
  });

  it('handleSaveStep(4): catches error and returns false', async () => {
    const spy = mockConsole();
    const { mockCreateGoal } = getMocks('@/hooks/learningPlan/useCreateLearningPlanGoal');
    mockCreateGoal.mockRejectedValue(new Error('fail'));
    const formState = {
      ...defaultFormState,
      savedPlanId: 'planid',
      goals: [{ competency: 'C2' }],
      competencyGoals: { C2: [{ goal: 'Goal2', timeline: 'Q2', ksas: [] }] },
      competencyIds: { C2: 'c2id' },
      setCurrentStep: jest.fn()
    };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    let out;
    await act(async () => {
      out = await result.current.handleSaveStep(4);
    });
    expect(out).toBe(false);
    expect(spy).toHaveBeenCalledWith('Failed to save step 4');
    spy.mockRestore();
  });

  it('returns false for invalid step', async () => {
    const formState = { ...defaultFormState };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    let out;
    await act(async () => {
      out = await result.current.handleSaveStep(99);
    });
    expect(out).toBe(false);
  });

  it('isLoading is always false', () => {
    const formState = { ...defaultFormState };
    const { result } = renderHook(() => useLearningPlanSave(formState));
    expect(result.current.isLoading).toBe(false);
  });
});