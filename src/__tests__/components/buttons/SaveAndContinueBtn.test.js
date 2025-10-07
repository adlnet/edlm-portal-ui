import { fireEvent, render, screen  } from '@testing-library/react';
import React from 'react';
import SaveAndContinueBtn from '@/components/buttons/SaveAndContinueBtn';

describe('SaveAndContinueBtn', () => {
  it('renders with default text and can be clicked', () => {
    const handleClick = jest.fn();
    render(<SaveAndContinueBtn onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /save and continue/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Save & Continue')).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('shows loading text and is disabled during loading', () => {
    const handleClick = jest.fn();
    render(<SaveAndContinueBtn onClick={handleClick} loading />);
    const button = screen.getByRole('button', { name: /save and continue/i });
    expect(screen.getByText('Saving...')).toBeInTheDocument();
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('is disabled when the disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<SaveAndContinueBtn onClick={handleClick} disabled />);
    const button = screen.getByRole('button', { name: /save and continue/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('calls onClick when pressing Enter if not disabled/loading', () => {
    const handleClick = jest.fn();
    render(<SaveAndContinueBtn onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /save and continue/i });
    fireEvent.keyDown(button, { key: 'Enter', code: 13, charCode: 13 });
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not call onClick with Enter key if disabled', () => {
    const handleClick = jest.fn();
    render(<SaveAndContinueBtn onClick={handleClick} disabled />);
    const button = screen.getByRole('button', { name: /save and continue/i });
    fireEvent.keyDown(button, { key: 'Enter', code: 13, charCode: 13 });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick with Enter key if loading', () => {
    const handleClick = jest.fn();
    render(<SaveAndContinueBtn onClick={handleClick} loading />);
    const button = screen.getByRole('button', { name: /save and continue/i });
    fireEvent.keyDown(button, { key: 'Enter', code: 13, charCode: 13 });
    expect(handleClick).not.toHaveBeenCalled();
  });
});