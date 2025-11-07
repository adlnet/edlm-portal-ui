'use-strict'

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAllLearningPlans } from '@/hooks/learningPlan/useAllLearningPlans';
import { useCreateLearningPlanGoalCourse } from '@/hooks/learningPlan/useCreateLearningPlanGoalCourse';
import { useLearningPlan } from '@/hooks/learningPlan/useLearningPlan';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Modal = ({ open, onClose, title, courseId, selectedPlan, setSelectedPlan, checkedGoals, setSuccessMessage, router, children }) => {
  const { mutate: createGoalCourse } = useCreateLearningPlanGoalCourse();

  if (!open) return null;

  const handleSaveToGoals = async () => {

    if (!selectedPlan || checkedGoals.length === 0 || !courseId) {
      return;
    }
    
    try {
      for (const goalId of checkedGoals) {
        
        const payload = {
          planGoalId: goalId,
          courseExternalReference: courseId
        };

        await new Promise((resolve, reject) => {
          createGoalCourse(payload, {
            onSuccess: (data) => {
              resolve(data);
            },
            onError: (error) => {
              console.error('Failed to save to goal');
              reject(error);
            }
          });
        });
      }

      setSuccessMessage(`"${title}" added to ${checkedGoals.length} ${checkedGoals.length === 1 ? 'goal' : 'goals'} in the "${selectedPlan.name}" learning plan!`);
      onClose();
    } catch (err) {
      console.error('Failed to save course to goals');
      setSuccessMessage(`Failed to save course. Please try again.`);
    }
  }

  const getModalTitle = () => {
    if (!selectedPlan) return `Add "${title}" to learning plan`;
    return `Select goals in ${selectedPlan.name}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 text-gray-900 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col relative">
        <div className='flex flex-row justify-between items-center border-b p-4 flex-shrink-0'>
          <h1 className="text-base font-bold">{getModalTitle()}</h1>
          <button className="group" onClick={onClose}>
            <XMarkIcon className='w-4 h-4 text-gray-600 transition-colors'/>
          </button>
        </div>
        
        <div className='p-4 border-b flex-1 overflow-y-auto min-h-0'>{children}</div>
        
        <div className='flex py-2 px-4 flex-shrink-0'>
          <button
            className='pr-4 text-md text-blue-700 hover:text-blue-300'
            onClick={onClose}          
          >
            Cancel
          </button>

          {selectedPlan ? (
            <>
              <button
                className="flex px-3 py-2 my-2 mr-4 text-center items-center rounded-md bg-blue-50 text-blue-700 text-md hover:bg-blue-200 transition-colors"
                onClick={() => setSelectedPlan(null)}
              >
                Back
              </button>
              <button
                className="flex px-3 py-2 my-2 text-center items-center rounded-md bg-blue-900 text-white text-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={checkedGoals.length === 0}
                onClick={handleSaveToGoals}
              >
                {checkedGoals.length > 0 ? ( 
                  <span>Save to ({checkedGoals.length}) Goals</span>
                ) : (
                  <span>Save to Goals</span>
                )}
              </button>
            </>
          ) : selectedPlan ? (
            <button
              className="flex px-3 py-2 my-2 mr-4 text-center items-center rounded-md bg-blue-50 text-blue-700 text-md hover:bg-blue-200 transition-colors"
              onClick={() => setSelectedPlan(null)}
            >
              Back
            </button>
          ) : (
            <button
              className="flex px-3 py-2 my-2 text-center items-center rounded-md bg-blue-50 text-blue-700 text-md hover:bg-blue-200 transition-colors"
              onClick={() => {router.push('/edlm-portal/learner/learningPlan/developmentPlan/')}}
            >
              Create Learning Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function SavePlanModal({ courseId, title, setIsDropdownOpen, setSuccessMessage}) {

  const router = useRouter();

  const { data: learningPlans = [], isLoading } = useAllLearningPlans();

  const [modal, setModal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkedGoals, setCheckedGoals] = useState([]);
  const { data: selectedPlanDetails } = useLearningPlan(selectedPlan?.id);


  const closeModal = () => {
    setModal(null);
    setIsDropdownOpen(false);
    setSelectedPlan(null);
    setCheckedGoals([]);
  };

  // Handle selection of a learning plan
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCheckedGoals([]); // Reset checked goals
  };

  const competenciesWithGoals = selectedPlanDetails ? 
    selectedPlanDetails.competencies.filter(comp => comp.goals && comp.goals.length > 0) : [];

  const handleGoalToggle = (goalId) => {
    setCheckedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  if (isLoading) {
    return (
      <button className='flex py-1 text-gray-400'>
        Loading plans...
      </button>
    );
  }

  return (
    <>
      <button 
        className='flex py-1 hover:text-blue-500'
        onClick={() => setModal("plan")}
      >
        Save to Learning Plan
      </button>

      <Modal
        open={modal === "plan"}
        onClose={closeModal}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        checkedGoals={checkedGoals}
        setSuccessMessage={setSuccessMessage}
        router={router}
        title={title}
        courseId={courseId}
      >
        {/* Select Learning Plan */}
        {!selectedPlan ? (
          <>
            {learningPlans.length === 0 ? (
              <>
                <p className='pt-2 pb-4'>Choose a learning plan to add this course to</p>
                <p className='pt-4 pb-2'>No Plans Yet. Create a new plan to get started.</p>
              </>
            ) : (
              <div className="space-y-4">
                <p className='pt-2 pb-4'>Choose a learning plan to add this course to</p>
                {learningPlans.map((plan) => (
                  <button 
                    key={plan.id} 
                    className='w-full text-left py-4 px-3 text-gray-900 border border-gray-300 rounded-lg flex flex-col hover:bg-blue-100 hover:border-blue-500'
                    onClick={() => handlePlanSelect(plan)}
                  >
                    <p className='text-base font-bold pb-2'>{plan.name}</p>
                    <p className='text-sm text-gray-500 mt-2'>
                      {plan.timeframe}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (

          // Select Goals (grouped with parent competencies)
          <>
            <p className='pt-2 pb-4'>Select one or more goals for this course</p>
            {competenciesWithGoals.length === 0 ? (
              <p className='py-4 text-gray-500'>No goals in this plan yet.</p>
            ) : (
              <div className="space-y-6">
                {competenciesWithGoals.map((competency) => (
                  <div key={competency.id} className="space-y-2">
                    <div className="self-stretch justify-start text-General-Foreground-Primary text-base font-semibold leading-6">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {competency.plan_competency_name}
                      </h3>
                    </div>
                    
                    {/* Goals */}
                    <ul className="space-y-2 ">
                      {competency.goals.map((goal) => (
                        <li key={goal.id} className="flex items-center">
                          <label className="flex items-center cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={checkedGoals.includes(goal.id)}
                              onChange={() => handleGoalToggle(goal.id)}
                              className="hidden"
                            />
                            <span
                              className={`w-5 h-5 flex items-center justify-center border rounded border-gray-300 mr-3 transition
                                ${
                                  checkedGoals.includes(goal.id)
                                    ? "bg-blue-900 border-blue-900"
                                    : "bg-white"
                                }`}
                            >
                              {checkedGoals.includes(goal.id) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="text-gray-900">{goal.goal_name || goal.description}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
