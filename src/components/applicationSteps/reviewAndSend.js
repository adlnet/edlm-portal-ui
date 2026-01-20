'use strict'

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useApplicationContext } from '@/contexts/ApplicationContext';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SubmitApplicationModal from "@/components/modals/SubmitApplicationModal";


export function ReviewAndSend () {

  const { watch, setValue } = useFormContext();
  const { saveApplication, isSaving } = useApplicationContext();

  const applicationType = watch('applicationType');
  const currentStep = watch('currentStep');
  const finalSubTimestamp = watch('finalSubTimestamp');
  const codeOfEthicsAgreed = watch('codeOfEthicsAgreed');
  const submissionAgreement = watch('submissionAgreement');
  
  const setSubmissionAgreement = (value) => setValue('submissionAgreement', value);
  const setFinalSubTimestamp = (value) => setValue('finalSubTimestamp', value);
  const setStatus = (value) => setValue('status', value);

  // TEMPORARY VAIRALES - TO BE REMOVED WHEN INTEGRATED WITH PREVIOUS STEPS
  const [applicantInfoComplete, setApplicantInfoComplete] = useState(false);
  const [ceuExperienceComplete, setCeuExperienceComplete] = useState(false);
  const [lettersOfRecComplete, setLettersOfRecComplete] = useState(false);

  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    console.log("Submitting Application...");
    setStatus('Submitted');
    router.push('/edlm-portal/learner/applications/?submitted=1');
  }

  return (
    <>
      {/* Stepper */}
      <div className="flex flex-row items-center gap-2">
        <button 
          className="text-md text-navy-200"
          onClick={() => {setValue('currentStep', 2)}}
        >
          Privacy Act
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setValue('currentStep', 3)}}
        >
          Code of Ethics
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setValue('currentStep', 4)}}
        >
          Applicant Info
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setValue('currentStep', 5)}}
        >
          CEU Documentation
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setValue('currentStep', 6)}}
        >
          Review & Send
        </button>
      </div>

      <div className="bg-navy-025 text-navy-700 rounded-md py-1 px-3 mt-4 text-sm w-fit">
        {applicationType}
      </div>

      {/* Page Title and Content  */}
      <div className="mt-4">
        <h1 className="text-navy-700 text-2xl font-bold"> Review and Send Application</h1>
        <p className="text-gray-cool-700 text-sm mt-4">
            Review your complete selections and track the application workflow. Click on sections you are responsible for to return and edit. 
        </p>

        <div className="flex flex-col bg-navy-025 mt-6 p-4 rounded-lg">
          <div className="flex flex-row gap-2">
            <InformationCircleIcon className="h-6 w-6 text-navy-700"/>
            <p className="font-bold text-navy-700"> Application Submission Window</p>
          </div>
          <p className="text-navy-700 text-sm mt-2">
            For complete details on application windows and submission deadline, visit https://trynova.org/credentialing/d-saacp/. 
          </p>
        </div>

        {/* Review Icons */}
        <div className="flex justify-center mt-2">
          <div className="flex flex-row w-3/4 mt-8 mb-4 items-center px-2">
            <CheckCircleIcon className={`h-10 w-10 ${codeOfEthicsAgreed ? 'text-teal-custom-500' : 'text-gray-300'}`}/>
            <hr className="flex flex-grow border-t border-gray-300 border-2"></hr>
            <CheckCircleIcon className={`h-10 w-10 ${applicantInfoComplete ? 'text-teal-custom-500' : 'text-gray-300'}`}/>
            <hr className="flex flex-grow border-t border-gray-300 border-2"></hr>
            <CheckCircleIcon className={`h-10 w-10 ${ceuExperienceComplete ? 'text-teal-custom-500' : 'text-gray-300'}`}/>
            <hr className="flex flex-grow border-t border-gray-300 border-2"></hr>
            <CheckCircleIcon className={`h-10 w-10 ${lettersOfRecComplete ? 'text-teal-custom-500' : 'text-gray-300'}`}/>
          </div>
        </div>

        {/* Review Sections */}
        <div className="flex justify-center mt-2">
          <div className="flex flex-row w-4/5 mb-4 justify-between text-wrap items-start">
            <button 
              className={`${codeOfEthicsAgreed ? 'text-teal-custom-500 decoration-teal-custom-500' : 'text-gray-cool-700'} w-[12.5%] text-center underline `}
              onClick={() => {setValue('currentStep', 3)}}
            >
              Sign Code of Ethics
            </button>
            <button 
              className={`${applicantInfoComplete ? 'text-teal-custom-500 decoration-teal-custom-500' : 'text-gray-cool-700'} w-[12.5%] text-center underline `}
              onClick={() => {setValue('currentStep', 4)}}
            >
              Complete Applicant Info
            </button>
            <button 
              className={`${ceuExperienceComplete ? 'text-teal-custom-500 decoration-teal-custom-500' : 'text-gray-cool-700'} w-[12.5%] text-center underline `}
              onClick={() => {setValue('currentStep', 5)}}
            >
              Complete Job Shadow Experience
            </button>
            <button 
              className={`${lettersOfRecComplete ? 'text-teal-custom-500 decoration-teal-custom-500' : 'text-gray-cool-700'} w-[12.5%] text-center underline `}
              onClick={() => {setValue('currentStep', 6)}}
            >
              Request Letters of Recommendation
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex flex-row gap-4 items-center w-full justify-end mt-16">
          
          <button 
            className="text-sm text-teal-custom-500 font-bold"
            onClick={()=> { router.push('/edlm-portal/learner/applications') }}
          >
            Save and Exit
          </button>
          
          <button 
            className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-teal-custom-500 hover:bg-teal-800 disabled:bg-teal-disabled" 
            onClick={() => setSubmitModalOpen(true)}
            disabled={!(applicantInfoComplete && ceuExperienceComplete && lettersOfRecComplete && codeOfEthicsAgreed)}
          >
            <div className="flex gap-2 items-center justify-end">
              Submit Application
            </div>
          </button>
        </div>

        <SubmitApplicationModal
          open={submitModalOpen}
          onClose={() => setSubmitModalOpen(false)}
          onSubmit={handleSubmit}
          submissionAgreement={submissionAgreement}
          setSubmissionAgreement={setSubmissionAgreement}
          finalSubTimestamp={finalSubTimestamp}
          setFinalSubTimestamp={setFinalSubTimestamp}
          setStatus={setStatus}
        />

        {/* DELETE THIS LATER THIS IS TEMPORARY */}
        <button 
          className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-teal-custom-500 hover:bg-teal-800 disabled:bg-teal-disabled" 
          onClick={() => {
            setApplicantInfoComplete(true);
            setCeuExperienceComplete(true);
            setLettersOfRecComplete(true);
          }}
        >
          <div className="flex gap-2 items-center justify-end">
            MARK ALL GREEN
          </div>
        </button>

      </div>
    </>
  )
};