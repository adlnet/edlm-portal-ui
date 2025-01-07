import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import {
  useAuthenticatedUser,
  useMockConfig,
  useMockDeleteSaveSearch,
} from '@/__mocks__/predefinedMocks';
import { fireEvent, render, act} from '@testing-library/react';
import SavedSearchTable from '@/components/tables/collectionsTable/SavedSearchTable';
import savedColumnsData from '@/__mocks__/data/savedColumns.data';
import savedSearchData from '@/__mocks__/data/savedSearchData.data';

// renderer
const renderer = () => {
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <SavedSearchTable data={savedSearchData} columns={savedColumnsData} />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

beforeEach(() => {
    useMockConfig();
    useMockDeleteSaveSearch();
});

const empty = [{'name': null, 'query': null}]

const rendererNoData = () => {
    return render(
      <MemoryRouterProvider>
        <QueryClientWrapper>
          <SavedSearchTable data={empty} columns={savedColumnsData} />
        </QueryClientWrapper>
      </MemoryRouterProvider>
    );
};

describe ('Saved Search Table Testing', () =>{
    it('should render the table', () => {
        useAuthenticatedUser();
        const screen = renderer();
        expect(screen.getByText('SEARCH TITLE'))
        expect(screen.getByText('test 3'))
        expect(screen.getByText('AI'))
    })
    it('should render the empty', () => {
        useAuthenticatedUser();
        const screen = rendererNoData();
        expect(screen.getByText('SEARCH TITLE'))
        expect(screen.queryAllByText("——").length).toBe(2);
    })
    it('delete button should react properly', () => {
        useAuthenticatedUser();
        const screen = renderer();
        const deleteButtons = screen.getAllByTitle('delete')

        act(() => {
            fireEvent.click(deleteButtons[0])
        })
    })
})
  