import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';

import { useCourseSearch } from '@/hooks/useCourseSearch';
import searchData from '@/__mocks__/data/search.data';

// dont mock this hook
jest.unmock('@/hooks/useCourseSearch');

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('should return a list of courses found', async () => {
  mockAxios.get.mockResolvedValue({ data: searchData });

  const { result } = renderHook(() => useCourseSearch(), {
    wrapper,
  });

  await act(async () => {
    result.current.isSuccess;
  }
  );

  expect(result.current.data).toMatchObject(searchData);
});
