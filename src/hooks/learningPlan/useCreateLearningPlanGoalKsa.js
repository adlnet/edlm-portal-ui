'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlanGoalKsasUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useCreateLearningPlanGoalKsa
 * @description Hook to create a new learning plan goal KSA
 * @returns {useMutation}
 */

export function useCreateLearningPlanGoalKsa() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (ksaData) => axiosInstance.post(learningPlanGoalKsasUrl, {
            // Ksa name not needed, will validate the reference on backend
            plan_goal: ksaData.planGoalId,
            ksa_external_reference: ksaData.ksaExternalReference,
            current_proficiency: ksaData.currentLevel,
            target_proficiency: ksaData.targetLevel
        }).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['learning-plan-goal-ksas']);
                queryClient.invalidateQueries(['learning-plan-goals']);
            }
        }
    );
}
