'use-strict'

import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function DevelopmentGoal({ goal }) {

  let bgColor = '';
  if (goal.priority === 'Low') {
    bgColor = 'bg-green-500';
  } else if (goal.priority === 'Medium') {
    bgColor = 'bg-yellow-500';
  } else if (goal.priority === 'High') {
    bgColor = 'bg-red-500';
  } else {
    bgColor = 'bg-gray-200';
  }

  return (
    <div className='p-4 border rounded-lg border-gray-300 mb-4'>
      <div className='flex flex-row justify-between'>
        <div className=''>{goal.name}</div>
        <div className={`rounded-lg ${bgColor} py-1 px-2 text-xs`}>{goal.priority} Priority</div>
      </div>
      <div className='flex flex-row justify-left text-gray-500 gap-2 pt-2'>
        <div>Current: {goal.currLvl}</div> 
        <ArrowLongRightIcon className="h-6 w-6" />
        <div>Target: {goal.targetLvl}</div>
      </div>
      <div className='pt-6'> Goal Description </div>
      <div className='text-sm text-gray-500'> {goal.desc} </div>
      <div className='pt-4 pb-2'> Selected Courses ({goal.courses.length})</div>
      {goal.courses.map((course, idx) => (
        <div key={idx} className='bg-gray-100 rounded-md p-2 mb-2 flex flex-row justify-between items-center'>
          <div>
            <div className='text-sm font-bold'>{course.title}</div>
            <div className='text-xs'>{course.hours} hours <span> • </span> {course.institute}</div>
          </div>
          <div className='text-xs border border-gray-400 h-fit px-3 rounded-md'>{course.status}</div>
        </div>
      ))}
    </div>
  )
};
