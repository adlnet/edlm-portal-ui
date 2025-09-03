'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { courseProgressDetail } from '@/config/endpoints';
import { oneHour } from '@/config/timeConstants';
import { useQuery, useQueryClient } from 'react-query';

/**
 * @function useCourseProgressDetail
 * @description Hook to get course progress detail
 * @returns {useQuery}
 */

export function useCourseProgressDetail() {
  const queryClient = useQueryClient();
  
  return useQuery(
    ['courseProgressDetail'],
    () => axiosInstance.get(courseProgressDetail).then((res) => res.data),
    {
      staleTime: oneHour,
      retry: false,
      onSuccess: (data) => {
        // Cache individual courses from all three arrs
        const allCourses = [
          ...(data.completed_courses || []),
          ...(data.enrolled_courses || []),
          ...(data.in_progress_courses || [])
        ];
        
        allCourses.forEach((course) => {
          if (course.course_id) {
            queryClient.setQueryData(['course', course.course_id], course);
          }
        });
      },
    }
  );
}
