'use strict';

import { ClockIcon, UserIcon, BuildingStorefrontIcon, CalendarIcon, ComputerDesktopIcon, AcademicCapIcon, InformationCircleIcon, CurrencyDollarIcon, Square3Stack3DIcon } from '@heroicons/react/24/solid';

import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import { useCourse } from '@/hooks/useCourse';
import { useMemo, useCallback } from 'react';
import { useMoreCoursesLikeThis } from '@/hooks/useMoreCoursesLikeThis';
import { useRouter } from 'next/router';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SaveModalCoursePage from '@/components/modals/SaveModalCoursePage';
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
            <div className='bg-white-200 mt-10 font-bold block font-sans p-4 '>
                <div className='w-full gap-10 max-w-7xl text-2xl mx-auto'>Related Courses</div>
            </div>
            <div className='flex justify-center w-full overflow-x-hidden my-10 max-w-7xl mx-auto'>
                <div className='inline-flex overflow-x-auto gap-2 py-4 custom-scroll '>
                    {moreLikeThis.data?.hits?.map((course, index) => (
                        <CourseSpotlight course={course} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}
const mockData = [
    {
        accTitle: "Action Officer Course: Introduction",
        accDescription: "By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
    {
        accTitle: "Action Officer Course: DAS and Aquisiton Contracts",
        accDescription: "By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
    {
        accTitle: "Action Officer Course: JCIDS and Requirements",
        accDescription: "Description: By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
    {
        accTitle: "Action Officer Course: Introduction to IDA Support to DOT&E",
        accDescription: "By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
    {
        accTitle: "Action Officer Course: The famous fifth course",
        accDescription: "By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
    {
        accTitle: "Action Officer Course: The famous sixth course",
        accDescription: "By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
]

export default function LunchAndLearnPage() {
    const router = useRouter();
    const { user } = useAuth();

    // state of the fetching
    const course = useCourse(router.query?.courseId);
    const config = useConfig();
    const [showCourseFlag, setShowCourseFlag] = useState(false);


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
            // details: config.data?.course_highlights?.map((highlight) => {
            //   return {
            //     title: highlight.display_name,
            //     content: removeHTML(
            //       getDeeplyNestedData(highlight.field_name, course.data)
            //     ),
            //   };
            // }),
        };
    }, [course.isSuccess, course.data, config.isSuccess, config.data]);

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
            <div className='flex max-w-7xl px-4 mx-auto gap-8 mt-10 mb-10 rounded-xl shadow-lg bg-white-100 '>
                <div className='w-full'>
                    <div className='flex flex-row items-center gap-2 mb-2'>
                        <button className='text-blue-600' onClick={() => router.back()}>My Subscriptions </button>
                        <ChevronRightIcon className='h-4 w-4' />
                        {/* {data?.title} */}
                        Lunch & Learn
                    </div>
                    <div className='flex justify-between items-center'>
                        <h1 className='mt-3 font-semibold text-4xl'>
                            {data?.title || 'Lunch & Learn'}
                        </h1>
                    </div>
                    <p className='flex my-6'>
                        <strong>Created by:&nbsp;</strong>
                        {data?.code || 'Name'}
                        <strong className='pl-10'>Updated:</strong>
                        {data?.cost || '11/7/2024'}
                        <p className='pl-10'>Public</p>


                    </p>
                    
                    <p className='rounded-lg bg-gray-200 shadow-lg p-4 mb-10'>{data?.description || 'Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Ipsum a arcu cursus vitae. Sapien et ligula ullamcorper malesuada proin libero. Nibh mauris cursus mattis molestie a iaculis at. Ullamcorper a lacus vestibulum sed arcu non odio euismod. Dui accumsan sit amet nulla. Aenean et tortor at risus viverra adipiscing at in. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Vel turpis nunc eget lorem dolor sed viverra.'}</p>



                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
            </div>

            {/* Dates */}
            <div className='justify-end grid max-w-7xl px-4 mx-auto mt-10'>
            </div>

            {/* Details divider */}
           
            {/* Extra Details */}
            {/* <div className='py-10 grid gap-4'>
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
</div> */}
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
                <button onClick={() => { setShowCourseFlag(!showCourseFlag) }} className='w-full h-10 border rounded-lg text-white bg-blue-900'>Show {showCourseFlag ? "Less" : "More"} Courses</button>

            </div> */}
            {/* Related courses */}
            <RelatedCourses id={router.query?.courseId} />
        </DefaultLayout>
    );
}
