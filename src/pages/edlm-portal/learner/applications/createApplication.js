'use strict'

import { CodeOfEthics } from '@/components/applicationSteps/codeOfEthics';
import { PrivacyAct } from '@/components/applicationSteps/privacyAct';
import { StartApplication } from '@/components/applicationSteps/startApplication';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useCreateApplication } from '@/hooks/application/useCreateApplication';
import { useUpdateApplication } from '@/hooks/application/useUpdateApplication';
import { ApplicationProvider } from '@/contexts/ApplicationContext';
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function CreateApplication(){
  const { mutateAsync: createApplication, isLoading: isCreating } = useCreateApplication();
  const { mutateAsync: updateApplication, isLoading: isUpdating } = useUpdateApplication();

  const methods = useForm({
    defaultValues: {
      // Step info tracking
      currentStep: 1,
      applicationId: null,
      
      // Step 1
      applicationType: null,
      payGrade: null,
      position: null,
      file: null,
      
      // Step 3
      codeOfEthicsAgreed: false,
      codeOfEthicsDate: null,
      
      // Step 4 and beyong (more steps here..)
      firstName: '',
      lastName: '',
      middleInitial: '',
      // ... more stuff here...
    },
    mode: 'onChange'
  });
  
  const { watch, getValues, setValue } = methods;
  const currentStep = watch('currentStep');
  const applicationId = watch('applicationId');

  const getApplicationTypeValue = value => {
    if (value === 'New Application') return 'new';
    if (value === 'Renewal Application') return 'renewal';
    return null;
  };

  // Currently, backend only accpet two values for position: SAPR VA and SARC,
  // so needs to map all variations to these 2 values for now
  const getPositionValue = value => {
    // Map all SAPR VA variations to SAPR_VA
    if (value === 'SAPR VA' || 
        value === 'Collateral Duty SAPR VA' || 
        value === 'Special Assignment SAPR VA') {
      return 'SAPR_VA';
    }
    
    // Map all SARC variations to SARC/SAPR_PM
    if (value === 'SARC' || 
        value === 'Supervisory SARC' || 
        value === 'Collateral Duty SARC' || 
        value === 'Special Assignment SARC' ||
        value === 'SAPR Program Administrator') {
      return 'SARC/SAPR_PM';
    }
    
    return null;
  };

  const saveApplication = async () => {
    const values = getValues();
    
    const transformedData = {
      applicationType: getApplicationTypeValue(values.applicationType),
      position: getPositionValue(values.position),
      codeOfEthicsAcknowledgement: values.codeOfEthicsAgreed,
    };
    
    console.log('TData:', transformedData);
    
    if (values.applicationId) {
      return await updateApplication({ applicationId: values.applicationId, ...transformedData });
    } else {
      const result = await createApplication(transformedData);
      setValue('applicationId', result.id);
      return result;
    }
  };

  const renderStepContent = () => {
    console.log('Current Step:', currentStep);
    switch (currentStep) {
        case 1:
          return <StartApplication />;
        case 2:
          return <PrivacyAct />;
        case 3:
          return <CodeOfEthics />;
        default:
          return null;
    }
  };

  return (
    <DefaultLayout>
      <ApplicationProvider value={{ saveApplication, isSaving: isCreating || isUpdating }}>
        <FormProvider {...methods}>
          <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
            <div className='mt-10 pb-4 py-4'>
              {renderStepContent()}
            </div>
          </div>
        </FormProvider>
      </ApplicationProvider>
    </DefaultLayout>
  )
};
