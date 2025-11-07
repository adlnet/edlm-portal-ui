import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render, screen } from '@testing-library/react';
import {
  useAuthenticatedUser,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import LearningPlan from '@/pages/edlm-portal/learner/learningPlan/index';
import RouteProtection from '@/utils/RouteProtection';
import singletonRouter from 'next/router';

jest.mock('@/components/cards/LearningJourneyCard', () => ({ journey }) => {
  <div data-testid="lj-card">{journey.name}</div>
});

describe('learningPlan', () => {
  const renderLearningPlan = () => {
    return render(
      <QueryClientWrapper>
          <LearningPlan />
      </QueryClientWrapper>
    );
  };

  it('should render the page and headers', () => {
    useAuthenticatedUser();
    renderLearningPlan();
    expect(screen.getByText('Individual Development Plan')).toBeInTheDocument();
    expect(screen.getByText('DOT&E Onboarding Plans')).toBeInTheDocument();
  });

  it('shows tabs with correct labels', () => {
    useAuthenticatedUser();
    renderLearningPlan();
    expect(screen.getByText('Active Plans')).toBeInTheDocument();
    expect(screen.getByText('Completed Plans')).toBeInTheDocument();
  });

  it('should render the learning plan description', () => {
    useAuthenticatedUser();
    renderLearningPlan();
    expect(screen.getByText(/This Learning Plan phase /)).toBeInTheDocument();
  });

  // it('should navigate the user to "/401" if not authenticated', () => {
  //   useUnauthenticatedUser();
  //   renderLearningPlan();
  //   expect(singletonRouter).toMatchObject({ asPath: '/edlm-portal/401' });
  // });

});