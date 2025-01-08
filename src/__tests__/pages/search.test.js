import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render } from '@testing-library/react';
import {
  useAuthenticatedUser,
  useMockConfig,
  useMockCreateSaveSearch,
  useMockCreateUserList,
  useMockMoreLikeThis,
  useMockMoreLikeThisWithoutData,
  useMockSearch,
  useMockSearchUrl,
  useMockSearchWithMultipleResults,
  useMockSearchWithoutData,
  useMockUpdateUserList,
  useMockUserOwnedLists,
  useUnauthenticatedUser,
  useMockCompetencySearch,
} from '@/__mocks__/predefinedMocks';
import MockRouter from 'next-router-mock';
import Search from '@/pages/learner/search';
import singletonRouter from 'next/router';

// mocking the jest fn
console.log = jest.fn();

beforeEach(() => {
  useMockConfig();
  useMockSearchUrl();
  useMockCreateSaveSearch();
  useMockUserOwnedLists();
  useMockUpdateUserList();
  useMockCreateUserList();
  useMockCompetencySearch();
  useMockSearch();
  useMockMoreLikeThis();
  useMockCompetencySearch();
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderer = () => {
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Search
          query={{
            keyword: 'test',
            p: 1,
          }}
        />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

jest.mock('@/hooks/useCompetencySearch');

describe('Search Page', () => {
  it('should render the page', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    const { getByPlaceholderText } = renderer();

    expect(getByPlaceholderText('Search for Learning Content')).toBeInTheDocument();
  });

  it('should render the results', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    const { getByText } = renderer();

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('More Like This Title')).toBeInTheDocument();
  });

  it('should not render the save button when the user is not authenticated', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    const { queryByText } = renderer();

    expect(queryByText('Save')).not.toBeInTheDocument();
  });

  it('should render the save button when the user is authenticated', () => {
    useAuthenticatedUser();
    useMockSearch();
    useMockUserOwnedLists();
    useMockMoreLikeThisWithoutData();
    const { getByText } = renderer();

    expect(getByText('Save')).toBeInTheDocument();
  });

  it('should not render the "Save Search" button when the user is not authenticated', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    const { queryByText } = renderer();

    expect(queryByText('Save Search')).not.toBeInTheDocument();
  });

  it('should render the "Save Search" button when the user is logged in', () => {
    useAuthenticatedUser();
    useMockSearch();
    useMockUserOwnedLists();
    useMockMoreLikeThisWithoutData();
    const { getByText } = renderer();

    expect(getByText('Save Search')).toBeInTheDocument();
  });

  it('should navigate to the course page when a course is clicked', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    const { getByText } = renderer();

    act(() => {
      fireEvent.click(getByText('Test Title'));
    });

    expect(singletonRouter).toMatchObject({
      asPath: '/learner/course/1',
    });
  });

  it('should render the "Save Search" button if the user is logged in', () => {
    useAuthenticatedUser();
    useMockSearch();
    useMockUserOwnedLists();
    useMockMoreLikeThisWithoutData();
    const { getByText } = renderer();

    expect(getByText('Save Search')).toBeInTheDocument();
  });

  it('should not render the "Save Search" button if the user is not logged in', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    useMockUserOwnedLists();
    const { queryByText } = renderer();

    expect(queryByText('Save Search')).not.toBeInTheDocument();
  });

  it('should change value of the search input when the user types', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    useMockUserOwnedLists();
    const { getByPlaceholderText } = renderer();

    act(() => {
      fireEvent.change(getByPlaceholderText('Search for Learning Content'), {
        target: { value: 'test' },
      });
    });

    expect(getByPlaceholderText('Search for Learning Content')).toHaveValue('test');
  });

  it('should render the initial value of the search input when the user first visits', () => {
    MockRouter.setCurrentUrl('/learner/search?keyword=initial');
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    useMockUserOwnedLists();
    const { getByPlaceholderText } = renderer();

    expect(getByPlaceholderText('Search for Learning Content')).toHaveValue('initial');
  });

  it('should change the value on the search input when the user navigates to the search page', () => {
    MockRouter.setCurrentUrl('/learner/search?keyword=initial');
    useMockSearchWithoutData();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    useMockUserOwnedLists();

    const { getByPlaceholderText, getByTitle } = renderer();

    const input = getByPlaceholderText(/Search for Learning Content/i);
    const searchBtn = getByTitle('Search');

    act(() => {
      fireEvent.change(input, { target: { value: 'updated' } });
    });

    act(() => {
      fireEvent.click(searchBtn);
    });

    expect(singletonRouter).toMatchObject({
      asPath: '/learner/search?keyword=updated&p=1',
    });
  });

  it('should reset the form when "reset" is clicked', () => {
    MockRouter.setCurrentUrl('/learner/search?keyword=');
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();
    useMockUserOwnedLists();
    const { getByTitle, getByPlaceholderText } = renderer();
    const input = getByPlaceholderText('Search for Learning Content');
    act(() => {
      fireEvent.click(getByTitle('Clear Search'));
    });

    expect(input.value).toBe('');
  });

  it('should render filters when there are aggregations', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThisWithoutData();
    useMockUserOwnedLists();
    const { getByRole } = renderer();

    expect(getByRole('button', { name: /course type/i })).toBeInTheDocument();
  });

  it('should show options for filters when clicked', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThisWithoutData();
    useMockUserOwnedLists();
    const { getByText, queryByRole, getByTitle, getByPlaceholderText} = renderer();

    act(() => {
      fireEvent.click(queryByRole('button', { name: /course type/i }));
    });

    expect(getByText(/test bucket 1/i)).toBeInTheDocument();
    expect(getByText(/test bucket 2/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByText(/test bucket 1/i));
    });

    act(() => {
      fireEvent.change(getByPlaceholderText('Search for Learning Content'), {
        target: { value: 'test' },
      });
    });

    const searchBtn = getByTitle('Search');
    act(() => {
      fireEvent.click(searchBtn);
    }); 

    expect(singletonRouter).toMatchObject({
      asPath: '/learner/search?keyword=test&p=1',
    });
  });

  it('should clear all selection and search when clicked', () => {
    MockRouter.setCurrentUrl('/learner/search?keyword=initial&Course.CourseType=test%20bucket%201&p=1');

    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThisWithoutData();
    useMockUserOwnedLists();
    const { getByText, queryByRole } = renderer();

    act(() => {
      fireEvent.click(queryByRole('button', { name: /course type/i }));
    });

    expect(getByText(/test bucket 1/i)).toBeInTheDocument();
    expect(getByText(/test bucket 2/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByText(/test bucket 1/i));
    });

    act(() => {
      fireEvent.click(queryByRole('button', { name: /course type/i }));
    });

    act(() => {
      fireEvent.click(queryByRole('button', { name: /Clear Search/i }));
    });
    expect(singletonRouter).toMatchObject({
      asPath: '/learner/search',
    });
  });

  it('should show the next button when there are more pages', () => {
    useMockSearchWithMultipleResults();
    useUnauthenticatedUser();
    useMockMoreLikeThisWithoutData();
    useMockUserOwnedLists();
    const { getByRole, getByTitle } = renderer();

    expect(getByRole('button', { name: /next/i })).toBeEnabled();

  });

  it('should show previous when there are more pages', () => {
    MockRouter.setCurrentUrl('/learner/search?keyword=initial&p=2');
    useUnauthenticatedUser();
    useMockSearchWithMultipleResults();
    useMockMoreLikeThisWithoutData();
    useMockUserOwnedLists();

    const { getByRole } = renderer();

    expect(getByRole('button', { name: /next/i })).toBeDisabled();

    expect(getByRole('button', { name: /previous/i })).toBeEnabled();

  });

  it('should navigate user to next page when next is clicked', () => {
    MockRouter.setCurrentUrl('/learner/search?keyword=initial&p=1');
    useUnauthenticatedUser();
    useMockSearchWithMultipleResults();
    useMockMoreLikeThisWithoutData();
    useMockUserOwnedLists();
    const { getByRole } = renderer();

    act(() => {
      fireEvent.click(getByRole('button', { name: /next/i }));
    });

    expect(singletonRouter).toMatchObject({
      asPath: '/learner/search?keyword=initial&p=2',
    });
  });

  it('should toggle tab between courses and competencies', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();

    const { getByText } = renderer();

    act(() => {
      fireEvent.click(getByText('Competencies'));
    });

    expect(getByText('Competency Search')).toBeInTheDocument();
  });

  it('should toggle to competencies when result card tag is clicked', () => {
    useMockSearch();
    useUnauthenticatedUser();
    useMockMoreLikeThis();

    const screen  = renderer();
    const tagButton = screen.queryByRole('button', { name: /software/i });

    act(() => {
      fireEvent.click(tagButton);
    });

    expect(screen.getByText('Competency Search')).toBeInTheDocument();
  });

  it('should not show the filters when no search input is entered', () => {
    
    MockRouter.setCurrentUrl('/learner/search');
    useMockSearchWithoutData();
    useUnauthenticatedUser();
    useMockMoreLikeThis();

    const { queryByRole, getByTitle } = renderer();

    const searchBtn = getByTitle('Search');
    act(() => {
      fireEvent.click(searchBtn);
    }); 

    const filterButton = queryByRole('button', { name: /course type/i });
    expect(filterButton).not.toBeInTheDocument();
  });

  // it ('should not be able to search without a keyword', () => {
    
  // })
  
});
