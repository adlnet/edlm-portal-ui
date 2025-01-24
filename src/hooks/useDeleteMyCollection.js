'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { interestLists } from '@/config/endpoints';
import { useMutation, useQueryClient } from 'react-query';

const deleteSearch = (id) => {
  return axiosInstance
    .delete(`${interestLists}${id}`
    )
    .then((res) => res.data);
};

export function useDeleteMyCollection() {
  const queryClient = useQueryClient();

  return useMutation(({ id }) => deleteSearch(id), {
    onSettled: () => {
      queryClient.invalidateQueries(['user-owned-lists']);
    },
  });
}
