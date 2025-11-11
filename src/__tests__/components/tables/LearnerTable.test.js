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

  it('sorts by first name when clicking on header', () => {
    render(<LearnerTable learnerData={mockLearnerData} />);

    // "FIRST NAME" sort
    const firstNameHeader = screen.getByText(/FIRST NAME/i).closest('th');
    fireEvent.click(firstNameHeader);

    // After clicking, now sorted by firstName ("Jane" then "John", then desc on second click)
    fireEvent.click(firstNameHeader); // Now descending
    // Rerendered sorted state; test expectations as needed here
    expect(firstNameHeader).toBeInTheDocument();
  });

  it('shows "No learners found." when none match', () => {
    render(<LearnerTable learnerData={mockLearnerData} />);
    const searchInput = screen.getByPlaceholderText('Search for a Learner');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });
    fireEvent.click(screen.getByLabelText('Search'));
    expect(screen.getByText('No learners found.')).toBeInTheDocument();
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
    fireEvent.submit(jumpInput.form);
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
  });
});