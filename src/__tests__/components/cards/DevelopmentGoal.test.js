import { fireEvent, render, screen } from '@testing-library/react';
import DevelopmentGoal from '@/components/cards/DevelopmentGoal';
import React from 'react';

const sampleCompetency = {
  name: 'Teamwork',
  priority: 'High',
  goals: [
    {
      id: 'goal1',
      desc: 'Improve communication with peers',
      timeline: 'Q1 2025',
      ksaList: [
        {
          id: 'ksa1',
          title: 'Collaboration',
          desc: 'Work effectively with others',
          currLvl: 'Beginner',
          targetLvl: 'Advanced',
        },
      ],
      resources: ['Weekly team sync'],
      obstacles: ['Remote work barriers'],
      courseList: [
        { id: 'c1', title: 'Effective Communication' },
        { id: 'c2', title: 'Conflict Resolution' },
      ],
    },
  ],
};

describe('DevelopmentGoal Component', () => {
  it('renders the competency name', () => {
    render(<DevelopmentGoal competency={sampleCompetency} />);
    expect(screen.getByText('Teamwork')).toBeInTheDocument();
  });

  it('renders the correct priority icon', () => {
    render(<DevelopmentGoal competency={{ ...sampleCompetency, priority: 'High' }} />);
    expect(screen.getByTestId('priority-high')).toBeInTheDocument();
  });

  it('renders the goal description and timeline', () => {
    render(<DevelopmentGoal competency={sampleCompetency} />);
    expect(screen.getByText('Improve communication with peers')).toBeInTheDocument();
    expect(screen.getByText('Q1 2025')).toBeInTheDocument();
  });

  it('renders the KSA fields', () => {
    render(<DevelopmentGoal competency={sampleCompetency} />);
    expect(screen.getByText('Collaboration')).toBeInTheDocument();
    expect(screen.getByText('Work effectively with others')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('renders the resources and obstacles', () => {
    render(<DevelopmentGoal competency={sampleCompetency} />);
    expect(screen.getByText('Weekly team sync')).toBeInTheDocument();
    expect(screen.getByText('Remote work barriers')).toBeInTheDocument();
  });

  it('renders the linked courses as buttons', () => {
    render(<DevelopmentGoal competency={sampleCompetency} />);
    expect(screen.getByText('Effective Communication')).toBeInTheDocument();
    expect(screen.getByText('Conflict Resolution')).toBeInTheDocument();
  });

  it('toggles goal details when button clicked', () => {
    render(<DevelopmentGoal competency={sampleCompetency} />);
    const toggleButton = screen.getByTestId('toggle-button');

    // Details are open by default
    expect(screen.getByText('Improve communication with peers')).toBeInTheDocument();

    // Click to close
    fireEvent.click(toggleButton);
    expect(screen.queryByText('Improve communication with peers')).not.toBeInTheDocument();

    // Click to open again
    fireEvent.click(toggleButton);
    expect(screen.getByText('Improve communication with peers')).toBeInTheDocument();
  });

  it('panel is closed by default when initiallyOpen is false', () => {
    render(<DevelopmentGoal competency={sampleCompetency} initiallyOpen={false} />);
    expect(screen.queryByText('Improve communication with peers')).not.toBeInTheDocument();

    // Open it
    fireEvent.click(screen.getByTestId('toggle-button'));
    expect(screen.getByText('Improve communication with peers')).toBeInTheDocument();
  });

  it('renders correct icon for each priority', () => {
    const priorities = [
      { label: 'Lowest', testId: 'priority-lowest' },
      { label: 'Low', testId: 'priority-low' },
      { label: 'Medium', testId: 'priority-medium' },
      { label: 'High', testId: 'priority-high' },
      { label: 'Highest', testId: 'priority-highest' },
    ];
    priorities.forEach(({ label, testId }) => {
      render(<DevelopmentGoal competency={{ ...sampleCompetency, priority: label }} />);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });
});