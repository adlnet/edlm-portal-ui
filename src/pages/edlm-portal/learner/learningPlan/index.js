'use strict';

import { Button, Card } from 'flowbite-react';
import DefaultLayout from "@/components/layouts/DefaultLayout";
import LearningJourneyCard from "@/components/cards/LearningJourneyCard";


export default function LearningPlan() {


  // // Card dropdown menu options
  // const getMenuItems = id => [
  //   {
  //     icon: <Image src={ShareIcon} alt='Share' />,
  //     label: 'Share',
  //     onClick: () => handleShare(id),
  //   },
  // ];

  // const handleShare = id => {
  //   navigator.clipboard.writeText(`${window.origin}/edlm-portal/learner/lists/${id}`)
  //   .then(() => {
  //     setCopy('Copied Successfully!');
  //     setTimeout(() => {
  //       setCopy('');
  //     }, 2000);
  //   })
  //   .catch(() => {
  //     setCopy('Failed to copy');
  //     setTimeout(() => {
  //       setCopy('');
  //     }, 2000);
  //   });
  // };


  // const mockLearningJourneys = [
  //   { id: 0, name: 'Short-term Plan', progress: 50, time: '1-2 years' },
  //   { id: 0, name: 'Long-term Plan', progress: 50, time: '3-4 years' },
  // ]

  // const mockLearningJourneys = []

  const mockLearningJourneys = [
    { id: 0, name: 'Short-term Plan', progress: 50, time: '1-2 years' }
  ]

  const mockOnboardingJourneys = [
    { id: 0, name: 'Phase I (30 Days)', progress: 100 },
    { id: 1, name: 'Phase II (60 Days)', progress: 60 },
    { id: 2, name: 'Phase III (90 Days)', progress: 75 }
  ]

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          <div className='mb-4'>
            <h1 className='text-2xl font-bold leading-normal text-gray-900'>My Learning Journeys</h1>
            <h2 className=''> Manage and track your individual development plans. </h2>
          </div>

          <div className='mb-4 rounded-lg bg-gray-100 p-4 leading-tight'>
            <h1 className="text-lg font-bold">Individual Development Plan</h1>
            <p className="">
              Create personalized learning journeys tailored to your career goals and skill gaps. 
              These self-directed plans help you identify development areas, set learning objectives, 
              and track progress toward your professional aspirations within DOT&E.
            </p>
          </div>

          <div className='flex flex-row w-100 mb-6 gap-4'>
            
            {mockLearningJourneys?.map((journey, idx) => {
              if (journey.progress < 100) {
                return <LearningJourneyCard key={idx} journey={journey} />
              }else {
                return null;
              }
            })}

            {mockLearningJourneys.length < 2 && (
              <div className='flex flex-grow justify-center items-center border border-dashed rounded-lg p-5 shadow hover:shadow-lg transition shadow min-h-36'>
                <Button className="flex justify-center bg-blue-900 hover:bg-blue-600" onClick={() => {}}>
                  + Create New Plan
                </Button>
              </div>
            )}
            
          </div>

          {/* Learning Phases Section */}
          <div className='mb-4 rounded-lg bg-gray-100 p-4 leading-tight'>
            <h1 className="text-lg font-bold">DOT&E Onboarding Plans</h1>
            <p className=""> 
              This Learning Plan phase onboards new AOs and familiarizes them with DOT&E policies and procedures 
              by providing a robust foundation through comprehensive onboarding requirements and policy resources. 
              This phase will ensure that new AOs gain a thorough understanding of the organizational standards, 
              operational guidelines, and essential procedures necessary for their roles.
            </p>
          </div>

          <div className='flex flex-row w-100 mb-6 gap-4'>
            
            {mockOnboardingJourneys?.map((journey, idx) => {
              if (journey.progress < 100) {
                return <LearningJourneyCard key={idx} journey={journey} />
              }else {
                return null;
              }
            })}

          </div>        
        </div>
      </div>
    </DefaultLayout>
  )
}
