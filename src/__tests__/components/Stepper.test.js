import { render, screen } from '@testing-library/react';
import Stepper from '@/components/Stepper';

describe('Stepper', () => {
  const mockSteps = [{name: 'step 1', id:0}, {name:'step 2',id:1}, {name:'step 3',id:2}];

  it('should render all steps', () => {
    render(<Stepper steps={mockSteps} />);

    mockSteps.forEach(step => {
      expect(screen.getByText(step.name)).toBeInTheDocument();
    });
  });
});