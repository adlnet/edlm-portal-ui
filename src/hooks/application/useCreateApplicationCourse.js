'use strict';

import { applicationCoursesUrl } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Hook to create a new application course
 */
export function useCreateApplicationCourse() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (courseData) => axiosInstance.post(applicationCoursesUrl, {
            application: courseData.applicationId,
            display_order: courseData.displayOrder,
            category: courseData.category,
            course_external_reference: courseData.courseExternalReference,
            completion_date: courseData.completionDate,
            clocked_hours: courseData.clockedHours,
        }).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['application-courses']);
                queryClient.invalidateQueries(['application', data.application]);
            }
        }
    );
}
