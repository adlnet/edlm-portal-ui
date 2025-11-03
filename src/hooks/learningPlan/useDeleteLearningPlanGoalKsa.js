'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlanGoalKsasUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useDeleteLearningPlanGoalKsa
 * @description Hook to delete a learning plan goal KSA
 * @returns {useMutation}
 */

export function useDeleteLearningPlanGoalKsa() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (ksaId) => axiosInstance.delete(`${learningPlanGoalKsasUrl}${ksaId}/`)
            .then(res => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['learning-plan-goal-ksas']);
                queryClient.invalidateQueries(['learning-plan-goals']);
            }
        }
    );
}
