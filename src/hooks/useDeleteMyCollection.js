'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';
import { interestLists } from '@/config/endpoints';

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
