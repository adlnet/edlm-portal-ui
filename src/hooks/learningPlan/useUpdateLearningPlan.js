'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlansUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useUpdateLearningPlan
 * @description Hook to update an existing learning plan
 * @returns {useMutation}
 */

export function useUpdateLearningPlan() {
    const queryClient = useQueryClient();
    
    return useMutation(
        ({ planId, planData }) => axiosInstance.patch(`${learningPlansUrl}${planId}/`, {
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
