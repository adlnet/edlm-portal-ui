import { render, screen } from '@testing-library/react';
import CheckMessageCard from '@/components/cards/CheckMessageCard';

describe('CheckMessageCard', () => {
  it('should render the message when provided', () => {
    render(<CheckMessageCard message="Test!" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test!')).toBeInTheDocument();
  });
});