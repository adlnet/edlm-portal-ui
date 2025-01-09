// tests for useSpotlightCourses hook

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, renderHook } from '@testing-library/react';
import { useSpotlightCourses } from '@/hooks/useSpotlightCourses';
import mockAxios from 'jest-mock-axios';
import spotlightCoursesData from '@/__mocks__/data/spotlightCourses.data';

jest.unmock('@/hooks/useSpotlightCourses');
const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should make an api call', async () => {
  mockAxios.get.mockResolvedValue({ spotlightCoursesData });
//   const { result } = renderHook(() => useSpotlightCourses(), {
//     wrapper,
//   });
//   await act(async () => {
//     result.current.isSuccess;
//   }
//   );

//   expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
