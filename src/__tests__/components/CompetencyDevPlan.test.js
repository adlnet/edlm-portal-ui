import { render, screen } from '@testing-library/react';
import CompetencyDevPlan from '@/components/CompetencyDevPlan';
import React from 'react';

describe('CompetencyDevPlan', () => {
  it('renders the correct competency details with standard input', () => {
    const competency = {
      name: "Competency #12A: Creativity & Innovation",
      desc: "Drives new insights and improvements."
    };
    render(<CompetencyDevPlan competency={competency} />);

    // Check for compNumber in the blue badge
    expect(screen.getByText('12A')).toBeInTheDocument();
    
    // Check the name without number
    expect(screen.getByText('Creativity & Innovation')).toBeInTheDocument();
    
    // Check the description
    expect(screen.getByText('Drives new insights and improvements.')).toBeInTheDocument();
  });

  it('works with numbers with no letter', () => {
    const competency = {
      name: "Competency #5: Communication",
      desc: "Encourages effective conversations."
    };
    render(<CompetencyDevPlan competency={competency} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Communication')).toBeInTheDocument();
    expect(screen.getByText('Encourages effective conversations.')).toBeInTheDocument();
  });

  it('renders correctly even with extra whitespace', () => {
    const competency = {
      name: "Comp #100B:   Analytical Thinking    ",
      desc: "Solves complex problems using logic."
    };
    render(<CompetencyDevPlan competency={competency} />);
    expect(screen.getByText('100B')).toBeInTheDocument();
    expect(screen.getByText('Analytical Thinking')).toBeInTheDocument();
  });
});