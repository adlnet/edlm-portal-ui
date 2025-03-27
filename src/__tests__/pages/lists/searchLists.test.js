import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render } from '@testing-library/react';
import MockRouter from 'next-router-mock';
import SearchLists from '@/pages/edlm-portal/learner/lists/searchLists';
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
    expect(getByText(/Search Public Collections/i)).toBeInTheDocument();
  });

  it('should navigate user to "/" when not authenticated', () => {
    useUnauthenticatedUser();
    useMockInterestListsEmpty();
    useMockSubscribedListsEmpty();
    useMockSubscribeToList();
    useMockUnsubscribeFromList();
    const { getByText } = renderer();
    expect(singletonRouter).toMatchObject({
      asPath: '/edlm-portal',
    });
  });
  
});
