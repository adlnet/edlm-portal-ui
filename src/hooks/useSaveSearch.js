'use strict';

import { useQuery } from 'react-query';

import { saveSearchOwnedUrl } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';

const getSavedSearch = (token) => {
  return () => axiosInstance.get(saveSearchOwnedUrl).then((res) => res.data);
};

export const useSaveSearchList = (token) => {
  return useQuery(['saved-search-list'], getSavedSearch(token), {
    retry: false,
  });
};
