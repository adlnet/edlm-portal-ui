'use strict';

export default function ProgressCard({ phases }) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {phases.map((phase, i) => (
        <div key={i} className='border rounded-lg p-5 shadow hover:shadow-lg transition shadow'>
          <p className='text-sm text-gray-600'>{phase.title}</p>
          <h3 className='text-lg font-semibold mb-1'>{phase.name}</h3>
          <div>
              <p className='text-sm text-gray-600'>{phase.progress}% Completed</p>
            </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div 
              className='bg-green-600 h-2 rounded-full transition-all duration-300'
              style={{ width: `${phase.progress}%`}}>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
}