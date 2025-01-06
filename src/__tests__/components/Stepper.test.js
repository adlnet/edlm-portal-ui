import { render, screen } from '@testing-library/react';
import Stepper from '@/components/Stepper';

describe('Stepper', () => {
  const mockSteps = ['step 1', 'step 2', 'step 3'];

  it('should render all steps', () => {
    render(<Stepper steps={mockSteps} />);

    mockSteps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });
});