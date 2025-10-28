'use strict';

import { BookmarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SaveCollectionModal from '@/components/modals/SaveCollectionModal';
import SavePlanModal from '@/components/modals/SavePlanModal';


export default function SaveModal({ courseId, title, setSuccessMessage }) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      <button
        title='save course'
        onClick={toggleDropdown}
        className='w-[80px] h-6 px-3 py-2 border justify-center items-center gap-2 inline-flex rounded-lg bg-gradient-to-l from-blue-900 to-cyan-400 hover:from-cyan-400 hover:to-blue-900 transition-all ease-in duration-75'
      >
        <div className='justify-center items-center flex bg-white rounded-md border-4 border-white px-[0.30em]'>
          <BookmarkIcon class='w-3 h-3 m-0 p-0' />
          <p className="text-[#1f3764] text-xs font-medium leading-none px-1">Save</p>
          {!isDropdownOpen && (<ChevronDownIcon class='w-3 h-3 m-0 p-0'/>)}
          {isDropdownOpen && (<ChevronUpIcon class='w-3 h-3 m-0 p-0'/>)}
        </div>
      </button>

      {isDropdownOpen && (
        <div className='flex flex-col absolute mt-[28px] border border-gray-300 shadow-md text-xs rounded-lg px-4'>
          <SaveCollectionModal courseId={courseId} title={title} setIsDropdownOpen={setIsDropdownOpen}/>
          <SavePlanModal courseId={courseId} title={title} setIsDropdownOpen={setIsDropdownOpen} setSuccessMessage={setSuccessMessage}/>
        </div>
      )}
    </>
  );
}

