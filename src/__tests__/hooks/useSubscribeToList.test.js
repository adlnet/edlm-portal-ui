import { act, renderHook } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { useSubscribeToList } from '@/hooks/useSubscribeToList';

jest.unmock('@/hooks/useSubscribeToList');

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should make an api call', async () => {
  // mock the axios patch
  mockAxios.patch.mockResolvedValue({ data: 'success' });

  const { result } = renderHook(() => useSubscribeToList(), {
    wrapper,
  });

  // wait for the api call to finish
  await act(async () => {
    await result.current.mutate({ id: '1' });
  }
  );


  // check if the api call was made
  expect(mockAxios.patch).toHaveBeenCalledTimes(1);
});
