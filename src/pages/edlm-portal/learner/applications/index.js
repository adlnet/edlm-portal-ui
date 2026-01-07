'use strict';

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function Applications() {

  const router = useRouter();

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md py-4 px-4 my-4 rounded-xl mx-4 min-h-[700px]'>
        <h1 className="text-xl font-bold text-blue-900 pb-4">My Applications</h1>
        <div className="text-gray-600 pb-10"> Manage and track your certification applications.</div>
        <button 
         className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-teal-custom-500 hover:bg-teal-800"
         onClick={() => {router.push('/edlm-portal/learner/applications/createApplication')}}
        >
          <div className="flex gap-2 items-center">
            Start New Application 
            <ArrowRightIcon className="w-3 h-3 stroke-[4]"/>
          </div>
        </button>
       
      </div>
    </DefaultLayout>
  );
}
