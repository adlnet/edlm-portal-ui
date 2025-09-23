'use-strict';

import { ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon, DocumentTextIcon} from '@heroicons/react/24/outline';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import DevelopmentGoal from '@/components/cards/DevelopmentGoal';
import React from 'react';

const mockGoalSet1 = [
  { 
    id: 0, 
    name: 'Leadership', 
    desc: 'Lead a cross-functional project to improve team collaboration by March.', 
    priority: 'Highest', 
    timeline: '3-6 Months',
    resources: ['External professional networking', 'Mentorship from senior colleagues', 'Supervisor guidance and support'],
    obstacles: ['Limited time due to current workload', 'Completing work priorities and deadlines'],
    ksaList: [ 
      {
        title : '7.2 Collaboration and Partnerships', 
        desc : 'Inspires and fosters collaboration, partnership, team commitment, and trust inside and outside of DOT&E. Facilitates cooperation and motivates team members to accomplish group goals.',
        currLvl: 'Advanced', 
        targetLvl: 'Mastery', 
      },
      {
        title : '7.4 Creativity and Innovation', 
        desc : 'Develops new insights into situations; questions conventional approaches; encourages new ideas and innovations; designs and implements new or cutting-edge programs/processes.',
        currLvl: 'Basic', 
        targetLvl: 'Intermediate', 
      },
    ],
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
    desc: 'Take a software development competency test', 
    currLvl: 'Intermediate', 
    targetLvl: 'Advanced', 
    priority: 'High', 
    timeline: '1-2 Months',
    resources: ['Online Courses', 'Mentorship from external connections', 'Supervisor guidance and support'],
    obstacles: ['Cost of software courses', 'Completing work priorities and deadlines'],
    ksaList: [ 
      {
        title : '5.2 Software Development', 
        desc : 'Demonstrates an understanding of agile and DevSecOps methodologies and their associated terminologies for iterative software development. Further understands testing conducted throughout development. Identifies and understands limitations of testing conducted throughout the development for use in operational evaluations.',
        currLvl: 'Intermediate', 
        targetLvl: 'Mastery', 
      },
    ],
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
  { id: 0, name: 'Job Development', progress: 50, length: 'Short-Term Plan', created: '9/19/2025' },
  { id: 1, name: 'My Learning Plan', progress: 70, length: 'Long-Term Plan', created: '10/15/2022' },
  { id: 2, name: 'Another Plan', progress: 60, length: 'Short-Term Plan', created: '9/19/2025' },
  { id: 5, name: 'Last Job Development', progress: 75, length: 'Long-Term Plan', created: '10/15/2022' },
]


const mockOnboardingJourneys = [
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

          <div className='flex flex-row text-blue-700 items-center gap-2 mb-8'>
            <button onClick={() => {router.push('/edlm-portal/learner/learningPlan/')}}>Learning Plans</button>
            <ChevronRightIcon className='h-4 w-4'></ChevronRightIcon>
            <p>{plan.name}</p>
          </div>
 
          <div className='border border-gray-300 flex flex-row py-6 px-4 rounded-lg items-center justify-between mb-6'>  
            <h1 className='font-bold text-gray-900 text-xl'>{plan.name}</h1>
            <div className='text-sm bg-blue-50 text-blue-700 rounded-md px-2 py-1'>{plan.length}</div>
          </div>

          {mockGoalSet1?.map((goal, idx) => (
            <DevelopmentGoal key={idx} goal={goal}/>            
          ))}

          <div className='p-4 border rounded-lg border-gray-300 mt-6'>
            <div className='font-bold pb-6 text-xl text-gray-900'>Next Steps</div>
            <div className='text-gray-890 pb-3'>Keep progressing with your development plan and explore additional resources.</div>
            <div className='flex flex-row gap-4'>
              <div className='flex flex-col w-1/3 border border-gray-300 rounded-lg py-4 px-6 items-center'>
                <div className='pb-2 font-bold text-lg'>Track Your Progress</div>
                <div className='text-sm pb-8 flex-wrap text-center'>Monitor your development through the Learning Plan page and update your progress as you complete courses.</div>
                <button 
                  className='flex flex-row items-center gap-2 border border-blue-600 rounded-lg py-1 px-3 text-sm hover:bg-blue-100 text-blue-600'
                  onClick={()=> {}}
                > View My Plans <ArrowLongRightIcon className='h-4 w-4' /> </button>
              </div>
              <div className='flex flex-col w-1/3 border border-gray-300 rounded-lg p-3 py-4 px-6 items-center'>
                <div className='pb-2 font-bold text-lg'>Explore Course Catalog</div>
                <div className='text-sm pb-8 flex-wrap text-center'>Browse additional courses and resources to supplement your development plan with more learning opportunities.</div>
                <button 
                  className='flex flex-row items-center gap-2 border border-blue-600 rounded-lg py-1 px-3 text-sm hover:bg-blue-100 text-blue-600'
                  onClick={()=> {}}
                > Browse Collections <ArrowLongRightIcon className='h-4 w-4' /> </button>
              </div>
              <div className='flex flex-col w-1/3 border border-gray-300 rounded-lg p-3 py-4 px-6 items-center'>
                <div className='pb-2 font-bold text-lg'>Add from Collections</div>
                <div className='text-sm pb-8 flex-wrap text-center'>Access your saved collections to add curated courses and resources to enhance your development plan.</div>
                <button 
                  className='flex flex-row items-center gap-2 border border-blue-600 rounded-lg py-1 px-3 text-sm hover:bg-blue-100 text-blue-600'
                  onClick={()=> {}}
                > View Collections <ArrowLongRightIcon className='h-4 w-4' /> </button>
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-end pt-8'>
            <Button 
              className='flex justify-center bg-blue-100 text-blue-900 hover:bg-blue-300' 
              onClick={() =>{}}
            >
              Export 
            </Button>
            <Button 
              className='flex justify-center bg-blue-900 hover:bg-blue-600 ml-2' 
              onClick={() =>{router.push('/edlm-portal/learner/learningPlan/')}}
            >
              Return to Learning Plans
            </Button>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
}