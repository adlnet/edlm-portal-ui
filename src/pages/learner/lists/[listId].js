'use strict';

import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useEffect } from 'react';
import { useList } from '@/hooks/useList';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import LockClose from '@/public/icons/lockClose.svg';
import lockOpen from '@/public/icons/lockOpen.svg';

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
          {/* List Table */}
          <h2 className='border-b text-lg mt-10 font-semibold'>Included Courses</h2>
          <table className='w-full bg-white rounded-md overflow-hidden shadow mt-8'>
            <thead className='border-b'>
              <tr>
                <th className='text-left px-2 py-6 text-lg'>Title</th>
                <th className='text-left px-2 py-6 text-lg w-96'>Provider</th>
              </tr>
            </thead>
            <tbody>
              {list.isSuccess &&
                list?.data?.experiences.map((exp) => (
                  <tr
                    key={exp?.meta?.metadata_key_hash}
                    className='odd:bg-gray-100 even:bg-white'
                  >
                    <td className='p-2 overflow-hidden text-ellipsis'>
                      <button
                        className='hover:underline hover:text-blue-400
                        cursor-pointer w-full h-full text-left py-2'
                        onClick={(e) => visitCourse(exp)}
                      >
                        {exp?.Course?.CourseTitle}
                      </button>
                    </td>
                    <td className='p-2'>{exp?.Course?.CourseProviderName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
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
