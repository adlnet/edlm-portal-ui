'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { oneHour } from '@/config/timeConstants';
import { topSavedCoursesDetail } from '@/config/endpoints';
import { useQuery } from 'react-query';

/**
 * @function useTopSavedCourses
 * @description Hook to get top saved courses
 * @returns {useQuery}
 */

export function useTopSavedCourses() {
  return useQuery(
    ['topSavedCourses'],
    () => axiosInstance.get(topSavedCoursesDetail).then((res) => res.data),
    {
      staleTime: oneHour,
      retry: false,
    }
  );
}
