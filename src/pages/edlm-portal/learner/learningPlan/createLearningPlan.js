'use strict';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DefaultLayout from "@/components/layouts/DefaultLayout";
import SaveAndContinueBtn from '@/components/buttons/SaveAndContinueBtn';
import Stepper from '@/components/Stepper';
import backupData from '@/public/backup_competencies.json';

const ALL_STEPS = [
    'Learning Plans',
    'Create a New Plan',
    'Name Your Plan',
    'Choose a Skill Area',
    'Set Competency Goals',
    'Review & Save'
];

// Dropdown options
const timeframeOptions = ['Short-term (1–2 years)', 'Long-term (3–4 years)'];
const proficiencyLevels = ['Basic', 'Intermediate', 'Advanced', 'Mastery'];
const priorityOptions = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];

// Helper function that returns all parent competencies
function findParents({ Competencies }) {
    const parentComps = []

    Competencies.forEach((comp) => {
        if (comp['parent'].length === 0)
            parentComps.push(comp);
    })

    return parentComps
}

export default function CreatePlanForm({ initialStep = 2, onBack }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [planName, setPlanName] = useState('');
    const [timeframe, setTimeframe] = useState('');
    const [goals, setGoals] = useState([
        {
            id: crypto.randomUUID(),
            competency: '',
            current: 'Basic',
            target: 'Intermediate',
            priority: '',
            description: '',
            selectedCourses: [],
            recs: [],
        },
    ]);

    const addGoal = () =>
        setGoals((goals) => [
            ...goals,
            {
                id: crypto.randomUUID(),
                competency: '',
                current: 'Basic',
                target: 'Intermediate',
                priority: '',
                description: '',
                selectedCourses: [],
                recs: [],
            },
        ]);

    const Competencies = backupData;
    const ParentComps = findParents({ Competencies });

    const removeGoal = id => {
        setGoals(goals => goals.filter((goal) => goal.id !== id));
    };

    // If this is the goal we want to update, merge the updates with existing goal data
    // If not the goal, return it unchanged
    const setGoalState = (id, updates) => {
        setGoals((goals) => goals.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)));
    };

    const updateGoal = (id, key, value) => {
        const objectUpdate = { [key]: value };
        setGoalState(id, objectUpdate);
    };

    const onCompetencyChange = (goalId, newCompetency) => {
        const recs = []
        setGoalState(goalId, {
            competency: newCompetency,
            recs,
            selectedCourses: [],
        });
    };

    const addCourseToGoal = (goalId, course) => {
        setGoals((goals) =>
            goals.map((goal) => {
                if (goal.id !== goalId) return goal;
                const exists = goal.selectedCourses.some(selectedCourse => selectedCourse.id === course.id);

                // If course already exist dont add again
                if (exists) return goal;
                return {
                    ...goal,
                    selectedCourses: [...goal.selectedCourses, course]
                };
            }),
        );
    };

    const removeCourseFromGoal = (goalId, courseId) => {
        setGoals((goals) =>
            goals.map((goal) => {
                // If goal is not the one to update, return it unchanged
                if (goal.id !== goalId) return goal;
                return { ...goal, selectedCourses: goal.selectedCourses.filter(selectedCourse => selectedCourse.id !== courseId) };
            }),
        );
    };

    // Aggregate all selected courses across all goals for Learning Plan Summary table
    const selectedPlanCourses = [];
    for (const goal of goals) {
        for (const course of goal.selectedCourses) {
            selectedPlanCourses.push({
                ...course,
                competency: goal.competency || '—',
                priority: goal.priority || '—',
            });
        }
    }

    const handleSave = () => {
        const payload = { planName, timeframe, goals };
        console.log('Learning Plan payload:', payload);
        router.push('/edlm-portal/learner/learningPlan/');
    };

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
        }
    };

    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 2) {
            setCurrentStep(currentStep - 1);
        } else {
            onBack();
        }
    };

    // These conditions validates if a user can go to the next step and enable the save button
    const canProceedFromStep = step => {
        switch (step) {
            case 2:
                return planName && timeframe;
            case 3:
                return goals.some(goal => goal.competency && goal.priority);
            case 4:
                return goals.filter(g => g.competency).every(goal =>
                    goal.current && goal.target && goal.priority
                );
            case 5:
                return true;
            default:
                return false;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 2:
                return renderNamePlanStep();
            case 3:
                return renderChooseSkillsStep();
            case 4:
                return renderSetGoalsStep();
            case 5:
                return renderReviewStep();
            default:
                return null;
        }
    };
  const renderNamePlanStep = () => (
    <>
      <div>
        <h2 className="text-lg font-semibold">Name Your Plan</h2>
        <p className="text-sm text-gray-500">
          What would you like to call your learning plan? And when do you want to finish it?
        </p>
        <p>
          * = required
        </p>
      </div>
      <div className="mt-2 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
              <Label htmlFor="planName" value="Plan Name" />
              <TextInput
                  id="planName"
                  placeholder="e.g., My 2025 Development Plan"
                  value={planName}
                  onChange={e => setPlanName(e.target.value)}
              />
          </div>
          <div className="flex flex-col gap-2">
              <Label htmlFor="timeframe" value="Completion Timeframe" />
              <Select
                  id="timeframe"
                  value={timeframe}
                  onChange={e => setTimeframe(e.target.value)}
              >
                  <option value="" disabled>
                      Select timeframe
                  </option>
                  {timeframeOptions.map(t => (
                      <option key={t} value={t}>
                          {t}
                      </option>
                  ))}
              </Select>
          </div>
      </div>
    </>
  );

  const renderChooseSkillsStep = () => (
    <>
      <h2 className="text-lg font-semibold -mb-4">Choose a Skill Area</h2>
        <p className="text-sm py-4">
          Select one or more DOT&E competencies you’d like to develop, based on current job requirements or personal growth interests.
        </p>
        {goals.map(goal => {
          // Find the selected competency
          const selectedCompetency = ParentComps.find(c => c.name === goal.competency);
            return (
                <div key={goal.id} className=" border-b py-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label value="Competency" />
                            <Select
                                value={goal.competency}
                                onChange={(e) => onCompetencyChange(goal.id, e.target.value)}
                            >
                                <option value="" disabled>
                                    Select competency
                                </option>
                                {ParentComps.map((c) => (
                                    <option
                                        key={c.id}
                                        value={c.name}
                                    >
                                        {c.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label value="Competency Description" />
                          <div className=" min-h-[120px] flex items-start">
                            {selectedCompetency ? (
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {selectedCompetency.desc}
                                  </p>
                                ) : (
                                  <p className="text-sm text-gray-500">
                                    Choose a competency to view its description here
                                  </p>
                                )}
                            </div>
                            {selectedCompetency && (
                                    <div className="flex justify-end hover:cursor-pointer -mt-8">
                                        <button 
                                            className="text-center justify-center text-[#4883B4] text-[11px] font-normal leading-[14.3px] hover:underline transition-all"
                                            onClick={() => {
                                              // I'll make this open a new page and redirecting to competency page?
                                                console.log(selectedCompetency.name);
                                            }}
                                        >
                                            View more
                                        </button>
                                    </div>
                                )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label value="Priority Level" />
                            <Select value={goal.priority} onChange={(e) => updateGoal(goal.id, 'priority', e.target.value)}>
                                <option value="" disabled>
                                    Select priority
                                </option>
                                {priorityOptions.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </Select>
                        </div>
                      </div>
                  </div>
            );
        })}
        </>
    );

    const renderSetGoalsStep = () => (
        <div>Dev team is working hard on this step.</div>
    );

    const renderReviewStep = () => (
        <div>Dev team is working hard on this step.</div>
    );

    return (
        <DefaultLayout>
            <div className='bg-white shadow-md p-5 py-0 w-full h-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
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

                        <div className="flex gap-3">
                            {currentStep < 5 ? (
                                <SaveAndContinueBtn
                                    onClick={nextStep}
                                    disabled={!canProceedFromStep(currentStep)}
                                />
                            ) : (
                                <Button
                                    onClick={handleSave}
                                    disabled={!canProceedFromStep(currentStep)}
                                >
                                    Save Learning Plan
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
