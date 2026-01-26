import { fireEvent, render, screen } from '@testing-library/react';
import ActiveCompleteTab from '@/components/buttons/ActiveCompleteTab';
import React from 'react';

describe('ActiveCompleteTab', () => {
  const tabs = [
    { label: 'Active', count: 2 },
    { label: 'Completed', count: 7 }
  ];

  let activeIndex;
  let setActiveIndex;
  let onChange;

  beforeEach(() => {
    activeIndex = 0;
    setActiveIndex = jest.fn((idx) => {
      activeIndex = idx;
    });
    onChange = jest.fn();
  });

  it('renders all tabs with labels and counts', () => {
    render(
      <ActiveCompleteTab
        tabs={tabs}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onChange={onChange}
      />
    );

    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('highlights the active tab', () => {
    render(
      <ActiveCompleteTab
        tabs={tabs}
        activeIndex={1}
        setActiveIndex={setActiveIndex}
        onChange={onChange}
      />
    );

    const completedTab = screen.getByText('Completed').closest('button');
    expect(completedTab).toHaveClass('border-b-2 border-sky-500 text-sky-600 font-semibold');
  });

  it('calls setActiveIndex and onChange when a tab is clicked', () => {
    render(
      <ActiveCompleteTab
        tabs={tabs}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
        onChange={onChange}
      />
    );

    const completedTabButton = screen.getByText('Completed').closest('button');
    fireEvent.click(completedTabButton);

    expect(setActiveIndex).toHaveBeenCalledWith(1);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('does not break if onChange is not provided', () => {
    render(
      <ActiveCompleteTab
        tabs={tabs}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
      />
    );

    const completedTabButton = screen.getByText('Completed').closest('button');
    fireEvent.click(completedTabButton);

    expect(setActiveIndex).toHaveBeenCalledWith(1);
  });

  it('renders the correct styles for inactive tabs', () => {
    render(
      <ActiveCompleteTab
        tabs={tabs}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
        onChange={onChange}
      />
    );

    const completedTab = screen.getByText('Completed').closest('button');
    expect(completedTab).toHaveClass('border-b-2 border-transparent text-gray-800 font-normal');
  });
});