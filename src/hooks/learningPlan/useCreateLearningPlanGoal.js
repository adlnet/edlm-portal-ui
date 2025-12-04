'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { convertTimelineToInt } from '@/utils/convertTimelineToInt';
import { learningPlanGoalsUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useCreateLearningPlanGoal
 * @description Hook to create a new learning plan goal
 * @returns {useMutation}
 */

export function useCreateLearningPlanGoal() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (goalData) => axiosInstance.post(learningPlanGoalsUrl, {
            plan_competency: goalData.planCompetencyId,
            goal_name: goalData.goalName,
            timeline: convertTimelineToInt(goalData.timeline),
            resources_support: goalData.resources || [],
            obstacles: goalData.obstacles || [],
            resources_support_other: goalData.resourcesOther || '',
            obstacles_other: goalData.obstaclesOther || ''
        }).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['learning-plan-goals']);
                queryClient.invalidateQueries(['learning-plan-competencies']);
            }
        }
    );
}
