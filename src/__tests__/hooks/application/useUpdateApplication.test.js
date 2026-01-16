'use strict';

import { QueryClient, QueryClientProvider } from 'react-query';
import { axiosInstance } from '@/config/axiosConfig';
import { renderHook, waitFor } from '@testing-library/react';
import { useUpdateApplication } from '@/hooks/application/useUpdateApplication';

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

describe('useUpdateApplication', () => {
    const applicationId = '123-321-777-5555-abcdefg';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update an application successfully', async () => {
        const mockUpdateData = {
            applicationId,
            firstName: 'Ash',
            lastName: 'Poke',
            workEmail: 'ash.poke@example.com',
            position: 'SARC/SAPR_PM',
        };

        const mockResponse = {
            id: applicationId,
            first_name: 'Ash',
            last_name: 'Poke',
            work_email: 'ash.poke@example.com',
            position: 'SARC/SAPR_PM',
            application_type: 'renewal',
            status: 'draft',
        };

        axiosInstance.patch.mockResolvedValue({ data: mockResponse });

        const { result } = renderHook(() => useUpdateApplication(), {
            wrapper: createWrapper(),
        });

        await result.current.mutateAsync(mockUpdateData);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(axiosInstance.patch).toHaveBeenCalledWith(
            expect.stringContaining(`/applications/${applicationId}/`),
            expect.objectContaining({
                first_name: 'Ash',
                last_name: 'Poke',
                work_email: 'ash.poke@example.com',  // ← Changed from workEmail
                position: 'SARC/SAPR_PM',
            })
        );
        expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle error when updating application fails', async () => {
        const mockError = new Error('Failed to update application');
        axiosInstance.patch.mockRejectedValue(mockError);

        const { result } = renderHook(() => useUpdateApplication(), {
            wrapper: createWrapper(),
        });

        await expect(
            result.current.mutateAsync({ applicationId, firstName: 'Jane' })
        ).rejects.toThrow('Failed to update application');

        await waitFor(() => expect(result.current.isError).toBe(true));
    });
});
