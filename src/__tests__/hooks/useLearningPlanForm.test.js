import { act, renderHook } from '@testing-library/react';
import { useLearningPlanForm } from '@/hooks/useLearningPlanForm'; 

// Proper mock for crypto.randomUUID in Node/Jest environment
beforeAll(() => {
  if (!global.crypto) global.crypto = {};
  Object.defineProperty(global.crypto, 'randomUUID', {
    value: () => 'MOCK_UUID',
    writable: true,
  });
});

describe('useLearningPlanForm', () => {
  it('initializes with default state and allows step navigation', () => {
    const { result } = renderHook(() => useLearningPlanForm());

    // Initial values
    expect(result.current.currentStep).toBe(2);
    expect(result.current.goals.length).toBe(1);
    expect(result.current.goals[0].id).toBe('MOCK_UUID');

    // Next step (should increment)
    act(() => result.current.nextStep());
    expect(result.current.currentStep).toBe(3);

    // Prev step (should decrement)
    act(() => result.current.prevStep());
    expect(result.current.currentStep).toBe(2);
  });

  it('addGoal adds a new goal to goals array', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoal());
    expect(result.current.goals.length).toBe(2);
    expect(result.current.goals[1].id).toBe('MOCK_UUID');
  });

  it('setGoalState updates a goal by id', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    const goalId = result.current.goals[0].id;
    act(() => result.current.setGoalState(goalId, { priority: 'High' }));
    expect(result.current.goals[0].priority).toBe('High');
  });

  it('updateGoal updates a specific key for a goal', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    const goalId = result.current.goals[0].id;
    act(() => result.current.updateGoal(goalId, 'description', 'Test Desc'));
    expect(result.current.goals[0].description).toBe('Test Desc');
  });

  it('removeGoal removes a goal by id', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    const goalId = result.current.goals[0].id;
    act(() => result.current.removeGoal(goalId));
    expect(result.current.goals.length).toBe(0);
  });

  it('addGoalToCompetency adds a new competency goal', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    expect(result.current.competencyGoals.CompA).toBeDefined();
    expect(result.current.competencyGoals.CompA[0].id).toBe('MOCK_UUID');
  });

  it('updateCompetencyGoal updates a field in a competency goal', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    const goalId = result.current.competencyGoals.CompA[0].id;

    act(() => result.current.updateCompetencyGoal('CompA', goalId, 'timeline', 'Q1'));
    expect(result.current.competencyGoals.CompA[0].timeline).toBe('Q1');
  });

  it('removeGoalFromCompetency removes a goal from a competency', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    const goalId = result.current.competencyGoals.CompA[0].id;

    act(() => result.current.removeGoalFromCompetency('CompA', goalId));
    expect(result.current.competencyGoals.CompA.length).toBe(0);
  });

  it('addKSAToGoal adds a KSA to a competency goal', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    const goalId = result.current.competencyGoals.CompA[0].id;

    act(() => result.current.addKSAToGoal('CompA', goalId));
    expect(result.current.competencyGoals.CompA[0].ksas.length).toBe(2);
    expect(result.current.competencyGoals.CompA[0].ksas[1].id).toBe('MOCK_UUID');
  });

  it('updateKSAForGoal updates a field in a KSA', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    const goalId = result.current.competencyGoals.CompA[0].id;
    const ksaId = result.current.competencyGoals.CompA[0].ksas[0].id;

    act(() => result.current.updateKSAForGoal('CompA', goalId, ksaId, 'type', 'Skill'));
    expect(result.current.competencyGoals.CompA[0].ksas[0].type).toBe('Skill');
  });

  it('removeKSAFromGoal removes a KSA by id', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    const goalId = result.current.competencyGoals.CompA[0].id;
    const ksaId = result.current.competencyGoals.CompA[0].ksas[0].id;

    act(() => result.current.removeKSAFromGoal('CompA', goalId, ksaId));
    expect(result.current.competencyGoals.CompA[0].ksas.length).toBe(0);
  });

  it('respects initialStep param', () => {
    const { result } = renderHook(() => useLearningPlanForm(4));
    expect(result.current.currentStep).toBe(4);
  });

  it('prevStep calls onBack callback if at lowest step', () => {
    const onBack = jest.fn();
    const { result } = renderHook(() => useLearningPlanForm(2, onBack));
    act(() => result.current.prevStep());
    expect(onBack).toHaveBeenCalled();
    expect(result.current.currentStep).toBe(2); // currentStep doesn’t decrease
  });

  it('nextStep does not exceed step 5', () => {
    const { result } = renderHook(() => useLearningPlanForm(5));
    act(() => result.current.nextStep());
    expect(result.current.currentStep).toBe(5);
  });

  it('updateCompetencyGoal ignores unknown goalIds gracefully', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    act(() => result.current.updateCompetencyGoal('CompA', 'FAKE_ID', 'timeline', 'Q2'));

    // Should still have unchanged timeline for actual goal
    expect(result.current.competencyGoals.CompA[0].timeline).toBe('');
  });

  it('removeGoalFromCompetency does nothing if unknown goalId', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    act(() => result.current.removeGoalFromCompetency('CompA', 'FAKE_ID'));

    // Still one goal left
    expect(result.current.competencyGoals.CompA.length).toBe(1);
  });

  it('addKSAToGoal does nothing when competencyName not found', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addKSAToGoal('CompB', 'SOME_ID')); // No CompB yet
    expect(result.current.competencyGoals.CompB).toEqual([]);
  });

  it('updateKSAForGoal ignores if goalId or ksaId do not match', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    act(() =>
      result.current.updateKSAForGoal('CompA', 'FAKE_GOAL_ID', 'FAKE_KSA_ID', 'type', 'Skill')
    );

    // KSA remains unchanged
    expect(result.current.competencyGoals.CompA[0].ksas[0].type).toBe('');
    
    // Now try with real goalId but fake ksaId
    const realGoalId = result.current.competencyGoals.CompA[0].id;
    act(() =>
      result.current.updateKSAForGoal('CompA', realGoalId, 'FAKE_KSA_ID', 'type', 'Skill')
    );
    expect(result.current.competencyGoals.CompA[0].ksas[0].type).toBe('');
  });

  it('removeKSAFromGoal does nothing if KSA id mismatch', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    const goalId = result.current.competencyGoals.CompA[0].id;
    act(() => result.current.removeKSAFromGoal('CompA', goalId, 'NOPE'));
    expect(result.current.competencyGoals.CompA[0].ksas.length).toBe(1);
  });

  it('removeKSAFromGoal does nothing if goalId mismatch', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    act(() => result.current.removeKSAFromGoal('CompA', 'FAKE_GOAL', 'MOCK_UUID'));
    expect(result.current.competencyGoals.CompA[0].ksas.length).toBe(1);
  });

  it('addGoalToCompetency adds correctly if no previous goals', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompX'));
    expect(result.current.competencyGoals.CompX.length).toBe(1);
  });

  it('handles setPlanName, setTimeframe updates', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.setPlanName('Alpha'));
    act(() => result.current.setTimeframe('2025'));
    expect(result.current.planName).toBe('Alpha');
    expect(result.current.timeframe).toBe('2025');
  });

  it('handles setSavedPlanId, setCompetencyIds', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.setSavedPlanId('plan123'));
    act(() => result.current.setCompetencyIds({ id1: true }));
    expect(result.current.savedPlanId).toBe('plan123');
    expect(result.current.competencyIds).toEqual({ id1: true });
  });

  it('handles setGoals and setCompetencyGoals directly', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() =>
      result.current.setGoals([{ id: 'foo', competency: 'bar', current: 'x', target: 'y', priority: '', description: '', selectedCourses: [] }])
    );
    expect(result.current.goals[0]).toMatchObject({ id: 'foo', competency: 'bar' });

    act(() => result.current.setCompetencyGoals({ CompY: [{ id: 'compGoalId', ksas: [] }] }));
    expect(result.current.competencyGoals.CompY[0].id).toBe('compGoalId');
  });

  it('removeGoalFromCompetency sets empty array', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.addGoalToCompetency('CompA'));
    const goalId = result.current.competencyGoals.CompA[0].id;
    act(() => result.current.removeGoalFromCompetency('CompA', goalId));
    expect(result.current.competencyGoals.CompA.length).toBe(0);
  });

  it('setSavedPlanId allows null', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.setSavedPlanId(null));
    expect(result.current.savedPlanId).toBe(null);
    act(() => result.current.setSavedPlanId(undefined));
    expect(result.current.savedPlanId).toBe(undefined);
    act(() => result.current.setSavedPlanId(12345));
    expect(result.current.savedPlanId).toBe(12345);
  });

  it('setGoals accepts undefined/null', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.setGoals(undefined));
    expect(result.current.goals).toBe(undefined);
    act(() => result.current.setGoals(null));
    expect(result.current.goals).toBe(null);
  });

  it('setCompetencyGoals accepts undefined', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.setCompetencyGoals(undefined));
    expect(result.current.competencyGoals).toBe(undefined);
  });
  
  it('setCompetencyIds accepts weird input', () => {
    const { result } = renderHook(() => useLearningPlanForm());
    act(() => result.current.setCompetencyIds('bad_input'));
    expect(result.current.competencyIds).toBe('bad_input');
  });
});