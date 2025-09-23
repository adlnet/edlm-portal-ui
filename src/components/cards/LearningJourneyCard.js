'use strict';

import { useRouter } from 'next/router';
import React from 'react';


export default function LearningJourneyCard({ journey }) {

    const router = useRouter();

    return (
        <div className='flex flex-col text-left border rounded-lg p-5 shadow hover:shadow-lg transition shadow' >
            <h3 className='text-lg font-semibold mb-1 text-gray-900'>{journey.name}</h3>
            {journey.created && (
                <p className='text-sm text-gray-600 mb-2'>Date Created: {journey.created}</p>
            )}
            {journey.description && (
                <p className='text-sm text-gray-600 mb-2'>{journey.description}</p>
            )}
            <div className='text-xs px-4 p-2 bg-blue-50 text-blue-600 rounded-md w-fit'>{journey.length}</div>
            <div className='text-right pr-4 text-sm text-gray-600 pb-1'>
                <p>{journey.progress}%</p>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
                <div 
                    className='bg-blue-900 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${journey.progress}%`}}>
                </div>
            </div>
            <div className='text-right pr-4 pt-4 text-sm text-blue-400'>
                <button className=''
                        onClick={() => router.push(`/edlm-portal/learner/learningPlan/${journey.id}`)}     
                >
                    View Plan
                </button>
            </div>
        </div>
    );
}