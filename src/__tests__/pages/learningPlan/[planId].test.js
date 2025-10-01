import { fireEvent, render, screen } from '@testing-library/react';
import Plan from '@/pages/edlm-portal/learner/learningPlan/[planId]';
import React from 'react';

// Mock next/router with dynamic query
const mockPush = jest.fn();
let mockQuery = {};
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockPush,
    query: mockQuery,
  }),
}));

// Mock DefaultLayout
jest.mock('@/components/layouts/DefaultLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="layout">{children}</div>,
}));

// Mock DevelopmentGoal card
jest.mock('@/components/cards/DevelopmentGoal', () => ({
  __esModule: true,
  default: ({ goal }) => (
    <div data-testid="dev-goal">{goal.name}</div>
  ),
}));

describe('Plan Page', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockQuery = {};
  });

  it('renders not found state if planId is missing', () => {
    // No planId set
    render(<Plan />);
    expect(screen.getByText(/No Learning Plans with that ID were found/i)).toBeInTheDocument();
  });

  it('renders not found state if planId is invalid', () => {
    // Invalid planId
    mockQuery.planId = 999;
    render(<Plan />);
    expect(screen.getByText(/No Learning Plans with that ID were found/i)).toBeInTheDocument();
});

  it('finds a learning journey and renders goals', () => {
    mockQuery.planId = '0'; // matches first mockLearningJourneys id
    render(<Plan />);
    // Page header and breadcrumb
    expect(screen.getAllByText('Job Development')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('dev-goal')[0]).toHaveTextContent('Leadership');
    expect(screen.getAllByTestId('dev-goal')[1]).toHaveTextContent('Software');
    expect(screen.getByText('Next Steps')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('finds an onboarding journey and renders', () => {
    mockQuery.planId = '3'; // matches first mockOnboardingJourneys id
    render(<Plan />);
    expect(screen.getAllByText('Phase II (60 Days)')[0]).toBeInTheDocument();
  });

  it('navigates when breadcrumb is clicked', () => {
    mockQuery.planId = '0';
    render(<Plan />);
    fireEvent.click(screen.getByText('Learning Plans'));
    expect(mockPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
  });

  it('navigates when Return to Learning Plans is clicked', () => {
    mockQuery.planId = '0';
    render(<Plan />);
    fireEvent.click(screen.getByText('Return to Learning Plans'));
    expect(mockPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
  });

  // You can add further tests for the three Next Steps buttons if you provide unique selectors or test ids
});