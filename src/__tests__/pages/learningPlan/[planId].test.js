import { fireEvent, render, screen } from '@testing-library/react';
import { useLearningPlan } from '@/hooks/learningPlan/useLearningPlan';
import { useMultipleCompAndKsaDesc } from '@/hooks/useCompOrKsaDesc';
import { useRouter } from 'next/router';
import Plan from '@/pages/edlm-portal/learner/learningPlan/[planId]';
import React from 'react';

// Mocks
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/learningPlan/useLearningPlan', () => ({
  useLearningPlan: jest.fn(),
}));
jest.mock('@/hooks/useCompOrKsaDesc', () => ({
  useMultipleCompAndKsaDesc: jest.fn(),
}));
jest.mock('@/components/layouts/DefaultLayout', () => {
  const DefaultLayout = (props) => <div>{props.children}</div>;
  DefaultLayout.displayName = 'DefaultLayout';
  return DefaultLayout;
});
jest.mock('@/components/cards/DevelopmentGoal', () => {
  const DevelopmentGoal = (props) => <div data-testid="DevelopmentGoal">{props.goal.id}</div>;
  DevelopmentGoal.displayName = 'DevelopmentGoal';
  return DevelopmentGoal;
});

// Required icons and flowbite
jest.mock('@heroicons/react/24/outline', () => ({
  ArrowLongRightIcon: () => <div data-testid="ArrowLongRightIcon"/>,
  ChevronRightIcon: () => <div data-testid="ChevronRightIcon"/>,
  PencilSquareIcon: (props) => <div data-testid="PencilSquareIcon"/>,
}));
jest.mock('flowbite-react', () => ({
  Button: (props) => <button {...props}>{props.children}</button>,
}));

describe('Plan', () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ query: { planId: '123' }, push });
  });

  it('renders error state', () => {
    useLearningPlan.mockReturnValue({ data: null, error: true });
    useMultipleCompAndKsaDesc.mockReturnValue({ data: [] });
    render(<Plan />);
    expect(screen.getByText('No Learning Plans with that ID were found.')).toBeInTheDocument();
  });

  it('renders loading state (no data not error)', () => {
    useLearningPlan.mockReturnValue({ data: null, error: false });
    useMultipleCompAndKsaDesc.mockReturnValue({ data: [] });
    render(<Plan />);
    expect(screen.getByText('No Learning Plans with that ID were found.')).toBeInTheDocument();
  });

  it('renders the plan details and goals correctly', () => {
    const plan = {
      name: 'Test Plan',
      timeframe: '2024',
      competencies: [
        {
          plan_competency_name: 'Comp1',
          eccr_competency: 'eccr1',
          priority: 1,
          goals: [
            {
              id: 'goal1',
              goal_name: 'Goal One',
              timeline: 'Q1',
              resources_support: [{ label: 'Res1' }],
              obstacles: [{ label: 'Obs1' }],
              resources_support_other: 'Other resource',
              obstacles_other: 'Other obstacle',
              ksas: [
                {
                  ksa_name: 'KSA1',
                  eccr_ksa: 'ksa1',
                  current_proficiency: 1,
                  target_proficiency: 3,
                },
              ],
              courses: [
                { course_name: 'Course A' },
                { course_name: 'Course B' },
              ],
            },
          ],
        },
      ],
    };
    const descList = [{ id: 'ksa1', description: 'Desc KSA1' }];
    useLearningPlan.mockReturnValue({ data: plan, error: null });
    useMultipleCompAndKsaDesc.mockReturnValue({ data: descList });

    render(<Plan />);

    // Breadcrumbs & plan details
    expect(screen.getAllByText('Test Plan')[0]).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();

    // Goals render
    expect(screen.getByTestId("DevelopmentGoal")).toHaveTextContent('goal1');

    // Next Steps & all steps
    expect(screen.getByText('Next Steps')).toBeInTheDocument();
    expect(screen.getByText('Track Your Progress')).toBeInTheDocument();
    expect(screen.getByText('Explore Course Catalog')).toBeInTheDocument();
    expect(screen.getByText('Add from Collections')).toBeInTheDocument();
  });

  it('navigates to edit page on edit click', () => {
    useLearningPlan.mockReturnValue({ data: { name: '', timeframe: '', competencies: [] }, error: null });
    useMultipleCompAndKsaDesc.mockReturnValue({ data: [] });
    render(<Plan />);
    const editBtn = screen.getByText('Edit');
    fireEvent.click(editBtn);
    expect(push).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/edit/123');
  });

  it('navigates to learning plans on breadcrumb click', () => {
    useLearningPlan.mockReturnValue({ data: { name: '', timeframe: '', competencies: [] }, error: null });
    useMultipleCompAndKsaDesc.mockReturnValue({ data: [] });
    render(<Plan />);
    const plansBtn = screen.getByText('Learning Plans');
    fireEvent.click(plansBtn);
    expect(push).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
  });

  it('navigates to learning plans on Return button click', () => {
    useLearningPlan.mockReturnValue({ data: { name: '', timeframe: '', competencies: [] }, error: null });
    useMultipleCompAndKsaDesc.mockReturnValue({ data: [] });
    render(<Plan />);
    const btn = screen.getByText('Return to Learning Plans');
    fireEvent.click(btn);
    expect(push).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
  });

  it('handles empty competencies array gracefully', () => {
    useLearningPlan.mockReturnValue({ data: { name: '', timeframe: '', competencies: [] }, error: null });
    useMultipleCompAndKsaDesc.mockReturnValue({ data: [] });
    render(<Plan />);

    // Should still render next steps etc.
    expect(screen.getByText('Next Steps')).toBeInTheDocument();
  });

  it('handles missing goals and missing ksas or courses', () => {
    const plan = {
      name: 'Plan2',
      timeframe: '2025',
      competencies: [
        {
          plan_competency_name: 'C1',
          eccr_competency: 'eccr1',
          priority: 3,
          goals: [
            {
              id: 'goal2',
              goal_name: 'Goal2',
              timeline: 'Dec',
              resources_support: null,
              obstacles: null,
              resources_support_other: undefined,
              obstacles_other: undefined,
              ksas: null,
              courses: null,
            },
          ],
        },
      ],
    };
    useLearningPlan.mockReturnValue({ data: plan, error: null });
    useMultipleCompAndKsaDesc.mockReturnValue({ data: [] });

    render(<Plan />);
    expect(screen.getByTestId("DevelopmentGoal")).toHaveTextContent('goal2');
  });
});