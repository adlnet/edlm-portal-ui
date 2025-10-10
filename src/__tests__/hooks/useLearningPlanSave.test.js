import { act, renderHook } from '@testing-library/react';
import { useLearningPlanSave } from '@/hooks/useLearningPlanSave'; 

describe('useLearningPlanSave', () => {
  it('returns isLoading as false', () => {
    const { result } = renderHook(() => useLearningPlanSave({ nextStep: jest.fn() }));
    expect(result.current.isLoading).toBe(false);
  });

  it('handleSaveStep calls nextStep', async () => {
    const nextStep = jest.fn();
    const { result } = renderHook(() => useLearningPlanSave({ nextStep }));
    
    await act(async () => {
      await result.current.handleSaveStep(3);
    });
    expect(nextStep).toHaveBeenCalled();
  });

  it('handleSaveStep works with different step values', async () => {
    const nextStep = jest.fn();
    const { result } = renderHook(() => useLearningPlanSave({ nextStep }));
    await act(async () => {
      await result.current.handleSaveStep(1);
      await result.current.handleSaveStep(5);
    });
    expect(nextStep).toHaveBeenCalledTimes(2);
  });
});