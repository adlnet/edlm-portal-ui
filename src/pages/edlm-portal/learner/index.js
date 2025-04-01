"use client";

import { Button, Card } from 'flowbite-react';
import { useAuth } from '@/contexts/AuthContext';
import { useInterestLists } from "@/hooks/useInterestLists";
import { useRouter } from 'next/router';
import { useUserOwnedLists } from "@/hooks/useUserOwnedLists";
import Carousel from 'react-grid-carousel'
import CollectionTable from '@/components/tables/collectionsTable/CollectionTable';
import CompetencyChart from '@/components/CompetencyChart';
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

  const spotlight = useSpotlightCourses();

  const interestLists = useInterestLists();
  const ownedLists = useUserOwnedLists();

  const [lunchNLearn, setLunchNLearn] = useState(null);

  // Searching for launch and learn plans
  useEffect(() => {
    const lunchNLearnList = 
      interestLists?.data?.find(list => list.name === 'Lunch & Learns') || 
      ownedLists?.data?.find(list => list.name === 'Lunch & Learns');
    setLunchNLearn(lunchNLearnList);
  }, [interestLists, ownedLists]);

  // Mock data for development
  const mockInProgressCourses = [
    { id: 1, title: 'AI Ethics', status: 'In Progress' },
    { id: 2, title: 'NLP', status: 'In Progress' },
    { id: 3, title: 'Machine Learning', status: 'In Progress'},
    { id: 4, title: 'Deep Learning', status: 'In Progress'},
    { id: 5, title: 'Data Science', status: 'In Progress'},
  ];

  const columns = [
    {label: 'COURSES', accessor: 'title'},
    {label: 'COURSES STATUS', accessor: 'status'},
  ]

  const mockCompetencyData = [
    { name: 'Operating & System Design', courses:4, hours: 4 },
    { name: 'Acquisition & Requirements Process', courses: 2, hours: 3 },
    { name: 'Policy Development & Implementation', courses: 3, hours: 5 },
    { name: 'Test Planning, Execution & Reporting', courses: 2, hours: 2 },
    { name: 'Data Management & Reporting', courses: 2, hours: 3 },
    { name: 'TEMP/T&E Strategy & Development', courses: 2, hours: 3 },
    { name: 'Modeling & Stimulation VV&A', courses: 2, hours: 3 },
    { name: 'Software', courses: 2, hours: 3 },
    { name: 'Full Spectrum Survivability & Lethality', courses: 2, hours: 3 },
    { name: 'Artificial Intelligence', courses: 2, hours: 3 },
    { name: 'Leadership', courses: 2, hours: 3 }
  ];
  
  const mockCompetencyColor = {
    'Operating & System Design': '#E8EAA1',
    'Acquisition & Requirements Process': '#00AAA0',
    'Policy Development & Implementation': '#5068C3',
    'Test Planning, Execution & Reporting': '#927FBF',
    'Data Management & Reporting': '#F7C873',
    'TEMP/T&E Strategy & Development': '#E29578',
    'Modeling & Stimulation VV&A': '#CCF186',
    'Software': '#3b445b',
    'Full Spectrum Survivability & Lethality': '#307672',
    'Artificial Intelligence': '#694B7C',
    'Leadership': '#BADFDB'
  }

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
                  <Button className="flex ml-32 justify-center bg-blue-900 hover:bg-blue-600" onClick={() => router.push(`/learner/lists/${lunchNLearn?.id}`)}>
                    View more
                  </Button>
                </Card>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        <div className='flex flex-row mt-10 h-100'>
          <div className='flex flex-row w-full'>
            <div className='w-1/2 bg-white shadow-md rounded-lg justify-between mr-5'> 
              <div className='p-4 text-xl font-bold'>Pick Up Where you Left Off</div>
              <div className='p-4 -mt-10'>              
                <CollectionTable data={mockInProgressCourses} edit={false} columns={columns} rowsPerPage={5}/>
              </div>
              <div className="flex justify-end -mt-4">
                <Button className="m-4 bg-white-900 text-blue-800 text-sm hover:bg-blue-600" onClick={() => window.location.href = 'https://moodle-dote.deloitteopenlxp.com/my/courses.php'}>
                    View more
                </Button>
              </div>
            </div>
            <div className='w-1/2 bg-white shadow-md rounded-lg'>
            <div className='flex flex-row p-4 text-xl font-bold'>Learning Summary</div>
              <div className="flex flex-row items-center">
                <div className='ml-2 mt-6'>
                  <CompetencyChart
                    data={mockCompetencyData}
                    colors={mockCompetencyColor}
                  />
                </div>
                <div className="flex flex-col pl-4 w-1/4 items-center text-center">
                  <div className=' text-3xl text-blue-800 font-bold'>3</div>
                  <div className='pb-2 text-sm text-gray-500'>Courses Completed</div>
                  <div className='text-3xl text-blue-800 font-bold'>43</div>
                  <div className='pb-2 text-sm text-gray-500'>In Progress Courses</div>
                  <div className='text-3xl text-blue-800 font-bold'>2</div>
                  <div className='pb-4 text-sm text-gray-500 '>Upcoming Courses</div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="m-4 bg-white-900 text-blue-800 text-sm hover:bg-blue-600 mt-10" onClick={() => router.push('/edlm-portal/learner/learningSummary')}>
                    View more
                </Button>
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
              {spotlight && spotlight.data?.map((course) => {
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
