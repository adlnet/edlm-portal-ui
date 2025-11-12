import { act, renderHook } from '@testing-library/react';
import { useSortableTable } from '@/hooks/useSortableTable';

describe('useSortableTable', () => {
  const mockData = [
    { id: 1, name: 'Charlie', age: 33, date: '2022-01-05' },
    { id: 2, name: 'Alan', age: 42, date: '2022-04-22' },
    { id: 3, name: null, age: 28, date: '2021-08-16' },
    { id: 4, name: 'Beatrice', age: null, date: '2021-12-31' },
  ];

  it('initializes tableData with input data', () => {
    const { result } = renderHook(() => useSortableTable(mockData));
    const [tableData] = result.current;
    expect(tableData).toEqual(mockData);
  });

  it('updates tableData when data prop changes', () => {
    const { result, rerender } = renderHook(
      ({ data }) => useSortableTable(data),
      { initialProps: { data: mockData } }
    );
    expect(result.current[0]).toEqual(mockData);

    const newData = [
      { id: 10, name: 'Zed', age: 60, date: '2024-01-01' },
    ];
    rerender({ data: newData });
    expect(result.current[0]).toEqual(newData);
  });

  it('sorts by a string field ascending', () => {
    const { result } = renderHook(() => useSortableTable(mockData));
    const [, handleSorting] = result.current;

    act(() => {
      handleSorting('name', 'asc');
    });
    const [sorted] = result.current;

    // nulls should be at the end
    expect(sorted.map(r => r.name)).toEqual(['Alan', 'Beatrice', 'Charlie', null]);
  });

  it('sorts by a numeric field ascending', () => {
    const { result } = renderHook(() => useSortableTable(mockData));
    const [, handleSorting] = result.current;

    act(() => {
      handleSorting('age', 'asc');
    });
    const [sorted] = result.current;

    // null values should be at the end
    expect(sorted.map(r => r.age)).toEqual([28, 33, 42, null]);
  });

  it('sorts by date ascending', () => {
    const { result } = renderHook(() => useSortableTable(mockData));
    const [, handleSorting] = result.current;

    act(() => {
      handleSorting('date', 'asc');
    });
    const [sorted] = result.current;
    expect(sorted.map(r => r.date)).toEqual(['2021-08-16', '2021-12-31', '2022-01-05', '2022-04-22']);
  });

  it('sorts by date descending', () => {
    const { result } = renderHook(() => useSortableTable(mockData));
    const [, handleSorting] = result.current;

    act(() => {
      handleSorting('date', 'desc');
    });
    const [sorted] = result.current;
    expect(sorted.map(r => r.date)).toEqual(['2022-04-22', '2022-01-05', '2021-12-31', '2021-08-16']);
  });

  it('does not sort if sortField is not provided', () => {
    const { result } = renderHook(() => useSortableTable(mockData));
    const [, handleSorting] = result.current;

    act(() => {
      handleSorting(undefined, 'asc');
    });
    const [notSorted] = result.current;
    expect(notSorted).toEqual(mockData);
  });
});