'use-strict';

import { Button } from 'flowbite-react';
import { ChevronRightIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ChooseSkillsStep } from '@/components/steps/ChooseSkillsStep';
import { CompetencyProvider } from '@/contexts/CompetencyContext';
import { SetGoalsStepEdit } from '@/components/steps/SetGoalsStepEdit';
import { TextInput } from 'flowbite-react';
import { timeframeOptions } from '@/utils/dropdownMenuConstants';
import { useDeleteLearningPlan } from '@/hooks/learningPlan/useDeleteLearningPlan';
import { useEffect, useState } from 'react';
import { useLearningPlan } from '@/hooks/learningPlan/useLearningPlan';
import { useLearningPlanForm } from '@/hooks/learningPlan/useLearningPlanForm';
import { useLearningPlanValidation } from '@/hooks/learningPlan/useLearningPlanValidation';
import { useRouter } from 'next/router';
import { useUpdateBulkLearningPlan } from '@/hooks/learningPlan/useUpdateBulkLearningPlan';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import DeletePlanModal from '@/components/modals/DeletePlanModal';
import Image from 'next/image';
import XMarkMessageToast from '@/components/cards/XMarkMessageToast';

function EditPlanContent() {

  const router = useRouter();
  const { planId } = router.query;

  const { data: plan, isLoading: planLoading } = useLearningPlan(planId);
  const { updateCompleteLearningPlan, isLoading: saveLoading } = useUpdateBulkLearningPlan();
  const { mutateAsync: deletePlan } = useDeleteLearningPlan();
  const [isInitialized, setIsInitialized] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deletedCompetencies, setDeletedCompetencies] = useState([]);
  const [showChooseSkills, setShowChooseSkills] = useState(false);


  const formState = useLearningPlanForm(2, () => router.back());
  const {
    planName, setPlanName,
    timeframe, setTimeframe,
    goals, setGoals,
    competencyGoals, setCompetencyGoals,
    addGoalToCompetency,
    removeGoalFromCompetency,
    updateCompetencyGoal,
    addKSAToGoal,
    removeKSAFromGoal,
    updateKSAForGoal,
    addGoal,
    removeGoal,
    updateGoal,
    onCompetencyChange
  } = formState;

  const { getTimelineOptions } = useLearningPlanValidation(formState);

  useEffect(() => {
    if (plan && !isInitialized) {
      setPlanName(plan.name);
      setTimeframe(plan.timeframe);

      // competencies to goals
      const transformedGoals = plan.competencies?.map(comp => ({
        id: comp.id,
        competency: comp.plan_competency_name,
        competencyId: comp.eccr_competency,
        priority: comp.priority,
        originalId: comp.id
      })) || [];

      // goals and KSAs
      const transformedCompetencyGoals = {};
      plan.competencies?.forEach(comp => {
        transformedCompetencyGoals[comp.plan_competency_name] = comp.goals?.map(goal => ({
          id: goal.id,
          goal: goal.goal_name,
          timeline: goal.timeline,
          resources: goal.resources_support || [],
          obstacles: goal.obstacles || [],
          resourcesOther: goal.resources_support_other || '',
          obstaclesOther: goal.obstacles_other || '',
          originalId: goal.id,
          ksas: goal.ksas?.map(ksa => ({
            id: ksa.id,
            type: ksa.ksa_name,
            ksaId: ksa.eccr_ksa,
            currentLevel: ksa.current_proficiency,
            targetLevel: ksa.target_proficiency,
            originalId: ksa.id
          })) || []
        })) || [];
      });

      setGoals(transformedGoals);
      setCompetencyGoals(transformedCompetencyGoals);
      setIsInitialized(true);
    }
  }, [plan, isInitialized, setPlanName, setTimeframe, setGoals, setCompetencyGoals]);

  const handleSave = async () => {
    try {
        const competenciesData = goals.map(goal => {
            const competencyGoalsList = competencyGoals[goal.competency] || [];
            return {
                id: goal.originalId || goal.id,
                name: goal.competency,
                competencyId: goal.competencyId,
                priority: goal.priority,
                isNew: !goal.originalId,
                goals: competencyGoalsList.map(compGoal => ({
                    id: compGoal.originalId || compGoal.id,
                    goal: compGoal.goal,
                    timeline: compGoal.timeline,
                    resources: compGoal.resources,
                    obstacles: compGoal.obstacles,
                    resourcesOther: compGoal.resourcesOther,
                    obstaclesOther: compGoal.obstaclesOther,
                    isNew: !compGoal.originalId,
                    ksas: compGoal.ksas?.map(ksa => ({
                        id: ksa.originalId || ksa.id,
                        type: ksa.type,
                        ksaId: ksa.ksaId,
                        currentLevel: ksa.currentLevel,
                        targetLevel: ksa.targetLevel,
                        isNew: !ksa.originalId
                    })) || []
                }))
            };
        });

      deletedCompetencies.forEach(competencyName => {
        if (!competenciesData.find(comp => comp.name === competencyName)) {
          const originalCompetency = plan.competencies?.find(comp => comp.plan_competency_name === competencyName);
          if (originalCompetency) {
            competenciesData.push({
              id: originalCompetency.id,
              name: competencyName,
              priority: originalCompetency.priority,
              competencyId: originalCompetency.eccr_competency,
              goals: [],
              isNew: false,
              isDeleted: true
            });
          }
        }
      });

      const success = await updateCompleteLearningPlan({
        planId,
        planName,
        timeframe,
        competencies: competenciesData
      });

      if (success) {
        router.push(`/edlm-portal/learner/learningPlan/${planId}?updated=1`);
      } else {
          console.error('Failed to save plan');
          setErrorMessage('An error occurred while saving your progress. Please try again.');
          setShowErrorToast(true);
          setTimeout(() => {
            setShowErrorToast(false);
          }, 5000);
      }
    } catch (err) {
        console.error('Error saving plan');
          setErrorMessage('An error occurred while saving your progress. Please try again.');
          setShowErrorToast(true);
          setTimeout(() => {
            setShowErrorToast(false);
        }, 5000);
    }
  };

  const handleAddGoal = () => {
    if (goals.length === 0) {
      addGoal();
    }
    setShowChooseSkills(true);
  };
  const handleSkillsStepComplete = () => {
    setShowChooseSkills(false);
  };

  const [delPlanModalOpen, setDelPlanModalOpen] = useState(false);

  const handlePlanDelete = async () => {
    try {
      await deletePlan(planId);
      setDelPlanModalOpen(false);
      router.push('/edlm-portal/learner/learningPlan/');
    } catch (error) {
      console.error('Error deleting plan');
    }
  };

  if (!router.isReady || planLoading) {
    return (
      <DefaultLayout>
        <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
          <div className='mt-10 pb-4 py-4'>
            Loading...
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (!plan) {
    return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          No Learning Plans with that ID were found.
        </div>
      </div>
    </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        {showErrorToast && (
          <div className="fixed top-10 right-10 justify-center z-9999">
            <XMarkMessageToast message={errorMessage} />
          </div>
        )}
        <div className='mt-10 pb-4 py-4'>

          <div className='flex flex-row text-blue-700 items-center gap-2 mb-4'>
            <button onClick={() => {router.push('/edlm-portal/learner/learningPlan/')}}>Learning Plans</button>
            <ChevronRightIcon className='h-4 w-4'></ChevronRightIcon>
            <p>{planName}</p>
            <ChevronRightIcon className='h-4 w-4'></ChevronRightIcon>
            <p>Edit Plan</p>
            <ChevronRightIcon className='h-4 w-4 text-gray-400'></ChevronRightIcon>
            <p className='text-gray-400'>Review & Save</p>
          </div>
           {showChooseSkills ? (
            <>
              <ChooseSkillsStep
                goals={goals}
                addGoal={addGoal}
                removeGoal={removeGoal}
                updateGoal={updateGoal}
                onCompetencyChange={onCompetencyChange}
                planName={planName}
              />
              <div className='flex flex-row justify-end pt-8 items-center'>
                <button 
                  className='flex justify-center text-blue-700 hover:text-blue-300 pr-6' 
                  onClick={() => setShowChooseSkills(false)}
                >
                  Cancel 
                </button>
                <Button 
                  className='flex justify-center bg-blue-900 hover:bg-blue-600 ml-2'
                  onClick={handleSkillsStepComplete}
                >
                  Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className='text-2xl text-gray-900 font-bold'>Edit Plan</h1>

              <div className='w-full flex flex-row items-center justify-end pb-2 pr-1'>
                <button
                  className='text-blue-700 hover:text-blue-400'
                  onClick={()=> setDelPlanModalOpen(true)}
                >
                  <div className='flex flex-row'>
                    <TrashIcon className='h-5 w-5'/>
                    <p className='pl-1'>Delete</p>
                  </div>
                </button>
              </div>

              <DeletePlanModal
                open={delPlanModalOpen}
                onClose={() => setDelPlanModalOpen(false)}
                onDelete={handlePlanDelete}
              />

              <div className='text-red-800 flex flex-row items-center'>
                <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                <p className='pl-1'>= Required</p>
              </div>

              <h1 className='text-2xl text-gray-900 font-bold pt-2'> Plan Name</h1>

              {/* Plan Name and Date Section */}
              <div className="mt-2 grid gap-6 md:grid-cols-2 pt-2 text-gray-900 pb-8 border-b">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-sm font-bold">
                    Plan Name <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
                  </span>
                  <TextInput
                    id="planName"
                    placeholder="Create a name for your learning plan"
                    value={planName}
                    onChange={e => setPlanName(e.target.value)}
                  />
                  <span className='flex items-center gap-2 text-sm text-gray-600'>
                    Create a name for your learning plan
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-sm font-bold">
                    Completion Timeframe <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
                  </span>
                  <CustomDropdown
                    value={timeframe}
                    onChange={e => setTimeframe(e.target.value)}
                    options={timeframeOptions}
                    placeholder="When do you aim to complete this plan?"
                  />
                </div>
              </div>
              <div className='pt-6'>
                <SetGoalsStepEdit
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
                  removeGoal={removeGoal}
                  showTrashIcon={true}
                  setDeletedCompetencies={setDeletedCompetencies} 
                />
              </div>

              <div className="flex mt-10 pl-2 border-t pt-10 items-center">
                <button
                  onClick={handleAddGoal}
                  className="flex items-center gap-2 text-[#4883B4] text-base font-medium leading-[22.4px] hover:underline transition-all bg-transparent border-none"
                >
                  <PlusIcon className="w-5 h-5" />
                  <p className='pt-0.5'>Add Another Competency</p>
                </button>
              </div>     

              {/* Cancel and Continue Buttons */}
              <div className='flex flex-row justify-end pt-8 items-center'>
                <button 
                  data-testid="cancel-button"
                  className='flex justify-center text-blue-700 hover:text-blue-300 pr-6' 
                  onClick={() =>{router.push(`/edlm-portal/learner/learningPlan/${planId}`)}}
                >
                  Cancel 
                </button>
                <Button 
                  className='flex justify-center bg-blue-900 hover:bg-blue-600 ml-2'
                  onClick={handleSave}
                  disabled={saveLoading}
                >
                  Save & Continue
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default function EditPlan() {
  return (
    <CompetencyProvider>
      <EditPlanContent />
    </CompetencyProvider>
  );
}
