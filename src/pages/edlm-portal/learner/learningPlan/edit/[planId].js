'use-strict';

import { ArrowLongRightIcon, ChevronRightIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { timeframeOptions } from '@/utils/dropdownMenuConstants';
import { useRouter } from 'next/router';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import DeletePlanModal from '@/components/modals/DeletePlanModal';
import DevelopmentGoalEdit from '@/components/cards/DevelopmentGoalEdit';
import Image from 'next/image';
import React, {useState}from 'react';

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
        id:0,
        title: 'How to Lead 101',
        status: 'Completed',
        hours: '24',
        institute: 'Leader U'
      },
      {  
        id:1,
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
        id:2,
        title: 'Software Development Lifecycle',
        status: 'In Progress',
        hours: '48',
        institute: 'Tech University'
      },
      {  
        id:3,
        title: 'Software System Engineering',
        status: 'Enrolled',
        hours: '36',
        institute: 'Software University'
      },
      {
        id:4,
        title: 'Data Structures and Algorithms',
        status: 'In Progress',
        hours: '48',
        institute: 'Tech University'
      },
      {  
        id:5,
        title: 'Applies Model-Based Systems Engineering (MBSE)',
        status: 'Enrolled',
        hours: '36',
        institute: 'Software University'
      }  
    ]  
  }
];

const mockLearningJourneys = [
  { id: 0, name: 'Job Development', progress: 50, length: 'Short-term (1-2 years)', created: '9/19/2025' },
  { id: 1, name: 'My Learning Plan', progress: 70, length: 'Long-term (3-4 years)', created: '10/15/2022' },
  { id: 2, name: 'Another Plan', progress: 60, length: 'Short-term (1-2 years)', created: '9/19/2025' },
  { id: 5, name: 'Last Job Development', progress: 75, length: 'Long-term (3-4 years)', created: '10/15/2022' },
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

  const [planName, setPlanName] = useState(plan?.name);
  const [timeframe, setTimeframe] = useState(plan?.length);

  const [delPlanModalOpen, setDelPlanModalOpen] = useState(false);

  const handlePlanDelete = () => {
    // handle plan delete code
    console.log('Plan deleted!');
  };

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

          <div className='flex flex-row text-blue-700 items-center gap-2 mb-4'>
            <button onClick={() => {router.push('/edlm-portal/learner/learningPlan/')}}>Learning Plans</button>
            <ChevronRightIcon className='h-4 w-4'></ChevronRightIcon>
            <p>{planName}</p>
            <ChevronRightIcon className='h-4 w-4'></ChevronRightIcon>
            <p>Edit Plan</p>
            <ChevronRightIcon className='h-4 w-4 text-gray-400'></ChevronRightIcon>
            <p className='text-gray-400'>Review & Save</p>
          </div>
 
          <h1 className='text-2xl text-gray-900 font-bold'>Edit Plan</h1>

          <div className='w-full flex flex-row items-center justify-end pb-2 pr-1'>
            <button
              className='text-blue-700 hover:text-blue-400'
              onClick={()=> setDelPlanModalOpen(true)}
            >
              <div className='flex flex-row'>
                <TrashIcon class='h-5 w-5'/>
                <p className='pl-1'>Delete</p>
              </div>
            </button>
          </div>

          <DeletePlanModal
            open={delPlanModalOpen}
            onClose={() => setDelPlanModalOpen(false)}
            onDelete={handlePlanDelete}
          />

          <div className='text-red-800 flex flex-row items-center'>
            <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
            <p className='pl-1'>= Required</p>
          </div>

          <h1 className='text-2xl text-gray-900 font-bold pt-2'> Plan Name</h1>

          {/* Plan Name and Date Section */}
          <div className="mt-2 grid gap-6 md:grid-cols-2 pt-2 text-gray-900 pb-8 border-b">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-bold">
                Plan Name <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
              </span>
              <TextInput
                id="planName"
                placeholder="Create a name for your learning plan"
                value={planName}
                onChange={e => setPlanName(e.target.value)}
              />
              <span className='flex items-center gap-2 text-sm text-gray-600'>
                Create a name for your learning plan
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-bold">
                Completion Timeframe <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
              </span>
              <CustomDropdown
                value={timeframe}
                onChange={e => setTimeframe(e.target.value)}
                options={timeframeOptions}
                placeholder="When do you aim to complete this plan?"
              />
            </div>
          </div>

          <h1 className='text-2xl text-gray-900 font-bold pt-8 pb-2'> Skill Areas </h1>

          {/* Development Goal Accordion Cards */}
          {mockGoalSet1?.map((goal) => (
            <DevelopmentGoalEdit key={goal.id} goal={goal} initiallyOpen={false} timeframe={timeframe}/>            
          ))}

          <div className="flex mt-10 pl-2 border-t pt-10 items-center">
            <button
              onClick={()=> {console.log("add another goal presses")}}
              className="flex items-center gap-2 text-blue-700 text-base font-bold leading-[22.4px] hover:text-blue-400 transition-all bg-transparent border-none"
            >
              <PlusIcon className="w-5 h-5" />
              <p className='pt-0.5'>Add Another Competency</p>
            </button>
          </div>         


          {/* Cancel and Continue Buttons */}
          <div className='flex flex-row justify-end pt-8 items-center'>
            <button 
              className='flex justify-center text-blue-700 hover:text-blue-300 pr-6' 
              onClick={() =>{router.push(`/edlm-portal/learner/learningPlan/${planId}`)}}
            >
              Cancel 
            </button>
            <Button 
              className='flex justify-center bg-blue-900 hover:bg-blue-600 ml-2'
              onClick={() =>{console.log('Edit pushed')}}
            >
              Save & Continue
            </Button>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
}