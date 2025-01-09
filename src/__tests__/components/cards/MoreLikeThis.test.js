import { act, render, screen, fireEvent } from '@testing-library/react';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import MoreLikeThis from '@/components/cards/MoreLikeThis';
import { useAuth } from '@/contexts/AuthContext';
import { useMoreCoursesLikeThis } from '@/hooks/useMoreCoursesLikeThis';
import { useConfig } from '@/hooks/useConfig';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';
import courseData from '@/__mocks__/data/course.data';

const mockCourse = {
  meta: courseData.meta,
  Course: courseData.Course
};

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <MoreLikeThis course={mockCourse} />
    </QueryClientWrapper>
  );
};

const mockPush = jest.fn();

jest.mock('@/contexts/AuthContext');
jest.mock('@/hooks/useMoreCoursesLikeThis');
jest.mock('@/hooks/useConfig');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MoreLikeThis Card', () => {
  const mockCourse = {
    meta: courseData.meta,
    Course: courseData.Course
  };

  const mockUser = {
    user: { user: { email: 'test@email.com' } },
  };

  beforeEach(() => {
    useAuth.mockReturnValue({ user: mockUser });
    useMoreCoursesLikeThis.mockReturnValue({ data: { hits: [mockCourse] }, isLoading: false });
    useConfig.mockReturnValue({ data: { course_information: { course_title: 'Test Title', course_provider: 'Test Provider' } }, isSuccess: true });
    useRouter.mockReturnValue({ push: mockPush });
  });

  it('renders loading state', () => {
    useMoreCoursesLikeThis.mockReturnValueOnce({ data: null, isLoading: true });
    render(<MoreLikeThis course={mockCourse} />);
    expect(screen.getByText((content, element) => element.className.includes('animate-pulse'))).toBeInTheDocument();
  });

  it('renders course card with title and provider', () => {
    render(<MoreLikeThis course={mockCourse} />);
    expect(screen.getByText('Test Course Title')).toBeInTheDocument();
    expect(screen.getByText('Provider Name')).toBeInTheDocument();
  });
  

  it('renders no data if no data', () => {
    useMoreCoursesLikeThis.mockReturnValueOnce({ data: { hits: [] }, isLoading: false });
    render(<MoreLikeThis course={mockCourse} />);
    expect(screen.queryByText('Test Course Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Provider Name')).not.toBeInTheDocument();
  });

  it('navigates to course page on card click', () => {
    render(
      <QueryClientWrapper>
        <MoreLikeThis course={mockCourse} />
      </QueryClientWrapper>
    )
    const { getByRole } = render(<MoreLikeThis course={mockCourse} />);
    const cards = screen.getAllByRole('button', { hidden: true });
    const card = cards[0];
    fireEvent.click(card);
    expect(mockPush).toHaveBeenCalledWith(`/learner/course/${mockCourse.meta.metadata_key_hash}`);
  });
  
});