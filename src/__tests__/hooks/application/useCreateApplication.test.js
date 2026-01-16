'use strict';

import { QueryClient, QueryClientProvider } from 'react-query';
import { axiosInstance } from '@/config/axiosConfig';
import { renderHook, waitFor } from '@testing-library/react';
import { useCreateApplication } from '@/hooks/application/useCreateApplication';

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

describe('useCreateApplication', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new application successfully', async () => {
        const mockApplicationData = {
            applicationType: 'new',
            position: 'SAPR_VA',
            codeOfEthicsAcknowledgement: true,
            firstName: 'Donald',
            lastName: 'Duck',
            workEmail: 'donald.duck@example.com',
        };

        const mockResponse = {
            id: '123-321-3333-4444-555555555r555',
            application_type: 'new',
            position: 'SAPR_VA',
            code_of_ethics_acknowledgement: true,
            first_name: 'Donald',
            last_name: 'Duck',
            work_email: 'donald.duck@example.com',
            status: 'draft',
        };

        axiosInstance.post.mockResolvedValue({ data: mockResponse });

        const { result } = renderHook(() => useCreateApplication(), {
            wrapper: createWrapper(),
        });

        await result.current.mutateAsync(mockApplicationData);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(axiosInstance.post).toHaveBeenCalledWith(
            expect.stringContaining('/applications/'),
            expect.objectContaining({
                application_type: 'new',
                position: 'SAPR_VA',
                code_of_ethics_acknowledgement: true,
                first_name: 'Donald',
                last_name: 'Duck',
                work_email: 'donald.duck@example.com',
                final_submission: false,
            })
        );
        expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle error when creating application fails', async () => {
        const mockError = new Error('Failed to create application');
        axiosInstance.post.mockRejectedValue(mockError);

        const { result } = renderHook(() => useCreateApplication(), {
            wrapper: createWrapper(),
        });

        await expect(
            result.current.mutateAsync({ applicationType: 'new' })
        ).rejects.toThrow('Failed to create application');

        await waitFor(() => expect(result.current.isError).toBe(true));
    });
});
