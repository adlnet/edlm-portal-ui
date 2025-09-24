'use strict';
import { Accordion, Button, Label, Select, TextInput } from 'flowbite-react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DefaultLayout from "@/components/layouts/DefaultLayout";
import DevelopmentGoal from '@/components/cards/DevelopmentGoal';
import PlanDetailPage from '@/pages/edlm-portal/learner/learningPlan/[planId]';
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
const shortTermGoalTimeLine = [
    '1-3 months',
    '3-6 months',
    '6-9 months',
    '9-12 months',
    '12-18 months',
    '18-24 months'
];

const longTermGoalTimeLine = [
    '2-2.5 years',
    '2.5-3 years',
    '3-3.5 years',
    '3.5-4 years',
    '4-4.5 years',
    '4.5-5 years'
];

const resourceSupportOptions = [
    'Formal training courses or certifications',
    'Stretch assignments or special projects',
    'Online learning platforms and resources',
    'External professional networking',
    'Mentorship from senior colleagues',
    'Professional conferences and workshops',
    'Cross-functional team collaborations',
    'Supervisor guidance and support',
    'Other'
];

const obstacleOptions = [
    'Limited time due to current workload',
    'Limited prior experience in this area',
    'Limited availability of mentors/experts',
    'Prerequisite skills or knowledge gaps',
    'Budget constraints for traning/resources',
    'Competing work priorities and deadlines',
    'Need for additional organizational support',
    'Access to necessary tools or technology',
    'Other'
];

