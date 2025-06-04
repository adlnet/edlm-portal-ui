'use strict';

import { EyeIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';
import Link from 'next/link';

export default function ViewBtn({ id, courseTitle, courseDescription }) {

  return (
    <Link href={{ pathname: `/edlm-portal/learner/course/${id}` }} passHref>
      <button
        id={'view-course-button-' + id}
        className='flex justify-center items-center gap-2 text-blue-400 rounded-full hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white px-2 p-1.5 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400 outline-none'
        title='view course'
      >
        <EyeIcon className='h-5 w-5' />
        View Course
      </button>
    </Link>
  );
}
