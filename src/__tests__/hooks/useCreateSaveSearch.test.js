import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, renderHook } from '@testing-library/react';
import { useCreateSaveSearch } from '@/hooks/useCreateSaveSearch';
import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useCreateSaveSearch');

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should make an api call', async () => {
  // mock the axios post
  mockAxios.post.mockResolvedValue({ data: 'success' });

  const { result } = renderHook(
    () => useCreateSaveSearch(),
    { wrapper }
  );

  // wait for the api call to finish
  await act(async () =>
    result.current.mutate({ path: 'test', name: 'name' })
  );

  // check if the api call was made
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
});
