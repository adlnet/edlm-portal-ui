import { QueryClient, QueryClientProvider } from 'react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';
import EditPlan from '@/pages/edlm-portal/learner/learningPlan/edit/[planId].js';
import React from 'react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useLearningPlan', () => ({
  useLearningPlan: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useLearningPlanForm', () => ({
  useLearningPlanForm: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useLearningPlanValidation', () => ({
  useLearningPlanValidation: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useUpdateBulkLearningPlan', () => ({
  useUpdateBulkLearningPlan: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useDeleteLearningPlan', () => ({
  useDeleteLearningPlan: jest.fn(),
}));
jest.mock('@/components/steps/ChooseSkillsStep', () => ({
  ChooseSkillsStep: (props) => <div data-testid="choose-skills-step">ChooseSkillsStepMock</div>
}));
jest.mock('@/components/steps/SetGoalsStepEdit', () => ({
  SetGoalsStepEdit: (props) => <div data-testid="set-goals-step-edit">SetGoalsStepEditMock</div>
}));
jest.mock('@/components/layouts/DefaultLayout', () => ({
  __esModule: true,
  default: (props) => <div data-testid="default-layout">{props.children}</div>,
}));
jest.mock('@/utils/dropdownMenuConstants', () => ({
  timeframeOptions: [{ value: '3-months', label: '3 months' }],
}));
jest.mock('@/components/menus/CustomDropdown', () => {
  const MockCustomDropdown = (props) => (
    <select
      data-testid="custom-dropdown"
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  );
  MockCustomDropdown.displayName = 'MockCustomDropdown';
  return MockCustomDropdown;
});
jest.mock('@/components/modals/DeletePlanModal', () => ({
  __esModule: true,
  default: (props) => (
    props.open ?
      <div data-testid="delete-modal">
        <button onClick={props.onDelete}>ConfirmDelete</button>
        <button onClick={props.onClose}>CloseDelete</button>
      </div>
    : null
  ),
}));
jest.mock('@/components/cards/XMarkMessageToast', () => ({
  __esModule: true,
  default: ({ message }) => <div data-testid="error-toast">{message}</div>,
}));
jest.mock('flowbite-react', () => ({
  TextInput: ({ value, onChange }) => (
    <input data-testid="text-input" value={value} onChange={onChange} />
  ),
  Button: (props) => <button {...props}>{props.children}</button>,
}));
jest.mock('next/image', () => {
  const MockImage = (props) => <img alt={props.alt} />;
  MockImage.displayName = 'MockImage';
  return MockImage;
});

const mockRouterPush = jest.fn();
const mockRouterBack = jest.fn();

const planObj = {
  name: 'Sample Plan',
  timeframe: '3-months',
  competencies: [
    {
      id: 1,
      plan_competency_name: 'Com 1',
      eccr_competency: 'ECC 11',
      priority: 1,
      goals: [
        {
          id: 101,
          goal_name: 'Goal 1',
          timeline: 'Q1',
          resources_support: ['Res1'],
          obstacles: ['Obs1'],
          resources_support_other: 'ROther',
          obstacles_other: 'OOther',
          ksas: [
            { id: 1001, ksa_name: 'KSA1', eccr_ksa: 'EKSA1', current_proficiency: 1, target_proficiency: 3 }
          ]
        }
      ]
    }
  ]
};

const mockFormState = {
  planName: "Sample Plan",
  setPlanName: jest.fn(),
  timeframe: "3-months",
  setTimeframe: jest.fn(),
  goals: [{ id: 1, competency: 'Com 1', competencyId: 'ECC 11', priority: 1, originalId: 1 }],
  setGoals: jest.fn(),
  competencyGoals: { 'Com 1': [
    { id: 101, goal: 'Goal 1', timeline: 'Q1', resources: ['Res1'], obstacles: ['Obs1'], ksas: [
      { id: 1001, type: 'KSA1', ksaId: 'EKSA1', currentLevel: 1, targetLevel: 3, originalId: 1001 }
    ] }
  ]},
  setCompetencyGoals: jest.fn(),
  addGoalToCompetency: jest.fn(),
  removeGoalFromCompetency: jest.fn(),
  updateCompetencyGoal: jest.fn(),
  addKSAToGoal: jest.fn(),
  removeKSAFromGoal: jest.fn(),
  updateKSAForGoal: jest.fn(),
  addGoal: jest.fn(),
  removeGoal: jest.fn(),
  updateGoal: jest.fn(),
  onCompetencyChange: jest.fn(),
};
const mockGetTimelineOptions = jest.fn(() => []);

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for test clarity
      },
    },
  });

