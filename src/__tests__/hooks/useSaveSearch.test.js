// test cases for useSaveSearch hook
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, renderHook } from '@testing-library/react';
import { useSaveSearchList } from '@/hooks/useSaveSearch';

import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useSaveSearch');

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should return the data from axios mock', async () => {
  mockAxios.get.mockResolvedValue({ data: 'success' });
  const { result } = renderHook(() => useSaveSearchList(), {
    wrapper,
  });

  await act(async () => {
    await result.current.isSuccess;
  }
  );
  expect(result.current.isSuccess).toBe(true);
  expect(result.current.data).toBe('success');
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
