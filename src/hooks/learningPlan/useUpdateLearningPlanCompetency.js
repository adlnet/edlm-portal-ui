'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlanCompetenciesUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useUpdateLearningPlanCompetency
 * @description Hook to update an existing learning plan competency
 * @returns {useMutation}
 */

export function useUpdateLearningPlanCompetency() {
    const queryClient = useQueryClient();
    
    return useMutation(
        ({ competencyId, competencyData }) => axiosInstance.patch(`${learningPlanCompetenciesUrl}${competencyId}/`, {
            competency_external_reference: competencyData.competencyExternalReference,
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
