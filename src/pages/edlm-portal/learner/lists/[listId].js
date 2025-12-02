'use strict';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import { useEffect, useMemo } from 'react';
import { useList } from '@/hooks/useList';
import { useRouter } from 'next/router';
import CollectionTable from '@/components/tables/collectionsTable/CollectionTable';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Image from 'next/image';
import Link from 'next/link';
import LockClose from '@/public/icons/lockClose.svg';
import lockOpen from '@/public/icons/lockOpen.svg';

export default function ListsView() {
  const router = useRouter();

  // user data
  const { user } = useAuth();

  const config = useConfig();

  const listId = router.isReady ? router.query.listId : null;

  const list = useList(Number.parseInt(listId));

  const columns = [
    {label: 'TITLE', accessor: 'title'},
    {label: 'INSTRUCTOR', accessor: 'instructor'},
    {label: 'COURSE START DATE', accessor: 'date'},
    {label: 'DURATION', accessor: 'duration'}
  ]

  // prepare the experience data
  const data = useMemo(() => {
    const courses = []
    for (let i = 0; i < list?.data?.experiences?.length; i++){
      const course = {
          id: (list?.data?.experiences[i]?.meta?.metadata_key_hash),
          title: removeHTML(
            getDeeplyNestedData(
                config.data?.course_information?.course_title,
                list?.data?.experiences[i]
            )
          ),
          instructor: getDeeplyNestedData(
            config.data?.course_information?.course_instructor,
            list?.data?.experiences[i]
          ),
          date: getDeeplyNestedData(
            config.data?.course_information.course_startDate,
            list?.data?.experiences[i]
          ),
          duration: getDeeplyNestedData(
            config.data?.course_information?.course_time,
            list?.data?.experiences[i]
          )
        };
      courses.push(course)
    }
    return courses
  },[list.isSuccess, list.data]);

  useEffect(() => {
    if (list.isError && list.error.response.status === 401)
      return router.push('/edlm-portal/401');
    if (list.isError && list.error.response.status === 403)
      return router.push('/edlm-portal/403');
  }, []);

  const isOwned = user?.user?.id === list?.data?.owner?.id;

  const previousPage = router.query.previousPage || 'Home';

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button onClick={() => router.back()} className="text-[#3892f3] text-sm font-medium  leading-[21px]  hover:underline">
                {previousPage}
              </button>
              <ChevronRightIcon className="w-3 h-3 relative" />
              <div className="justify-center items-center flex">
                <span className="text-gray-500 text-sm font-medium  leading-[21px]">{list?.data?.name}</ span>
              </div>
            </div>
            {isOwned && (
              <div className='relative rounded-lg p-[0.05rem] bg-gradient-to-l from-blue-900 to-cyan-400'>
                <button
                  className='h-8 px-3 py-2 bg-white rounded-lg border  border-gray-200 justify-center items-center gap-2 inline-flex hover:bg-blue-50 text-[#1f3764] text-xs font-normal leading-none'
                  onClick={() => {
                    router.push('/edlm-portal/learner/lists/edit/' + listId);
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className='flex justify-between items-center mt-1'>
            <div className="text-gray-900 text-2xl font-bold leading-normal">{list?.data?.name}</div>
          </div>
          {/* Owner, update date and privacy status */}
          <div className='flex gap-4 text-sm mt-2 text-gray-900'>
            <span>
              <span className='font-bold'>Created By: </span>
              {list?.data?.owner?.first_name} {list?.data?.owner?.last_name}
            </span>
            <span>
              <span className='font-bold'>Updated: </span>
              {new Date(list?.data?.modified).toLocaleDateString()}
            </span>
            <span className='flex flex-row font-medium gap-2'>
              <Image src={list?.data?.public ? lockOpen : LockClose} alt='Lock Icon' className='w-4 h-4' />
              <span>{list?.data?.public ? 'Public' : 'Private'}</span>
            </span>
          </div>
          {/* description section of the list */}
     <div className='min-h-[101px] mt-4 bg-[#f4f3f6] p-4 rounded-lg'>
            <p className='text-black text-base font-normal leading-normal'>{list?.data?.description || 'No description provided.'}</p>
          </div>
           {/* Collections Table component */}
          <CollectionTable data={data} columns={columns} edit={false} rowsPerPage={4}/>
          {/* When there are no courses */}
          {list.isSuccess && list?.data?.experiences.length === 0 && (
            <div className='text-center font-medium py-2 bg-white/90 rounded-b'>
              No courses added yet.
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
