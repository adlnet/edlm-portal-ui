'use strict';

import { applicationCoursesUrl } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Hook to update an existing application course
 */

export function useUpdateApplicationCourse() {
    const queryClient = useQueryClient();
    
    return useMutation(
        ({ courseId, ...courseData }) => axiosInstance.patch(
            `${applicationCoursesUrl}${courseId}/`,
            {
                display_order: courseData.displayOrder,
                category: courseData.category,
                course_external_reference: courseData.courseExternalReference,
                completion_date: courseData.completionDate,
                clocked_hours: courseData.clockedHours,
            }
        ).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['application-courses']);
                queryClient.invalidateQueries(['application', data.application]);
            }
        }
    );
}
