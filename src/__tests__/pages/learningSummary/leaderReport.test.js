import { render, screen } from '@testing-library/react';
import LeaderReport from '@/pages/edlm-portal/learner/learningSummary/leaderReport';
import React from 'react';

// --- MOCKS ---

jest.mock('@/utils/cleaning', () => ({
  removeHTML: (s) => s,
}));

jest.mock('@/hooks/useTopSavedCourses', () => ({
  useTopSavedCourses: () => ({
    data: [
      { metadata_key_hash: 'a1', title: 'Course A', num_saved: 22 },
      { metadata_key_hash: 'b2', title: 'Course B', num_saved: 11 },
    ]
  }),
}));

jest.mock('@/hooks/useTopSubscribedCollections', () => ({
  useTopSubscribedCollections: () => ({
    data: [
      { id: 11, name: 'Coll Alpha', num_subscribers: 42 },
      { id: 22, name: 'Coll Beta', num_subscribers: 36 }
    ]
  }),
}));

jest.mock('@/components/layouts/DefaultLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="DefaultLayout">{children}</div>
}));

jest.mock('@/components/tables/LearnerTable', () => ({
  __esModule: true,
  default: ({ learnerData }) => (
    <div data-testid="LearnerTable">
      {learnerData.length} learners in table.
    </div>
  ),
}));

jest.mock('@heroicons/react/24/outline', () => ({
  ArrowLongDownIcon:   (props) => <span data-testid="ArrowLongDownIcon" {...props} />,
  ArrowLongUpIcon:     (props) => <span data-testid="ArrowLongUpIcon" {...props} />,
  ArrowUpOnSquareStackIcon: (props) => <span data-testid="ArrowUpOnSquareStackIcon" {...props} />,
  BookOpenIcon:        (props) => <span data-testid="BookOpenIcon" {...props} />,
  BookmarkIcon:        (props) => <span data-testid="BookmarkIcon" {...props} />,
  BookmarkSquareIcon:  (props) => <span data-testid="BookmarkSquareIcon" {...props} />,
  EyeIcon:             (props) => <span data-testid="EyeIcon" {...props} />,
  UserIcon:            (props) => <span data-testid="UserIcon" {...props} />
}));

// --- TESTS ---

describe('LeaderReport page', () => {
  it('renders layout, title, and all main sections', () => {
    render(<LeaderReport />);
    expect(screen.getByTestId('DefaultLayout')).toBeInTheDocument();
    expect(screen.getByText(/Leader's Report/)).toBeInTheDocument();
    expect(screen.getByTestId('LearnerTable')).toHaveTextContent(/learners in table/);
    expect(screen.getByText('Learner Engagement')).toBeInTheDocument();
    expect(screen.getByText('Top 5 Most-Viewed Courses')).toBeInTheDocument();
    expect(screen.getByText('Popular Collections')).toBeInTheDocument();
    expect(screen.getByText('Popular Saved Courses')).toBeInTheDocument();
    expect(screen.getByText('Top Shared Courses')).toBeInTheDocument();
  });

  it('shows all engagement stats, including change icons (positive and negative)', () => {
    render(<LeaderReport />);

    // Total learners
    expect(screen.getByText('1247')).toBeInTheDocument();
    expect(screen.getAllByTestId('UserIcon').length).toBeGreaterThan(0);

    // Courses in session, positive change
    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.getAllByTestId('BookOpenIcon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('ArrowLongUpIcon').length).toBeGreaterThan(0);

    // Collections created, negative change
    expect(screen.getByText('56')).toBeInTheDocument();
    expect(screen.getAllByTestId('BookmarkIcon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('ArrowLongDownIcon').length).toBeGreaterThan(0);

    // Change summary exists for all
    expect(screen.getByText(/12% from last month/)).toBeInTheDocument();
    expect(screen.getByText(/8% from last month/)).toBeInTheDocument();
    expect(screen.getByText(/3% from last month/)).toBeInTheDocument();
  });

  it('renders most viewed, top shared, popular courses/collections correctly', () => {
    render(<LeaderReport />);

    // Most viewed (static)
    expect(screen.getByText('Advanced Combat Systems Analysis')).toBeInTheDocument();
    expect(screen.getByText(/487 Views/)).toBeInTheDocument();

    // Top shared (static)
    expect(screen.getByText('Combat Systems Fundamentals')).toBeInTheDocument();
    expect(screen.getByText(/Shared 156 times/)).toBeInTheDocument();

    // Popular collections (dynamic from hook mock)
    expect(screen.getByText('Coll Alpha')).toBeInTheDocument();
    expect(screen.getByText(/42 Subscribers/)).toBeInTheDocument();
    expect(screen.getByText('Coll Beta')).toBeInTheDocument();

    // Popular saved courses (dynamic from hook mock)
    expect(screen.getByText('Course A')).toBeInTheDocument();
    expect(screen.getByText('Course B')).toBeInTheDocument();
    expect(screen.getByText(/22 Saves/)).toBeInTheDocument();
    expect(screen.getByText(/11 Saves/)).toBeInTheDocument();
  });

  it('renders all icons for visual sections', () => {
    render(<LeaderReport />);
    expect(screen.getAllByTestId('UserIcon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('BookOpenIcon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('BookmarkIcon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('BookmarkSquareIcon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('ArrowUpOnSquareStackIcon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('EyeIcon').length).toBeGreaterThan(0);
  });

  it('handles empty popular courses/collections gracefully', () => {
    // Update hooks to return empty arrays
    jest.doMock('@/hooks/useTopSavedCourses', () => ({
      useTopSavedCourses: () => ({ data: [] }),
    }));
    jest.doMock('@/hooks/useTopSubscribedCollections', () => ({
      useTopSubscribedCollections: () => ({ data: [] }),
    }));
    
    // Avoid jest cache issues
    const { default: EmptyLeaderReport } = require('@/pages/edlm-portal/learner/learningSummary/leaderReport');
    render(<EmptyLeaderReport />);
    expect(screen.getByText('Popular Collections')).toBeInTheDocument();
    expect(screen.getByText('Popular Saved Courses')).toBeInTheDocument();
  });
});