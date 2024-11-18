'use strict';

import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '../../contexts/AuthContext';
import { useMoreCoursesLikeThis } from '../../hooks/useMoreCoursesLikeThis';
import React, { useMemo } from 'react';
import SaveModal from '../modals/SaveModal';
import ViewBtn from '../buttons/ViewBtn';
import { useConfig } from '@/hooks/useConfig';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';

export default function MoreLikeThis({ course }) {
  const { data, isLoading } = useMoreCoursesLikeThis(course?.meta.id);
  const { user } = useAuth();
  const config = useConfig();

    // prepare the course data
    const preppedData = useMemo(() => {
      if (!config.isSuccess) return null;
      return {
        title: removeHTML(
          getDeeplyNestedData(
            config.data?.course_information?.course_title, course)
        ),
        date: {
          start: getDeeplyNestedData(
            config.data?.course_information?.course_startDate,
            course
          )?.replace(' ', '').split('T')[0],
          end: getDeeplyNestedData(
            config.data?.course_information?.course_endDate,
            course
          )?.replace(' ', '').split('T')[0],
        },
        description: removeHTML(
          getDeeplyNestedData(config.data?.course_information?.course_description, course)
        ),
        type: removeHTML(
          getDeeplyNestedData(config.data?.course_information?.course_type, course)
        ),
        time: removeHTML(
          getDeeplyNestedData(config.data?.course_information?.course_time, course)
        ),

        url: getDeeplyNestedData(
          config.data?.course_information?.course_url,
          course
        ),
        code: getDeeplyNestedData(config.data?.course_information?.course_code, course),
        photo:
          getDeeplyNestedData('Course_Instance.Thumbnail', course) ||
          getDeeplyNestedData(config.data?.course_information?.course_thumbnail, course),
  
        provider: getDeeplyNestedData(config.data?.course_information?.course_provider, course),
        instructor: getDeeplyNestedData(
          config.data?.course_information?.course_instructor,
          course
        ),
        delivery: getDeeplyNestedData(
          config.data?.course_information?.course_deliveryMode,
          course
        ),
        details: config.data?.course_highlights?.map((highlight) => {
          return {
            title: highlight.display_name,
            content: removeHTML(
              getDeeplyNestedData(highlight.field_name, course)
            ),
          };
        }),
      };
    }, [course?.isSuccess, course?.data, config.isSuccess, config.data]);

  // if loading
  if (isLoading) {
    return (
      <div className='animate-pulse'>
        <div className='w-full bg-white border rounded-md border-gray-200 p-4'>
          <div className='w-3/4 bg-gray-200 rounded-sm h-8'></div>
          <div className='bg-gray-200 h-32 rounded-sm mt-4'></div>
          <div className='grid grid-cols-5 gap-2 mt-4'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='grid grid-cols-5 gap-2 mt-2'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='grid grid-cols-5 gap-2 mt-2'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='grid grid-cols-5 gap-2 mt-2'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='flex justify-between mt-8'>
            <div className='inline-flex justify-start gap-2'>
              <div className='rounded-full h-6 w-6 bg-gray-200'></div>
              <div className='rounded-full h-6 w-6 bg-gray-200'></div>
            </div>
            <div className='rounded-l-2xl rounded-r-md h-6 w-10 bg-gray-200'></div>
          </div>
        </div>

        <div className='flex justify-center gap-2 mt-2'>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
        </div>
      </div>
    );
  }

  // if error
  else if (data.hits.length < 1) {
    return null;
  }

  // show suggested card
  return (
    <div>
      <span className={'text-gray-400 italic block pb-5 font-sans px-px'}>
        Similar Course
      </span>
      <div className='w-full bg-white border rounded-md border-gray-200 p-4 shadow'>
        <h1 className='text-lg font-semibold'>
          {preppedData?.title || data.hits[0].Course.CourseTitle}
        </h1>
        <p className='mt-4 font-sans line-clamp-6 text-sm'>
          {preppedData?.description || removeHTML(data.hits[0].Course.CourseShortDescription)}
        </p>
        <div className='flex flex-col gap-1 mt-4'>
          <div>
            <span className='font-semibold'>Course Code:&nbsp;</span>
            {preppedData?.code || data.hits[0].Course?.CourseCode || 'Not Available'}
          </div>
          <div>
            <span className='font-semibold'>Course Type:&nbsp;</span>
            {preppedData?.type || data.hits[0].Course?.CourseType || 'Not Available'}
          </div>
          <div>
            <span className='font-semibold'>Estimated Time:&nbsp;</span>
            {preppedData.time || data.hits[0].Course?.EstimatedCompletionTime || 'Not Available'}
          </div>
          <div>
            <span className='font-semibold'>Course Provider:&nbsp;</span>
            {preppedData.provider || data.hits[0].Course?.CourseProviderName || 'Not Available'}
          </div>
        </div>
        <div className='flex justify-between mt-10'>
          <div className='flex gap-2'>
            <ViewBtn
              id={data.hits[0].meta.id}
              courseTitle={preppedData?.title}
              courseDescription={preppedData?.description}
            />
          </div>
          {user && <SaveModal courseId={data.hits[0].meta.id} />}
        </div>
      </div>
    </div>
  );
}
