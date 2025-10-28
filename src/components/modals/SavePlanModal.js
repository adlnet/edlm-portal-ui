'use-strict'

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';

// const learningPlans = []
const learningPlans = [
  {
    id: 0, 
    title: "2026 Plan",
    description: "2026 goals and trajectory",
    goals: [
      {
        id: 0,
        description:"Lead a cross functional project to improve team collaboration by March."
      },
      {
        id: 1,
        description:"Define acquisition requirements for upcoming contract."
      },
      {
        id: 2,
        description:"Another goal that I want to accomplish!"
      }
    ]
  },
  {
    id: 1, 
    title: "Data Science Mastery",
    description: "Journey from beginner to data scientist",
    goals: [
      {
        id: 0,
        description:"Lead a cross functional project to improve team collaboration by March."
      }
    ]
  },
  {
    id: 2, 
    title: "Product Design Path",
    description: "Become a skilled product designer",
    goals: [
      {
        id: 0,
        description:"Lead a cross functional project to improve team collaboration by March."
      },
      {
        id: 1,
        description:"Define acquisition requirements for upcoming contract."
      }
    ]
  },
]

const Modal = ({ open, onClose, title, selectedPlan, setSelectedPlan, checkedGoals, setSuccessMessage, router, children}) => {
  
  if (!open) return null;

  const handleSaveToGoals = async () => {
    if (!selectedPlan || checkedGoals.length === 0) return;
    setSuccessMessage(`"${title}" added to the "${selectedPlan.title}" learning plan!`);
    onClose()
    console.log("Success")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 text-gray-900">
      <div className="bg-white rounded-lg w-2/5 relative">
        <div className='flex flex-row justify-between items-center border-b p-4'>
          {!selectedPlan ? (
              <h1 className="text-base font-bold">Add &quot;{title}&quot; to learning plan</h1>
            ) :(
              <h1 className="text-base font-bold">Goals in {selectedPlan.title}</h1>
            )
          }
          
          <button
              className="group"
              onClick={onClose}
          >
            <XMarkIcon className='w-4 h-4 text-gray-600 transition-colors'/>
          </button>
        </div>
        <div className='p-4 border-b'>{children}</div>
        <div className='flex py-2 px-4'>
          <button
            className=' pr-4 text-md text-blue-700 hover:text-blue-300'
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
                className="flex px-3 py-2 my-2 text-center items-center rounded-md bg-blue-900 text-white text-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:pointer-none"
                disabled={checkedGoals.length == 0}
                onClick={handleSaveToGoals}
              >
                {checkedGoals.length > 0 ? ( 
                  <span>Save to ({checkedGoals.length}) Goals</span>
                ) : (
                  <span>Save to Goals</span>
                )}
              </button>
            </> ) : 
            (
              <button
                className="flex px-3 py-2 my-2 text-center items-center rounded-md bg-blue-50 text-blue-700 text-md hover:bg-blue-200 transition-colors"
                onClick={() => {router.push('/edlm-portal/learner/learningPlan/developmentPlan/')}}
              >
                Create Learning Plan
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default function SavePlanModal({ courseId, title, setIsDropdownOpen, setSuccessMessage}) {

  const router = useRouter();

  const [modal, setModal] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkedGoals, setCheckedGoals] = useState([]);

  const closeModal = () => setModal(null) & setIsDropdownOpen(false);

    // Handle selection of a learning plan
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCheckedGoals([]); // Reset checked goals
  };

  // Handle toggling goals
  const handleGoalToggle = (goal) => {
    setCheckedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  // temporary mock data
  title = "Design Considerations Fundamentals"

  //some kind of get for all learning plans

  return (
    <>
      <button 
        className='flex py-1 hover:text-blue-500'
        onClick={() => {
          setModal("plan")
        }}
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
      >
        {/* No Learning Plans */}
        {learningPlans.length == 0 && (
          <>
            <p className='pt-2 pb-4'>Choose a learning plan to add to this course to</p>
            <p className='pt-4 pb-2'>No Plans Yet. Create a new plan to get started.</p>
          </>
        )}

        {/* Select a plan */}
        {!selectedPlan ? (
          <>
            <p className='pt-2 pb-4'>Choose a learning plan to add to this course to</p>
            {learningPlans.map((plan) => (
              <button 
                key={plan.id} 
                className='w-full text-left py-4 px-3 mb-4 text-gray-900 border border-gray-300 rounded-lg flex flex-col hover:bg-blue-100 hover:border-blue-500'
                onClick={() => {handlePlanSelect(plan)}}
              >
                <p className='text-base font-bold pb-2'>{plan.title}</p>
                <p className='text-gray-700'>{plan.description}</p>
              </button>
            ))}
          </>
        ) : (
          <>
            <p className='pt-2 pb-4'>Select one or more goals for this course</p>
            <ul className="space-y-2 pb-2">
              {selectedPlan.goals.map((goal) => (
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
                    <span className="text-gray-900">{goal.description}</span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}
      </Modal>
    </>
  )
};