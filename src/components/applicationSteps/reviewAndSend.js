'use strict'

import { ChevronRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { 
  affiliationOptions, 
} from '@/utils/dropdownMenuConstants';
import { useRouter } from 'next/router';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import Image from 'next/image';
import TextInputCustom from '@/components/inputs/TextInputCustom';


export function ReviewAndSend ({
    setCurrentStep, 
    applicationType,

  }) {

  const router = useRouter();

  const handleContinue = () => {
    setCurrentStep(5);
  }

  return (
    <>
      {/* Stepper */}
      <div className="flex flex-row items-center gap-2">
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(2)}}
        >
          Privacy Act
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(3)}}
        >
          Code of Ethics
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(4)}}
        >
          Applicant Info
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(5)}}
        >
          CEU Documentation
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(5)}}
        >
          Review & Send
        </button>
      </div>

      <div className="bg-navy-025 text-navy-700 rounded-md py-1 px-3 mt-4 text-sm w-fit">
        {applicationType}
      </div>

      {/* Page Title and Content  */}
      <div className="mt-4">
        <h1 className="text-navy-700 text-2xl font-bold"> Review and Send </h1>
        <p className="text-gray-cool-700 text-sm mt-4">
            List all
        </p>

        <div className="flex flex-row gap-2 items-center mt-6">
          <p className="font-bold text-teal-custom-500 text-lg">My Information</p>
           <InformationCircleIcon className="h-4 w-4 text-teal-custom-500"/>
        </div>
        
        <div className="flex flex-col mt-3 text-sm">
          <p className="text-gray-cool-700">Position you are applying for</p>
          <div className="mt-1 bg-gray-50 text-gray-500 px-3 py-2.5 w-1/2 rounded-lg border opacity-50">{position}</div>
        </div>

        <div className="flex items-center gap-1 text-[#993033] mt-4 text-sm">
            <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" /> = Required
        </div>

        <div className="border-t w-full mt-8"></div>

        {/* Continue Button */}
        <div className="flex flex-row gap-4 items-center w-full justify-end mt-8">
          
          <button 
            className="text-sm text-teal-custom-500 font-bold"
            onClick={()=> { router.push('/edlm-portal/learner/applications') }}
          >
            Save and Exit
          </button>
          
          <button 
            className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-teal-custom-500 hover:bg-teal-800 disabled:bg-teal-disabled" 
            onClick={handleContinue}
          >
            <div className="flex gap-2 items-center justify-end">
              Continue 
            </div>
          </button>
        </div>

        <div className="border-t w-full mt-24"></div>

        <div className="flex flex-row gap-3 text-gray-cool-700 text-sm mt-4">
          <div className="bg-gray-50 px-3 py-1 rounded-md">DD Form 2950-1</div>
          <div className="bg-gray-50 px-3 py-1 rounded-md">FEB 2025</div>
          <div className="bg-gray-50 px-3 py-1 rounded-md">Updated 02/05/2025</div>
          <div className="bg-gray-50 px-3 py-1 rounded-md">Prescribed by DoDD 6495.03, DoDI 6495.03, and DTM 14-001</div>
        </div>

      </div>
    </>
  )
};