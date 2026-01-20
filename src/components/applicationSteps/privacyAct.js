'use strict'

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import ApplicationFooter from '@/components/ApplicationFooter';

export function PrivacyAct() {
  const { watch, setValue } = useFormContext();
  const applicationType = watch('applicationType');
  
  const router = useRouter();

  const handleContinue = () => {
    setValue('currentStep', 3);
  }

  return (
    <>
      {/* Stepper */}
      <div className="flex flex-row items-center gap-2">
        <button 
            className="text-md text-navy-200"
            onClick={() => setValue('currentStep', 2)}
        >
            Privacy Act
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <p className="text-md text-gray-400">Code of Ethics</p>
        <ChevronRightIcon className='text-gray-400 w-4 h-4'/>
        <p className="text-md text-gray-400">Applicant Info</p>
        <ChevronRightIcon className='text-gray-400 w-4 h-4'/>
        <p className="text-md text-gray-400">CEU Documentation</p>
        <ChevronRightIcon className='text-gray-400 w-4 h-4'/>
        <p className="text-md text-gray-400">Review & Send</p>
      </div>

      <div className="bg-navy-025 text-navy-700 rounded-md py-1 px-3 mt-4 text-sm w-fit">
        {applicationType}
      </div>

      {/* Page Title and Content  */}
      <div className="mt-8">
        <h1 className="text-navy-700 text-2xl font-bold"> Privacy Act Statement</h1>
        <p className="text-gray-cool-700 text-sm mt-4">
          Please read the following Privacy Act Statement carefully before proceeding with your application.
        </p>
        
        {/* Privacy Act Statement */}
        <div className="flex flex-col border border-gray-cool-700 rounded-lg p-4 mt-6 text-gray-cool-700">
          <h1 className="font-bold text-lg">Privacy Act Statement</h1>
          <p className="mt-4">
            <b>AUTHORITY</b> 10 U.S.C. 136, Under Secretary of Defense for Personnel and Readiness; 
            and DoD Instructions 6495.03, Defense Sexual Assault Advocate Certification Program (D-SAACP). 
          </p>
          <p className="mt-4">
            <b>PRINCIPAL PURPOSE(S): </b> The information on this form will be used to review and process 
            Defense Sexual Assault Advocate Certification Program (D-SAACP) applications for all eligible 
            Department of Defense (DoD) Sexual Assault Response Workforce (SARW) personnel.
          </p>
          <p className="mt-4">
            <b>ROUTINE USE(S): </b> To the Department of Justice Office for Victims of Crime and Training Technical 
            Assistance Center for the purpose of verifying certified DoD SARW personnel for participation in Advance 
            Military Sexual Assault Advocate Training. Additional routine uses may be found in the applicable system
            of records notice DHRA 10, Defense Sexual Assault Advocate Certification Program at:
            <br></br>
            <p className="mt-2">
              https://dpcld.defense.gov/Privacy/SORNsIndex/DOD-wide-SORN-Article-View/Article/570562/dhra-10-dod/
            </p>
          </p>
          <p className="mt-4">
            <b>DISCLOSURE </b> Mandatory. If you are in an authorized DoD SARW position and you do not complete this 
            form to receive your D-SAACP certification, you will be disqualified from the position. 10 U.S.C. 1561
          </p>
        </div>

        {/* Continue Button */}
        <div className="flex w-full justify-end mt-6">
          <button 
            className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-teal-custom-500 hover:bg-teal-800 mt-6" 
            onClick={handleContinue}
          >
            <div className="flex gap-2 items-center justify-end">
              Continue 
            </div>
          </button>
        </div>

        <div className="border-t w-full mt-44"></div>

        <ApplicationFooter />
      </div>
    </>
  )
};