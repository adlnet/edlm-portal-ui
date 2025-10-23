'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlansUrl } from '@/config/endpoints';
import { tenMinutes } from '@/config/timeConstants';
import { useQuery } from 'react-query';

/**
 * Hook to get all learning plans for the current user
 * (Admin super user is going to get all learning plans in the system)
 */

export function useAllLearningPlans() {
    return useQuery(
        ['learning-plans'],
        () => axiosInstance.get(learningPlansUrl).then(res => res.data),
        {
            staleTime: tenMinutes,
            cacheTime: tenMinutes,
        }
    );
}
