'use strict';

// Function to animate the content loading
export default function ContentLoadingAnimate () {
    return (
      <div className='animate-pulse'>
        <div className='w-full bg-white border rounded-md border-gray-200 p-4'>
          <div className='w-3/4 bg-gray-200 rounded-sm h-8'></div>
          <div className='bg-gray-200 h-32 rounded-sm mt-4'></div>
          <div className='grid grid-cols-5 gap-2 mt-4'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='grid grid-cols-5 gap-2 mt-2'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='grid grid-cols-5 gap-2 mt-2'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='grid grid-cols-5 gap-2 mt-2'>
            <div className='col-span-1 rounded-sm bg-gray-200 h-4'></div>
            <div className='col-span-2 rounded-sm bg-gray-200'></div>
          </div>
          <div className='flex justify-between mt-8'>
            <div className='inline-flex justify-start gap-2'>
              <div className='rounded-full h-6 w-6 bg-gray-200'></div>
              <div className='rounded-full h-6 w-6 bg-gray-200'></div>
            </div>
            <div className='rounded-l-2xl rounded-r-md h-6 w-10 bg-gray-200'></div>
          </div>
        </div>

        <div className='flex justify-center gap-2 mt-2'>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
          <div className='bg-gray-200 rounded-full border border-gray-300 h-2 w-2'></div>
        </div>
      </div>
    );
}