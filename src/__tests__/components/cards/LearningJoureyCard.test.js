import { fireEvent, render, screen } from '@testing-library/react';
import LearningJourneyCard from '@/components/cards/LearningJourneyCard';
import React from 'react';

// Mock Next.js useRouter
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const sampleJourney = {
  id: 'plan-101',
  name: 'Data Literacy Jumpstart',
  created: '2024-09-01',
  description: 'Intro to data, dashboards, and storytelling.',
  length: '4 hours',
  progress: 80,
};

describe('LearningJourneyCard', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders all journey info', () => {
    render(<LearningJourneyCard journey={sampleJourney} />);
    expect(screen.getByText('Data Literacy Jumpstart')).toBeInTheDocument();
    expect(screen.getByText(/Date Created:/)).toHaveTextContent('2024-09-01');
    expect(screen.getByText(sampleJourney.description)).toBeInTheDocument();
    expect(screen.getByText('4 hours')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('sets progress bar width correctly', () => {
    render(<LearningJourneyCard journey={sampleJourney} />);
    const progressBar = document.querySelector('.bg-blue-900');
    expect(progressBar).toHaveStyle('width: 80%');
  });

  it('button click calls router.push with the journey id URL', () => {
    render(<LearningJourneyCard journey={sampleJourney} />);
    fireEvent.click(screen.getByText('View Plan'));
    expect(mockPush).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/plan-101');
  });

  it('conditionally displays missing fields', () => {
    const bareJourney = {
      id: 'bare-1',
      name: 'Bare Bones',
      length: '30 min',
      progress: 0,
    };
    render(<LearningJourneyCard journey={bareJourney} />);
    expect(screen.getByText('Bare Bones')).toBeInTheDocument();
    expect(screen.queryByText(/Date Created:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Intro/)).not.toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
  });
});