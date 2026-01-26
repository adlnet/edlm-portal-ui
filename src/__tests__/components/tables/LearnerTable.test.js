import { fireEvent, render, screen } from '@testing-library/react';
import LearnerTable from '@/components/tables/LearnerTable';
import React from 'react';

// Mock icons and pagination
jest.mock('@heroicons/react/16/solid', () => ({
  ChevronDownIcon: (props) => <span title="ChevronDownIcon" {...props} />,
  ChevronUpIcon: (props) => <span title="ChevronUpIcon" {...props} />,
  XMarkIcon: (props) => <span title="XMarkIcon" {...props} />
}));
jest.mock('@heroicons/react/24/outline', () => ({
  MagnifyingGlassIcon: (props) => <span title="MagnifyingGlassIcon" {...props} />,
}));
jest.mock('@/components/buttons/LeaderPagination', () => ({
  Pagination: ({ currentPage, totalPages, onPageChange }) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(Math.max(currentPage - 1, 0))} disabled={currentPage === 0}>
        Prev
      </button>
      <span>
        Page {currentPage + 1} of {totalPages}
      </span>
      <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  )
}));

const mockLearnerData = [
  {
    firstName: 'Jane',
    lastName: 'Doe',
    mostRecentCourse: 'React Basics',
    coursesTaken: 5,
    status: 'In Progress'
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    mostRecentCourse: 'Advanced JavaScript',
    coursesTaken: 7,
    status: 'Completed'
  }
];

describe('LearnerTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and shows learners', () => {
    render(<LearnerTable learnerData={mockLearnerData} />);
    expect(screen.getByText('Learner Overview')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('searches for a learner and updates the table', () => {
    render(<LearnerTable learnerData={mockLearnerData} />);
    const searchInput = screen.getByPlaceholderText('Search for a Learner');
    fireEvent.change(searchInput, { target: { value: 'Jane' } });
    fireEvent.click(screen.getByLabelText('Search'));
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();

    // Search for nothing
    fireEvent.change(screen.getByPlaceholderText('Search for a Learner'), { target: { value: '' } });
    fireEvent.click(screen.getByLabelText('Search'));
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search for a Learner'), { target: { value: 'Nomatch' } });
    fireEvent.click(screen.getByLabelText('Search'));
    expect(screen.getByText('No learners found.')).toBeInTheDocument();
  });

  it('clears the search input', () => {
    render(<LearnerTable learnerData={mockLearnerData} />);
    const searchInput = screen.getByPlaceholderText('Search for a Learner');
    fireEvent.change(searchInput, { target: { value: 'Jane' } });
    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);
    expect(searchInput.value).toBe('');

    // Should reset to show all learners again
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('sorts by last name and first name in both directions', () => {
    render(<LearnerTable learnerData={mockLearnerData} />);

    // Default sortDir is asc, sortKey is lastName
    const lastNameHead = screen.getByText('LAST NAME').closest('th');
    const firstNameHead = screen.getByText('FIRST NAME').closest('th');

    // Click lastNameHead toggles to desc
    fireEvent.click(lastNameHead);

    // Click again toggles to asc
    fireEvent.click(lastNameHead);
    
    // Now set firstName as sortKey
    fireEvent.click(firstNameHead);
    fireEvent.click(firstNameHead);

    // Sorts in both directions without crashing
    expect(firstNameHead).toBeInTheDocument();
  });

  it('shows "No learners found." when none match', () => {
    render(<LearnerTable learnerData={mockLearnerData} />);
    const searchInput = screen.getByPlaceholderText('Search for a Learner');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });
    fireEvent.click(screen.getByLabelText('Search'));
    expect(screen.getByText('No learners found.')).toBeInTheDocument();
  });

  it('sorts with non-string sortable keys gracefully', () => {
    // Provide a learner with a number in a sort field
    const learners = [
      { firstName: 'A', lastName: '3', mostRecentCourse: 'X', coursesTaken: 1, status: 'Completed' },
      { firstName: 'B', lastName: 2, mostRecentCourse: 'Y', coursesTaken: 2, status: 'Completed' }
    ];
    render(<LearnerTable learnerData={learners} />);
    const lastNameHead = screen.getByText('LAST NAME').closest('th');
    fireEvent.click(lastNameHead); // Switch directions
    // Does not crash
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('paginates through results when there are more than max rows', () => {
    // 10 learners, triggers pagination
    const manyLearners = Array.from({length: 10}).map((_, idx) => ({
      firstName: 'Student',
      lastName: String(idx + 1),
      mostRecentCourse: 'Course',
      coursesTaken: idx,
      status: 'Not Started'
    }));
    render(<LearnerTable learnerData={manyLearners} />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('handles paging and displays correct summary', () => {
    // 11 learners, so more than maxRowsToShow (8)
    const learners = Array.from({ length: 11 }).map((_, i) => ({
      firstName: 'F' + i,
      lastName: 'L' + i,
      mostRecentCourse: 'C' + i,
      coursesTaken: i,
      status: 'Not Started'
    }));
    render(<LearnerTable learnerData={learners} />);

    // Page 1: first 8 learners
    expect(screen.getAllByText(/Not Started/)).toHaveLength(8);
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(screen.getByText(/Showing: 1 - 8 of 11/)).toBeInTheDocument();

    // Go to next page
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getAllByText(/Not Started/)).toHaveLength(3);
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    expect(screen.getByText(/Showing: 9 - 11 of 11/)).toBeInTheDocument();

    // Prev/Next button disabled state
    expect(screen.getByText('Prev')).not.toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();

    // Return to first page
    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeDisabled();
  });

  it('handles the jump to page form', () => {
    const manyLearners = Array.from({ length: 16 }).map((_, idx) => ({
      firstName: 'Student',
      lastName: String(idx + 1),
      mostRecentCourse: 'Course',
      coursesTaken: idx,
      status: 'Not Started'
    }));
    render(<LearnerTable learnerData={manyLearners} />);
    const jumpInput = screen.getByRole('spinbutton', { name: '' });
    fireEvent.change(jumpInput, { target: { value: '2' } });
    fireEvent.keyDown(jumpInput, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText(/showing:/i)).toBeInTheDocument();
  });
});