'use strict';

import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useEffect, useMemo } from 'react';
import { useCourse } from '@/hooks/useCourse';
import { useList } from '@/hooks/useList';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import { removeHTML } from '@/utils/cleaning';
import DefaultLayout from '@/components/layouts/DefaultLayout';
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

  return (
    <DefaultLayout>
      <div className='flex justify-between items-center border-b'>
        <h1 className='font-semibold text-3xl pb-4 mt-10 border-b font-sans'>
          {list?.data?.name}
        </h1>
        {user?.user?.id === list?.data?.owner?.id && (
          <button
            className='items-center inline-flex gap-2 text-gray-500 rounded-md hover:shadow-md bg-gray-50 hover:bg-gray-400 hover:text-white px-4 py-2 border-gray-400 border-2 outline-none focus:ring-2 ring-gray-400'
            onClick={() => {
              router.push('/learner/lists/edit/' + listId);
            }}
          >
            Edit list
          </button>
        )}
      </div>
      <div className='flex justify-between font-sans text-lg mt-10'>
        <span>
          <span className='font-semibold'>Owner:&nbsp;</span>
          {list?.data?.owner?.email}
        </span>
        <span>
          <span className='font-semibold'>Updated:&nbsp;</span>
          {new Date(list?.data?.modified).toLocaleDateString()}
        </span>
      </div>
      <h2 className='border-b text-lg mt-10 font-semibold'>Description</h2>
      <p className='mt-2 min-h-[8rem] bg-white rounded p-2'>
        {list?.data?.description}
      </p>
      <h2 className='border-b text-lg mt-10 font-semibold'>Included Courses</h2>
      
      {/* Collections Table component */}
      <CollectionTable data={data} columns={columns} edit={false} rowsPerPage={4}/>
      
      {/* When there are no courses */}
      {list.isSuccess && list?.data?.experiences.length === 0 && (
        <div className='text-center font-medium py-2 bg-white/90 rounded-b'>
          No courses added yet.
        </div>
      )}
    </DefaultLayout>
  );
}
