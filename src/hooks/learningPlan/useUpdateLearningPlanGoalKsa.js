'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlanGoalKsasUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

export function useUpdateLearningPlanGoalKsa() {
    const queryClient = useQueryClient();
    
    return useMutation(
        ({ ksaId, ksaData }) => axiosInstance.patch(`${learningPlanGoalKsasUrl}${ksaId}/`, {
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
