import { render, screen, fireEvent } from '@testing-library/react';
import TabBar from '@/components/buttons/TabBar';

describe('TabBar', () => {
  const mockSetSelectedTab = jest.fn();

  const defaultProps = {
    selectedTab: 'tab1',
    setSelectedTab: mockSetSelectedTab,
    tabs: ['Tab 1', 'Tab 2'],
    loaded: false
  };

  beforeEach(() => {
    mockSetSelectedTab.mockClear();
  });

  it('should show spinner when tab is hovered and loaded is true', () => {
    render(<TabBar {...defaultProps} loaded={true} />);
    fireEvent.mouseEnter(screen.getByText('Tab 2'));

    const spinner = screen.getByLabelText('Purple spinner example');
    expect(spinner).toBeInTheDocument();
  });

  it('should disable when loaded is true', () => {
    render(<TabBar {...defaultProps} loaded={true} />);
    defaultProps.tabs.forEach(tab => {
      expect(screen.getByText(tab)).toBeDisabled();
    });
  });
});