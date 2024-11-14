'use strict';

import { searchUrl } from '@/config/endpoints';
import { tenMinutes } from '@/config/timeConstants';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import queryString from 'querystring';
import { axiosInstance } from '@/config/axiosConfig';

const getSearchResults = (searchTerm) => {
  return axiosInstance.get(searchTerm).then((res) => res.data);
};

function makePath(params) {
  return `${searchUrl}?${queryString.stringify(params)}`;
}

/**
 * Hook to get search results
 * @returns the state of the url, a setter for the url, and all the attributes from the query
 */

export function useCompetencySearch(queryObject) {
  const router = useRouter();

  // state of the search term
  const [url, setNewUrl] = useState(makePath(router?.query));

  // set new search term
  const setUrl = (queryParams) => {
    setNewUrl(makePath(queryParams));
  };

  // access to the client
  const queryClient = useQueryClient();

  const searchQuery = useQuery(['search', url], () => getSearchResults(url), {
    staleTime: tenMinutes,
    onSuccess: (data) => {
      // add each of the hits to the query client as a course
      // the hit.meta.id is the same as the metadata_key_hash
      data?.hits.forEach((hit) => {
        queryClient.setQueryData(['competency', hit.meta.id], hit); //Not sure if changing this is corredt?
      });
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) return;
    searchQuery.refetch();
    return () => {
      isMounted = false;
    };
  }, [queryObject, url]);

  // return the state of the url, the setter, and all the attributes from the query
  return {
    url,
    setUrl,
    ...searchQuery,
  };
}