const ksaOptions = [
    { name: 'Opposing Forces', description: 'In coordination with the Intelligence Community, maintains operational understanding' },
    { name: 'System User', description: 'Understands the user mission/training and how the user will use and operate the DoD systems' },
    { name: 'DoD Systems', description: 'Understands the DoD systems and its mission critical function including but not limited to sub-components' },
];

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
    const [competencyGoals, setCompetencyGoals] = useState({});
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

    const handleSave = () => {
        const payload = { planName, timeframe, goals, competencyGoals };
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
                const selectedCompetencies = goals.filter(goal => goal.competency).map(goal => goal.competency);
                const availableTimelineOptions = getTimelineOptions();

                return selectedCompetencies.every(competency => {
                    const compData = competencyGoals[competency];
                    return compData?.goal &&
                        compData?.timeline &&
                        availableTimelineOptions.includes(compData.timeline) &&
                        compData?.ksas?.every(ksa => ksa.type && ksa.currentLevel && ksa.targetLevel);
                });
            case 5:
                return true;
            default:
                return false;
        }
    };

    // Get timeline options based on selelcted plan timeframe
    const getTimelineOptions = () => {
        if (timeframe === 'Short-term (1–2 years)') {
            return shortTermGoalTimeLine;
        } else if (timeframe === 'Long-term (3–4 years)') {
            return longTermGoalTimeLine;
        }
        return [];
    };

    const addKSAToCompetency = competencyName => {
        setCompetencyGoals(prev => ({
            ...prev,
            [competencyName]: {
                ...prev[competencyName],
                ksas: [
                    ...(prev[competencyName]?.ksas || []),
                    {
                        id: crypto.randomUUID(),
                        type: '',
                        currentLevel: 'Basic',
                        targetLevel: 'Intermediate'
                    }
                ]
            }
        }));
    };

    const removeKSAFromCompetency = (competencyName, ksaId) => {
        setCompetencyGoals(prev => ({
            ...prev,
            [competencyName]: {
                ...prev[competencyName],
                ksas: prev[competencyName]?.ksas?.filter(ksa => ksa.id !== ksaId) || []
            }
        }));
    };

    const updateCompetencyGoal = (competencyName, field, value) => {
        setCompetencyGoals(prev => ({
            ...prev,
            [competencyName]: {
                ...prev[competencyName],
                [field]: value
            }
        }));
    };

    const updateKSA = (competencyName, ksaId, field, value) => {
        setCompetencyGoals(prev => ({
            ...prev,
            [competencyName]: {
                ...prev[competencyName],
                ksas: prev[competencyName]?.ksas?.map(ksa =>
                    ksa.id === ksaId ? { ...ksa, [field]: value } : ksa
                ) || []
            }
        }));
    };

    const MultiSelectDropdown = ({
        options,
        selectedValues = [],
        onChange,
        placeholder,
        disabled = false
    }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'
                        }`}
                >
                    <div className="flex justify-between items-center">
                        <span className={selectedValues.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                            {selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
                        </span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute z-[99999] w-full mt-1 p-4 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <label key={option} className="flex items-center mb-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedValues.includes(option)}
                                    onChange={(e) => {
                                        const newValues = e.target.checked
                                            ? [...selectedValues, option]
                                            : selectedValues.filter(v => v !== option);
                                        onChange(newValues);
                                    }}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500"
                                />
                                <span className="ml-3 text-sm text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        );
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
                <h2 className="text-lg font-semibold pb-8">Name Your Plan</h2>
                <p className="text-sm text-gray-500 pb-8">
                    What would you like to call your learning plan? And when do you want to finish it?
                </p>
                <p>
                    * = required
                </p>
            </div>
            <div className="mt-2 grid gap-6 md:grid-cols-2 pt-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="planName" value="Plan Name *" />
                    <TextInput
                        id="planName"
                        placeholder="e.g., My 2025 Development Plan"
                        value={planName}
                        onChange={e => setPlanName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="timeframe" value="Completion Timeframe *" />
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
                // Check if a competency is already added to this goal
                const isCompetencySelected = (competencyName) => goals.some(g => g.competency === competencyName);
                const selectedCompetency = ParentComps.find(c => c.name === goal.competency);
                return (
                    <div key={goal.id} className=" border-b py-4">
                        <div className="grid gap-10 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label value="Choose a Competency *" />
                                <Select
                                    value={goal.competency}
                                    onChange={(e) => onCompetencyChange(goal.id, e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select competency
                                    </option>
                                    {ParentComps.map((c) => {
                                        const isDisabled = isCompetencySelected(c.name) && goal.competency !== c.name;
                                        return (
                                            <option
                                                key={c.id}
                                                value={c.name}
                                                disabled={isDisabled}
                                            >
                                                {c.name}
                                            </option>
                                        );
                                    })}
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
                                    <div className="flex justify-end hover:cursor-pointer -mt-4">
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
                            <div className="flex flex-col gap-2 -mt-16">
                                <Label value="Priority *" />
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
            <div className="flex mt-4 mb-6">
                <button
                    onClick={addGoal}
                    className="flex items-center gap-2 text-[#4883B4] text-base font-medium leading-[22.4px] hover:underline transition-all bg-transparent border-none"
                >
                    <PlusIcon className="w-4 h-4" />
                    <span>Add Another Competency</span>
                </button>
            </div>
        </>
    );

    const renderSetGoalsStep = () => {
        const selectedCompetencies = goals
            .filter(goal => goal.competency)
            .map(goal => goal.competency);

        const availableTimelineOptions = getTimelineOptions();

        return (
            <>
                <div className="mb-6 space-y-4">
                    <h2 className="text-lg font-semibold">Set Competency Goals</h2>
                    <p className="text-sm text-gray-500">
                        Now, let’s narrow it down. Within each selected competency, define the goal you wish to achieve noting timeframe for completion, relevant KSAs, baseline and target proficiency per KSA, and obstacles and resources needed to support goal attainment. Multiple goals can be established per competency.
                    </p>
                </div>

                <Accordion className="border rounded-lg">
                    {selectedCompetencies.map((competency, index) => {
                        const competencyData = competencyGoals[competency] || {};

                        // Initialize competency goals if not exists
                        if (!competencyGoals[competency]) {
                            setCompetencyGoals(prev => ({
                                ...prev,
                                [competency]: {
                                    goal: '',
                                    timeline: '',
                                    resources: [],
                                    resourcesOther: '',
                                    obstacles: [],
                                    obstaclesOther: '',
                                    ksas: [{
                                        id: crypto.randomUUID(),
                                        type: '',
                                        description: '',
                                        currentLevel: 'Basic',
                                        targetLevel: 'Intermediate'
                                    }]
                                }
                            }));
                        }

                        return (
                            <Accordion.Panel key={competency}>
                                <Accordion.Title className="text-left bg-white border border-gray-200 hover:bg-gray-50">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="font-medium text-blue-900">
                                            {competency}
                                        </span>
                                        <span className="text-sm text-gray-500 mr-4">
                                            Priority: {goals.find(g => g.competency === competency)?.priority || 'Not set'}
                                        </span>
                                    </div>
                                </Accordion.Title>
                                <Accordion.Content className="bg-white border-x border-b border-gray-200 relative">
                                    <div className="space-y-6 p-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="flex flex-col gap-2">
                                                <Label value="Define Your Goal *" />
                                                <TextInput
                                                    placeholder="e.g., What does success look like for you?."
                                                    value={competencyData.goal || ''}
                                                    onChange={(e) => updateCompetencyGoal(competency, 'goal', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label value="Goal Timeline *" />
                                                <Select
                                                    value={competencyData.timeline || ''}
                                                    onChange={(e) => updateCompetencyGoal(competency, 'timeline', e.target.value)}
                                                    disabled={!timeframe}
                                                >
                                                    <option value="" disabled>
                                                        {!timeframe ? 'Select plan timeframe first' : 'Select timeline'}
                                                    </option>
                                                    {availableTimelineOptions.map(timeline => (
                                                        <option key={timeline} value={timeline}>{timeline}</option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            {competencyData.ksas?.map((ksa) => (
                                                <div key={ksa.id} className="mb-4">
                                                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                                                        <div className="flex flex-col gap-2">
                                                            <Label value="Choose a Knowledge, Skill, or Ability (KSA) *" />
                                                            <Select
                                                                value={ksa.type}
                                                                onChange={(e) => updateKSA(competency, ksa.id, 'type', e.target.value)}
                                                            >
                                                                <option value="" disabled>Select KSA type</option>
                                                                {ksaOptions.map(ksaOption => (
                                                                    <option key={ksaOption.name} value={ksaOption.name}>{ksaOption.name}</option>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <Label value="KSA Description" />
                                                            <div className="min-h-[40px] ">
                                                                {ksa.type ? (
                                                                    <p className="text-sm text-gray-700">
                                                                        {ksaOptions.find(opt => opt.name === ksa.type)?.description || ''}
                                                                    </p>
                                                                ) : (
                                                                    <p className="text-sm text-gray-500">
                                                                        Select a KSA to view its description
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                                                        <div className="flex flex-col gap-2">
                                                            <Label value="Where You Are Now *" />
                                                            <Select
                                                                value={ksa.currentLevel}
                                                                onChange={(e) => updateKSA(competency, ksa.id, 'currentLevel', e.target.value)}
                                                            >
                                                                {proficiencyLevels.map(level => (
                                                                    <option key={level} value={level}>{level}</option>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <Label value="Where You Want to Be *" />
                                                            <Select
                                                                value={ksa.targetLevel}
                                                                onChange={(e) => updateKSA(competency, ksa.id, 'targetLevel', e.target.value)}
                                                            >
                                                                {proficiencyLevels.map(level => (
                                                                    <option key={level} value={level}>{level}</option>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                    </div>

                                                    {competencyData.ksas?.length > 1 && (
                                                        <div className="flex justify-end">
                                                            <button
                                                                onClick={() => removeKSAFromCompetency(competency, ksa.id)}
                                                                className="text-red-600 hover:text-red-800 text-sm bg-transparent border-none"
                                                            >
                                                                Remove KSA
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <div className="flex items-center justify-between mb-4">
                                                <button
                                                    onClick={() => addKSAToCompetency(competency)}
                                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm bg-transparent border-none"
                                                >
                                                    <PlusIcon className="w-4 h-4" />
                                                    Add Another KSA
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2 pb-4 border-b">
                                            <div className="flex flex-col gap-2">
                                                <Label value="Resources & Support (Select all that apply)" />
                                                <MultiSelectDropdown
                                                    options={resourceSupportOptions}
                                                    selectedValues={competencyData.resources || []}
                                                    onChange={(newResources) => {
                                                        updateCompetencyGoal(competency, 'resources', newResources);
                                                        if (!newResources.includes('Other')) {
                                                            updateCompetencyGoal(competency, 'resourcesOther', '');
                                                        }
                                                    }}
                                                    placeholder="Select resources"
                                                />
                                                {/* This shows up when user select Other */}
                                                {competencyData.resources?.includes('Other') && (
                                                    <div className="mt-2">
                                                        <TextInput
                                                            placeholder="Please specify other resources..."
                                                            value={competencyData.resourcesOther || ''}
                                                            onChange={(e) => updateCompetencyGoal(competency, 'resourcesOther', e.target.value)}
                                                            className="text-sm"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Obstacles */}
                                            <div className="flex flex-col gap-2 z-[9999]">
                                                <Label value="Potential Obstacles (Select all that apply)" />
                                                <MultiSelectDropdown
                                                    options={obstacleOptions}
                                                    selectedValues={competencyData.obstacles || []}
                                                    onChange={(newObstacles) => {
                                                        updateCompetencyGoal(competency, 'obstacles', newObstacles);

                                                        // Clear "Other" text if "Other" is not selected
                                                        if (!newObstacles.includes('Other')) {
                                                            updateCompetencyGoal(competency, 'obstaclesOther', '');
                                                        }
                                                    }}
                                                    placeholder="Select obstacles"
                                                />

                                                {/* This is the other field for obstacles */}
                                                {competencyData.obstacles?.includes('Other') && (
                                                    <div className="mt-2">
                                                        <TextInput
                                                            placeholder="Please specify other obstacles..."
                                                            value={competencyData.obstaclesOther || ''}
                                                            onChange={(e) => updateCompetencyGoal(competency, 'obstaclesOther', e.target.value)}
                                                            className="text-sm"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Panel>
                        );
                    })}
                </Accordion>
            </>
        );
    };

    const renderReviewStep = () => {
        const selectedCompetencies = goals
            .filter(goal => goal.competency)
            .map(goal => goal.competency);

        const formattedGoals = selectedCompetencies.map((competency, i) => {
            const competencyData = competencyGoals[competency] || {};
            const goalInfo = goals.find(goal => goal.competency === competency);

            return {
                id: i,
                name: competency,
                desc: competencyData.goal || 'No goal defined',
                priority: goalInfo?.priority || 'Not set',
                timeline: competencyData.timeline || 'No timeline',
                resources: competencyData.resources || [],
                obstacles: competencyData.obstacles || [],
                ksaList: competencyData.ksas?.filter(ksa => ksa.type).map(ksa => ({
                    title: ksa.type,
                    desc: ksaOptions.find(opt => opt.name === ksa.type)?.description || '',
                    currLvl: ksa.currentLevel || 'Basic',
                    targetLvl: ksa.targetLevel || 'Intermediate'
                })) || [],
                courses: []
            };
        });

        return (
            <>
                <div className='border border-gray-300 flex flex-row py-6 px-4 rounded-lg items-center justify-between mb-6'>
                    <h1 className='font-bold text-gray-900 text-xl'>{planName || 'Learning Plan'}</h1>
                    <div className='text-sm bg-blue-50 text-blue-700 rounded-md px-2 py-1'>{timeframe || 'No timeframe set'}</div>
                </div>

                {formattedGoals.map((goal, i) => (
                    <DevelopmentGoal key={i} goal={goal} />
                ))}
            </>
        );
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
                                <Button className='flex justify-center bg-blue-900 hover:bg-blue-600 ml-2'
                                    onClick={handleSave}
                                    disabled={!canProceedFromStep(currentStep)}
                                >
                                    Return to Learning Plan
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
