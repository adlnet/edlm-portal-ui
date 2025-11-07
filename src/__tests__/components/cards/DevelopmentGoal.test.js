import { fireEvent, render, screen } from '@testing-library/react';
import DevelopmentGoal from '@/components/cards/DevelopmentGoal';
import React from 'react';

const sampleGoal = {
  name: 'Improve Communication',
  desc: 'Become more effective in team meetings and presentations.',
  timeline: 'Q1 2026',
  priority: 'Highest',
  ksaList: [
    {
      title: 'Presentation Skills',
      desc: 'Ability to deliver structured presentations.',
      currLvl: 'Intermediate',
      targetLvl: 'Advanced'
    },
    {
      title: 'Active Listening',
      desc: 'Listen effectively during meetings.',
      currLvl: 'Beginner',
      targetLvl: 'Mastery'
    },
  ],
  resources: ['Toastmasters', 'Manager feedback'],
  obstacles: ['Nerves', 'Time constraints'],
  courseList: [
    {id: 1, title: 'test course'},
    {id: 1, title: 'test course'}
  ]
};

const sampleGoal2 = {
  name: '',
  desc: '',
  timeline: '',
  priority: 'High',
  ksaList: [],
  resources: [],
  obstacles: [],
  courseList: [],
};

const sampleGoal3 = {
  name: '',
  desc: '',
  timeline: '',
  priority: 'Medium',
  ksaList: [],
  resources: [],
  obstacles: [],
  courseList: [],
};

const sampleGoal4 = {
  name: '',
  desc: '',
  timeline: '',
  priority: 'Low',
  ksaList: [],
  resources: [],
  obstacles: [],
  courseList: [],
};

const sampleGoal5 = {
  name: '',
  desc: '',
  timeline: '',
  priority: 'Lowest',
  ksaList: [],
  resources: [],
  obstacles: [],
  courseList: [],
};

const sampleGoalFail = {
  name: '',
  desc: '',
  timeline: '',
  priority: 'N/A',
  ksaList: [],
  resources: [],
  obstacles: [],
  courseList: [],
};

describe('DevelopmentGoal', () => {
  it('renders the goal name and description', () => {
    render(<DevelopmentGoal goal={sampleGoal} initiallyOpen={true}/>);
    expect(screen.getByText('Improve Communication')).toBeInTheDocument();
    expect(screen.getByText('Become more effective in team meetings and presentations.')).toBeInTheDocument();
    expect(screen.getByText('Q1 2026')).toBeInTheDocument();
  });

  it('displays all KSA items correctly', () => {
    render(<DevelopmentGoal goal={sampleGoal} initiallyOpen={true}/>);
    expect(screen.getByText('Presentation Skills')).toBeInTheDocument();
    expect(screen.getByText('Ability to deliver structured presentations.')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();

    expect(screen.getByText('Active Listening')).toBeInTheDocument();
    expect(screen.getByText('Listen effectively during meetings.')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Mastery')).toBeInTheDocument();
  });

  it('lists all resources and obstacles', () => {
    render(<DevelopmentGoal goal={sampleGoal} initiallyOpen={true}/>);
    expect(screen.getByText('Toastmasters')).toBeInTheDocument();
    expect(screen.getByText('Manager feedback')).toBeInTheDocument();
    expect(screen.getByText('Nerves')).toBeInTheDocument();
    expect(screen.getByText('Time constraints')).toBeInTheDocument();
  });

  it('toggles details section when button is clicked', () => {
    render(<DevelopmentGoal goal={sampleGoal} initiallyOpen={true}/>);
    expect(screen.getByText('Goal')).toBeInTheDocument();

    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    expect(screen.queryByText('Goal')).not.toBeInTheDocument();

    // Clicking again re-opens details
    fireEvent.click(toggleButton);
    expect(screen.getByText('Goal')).toBeInTheDocument();
  });

  it('Goes through all priorities', () => {
    render(<DevelopmentGoal goal={sampleGoal} />);
    render(<DevelopmentGoal goal={sampleGoal2} />);
    render(<DevelopmentGoal goal={sampleGoal3} />);
    render(<DevelopmentGoal goal={sampleGoal4} />);
    render(<DevelopmentGoal goal={sampleGoal5} />);
    render(<DevelopmentGoal goal={sampleGoalFail} />);

    expect(screen.getByTestId('priority-highest')).toBeInTheDocument();
    expect(screen.getByTestId('priority-high')).toBeInTheDocument();
    expect(screen.getByTestId('priority-medium')).toBeInTheDocument();
    expect(screen.getByTestId('priority-low')).toBeInTheDocument();
    expect(screen.getByTestId('priority-lowest')).toBeInTheDocument();

  });
});