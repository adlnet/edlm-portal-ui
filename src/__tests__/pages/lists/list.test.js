// tests for [listId].js

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import {
  useAuthenticatedUser,
  useListMock,
  useListMockWith401,
  useListMockWith403,
  useListMockWithNoExperiences,
  useMockConfig,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import { useList } from '@/hooks/useList';
import List, { getServerSideProps } from '@/pages/edlm-portal/learner/lists/[listId]';
import MockRouter from 'next-router-mock';
import singletonRouter from 'next/router';
import xAPIMapper from '@/utils/xapi/xAPIMapper';
import xAPISendStatement from '@/utils/xapi/xAPISendStatement';

// render function that wraps the component with query client wrapper
const renderer = () => {
  MockRouter.setCurrentUrl('/lists/1');

  // returns the wrapped render object
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <List listId={1} />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

beforeEach(() => {
  useMockConfig();
});

describe('List page', () => {
  it('should render', () => {
    useAuthenticatedUser();
    useListMock();
    const { getByText } = renderer();
    expect(getByText('My Collections')).toBeInTheDocument();
  });

  it('should not render edit button when unauthenticated', () => {
    useListMock();
    useUnauthenticatedUser();
    const { queryByText } = renderer();
    expect(queryByText('My Collections')).not.toBeInTheDocument();
  });

  it('should navigate a user to the specific course', () => {
    useListMock();
    useAuthenticatedUser();
    const { getByText } = renderer();
    const course = getByText('Test Title');
    fireEvent.click(course);
    expect(singletonRouter).toMatchObject({ asPath: '/learner/course/1' });
  });

  it('should navigate a user to the edit page', () => {
    useListMock();
    useAuthenticatedUser();
    const { getByText } = renderer();
    const editButton = getByText('Edit');
    fireEvent.click(editButton);
    expect(singletonRouter).toMatchObject({ asPath: '/learner/lists/edit/1' });
  });

  it('should show "No courses added yet." message', () => {
    useListMockWithNoExperiences();
    useAuthenticatedUser();

    const { getByText } = renderer();
    expect(getByText(/No courses added yet./i)).toBeInTheDocument();
  });
});

describe('List page server side', () => {
  it('context', () => {
    const context = { query: { listId: '1' } };
    const data = getServerSideProps(context);
    expect(data).toEqual({ props: { listId: '1' } });
  });
});
