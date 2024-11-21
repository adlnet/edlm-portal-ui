'use strict';

import {
    ArchiveIcon,
} from '@heroicons/react/24/outline';
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
import { ClockIcon, UserIcon, BuildingStorefrontIcon, CalendarIcon, ComputerDesktopIcon, AcademicCapIcon, InformationCircleIcon, CurrencyDollarIcon, Square3Stack3DIcon } from '@heroicons/react/24/solid';
import SaveButton from '@/components/buttons/SaveBtn';
//import Accordion from '@/components/Accordion';
//import { Accordion } from "flowbite-react";
import FlowbiteAccordion from '@/components/fAccordion';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';

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
                        <CourseSpotlight course={course} key={course.meta.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

const mockData = [
    {
        accTitle: "Action Officer Course: Introduction",
        accDescription: "Description: By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
    {
        accTitle: "Action Officer Course: DAS and Aquisiton Contracts",
        accDescription: "Description: By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
    {
        accTitle: "Action Officer Course: JCIDS and Requirements",
        accDescription: "Description: By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
    {
        accTitle: "Action Officer Course: Introduction to IDA Support to DOT&E",
        accDescription: "Description: By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand"
    },
]

export default function CourseDetails() {
    const router = useRouter();
    const { user } = useAuth();

    const spotlight = useSpotlightCourses();


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
            // details: config.data?.course_highlights?.map((highlight) => {
            //     return {
            //         title: highlight.display_name,
            //         content: removeHTML(
            //             getDeeplyNestedData(highlight.field_name, course.data)
            //         ),
            //     };
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
                id: `${window.origin}/course/${router.query?.courseId}`,
            },
            resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
            resultExtValue: router.query?.courseId,
        };

        xAPISendStatement(context);
    }, [router.query?.courseId, data?.title, data?.description, user]);

    return (
        <>
            <Header />
            {/* content */}
            <div className='flex max-w-7xl px-4 mx-auto gap-8 mt-10'>
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-semibold text-4xl'>
                            {data?.title || 'Action Officer Course'}
                        </h1>
                        <div className='flex gap-4 '>
                            <ShareButton
                                id={router.query?.courseId}
                                courseTitle={data?.title}
                                courseDescription={data?.description}
                            />
                            <SaveButton
                                id={router.query?.courseId}
                                courseTitle={data?.title}
                                courseDescription={data?.description}
                            />
                        </div>
                    </div>
                    <p className='flex my-2'>
                        <InformationCircleIcon className='h-5  my-0.5' /> <strong>Course Code:&nbsp;</strong>
                        {data?.code || '202510-DNS-CTR101-01'}
                        <CurrencyDollarIcon className='h-5 pl-10 my-0.5' /> <strong>Course Cost:</strong>
                        {data?.code || '$312'}

                    </p>
                    <p>{data?.description || 'Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Ipsum a arcu cursus vitae. Sapien et ligula ullamcorper malesuada proin libero. Nibh mauris cursus mattis molestie a iaculis at. Ullamcorper a lacus vestibulum sed arcu non odio euismod. Dui accumsan sit amet nulla. Aenean et tortor at risus viverra adipiscing at in. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Vel turpis nunc eget lorem dolor sed viverra.'}</p>
                    <div className='flex  w-1/4 mt-10 gap-4 '>
                        <span className=''>
                            <Square3Stack3DIcon className='h-10 pr-4' />
                            <div className='text-sm font-semibold'>Competency</div>
                            <div className='text-sm'>
                                {data?.provider || 'Policy Development & Implementation'}
                            </div>
                        </span>
                        <span>
                            <Square3Stack3DIcon className='h-10 pr-4' />
                            <div className='text-sm font-semibold'>Competency</div>
                            <div className='text-sm'>
                                {data?.provider || 'Policy Development & Implementation'}
                            </div>
                        </span>
                        <span>
                            <Square3Stack3DIcon className='h-10 pr-4' />
                            <div className='text-sm font-semibold'>Competency</div>
                            <div className='text-sm'>
                                {data?.provider || 'Policy Development & Implementation'}
                            </div>
                        </span>
                    </div>



                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
            </div>

            {/* Dates */}
            <div className='justify-end grid max-w-7xl px-4 mx-auto mt-10'>
                {/* <span>
          <strong>Start Date:&nbsp;</strong>
          {data?.date?.start || 'Not Available'}
        </span>
        <span>
          <strong>End Date:&nbsp;</strong>
          {data?.date?.end || 'Not Available'}
        </span> */}
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
            <div id='details-divider' className='bg-gray-200 mt-4 '>
                <div className='flex max-w-7xl mx-auto p-4 justify-between'>
                    <div className='flex items-center min-w-max gap-8'>
                        <div className='flex justify-center items-center gap-2'>
                            <BuildingStorefrontIcon className='h-10' />
                            <span>
                                <div className='text-sm font-semibold'>Provider</div>
                                <div className='text-sm'>
                                    {data?.provider || 'Moodle'}
                                </div>
                            </span>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <ClockIcon className='h-10' />
                            <span>
                                <div className='text-sm font-semibold'>Duration</div>
                                <div className='text-sm'>
                                    {data?.details || '45 Min'}
                                </div>
                            </span>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <ComputerDesktopIcon className='h-10' />
                            <span>
                                <div className='text-sm font-semibold'>Modality</div>
                                <div className='text-sm'>
                                    {data?.delivery || 'Online, Self'}
                                </div>
                            </span>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <UserIcon className='h-10' />
                            <span>
                                <div className='text-sm font-semibold'>Instructor</div>
                                <div className='text-sm'>
                                    {data?.instructor || 'Anthony Scotti'}
                                </div>
                            </span>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <AcademicCapIcon className='h-10' />
                            <span>
                                <div className='text-sm font-semibold'>Course Proficiency</div>
                                <div className='text-sm'>
                                    {data?.delivery || 'Basic/ Knowledgeable'}
                                </div>
                            </span>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <CalendarIcon className='h-10' />
                            <span>
                                <div className='text-sm font-semibold'>Start Date: <text className='text-sm font-normal'>{data?.date?.start || '09/24/2024'}</text></div>
                                <div className='text-sm font-semibold'>End Date: <text className='text-sm font-normal'>{data?.date?.end || '11/05/2025'}</text></div>

                                {/* <div className='text-sm'>
                  {data?.instructor || 'Not Available'}
                </div> */}
                            </span>
                        </div>
                        {/* <SaveModalCoursePage courseId={router.query?.courseId} title={data?.title} /> */}
                    </div>
                </div>
            </div>
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
            <div className='flex flex-col max-w-7xl mx-auto p-4 justify-between'>
                <h1 className='font-bold text-2xl'>Associated Modules</h1>
                <h2 className='font-semibold text-grey-900 opacity-50'>{mockData.length} total modules</h2>
                <h3 className='mb-6'>To successfully complete this course, all course modules listed below must be reviewed in their entirety.</h3>
                {mockData.map((data) => {
                    return (
                        <div className='border rounded-md'>
                            {/* <Accordion acctitle={data.accTitle} accdescription={"Description: By the end of this module you will understand DOT&E authorities, responsibilities, and functions as defined by the law and DoD Directives; understand DOT&E organizational structures; align on the expectations to position yourself for success in DOT&E and gain the tools and skills to respond to OT&E and LFT&E demand."} /> */}
                            <FlowbiteAccordion acctitle={data.accTitle} accdescription={data.accDescription}/>
                        </div>
                    )
                })}
            </div>
            {/* Related courses */}
            {/* <RelatedCourses id={router.query?.courseId} /> */}
            {spotlight.isSuccess && spotlight.data.length > 0 && (
                <>
                <div className='bg-white-200 mt-10 font-bold block font-sans p-4 '>
                    <div className='w-full gap-10 max-w-7xl text-2xl mx-auto'>Related Courses</div>
                </div>
                <div className='flex justify-center w-full overflow-x-hidden my-10 max-w-7xl mx-auto'>
                <div className='inline-flex overflow-x-auto gap-2 py-4 custom-scroll '>
                    {spotlight.data.map((course) => {
                        return <CourseSpotlight course={course} key={course.meta.id} />;
                    })}
                    </div>
                </div>
                </>
            )}
            <Footer />
        </>
    );
}
