import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, renderHook } from '@testing-library/react';
import { useUserList } from '@/hooks/useUserList';

import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useUserList');

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

// it('should return a specific list', async () => {
//   mockAxios.get.mockResolvedValue({ data: 'success' });
//   function setCurrentListInfo(){};
//   const { result, waitForNextUpdate } = renderHook(() => useUserList(12, setCurrentListInfo), {
//     wrapper,
//   });

//   await waitForNextUpdate(result.current.isSuccess);
//   expect(result.current.data).toEqual('success');
//   expect(mockAxios.get).toHaveBeenCalledTimes(1);
// });

it('should return null if there is no id', async () => {
  mockAxios.get.mockResolvedValue({ data: 'success' });

  const { result } = renderHook(() => useUserList(), {
    wrapper,
  });

  await act(async () => {
    await result.current.isSuccess;
  }
  );

  expect(result.current.data).toBeUndefined();
  expect(mockAxios.get).toHaveBeenCalledTimes(0);

  // expect(result.current.isSuccess).toBe(true);
  // expect(result.current.data).toEqual('success');
  // expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
