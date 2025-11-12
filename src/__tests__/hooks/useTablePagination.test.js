import { act, renderHook } from '@testing-library/react';
import { useTablePagination } from '@/hooks/useTablePagination';

describe('useTablePagination', () => {
  const setPageMock = jest.fn();
  const tableDataMock = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize pageData to the first page', () => {
    const rowsPerPage = 2;
    const { result } = renderHook(() =>
      useTablePagination(setPageMock, tableDataMock, rowsPerPage)
    );

    const [pageData] = result.current;
    expect(pageData).toEqual(['row1', 'row2']);
    
    // should also call setPage(1) on mount
    expect(setPageMock).toHaveBeenCalledWith(1);
  });

  it('should update pageData on page change', () => {
    const rowsPerPage = 3;
    const { result } = renderHook(() =>
      useTablePagination(setPageMock, tableDataMock, rowsPerPage)
    );

    const [, handlePageChange] = result.current;

    act(() => {
      handlePageChange(2);
    });
    const [pageDataAfterChange] = result.current;
    expect(pageDataAfterChange).toEqual(['row4', 'row5', 'row6']);
  });

  it('should reset pageData and setPage when tableData changes', () => {
    let data = ['rowA', 'rowB', 'rowC', 'rowD'];
    const rowsPerPage = 2;
    const { result, rerender } = renderHook(
      ({ d }) => useTablePagination(setPageMock, d, rowsPerPage),
      { initialProps: { d: data } }
    );

    // initial state
    expect(result.current[0]).toEqual(['rowA', 'rowB']);
    expect(setPageMock).toHaveBeenCalledWith(1);

    // update tableData
    data = ['rowX', 'rowY', 'rowZ', 'rowW'];
    rerender({ d: data });

    // after update
    expect(result.current[0]).toEqual(['rowX', 'rowY']);
    expect(setPageMock).toHaveBeenCalledTimes(2); // called again on update
  });
});