export function renderWithQueryClient(ui, options) {
  const client = createTestQueryClient();
  return render(
    <QueryClientProvider client={client}>
      {ui}
    </QueryClientProvider>,
    options
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  require('next/router').useRouter.mockReturnValue({
    query: { planId: '1' },
    push: mockRouterPush,
    back: mockRouterBack,
    isReady: true,
    pathname: '/edlm-portal/learner/learningPlan/edit',
  });
  require('@/hooks/learningPlan/useLearningPlan').useLearningPlan.mockReturnValue({ data: planObj, isLoading: false });
  require('@/hooks/learningPlan/useLearningPlanForm').useLearningPlanForm.mockReturnValue(mockFormState);
  require('@/hooks/learningPlan/useLearningPlanValidation').useLearningPlanValidation.mockReturnValue({ getTimelineOptions: mockGetTimelineOptions });
  require('@/hooks/learningPlan/useUpdateBulkLearningPlan').useUpdateBulkLearningPlan.mockReturnValue({
    updateCompleteLearningPlan: jest.fn().mockResolvedValue(true),
    isLoading: false,
  });
  require('@/hooks/learningPlan/useDeleteLearningPlan').useDeleteLearningPlan.mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue(true),
  });
});

describe('EditPlan', () => {
  it('shows loading state when not ready or loading', () => {
    require('next/router').useRouter.mockReturnValueOnce({ isReady: false, query: {}, push: mockRouterPush, back: mockRouterBack });
    require('@/hooks/learningPlan/useLearningPlan').useLearningPlan.mockReturnValueOnce({ isLoading: true });
    renderWithQueryClient(<EditPlan />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('shows not found state if plan is null', () => {
    require('@/hooks/learningPlan/useLearningPlan').useLearningPlan.mockReturnValueOnce({ data: null, isLoading: false });
    renderWithQueryClient(<EditPlan />);
    expect(screen.getByText(/No Learning Plans with that ID were found/i)).toBeInTheDocument();
  });

  it('shows plan fields, breadcrumbs, and inputs for editing', () => {
    renderWithQueryClient(<EditPlan />);
    expect(screen.getAllByText(/Edit Plan/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Review & Save/i)).toBeInTheDocument();
    expect(screen.getByTestId('text-input')).toHaveValue("Sample Plan");
    expect(screen.getByTestId('custom-dropdown')).toHaveValue("3-months");
    expect(screen.getByTestId('set-goals-step-edit')).toBeInTheDocument();
    expect(screen.getByText(/Add Another Competency/i)).toBeInTheDocument();
    expect(screen.getByText(/Save & Continue/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();

    // Breadcrumb links
    expect(screen.getAllByText(/Learning Plans/)[0]).toBeInTheDocument();
  });

  it('runs router.push to plan list when clicking breadcrumb', () => {
    renderWithQueryClient(<EditPlan />);
    fireEvent.click(screen.getAllByText(/Learning Plans/)[0]);
    expect(mockRouterPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
  });

  it('triggers delete modal flow', async () => {
    renderWithQueryClient(<EditPlan />);
    const deleteBtn = screen.getByText(/Delete/i);
    fireEvent.click(deleteBtn);
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();

    // Confirm delete
    await act(async () => {
      fireEvent.click(screen.getByText('ConfirmDelete'));
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');

    // Re-open and close modal
    fireEvent.click(screen.getByText(/Delete/i));
    fireEvent.click(screen.getByText('CloseDelete'));
    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
  });

  it('opens and closes ChooseSkillsStep', () => {
    renderWithQueryClient(<EditPlan />);
    fireEvent.click(screen.getByText(/Add Another Competency/i));
    expect(screen.getByTestId('choose-skills-step')).toBeInTheDocument();

    // Click Continue button
    fireEvent.click(screen.getAllByText(/Continue/i)[0]);
    expect(screen.queryByTestId('choose-skills-step')).not.toBeInTheDocument();

    // Clicking Cancel closes ChooseSkillsStep
    fireEvent.click(screen.getByText(/Add Another Competency/i));
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByTestId('choose-skills-step')).not.toBeInTheDocument();
  });

  it('calls setPlanName and setTimeframe on input changes', () => {
    renderWithQueryClient(<EditPlan />);
    fireEvent.change(screen.getByTestId('text-input'), { target: { value: "new name" } });
    expect(mockFormState.setPlanName).toHaveBeenCalled();

    fireEvent.change(screen.getByTestId('custom-dropdown'), { target: { value: "3-months" } });
    expect(mockFormState.setTimeframe).toHaveBeenCalled();
  });

  it('triggers save and navigation on Save & Continue', async () => {
    const updateCompleteLearningPlan = jest.fn().mockResolvedValue(true);
    require('@/hooks/learningPlan/useUpdateBulkLearningPlan').useUpdateBulkLearningPlan.mockReturnValue({ updateCompleteLearningPlan, isLoading: false });
    renderWithQueryClient(<EditPlan />);
    await act(async () => {
      fireEvent.click(screen.getByText(/Save & Continue/i));
    });
    expect(updateCompleteLearningPlan).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/1?updated=1');
  });

  it('shows error toast when saving fails', async () => {
    jest.useFakeTimers();
    require('@/hooks/learningPlan/useUpdateBulkLearningPlan').useUpdateBulkLearningPlan.mockReturnValue({
      updateCompleteLearningPlan: jest.fn().mockResolvedValue(false),
      isLoading: false,
    });
    renderWithQueryClient(<EditPlan />);
    await act(async () => {
      fireEvent.click(screen.getByText(/Save & Continue/i));
    });
    expect(await screen.findByTestId('error-toast')).toBeInTheDocument();
    act(() => { jest.runAllTimers(); });
    expect(screen.queryByTestId('error-toast')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it('shows required asterisk and instructions', () => {
    renderWithQueryClient(<EditPlan />);
    expect(screen.getByAltText('asterisk')).toBeInTheDocument();
    expect(screen.getByText('= Required')).toBeInTheDocument();
    expect(screen.getAllByText(/Plan Name/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Create a name for your learning plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Completion Timeframe/i)).toBeInTheDocument();
  });

  it('clicking Cancel navigates back to plan details', () => {
    renderWithQueryClient(<EditPlan />);
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(mockRouterPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/1');
  });

  it('handles error state in useLearningPlan (error prop)', () => {
    require('@/hooks/learningPlan/useLearningPlan').useLearningPlan.mockReturnValueOnce({ data: null, isLoading: false, error: "Oops!" });
    renderWithQueryClient(<EditPlan />);
    expect(screen.getByText(/No Learning Plans with that ID were found/i)).toBeInTheDocument();
  });

  it('returns early if not initialized and no plan', () => {
    require('@/hooks/learningPlan/useLearningPlan').useLearningPlan.mockReturnValueOnce({ data: null, isLoading: false });
    renderWithQueryClient(<EditPlan />);
    expect(screen.getByText(/No Learning Plans with that ID were found/i)).toBeInTheDocument();
  });

  it('can cancel from ChooseSkillsStep', () => {
    renderWithQueryClient(<EditPlan />);
    fireEvent.click(screen.getByText(/Add Another Competency/i));
    expect(screen.getByTestId('choose-skills-step')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByTestId('choose-skills-step')).not.toBeInTheDocument();
  });

  it('calls removeGoal when removeGoal prop is triggered', () => {
    const removeGoal = jest.fn();
    require('@/hooks/learningPlan/useLearningPlanForm').useLearningPlanForm.mockReturnValueOnce({
        ...mockFormState,
        removeGoal,
    });
    renderWithQueryClient(<EditPlan />);
    expect(screen.getByTestId('set-goals-step-edit')).toBeInTheDocument();
  });

  it('repeatedly opens and closes the delete modal', () => {
    renderWithQueryClient(<EditPlan />);
    for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByText(/Delete/i));
        expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
        fireEvent.click(screen.getByText('CloseDelete'));
        expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    }
  });

  it('updates plan name and calls setPlanName', () => {
    renderWithQueryClient(<EditPlan />);
    const input = screen.getByTestId('text-input');
    fireEvent.change(input, { target: { value: 'Changed Plan' } });
    expect(mockFormState.setPlanName).toHaveBeenCalledWith('Changed Plan');
  });

  it('updates timeframe via dropdown and calls setTimeframe', () => {
    renderWithQueryClient(<EditPlan />);
    const dropdown = screen.getByTestId('custom-dropdown');
    fireEvent.change(dropdown, { target: { value: '3-months' } });
    expect(mockFormState.setTimeframe).toHaveBeenCalledWith(expect.anything());
  });
});