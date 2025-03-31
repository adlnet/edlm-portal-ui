'use strict';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSaveSearchList } from '@/hooks/useSaveSearch';
import CollectionsLayout from '@/components/layouts/CollectionsLayout';
import SavedSearchTable from '@/components/tables/collectionsTable/SavedSearchTable';

export default function SavedSearches() {
  const { user } = useAuth();
  const { data, isSuccess, isLoading, isError, error } = useSaveSearchList();
  const router = useRouter();

  const columns = [
    {label: 'SEARCH TITLE', accessor: 'name'},
    {label: 'SEARCH TERMS', accessor: 'query'}
  ]

  useEffect(() => {
    if (!user) router.push('/edlm-portal');
    if (isError && error?.response.status === 401) router.push('/401');
    if (isError && error?.response.status === 403) router.push('/403');
  }, [isError]);

  return (
    <CollectionsLayout title={'Saved Search'}>
      <div className='mt-7 pb-5'></div>
      <div className='overflow-y-auto custom-scroll'>
        {isError && (
          <div className='text-center text-gray-600 bg-white'>
            There was an error loading your saved searches
          </div>
        )}
        {isLoading && (
          <div className='text-center text-gray-600 bg-white'>
            Loading...
          </div>
        )}
        {isSuccess && data?.length === 0 && (
          <div className='text-center w-full col-span-3'>
            <h2 className='text-lg font-medium px-2 pt-2'>
              You dont have any saved searches yet.
            </h2>
            <p className='inline-flex pt-8'>
              To save a search, head over to the search courses page and
              find save the search you want to keep.
            </p>
          </div>
        )}
        {isSuccess && data?.length > 0 && (
          <div>
            <SavedSearchTable data={data} columns={columns}/>
          </div>
        )}
      </div>
     </CollectionsLayout>
  );
}
