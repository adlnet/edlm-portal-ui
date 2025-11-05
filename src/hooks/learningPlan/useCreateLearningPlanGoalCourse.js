'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlanGoalCoursesUrl } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

/**
 * 
 * @function useCreateLearningPlanGoalCourse
 * @description Hook to create a new learning plan goal course
 * @returns {useMutation}
 */

export function useCreateLearningPlanGoalCourse() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (courseData) => axiosInstance.post(learningPlanGoalCoursesUrl, {
            plan_goal: courseData.planGoalId,
            course_external_reference: courseData.courseExternalReference
        }).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['learning-plan-goal-courses']);
                queryClient.invalidateQueries(['learning-plan-goals']);
                queryClient.invalidateQueries(['learning-plan', data.plan_goal]);
            }
        }
    );
}
