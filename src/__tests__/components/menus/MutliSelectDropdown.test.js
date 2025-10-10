import { MultiSelectDropdown } from '@/components/menus/MultiSelectDropdown';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

// Mock ChevronDownIcon
jest.mock("@heroicons/react/20/solid", () => ({
  __esModule: true,
  ChevronDownIcon: (props) => (
    <svg data-testid="chevron-icon" {...props}>
      <title>ChevronDown</title>
    </svg>
  ),
}));

describe("MultiSelectDropdown", () => {
  const OPTIONS = ["Option 1", "Option 2", "Option 3"];

  it("renders with placeholder when nothing is selected", () => {
    render(
      <MultiSelectDropdown
        options={OPTIONS}
        selectedValues={[]}
        onChange={() => {}}
        placeholder="Choose options"
      />
    );
    expect(screen.getByText("Choose options")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-icon")).toBeInTheDocument();
  });

  it("shows correct selected count and text", () => {
    render(
      <MultiSelectDropdown
        options={OPTIONS}
        selectedValues={["Option 1", "Option 2"]}
        onChange={() => {}}
        placeholder="Choose options"
      />
    );
    expect(screen.getByText("2 selected")).toBeInTheDocument();
  });

  it("toggles the dropdown open and close on button click", () => {
    render(
      <MultiSelectDropdown
        options={OPTIONS}
        selectedValues={[]}
        onChange={() => {}}
        placeholder="Pick"
      />
    );

    // Dropdown content should not be in the DOM initially
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

    // Open
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByRole("checkbox").length).toBe(OPTIONS.length);

    // Close
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("checks checkboxes for selected values", () => {
    render(
      <MultiSelectDropdown
        options={OPTIONS}
        selectedValues={["Option 2"]}
        onChange={() => {}}
        placeholder="Select"
      />
    );
    fireEvent.click(screen.getByRole("button"));
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0].checked).toBe(false);
    expect(checkboxes[1].checked).toBe(true);
    expect(checkboxes[2].checked).toBe(false);
  });

  it("calls onChange with added values when a checkbox is checked", () => {
    const handleChange = jest.fn();
    render(
      <MultiSelectDropdown
        options={OPTIONS}
        selectedValues={[]}
        onChange={handleChange}
        placeholder="Select"
      />
    );
    fireEvent.click(screen.getByRole("button"));
    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[2]); // Select "Option 3"
    expect(handleChange).toHaveBeenCalledWith(["Option 3"]);
  });

  it("calls onChange with removed values when a checkbox is unchecked", () => {
    const handleChange = jest.fn();
    render(
      <MultiSelectDropdown
        options={OPTIONS}
        selectedValues={["Option 1", "Option 2"]}
        onChange={handleChange}
        placeholder="Pick"
      />
    );
    fireEvent.click(screen.getByRole("button"));
    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[0]); // Unselect "Option 1"
    expect(handleChange).toHaveBeenCalledWith(["Option 2"]);
  });

  it("disables the button when disabled prop is true", () => {
    render(
      <MultiSelectDropdown
        options={OPTIONS}
        disabled={true}
        selectedValues={[]}
        onChange={() => {}}
        placeholder="Disabled"
      />
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-gray-100 cursor-not-allowed");
  });

  it("does not open dropdown when disabled", () => {
    render(
      <MultiSelectDropdown
        options={OPTIONS}
        disabled={true}
        selectedValues={[]}
        onChange={() => {}}
        placeholder="Disabled"
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("renders all options as label+checkbox", () => {
    render(
      <MultiSelectDropdown
        options={OPTIONS}
        selectedValues={[]}
        onChange={() => {}}
        placeholder="Options"
      />
    );
    fireEvent.click(screen.getByRole("button"));
    OPTIONS.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});