import { render, screen, fireEvent } from '@testing-library/react';
import CardDropdown from '/components/menus/CardDropdown';

describe('CardDropdown', () => {
  const mockItems = [
    {
      title: 'Item 1',
      onClick: jest.fn(),
      icon: <span>*</span>
    },
    {
      title: 'Item 2',
      onClick: jest.fn()
    }
  ];

  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dropdown button', () => {
    render(<CardDropdown menuItems={mockItems} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should show menu when clicked', () => {
    render(<CardDropdown items={mockItems} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});