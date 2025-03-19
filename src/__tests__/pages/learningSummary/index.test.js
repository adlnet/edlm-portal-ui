import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import { QueryClientWrapper } from "@/__mocks__/queryClientMock";
import { act, render, screen } from "@testing-library/react";
import {
  useAuthenticatedUser,
  useUnauthenticatedUser,
} from "@/__mocks__/predefinedMocks";
import LearningSummary from "@/pages/edlm-portal/learner/learningSummary/index";
import MockRouter from "next-router-mock";
import singletonRouter from "next/router";

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
  MockRouter.setCurrentUrl("/edlm-portal/learner/learningSummary");
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <LearningSummary />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe("Learning Summary Page", () => {
  it("should render the page with chart", () => {
    useAuthenticatedUser();
    const { getByTestId, getAllByText } = renderer();
    expect(getAllByText('Learning Summary').length).toBeGreaterThan(0);
    expect(getByTestId('mock-chart')).toBeInTheDocument();
  });

  it("should navigate the user to '/' if not authenticated", () => {
    useUnauthenticatedUser();
    renderer();
    expect(singletonRouter).toMatchObject({ asPath: "/" });
  });

  it('should show summary stats', () => {
    useAuthenticatedUser();
    const { getAllByText} = renderer();
    const mockSummaryData = [
      { name: 'Courses Completed', value: 43 },
      { name: 'Upcoming Courses', value: 2 },
      { name: 'Competencies Worked On', value: 11 },
      { name: 'In Progress Courses', value: 3 }
    ];
    
    mockSummaryData.forEach(({ name, value }) => {
      expect(getAllByText(name).length).toBeGreaterThan(0);
      expect(getAllByText(value).length).toBeGreaterThan(0);
    });
  });

  it('should show the competency table', () => {
    useAuthenticatedUser();
    const{ container } = renderer();
    const tableHeaders = container.querySelectorAll('th');
    expect(tableHeaders[0]).toHaveTextContent('Competency');
    expect(tableHeaders[1]).toHaveTextContent('NUMBER OF COURSES PER');
    expect(tableHeaders[2]).toHaveTextContent('NUMBER OF HOURS PER');
  });

  it('should show both in progress and completed courses', () => {
    useAuthenticatedUser();
    const { getAllByText } = renderer();
    expect(getAllByText('In Progress Courses').length).toBeGreaterThan(0);
    expect(getAllByText('Completed Courses').length).toBeGreaterThan(0);
  });

  it('should show all learning phases', () => {
    useAuthenticatedUser();
    const { getByText } = renderer();
    const phases = ['Phase I (30 Days)', 'Phase II (60 Days)', 'Phase III (90 Days)'];

    phases.forEach(phase => {
      expect(getByText(phase)).toBeInTheDocument();
    });
  });
});