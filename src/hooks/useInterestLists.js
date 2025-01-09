'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { interestLists } from '@/config/endpoints';
import { oneHour } from '@/config/timeConstants';
import { useQuery, useQueryClient } from 'react-query';

/**
 * @function useInterestLists
 * @description Hook to get all of the interest lists
 * @returns {useQuery}
 */

export function useInterestLists() {
  const queryClient = useQueryClient();
  return useQuery(
   ['lists'],
    () => axiosInstance.get(interestLists).then((res) => res.data),
    {
      staleTime: oneHour,
      retry: false,
      onSuccess: (data) => {
        // add each of the hits to the query client as a list
        // the hit.id is the same as the interest list id
        data?.forEach((hit) => {
          queryClient.setQueryData(['list', hit.id], hit);
        });
      },
    }
  );
}
