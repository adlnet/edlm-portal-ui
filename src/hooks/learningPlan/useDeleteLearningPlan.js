'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlansUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useDeleteLearningPlan
 * @description Hook to delete a learning plan
 * @returns {useMutation}
 */

export function useDeleteLearningPlan() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (planId) => axiosInstance.delete(`${learningPlansUrl}${planId}/`)
            .then(res => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['learning-plans']);
            }
        }
    );
}
