import { act, fireEvent, render } from '@testing-library/react';

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import {
  unsubscribeFromListMockFn,
  useAuthenticatedUser,
  useMockConfig,
  useMockSubscribeToList,
  useMockSubscribedLists,
  useMockSubscribedListsEmpty,
  useMockSubscribedListsWith401,
  useMockSubscribedListsWith403,
  useMockUnsubscribeFromList,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import MockRouter from 'next-router-mock';
import Subscribed from '@/pages/edlm-portal/learner/lists/subscribed';
import singletonRouter from 'next/router';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

// mocks
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/hooks/useUnsubscribeFromList', () => ({
  useUnsubscribeFromList: jest.fn(),
}));

jest.mock('@/hooks/useSubscribedLists', () => ({
  useSubscribedLists: jest.fn(),
}));

beforeEach(() => {
  useMockConfig();
  useMockUnsubscribeFromList();
  useMockSubscribeToList();
});

const renderer = () => {
  MockRouter.setCurrentUrl('/lists/subscribed');
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Subscribed />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe('User Subscribed Lists', () => {
  it('should render the page', () => {
    useAuthenticatedUser();
    useMockSubscribedLists();
    const { getAllByText } = renderer();
    expect(getAllByText('My Subscriptions').length).toBeGreaterThan(0);
  });

  it('should navigate the user to "/" if not authenticated', () => {
    useUnauthenticatedUser();
    renderer();
    expect(singletonRouter).toMatchObject({ asPath: '/' });
  });

  it('should navigate the user to "/401" if the user is not the owner of the list', () => {
    useAuthenticatedUser();
    useMockSubscribedListsWith401();
    renderer();
    expect(singletonRouter).toMatchObject({ asPath: '/401' });
  });

  it('should navigate the user to "/403" if the user is not the owner of the list', () => {
    useAuthenticatedUser();
    useMockSubscribedListsWith403();
    renderer();
    expect(singletonRouter).toMatchObject({ asPath: '/403' });
  });

  // it('should call the api to unsubscribe from the list', () => {
  //   useAuthenticatedUser();
  //   useMockSubscribedLists();
  //   const { getByText } = renderer();
  //   fireEvent.click(getByText('Unsubscribe'));
  //   expect(unsubscribeFromListMockFn).toHaveBeenCalled();
  // });

  // it('should navigate the user to "/lists/1" when the user clicks view', () => {
  //   useAuthenticatedUser();
  //   useMockSubscribedLists();
  //   const { getByRole } = renderer();
  //   act(() => {
  //     fireEvent.click(getByRole('button', { name: 'View' }));
  //   });
  //   expect(singletonRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/1' });
  // });

  it('should render the collection card with dropdown menu', () => {
    useAuthenticatedUser();
    useMockSubscribedLists();
    const { getByText, getByTestId } = renderer();
    expect(getByText('Test List 1')).toBeInTheDocument();

    expect(getByTestId('card-menu-button')).toBeInTheDocument();
  });

  it('should show a message when list is empty', () => {
    useAuthenticatedUser();
    useMockSubscribedListsEmpty();
    const { getByText } = renderer();
    expect(
      getByText('You are not subscribed to any lists.')
    ).toBeInTheDocument();
  });

  describe('Share functionality', () => {
    beforeEach(() => {
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn(() => Promise.resolve()),
        },
      });
    });

    it('should copy list url to clipboard when share is clicked', () => {
      useAuthenticatedUser();
      useMockSubscribedLists();
      const { getByTestId } = renderer();

      fireEvent.click(getByTestId('card-menu-button'));

      fireEvent.click(getByTestId('card-menu-item-Share'));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost/edlm-portal/learner/lists/1'
      );
    });

    it('should show Copied Successfully! message when copy is successful', async () => {
      useAuthenticatedUser();
      useMockSubscribedLists();
      const { getByTestId, findByText } = renderer();

      fireEvent.click(getByTestId('card-menu-button'));

      fireEvent.click(getByTestId('card-menu-item-Share'));

      expect(await findByText('Copied Successfully!')).toBeInTheDocument();
    });

    it('should show Failed to copy message when copy fails', async () => {
      navigator.clipboard.writeText = jest.fn(() => Promise.reject());
      useAuthenticatedUser();
      useMockSubscribedLists();
      const { getByTestId, findByText } = renderer();

      fireEvent.click(getByTestId('card-menu-button'));

      fireEvent.click(getByTestId('card-menu-item-Share'));

      expect(await findByText('Failed to copy')).toBeInTheDocument();
    });
  });

});
