'use strict'

import { CodeOfEthics } from '@/components/applicationSteps/codeOfEthics';
import { PrivacyAct } from '@/components/applicationSteps/privacyAct';
import { StartApplication } from '@/components/applicationSteps/startApplication';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function CreateApplication(){

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [applicationType, setApplicationType] = useState(null);
  const [payGrade, setPayGrade] = useState(null);
  const [position, setPosition] = useState(null);
  const [file, setFile] = useState(null);
  const [codeOfEthicsAgreed, setCodeOfEthicsAgreed] = useState(false);
  const [codeOfEthicsDate, setCodeOfEthicsDate] = useState(null);

  const renderStepContent = () => {
    console.log('Current Step:', currentStep);
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
        default:
          return (<></>);
    }
  };

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          {renderStepContent()}
        </div>
      </div>
    </DefaultLayout>
  )
};