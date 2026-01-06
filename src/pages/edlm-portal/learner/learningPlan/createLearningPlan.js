'use strict';

import { ALL_STEPS } from '@/utils/dropdownMenuConstants';
import { ArrowLongRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChooseSkillsStep } from '@/components/steps/ChooseSkillsStep';
import { NamePlanStep } from '@/components/steps/NamePlanStep';
import { ReviewStep } from '@/components/steps/ReviewStep';
import { SetGoalsStep } from '@/components/steps/SetGoalsStep';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useLearningPlanForm } from '@/hooks/learningPlan/useLearningPlanForm';
import { useLearningPlanSave } from '@/hooks/learningPlan/useLearningPlanSave';
import { useLearningPlanValidation } from '@/hooks/learningPlan/useLearningPlanValidation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DefaultLayout from "@/components/layouts/DefaultLayout";
import SaveAndContinueBtn from '@/components/buttons/SaveAndContinueBtn';
import Stepper from '@/components/Stepper';

export default function CreatePlanForm({ initialStep = 2, onBack}) {
    const router = useRouter();

    const formState = useLearningPlanForm(initialStep, onBack);
    const { handleSaveStep, isLoading } = useLearningPlanSave(formState);
    const { canProceedFromStep, getTimelineOptions } = useLearningPlanValidation(formState);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lastStep, setLastStep] = useState(initialStep);

    const {
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        planName,
        setPlanName,
        timeframe,
        setTimeframe,
        goals,
        competencyGoals,
        setCompetencyGoals,
        addGoal,
        removeGoal,
        updateGoal,
        onCompetencyChange,
        addGoalToCompetency,
        removeGoalFromCompetency,
        updateCompetencyGoal,
        addKSAToGoal,
        removeKSAFromGoal,
        updateKSAForGoal
    } = formState;

    // step 0: Learning Plans (redirects to main page)
    // step 1: Create a New Plan (goes back to intro page)
    // step 2 - 5: creating plan steps
    const handleStepClick = (stepIndex) => {
        if (stepIndex === 0) {
            router.push('/edlm-portal/learner/learningPlan/');
        } else if (stepIndex === 1) {
            onBack();
        } else if (stepIndex <= currentStep && stepIndex >= 2) {
            // Allow navigation including review
            setCurrentStep(stepIndex);
            autoScrollToTop();
        }
    };

    // Update the save button logic
    const handleSaveAndContinue = async () => {
        setLastStep(currentStep);
        
        // No API call for set goal step, leave it to the review step
        if (currentStep === 4) {
            nextStep();
            autoScrollToTop();
            return;
        }
        
        const saveSuccess = await handleSaveStep(currentStep);

        // if not succesful, show error toast and blocking going to the next step
        if (saveSuccess) {
            nextStep();
            autoScrollToTop();
        } else {
            setErrorMessage('An error occurred while saving your progress. Please try again.');
            setShowErrorToast(true);
        }
    };

    const handleBack = () => {
        setLastStep(currentStep);
        prevStep();
        autoScrollToTop();
    };

    // Handle final page redirect
    const handleFinalSave = () => {
        router.push(`/edlm-portal/learner/learningPlan/?success=true`);
    };

    const handleSaveAndSubmit = async () => {
        const step4Success = await handleSaveStep(4);
        if (!step4Success) {
            setErrorMessage('An error occurred while saving your goals. Please try again.');
            setShowErrorToast(true);
            return;
        }
        
        const step5Success = await handleSaveStep(5);
        if (step5Success) {
            handleFinalSave();
        } else {
            setErrorMessage('An error occurred while saving your learning plan. Please try again.');
            setShowErrorToast(true);
        }
    };

    // Instant scroll to top when going to the next form step
    const autoScrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 2:
                return (
                    <NamePlanStep
                        planName={planName}
                        setPlanName={setPlanName}
                        timeframe={timeframe}
                        setTimeframe={setTimeframe}
                    />
                )
            case 3:
                return (
                    <ChooseSkillsStep
                        goals={goals}
                        addGoal={addGoal}
                        removeGoal={removeGoal}
                        updateGoal={updateGoal}
                        onCompetencyChange={onCompetencyChange}
                        showSuccessMessage={lastStep < currentStep}
                        planName={planName}
                    />
                )
            case 4:
                return (
                    <SetGoalsStep
                        goals={goals}
                        competencyGoals={competencyGoals}
                        setCompetencyGoals={setCompetencyGoals}
                        timeframe={timeframe}
                        getTimelineOptions={getTimelineOptions}
                        addGoalToCompetency={addGoalToCompetency}
                        removeGoalFromCompetency={removeGoalFromCompetency}
                        updateCompetencyGoal={updateCompetencyGoal}
                        addKSAToGoal={addKSAToGoal}
                        removeKSAFromGoal={removeKSAFromGoal}
                        updateKSAForGoal={updateKSAForGoal}
                        showSuccessMessage={lastStep < currentStep}
                    />
                )
            case 5:
                return (
                    <ReviewStep
                        planName={planName}
                        timeframe={timeframe}
                        goals={goals}
                        competencyGoals={competencyGoals}
                    />
                )
            default:
                return null;
        }
    };

    return (
        <DefaultLayout>
            <div className='bg-white shadow-md p-5 py-0 w-full h-full mb-5 rounded-xl m-4 -my-6 overflow-visible'>
                <div className='mt-10 pb-4 py-4'>
                    <div className="mb-6">
                        <Stepper
                            currentStep={currentStep}
                            steps={ALL_STEPS}
                            onStepClick={handleStepClick}
                        />
                        {showErrorToast && (
                            <div className="flex flex-col p-4 mt-4 mb-2 bg-red-100 rounded-lg w-full"> 
                                <div className="flex flex-row justify-between pb-2">
                                    <div className="flex flex-row items-center">
                                        <XCircleIcon className="w-6 h-6 text-red-900"/>
                                        <div className="text-lg text-red-900 font-bold pl-2">Learning plan failed to save</div>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Dismiss"
                                        className=""
                                        onClick={()=>{setShowErrorToast(false)}}
                                    >
                                        <XMarkIcon className='w-6 h-6 text-red-900' />
                                    </button>
                                </div>
                                <div className="text-red-900 text-medium">
                                    {errorMessage}
                                </div>
                            </div>
                        )}
                    </div>

                    {renderStepContent()}

                    <div className="flex justify-end items-center mt-8 gap-8">
                        {currentStep < 5 ? (
                            <>
                            <button
                                onClick={() => router.push('/edlm-portal/learner/learningPlan/')}
                                className="text-[#4883B4] text-base font-medium leading-[22.4px] hover:underline transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBack}
                                className="text-[#4883B4] text-base font-medium leading-[22.4px] hover:underline transition-all"
                            >
                                Back
                        </button>
                            <SaveAndContinueBtn
                                onClick={handleSaveAndContinue}
                                disabled={!canProceedFromStep(currentStep)}
                                loading={isLoading}
                                buttonText={currentStep === 4 ? 'Continue' : 'Save & Continue'}
                            />
                        </>
                    ) : (
                        <div className='flex flex-col -mt-8'>
                            <div className='p-4 border rounded-lg border-gray-300 mt-6'>
                                <div className='font-bold pb-6 text-xl text-gray-900'>Next Steps</div>
                                <div className='text-gray-890 pb-3'>Keep progressing with your development plan and explore additional resources.</div>
                                <div className='flex flex-row gap-4'>
                                <div className='flex flex-col w-1/3 border border-gray-300 rounded-lg py-4 px-6 items-center'>
                                    <div className='pb-2 font-bold text-lg'>Track Your Progress</div>
                                    <div className='text-sm pb-8 flex-wrap text-center'>Monitor your development through the Learning Plan page and update your progress as you complete courses.</div>
                                    <button 
                                    className='flex flex-row items-center gap-2 border border-blue-600 rounded-lg py-1 px-3 text-sm hover:bg-blue-100 text-blue-600'
                                    onClick={()=> {}}
                                    > View My Plans <ArrowLongRightIcon className='h-4 w-4' /> </button>
                                </div>
                                <div className='flex flex-col w-1/3 border border-gray-300 rounded-lg p-3 py-4 px-6 items-center'>
                                    <div className='pb-2 font-bold text-lg'>Explore Course Catalog</div>
                                    <div className='text-sm pb-8 flex-wrap text-center'>Browse additional courses and resources to supplement your development plan with more learning opportunities.</div>
                                    <button 
                                    className='flex flex-row items-center gap-2 border border-blue-600 rounded-lg py-1 px-3 text-sm hover:bg-blue-100 text-blue-600'
                                    onClick={()=> {}}
                                    > Browse Collections <ArrowLongRightIcon className='h-4 w-4' /> </button>
                                </div>
                                <div className='flex flex-col w-1/3 border border-gray-300 rounded-lg p-3 py-4 px-6 items-center'>
                                    <div className='pb-2 font-bold text-lg'>Add from Collections</div>
                                    <div className='text-sm pb-8 flex-wrap text-center'>Access your saved collections to add curated courses and resources to enhance your development plan.</div>
                                    <button 
                                    className='flex flex-row items-center gap-2 border border-blue-600 rounded-lg py-1 px-3 text-sm hover:bg-blue-100 text-blue-600'
                                    onClick={()=> {}}
                                    > View Collections <ArrowLongRightIcon className='h-4 w-4' /> </button>
                                </div>
                                </div>
                            </div>
                            <div className='flex flex-row justify-end items-center pt-8 gap-8'>
                                <button
                                    onClick={() => router.push('/edlm-portal/learner/learningPlan/')}
                                    className="text-[#4883B4] text-base font-medium leading-[22.4px] hover:underline transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBack}
                                    className="text-[#4883B4] text-base font-medium leading-[22.4px] hover:underline transition-all"
                                >
                                    Back
                                </button>
                                <SaveAndContinueBtn
                                    onClick={handleSaveAndSubmit}
                                    disabled={!canProceedFromStep(currentStep)}
                                    loading={isLoading}
                                    buttonText='Save & Submit'
                                />
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
