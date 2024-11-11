'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { useQuery, useQueryClient } from 'react-query';
import { spotlightCourses } from '@/config/endpoints';
import { oneHour } from '@/config/timeConstants';

// getter for useQuery
const getSpotlightCourses = () => {
  return () => axiosInstance.get(spotlightCourses).then((res) => res.data);
};

export default function useSpotlightCourses() {
  const queryClient = useQueryClient();
  return useQuery('spotlight-courses', getSpotlightCourses(), {
    staleTime: oneHour,
    onSuccess: (data) => {
      if (!Array.isArray(data)) return;
      return data?.forEach((course) => {
        queryClient.setQueryData(
          ['course', course.meta.metadata_key_hash],
          course
        );
        queryClient.setQueryDefaults(['course', course.meta.id], {
          staleTime: oneHour,
          cacheTime: oneHour,
        });
      });
    },
  });
}
