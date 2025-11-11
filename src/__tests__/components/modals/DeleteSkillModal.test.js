import { fireEvent, render, screen  } from '@testing-library/react';
import DeleteCompetencyModal from '@/components/modals/DeleteSkillModal';
import React from 'react';

jest.mock('flowbite-react', () => ({
  Button: (props) => (
    <button {...props} data-testid="flowbite-btn">
      {props.children}
    </button>
  ),
}));

describe('DeleteCompetencyModal', () => {
  const onClose = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <DeleteCompetencyModal open={false} onClose={onClose} onDelete={onDelete} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal content and actions when open', () => {
    render(<DeleteCompetencyModal open onClose={onClose} onDelete={onDelete} />);
    expect(
      screen.getByText(/are you sure you want to delete this competency/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/deleting this competency will permanently remove/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete Competency')).toBeInTheDocument();
  });

  it('calls onClose when Cancel is clicked', () => {
    render(<DeleteCompetencyModal open onClose={onClose} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('calls onDelete and onClose when Delete Competency is clicked', () => {
    render(<DeleteCompetencyModal open onClose={onClose} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete Competency'));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});