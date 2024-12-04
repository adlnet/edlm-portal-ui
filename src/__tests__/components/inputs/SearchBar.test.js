import { act, fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../../../components/inputs/SearchBar';

describe('SearchBar', () => {
  it('should render', () => {
    render(
      <SearchBar
        parameters={{ keyword: 'test' }}
        onClick={() => {}}
        onChange={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Search for Learning Content').value).toBe(
      'test'
    );
  });

  it('should execute on click fn', () => {
    console.log = jest.fn();

    render(
      <SearchBar
        parameters={{ keyword: 'test' }}
        onClick={() => console.log('tada')}
        onChange={() => {}}
      />
    );

    act(() => {
      fireEvent.click(screen.getByTitle('Search'));
    });

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should execute on click, on enter', () => {
    console.log = jest.fn();

    render(
      <SearchBar
        parameters={{ keyword: 'test' }}
        onClick={() => console.log('tada')}
        onChange={() => {}}
      />
    );

    act(() => {
      fireEvent.keyPress(screen.getByPlaceholderText('Search for Learning Content'), {
        charCode: '13',
      });
      fireEvent.submit(screen.getByPlaceholderText('Search for Learning Content'));
    });
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should not execute on click, on any other key', () => {
    render(
      <SearchBar
        parameters={{ keyword: 'test' }}
        onClick={() => console.log('tada')}
        onChange={() => {}}
      />
    );

    act(() => {
      fireEvent.keyPress(screen.getByPlaceholderText('Search for Learning Content'), {});
    });
  });

});
