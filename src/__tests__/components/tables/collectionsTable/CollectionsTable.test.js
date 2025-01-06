import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render, act} from '@testing-library/react';
import CollectionTable from '@/components/tables/collectionsTable/CollectionTable';
import collectionsColumnsData from '@/__mocks__/data/collectionsColumns.data';
import collectionsTableData from '@/__mocks__/data/collectionsTable.data';
import collectionsTableEmptyData from '@/__mocks__/data/collectionsTableEmpty.data';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <CollectionTable data={collectionsTableData} columns={collectionsColumnsData} edit={true} rowsPerPage={2} />
    </QueryClientWrapper>
  );
};

const emptyRenderer = () => {
    return render(
      <QueryClientWrapper>
        <CollectionTable data={collectionsTableEmptyData} columns={collectionsColumnsData} edit={false} rowsPerPage={2} />
      </QueryClientWrapper>
    )
}

describe('Collections Table Tests', () => {
    it('Tests that the table renders', () => {
        const screen = renderer()
        expect(screen.findByText('TITLE'))
        expect(screen.findByText('DURATION'))
        expect(screen.findByText('Instructor 2'))
    })

    it('Tests that clicking sort works', () => {
        const screen = renderer()
        
        const sortButtons = screen.getAllByTitle('sort')

        act(() =>{
            fireEvent.click(sortButtons[0]);
        })
        act(() =>{
            fireEvent.click(sortButtons[0]);
        })
    })

    it('Test clicking pages on the footer', () => {
        const screen = renderer()
        const pageButtons = screen.getAllByTestId('FooterButton')
        act(() => {
            fireEvent.click(pageButtons[0]);
        })
        act(() => {
            fireEvent.click(pageButtons[2]);
        })
        act(() => {
            fireEvent.click(pageButtons[0]);
        })
        act(() => {
            fireEvent.click(pageButtons[4]);
        })
    })

    it('Test rendering an empty table', () => {
        const screen = emptyRenderer()
        expect(screen.findByText('TITLE'))
        expect(screen.findByText('DURATION'))
        expect(screen.queryAllByText("——").length).toBe(8);
    }) 
});