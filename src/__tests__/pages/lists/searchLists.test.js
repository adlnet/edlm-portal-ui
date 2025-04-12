import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render } from '@testing-library/react';
import MockRouter from 'next-router-mock';
import SearchLists from '@/pages/learner/lists/searchLists';
import singletonRouter from 'next/router';

import {
  subscribeToListMockFn,
  unsubscribeFromListMockFn,
  useAuthenticatedUser,
  useMockConfig,
  useMockInterestLists,
  useMockInterestListsEmpty,
  useMockInterestListsWith401,
  useMockInterestListsWith403,
  useMockSubscribeToList,
  useMockSubscribedLists,
  useMockSubscribedListsEmpty,
  useMockUnsubscribeFromList,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import { useSubscribeToList } from '@/hooks/useSubscribeToList';

beforeEach(() => {
  useMockConfig();
});

const renderer = () => {
  MockRouter.setCurrentUrl('/lists/searchLists');
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <SearchLists />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};
describe('Search Lists', () => {
  it('should render the title', () => {
    useAuthenticatedUser();
    useMockInterestListsEmpty();
    useMockSubscribedListsEmpty();
    useMockSubscribeToList();
    useMockUnsubscribeFromList();
    const { getByText } = renderer();
    expect(getByText(/No search results found/i)).toBeInTheDocument();
  });

  it('should navigate user to "/" when not authenticated', () => {
    useUnauthenticatedUser();
    useMockInterestListsEmpty();
    useMockSubscribedListsEmpty();
    useMockSubscribeToList();
    useMockUnsubscribeFromList();
    const { getByText } = renderer();
    expect(singletonRouter).toMatchObject({
      asPath: '/',
    });
  });
  
  it('should render the list of interest lists', () => {
    useAuthenticatedUser();
    useMockInterestLists();
    useMockSubscribedListsEmpty();
    useMockSubscribeToList();
    useMockUnsubscribeFromList();
    const { getByText, queryAllByText } = renderer();
    expect(getByText('Test List 1')).toBeInTheDocument();
  });


  it('should render the next and previous buttons', () => {
    useAuthenticatedUser();
    useMockInterestLists();
    useMockSubscribedListsEmpty();
    useMockSubscribeToList();
    useMockUnsubscribeFromList();
    const { getByText } = renderer();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Previous')).toBeDisabled();
  });

  it('should navigate to next page', () => {
    useAuthenticatedUser();
    useMockInterestLists();
    useMockSubscribedListsEmpty();
    useMockSubscribeToList();
    useMockUnsubscribeFromList();
    const { getByText } = renderer();
    act(() => {
      fireEvent.click(getByText('Next'));
    });

    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Previous')).toBeEnabled();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Next')).toBeDisabled();
  });

  it('should navigate to previous page', () => {
    useAuthenticatedUser();
    useMockInterestLists();
    useMockSubscribedListsEmpty();
    useMockSubscribeToList();
    useMockUnsubscribeFromList();
    const { getByText } = renderer();
    act(() => {
      fireEvent.click(getByText('Next'));
    });
    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Previous')).toBeEnabled();
    act(() => {
      fireEvent.click(getByText('Previous'));
    });
    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Previous')).toBeDisabled();
  });

  it('should only show results that contain the search term', () => {
    useAuthenticatedUser();
    useMockInterestLists();
    useMockSubscribedListsEmpty();
    useMockSubscribeToList();
    useMockUnsubscribeFromList();
    const { getByPlaceholderText, queryAllByText } = renderer();
    act(() => {
      fireEvent.change(getByPlaceholderText('Search Public Collections'), {
        target: { value: '11' },
      });
    });
    expect(queryAllByText(/Test List/i)).toHaveLength(9);
  });

  it('should navigate user to list when clicked', () => {
    useAuthenticatedUser();
    useMockInterestLists();
    useMockSubscribedListsEmpty();
    useMockSubscribeToList();
    useMockUnsubscribeFromList();
    const { getByText } = renderer();
    act(() => {
      fireEvent.click(getByText('Test List 1'));
    });

    expect(singletonRouter).toMatchObject({
      asPath: '/learner/lists/1?previousPage=Search+Collections',
    });
  });
});
