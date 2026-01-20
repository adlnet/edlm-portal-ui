'use strict'

import { ChevronRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { 
  affiliationOptions, 
  applicantStatusOptions,
  payGradeOptions,
  rankAirForceOptions, 
  rankArmyOptions, 
  rankCivilianOptions, 
  rankCoastGuardOptions, 
  rankMarineCorpsOptions,
  rankNavyOptions,
} from '@/utils/dropdownMenuConstants';
import { useApplicationContext } from '@/contexts/ApplicationContext';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ApplicationFooter from '@/components/ApplicationFooter';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import Image from 'next/image';
import TextInputCustom from '@/components/inputs/TextInputCustom';


export function ApplicantInfo () {

  const { watch, setValue } = useFormContext();
  const { saveApplication, isSaving } = useApplicationContext();

  const applicationType = watch('applicationType');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const middleInitial = watch('middleInitial');
  const affiliation = watch('affiliation');
  const applicantStatus = watch('applicantStatus');
  const rank = watch('rank');
  const payGrade = watch('payGrade');
  const position = watch('position');
  const commandUnit = watch('commandUnit');
  const installation = watch('installation');
  const workEmail = watch('workEmail');
  const noGovEmail = watch('noGovEmail');
  const workPhone = watch('workPhone');
  const dsn = watch('dsn');
  const ext = watch('ext');
  const sarcEmail = watch('sarcEmail');
  const cmdOffEmail = watch('cmdOffEmail');

  const router = useRouter();

  const [saveError, setSaveError] = useState(null);

  const handleContinue = async () => {
    try{
      setSaveError(null);
      await saveApplication();
      setValue('currentStep', 5);
    } catch (error) {
      console.log("Error saving applicant information: ", error);
      setSaveError('An error occurred while saving applicant information. Please try again.');
    }
  }

  const handleSave = async () => {
    await saveApplication();
    router.push('/edlm-portal/learner/applications');
  }

  const getRankOptions = () => {
    switch(affiliation) {
      case 'Air Force':
        return rankAirForceOptions;
      case 'Army':
        return rankArmyOptions;
      case 'Navy':  
       return rankNavyOptions;
      case 'Marine Corps':
        return rankMarineCorpsOptions;
      case 'Coast Guard':
        return rankCoastGuardOptions;
      case 'DoD Civilian':
        return rankCivilianOptions;
      case 'Other (Contractor, etc)':
        return rankCivilianOptions;
      default:
        return [];
    }
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
        <p className="text-md text-gray-400">CEU Documentation</p>
        <ChevronRightIcon className='text-gray-400 w-4 h-4'/>
        <p className="text-md text-gray-400">Review & Send</p>
      </div>

      <div className="bg-navy-025 text-navy-700 rounded-md py-1 px-3 mt-4 text-sm w-fit">
        {applicationType}
      </div>

      {/* Page Title and Content  */}
      <div className="mt-4">
        <h1 className="text-navy-700 text-2xl font-bold"> Applicant Information</h1>
        <p className="text-gray-cool-700 text-sm mt-4">
          Fill out the following application fields. Some fields are pre-filled for your convenience. 
        </p>
        
        <div className="border-t w-full mt-6"></div>

        <div className="flex flex-row gap-2 items-center mt-6">
          <p className="font-bold text-teal-custom-500 text-lg">My Information</p>
          <InformationCircleIcon className="h-4 w-4 text-teal-custom-500"/>
        </div>
        
        <div className="flex flex-col mt-3 text-sm">
          <p className="text-gray-cool-700">Position you are applying for</p>
          <div className="mt-1 bg-gray-50 text-gray-500 px-3 py-2.5 w-1/2 rounded-lg border opacity-50">{position}</div>
        </div>
        
        <div className="border-t w-full mt-6"></div>

        <div className="flex items-center gap-1 text-[#993033] mt-4 text-sm">
            <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" /> = Required
        </div>

        {/* Last/First Name and MI row */}
        <div className="flex flex-row gap-2 w-full mt-4 text-sm text-gray-cool-700">
          
          {/* Last Name */}
          <div className="flex flex-col w-1/3 mr-4"> 
            <TextInputCustom
              label="Last Name"
              required={true}
              value={lastName}
              onChange={e => setValue('lastName', e.target.value)}
              placeholder="Enter last name"
            />
          </div>

          {/* First Name */}
          <div className="flex flex-col w-1/3 mr-4"> 
            <TextInputCustom
              label="First Name"
              required={true}
              value={firstName}
              onChange={e => setValue('firstName', e.target.value)}
              placeholder="Enter first name"
            />
          </div>
          
          {/* Middle Initial */}
          <div className="flex flex-col w-1/3 mr-4"> 
            <TextInputCustom
              label="Middle Initial"
              required={false}
              value={middleInitial}
              onChange={e => setValue('middleInitial', e.target.value)}
              placeholder="Enter middle initial"
            />
          </div>
        </div>

        <div className="border-t w-full mt-8"></div>

        {/* Affiliation, Status, Rank, and Grade row*/}
        <div className="flex flex-row gap-4 w-full mt-8 text-sm text-gray-cool-700">
          {/* Affiliation */}
          <div className="flex flex-col w-1/4"> 
            <div className="flex flex-row gap-2 items-center mb-1">
              <p>Affiliation</p>
              <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
            <CustomDropdown
              value={affiliation}
              onChange={e => setValue('affiliation', e.target.value)}
              options={affiliationOptions}
              placeholder="Select affiliation"
            />
          </div> 
          
          {/* Status */}
          <div className="flex flex-col w-1/4"> 
            <div className="flex flex-row gap-2 items-center mb-1">
              <p>Status</p>
              <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
            <CustomDropdown
              value={applicantStatus}
              onChange={e => setValue('applicantStatus', e.target.value)}
              options={applicantStatusOptions}
              placeholder="Select status"
              disabled={!affiliation}
            />
          </div>

          {/* Rank */}
          <div className="flex flex-col w-1/4"> 
            <div className="flex flex-row gap-2 items-center mb-1">
              <p>Rank</p>
              <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
            <CustomDropdown
              value={rank}
              onChange={e => setValue('rank', e.target.value)}
              options={getRankOptions()}
              placeholder="Select rank"
              disabled={!affiliation}
            />
          </div>
          
          {/* Grade */}
          <div className="flex flex-col w-1/4"> 
            <div className="flex flex-row gap-2 items-center mb-1">
              <p>Grade</p>
              <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
            <CustomDropdown
              value={payGrade}
              onChange={e => setValue('payGrade', e.target.value)}
              options={payGradeOptions}
              placeholder="Select grade"
            />
          </div>
        </div>

        {/* Command Unit and Installation row*/}
        <div className="flex flex-row gap-4 w-full mt-8 text-sm text-gray-cool-700">

          {/* Command (Unit) */}
          <div className="flex flex-col w-1/2"> 
            <TextInputCustom
              label="Command (Unit)"
              value={commandUnit}
              required={true}
              onChange={e => setValue('commandUnit', e.target.value)}
              placeholder="Enter Command"
            />
          </div>

          {/* Installation */}
          <div className="flex flex-col w-1/2"> 
            <TextInputCustom
              label="Installation"
              required={true}
              value={installation}
              onChange={e => setValue('installation', e.target.value)}
              placeholder="Enter Installation"
            />
          </div>
        </div>
        
        <div className="border-t w-full mt-10"></div>

        {/* Work email and phone number row */}
        <div className="flex flex-row gap-2 w-full mt-6 text-sm text-gray-cool-700">
          
          {/* Work Email */}
          <div className="flex flex-col w-1/2 mr-4"> 
            <TextInputCustom
              label="Work Email Address"
              required={true}
              value={workEmail}
              onChange={e => setValue('workEmail', e.target.value)}
              placeholder="Enter work email address"
            />
            <p className="text-gray-400 mt-1">.mil or .gov email addresses only</p>
          </div>

          <div className="flex flex-col w-1/2">
            <div className="flex flex-row gap-2 items-center">
                <p>Work Telephone Number</p>
                <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
          
            <div className="flex flex-row gap-2 items-center text-sm text-gray-cool-700">
              <p>DSN</p>
              <input 
                type="text" 
                className="w-1/5 text-sm border bg-gray-50 border-gray-300 rounded-lg px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-navy-700" 
                value={dsn} 
                onChange={e=>setValue('dsn', e.target.value)}/>
              <input 
                type="text" 
                className="w-3/5 text-sm border bg-gray-50 border-gray-300 rounded-lg px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-navy-700" 
                value={workPhone} 
                onChange={e=>setValue('workPhone', e.target.value)}/>
              <p>Ext.</p>
              <input 
                type="text" 
                className="w-1/5 text-sm border bg-gray-50 border-gray-300 rounded-lg px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-navy-700" 
                value={ext} 
                onChange={e=>setValue('ext', e.target.value)}/>
            </div>  
          </div>
        </div>

        {/* No gov email checkbox */}
        <div className="flex flex-row mt-3 items-center text-sm text-gray-cool-700">
          <input 
            type="checkbox" 
            className="h-4 w-4 mr-4 mb-3 text-teal-custom-500 border-gray-300 rounded focus:ring-teal-custom-500" 
            checked={noGovEmail} 
            onChange={e=>setValue('noGovEmail', e.target.checked)}/>
          <div className="flex flex-col">
            <p>
              I do not have a .mil or .gov email address at this time.
            </p>
            <p className="text-gray-400 text-xs"> 
              Please use my SARC&apos;s email address below
            </p>
          </div>
        </div>

        {/* SARC & Commanding Officer Email Addresses */}
        <div className="flex flex-row gap-2 w-full mt-10 text-sm text-gray-cool-700">

          <div className="flex flex-col w-1/2 mr-4"> 
            <TextInputCustom
              label="Principal SARC or Supervisor SARC's Email Address"
              required={true}
              value={sarcEmail}
              onChange={e => setValue('sarcEmail', e.target.value)}
              placeholder="Enter Principal SARC or Supervisor SARC's email address"
            />
            <p className="text-gray-400 mt-1">.mil or .gov email addresses only</p>
          </div>

          <div className="flex flex-col w-1/2 mr-4"> 
            <TextInputCustom
              label="Commanding Officer Email Address"
              required={true}
              value={cmdOffEmail}
              onChange={e => setValue('cmdOffEmail', e.target.value)}
              placeholder="Enter your Commanding Officer's email address"
            />
            <p className="text-gray-400 mt-1">.mil or .gov email addresses only</p>
          </div>

        </div>

        <div className="border-t w-full mt-8"></div>

        {/* Continue Button */}
        <div className="flex flex-row gap-4 items-center w-full justify-end mt-8">
          
          <button 
            className="text-sm text-teal-custom-500 font-bold"
            onClick={handleSave}
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

        <ApplicationFooter />

      </div>
    </>
  )
};