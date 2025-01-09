import { render, screen } from '@testing-library/react';
import ProgressCard from '@/components/cards/ProgressCard';

describe('ProgressCard', () => {
  const mockPhases = [
    {
      title: 'Phase 1',
      name: 'phase1',
      progress: 100
    },
    {
      title: 'Phase 2',
      name: 'phase2',
      progress: 70
    }
  ];

  it('should render the progress card with correct content', () => {
    render(<ProgressCard phases={mockPhases} />);
    mockPhases.forEach(phase => {
      expect(screen.getByText(phase.title)).toBeInTheDocument();
      expect(screen.getByText(phase.name)).toBeInTheDocument();
      expect(screen.getByText(`${phase.progress}% Completed`)).toBeInTheDocument();
    });
  });
});