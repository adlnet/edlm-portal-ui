import { NamePlanStep } from '@/components/steps/NamePlanStep';
import { fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

jest.mock('flowbite-react', () => ({
  __esModule: true,
  TextInput: ({ id, value, placeholder, onChange }) => (
    <input
      data-testid="text-input"
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  ),
  Dropdown: () => <div data-testid="dropdown" />,
  Select: () => <select data-testid="select" />,
}));

jest.mock('@/components/menus/CustomDropdown', () => ({
  __esModule: true,
  default: ({ value, onChange, options, placeholder }) => (
    <div data-testid="custom-dropdown">
      <span>{placeholder}</span>
      {options &&
        options.map((opt, i) => (
          <button
            key={opt.value || opt.label || i}
            data-testid="custom-dropdown-option"
            onClick={() => onChange({ target: { value: opt.value || opt } })}
          >
            {opt.label || opt.value || opt}
          </button>
        ))}
      <span data-testid="dropdown-value">{value}</span>
    </div>
  ),
}));

jest.mock('@/utils/dropdownMenuConstants', () => ({
  timeframeOptions: [
    { label: '1 Month', value: '1_month' },
    { label: '3 Months', value: '3_months' },
  ],
}), { virtual: true });

jest.mock('@/public/icons/asteriskIcon.svg', () => 'asterisk-icon.svg', { virtual: true });

describe('NamePlanStep', () => {
  const setPlanName = jest.fn();
  const setTimeframe = jest.fn();

  beforeEach(() => {
    setPlanName.mockClear();
    setTimeframe.mockClear();
  });

  it('renders header, description, and required indicator', () => {
    render(
      <NamePlanStep
        planName=""
        setPlanName={setPlanName}
        timeframe=""
        setTimeframe={setTimeframe}
      />
    );
    expect(screen.getByText('Name Your Plan')).toBeInTheDocument();
    expect(
      screen.getByText(/What would you like to call your learning plan/)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Required/)[0]).toBeInTheDocument();
  });

  it('shows current plan name and updates on input change', () => {
    render(
      <NamePlanStep
        planName="Internal Mobility"
        setPlanName={setPlanName}
        timeframe=""
        setTimeframe={setTimeframe}
      />
    );
    const input = screen.getByTestId('text-input');
    expect(input.value).toBe('Internal Mobility');
    fireEvent.change(input, { target: { value: 'AI Upskilling' } });
    expect(setPlanName).toHaveBeenCalledWith('AI Upskilling');
  });

  it('shows the current timeframe in CustomDropdown', () => {
    render(
      <NamePlanStep
        planName=""
        setPlanName={setPlanName}
        timeframe="1_month"
        setTimeframe={setTimeframe}
      />
    );
    expect(screen.getByTestId('dropdown-value')).toHaveTextContent('1_month');
  });

  it('renders timeframe options and calls onChange when clicked', () => {
    render(
      <NamePlanStep
        planName=""
        setPlanName={setPlanName}
        timeframe=""
        setTimeframe={setTimeframe}
      />
    );
    const options = screen.getAllByTestId('custom-dropdown-option');
    expect(options.length).toBeGreaterThan(1);
    fireEvent.click(options[1]);
    expect(setTimeframe).toHaveBeenCalledWith('3_months');
  });

  it('renders with empty props safely', () => {
    render(
      <NamePlanStep
        planName=""
        setPlanName={setPlanName}
        timeframe=""
        setTimeframe={setTimeframe}
      />
    );

    // Should not throw and all fields are present
    expect(screen.getByPlaceholderText('Create a name for your learning plan')).toBeInTheDocument();
    expect(screen.getByText('When do you aim to complete this plan?')).toBeInTheDocument();
  });
});