'use strict';

import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useEffect, useMemo } from 'react';
import { useList } from '@/hooks/useList';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import { removeHTML } from '@/utils/cleaning';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import LockClose from '@/public/icons/lockClose.svg';
import lockOpen from '@/public/icons/lockOpen.svg';
import CollectionTable from '@/components/tables/collectionsTable/CollectionTable';

export function getServerSideProps(context) {
  const { listId } = context.query;
  return {
    props: {
      listId,
    },
  };
}

export default function ListsView({ listId }) {
  const router = useRouter();

  // user data
  const { user } = useAuth();

  const list = useList(parseInt(listId));
  const config = useConfig();
  
  const columns = [
    {label: 'TITLE', accessor: 'title'},
    {label: 'INSTRUCTOR', accessor: 'instructor'},
    {label: 'COURSE START DATE', accessor: 'date'},
    {label: 'DURATION', accessor: 'duration'}
  ]

  // prepare the experience data
  const data = useMemo(() => {
    const courses = []
    for (let i = 0; i < list?.data?.experiences.length; i++){
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

  console.log('data: ', data)

  // verify a user is logged in otherwise redirect to home page
  useEffect(() => {
    // if the user is not logged in, redirect to the home page
    if (!user) router.push('/');
    if (list.isError && list.error.response.status === 401)
      return router.push('/401');
    if (list.isError && list.error.response.status === 403)
      return router.push('/403');
  }, []);

  const visitCourse = useCallback((course) => {
    if (!user) return;
    const context = {
      actor: {
        first_name: user?.user?.first_name,
        last_name: user?.user?.last_name,
      },
      verb: {
        id: 'https://w3id.org/xapi/acrossx/verbs/explored',
        display: 'explored',
      },
      object: {
        id: `${window.origin}/learner/course/${course.meta.metadata_key_hash}`,
        definitionName: course.Course.CourseTitle,
        description: course.Course.CourseShortDescription,
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: course.meta.metadata_key_hash,
    };
    xAPISendStatement(context);
    router.push(`/learner/course/${course.meta.metadata_key_hash}`);
  }, []);

  const isOwned = user?.user?.id === list?.data?.owner?.id;

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <a href={isOwned ? '/learner/lists/owned' : '/learner/lists/subscribed'}className="text-[#3892f3] text-sm font-medium font-['Inter'] leading-[21px]  hover:underline">
              {isOwned ? 'My Collections' : 'My Subscriptions'}
              </a>
              <ChevronRightIcon className="w-3 h-3 relative" />
              <div className="justify-center items-center flex">
                <span className="text-gray-500 text-sm font-medium font-['Inter'] leading-[21px]">{list?.data?.name}</ span>
              </div>
            </div>
            {isOwned && (
              <button
                className='h-8 px-3 py-2 bg-white rounded-lg border border-[#263f9d] justify-center items-center gap-2 inline-flex hover:bg-blue-50 text-[#1f3764] text-xs font-normal leading-none'
                onClick={() => {
                  router.push('/learner/lists/edit/' + listId);
                }}
              >
                Edit
              </button>
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
          <div className='h-[101px] mt-4 bg-[#f4f3f6] p-4 rounded-lg'>
            <p className='text-black text-base font-normal leading-normal'>{list?.data?.description || 'No description provided.'}</p>
          </div>
           {/* Collections Table component */}
          <CollectionTable data={data} columns={columns} deleteCourse={null} rowsPerPage={4}/>
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
