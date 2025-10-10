import { fireEvent, render, screen,  } from '@testing-library/react';
import CreateLearningPlan from '@/pages/edlm-portal/learner/learningPlan/createLearningPlan';
import React from 'react';

// -------- MOCKS --------

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock all hooks with basic default objects and functions
jest.mock('@/hooks/useLearningPlanForm', () => ({
  useLearningPlanForm: jest.fn(() => ({
    currentStep: 2,
    setCurrentStep: jest.fn(),
    savedPlanId: null,
    nextStep: jest.fn(),
    prevStep: jest.fn(),
    planName: '',
    setPlanName: jest.fn(),
    timeframe: '',
    setTimeframe: jest.fn(),
    goals: [],
    competencyGoals: {},
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
  })),
}));
jest.mock('@/hooks/useLearningPlanSave', () => ({
  useLearningPlanSave: jest.fn(() => ({
    handleSaveStep: jest.fn(),
    isLoading: false
  })),
}));

jest.mock('@/hooks/useLearningPlanValidation', () => ({
  useLearningPlanValidation: jest.fn(() => ({
    canProceedFromStep: jest.fn(() => true),
    getTimelineOptions: jest.fn(() => [])
  })),
}));

// Mock step components
jest.mock('@/components/steps/NamePlanStep', () => ({
  NamePlanStep: () => <div>NamePlanStep Rendered</div>
}));
jest.mock('@/components/steps/ChooseSkillsStep', () => ({
  ChooseSkillsStep: () => <div>ChooseSkillsStep Rendered</div>
}));
jest.mock('@/components/steps/SetGoalsStep', () => ({
  SetGoalsStep: () => <div>SetGoalsStep Rendered</div>
}));
jest.mock('@/components/steps/ReviewStep', () => ({
  ReviewStep: () => <div>ReviewStep Rendered</div>
}));

jest.mock('@/components/layouts/DefaultLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="layout">{children}</div>
}));

jest.mock('@/components/buttons/SaveAndContinueBtn', () => {
  const SaveAndContinueBtn = ({ onClick, disabled, loading }) => (
    <button onClick={onClick} disabled={disabled}>
      {loading ? 'Loading...' : 'Save & Continue'}
    </button>
  );
  SaveAndContinueBtn.displayName = "SaveAndContinueBtn";
  return { __esModule: true, default: SaveAndContinueBtn };
});

jest.mock('@/components/Stepper', () => ({ currentStep, steps, onStepClick }) => {
  <div>
    {steps?.map((step, idx) => (
      <button key={step} onClick={() => onStepClick(idx)}>
        Step: {step}
      </button>
    ))}
  </div>
});

