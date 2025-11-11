import { act, fireEvent, render, screen } from '@testing-library/react';
import { pushMock } from 'next/router';
import React from 'react';
import SavePlanModal from '@/components/modals/SavePlanModal'; // Adjust path to match your file

// --- Mocks ---
// Helper to flush Promises (needed for async act)
const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

// Mock icon
const XMarkIconMock = () => <svg data-testid="xmark-icon" />;
XMarkIconMock.displayName = "XMarkIcon";
jest.mock('@heroicons/react/24/outline', () => ({
  XMarkIcon: XMarkIconMock,
}));

jest.mock('next/router', () => {
  const pushMock = jest.fn();
  return {
    useRouter: () => ({ push: pushMock }),
    __esModule: true,
    pushMock, // THIS is how you access inside test
  };
});

// Mocks for hooks
jest.mock('@/hooks/learningPlan/useAllLearningPlans', () => ({
  useAllLearningPlans: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useLearningPlan', () => ({
  useLearningPlan: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useCreateLearningPlanGoalCourse', () => ({
  useCreateLearningPlanGoalCourse: jest.fn(),
}));

// Utilities
const getSaveModal = () => screen.queryByTestId('modal-root');

beforeEach(() => {
  pushMock.mockClear();
});

// --- TESTS ---
describe('SavePlanModal', () => {
  const setSuccessMessage = jest.fn();
  const setIsDropdownOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require('@/hooks/learningPlan/useCreateLearningPlanGoalCourse').useCreateLearningPlanGoalCourse.mockReturnValue({
      mutate: jest.fn((payload, { onSuccess }) => onSuccess && onSuccess({ id: 'mock-id' })),
    });
  });

  function setup({ plans = [], selectedPlanDetail = undefined, isLoading = false } = {}) {
    require('@/hooks/learningPlan/useAllLearningPlans').useAllLearningPlans.mockReturnValue({
      data: plans,
      isLoading,
    });
    require('@/hooks/learningPlan/useLearningPlan').useLearningPlan.mockReturnValue({
      data: selectedPlanDetail,
    });
    render(
      <SavePlanModal
        courseId="course-1"
        title="React"
        setIsDropdownOpen={setIsDropdownOpen}
        setSuccessMessage={setSuccessMessage}
      />
    );
  }

  it('renders and opens modal', () => {
    setup({ plans: [] });
    fireEvent.click(screen.getByText(/save to learning plan/i));
    expect(screen.getByText(/add "react" to learning plan/i)).toBeInTheDocument();
  });

  it('shows loader during plans loading', () => {
    setup({ isLoading: true });
    expect(screen.getByText(/loading plans/i)).toBeInTheDocument();
  });

  it('shows empty state with no plans', () => {
    setup({ plans: [] });
    fireEvent.click(screen.getByText(/save to learning plan/i));
    expect(screen.getByText(/no plans yet/i)).toBeInTheDocument();
    expect(screen.getByText(/choose a learning plan to add this course to/i)).toBeInTheDocument();
    expect(screen.getByText(/create learning plan/i)).toBeInTheDocument();
  });

  it('triggers create plan navigation button', () => {
    setup({ plans: [] });
    fireEvent.click(screen.getByText(/save to learning plan/i));
    fireEvent.click(screen.getByText(/create learning plan/i));
    expect(pushMock).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/developmentPlan/');
  });

  it('renders learning plans and “Back” button after plan selection', () => {
    const demoPlan = { id: 'plan-1', name: 'My Plan', timeframe: '2024' };
    setup({ plans: [demoPlan], selectedPlanDetail: {
      competencies: [],
    }});
    fireEvent.click(screen.getByText(/save to learning plan/i));
    fireEvent.click(screen.getByText(/my plan/i));
    expect(screen.getByText(/select goals/i)).toBeInTheDocument();
    expect(screen.getByText(/back/i)).toBeInTheDocument();
  });

  it('shows no goals message for a selected plan with no goals', () => {
    const plan = { id: 'p', name: 'P', timeframe: '2023' };
    setup({
      plans: [plan],
      selectedPlanDetail: { competencies: [{ id: 'c1', plan_competency_name: 'Comp', goals: [] }] },
    });
    fireEvent.click(screen.getByText(/save to learning plan/i));
    fireEvent.click(screen.getByText('P'));
    expect(screen.getByText(/no goals in this plan yet/i)).toBeInTheDocument();
  });

  it('displays competencies and goal checkboxes, toggles selection', () => {
    const goal1 = { id: 'g1', goal_name: 'Goal1' }, goal2 = { id: 'g2', goal_name: 'Goal2' };
    const comp = { id: 'c1', plan_competency_name: 'Skill', goals: [goal1, goal2] };
    const plan = { id: 'p', name: 'P', timeframe: '2023' };
    setup({
      plans: [plan],
      selectedPlanDetail: { competencies: [comp] },
    });
    fireEvent.click(screen.getByText(/save to learning plan/i));
    fireEvent.click(screen.getByText('P'));
    expect(screen.getByText('Skill')).toBeInTheDocument();

    // Toggle goal 1
    const label1 = screen.getByText('Goal1');
    fireEvent.click(label1);
    
    // Toggle back off
    fireEvent.click(label1);
  });

  it('disables “Save to Goals” until goals checked and handles save', async () => {
    const goal = { id: 'g123', goal_name: 'GoalX' };
    const comp = { id: 'c5', plan_competency_name: 'Alpha', goals: [goal] };
    const plan = { id: 'planZ', name: 'Plan Z', timeframe: '2023' };
    setup({
      plans: [plan],
      selectedPlanDetail: { competencies: [comp] },
    });
    fireEvent.click(screen.getByText(/save to learning plan/i));
    fireEvent.click(screen.getByText(/plan z/i));
    const saveBtn = screen.getByTestId('save-goal-btn');

    // Should be disabled since nothing selected
    expect(saveBtn).toBeDisabled();

    // Check one goal
    fireEvent.click(screen.getByText('GoalX'));
    expect(screen.getByText('Save to (1) Goals')).toBeInTheDocument();

    // Now enabled
    expect(saveBtn).not.toBeDisabled();

    // Save
    await act(async () => {
      fireEvent.click(saveBtn);
      await flushPromises();
    });

    expect(setSuccessMessage).toHaveBeenCalledWith(
      '"React" added to 1 goal in the "Plan Z" learning plan!'
    );
    expect(screen.queryByText(/select goals/i)).not.toBeInTheDocument(); // closed
  });

  it('handles error when createGoalCourse fails', async () => {
    // Set up mutate to error
    require('@/hooks/learningPlan/useCreateLearningPlanGoalCourse').useCreateLearningPlanGoalCourse.mockReturnValue({
      mutate: (payload, { onSuccess, onError }) => onError && onError(new Error('fail')),
    });
    const goal = { id: 'g1', goal_name: 'BAD' };
    const comp = { id: 'cX', plan_competency_name: 'Oops', goals: [goal] };
    const plan = { id: 'e', name: 'Err', timeframe: 'T' };
    setup({
      plans: [plan],
      selectedPlanDetail: { competencies: [comp] },
    });
    fireEvent.click(screen.getByText(/save to learning plan/i));
    fireEvent.click(screen.getByText(/err/i));
    fireEvent.click(screen.getByText('BAD')); // check the goal
    const saveBtn = screen.getByText('Save to (1) Goals');
    await act(async () => {
      fireEvent.click(saveBtn);
      await flushPromises();
    });
    expect(setSuccessMessage).toHaveBeenCalledWith('Failed to save course. Please try again.');
  });

  it('triggers Close (X/Cancel) and Back properly', () => {
    setup({ plans: [{ id: 'a', name: 'X', timeframe: '-' }], selectedPlanDetail: { competencies: [] } });
    fireEvent.click(screen.getByText(/save to learning plan/i));

    // Opened modal -- close by X button
    fireEvent.click(screen.getByTestId('xmark-icon'));

    // Open again, click Cancel
    fireEvent.click(screen.getByText(/save to learning plan/i));
    fireEvent.click(screen.getByText(/x/i)); // Pick plan X
    fireEvent.click(screen.getByText(/cancel/i));

    // Open again, select plan, then click "Back" (no goals)
    fireEvent.click(screen.getByText(/save to learning plan/i));
    fireEvent.click(screen.getByText(/x/i)); // select again
    fireEvent.click(screen.getByText(/back/i));

    // Should be back to plan selection
    expect(screen.getByText(/choose a learning plan/i)).toBeInTheDocument();
  });
});