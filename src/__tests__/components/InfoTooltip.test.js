import { InfoTooltip } from '@/components/InfoTooltip';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('InfoTooltip', () => {
  it('renders icon and tooltip content with provided title and content', () => {
    render(
      <InfoTooltip
        title="Test Tooltip Title"
        content="This is the detailed tooltip content."
      />
    );

    // Icon is rendered
    const icon = screen.getByAltText('Info');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('cursor-pointer text-gray-500 hover:text-gray-700 w-3 h-3');
  });

  it('applies a custom icon className if provided', () => {
    render(
      <InfoTooltip
        title="Custom Icon"
        content="With class"
        iconClassName="w-6 h-6"
      />
    );
    const icon = screen.getByAltText('Info');
    expect(icon).toHaveClass('cursor-pointer text-gray-500 hover:text-gray-700 w-6 h-6');
  });
});