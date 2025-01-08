import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render } from '@testing-library/react';
import SearchCompetencies from '@/components/SearchCompetencies';
import competencyData from '@/__mocks__/data/competency.data';

console.log = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

const setParams = jest.fn();
const useStateMock = (params) => [params, setParams];
jest.spyOn(React, 'useState').mockImplementation(useStateMock)

const renderer = () => {
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <SearchCompetencies
          Competencies={competencyData.Competencies}
          params={useStateMock}
          setParams={setParams}
        />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

const rendererEmpty = () => {
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <SearchCompetencies
          Competencies={[]}
          params={useStateMock}
          setParams={setParams}
        />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe('Search Competencies Page', () => {
    it ('should render the competencies on the page', () =>{
        const screen = renderer();
        expect(screen.getByText('Competency #1: Operating Environment and System Design'))
    });
    it ('should render nothing if competencies are empty', () =>{
      const screen = rendererEmpty();
  });
})

