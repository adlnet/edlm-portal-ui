// tests for hooks/useSubscribedLists.js
import { act, renderHook } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { useSubscribedLists } from '@/hooks/useSubscribedLists';

jest.unmock('@/hooks/useSubscribedLists');

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should return the mocked data', async () => {
  mockAxios.get.mockResolvedValue({ data: [{test: test}] });
  const { result } = renderHook(() => useSubscribedLists(), {
    wrapper,
  });
  await act(async () => {
    await result.current.isSuccess;
  }
  );

  expect(result.current.isSuccess).toBe(true);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
