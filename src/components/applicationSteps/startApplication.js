'use strict'

import { CheckCircleIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { applicationPositionOptions, payGradeOptions } from '@/utils/dropdownMenuConstants';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import Image from 'next/image';

export function StartApplication({setCurrentStep, applicationType, setApplicationType, payGrade, setPayGrade, position, setPosition, file, setFile}) {

  const router = useRouter();
  const [showUploaded, setShowUploaded] = useState(false);
  const [uploadDate, setUploadDate] = useState(null);
  const inputRef = useRef(null);

  const handleContinue = () => {
    setCurrentStep(2);
  }

  return (
    <>
      {/* Stepper */}
      <button 
        className="flex flex-row items-center gap-2"
        onClick={() => {router.push('/edlm-portal/learner/applications')}}
      >
        <ChevronLeftIcon className='text-gray-cool-700 w-4 h-4'/>
        <p className="text-md text-navy-200">Back to My Applications</p>
      </button>

      {/* Page Title and Content  */}
      <div className="mt-4">
        <h1 className="text-navy-700 text-2xl font-bold"> Start Your D-SAACP Application</h1>
        <p className="text-gray-cool-700 text-sm mt-4">
          All Sexual Assault Response Coordinators (SARC) and Sexual Assault Prevention and Response Victim Advocates (SAPR VA) must be 
          Military or Department of Defense (DoD) civilian employees and must hold this DoD Sexual Assault Advocate Certification Program 
          (D-SAACP) Certification to perform SARC or SAPR VA duties.
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

        <div className="border-t w-full mt-6"></div>

        <div className="flex items-center gap-1 text-[#993033] mt-4 text-sm">
            <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" /> = Required
        </div>

        {/* Application Type label and input */}
        <div className="mt-8 flex flex-row gap-2 items-center text-gray-cool-700 text-sm mb-2">
          <p>What type of application are you submitting?</p>
          <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
        </div>
        <CustomDropdown
            value={applicationType}
            onChange={e => setApplicationType(e.target.value)}
            options={['New Application','Renewal Application']}
            placeholder="Select Application Type"
        />

        <div className="border-t w-full mt-8"></div>

        {/* New Application Questions */}
        {applicationType == 'New Application' && (
          <div className="mt-4 text-sm text-gray-cool-700">

            {/* File upload */}
            <div className="flex flex-row gap-2 items-center">
              <p>Please upload your certificate from your completed D-SAACP pre-approved training course(s)</p>
              <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>

            <div className="flex items-center mt-2">
              <button
                type="button"
                className="bg-teal-custom-500 text-white py-2.5 px-5 border border-teal-custom-500 hover:border-teal-800 rounded-l-lg focus:outline-none hover:bg-teal-800 transition-all"
                onClick={() => inputRef.current.click()}
              >
                Choose File
              </button>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setShowUploaded(true);
                  setUploadDate(new Date());
                }}
              />
              {file ? (
                <p className="flex-1 text-gray-900 border border-gray-300 bg-gray-50 rounded-r-lg py-2.5 flex items-center px-4">
                  {file.name}
                </p>
              ) : (          
                <p className="flex-1 text-gray-500 border border-gray-300 bg-gray-50 rounded-r-lg py-2.5 flex items-center px-4">
                  Select a file to upload
                </p>)
              }
            </div>

            <p className="text-gray-500 mt-2">
              You must have completed the required D-SAACP course prior to completing the DD-2950 form. 
              Certificate must reflect name, location, dates and numbers of hours for the training course 
              and signature of official Service/NGB trainer.
            </p>

            {/* Success Message */}
            {showUploaded && (
              <div className="flex items-center justify-between bg-teal-custom-50 text-teal-custom-500 px-6 py-4 rounded-lg mb-4 mt-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-6 h-6 mr-2" />
                  <span className="text-lg font-semibold">Your file has been uploaded.</span>
                </div>
                <button
                  className="text-[#357780]"
                  onClick={() => { setShowUploaded(false)}}
                >
                 <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Uploaded File Card */}
            {file && (
              <div className="flex flex-row mt-2">
                <button
                  className="mr-2 h-12"
                  onClick={() => { setFile(null); setShowUploaded(false); }}
                  aria-label="Remove file"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-700"/>
                </button>
                <div className="flex items-center p-4 min-w-[370px]">
                  {/* File Type Icon */}
                  <div className="bg-teal-custom-500 w-20 h-20 flex items-center justify-center rounded-tl-xl mr-6">
                    <DocumentIcon className="w-10 h-10 text-white" />
                  </div>
                  {/* File details */}
                  <div>
                    <div className="text-gray-cool-700 text-lg">{file.name}</div>
                    <div className="text-gray-500 text-[15px] mt-1 tracking-wide">
                      {uploadDate ? uploadDate.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}): ''}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pay grade and position */}
        <div className="flex flex-row gap-2 w-full mt-8">
          <div className="flex flex-col w-1/2 mr-4"> 
            <div className="flex flex-row gap-2 items-center">
              <p>What is your pay grade?</p>
              <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
            <CustomDropdown
              value={payGrade}
              onChange={e => setPayGrade(e.target.value)}
              options={payGradeOptions}
              placeholder="Select Pay Grade"
            />
          </div>

          <div className="flex flex-col w-1/2"> 
            <div className="flex flex-row gap-2 items-center">
              <p>Which position are you seeking certification for?</p>
              <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
            <CustomDropdown
              value={position}
              onChange={e => setPosition(e.target.value)}
              options={applicationPositionOptions}
              placeholder="Select Position Type"
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex w-full justify-end mt-8">
          <button 
            className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-teal-custom-500 hover:bg-teal-800 mt-6 disabled:bg-teal-disabled" 
            onClick={handleContinue}
            disabled={!applicationType || !payGrade || !position || (applicationType == 'New Application' && !file)}
          >
            <div className="flex gap-2 items-center justify-end">
              Continue 
            </div>
          </button>
        </div>

      </div>
    </>
  )
};