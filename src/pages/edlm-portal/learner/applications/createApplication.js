'use strict'

import { ApplicantInfo } from '@/components/applicationSteps/applicantInfo';
import { CEUExperience } from '@/components/applicationSteps/ceuExperience';
import { CodeOfEthics } from '@/components/applicationSteps/codeOfEthics';
import { PrivacyAct } from '@/components/applicationSteps/privacyAct';
import { ReviewAndSend } from '@/components/applicationSteps/reviewAndSend';
import { StartApplication } from '@/components/applicationSteps/startApplication';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DefaultLayout from "@/components/layouts/DefaultLayout";


export default function CreateApplication(){

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(5);
  
  const [applicationType, setApplicationType] = useState(null);
  const [payGrade, setPayGrade] = useState(null);
  const [position, setPosition] = useState(null);
  const [file, setFile] = useState(null);
  const [codeOfEthicsAgreed, setCodeOfEthicsAgreed] = useState(false);
  const [codeOfEthicsDate, setCodeOfEthicsDate] = useState(null);
  
  // Applicant Info State Variables
  const [lastName, setLastName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [middleInitial, setMiddleInitial] = useState(null);
  const [affiliation, setAffiliation] = useState(null);
  const [applicantStatus, setApplicantStatus] = useState(null);
  const [rank, setRank] = useState(null);
  const [commandUnit, setCommandUnit] = useState(null);
  const [installation, setInstallation] = useState(null);
  const [workEmail, setWorkEmail] = useState(null);
  const [noGovEmail, setNoGovEmail] = useState(false);
  const [workPhone, setWorkPhone] = useState(null);
  const [dsn, setDsn] = useState("");
  const [ext, setExt] = useState("");
  const [sarcEmail, setSarcEmail] = useState(null);
  const [cmdOffEmail, setCmdOffEmail] = useState(null);  

  // CEU Experience State Variables
  const [numberOfCourses, setNumberOfCourses] = useState(1);
  const [courses, setCourses] = useState([
      {
          id: crypto.randomUUID(),
          order: numberOfCourses,
          name: null,
          category: null,
          dateOfCompletion: null,
          ceuHours: 0,
          proofFile: null,
      },
  ]);
  

  const renderStepContent = () => {
    switch (currentStep) {
        case 1:
          return (
            <StartApplication 
              setCurrentStep={setCurrentStep} 
              applicationType={applicationType} 
              setApplicationType={setApplicationType} 
              payGrade={payGrade} 
              setPayGrade={setPayGrade} 
              position={position} 
              setPosition={setPosition} 
              file={file}
              setFile={setFile}
            />
          );
        case 2:
          return (
            <PrivacyAct 
              setCurrentStep={setCurrentStep} 
              applicationType={applicationType} 
            />
          );
        case 3:
          return (
            <CodeOfEthics 
              setCurrentStep={setCurrentStep} 
              applicationType={applicationType} 
              codeOfEthicsAgreed={codeOfEthicsAgreed} 
              setCodeOfEthicsAgreed={setCodeOfEthicsAgreed} 
              codeOfEthicsDate={codeOfEthicsDate} 
              setCodeOfEthicsDate={setCodeOfEthicsDate}
            />
          );
        case 4:
          return (
            <ApplicantInfo 
              setCurrentStep={setCurrentStep} 
              applicationType={applicationType}
              position={position}
              lastName={lastName} setLastName={setLastName}
              firstName={firstName} setFirstName={setFirstName}
              middleInitial={middleInitial} setMiddleInitial={setMiddleInitial}
              affiliation={affiliation} setAffiliation ={setAffiliation}
              applicantStatus={applicantStatus} setApplicantStatus={setApplicantStatus}
              rank={rank} setRank={setRank}
              payGrade={payGrade} setPayGrade={setPayGrade}
              commandUnit={commandUnit} setCommandUnit={setCommandUnit}
              installation={installation} setInstallation={setInstallation} 
              workEmail={workEmail} setWorkEmail={setWorkEmail}
              noGovEmail={noGovEmail} setNoGovEmail={setNoGovEmail}
              workPhone={workPhone} setWorkPhone={setWorkPhone}
              dsn={dsn} setDsn={setDsn}
              ext={ext} setExt={setExt}
              sarcEmail={sarcEmail} setSarcEmail={setSarcEmail}
              cmdOffEmail={cmdOffEmail} setCmdOffEmail={setCmdOffEmail}
            />
          ) 
        case 5: 
          // CEU Documentation Step Component to be added here
          return (
            <CEUExperience 
              setCurrentStep={setCurrentStep} 
              applicationType={applicationType}
              courses={courses} 
              setCourses={setCourses} 
              numberOfCourses={numberOfCourses}
              setNumberOfCourses={setNumberOfCourses}
            />
          );
        case 6: 
          // Review and send app
          return (
            <ReviewAndSend/>
          );
        default:
          return (<></>);
    }
  };

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6'>
        <div className='mt-10 pb-4 py-4'>
          {renderStepContent()}
        </div>
      </div>
    </DefaultLayout>
  )
};