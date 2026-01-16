'use strict';

import { applicationsUrl } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { tenMinutes } from '@/config/timeConstants';
import { useQuery } from 'react-query';

/**
 * Hook to get all applications for the current user
 */

export function useAllApplications(params = {}) {
    return useQuery(
        ['applications', params],
        () => axiosInstance.get(applicationsUrl, { params }).then(res => res.data),
        {
            staleTime: tenMinutes,
            cacheTime: tenMinutes,
        }
    );
}
