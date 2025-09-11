'use strict';

export default function LearningJourneyCard({ journey }) {
    return (
        <div className='flex flex-col border rounded-lg p-5 shadow hover:shadow-lg transition shadow flex-grow hover:cursor-pointer'>
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
        </div>
    );
}