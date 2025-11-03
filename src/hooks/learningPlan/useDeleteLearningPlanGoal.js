'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlanGoalsUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useDeleteLearningPlanGoal
 * @description Hook to delete a learning plan goal
 * @returns {useMutation}
 */

export function useDeleteLearningPlanGoal() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (goalId) => axiosInstance.delete(`${learningPlanGoalsUrl}${goalId}/`)
            .then(res => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['learning-plan-goals']);
                queryClient.invalidateQueries(['learning-plan-competencies']);
            }
        }
    );
}
