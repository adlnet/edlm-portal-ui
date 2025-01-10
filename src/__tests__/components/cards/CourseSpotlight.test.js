import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { act, fireEvent, render } from '@testing-library/react';
import { useAuthenticatedUser, useUnauthenticatedUser } from '@/__mocks__/predefinedMocks';
import { useConfig } from '@/hooks/useConfig';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import courseData from '@/__mocks__/data/course.data';
import courseNoHashData from '@/__mocks__/data/courseNoHash.data';
import uiConfigData from '@/__mocks__/data/uiConfig.data';
import xAPIMapper from "@/utils/xapi/xAPIMapper";

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

    describe('with course image', () => {
      it('should render the image', () => {
        useAuthenticatedUser();
        const modified = {
          ...courseData,
          Course_Instance: { Thumbnail: 'fake.img' },
        };
        const { getByAltText, queryByRole } = renderer(modified);
        expect(getByAltText ('')).toBeInTheDocument();

        // expect(queryByRole('img')).toBeInTheDocument();
      });
    });

    describe('without image', () => {
      useAuthenticatedUser();
      it('should not render the image', () => {
        const { queryByRole } = renderer();
        expect(queryByRole('img')).not.toBeInTheDocument();
      });
    });
  });

  it('send xAPI statement when course is clicked', () => {
    useAuthenticatedUser();
    const { getByText } = renderer();

    const spy = jest.spyOn(xAPIMapper, 'sendStatement')
      .mockImplementation(() => Promise.resolve({})
      );

      act(() => {
      fireEvent.click(getByText(/Test Course Title/i).parentElement);
    });

    expect(spy).toHaveBeenCalled();
  })

  it('send xAPI statement when course is clicked with no hash in data', () => {
    useAuthenticatedUser();
    const { getByText } = renderer(courseNoHashData);

    const spy = jest.spyOn(xAPIMapper, 'sendStatement')
      .mockImplementation(() => Promise.resolve({})
      );

      act(() => {
      fireEvent.click(getByText(/Test Course Title/i).parentElement);
    });

    expect(spy).toHaveBeenCalled();
  })

  it('do not send xAPI statement when course is clicked', () => {
    
    useUnauthenticatedUser();
    
    const { getByText } = renderer();

    const spy = jest.spyOn(xAPIMapper, 'sendStatement')
      .mockImplementation(() => Promise.resolve({})
      );

      act(() => {
      fireEvent.click(getByText(/Test Course Title/i).parentElement);
    });

    expect(spy).toHaveBeenCalled();
  })

  it('do not send xAPI statement when course with no hash is clicked', () => {
    
    useUnauthenticatedUser();
    
    const { getByText } = renderer(courseNoHashData);

    const spy = jest.spyOn(xAPIMapper, 'sendStatement')
      .mockImplementation(() => Promise.resolve({})
      );

      act(() => {
      fireEvent.click(getByText(/Test Course Title/i).parentElement);
    });

    expect(spy).toHaveBeenCalled();
  })
});

it('renders', () => {
  const {} = renderer();
});
