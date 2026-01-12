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
import { useRouter } from 'next/router';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import Image from 'next/image';
import TextInputCustom from '@/components/inputs/TextInputCustom';


export function ApplicantInfo ({
    setCurrentStep, 
    applicationType,
    position,
    lastName, setLastName,
    firstName, setFirstName,
    middleInitial, setMiddleInitial,
    affiliation, setAffiliation,
    applicantStatus, setApplicantStatus,
    rank, setRank,
    payGrade, setPayGrade,
    commandUnit, setCommandUnit,
    installation, setInstallation,
    workEmail, setWorkEmail,
    noGovEmail, setNoGovEmail,
    workPhone, setWorkPhone,
    dsn, setDsn,
    ext, setExt,
    sarcEmail, setSarcEmail,
    cmdOffEmail, setCmdOffEmail
  }) {

  const router = useRouter();

  const handleContinue = () => {
    setCurrentStep(5);
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
              onChange={e => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </div>

          {/* First Name */}
          <div className="flex flex-col w-1/3 mr-4"> 
            <TextInputCustom
              label="First Name"
              required={true}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </div>
          
          {/* Middle Initial */}
          <div className="flex flex-col w-1/3 mr-4"> 
            <TextInputCustom
              label="Middle Initial"
              required={false}
              value={middleInitial}
              onChange={e => setMiddleInitial(e.target.value)}
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
              onChange={e => setAffiliation(e.target.value)}
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
              onChange={e => setApplicantStatus(e.target.value)}
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
              onChange={e => setRank(e.target.value)}
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
              onChange={e => setPayGrade(e.target.value)}
              options={payGradeOptions}
              placeholder="Select grade"
            />
          </div>
        </div>

        {/* Command Unit and Installation row*/}
        <div className="flex flex-row gap-4 w-full mt-8 text-sm text-gray-cool-700">

          {/* Command (Unit) */}
          <div className="flex flex-col w-1/2"> 
            <div className="flex flex-row gap-2 items-center mb-1">
              <p>Command (Unit)</p>
              <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
            <CustomDropdown
              className=""
              value={commandUnit}
              onChange={e => setCommandUnit(e.target.value)}
              options={['1','2','3']}
              placeholder="Select command (unit)"
            />
          </div>

          {/* Installation */}
          <div className="flex flex-col w-1/2"> 
            <div className="flex flex-row gap-2 items-center mb-1">
              <p>Installation</p>
              <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
            <CustomDropdown
              value={installation}
              onChange={e => setInstallation(e.target.value)}
              options={['1','2','3']}
              placeholder="Select installation"
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
              onChange={e => setWorkEmail(e.target.value)}
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
                onChange={e=>setDsn(e.target.value)}/>
              <input 
                type="text" 
                className="w-3/5 text-sm border bg-gray-50 border-gray-300 rounded-lg px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-navy-700" 
                value={workPhone} 
                onChange={e=>setWorkPhone(e.target.value)}/>
              <p>Ext.</p>
              <input 
                type="text" 
                className="w-1/5 text-sm border bg-gray-50 border-gray-300 rounded-lg px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-navy-700" 
                value={ext} 
                onChange={e=>setExt(e.target.value)}/>
            </div>  
          </div>
        </div>

        {/* No gov email checkbox */}
        <div className="flex flex-row mt-3 items-center text-sm text-gray-cool-700">
          <input 
            type="checkbox" 
            className="h-4 w-4 mr-4 mb-3 text-teal-custom-500 border-gray-300 rounded focus:ring-teal-custom-500" 
            checked={noGovEmail} 
            onChange={e=>setNoGovEmail(e.target.checked)}/>
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
              onChange={e => setSarcEmail(e.target.value)}
              placeholder="Enter Principal SARC or Supervisor SARC's email address"
            />
            <p className="text-gray-400 mt-1">.mil or .gov email addresses only</p>
          </div>

          <div className="flex flex-col w-1/2 mr-4"> 
            <TextInputCustom
              label="Commanding Officer Email Address"
              required={true}
              value={cmdOffEmail}
              onChange={e => setCmdOffEmail(e.target.value)}
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