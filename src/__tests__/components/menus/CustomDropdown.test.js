import { fireEvent, render, screen } from '@testing-library/react';
import CustomDropdown from '@/components/menus/CustomDropdown';
import React from 'react';

// Mock flowbite-react Dropdown, Dropdown.Item, and Dropdown.Divider correctly
jest.mock("flowbite-react", () => ({
  __esModule: true,
  Dropdown: Object.assign(
    ({ children, renderTrigger, label, className }) => (
      <div data-testid="dropdown" className={className} aria-label={label}>
        <div data-testid="dropdown-trigger">{renderTrigger && renderTrigger()}</div>
        <div data-testid="dropdown-list">{children}</div>
      </div>
    ),
    {
      Item: ({ children, onClick, className }) => (
        <button
          data-testid="dropdown-item"
          className={className}
          onClick={onClick}
        >
          {children}
        </button>
      ),
      Divider: () => <hr data-testid="dropdown-divider" />,
    }
  ),
}));

// Mock heroicons directly
jest.mock("@heroicons/react/24/solid", () => ({
  __esModule: true,
  ChevronDownIcon: (props) => <svg data-testid="chevron-icon" {...props} />,
}));

describe("CustomDropdown", () => {

  it("renders trigger with placeholder when no value", () => {
    render(
      <CustomDropdown
        value=""
        options={["A", "B"]}
        placeholder="Choose"
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Choose")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("dropdown-item").length).toBe(2);
  });

  it("renders trigger with value when selected", () => {
    render(
      <CustomDropdown
        value="B"
        options={["A", "B"]}
        placeholder="Choose"
        onChange={() => {}}
      />
    );
    expect(screen.getAllByText("B").length).toBeGreaterThan(0);
  });

  it("renders custom display via renderDisplay", () => {
    render(
      <CustomDropdown
        value="X"
        options={["Y"]}
        placeholder="Z"
        onChange={() => {}}
        renderDisplay={(value, placeholder) => <span data-testid="custom-display">{value || placeholder}</span>}
      />
    );
    expect(screen.getByTestId("custom-display")).toHaveTextContent("X");
  });

  it("renders custom option via renderOption", () => {
    render(
      <CustomDropdown
        value=""
        options={["A", "B"]}
        placeholder="Choose"
        onChange={() => {}}
        renderOption={(option) => <span data-testid="custom-option">{`option:${option}`}</span>}
      />
    );
    expect(screen.getAllByTestId("custom-option")[0]).toHaveTextContent("option:A");
    expect(screen.getAllByTestId("custom-option")[1]).toHaveTextContent("option:B");
  });

  it("triggers onChange with correct value when item clicked", () => {
    const handleChange = jest.fn();
    render(
      <CustomDropdown
        value=""
        options={["A", "B"]}
        placeholder="Choose"
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getAllByTestId("dropdown-item")[1]);
    expect(handleChange).toHaveBeenCalledWith({ target: { value: "B" } });
  });

  it("does not trigger onChange for disabled option", () => {
    const handleChange = jest.fn();
    render(
      <CustomDropdown
        value=""
        options={[
          { value: "A", label: "Enabled", disabled: false },
          { value: "B", label: "Disabled", disabled: true }
        ]}
        placeholder="Choose"
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getAllByTestId("dropdown-item")[1]);
    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getAllByTestId("dropdown-item")[1]).toHaveClass("opacity-50 cursor-not-allowed");
  });

  it("renders footerItem and divider when provided", () => {
    render(
      <CustomDropdown
        value=""
        options={["A"]}
        placeholder="Choose"
        onChange={() => {}}
        footerItem={<span data-testid="footer">Footer!</span>}
      />
    );
    expect(screen.getByTestId("dropdown-divider")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toHaveTextContent("Footer!");
  });

  it("applies className to dropdown container", () => {
    render(
      <CustomDropdown
        value=""
        options={["A"]}
        placeholder="Choose"
        onChange={() => {}}
        className="my-custom-class"
      />
    );
    expect(screen.getByTestId("dropdown")).toHaveClass("my-custom-class");
  });

});