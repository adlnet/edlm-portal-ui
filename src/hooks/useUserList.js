'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { interestLists } from '@/config/endpoints';
import { useQuery } from 'react-query';
import { QueryClient } from 'react-query';

const getUserList = (id, setCurrentListInfo) => {
  if (!id) return null;
  return () => axiosInstance.get(interestLists + id).then((res) => {
    setCurrentListInfo({
      name: res.data?.name,
      description: res.data?.description,
      experiences: res.data?.experiences,
      public: res.data?.public,
    })
  }
  );
};

export function useUserList(id, setCurrentListInfo) {
  const queryClient = new QueryClient();
  return useQuery(['list', id], getUserList(id, setCurrentListInfo), {
    refetchOnReconnect: true,
    onSuccess: (data) => {
      // add each of the hits to the query client as a list
      // the hit.id is the same as the interest list id
      data?.forEach((hit) => {
        queryClient.setQueryData(['list', hit.id], hit);
      });
    },
  });
}
