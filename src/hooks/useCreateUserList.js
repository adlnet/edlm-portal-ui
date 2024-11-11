'use strict';

import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from '@/config/axiosConfig';
import { interestLists } from '@/config/endpoints';

export function useCreateUserList() {
  const queryClient = useQueryClient();
  return useMutation(
    (variables) =>
    axiosInstance
        .post(interestLists, variables.form, {
          
        })
        .then((res) => res.data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['user-owned-lists']);
      },
    }
  );
}
