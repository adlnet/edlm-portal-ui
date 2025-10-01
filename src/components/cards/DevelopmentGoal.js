'use-strict'

import { 
  Bars3Icon,
  ChevronDoubleDownIcon, 
  ChevronDoubleUpIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,    
} from '@heroicons/react/24/outline';

import React, { useState } from 'react';

function priorityIcon (priority){
  if (priority === 'Lowest') {
    return <ChevronDoubleDownIcon data-testid='priority-lowest' className='h-6 w-6 text-green-500'/>
  } else if (priority === 'Low') {
    return <ChevronDownIcon data-testid='priority-low' className='h-6 w-6 text-green-500'/>
  } else if (priority === 'Medium') {
    return <Bars3Icon data-testid='priority-medium' className='h-6 w-6 text-yellow-800'/>
  } else if (priority === 'High') {
    return <ChevronUpIcon data-testid='priority-high' className='h-6 w-6 text-green-500'/>
  } else if (priority === 'Highest') {
    return <ChevronDoubleUpIcon data-testid='priority-highest' className='h-6 w-6 text-red-500'/>
  } else{
    return; 
  }
}

export default function DevelopmentGoal({ goal }) {

  const [open, setOpen] = useState(true);

  return (
    <div className='border rounded-lg border-gray-300 mb-4'>
      <div className='flex flex-row justify-between border-b p-4'>
        <div className='flex gap-2 items-center'>
          {priorityIcon(goal.priority)}
          <h1 className='font-bold text-lg'>{goal.name}</h1>
        </div>
        <button 
          className=''
          onClick={() => setOpen(!open)}
        >
          {open ? (<ChevronUpIcon className='h-6 w-6 tex-gray-900'/>) : (<ChevronDownIcon className='h-6 w-6 tex-gray-900'/>)}
        </button>
      </div>
      {open && (
        <div>
          <div className='p-4 grid grid-cols-2 gap-4'>
            <div>
              <p className='text-gray-900 font-semibold pb-1'>Goal</p>
              <p className='text-gray-700'>{goal.desc}</p>
            </div>
            <div>
              <p className='text-gray-900 font-semibold pb-1'>Goal Timeline</p>
              <p className='text-gray-700'>{goal.timeline}</p>
            </div>
          </div>
          <div>
            {goal.ksaList.map((ksa, idx) => (
              <div key={idx} className='grid grid-cols-2 gap-4 p-4'>
                <div>
                  <p className='text-gray-900 font-semibold pb-1'>Knowledge, Skill, or Ability (KSA)</p>
                  <p className='text-gray-700'>{ksa.title}</p>
                </div>
                <div>
                  <p className='text-gray-900 font-semibold pb-1'>KSA Description</p>
                  <p className='text-gray-700'>{ksa.desc}</p>
                </div>
                <div>
                  <p className='text-gray-900 font-semibold pb-1'>Where You Are Now</p>
                  <p className='text-gray-700'>{ksa.currLvl}</p>
                </div>
                <div>
                  <p className='text-gray-900 font-semibold pb-1'>Where You Want To Be</p>
                  <p className='text-gray-700'>{ksa.targetLvl}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='grid grid-cols-2 p-4 gap-4'>
            <div>
              <p className='text-gray-900 font-semibold pb-1'>Resources & Support</p>
              <div className='flex flex-row flex-wrap'> 
                {goal.resources.map((resource, idx) => (
                  <div key={idx} className='bg-gray-100 rounded-md w-fit p-1 mr-1 mb-1'>
                    {resource}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className='text-gray-900 font-semibold pb-1'>Potential Obstacles</p>
              <div className='flex flex-row flex-wrap'> 
                {goal.obstacles.map((obstacle, idx) => (
                  <div key={idx} className='bg-gray-100 rounded-md w-fit p-1 mr-1 mb-1'>
                    {obstacle}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};
