'use strict';

import { Button } from 'flowbite-react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import ActiveCompleteTab from '@/components/buttons/ActiveCompleteTab';
import DefaultLayout from "@/components/layouts/DefaultLayout";
import LearningJourneyCard from "@/components/cards/LearningJourneyCard";
import React, { useState } from 'react';

export default function LearningPlan() {

  const mockLearningJourneys = [
    { id: 0, name: 'Job Development', progress: 50, length: 'Short-Term Plan', created: '9/19/2025' },
    { id: 1, name: 'My Learning Plan', progress: 70, length: 'Long-Term Plan', created: '10/15/2022' },
    { id: 2, name: 'Another Plan', progress: 60, length: 'Short-Term Plan', created: '9/19/2025' },
    { id: 3, name: 'More Development', progress: 100, length: 'Long-Term Plan', created: '10/15/2022' },
    { id: 4, name: 'One More Plan', progress: 100, length: 'Short-Term Plan', created: '9/19/2025' },
    { id: 5, name: 'Last Job Development', progress: 75, length: 'Long-Term Plan', created: '10/15/2022' },
  ]

  // const mockLearningJourneysComp = [
  //   { id: 0, name: 'Job Development', progress: 100, length: 'Short-Term Plan', created: '9/19/2025' },
  //   { id: 1, name: 'My Learning Plan', progress: 100, length: 'Long-Term Plan', created: '10/15/2022' },
  // ]

  // const mockLearningJourneys = []

  // const mockLearningJourneys = [
  //   { id: 0, name: 'Short-term Plan', progress: 50, time: '1-2 years' }
  // ]

  const mockOnboardingJourneys = [
    { id: 2, name: 'Phase I (30 Days)', progress: 55, length: 'DOT&E', description: 'Items for my job in 2025.'},
    { id: 3, name: 'Phase II (60 Days)', progress: 60, length: 'DOT&E', description: 'Things to do in 2025.' },
    { id: 4, name: 'Phase III (90 Days)', progress: 75, length: 'DOT&E', description: 'Other tasks for me.' }
  ]

  const activeJourneys = mockLearningJourneys.filter(journey => journey.progress < 100);
  
  const router = useRouter();

  const tabs = ['Active', 'Completed'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          <div className='mb-8'>
            <h1 className='text-2xl font-bold leading-normal text-gray-900 mb-4'>Learning Plans</h1>
            <h2 className=''> Manage and track your individual development plans. </h2>
          </div>

          <ActiveCompleteTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={tabs}
          />

          <div className='mt-4 mb-4 leading-tight'>
            <h1 className="text-xl font-bold pb-4 text-gray-900">Individual Development Plan</h1>
            <p className="text-gray-900 pb-4">
              Create personalized learning journeys tailored to your career goals and skill gaps. 
              These self-directed plans help you identify development areas, set learning objectives, 
              and track progress toward your professional aspirations within DOT&E.
            </p>
          </div>

          <div className='grid grid-cols-3 w-100 mb-6 flex-wrap gap-4'>
            
            {mockLearningJourneys?.map((journey, idx) => {
              if (journey.progress < 100 && selectedTab=='Active') {
                return <LearningJourneyCard key={idx} journey={journey} />
              }else if (journey.progress >= 100 && selectedTab=='Completed'){
                return <LearningJourneyCard key={idx} journey={journey} />
              }else{
                return null
              }
            })}

            {activeJourneys.length === 0  && selectedTab=='Active' && (
              <div className='flex flex-col w-100 justify-center items-center border border-dashed rounded-lg pt-4 pb-10 shadow hover:shadow-lg transition shadow min-h-36'>
                <ClipboardDocumentListIcon class="h-7 w-7 text-gray-700 mb-4" />
                <div className='text-center pb-6'>
                  <p className='text-gray-700 pb-3 font-bold'>  No plans yet </p>
                  <p className='text-xs text-gray-800'> Create a new plan to get started</p>
                </div>
                <button className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-blue-800 hover:bg-blue-600" 
                        onClick={() => {router.push('/edlm-portal/learner/learningPlan/developmentPlan')}}
                >
                  + Create New Plan
                </button>
              </div>
            )}

          </div>

          <div className='text-right pr-4'>
            <button className="text-blue-600 text-lg" 
                    onClick={() => {router.push('/edlm-portal/learner/learningPlan/developmentPlan')}}
            >
              + Create New Plan
            </button>
          </div>

          {/* Learning Phases Section */}
          <div className='mb-4 mt-10 leading-tight'>
            <h1 className="text-xl font-bold text-gray-900 mb-4">DOT&E Onboarding Plans</h1>
            <p className="text-gray-900 pb-4"> 
              This Learning Plan phase onboards new AOs and familiarizes them with DOT&E policies and procedures 
              by providing a robust foundation through comprehensive onboarding requirements and policy resources. 
              This phase will ensure that new AOs gain a thorough understanding of the organizational standards, 
              operational guidelines, and essential procedures necessary for their roles.
            </p>
          </div>

          <div className='grid grid-cols-3 w-100 mb-6 gap-4'>
            
            {mockOnboardingJourneys?.map((journey, idx) => {
              if (journey.progress < 100 && selectedTab=='Active') {
                return <LearningJourneyCard key={idx} journey={journey} />
              }else if (journey.progress >= 100 && selectedTab=='Completed'){
                return <LearningJourneyCard key={idx} journey={journey} />
              }else{
                return null
              }
            })}

          </div>        
        </div>
      </div>
    </DefaultLayout>
  )
}
