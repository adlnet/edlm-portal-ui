import { act, fireEvent, render, screen } from '@testing-library/react';

import SelectList from '@/components/inputs/SelectList';
import aggregationsData from '@/__mocks__/data/aggregations.data';

describe('Select List', () => {
  const mockOnChange = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    console.log = jest.fn();
    let params = {};
    const keys = Object.keys(aggregationsData);
    const local = aggregationsData[keys[0]];
    render(
      <SelectList
        initialValue={params[local.field_name]}
        options={local}
        keyName={keys[0]}
        onChange={mockOnChange}
        onClear={mockOnClear}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show default name', () => {
    expect(screen.getByText('Course Type')).toBeInTheDocument();
  });

  it('should show menu items on click', () => {
    act(() => {
      const button = screen.getByText('Course Type');
      fireEvent.click(button);
    });

    expect(screen.getByText('test bucket 1')).toBeInTheDocument();
    expect(screen.getByText('test bucket 2')).toBeInTheDocument();
  });

  it('should show selected value as the button title', () => {
    act(() => {
      const button = screen.getByText('Course Type');
      fireEvent.click(button);
    });

    act(() => {
      const selection = screen.getByText('test bucket 1');
      fireEvent.click(selection);
    });

    expect(screen.getAllByText('test bucket 1').length).toBe(1);
  });

  it('should handle checkbox selection and de selection', () => {
    act(() => {
      const button = screen.getByText('Course Type');
      fireEvent.click(button);
    });

    const checkBox = screen.getByLabelText('test bucket 1');

    act(() => {
      fireEvent.click(checkBox);
    });

    expect(checkBox).toBeChecked();
    
    act(() => {
      fireEvent.click(checkBox);
    });

    expect(checkBox).not.toBeChecked();
    
  })

  it('should call on change when closing dropdown with selections', () => {
    act(() => {
      const button = screen.getByText('Course Type');
      fireEvent.click(button);
    });

    const checkBox = screen.getByLabelText('test bucket 1');

    act(() => {
      fireEvent.click(checkBox);
    });

    act(() => {
      const button = screen.getByText('Course Type');
      fireEvent.click(button);
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should close dropdown when clicking out', () => {
    act(() => {
      const button = screen.getByText('Course Type');
      fireEvent.click(button);
    });

    act(() => {
      fireEvent.click((screen.getByLabelText('test bucket 1')));
    });

    act(() => {
      fireEvent.click(document.body);
    });

    expect(screen.queryByText('test bucket 1')).not.toBeInTheDocument();
  });

  it('should handle multiple dropdown selections', () => {
    act(() => {
      const button = screen.getByText('Course Type');
      fireEvent.click(button);
    });

    const checkBox1 = screen.getByLabelText('test bucket 1');
    const checkBox2 = screen.getByLabelText('test bucket 2');

    act(() => {
      fireEvent.click(checkBox1);
    });

    act(() => {
      fireEvent.click(checkBox2);
    });

    act(() => {
      const button = screen.getByText('Course Type');
      fireEvent.click(button);
    });

    expect(checkBox1).toBeChecked();
    expect(checkBox2).toBeChecked();
  });
});