// Mock dropdownMenuConstants (ALL_STEPS):
jest.mock('@/utils/dropdownMenuConstants', () => ({
  ALL_STEPS: ['Step 0', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
}));

// -------- TESTS --------

describe('CreateLearningPlan', () => {
  it('renders wrapped in the layout', () => {
    render(<CreateLearningPlan />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('renders NamePlanStep on step 2', () => {
    render(<CreateLearningPlan initialStep={2} />);
    expect(screen.getByText(/NamePlanStep Rendered/i)).toBeInTheDocument();
  });

  it('renders ChooseSkillsStep on step 3', () => {
    require('@/hooks/useLearningPlanForm').useLearningPlanForm.mockReturnValueOnce({
      ...require('@/hooks/useLearningPlanForm').useLearningPlanForm(),
      currentStep: 3,
    });
    render(<CreateLearningPlan />);
    expect(screen.getByText(/ChooseSkillsStep Rendered/i)).toBeInTheDocument();
  });

  it('renders SetGoalsStep on step 4', () => {
    require('@/hooks/useLearningPlanForm').useLearningPlanForm.mockReturnValueOnce({
      ...require('@/hooks/useLearningPlanForm').useLearningPlanForm(),
      currentStep: 4,
    });
    render(<CreateLearningPlan />);
    expect(screen.getByText(/SetGoalsStep Rendered/i)).toBeInTheDocument();
  });

  it('renders ReviewStep on step 5', () => {
    require('@/hooks/useLearningPlanForm').useLearningPlanForm.mockReturnValueOnce({
      ...require('@/hooks/useLearningPlanForm').useLearningPlanForm(),
      currentStep: 5,
    });
    render(<CreateLearningPlan />);
    expect(screen.getByText(/ReviewStep Rendered/i)).toBeInTheDocument();
  });

  it('shows Save & Continue and Back/Cancel buttons by default', () => {
    render(<CreateLearningPlan initialStep={2} />);
    expect(screen.getByText(/Save & Continue/i)).toBeInTheDocument();
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it('calls handleSaveAndContinue when Save & Continue clicked', () => {
    const mockHandleSaveStep = jest.fn();
    const mockNextStep = jest.fn();
    require('@/hooks/useLearningPlanSave').useLearningPlanSave.mockReturnValueOnce({
      handleSaveStep: mockHandleSaveStep, isLoading: false
    });
    require('@/hooks/useLearningPlanForm').useLearningPlanForm.mockReturnValueOnce({
      ...require('@/hooks/useLearningPlanForm').useLearningPlanForm(),
      currentStep: 2,
      nextStep: mockNextStep,
    });
    render(<CreateLearningPlan />);
    fireEvent.click(screen.getByText(/Save & Continue/i));
    expect(mockHandleSaveStep).toHaveBeenCalled();
    expect(mockNextStep).toHaveBeenCalled();
  });

  it('calls prevStep when Back is clicked', () => {
    const mockPrevStep = jest.fn();
    require('@/hooks/useLearningPlanForm').useLearningPlanForm.mockReturnValueOnce({
      ...require('@/hooks/useLearningPlanForm').useLearningPlanForm(),
      prevStep: mockPrevStep,
      currentStep: 2,
    });
    render(<CreateLearningPlan />);
    fireEvent.click(screen.getByText(/Back/i));
    expect(mockPrevStep).toHaveBeenCalled();
  });

  it('calls router.push when Cancel is clicked', () => {
    const mockPush = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push: mockPush });
    render(<CreateLearningPlan />);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
  });

  it('renders final page next steps and action buttons on step 5', () => {
    require('@/hooks/useLearningPlanForm').useLearningPlanForm.mockReturnValueOnce({
      ...require('@/hooks/useLearningPlanForm').useLearningPlanForm(),
      currentStep: 5,
    });
    render(<CreateLearningPlan initialStep={5} />);
    expect(screen.getByText(/Next Steps/i)).toBeInTheDocument();
    expect(screen.getByText(/Return to Learning Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Export/i)).toBeInTheDocument();
  });

  it('renders nothing when currentStep is invalid', () => {
    require('@/hooks/useLearningPlanForm').useLearningPlanForm.mockReturnValueOnce({
        ...require('@/hooks/useLearningPlanForm').useLearningPlanForm(),
        currentStep: 100,
    });
    render(<CreateLearningPlan initialStep={100} />);
    expect(screen.queryByText(/NamePlanStep Rendered/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ChooseSkillsStep Rendered/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/SetGoalsStep Rendered/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ReviewStep Rendered/i)).not.toBeInTheDocument();
  });

  it('calls router.push when Return to Learning Plan is clicked on step 5', () => {
    const mockPush = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push: mockPush });
    require('@/hooks/useLearningPlanForm').useLearningPlanForm.mockReturnValueOnce({
        ...require('@/hooks/useLearningPlanForm').useLearningPlanForm(),
        currentStep: 5,
    });
    render(<CreateLearningPlan initialStep={5} />);
    fireEvent.click(screen.getByText(/Return to Learning Plan/i));
    expect(mockPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
  });

  it('calls window.scrollTo when Back and Save & Continue are clicked', () => {
    window.scrollTo = jest.fn();
    render(<CreateLearningPlan initialStep={2} />);
    fireEvent.click(screen.getByText(/Back/i));
    fireEvent.click(screen.getByText(/Save & Continue/i));
    expect(window.scrollTo).toHaveBeenCalledWith(0,0);
  });

  it('shows loading state on SaveAndContinueBtn when isLoading is true', () => {
    require('@/hooks/useLearningPlanSave').useLearningPlanSave.mockReturnValueOnce({
        handleSaveStep: jest.fn(),
        isLoading: true
    });
    render(<CreateLearningPlan initialStep={2} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('disables SaveAndContinueBtn if canProceedFromStep returns false', () => {
    require('@/hooks/useLearningPlanValidation').useLearningPlanValidation.mockReturnValueOnce({
        canProceedFromStep: jest.fn(() => false),
        getTimelineOptions: jest.fn(() => [])
    });
    render(<CreateLearningPlan initialStep={2} />);
    expect(screen.getByText(/Save & Continue/i)).toBeDisabled();
  });

});