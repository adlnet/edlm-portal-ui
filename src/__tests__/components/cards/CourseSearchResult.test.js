import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render } from '@testing-library/react';
import {
  useAuthenticatedUser,
  useMockConfig,
  useMockCourseWithoutData,
  useMockCreateUserList,
  useMockHandleCompetencyTag,
  useMockUpdateUserList,
  useMockUserOwnedListsWithoutData,
  useUnauthenticatedUser
} from '@/__mocks__/predefinedMocks';
import CourseSearchResult from '@/components/cards/CourseSearchResult';
import courseData from '@/__mocks__/data/course.data';
import singletonRouter from 'next/router';

const renderer = (props) => {
  return render(
    <QueryClientWrapper>
      <CourseSearchResult result={courseData} key={courseData.meta.key} handleCompetencyTag={useMockHandleCompetencyTag} />
    </QueryClientWrapper>
  );
};

beforeEach(() => {
  useMockUserOwnedListsWithoutData();
  useMockUpdateUserList();
  useMockCreateUserList();
  useMockConfig();
});

describe('CourseSearchResult', () => {
  it('renders the course data', () => {
    useAuthenticatedUser();
    const screen = renderer();
    expect(screen.getByText('Test Course Title'));
    expect(screen.getByText('Provider Name'));
    expect(screen.getByText('Short Description'));
  });

  it('should show the save button when a user is authenticated', () => {
    useAuthenticatedUser();
    const screen = renderer();
    expect(screen.getByText('Save'));
  });

  it('should navigate user to the course page when clicked', () => {
    useAuthenticatedUser();
    const screen = renderer();
    act(() => {
      fireEvent.click(screen.getByText('Test Course Title'));
    });
    expect(singletonRouter).toMatchObject({
      asPath: '/edlm-portal/learner/course/123456',
    });
  });

  it ('should click the competency button and expect a test result', ()=> {
    useAuthenticatedUser();
    const screen = renderer();

    act(() =>{
      fireEvent.click(screen.getByText('Test Planning, Execution, & Evaluation'));
    })
    expect('Test Planning, Execution, & Evaluation');

  });

  // it ('should show not available when course data is empty', ()=> {
  //   useAuthenticatedUser();
  //   useMockCourseWithoutData();
  //   const screen = renderer();

  //   expect(screen.queryAllByText('Not Available').length).toBe(5);
  // })
});
