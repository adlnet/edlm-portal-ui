import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render, screen } from '@testing-library/react';
import {
  useAuthenticatedUser,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import LearningPlan from '@/pages/edlm-portal/learner/learningPlan/index';
import singletonRouter from 'next/router';

jest.mock('@/components/Stepper', () => {
  return function MockStepper({ currentStep = 1 }) {
    return <div data-testid='mock-stepper'>Stepper: {currentStep}</div>;
  }
});

describe('learningPlan', () => {
  const renderLearningPlan = () => {
    return render(
      <QueryClientWrapper>
          <LearningPlan />
      </QueryClientWrapper>
    );
  };

  it('should render the page', () => {
    useAuthenticatedUser();
    renderLearningPlan();
    expect(screen.getByText('Onboarding Learning Plan')).toBeInTheDocument();
  });

  it('should render the stepper with correct prop', () => {
    useAuthenticatedUser();
    renderLearningPlan();
    expect(screen.getByTestId('mock-stepper')).toBeInTheDocument();
    expect(screen.getByTestId('mock-stepper')).toHaveTextContent('Stepper: 1');
  });

  // it('should render the learning plan description', () => {
  //   useAuthenticatedUser();
  //   renderLearningPlan();
  //   expect(singletonRouter).toMatchObject({ asPath: '/edlm-portal' });
  // });

  it('should render the stepper with correct prop', () => {
    useAuthenticatedUser();
    renderLearningPlan();
    expect(screen.getByTestId('mock-stepper')).toBeInTheDocument();
    expect(screen.getByTestId('mock-stepper')).toHaveTextContent('Stepper: 1');
  });
});