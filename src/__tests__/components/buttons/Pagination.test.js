import { act, fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from '@/components/buttons/Pagination';

describe('Pagination', () => {
  const testMock = jest.fn();
  it('should render the pagination component', () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={2}
        onChangePage={testMock}
        handleSpecificPage={testMock}
      />
    );

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    });

    expect(testMock).toHaveBeenCalledTimes(1);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '1' }));
    });

    expect(testMock).toHaveBeenCalledTimes(2);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    });

    expect(testMock).toHaveBeenCalledTimes(3);


    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();


    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();

    expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();

  });

  it('should show previous buttons as disabled when on first page', () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={1}
        onChangePage={testMock}
        handleSpecificPage={testMock}
      />
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();

  });

  it('should show next buttons as disabled when on last page', () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={10}
        onChangePage={testMock}
        handleSpecificPage={testMock}
      />
    );

    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();

  });
});
