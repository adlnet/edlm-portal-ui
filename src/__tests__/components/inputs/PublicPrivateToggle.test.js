import { fireEvent, render, screen } from '@testing-library/react';
import PublicPrivateToggle from '@/components/inputs/PublicPrivateToggle';

// Mock heroicons
jest.mock('@heroicons/react/24/outline', () => ({
  EyeIcon: () => <div data-testid='1'>Eye Icon</div>,
  EyeOffIcon: () => <div data-testid='2'>Eye Off Icon</div>,
}));

describe('PublicPrivateToggle', () => {
  const mockToggleListVisibility = jest.fn();

  const defaultProps = {
    currentListInfo: {
      public: false,
    },
    toggleListVisibility: mockToggleListVisibility,
  };
  
  beforeEach(() => {
    mockToggleListVisibility.mockClear();
  });

  it('should render correctly when list is private', () => {
    render(<PublicPrivateToggle {...defaultProps} />);
    expect(screen.getByText((content) => content.startsWith('Private List, only you can see it'))).toBeInTheDocument();
  });

  it('should render correctly when list is public', () => {
    render(
      <PublicPrivateToggle 
        currentListInfo={{ public: true }}
        toggleListVisibility={mockToggleListVisibility}
      />);
    expect(screen.getByText((content) => content.startsWith('Public list, viewable by other users'))).toBeInTheDocument();
  });
});