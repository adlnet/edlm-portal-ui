'use-strict';

import { ChevronLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import DevelopmentGoal from '@/components/cards/DevelopmentGoal';
import React from 'react';

const mockGoalSet1 = [
  { 
    id: 0, 
    name: 'Leadership', 
    desc: 'This is the leadership description of the sample goal data.', 
    currLvl: 'Advanced', 
    targetLvl: 'Mastery', 
    priority: 'Medium', 
    courses: [
      {
        title: 'How to Lead 101',
        status: 'Completed',
        hours: '24',
        institute: 'Leader U'
      },
      {  
        title: 'Team Goal Setting',
        status: 'In Progress',
        hours: '48',
        institute: 'Leadership Institute'
      } 
    ]  
  },
  { 
    id: 1, 
    name: 'Software', 
    desc: 'This is the software goal description and is only a sample it does not actually mean anything at all its just filler words.', 
    currLvl: 'Intermediate', 
    targetLvl: 'Advanced', 
    priority: 'High', 
    courses: [
      {
        title: 'Software Development Lifecycle',
        status: 'In Progress',
        hours: '48',
        institute: 'Tech University'
      },
      {  
        title: 'Software System Engineering',
        status: 'Enrolled',
        hours: '36',
        institute: 'Software University'
      } 
    ]  
  }
];

const mockLearningJourneys = [
  { id: 0, name: 'Short-term Plan', progress: 50, time: '1-2 years', created: '9/15/2024', devGoals: 2, learningActivities: 4},
  { id: 1, name: 'Long-term Plan', progress: 100, time: '3-4 years', created: '9/15/2024', devGoals: 3, learningActivities: 6},
];

const mockOnboardingJourneys = [
  { id: 2, name: 'Phase I (30 Days)', progress: 100, time: '30 days' },
  { id: 3, name: 'Phase II (60 Days)', progress: 60, time: '60 days' },
  { id: 4, name: 'Phase III (90 Days)', progress: 75, time: '90 days' },
];

export default function Plan() {

  const router = useRouter();
  const { planId } = router.query;

  // Find the plan in either list
  const plan =
    mockLearningJourneys.find(j => String(j.id) === planId) ||
    mockOnboardingJourneys.find(j => String(j.id) === planId);

  if (!plan) {
    return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          No Learning Plans with that ID were found.
        </div>
      </div>
    </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>

          <button
            className="border border-gray-400 px-4 py-1 hover:bg-gray-200 mb-4 rounded-lg text-sm font-bold center" 
            onClick={() => {router.push('/edlm-portal/learner/learningPlan/')}}
          >
            <div className='flex flex-row items-center gap-4'><ChevronLeftIcon class="h-4 w-4"/> Back to My Learning Journeys </div>
          </button>

          <div>
            <h1 className='text-lg font-bold'>{plan.name} Details</h1>
            <p className=''> View your learning plan details and track progress toward your development goals. </p>
          </div>

          <div className='bg-blue-50 rounded-lg border border-blue-500 p-4 mt-5'>
            <div className='plan-title flex flex-row'>
              <div className='mt-2 pr-3'>
                <DocumentTextIcon class="h-6 w-6 text-blue-700"/>
              </div>
              <div>
                <div className='text-blue-900 m-0 spacing-none'>{plan.name}</div>
                <div className='text-blue-700 m-0 spacing-none'>Created on {plan.created}</div>
              </div>             
            </div>
            <div className='plan-details flex flex-row pt-6 text-blue-700 pb-2'>
              <div className='w-1/4 text-center'> 
                <div className='text-xl'>{plan.time}</div>
                <div>Completion Timeframe</div> 
              </div>
              <div className='w-1/4 text-center'> 
                <div className='text-xl'>{plan.devGoals}</div>
                <div>Development Goals</div> 
              </div>
              <div className='w-1/4 text-center'> 
                <div className='text-xl'>{plan.learningActivities}</div>
                <div>Learning Activities</div> 
              </div>
              <div className='w-1/4 text-center'> 
                <div className='text-xl'>{plan.progress}%</div>
                <div>Progress</div> 
              </div>
            </div>
            <div className='progress-bar w-full bg-gray-200 rounded-full h-2'>
              <div 
                className='bg-green-600 h-2 rounded-full transition-all duration-300'
                style={{ width: `${plan.progress}%`}}>
              </div>
            </div>
          </div>

          <div className='pt-6 pb-2'> Your Development Goals</div>

          {mockGoalSet1?.map((goal, idx) => (
            <DevelopmentGoal key={idx} goal={goal}/>            
          ))}

          <div className='p-4 border rounded-lg border-gray-300 mt-6'>
            <div className='font-bold'>Continue Your Learning Journey</div>
            <div className='text-gray-500 pb-3'>Keep progressing with your development plan and explore additional resources.</div>
            <div className='flex flex-row gap-4'>
              <div className='flex flex-wrap w-1/3 border border-gray-300 rounded-lg p-3'>
                <div className='pb-2'>Explore Course Catalog</div>
                <div className='text-sm pb-2'>Browse additional courses to supplement your current learning plan.</div>
                <button 
                  className='border border-gray-300 rounded-lg py-1 px-3 text-sm hover:bg-gray-200' 
                  onClick={()=> {}}
                > Browse Catalog </button>
              </div>
              <div className='w-1/3 border border-gray-300 rounded-lg p-3'>
                <div className='pb-2'>Add from Collections</div>
                <div className='text-sm pb-2'>Access your saved collections for curated learning resources.</div>
                <button 
                  className='border border-gray-300 rounded-lg py-1 px-3 text-sm hover:bg-gray-200' 
                  onClick={()=> {}}
                > View Collections </button>
              </div>
              <div className='w-1/3 border border-gray-300 rounded-lg p-3'>
                <div className='pb-2'>Create New Plan</div>
                <div className='text-sm pb-2'>Start a new development plan for additional competencies.</div>
                <button 
                  className='border border-gray-300 rounded-lg py-1 px-3 text-sm hover:bg-gray-200'
                  onClick={()=> {}}
                > Create Plan </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
}