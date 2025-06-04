import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { act, fireEvent, render } from '@testing-library/react';
import { useAuthenticatedUser, useUnauthenticatedUser } from '@/__mocks__/predefinedMocks';
import { useConfig } from '@/hooks/useConfig';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import courseData from '@/__mocks__/data/course.data';
import courseNoHashData from '@/__mocks__/data/courseNoHash.data';
import uiConfigData from '@/__mocks__/data/uiConfig.data';

// jest mocks
jest.mock('next/dist/client/router', () => require('next-router-mock'));
jest.mock('@/hooks/useConfig', () => ({
  useConfig: jest.fn(),
}));

// mock auth
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const renderer = (data = courseData) => {
  return render(
    <MemoryRouterProvider url='/'>
      <CourseSpotlight course={data} />
    </MemoryRouterProvider>
  );
};

beforeEach(() => {
  useConfig.mockImplementation(() => ({
    data: uiConfigData,
  }));
});

describe('Course Spotlight', () => {
  describe('with data', () => {
    it('should render the course title', () => {
      useAuthenticatedUser();
      const { queryByText } = renderer();
      expect(queryByText(/test course title/i)).toBeInTheDocument();
    });

    it('should render the course provider name', () => {
      useAuthenticatedUser();
      const { queryByText } = renderer();
      expect(queryByText(/provider name/i)).toBeInTheDocument();
    });

    describe('without image', () => {
      useAuthenticatedUser();
      it('should not render the image', () => {
        const { queryByRole } = renderer();
        expect(queryByRole('img')).not.toBeInTheDocument();
      });
    });
  });

});

it('renders', () => {
  const {} = renderer();
});
