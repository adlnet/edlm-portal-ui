'use strict';

import { applicationCommentsUrl } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Hook to create a new application comment (reviewer only)
 */

export function useCreateApplicationComment() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (commentData) => axiosInstance.post(applicationCommentsUrl, {
            application: commentData.applicationId,
            comment: commentData.comment,
        }).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['application-comments']);
                queryClient.invalidateQueries(['application', data.application]);
            }
        }
    );
}
