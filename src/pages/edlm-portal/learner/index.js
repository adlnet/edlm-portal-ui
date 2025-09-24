"use client";

import { Button, Card, Spinner } from 'flowbite-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourseProgressDetail } from '@/hooks/useCourseProgressDetail';
import { useInterestLists } from "@/hooks/useInterestLists";
import { useRouter } from 'next/router';
import { useUserOwnedLists } from "@/hooks/useUserOwnedLists";
import ActiveCompleteTab from '@/components/buttons/ActiveCompleteTab';
import Carousel from 'react-grid-carousel'
import CollectionTable from '@/components/tables/collectionsTable/CollectionTable';
import CourseSpotlightCarouselCard from '@/components/cards/CourseSpotlightCarousel';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Head from 'next/head'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import armyImage from '@/public/learnImage.jpeg'
import armyImage1 from '@/public/listsImage.png'
import armyImage2 from '@/public/lunchLearn.png'
import headerImage from '@/public/welcomeHomePhoto.png';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const {
    data: courseProgressData,
    isLoading: courseProgressLoading
   } = useCourseProgressDetail()

  const spotlight = useSpotlightCourses();

  const interestLists = useInterestLists();
  const ownedLists = useUserOwnedLists();

  const [lunchNLearn, setLunchNLearn] = useState(null);

  const tabs = ['Active Courses', 'Completed Courses'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  // Searching for launch and learn plans
  useEffect(() => {
    const lunchNLearnList = 
      interestLists?.data?.find(list => list.name === 'Lunch & Learns') || 
      ownedLists?.data?.find(list => list.name === 'Lunch & Learns');
    setLunchNLearn(lunchNLearnList);
  }, [interestLists, ownedLists]);

  const mockActiveCourseProgressData = {
    course: 'Leadership Fundamentals',
    startDate:'Jan 30, 2025',
    endDate: 'Mar 30, 2025',
    competencies: ['Leadership', 'AI'],
  };

  const mockCompletedCourseProgressData = {
    course: 'Software Architecture Basics',
    startDate:'Oct 1, 2024',
    endDate: 'Dec 15, 2024',
    competencies: ['Software'],
  };

  // Mock data for development
  const inProgressCourses = courseProgressData?.in_progress_courses?.length > 0 
    ? courseProgressData?.in_progress_courses?.map((course, i) => ({
      id: i + 1,
      title: course?.course_name || mockActiveCourseProgressData.course,
      status: 'In Progress',
      url: course?.course_id,
      startDate: course?.start_date || mockActiveCourseProgressData.startDate,
      endDate: course?.end_date || mockActiveCourseProgressData.endDate,
      competencies: course?.competencies || mockActiveCourseProgressData.competencies,
    })) : [{
      id: 1,
      title: mockActiveCourseProgressData.course,
      startDate: mockActiveCourseProgressData.startDate,
      endDate: mockActiveCourseProgressData.endDate,
      competencies: mockActiveCourseProgressData.competencies,
      isUnClickable: true
    }];

  const completedCourses = courseProgressData?.completed_courses?.length > 0
   ? courseProgressData?.completed_courses?.map((course, i) => ({
      id: i + 1,
      title: course?.course_name || mockCompletedCourseProgressData.course,
      url: course?.course_id,
      startDate: course?.start_date || mockCompletedCourseProgressData.startDate,
      endDate: course?.end_date || mockCompletedCourseProgressData.endDate,
      competencies: course?.competencies || mockCompletedCourseProgressData.competencies
    })) : [{
      id: 1,
      title : mockCompletedCourseProgressData.course,
      startDate: mockCompletedCourseProgressData.startDate,
      endDate: mockCompletedCourseProgressData.endDate,
      competencies: mockCompletedCourseProgressData.competencies,
      isUnClickable: true
    }];

  const columns = [
    {label: 'COURSES', accessor: 'title'},
    {label: 'START DATE', accessor: 'startDate'},
    {label: 'END DATE', accessor: 'endDate'},
    {label: 'COMPETENCIES', accessor: 'competencies'}
  ];

  const renderLoading = loadingMessage => {
    if (courseProgressLoading) {
      return (
        <div className='flex flex-col items-center justify-center p-8'>
          <Spinner color='success' aria-label='Success spinner example' size='xl'/>
          <p className='mt-4'>{loadingMessage}</p>
        </div>
      );
    }
  };

  return (
    <DefaultLayout>
      <Head>
        <title>DOT&E Portal</title>
        <link rel="icon" href="/doteLogo.png" />
      </Head>

      <div className='flex flex-col p-6'>
        <div className='bg-white h-100 shadow-md rounded-lg '>

          <div className='flex flex-row justify-between'>
            <div className='w-1/2 m-5'> 
              <div className='pt-2 text-lg font-bold'>Welcome {user?.user?.first_name},</div>
              <div className='pt-2 text-gray-500'>This portal is designed to support your unique educational journey as you grow your career within DOT&E. Here, you&apos;ll find an immersive environment that caters to your learning needs inclusive of organized lists to manage your learning materials and resources, planning tools to match learning to career growth, and reporting to monitor progress and track achievements.</div>
              <div className='pt-12'>
              </div>
            </div>
            <div className='w-1/2 max-h-72'>
              <Image src={headerImage}  alt='' className='m-5 pr-10 object-fill h-60 w-90'/>
            </div>
          </div>
        </div>

        <div className='mt-10 pb-10 bg-white h-100 shadow-md rounded-lg '>
          <div className='flex flex-col'>
              <p className='text-xl font-semibold h-6 pt-4 pl-4'>Learning Action</p>
              <p className='flex pt-3 mt-4 pl-4 font-sans line-clamp-6 text-gray-500'>
                Structure your professional development through personalized learning plans 
              </p>
          </div>
          <div className="p-5 pt-4 mr-6">
          <Carousel
            cols={3}
            rows={1}
            gap={9}
            responsiveLayout={[
              {
                breakpoint: 1200,
                cols: 3
              },
              {
                breakpoint: 990,
                cols: 2
              }
            ]}
            mobileBreakpoint={670}
          >
              <Carousel.Item>
                <Card href="/edlm-portal/learner/learningPlan" className="w-80 h-fit rounded-xl" renderImage={() => <Image width={500} height={500} src={armyImage} alt="image 1" />}>
                  <h5 className="text-2xl font-bold justify-left tracking-tight text-gray-900 dark:text-white">
                    Learning Plan
                  </h5>
                  <p className="font-normal text-sm text-gray-600 dark:text-gray-400">
                    Learning Journeys are your structured pathway to professional development at DOT&E and are intended to guide newly hired Action Officers through Orientation.
                  </p>
                  <Button className="flex ml-32 justify-center bg-blue-900 hover:bg-blue-600">
                    View more
                  </Button>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card href='/edlm-portal/learner/lists/owned' className="w-80 h-full rounded-xl" renderImage={() => <Image width={500} height={500} src={armyImage1} alt="image 1" />}>
                  <h5 className="text-2xl font-bold text-left tracking-tight text-gray-900 dark:text-white">
                    My Collections
                  </h5>
                  <p className="font-normal mb-8 text-sm text-gray-600 dark:text-gray-400">
                    Access your saved and subscribed lists of learnings.
                  </p>
                  <Button className="flex ml-32 justify-center bg-blue-900 hover:bg-blue-600">
                    View more
                  </Button>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card href={`/edlm-portal/learner/lists/${lunchNLearn?.id}`} className="w-80 h-full rounded-xl" renderImage={() => <Image width={500} height={500} src={armyImage2} alt="image 1" />}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Lunch & Learns
                  </h5>
                  <p className="font-normal mb-8 text-sm text-gray-600 dark:text-gray-400">
                    Access saved recordings of DOT&E Lunch & Learns.
                  </p>
                  <Button className="flex ml-32 justify-center bg-blue-900 hover:bg-blue-600" onClick={() => router.push(`/edlm-portal/learner/lists/${lunchNLearn?.id}`)}>
                    View more
                  </Button>
                </Card>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        <div className='flex flex-row mt-10 h-100'>
          <div className='flex flex-row w-full'>
            <div className='w-full bg-white shadow-md rounded-lg justify-between mr-5'> 
              <div className='p-4 text-xl font-bold mb-4'>Pick Up Where You Left Off</div>
              <div className='p-4 -mt-4'>
                  {renderLoading("Loading your course progress...")
                    || (
                      <>
                        <ActiveCompleteTab
                          selectedTab={selectedTab}
                          setSelectedTab={setSelectedTab}
                          tabs={tabs}
                        />
                        {selectedTab === 'Active' ? (
                          <div className='-mt-4'>              
                            <CollectionTable data={inProgressCourses} edit={false} columns={columns} rowsPerPage={5} />
                          </div>
                        ) : (
                          <div className='-mt-4'>              
                            <CollectionTable data={completedCourses} edit={false} columns={columns} rowsPerPage={5} />
                          </div>
                        )}
                      </>
                    )}
              </div>
            </div>
          </div>
        </div>
 
        <div className='mt-10 pb-10 bg-white h-100 shadow-md rounded-lg '>
          <div className='flex flex-col'>
              <p className='text-xl font-semibold h-6 pt-4 pl-4'>Spotlight Courses</p>
              <p className='flex pt-3 mt-4 pl-4 font-sans line-clamp-6 text-gray-500'>
                Get started on your essential DOT&E courses
              </p>
          </div>

          <div className='flex flex-col justify-center w-full mt-4 px-2 max-w-7xl mx-auto '>
            <Carousel
              cols={3}
              rows={1}
              gap={1}
              responsiveLayout={[
                  {
                  breakpoint: 1200,
                  cols: 3
                  },
                  {
                  breakpoint: 990,
                  cols: 2
                  }
              ]}
              mobileBreakpoint={670}
            >
              {spotlight && Array.isArray(spotlight?.data) && spotlight?.data?.map((course) => {
                return(
                  <Carousel.Item key={course.id}>
                    <div className='flex justify-center w-full overflow-x-hidden mr-4'>
                      <CourseSpotlightCarouselCard course={course} key={course.meta.id} />
                    </div>
                  </Carousel.Item>)
              })}
            </Carousel>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </DefaultLayout>
  );
}
