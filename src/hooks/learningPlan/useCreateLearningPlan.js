'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlansUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useCreateLearningPlan
 * @description Hook to create a new learning plan
 * @returns {useMutation}
 */

export function useCreateLearningPlan() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (planData) => axiosInstance.post(learningPlansUrl, {
            name: planData.planName,
            timeframe: planData.timeframe
        }).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['learning-plans']);
                queryClient.setQueryData(['learning-plan', data.id], data);
            }
        }
    );
}
