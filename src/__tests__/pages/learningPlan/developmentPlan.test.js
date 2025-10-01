import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAuthenticatedUser } from '@/__mocks__/predefinedMocks';
import DevelopmentPlan from '@/pages/edlm-portal/learner/learningPlan/developmentPlan';
import React from 'react';

// Mock router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock external child components and data
jest.mock('@/components/CompetencyDevPlan', () => ({ competency }) => {
  <div data-testid="competency">{competency.name}</div>
});

jest.mock('@/pages/edlm-portal/learner/learningPlan/createLearningPlan', () => ({
  __esModule: true,
  default: ({ initialStep }) => <div data-testid="create-learning-plan">{`CreateLearningPlan step ${initialStep}`}</div>
}));

jest.mock('@/public/backup_competencies.json', () => ([
  { name: 'Leadership', parent: [] },
  { name: 'Teamwork', parent: [] },
  { name: 'Technical', parent: ['Leadership'] },
]));

describe('DevelopmentPlan', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  const renderDevelopmentPlan = () => {
    return render(
      <QueryClientWrapper>
        <DevelopmentPlan />
      </QueryClientWrapper>
    );
  };

  it('renders step 1 UI and parent competencies', () => {
    useAuthenticatedUser();
    renderDevelopmentPlan();
    expect(screen.getByText('Create Your Individual Development Plan')).toBeInTheDocument();
    expect(screen.queryByText('Technical')).not.toBeInTheDocument();
  });

  it('navigates to plan page when Cancel is clicked', () => {
    useAuthenticatedUser();
    renderDevelopmentPlan();
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
  });

  it('shows CreateLearningPlan step 2 after clicking Start Role Based Plan', () => {
    useAuthenticatedUser();
    renderDevelopmentPlan();
    fireEvent.click(screen.getByText('Start Role Based Plan'));
    expect(screen.getByTestId('create-learning-plan')).toHaveTextContent('CreateLearningPlan step 2');
  });
});