import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useCompetencySearch } from '@/hooks/useCompetencySearch';
import React, { useEffect, useState as useStateMock} from 'react';
import backupData from '@/public/backup_competencies.json';
import mockAxios from 'jest-mock-axios';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCompetencySearch hook test', () => {

beforeEach(() => {
    jest.clearAllMocks();
});

  it ('should return the backup-competency data when unsuccessful', async() => {
    mockAxios.request.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useCompetencySearch(), {
        wrapper: wrapper,
      });

    await waitFor(() => {
        expect(result.current.competencies).toEqual(backupData);
        expect(result.current.isLoading).toBe(false);
    });
    
    expect(mockAxios.request).toHaveBeenCalledTimes(1);  
})
  
});