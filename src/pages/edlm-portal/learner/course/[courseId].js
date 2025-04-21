'use strict';

import { AcademicCapIcon, 
         BuildingStorefrontIcon, 
        CalendarIcon, 
        ChevronRightIcon, 
        ClockIcon, 
        ComputerDesktopIcon, 
        CurrencyDollarIcon, 
        InformationCircleIcon, 
        Square3Stack3DIcon,
        UserIcon } from '@heroicons/react/24/solid';
import { axiosInstance } from '@/config/axiosConfig';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { useCourse } from '@/hooks/useCourse';
import { useMoodleSession } from '@/hooks/useMoodleSession';
import { useMoreCoursesLikeThis } from '@/hooks/useMoreCoursesLikeThis';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import SaveModal from '@/components/modals/SaveModal';
import ShareButton from '@/components/buttons/ShareBtn';

function RelatedCourses({ id }) {
  const moreLikeThis = useMoreCoursesLikeThis(id);
  if (moreLikeThis?.data?.hits < 1) return null;
  return (
    <div className='col-span-1 md:col-span-12 flex flex-col justify-center w-full -mt-14 px-2 max-w-7xl mx-auto'>
      <div className="text-[#1b1128] text-2xl font-bold leading-normal mt-12">
        Related Courses
        <div className='flex justify-center w-full overflow-x-hidden my-4 max-w-7xl mx-auto'>
          <div className='inline-flex overflow-x-auto gap-2 px-1 pb-4 custom-scroll mb-4'>
            {moreLikeThis.data?.hits?.map((course) => (
              <CourseSpotlight course={course} key={course.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getComps(subjects){

  const comps = subjects?.split(',');
  
  let i = 1;
  while ( i < comps?.length){
    //Trimming whitespace 
    comps[i] = comps[i]?.trim();

    //Accounting for comp #4 with commas
    if (comps[i][0] !== 'C'){
      comps[i-1] = comps[i - 1] + ', ' + comps[i] + ',' + comps[i + 1];
      comps.splice(i, i+1);
      i--;
    }
    
    i++
  }
  return comps
}

export default function Course() {
  const router = useRouter();
  const { user } = useAuth();
  const routeflag = true;

  // state of the fetching
  const course = useCourse(router.query?.courseId);
  const config = useConfig();

  // For moodle
  const moodleSession = useMoodleSession();
  const [isSessionValidated, setIsSessionValidated] = useState(false);

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
      subject: removeHTML(getDeeplyNestedData(
        config.data?.course_information.course_subject,
        course.data
      )),
      duration: getDeeplyNestedData(
        config.data?.course_information?.course_time,
        course.data
      ),
      cost: course.data?.p2881_course_profile?.Cost,
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

  const handleClick = useCallback(() => {
    if (!user) return;

    const context = {
      actor: {
        first_name: user?.user?.first_name,
        last_name: user?.user?.last_name,
      },
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/registered',
        display: 'enrolled',
      },
      object: {
        definitionName: data?.title,
        description: data?.description,
        id: `${window.origin}/edlm-portal/learner/course/${router.query?.courseId}`,
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: router.query?.courseId,
    };

    xAPISendStatement(context);

    window.open(data?.url, '_blank, noopener, noreferrer');

  }, [router.query?.courseId, data?.title, data?.description, user, data?.url, moodleSession]);

  const handleRoute = useCallback(() => {
    if(!routeflag){
      router.back();
      return;
    }
    router?.query?.keyword ? router.push(`/edlm-portal/learner/search/?keyword=${router?.query?.keyword}&p=${router?.query?.p}`) : router.push('/edlm-portal/learner/search'); 
  });

  const validateMoodleSession = useCallback(() => {
    if (isSessionValidated) return Promise.resolve();

    return axiosInstance.get('/my/', { maxRedirects: 0 })
      .then(() => {
        console.log('Moodle session validated with /my/');
        setIsSessionValidated(true);
      })
      .catch((error) => {
        console.log('Moodle session validation attempt completed');
        setIsSessionValidated(true);
      });
  }, [isSessionValidated]);

  // Get Moodle session
  useEffect(() => {
    // Only get moodle session if the course enroll URL is 
    // from the Moddle staging environment (current window location hostname)
    // P1 moodle is at the root
    if (data?.url && data.url.includes(window.location.hostname)) {
      moodleSession.mutate(null, {
        onSuccess: () => {
          validateMoodleSession();
        },
        onError: (error) => {
          console.error('Failed to initialize Moodle session on page load');
        }
      });
    }
  }, [data, moodleSession]);
  
  return (
    <DefaultLayout>
      {/* content */}
      <div className='bg-white shadow-md py-0 mb-5 rounded-xl mx-4 overflow-clip'>
        <div className='flex max-w-7xl px-4 mx-auto gap-8 mt-4'>
          <div className='w-full'>
            <div className='flex flex-row items-center gap-2 mt-4 mb-2 text-sm'>
              <button className='text-blue-600' onClick={handleRoute}>Search </button> 
              <ChevronRightIcon className='h-3 w-3'/>
              {data?.title}
            </div>
            <div className='flex justify-between items-center'>
              <h1 className='font-semibold text-2xl my-2'>
                {data?.title || 'Not Available'}
              </h1>
              <div className='flex gap-2'>
                <ShareButton
                  id={router.query?.courseId}
                  courseTitle={data?.title}
                  courseDescription={data?.description}
                />
                <SaveModal courseId={router.query?.courseId} title={data?.title} />
              </div>
            </div>
            <p className='flex my-2 text-sm'>
              <InformationCircleIcon className='h-4 my-0.5 text-blue-900' /> <strong className='italic'>Course Code:&nbsp;</strong>
              <span className='italic'>{data?.code || 'Not Available'}</span>
              <CurrencyDollarIcon className='h-4 pl-10 my-0.5 text-blue-900 italic' /> <strong className='italic'>Course Cost:&nbsp;</strong>
              <span className='italic'>{data?.cost || 'Not Available'}</span>
            </p>
            <p className='mt-2 text-sm'>{data?.description || 'Not available'}</p>
            <div className='flex flex-row w-1/4 mt-6 gap-4 '>
              {competencies?.map((comp) => {
                return (
                  <span key={comp.id} className='flex flex-row'>
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
            rel='noopener noreferrer'
            href={data?.url}
            target='_blank'
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            Go to Enrollment
          </a>
        </div>

        {/* Details divider */}
        <div id='details-divider' className='flex max-w-screen bg-gray-200 mt-4 text-nowrap'>
          <div className='inline-flex overflow-x-scroll mx-0 px-2 py-4 justify-around custom-scroll'>
            <div className='flex items-center min-w-dvh gap-6'>
              <div className='flex justify-center items-center gap-1 w-1/8 pl-20'>
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
              <div className='flex justify-center items-center w-1/2 gap-1'>
                <ComputerDesktopIcon className='h-10 text-blue-900' />
                <span>
                  <div className='text-xs font-semibold'>Modality</div>
                  <div className='text-xs'>
                    {data?.delivery || 'Not Available'}
                  </div>
                </span>
              </div>
              <div className='flex justify-center items-center w-1/3 gap-1'>
                <UserIcon className='h-10 text-blue-900' />
                <span>
                  <div className='text-xs font-semibold'>Instructor</div>
                  <div className='text-xs'>
                    {data?.instructor || 'Not Available'}
                  </div>
                </span>
              </div>
              <div className='flex justify-center items-center w-1/4 gap-1'>
                <AcademicCapIcon className='h-10 text-blue-900' />
                <span>
                  <div className='text-xs font-semibold'>Course Proficiency</div>
                  <div className='text-xs'>
                    {data?.proficiency || 'Not Available'}
                  </div>
                </span>
              </div>
              <div className='flex justify-center items-center w-1/2 gap-1'>
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
        {data?.details.map((detail) => {
          return (
            <div
              key={detail.id}
              className='grid grid-cols-5 w-full max-w-7xl px-4 mt-5 mx-auto'
            >
              <h2 className='min-w-max col-span-1 font-semibold'>
                {detail.title}
              </h2>
              <p className='col-span-4'>{detail?.content || 'Not Available'}</p>
            </div>
          );
        })}
        </div>
        {/* Related courses */}
        <RelatedCourses id={router.query?.courseId} />
      </div>
    </DefaultLayout>
  );
}
