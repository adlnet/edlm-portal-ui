import { render, screen } from '@testing-library/react';
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import { AuthContext } from '@/__mocks__/authContextMock';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { useAuthenticatedUser, useListMock, useMockInterestLists, useMockUserOwnedLists, useMockConfig } from '@/__mocks__/predefinedMocks';
import Home from '@/pages/learner/index';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';
import { useInterestLists } from '@/hooks/useInterestLists';
import { useUserOwnedLists } from '@/hooks/useUserOwnedLists';
import MockRouter from "next-router-mock";
import singletonRouter from "next/router";

jest.mock('@/hooks/useSpotlightCourses');
jest.mock('@/hooks/useInterestLists');
jest.mock('@/hooks/useUserOwnedLists');

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = ({ options, series, type, width}) => {
    return (
      <div 
        data-testid='mock-chart'
        data-options={JSON.stringify(options)}
        data-series={JSON.stringify(series)}
        data-type={type}
        data-width={width}
      >Chart Component</div>
    );
  };
  return DynamicComponent;
});

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

    expect(getByTestId('mock-chart')).toBeInTheDocument();

    expect(getAllByText('Learning Action').length).toBeGreaterThan(0);

    expect(getAllByText('Learning Summary').length).toBeGreaterThan(0);

    expect(getAllByText('Pick Up Where you Left Off').length).toBeGreaterThan(0);

    expect(getAllByText('Spotlight Courses').length).toBeGreaterThan(0);
  });

  it('should render the "pick up where you left off" table with data', () => {
    useAuthenticatedUser();

    const { getAllByText } = renderer();

    expect(getAllByText('COURSES').length).toBeGreaterThan(0);
    expect(getAllByText('COURSES STATUS').length).toBeGreaterThan(0);
  });

});