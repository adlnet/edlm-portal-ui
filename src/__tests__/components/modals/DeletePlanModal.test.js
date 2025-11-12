import { fireEvent, render, screen  } from '@testing-library/react';
import DeletePlanModal from '@/components/modals/DeletePlanModal';
import React from 'react';

// --- Mocks ---
jest.mock('flowbite-react', () => ({
  Button: (props) => (
    <button {...props} data-testid="flowbite-btn">
      {props.children}
    </button>
  ),
}));



describe('DeletePlanModal', () => {
  const onClose = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <DeletePlanModal open={false} onClose={onClose} onDelete={onDelete} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal with title and text when open', () => {
    render(
      <DeletePlanModal open onClose={onClose} onDelete={onDelete} />
    );
    expect(
      screen.getByText(/are you sure you want to delete this plan/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/deleting your plan is permanent/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete Plan')).toBeInTheDocument();
  });

  it('calls onClose when Cancel is clicked', () => {
    render(<DeletePlanModal open onClose={onClose} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('calls onDelete and onClose when Delete Plan is clicked', () => {
    render(<DeletePlanModal open onClose={onClose} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete Plan'));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});