// tests for hooks/useDeleteSavedSearch

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, renderHook } from '@testing-library/react';
import { useDeleteSavedSearch } from '@/hooks/useDeleteSavedSearch';
import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useDeleteSavedSearch');

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should make a axios.delete call', async () => {
  // mock axios.delete call
  mockAxios.delete.mockImplementation(() => Promise.resolve({}));
  const { result } = renderHook(
    () => useDeleteSavedSearch(),
    { wrapper }
  );

  // wait for the hook to finish
  await act(async () => {
    await result.current.mutate(1);
  }
  );

  // check if axios.delete was called
  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
});
