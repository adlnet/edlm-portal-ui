import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  useAuthenticatedUser,
  useMockConfig,
  useMockUpdateUserList,
  useMockUserOwnedLists,
  useMockUserOwnedListsWith401,
  useMockUserOwnedListsWith403,
  useMockUserOwnedListsWithoutData,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import MockRouter from 'next-router-mock';
import Owned from '@/pages/edlm-portal/learner/lists/owned';
import singletonRouter from 'next/router';

const renderer = () => {
  MockRouter.setCurrentUrl('/lists/owned');
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Owned />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

beforeEach(() => {
  useMockUpdateUserList();
});

describe('User Owned Lists', () => {
  it('should render the page', () => {
    useAuthenticatedUser();
    useMockUserOwnedLists();
    const { getAllByText } = renderer();
    expect(getAllByText('My Collections').length).toBeGreaterThan(0);
  });

  it('should navigate the user to "/" if not authenticated', () => {
    useUnauthenticatedUser();
    useMockUserOwnedLists();
    renderer();
    expect(singletonRouter).toMatchObject({ asPath: '/edlm-portal' });
  });

  it('should navigate the user to "/401" if the user is not the owner of the list', () => {
    useAuthenticatedUser();
    useMockUserOwnedListsWith401();
    renderer();
    expect(singletonRouter).toMatchObject({ asPath: '/401' });
  });

  it('should navigate the user to "/403" if the user is not the owner of the list', () => {
    useAuthenticatedUser();
    useMockUserOwnedListsWith403();
    renderer();
    expect(singletonRouter).toMatchObject({ asPath: '/403' });
  });

  it('should navigate the user to "/lists/1" when the user clicks Test Title 1', () => {
    useAuthenticatedUser();
    useMockUserOwnedLists();
    const { getByText} = renderer();
    act(() => {
      fireEvent.click(getByText('Test Title 1'));
    });
    expect(singletonRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/1?previousPage=My+Collections' });
  });

  it('should display the list', () => {
    useAuthenticatedUser();
    useMockUserOwnedLists();
    const { getByText } = renderer();
    expect(getByText('Test Title 1')).toBeInTheDocument();
  });

  it('should display the list', () => {
    useAuthenticatedUser();
    useMockUserOwnedListsWithoutData();
    const { getByText, queryByText } = renderer();
    expect(
      getByText('You dont have any collections yet.')
    ).toBeInTheDocument();
    expect(queryByText('Test Title 1')).not.toBeInTheDocument();
  });

  it('should render the collection card with dropdown menu', () => {
    useAuthenticatedUser();
    useMockUserOwnedLists();
    const { getByText, getByTestId } = renderer();
    expect(getByText('Test Title 1')).toBeInTheDocument();

    expect(getByTestId('card-menu-button')).toBeInTheDocument();
  });

  it('should go to edit list page when edit is clicked', () => {
    useAuthenticatedUser();
    useMockUserOwnedLists();
    const { getByTestId } = renderer();

    fireEvent.click(getByTestId('card-menu-button'));

    fireEvent.click(getByTestId('card-menu-item-Edit'));

    expect(singletonRouter).toMatchObject({ asPath: '/edlm-portal/learner/lists/edit/1' });
  });

  it('should remove a list when "delete" is clicked', async () => {
    useAuthenticatedUser();
    useMockUserOwnedLists();
    const { getByTestId } = renderer();

    fireEvent.click(getByTestId('card-menu-button'));

    fireEvent.click(getByTestId('card-menu-item-Delete'));

    await waitFor(() => {
      expect(singletonRouter).toMatchObject({ asPath: '/lists/owned' });
    });
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
      useMockUserOwnedLists();
      const { getByTestId } = renderer();

      fireEvent.click(getByTestId('card-menu-button'));

      fireEvent.click(getByTestId('card-menu-item-Share'));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost/edlm-portal/learner/lists/1'
      );
    });

    it('should show Copied Successfully! message when copy is successful', async () => {
      useAuthenticatedUser();
      useMockUserOwnedLists();
      const { getByTestId, findByText } = renderer();

      fireEvent.click(getByTestId('card-menu-button'));

      fireEvent.click(getByTestId('card-menu-item-Share'));

      expect(await findByText('Copied Successfully!')).toBeInTheDocument();
    });

    it('should show Failed to copy message when copy fails', async () => {
      navigator.clipboard.writeText = jest.fn(() => Promise.reject());
      useAuthenticatedUser();
      useMockUserOwnedLists();
      const { getByTestId, findByText } = renderer();

      fireEvent.click(getByTestId('card-menu-button'));

      fireEvent.click(getByTestId('card-menu-item-Share'));

      expect(await findByText('Failed to copy')).toBeInTheDocument();
    });
  });
});
