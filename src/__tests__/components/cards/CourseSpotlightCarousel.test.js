import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { act, fireEvent, render } from '@testing-library/react';
import { useConfig } from '@/hooks/useConfig';
import courseData from '@/__mocks__/data/course.data';
import uiConfigData from '@/__mocks__/data/uiConfig.data';
import xAPIMapper from "@/utils/xapi/xAPIMapper";
import { useAuthenticatedUser, useUnauthenticatedUser } from '@/__mocks__/predefinedMocks';
import CourseSpotlight from '@/components/cards/CourseSpotlightCarousel';

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


});
})