import { act, fireEvent, render, screen,  } from '@testing-library/react';
import CreatePlanForm from '@/pages/edlm-portal/learner/learningPlan/createLearningPlan';
import React from 'react';

jest.mock('@/utils/dropdownMenuConstants', () => ({
  ALL_STEPS: ['Step 0', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
}));
jest.mock('@heroicons/react/24/outline', () => ({
  ArrowLongRightIcon: () => <span data-testid="ArrowLongRightIcon" />,
}));
jest.mock('flowbite-react', () => ({
  Button: (props) => <button {...props}>{props.children}</button>,
}));

jest.mock('@/components/steps/ChooseSkillsStep', () => ({
  ChooseSkillsStep: (props) => <div data-testid="ChooseSkillsStep" {...props}>ChooseSkillsStep</div>,
}));
jest.mock('@/components/steps/NamePlanStep', () => ({
  NamePlanStep: (props) => <div data-testid="NamePlanStep" {...props}>NamePlanStep</div>,
}));
jest.mock('@/components/steps/ReviewStep', () => ({
  ReviewStep: (props) => <div data-testid="ReviewStep" {...props}>ReviewStep</div>,
}));
jest.mock('@/components/steps/SetGoalsStep', () => ({
  SetGoalsStep: (props) => <div data-testid="SetGoalsStep" {...props}>SetGoalsStep</div>,
}));
jest.mock('@/hooks/learningPlan/useLearningPlanForm', () => ({
  useLearningPlanForm: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useLearningPlanSave', () => ({
  useLearningPlanSave: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useLearningPlanValidation', () => ({
  useLearningPlanValidation: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/layouts/DefaultLayout', () => {
  const DefaultLayout = (props) => <div data-testid="DefaultLayout">{props.children}</div>;
  DefaultLayout.displayName = 'DefaultLayout';
  return DefaultLayout;
});
jest.mock('@/components/buttons/SaveAndContinueBtn', () => {
  const SaveAndContinueBtn = (props) => <button data-testid="SaveAndContinueBtn" {...props}>SaveAndContinue</button>;
  SaveAndContinueBtn.displayName = 'SaveAndContinueBtn';
  return SaveAndContinueBtn;
});
jest.mock('@/components/Stepper', () => {
  const Stepper = (props) => (
    <div>
      <button data-testid="stepper-0" onClick={() => props.onStepClick(0)}>step-0</button>
      <button data-testid="stepper-1" onClick={() => props.onStepClick(1)}>step-1</button>
      <button data-testid="stepper-2" onClick={() => props.onStepClick(2)}>step-2</button>
    </div>
  );
  Stepper.displayName = 'Stepper';
  return Stepper;
});
jest.mock('@/components/cards/XMarkMessageToast', () => {
  const XMarkMessageToast = (props) => <div data-testid="XMarkMessageToast">{props.message}</div>;
  XMarkMessageToast.displayName = 'XMarkMessageToast';
  return XMarkMessageToast;
});

const mockPush = jest.fn();

const defaultForm = {
  currentStep: 2,
  setCurrentStep: jest.fn(),
  nextStep: jest.fn(),
  prevStep: jest.fn(),
  planName: 'My Plan',
  setPlanName: jest.fn(),
  timeframe: '2024',
  setTimeframe: jest.fn(),
  goals: [],
  competencyGoals: [],
  setCompetencyGoals: jest.fn(),
  addGoal: jest.fn(),
  removeGoal: jest.fn(),
  updateGoal: jest.fn(),
  onCompetencyChange: jest.fn(),
  addGoalToCompetency: jest.fn(),
  removeGoalFromCompetency: jest.fn(),
  updateCompetencyGoal: jest.fn(),
  addKSAToGoal: jest.fn(),
  removeKSAFromGoal: jest.fn(),
  updateKSAForGoal: jest.fn(),
};

beforeEach(() => {
  jest.resetAllMocks();
  require('next/router').useRouter.mockReturnValue({ push: mockPush });
  require('@/hooks/learningPlan/useLearningPlanForm').useLearningPlanForm.mockReturnValue({ ...defaultForm });
  require('@/hooks/learningPlan/useLearningPlanSave').useLearningPlanSave.mockReturnValue({
    handleSaveStep: jest.fn(async () => true),
    isLoading: false,
  });
  require('@/hooks/learningPlan/useLearningPlanValidation').useLearningPlanValidation.mockReturnValue({
    canProceedFromStep: jest.fn(() => true),
    getTimelineOptions: jest.fn(() => []),
  });
});

describe('CreatePlanForm', () => {
  it('renders the NamePlanStep (step 2) by default', () => {
    render(<CreatePlanForm initialStep={2} />);
    expect(screen.getByTestId('NamePlanStep')).toBeInTheDocument();
  });

  it('renders ChooseSkillsStep for step 3', () => {
    require('@/hooks/learningPlan/useLearningPlanForm').useLearningPlanForm.mockReturnValue({
      ...defaultForm,
      currentStep: 3,
      planName: 'My Plan',
    });
    render(<CreatePlanForm initialStep={3} />);
    expect(screen.getByTestId('ChooseSkillsStep')).toBeInTheDocument();
  });

  it('renders SetGoalsStep for step 4', () => {
    require('@/hooks/learningPlan/useLearningPlanForm').useLearningPlanForm.mockReturnValue({
      ...defaultForm,
      currentStep: 4,
    });
    render(<CreatePlanForm initialStep={4} />);
    expect(screen.getByTestId('SetGoalsStep')).toBeInTheDocument();
  });

  it('renders ReviewStep for step 5', () => {
    require('@/hooks/learningPlan/useLearningPlanForm').useLearningPlanForm.mockReturnValue({
      ...defaultForm,
      currentStep: 5,
    });
    render(<CreatePlanForm initialStep={5} />);
    expect(screen.getByTestId('ReviewStep')).toBeInTheDocument();
  });

  it('renders nothing for unknown step', () => {
    require('@/hooks/learningPlan/useLearningPlanForm').useLearningPlanForm.mockReturnValue({
      ...defaultForm,
      currentStep: 10,
    });
    render(<CreatePlanForm initialStep={10} />);
    expect(screen.queryByTestId('NamePlanStep')).not.toBeInTheDocument();
    expect(screen.queryByTestId('ChooseSkillsStep')).not.toBeInTheDocument();
    expect(screen.queryByTestId('SetGoalsStep')).not.toBeInTheDocument();
    expect(screen.queryByTestId('ReviewStep')).not.toBeInTheDocument();
  });

  it('handles Stepper navigation (step 0 and 1)', () => {
    const onBack = jest.fn();

    render(<CreatePlanForm initialStep={3} onBack={onBack} />);

    // Step 2 click triggers setCurrentStep
    fireEvent.click(screen.getByTestId('stepper-2'));
    expect(defaultForm.setCurrentStep).toHaveBeenCalledWith(2);

    // Step 0 triggers router.push
    fireEvent.click(screen.getByTestId('stepper-0'));
    expect(mockPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');

    // Step 1 triggers onBack
    fireEvent.click(screen.getByTestId('stepper-1'));
    expect(onBack).toHaveBeenCalled();
  });

  it('save and continue moves to next step on success, disables button if not canProceed', async () => {
    const mockSave = jest.fn(async () => true);
    require('@/hooks/learningPlan/useLearningPlanSave').useLearningPlanSave.mockReturnValue({
      handleSaveStep: mockSave,
      isLoading: false,
    });
    render(<CreatePlanForm initialStep={2} />);
    const btn = screen.getByTestId('SaveAndContinueBtn');
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(mockSave).toHaveBeenCalled();
    expect(defaultForm.nextStep).toHaveBeenCalled();
  });

  it('shows error toast when save fails', async () => {
    jest.useFakeTimers();
    require('@/hooks/learningPlan/useLearningPlanSave').useLearningPlanSave.mockReturnValue({
      handleSaveStep: jest.fn(async () => false),
      isLoading: false,
    });
    render(<CreatePlanForm initialStep={2} />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('SaveAndContinueBtn'));
    });
    expect(screen.getByTestId('XMarkMessageToast')).toHaveTextContent('An error occurred while saving your progress. Please try again.');
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.queryByTestId('XMarkMessageToast')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it('back button triggers prevStep', () => {
    render(<CreatePlanForm initialStep={3} />);
    const btn = screen.getByText('Back');
    fireEvent.click(btn);
    expect(defaultForm.prevStep).toHaveBeenCalled();
  });

  it('cancel button triggers router.push', () => {
    render(<CreatePlanForm initialStep={3} />);
    const btn = screen.getByText('Cancel');
    fireEvent.click(btn);
    expect(mockPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
  });

  it('step 5: final page buttons and "Save & Submit" triggers save and redirect', () => {
    const handleSaveStep = jest.fn(() => Promise.resolve(true));
    require('@/hooks/learningPlan/useLearningPlanForm').useLearningPlanForm.mockReturnValue({
      ...defaultForm,
      currentStep: 5,
    });
    require('@/hooks/learningPlan/useLearningPlanSave').useLearningPlanSave.mockReturnValue({
      handleSaveStep,
      isLoading: false,
    });
    const canProceedFromStep = jest.fn(() => true);
    require('@/hooks/learningPlan/useLearningPlanValidation').useLearningPlanValidation.mockReturnValue({
      canProceedFromStep,
      getTimelineOptions: jest.fn(() => []),
    });
    render(<CreatePlanForm initialStep={5} />);
    const saveAndSubmitBtn = screen.getByTestId('SaveAndContinueBtn');
    expect(saveAndSubmitBtn).toBeInTheDocument();
  });
});
