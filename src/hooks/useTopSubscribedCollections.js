'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { oneHour } from '@/config/timeConstants';
import { topSubscribedCollectionsDetail } from '@/config/endpoints';
import { useQuery } from 'react-query';

/**
 * @function useTopSubscribedCollections
 * @description Hook to get top subscribed collections
 * @returns {useQuery}
 */

export function useTopSubscribedCollections() {
  return useQuery(
    ['topSubscribedCollections'],
    () => axiosInstance.get(topSubscribedCollectionsDetail).then((res) => res.data),
    {
      staleTime: oneHour,
      retry: false,
    }
  );
}
