'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlanCompetenciesUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useDeleteLearningPlanCompetency
 * @description Hook to delete a learning plan competency
 * @returns {useMutation}
 */

export function useDeleteLearningPlanCompetency() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (competencyId) => axiosInstance.delete(`${learningPlanCompetenciesUrl}${competencyId}/`)
            .then(res => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['learning-plan-competencies']);
            }
        }
    );
}
