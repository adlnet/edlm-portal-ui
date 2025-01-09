import { render, screen } from '@testing-library/react';
import CollectionCard from '@/components/cards/CollectionCard';

describe('CollectionCard', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    itemsCount: 7,
    totalTime: 5,
    isPublic: true,
    menuItems: [],
    cardDetailLink: '/test',
    showPrivateToggle: false,
    onTogglePrivatePublic: jest.fn()
  };

  it('should render', () => {
    render(<CollectionCard {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('7 items')).toBeInTheDocument();
  });

  it('should render drop down menu when menuItems are provided', () => {
    const menuItems = [
      {
        label: 'Item 1',
        onClick: jest.fn()
      },
      {
        label: 'Item 2',
        onClick: jest.fn()
      }
    ];

    render(<CollectionCard {...defaultProps} menuItems={menuItems} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not render drop down menu when menuItems are not provided', () => {
    render(<CollectionCard {...defaultProps} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should make title clickable with correct link', () => {
    render(<CollectionCard {...defaultProps} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });
});
