'use strict';

import { useRouter } from 'next/router';
import React from 'react';


export default function LearningJourneyCard({ journey }) {

    const router = useRouter();

    return (
        <button className='flex flex-col text-left border rounded-lg p-5 shadow hover:shadow-lg transition shadow flex-grow hover:cursor-pointer' 
                onClick={() => router.push(`/edlm-portal/learner/learningPlan/${journey.id}`)}
        >
            <h3 className='text-lg font-semibold mb-2'>{journey.name}</h3>
            <p className='text-sm text-gray-600 mb-5'>{journey.time}</p>
            <div className='flex justify-between text-sm text-gray-600'>
                <p>Progress</p> 
                <p>{journey.progress}%</p>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
                <div 
                    className='bg-green-600 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${journey.progress}%`}}>
                </div>
            </div>
        </button>
    );
}