import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render } from '@testing-library/react';
import { useAuthenticatedUser, useMockConfig } from '@/__mocks__/predefinedMocks';
import { useInterestLists } from '@/hooks/useInterestLists';
import { useUserOwnedLists } from '@/hooks/useUserOwnedLists';
import Home from '@/pages/edlm-portal/learner/index';
import MockRouter from "next-router-mock";
import useSpotlightCourses from '@/hooks/useSpotlightCourses';

jest.mock('@/hooks/useSpotlightCourses');
jest.mock('@/hooks/useInterestLists');
jest.mock('@/hooks/useUserOwnedLists');

const renderer = () => {
  MockRouter.setCurrentUrl("/learner");
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Home />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe('Home Page', () => {

  beforeEach(() => {
    useMockConfig();
    useInterestLists.mockImplementation(() => ({
      data: [{ name: 'Test List', id: 1 }],
    }));
    useUserOwnedLists.mockImplementation(() => ({
      data: [{ name: 'Test List', id: 2 }],
    }));
    useSpotlightCourses.mockImplementation(() => ({
      data: [{ title: 'Test Course', meta: { id: '777'} }],
      isSuccess: true,
      isError: false,
    }));
  });

  it('should render the page with learning action, summary, pickup where you left off and spotlifght courses ', () => {
    useAuthenticatedUser();
    const { getByTestId, getAllByText } = renderer();

    expect(getAllByText('Learning Action').length).toBeGreaterThan(0);

    expect(getAllByText('Learning Summary').length).toBeGreaterThan(0);

    expect(getAllByText('My Courses').length).toBeGreaterThan(0);

    expect(getAllByText('Spotlight Courses').length).toBeGreaterThan(0);
  });

});
