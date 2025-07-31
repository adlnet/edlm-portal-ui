import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@testing-library/react';
import { useCourse } from '@/hooks/useCourse.js';
import courseData from '@/__mocks__/data/course.data';
import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useCourse');

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock('axios');
test('should return course data', async () => {
  mockAxios.get.mockResolvedValue({ data: courseData });
  const { result } = renderHook(() => useCourse(12), {
    wrapper,
  });

  await act(async () => {
    result.current.isSuccess;
  }
  );
  expect(result.current.data).toEqual(courseData);
});

test('should return null if no course is passed', async () => {
  mockAxios.get.mockResolvedValue({ data: courseData });
  const { result } = renderHook(() => useCourse(), {
    wrapper,
  });

  await act(async () => { 
    result.current.isSuccess;
  }
  );
  expect(result.current.data).toEqual(null);
});
