'use strict';

import { applicationsUrl } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { tenMinutes } from '@/config/timeConstants';
import { useQuery } from 'react-query';

/**
 * Hook to get a single application with details
 */

export function useApplication(applicationId) {
    return useQuery(
        ['application', applicationId],
        () => axiosInstance.get(`${applicationsUrl}${applicationId}/`).then(res => res.data),
        {
            enabled: !!applicationId,
            staleTime: tenMinutes,
            cacheTime: tenMinutes,
        }
    );
}
