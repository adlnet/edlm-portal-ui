import { Pagination } from "@/components/buttons/LeaderPagination";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

// Mocks for Heroicons
jest.mock('@heroicons/react/24/outline', () => ({
  ChevronLeftIcon: (props) => <svg data-testid="chevron-left" {...props}/>,
  ChevronRightIcon: (props) => <svg data-testid="chevron-right" {...props}/>,
}));

describe("Pagination", () => {
  let onPageChange;

  beforeEach(() => {
    onPageChange = jest.fn();
  });

  it("renders all pages directly if totalPages <= 4", () => {
    render(<Pagination currentPage={0} totalPages={4} onPageChange={onPageChange} />);
    [1, 2, 3, 4].forEach(p => {
      expect(screen.getByText(String(p))).toBeInTheDocument();
    });
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it("disables previous button if on first page", () => {
    render(<Pagination currentPage={0} totalPages={5} onPageChange={onPageChange} />);
    const prev = screen.getByLabelText("Previous page");
    expect(prev).toBeDisabled();
  });

  it("disables next button if on last page", () => {
    render(<Pagination currentPage={4} totalPages={5} onPageChange={onPageChange} />);
    const next = screen.getByLabelText("Next page");
    expect(next).toBeDisabled();
  });

  it("calls onPageChange with correct values on previous/next", () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("renders ellipsis as expected - at start (currentPage 0)", () => {
    render(<Pagination currentPage={0} totalPages={10} onPageChange={onPageChange} />);

    // Should have "1 2 3 ... 10"
    [1, 2, 3, 10].forEach(p => expect(screen.getByText(String(p))).toBeInTheDocument());
    expect(screen.getAllByText('...')).toHaveLength(1);
  });

  it("renders ellipsis as expected - at end (currentPage last)", () => {
    render(<Pagination currentPage={9} totalPages={10} onPageChange={onPageChange} />);

    // Should have "1 ... 8 9 10"
    [1, 8, 9, 10].forEach(p => expect(screen.getByText(String(p))).toBeInTheDocument());
    expect(screen.getAllByText('...')).toHaveLength(1);
  });

  it("renders ellipsis as expected - in the middle", () => {
    render(<Pagination currentPage={4} totalPages={10} onPageChange={onPageChange} />);

    // Should be "1 ... 4 5 ... 10"
    [1, 4, 5, 10].forEach(p => expect(screen.getByText(String(p))).toBeInTheDocument());
    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  it("clicking number buttons calls onPageChange with the correct index", () => {
    render(<Pagination currentPage={0} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(2); // page numbers are 1-based, index is 0-based
  });

  it("all aria-labels and heroicons are present", () => {
    render(<Pagination currentPage={2} totalPages={7} onPageChange={onPageChange} />);
    expect(screen.getByTestId("chevron-left")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-right")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });

  it("renders as expected when in lowest 'middle' state (currentPage = 2, totalPages = 8)", () => {
    render(<Pagination currentPage={2} totalPages={8} onPageChange={onPageChange} />);

    // Should be [1,2,3,...,8]
    [1,2,3,8].forEach(p => expect(screen.getByText(String(p))).toBeInTheDocument());
    expect(screen.getAllByText('...')).toHaveLength(1);
  });

  it("renders as expected when in highest 'middle' state (currentPage = 5, totalPages = 8)", () => {
    render(<Pagination currentPage={5} totalPages={8} onPageChange={onPageChange} />);

    // Should be [1,...,5,6,8]
    [1,5,6,8].forEach(p => expect(screen.getByText(String(p))).toBeInTheDocument());
    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  it("ellipsis div has correct display", () => {
    render(<Pagination currentPage={4} totalPages={10} onPageChange={onPageChange} />);

    // Should render as a div, not button, with pointer-events-none
    const ellipsisNodes = screen.getAllByText('...');
    ellipsisNodes.forEach(el => {
      expect(el.tagName).toBe('DIV');
      expect(el.className).toMatch(/pointer-events-none/);
    });
  });

  it("if only one page, disables navigation buttons", () => {
    render(<Pagination currentPage={0} totalPages={1} onPageChange={onPageChange} />);
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
    expect(screen.getByLabelText("Next page")).toBeDisabled();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});