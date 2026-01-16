'use strict';

import { QueryClient, QueryClientProvider } from 'react-query';
import { axiosInstance } from '@/config/axiosConfig';
import { renderHook, waitFor } from '@testing-library/react';
import { useAllApplications } from '@/hooks/application/useAllApplication';

jest.mock('@/config/axiosConfig');

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });
    
    const Wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
    
    Wrapper.displayName = 'QueryClientWrapper';
    
    return Wrapper;
};

describe('useAllApplications', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch all applications successfully', async () => {
        const mockApplications = [
            {
                id: '133-eddd-1dd3-a4dd-9988',
                application_type: 'new',
                position: 'SAPR_VA',
                status: 'draft',
                first_name: 'Eric',
                last_name: 'Nobdy',
            },
            {
                id: '3333-e89b-12d3-111-8899',
                application_type: 'renewal',
                position: 'SARC/SAPR_PM',
                status: 'submitted',
                first_name: 'Kobe',
                last_name: 'James',
            },
        ];

        axiosInstance.get.mockResolvedValue({ data: mockApplications });

        const { result } = renderHook(() => useAllApplications(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(axiosInstance.get).toHaveBeenCalledWith(
            expect.stringContaining('/applications/'),
            { params: {} }
        );
        expect(result.current.data).toEqual(mockApplications);
    });

    it('should handle error when fetching applications fails', async () => {
        const mockError = new Error('Failed to fetch applications');
        axiosInstance.get.mockRejectedValue(mockError);

        const { result } = renderHook(() => useAllApplications(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toEqual(mockError);
    });
});
