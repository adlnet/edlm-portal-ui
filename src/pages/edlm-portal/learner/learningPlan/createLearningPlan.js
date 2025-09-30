'use strict';

import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Button } from 'flowbite-react';
import { ChooseSkillsStep } from '@/components/steps/ChooseSkillsStep';
import { NamePlanStep } from '@/components/steps/NamePlanStep';
import { ReviewStep } from '@/components/steps/ReviewStep';
import { SetGoalsStep } from '@/components/steps/SetGoalsStep';
import { useLearningPlanForm } from '@/hooks/useLearningPlanForm';
import { useLearningPlanSave } from '@/hooks/useLearningPlanSave';
import { useLearningPlanValidation } from '@/hooks/useLearningPlanValidation';
import { useRouter } from 'next/router';
import DefaultLayout from "@/components/layouts/DefaultLayout";
import SaveAndContinueBtn from '@/components/buttons/SaveAndContinueBtn';
import Stepper from '@/components/Stepper';

const ALL_STEPS = [
    'Learning Plans',
    'Create a New Plan',
    'Name Your Plan',
    'Choose a Skill Area',
    'Set Competency Goals',
    'Review & Save'
];

export default function CreatePlanForm({ initialStep = 2, onBack}) {
    const router = useRouter();

    const formState = useLearningPlanForm(initialStep, onBack);
    const { handleSaveStep, isLoading } = useLearningPlanSave(formState);
    const { canProceedFromStep, getTimelineOptions } = useLearningPlanValidation(formState);

    const {
        currentStep,
        setCurrentStep,
        savedPlanId,
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
        } else if (stepIndex <= currentStep) {
            setCurrentStep(stepIndex);
            autoScrollToTop();
        }
    };

    // Update the save button logic
    const handleSaveAndContinue = () => {
        handleSaveStep(currentStep);
        nextStep();
        autoScrollToTop();
    };

    // Handle final page redirect
    const handleFinalSave = () => {
        router.push(`/edlm-portal/learner/learningPlan/`);
    };

    const handleExport = () => {
        console.log('Future export functionality');
    }

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
                                onClick={prevStep}
                                className="text-[#4883B4] text-base font-medium leading-[22.4px] hover:underline transition-all"
                            >
                                Back
                        </button>
                            <SaveAndContinueBtn
                                onClick={handleSaveAndContinue}
                                disabled={!canProceedFromStep(currentStep)}
                                loading={isLoading}
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
                            <div className='flex flex-row justify-end pt-8'>
                                <Button 
                                className='flex justify-center bg-blue-100 text-blue-900 hover:bg-blue-300' 
                                onClick={() =>{}}
                                >
                                Export 
                                </Button>
                                <Button className='flex justify-center bg-blue-900 hover:bg-blue-600 ml-2'
                                    onClick={handleFinalSave}
                                    disabled={!canProceedFromStep(currentStep)}
                                >
                                    Return to Learning Plan
                                </Button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
