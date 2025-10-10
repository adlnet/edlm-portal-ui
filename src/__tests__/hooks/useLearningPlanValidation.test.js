import { act, renderHook } from '@testing-library/react';
import { useLearningPlanValidation } from '@/hooks/useLearningPlanValidation'; 

const longTermGoalTimeLine = ["Year 3", "Year 4"];
const shortTermGoalTimeLine = ["Year 1", "Year 2"];
jest.mock('@/utils/dropdownMenuConstants', () => ({
  longTermGoalTimeLine,
  shortTermGoalTimeLine
}));

describe('useLearningPlanValidation', () => {
  it('returns empty options if timeframe not matched', () => {
    const formState = { planName: '', timeframe: '', goals: [], competencyGoals: {} };
    const { result } = renderHook(() => useLearningPlanValidation(formState));
    expect(result.current.getTimelineOptions()).toEqual([]);
  });

  it('returns short term options', () => {
    const formState = { planName: '', timeframe: 'Short-term (1-2 years)', goals: [], competencyGoals: {} };
    const { result } = renderHook(() => useLearningPlanValidation(formState));
    expect(result.current.getTimelineOptions()).toEqual(shortTermGoalTimeLine);
  });

  it('returns long term options', () => {
    const formState = { planName: '', timeframe: 'Long-term (3-4 years)', goals: [], competencyGoals: {} };
    const { result } = renderHook(() => useLearningPlanValidation(formState));
    expect(result.current.getTimelineOptions()).toEqual(longTermGoalTimeLine);
  });

  it('can proceed from step 2 only if planName and timeframe', () => {
    const { result: r1 } = renderHook(() => useLearningPlanValidation({ planName: '', timeframe: '', goals: [], competencyGoals: {} }));
    expect(r1.current.canProceedFromStep(2)).toBeFalsy();
    const { result: r2 } = renderHook(() => useLearningPlanValidation({ planName: 'A', timeframe: '', goals: [], competencyGoals: {} }));
    expect(r2.current.canProceedFromStep(2)).toBeFalsy();
    const { result: r3 } = renderHook(() => useLearningPlanValidation({ planName: 'A', timeframe: 'Short-term (1-2 years)', goals: [], competencyGoals: {} }));
    expect(r3.current.canProceedFromStep(2)).toBeTruthy();
  });

  it('can proceed from step 3 only if goals are present and valid', () => {
    // No goals
    const { result: r1 } = renderHook(() => useLearningPlanValidation({ planName: '', timeframe: '', goals: [], competencyGoals: {} }));
    expect(r1.current.canProceedFromStep(3)).toBeFalsy();

    // Goals but missing competency/priority
    const goals = [{ competency: '', priority: '', current: 'Basic', target: 'Intermediate' }];
    const { result: r2 } = renderHook(() => useLearningPlanValidation({ planName: '', timeframe: '', goals, competencyGoals: {} }));
    expect(r2.current.canProceedFromStep(3)).toBeFalsy();

    // Valid goals
    const goalsValid = [{ competency: 'Skill', priority: 'High', current: 'Basic', target: 'Intermediate' }];
    const { result: r3 } = renderHook(() => useLearningPlanValidation({ planName: '', timeframe: '', goals: goalsValid, competencyGoals: {} }));
    expect(r3.current.canProceedFromStep(3)).toBeTruthy();
  });

  it('can proceed from step 4 only if goals and competencyGoals are valid', () => {
    const goals = [
      { competency: 'Skill', priority: 'High', current: 'Basic', target: 'Intermediate' }
    ];

    // Missing competencyGoals
    const { result: r1 } = renderHook(() =>
      useLearningPlanValidation({ planName: '', timeframe: 'Short-term (1-2 years)', goals, competencyGoals: {} })
    );
    expect(r1.current.canProceedFromStep(4)).toBeFalsy();

    // CompetencyGoals present but incomplete
    const incompleteGoal = {
      id: 'g1',
      goal: '',
      timeline: '',
      ksas: []
    };
    const { result: r2 } = renderHook(() =>
      useLearningPlanValidation({
        planName: '',
        timeframe: 'Short-term (1-2 years)',
        goals,
        competencyGoals: { Skill: [incompleteGoal] }
      })
    );
    expect(r2.current.canProceedFromStep(4)).toBeFalsy();
    
    // CompetencyGoals present and complete
    const completeGoal = {
      id: 'g2',
      goal: 'Achieve',
      timeline: 'Year 1',
      ksas: [
        { id: 'k1', type: 'Knowledge', currentLevel: 'Basic', targetLevel: 'Intermediate' }
      ]
    };
    const { result: r3 } = renderHook(() =>
      useLearningPlanValidation({
        planName: '',
        timeframe: 'Short-term (1-2 years)',
        goals,
        competencyGoals: { Skill: [completeGoal] }
      })
    );
    expect(r3.current.canProceedFromStep(4)).toBeTruthy();
  });

  it('can always proceed from step 5, never for default', () => {
    const formState = { planName: '', timeframe: '', goals: [], competencyGoals: {} };
    const { result } = renderHook(() => useLearningPlanValidation(formState));
    expect(result.current.canProceedFromStep(5)).toBe(true);
    expect(result.current.canProceedFromStep(99)).toBe(false);
  });

  it('isGoalComplete returns false for invalid timeline option', () => {
    const formState = {
      planName: 'X',
      timeframe: 'Short-term (1-2 years)',
      goals: [{ competency: 'Skill', priority: 'High', current: 'Basic', target: 'Intermediate' }],
      competencyGoals: { Skill: [{
        id: 'g2',
        goal: 'Achieve',
        timeline: 'NotARealYear',
        ksas: [{ id: 'k1', type: 'Knowledge', currentLevel: 'Basic', targetLevel: 'Intermediate' }]
      }]}
    };
    const { result } = renderHook(() => useLearningPlanValidation(formState));
    expect(result.current.canProceedFromStep(4)).toBe(false);
  });

  it('isGoalComplete returns false if any KSA incomplete', () => {
    const formState = {
      planName: 'X',
      timeframe: 'Short-term (1-2 years)',
      goals: [{ competency: 'Skill', priority: 'High', current: 'Basic', target: 'Intermediate' }],
      competencyGoals: { Skill: [{
        id: 'g2',
        goal: 'Achieve',
        timeline: 'Year 1',
        ksas: [{ id: 'k1', type: '', currentLevel: 'Basic', targetLevel: 'Intermediate' }]
      }]}
    };
    const { result } = renderHook(() => useLearningPlanValidation(formState));
    expect(result.current.canProceedFromStep(4)).toBe(false);
  });

  it('isGoalComplete returns false if ksas missing or empty', () => {
    const formState = {
      planName: 'X',
      timeframe: 'Short-term (1-2 years)',
      goals: [{ competency: 'Skill', priority: 'High', current: 'Basic', target: 'Intermediate' }],
      competencyGoals: { Skill: [{
        id: 'g2',
        goal: 'Achieve',
        timeline: 'Year 1',
        ksas: []
      }]}
    };
    const { result } = renderHook(() => useLearningPlanValidation(formState));
    expect(result.current.canProceedFromStep(4)).toBe(false);
  });
});