import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';

import { useCompetencySearch } from '@/hooks/useCompetencySearch';
import competencyData from '@/__mocks__/data/competency.data';


const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('should return a list of competencies found', async () => {
  mockAxios.get.mockResolvedValue({ data: competencyData });

  const { result } = renderHook(() => useCompetencySearch(), {
    wrapper,
  });

  await act(async () => {
    result.data;
  }
  );

  //expect(result.current.data).toMatchObject(searchData);
});