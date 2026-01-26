'use strict';

import { QueryClient, QueryClientProvider } from 'react-query';
import { axiosInstance } from '@/config/axiosConfig';
import { renderHook, waitFor } from '@testing-library/react';
import { useApplication } from '@/hooks/application/useApplication';

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

describe('useApplication', () => {
    const applicationId = '123-321-777-5555-abcdefg';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch a single application successfully', async () => {
        const mockApplication = {
            id: applicationId,
            application_type: 'new',
            position: 'SAPR_VA',
            status: 'draft',
            first_name: 'Steve',
            last_name: 'Nojob',
            work_email: 'steve.nojob@example.com',
        };

        axiosInstance.get.mockResolvedValue({ data: mockApplication });

        const { result } = renderHook(() => useApplication(applicationId), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(axiosInstance.get).toHaveBeenCalledWith(
            expect.stringContaining(`/applications/${applicationId}/`)
        );
        expect(result.current.data).toEqual(mockApplication);
    });

    it('should handle error when fetching application fails', async () => {
        const mockError = new Error('Failed to fetch application');
        axiosInstance.get.mockRejectedValue(mockError);

        const { result } = renderHook(() => useApplication(applicationId), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toEqual(mockError);
    });
});
