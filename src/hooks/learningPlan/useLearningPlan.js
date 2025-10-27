'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { learningPlansUrl } from '@/config/endpoints';
import { tenMinutes } from '@/config/timeConstants';
import { useQuery } from 'react-query';

/**
 * Hook to get a single learning plan with full details
 */

export function useLearningPlan(planId) {
    return useQuery(
        ['learning-plan', planId],
        () => axiosInstance.get(`${learningPlansUrl}${planId}/`).then(res => res.data),
        {
            enabled: !!planId,
            staleTime: tenMinutes,
            cacheTime: tenMinutes,
        }
    );
}
