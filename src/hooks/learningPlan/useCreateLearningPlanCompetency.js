'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlanCompetenciesUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useCreateLearningPlanCompetency
 * @description Hook to create a new learning plan competency
 * @returns {useMutation}
 */

export function useCreateLearningPlanCompetency() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (competencyData) => axiosInstance.post(learningPlanCompetenciesUrl, {
            // Comp name not needed, will validate the reference on backend
            learning_plan: competencyData.learningPlanId,
            competency_external_reference: competencyData.competencyExternalReference,
            competency_external_name: competencyData.competencyName,
            priority: competencyData.priority
        }).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['learning-plan-competencies']);
                queryClient.invalidateQueries(['learning-plan', data.learning_plan]);
            }
        }
    );
}
