import { fireEvent, render, screen } from '@testing-library/react';
import PriorityDropdown from '@/components/menus/PriorityDropdown';
import React from 'react';


// Mock CustomDropdown to catch and test all props and outputs
jest.mock('@/components/menus/CustomDropdown', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    options,
    placeholder,
    renderDisplay,
    renderOption
  }) => (
    <div data-testid="custom-dropdown">
      <div data-testid="dropdown-display">{renderDisplay(value, placeholder)}</div>
      <div data-testid="dropdown-options">
        {options.map(opt => (
          <button
            key={opt}
            data-testid="dropdown-option"
            onClick={() => onChange({ target: { value: opt } })}
          >
            {renderOption(opt)}
          </button>
        ))}
      </div>
    </div>
  ),
}));

// Mock priorityIcon to be easy to verify
jest.mock('@/utils/priorityIcon', () => ({
  __esModule: true,
  default: priority => <span data-testid="priority-icon">{priority}-icon</span>,
}), { virtual: true });

describe('PriorityDropdown', () => {
  const options = ['High', 'Medium', 'Low'];

  it('renders the placeholder when no value chosen', () => {
    render(<PriorityDropdown value="" onChange={() => {}} options={options} placeholder="Choose Priority" />);
    expect(screen.getByText('Choose Priority')).toBeInTheDocument();
  });

  it('renders selected value with icon', () => {
    render(<PriorityDropdown value="High" onChange={() => {}} options={options} />);
    expect(screen.getAllByText('High').length).toBeGreaterThan(1);
  });

  it('renders each option with its priority icon', () => {
    render(<PriorityDropdown value="" onChange={() => {}} options={options} />);
    const menuItems = screen.getAllByTestId('dropdown-option');
    expect(menuItems.length).toBe(3);
    menuItems.forEach((item, i) => {
      expect(item).toHaveTextContent(options[i]);
      expect(item.querySelector('[data-testid="priority-icon"]')).toHaveTextContent(`${options[i]}-icon`);
    });
  });

  it('fires onChange with correct value when option clicked', () => {
    const handleChange = jest.fn();
    render(<PriorityDropdown value="" onChange={handleChange} options={options} />);
    fireEvent.click(screen.getAllByTestId('dropdown-option')[2]); // "Low"
    expect(handleChange).toHaveBeenCalledWith({ target: { value: 'Low' } });
  });

  it('uses default placeholder if none specified', () => {
    render(<PriorityDropdown value="" onChange={() => {}} options={options} />);
    expect(screen.getByText('Select priority')).toBeInTheDocument();
  });
});