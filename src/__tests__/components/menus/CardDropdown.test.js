import { render, screen, fireEvent } from '@testing-library/react';
import CardDropdown from '@/components/menus/CardDropdown';
describe('CardDropdown', () => {
  const mockItems = [
    {
      label: 'Item 1',
      onClick: jest.fn(),
      icon: <span>*</span>
    },
    {
      label: 'Item 2',
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
    render(<CardDropdown menuItems={mockItems} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should render icons', () => {
    render(<CardDropdown menuItems={mockItems} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('*')).toBeInTheDocument();
  });
  
  it('should not show private public toggle on default', () => {
    render(<CardDropdown menuItems={mockItems} />);
    expect(screen.queryByText('Private')).not.toBeInTheDocument();
    expect(screen.queryByText('Public')).not.toBeInTheDocument();
  });

  it('should show toggle when showPrivateToggle is true', () => {
    render(
      <CardDropdown 
        menuItems={mockItems}
        isPublic={true}
        showPrivateToggle={true}
        onTogglePrivatePublic={mockOnToggle}
      />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Public')).toBeInTheDocument();
  });

  it('should toggles between private and public', () => {
    render(
      <CardDropdown 
        menuItems={mockItems}
        isPublic={true}
        showPrivateToggle={true}
        onTogglePrivatePublic={mockOnToggle}
      />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByTitle('toggle'));
    
    // Check if it is no longer public after click on toggle
    expect(mockOnToggle).toHaveBeenCalledWith(false);

    expect(screen.getByText('Private')).toBeInTheDocument();
  });

  it('should update state when isPublic changes', () => {
    const { rerender } = render(
      <CardDropdown 
        menuItems={mockItems}
        isPublic={true}
        showPrivateToggle={true}
        onTogglePrivatePublic={mockOnToggle}
      />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Public')).toBeInTheDocument();

    rerender(
      <CardDropdown 
        menuItems={mockItems}
        isPublic={false}
        showPrivateToggle={true}
        onTogglePrivatePublic={mockOnToggle}
      />
    );

    expect(screen.getByText('Private')).toBeInTheDocument
  });
});