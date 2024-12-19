'use strict';

import { ClockIcon, 
         UserIcon, 
        BuildingStorefrontIcon, 
        CalendarIcon, 
        ComputerDesktopIcon, 
        AcademicCapIcon, 
        InformationCircleIcon, 
        CurrencyDollarIcon, 
        Square3Stack3DIcon } from '@heroicons/react/24/solid';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import { useCourse } from '@/hooks/useCourse';
import { useMemo, useCallback, useEffect } from 'react';
import { useMoreCoursesLikeThis } from '@/hooks/useMoreCoursesLikeThis';
import { useRouter } from 'next/router';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import ShareButton from '@/components/buttons/ShareBtn';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import SaveModal from '@/components/modals/SaveModal';
import FlowbiteAccordion from '@/components/fAccordion';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import DefaultLayout from '@/components/layouts/DefaultLayout';


function RelatedCourses({ id }) {
  const moreLikeThis = useMoreCoursesLikeThis(id);
  if (moreLikeThis?.data?.hits < 1) return null;
  return (
    <>
      <div className='bg-white-200 mt-6 font-bold block font-sans p-4'>
        <div className='w-full gap-10 max-w-7xl text-xl mx-auto'>Related Courses</div>
      </div>
      <div className='flex justify-center w-full overflow-x-hidden my-4 max-w-7xl mx-auto'>
        <div className='inline-flex overflow-x-auto gap-2 px-1 custom-scroll mb-4'>
          {moreLikeThis.data?.hits?.map((course, index) => (
            <CourseSpotlight course={course} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

function getComps(subjects){

  const comps = subjects?.split(',');
  
  for (let i = 1; i < comps?.length; i++){
    //Trimming whitespace 
    comps[i] = comps[i]?.trim();
    //Accounting for comp #4 with commas
    if (comps[i][0] !== 'C'){
      comps[i-1] = comps[i - 1] + ', ' + comps[i] + ',' + comps[i + 1];
      let removed = comps.splice(i, i+1);
      i--;
    }
  }
  return comps
}

export default function Course() {
  const router = useRouter();
  const { user } = useAuth();

  // state of the fetching
  const course = useCourse(router.query?.courseId);
  const config = useConfig();

  // prepare the course data
  const data = useMemo(() => {
    if (!course.isSuccess || !config.isSuccess) return null;
    return {
      title: removeHTML(
        getDeeplyNestedData(
          config.data?.course_information?.course_title,
          course.data
        )
      ),
      date: {
        start: getDeeplyNestedData(
          config.data?.course_information?.course_startDate,
          course.data
        )?.replace(' ', '').split('T')[0],
        end: getDeeplyNestedData(
          config.data?.course_information?.course_endDate,
          course.data
        )?.replace(' ', '').split('T')[0],
      },
      description: removeHTML(
        getDeeplyNestedData(
          config.data?.course_information?.course_description,
          course.data
        )
      ),
      url: getDeeplyNestedData(
        config.data?.course_information?.course_url,
        course.data
      ),
      code: getDeeplyNestedData(config.data?.course_information?.course_code, course.data),
      photo:
        getDeeplyNestedData('Course_Instance.Thumbnail', course.data) ||
        getDeeplyNestedData(config.data?.course_information?.course_thumbnail, course.data),

      provider: getDeeplyNestedData(config.data?.course_information?.course_provider, course.data),
      instructor: getDeeplyNestedData(
        config.data?.course_information?.course_instructor,
        course.data
      ),
      delivery: getDeeplyNestedData(
        config.data?.course_information?.course_deliveryMode,
        course.data
      ),
      subject: getDeeplyNestedData(
        config.data?.course_information.course_subject,
        course.data
      ),
      duration: getDeeplyNestedData(
        config.data?.course_information?.course_time,
        course.data
      ),
      cost: course.data.p2881_course_profile.Cost,
      details: config.data?.course_highlights?.map((highlight) => {
        return {
          title: highlight.display_name,
          content: removeHTML(
            getDeeplyNestedData(highlight.field_name, course.data)
          ),
        };
      }),
    };
  }, [course.isSuccess, course.data, config.isSuccess, config.data]);
 
  const competencies = getComps(data?.subject)
  console.log('Competencies: ', competencies)

  const handleClick = useCallback(() => {
    if (!user) return;
    console.count('enrollment button clicked');

    const context = {
      actor: {
        first_name: user?.user?.first_name || 'anonymous',
        last_name: user?.user?.last_name || 'user',
      },
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/registered',
        display: 'enrolled',
      },
      object: {
        definitionName: data?.title,
        description: data?.description,
        id: `${window.origin}/learner/course/${router.query?.courseId}`,
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: router.query?.courseId,
    };

    xAPISendStatement(context);
  }, [router.query?.courseId, data?.title, data?.description, user]);

  console.log(data);

  return (
    <DefaultLayout>
      {/* content */}
      <div className='bg-white shadow-md py-0 mb-5 rounded-xl mx-4 overflow-clip'>
        <div className='flex max-w-7xl px-4 mx-auto gap-8 mt-4'>
          <div className='w-full'>
            <div className='flex flex-row items-center gap-2 mt-4 mb-2 text-sm'>
              <button className='text-blue-600' onClick={() => router.back()}>Search </button> 
              <ChevronRightIcon className='h-3 w-3'/>
              {data?.title}
            </div>
            <div className='flex justify-between items-center'>
              <h1 className='font-semibold text-2xl my-2'>
                {data?.title || 'Not Available'}
              </h1>
              <div className='flex gap-4 '>
                <ShareButton
                  id={router.query?.courseId}
                  courseTitle={data?.title}
                  courseDescription={data?.description}
                />
                <SaveModal courseId={data?.meta?.id} title={data?.title || data?.Course?.CourseTitle} />
              </div>
            </div>
            <p className='flex my-2 text-sm'>
              <InformationCircleIcon className='h-4 my-0.5 text-blue-900' /> <strong className='italic'>Course Code:&nbsp;</strong>
              <span className='italic'>{data?.code || 'Not Available'}</span>
              <CurrencyDollarIcon className='h-4 pl-10 my-0.5 text-blue-900 italic' /> <strong className='italic'>Course Cost:&nbsp;</strong>
              <span className='italic'>{data?.cost || 'Not Available'}</span>
            </p>
            <p className='mt-2 text-sm'>{data?.description || 'Description not available'}</p>
            <div className='flex flex-row w-1/4 mt-6 gap-4 '>
              {competencies?.map((comp) => {
                return (
                  <span className='flex flex-row'>
                    <Square3Stack3DIcon className='h-20 pr-4 text-blue-800 opacity-85' />
                    <div className='text-sm'>
                      <b className='flex flex-row gap-8'>Competency </b>
                      {comp}
                    </div>
                  </span>
              )})
              }
            </div>
          </div>
        </div>

        <div className='justify-end grid max-w-7xl px-4 mx-auto mt-2'>
          <a
            className='min-w-max whitespace-nowrap p-2 text-center text-white hover:shadow-md rounded-xl bg-blue-900 hover:bg-blue-600  font-medium transform transition-all duration-75 ease-in-out focus:ring-2 ring-blue-400 outline-none'
            href={data?.url}
            rel='noopener noreferrer'
            target='_blank'
            onClick={handleClick}
          >
            Go to Enrollment
          </a>
        </div>

        {/* Details divider */}
        <div id='details-divider' className='bg-gray-200 mt-4'>
          <div className='flex max-w-100 mx-0 py-4 px-2 justify-around'>
            <div className='flex items-center min-w-max gap-8'>
              <div className='flex justify-center items-center gap-1'>
                <BuildingStorefrontIcon className='h-10 text-blue-900' />
                <span>
                  <div className='text-xs font-semibold'>Provider</div>
                  <div className='text-xs'>
                    {data?.provider || 'Not Available'}
                  </div>
                </span>
              </div>
              <div className='flex justify-center items-center gap-1'>
                <ClockIcon className='h-10 text-blue-900' />
                <span>
                  <div className='text-xs font-semibold'>Duration</div>
                  <div className='text-xs'>
                    {data?.duration || 'Not Available'}
                  </div>
                </span>
              </div>
              <div className='flex justify-center items-center gap-1'>
                <ComputerDesktopIcon className='h-10 text-blue-900' />
                <span>
                  <div className='text-xs font-semibold'>Modality</div>
                  <div className='text-xs'>
                    {data?.delivery || 'Not Available'}
                  </div>
                </span>
              </div>
              <div className='flex justify-center items-center gap-1'>
                <UserIcon className='h-10 text-blue-900' />
                <span>
                  <div className='text-xs font-semibold'>Instructor</div>
                  <div className='text-xs'>
                    {data?.instructor || 'Not Available'}
                  </div>
                </span>
              </div>
              <div className='flex justify-center items-center gap-1'>
                <AcademicCapIcon className='h-10 text-blue-900' />
                <span>
                  <div className='text-xs font-semibold'>Course Proficiency</div>
                  <div className='text-xs'>
                    {data?.proficiency || 'Basic/ Knowledgeable'}
                  </div>
                </span>
              </div>
              <div className='flex justify-center items-center gap-1'>
                <CalendarIcon className='h-10 text-blue-900' />
                <span>
                  <div className='text-xs font-semibold'>Start Date: <text className='text-sm font-normal'>{data?.date?.start || '09/24/2024'}</text></div>
                  <div className='text-xs font-semibold'>End Date: <text className='text-sm font-normal'>{data?.date?.end || '11/05/2025'}</text></div>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Extra Details */}
        <div className='pt-5 grid gap-4'>
        {data?.details.map((detail, index) => {
          return (
            <div
              key={detail.title + index}
              className='grid grid-cols-5 w-full max-w-7xl px-4 mt-5 mx-auto'
            >
              <h2 className='min-w-max col-span-1 font-semibold'>
                {detail.title}
              </h2>
              <p className='col-span-4'>{detail.content || 'Not Available'}</p>
            </div>
          );
        })}
        </div>
        {/* <div className='flex flex-col max-w-7xl mx-auto p-4 justify-between'>
          <h1 className='font-bold text-2xl'>Associated Modules</h1>
          <h2 className='font-semibold text-grey-900 opacity-50'>{mockData.length} total modules</h2>
          <h3 className='mb-6'>To successfully complete this course, all course modules listed below must be reviewed in their entirety.</h3>
          {mockData.map((data, index) => {
            if (index > 3) {
              return (
                <div className='border rounded-md'>
                  {(showCourseFlag) ? <FlowbiteAccordion acctitle={data.accTitle} accdescription={data.accDescription} /> : <></>}
                </div>
              );
            }
            return (
              <div className='border rounded-md'>
                <FlowbiteAccordion acctitle={data.accTitle} accdescription={data.accDescription} />
              </div>
            )
          })}
          <button onClick={()=>{setShowCourseFlag(!showCourseFlag)}} className='w-full h-10 border rounded-lg text-white bg-blue-900'>Show {showCourseFlag ? "Less" : "More"} Courses</button>

        </div> */}

        {/* Related courses */}
        <RelatedCourses id={router.query?.courseId} />
      </div>
    </DefaultLayout>
  );
}
