'use strict';

import { 
    Bars3Icon,
    ChevronDoubleDownIcon, 
    ChevronDoubleUpIcon, 
    ChevronDownIcon, 
    ChevronUpIcon,
    PlusIcon, 
    XMarkIcon
} from '@heroicons/react/24/outline';
import { Label, Select, TextInput } from 'flowbite-react';
import { MultiSelectDropdown } from '@/components/menus/MultiSelectDropdown';
import {  ksaOptions, obstacleOptions, proficiencyLevels, resourceSupportOptions } from '@/utils/dropdownMenuConstants';
import { useEffect, useState } from 'react';

function priorityIcon(priority) {
    if (priority === 'Lowest') {
        return <ChevronDoubleDownIcon className='h-6 w-6 text-green-500'/>
    } else if (priority === 'Low') {
        return <ChevronDownIcon className='h-6 w-6 text-green-500'/>
    } else if (priority === 'Medium') {
        return <Bars3Icon className='h-6 w-6 text-yellow-800'/>
    } else if (priority === 'High') {
        return <ChevronUpIcon className='h-6 w-6 text-green-500'/>
    } else if (priority === 'Highest') {
        return <ChevronDoubleUpIcon className='h-6 w-6 text-red-500'/>
    } else {
        return null;
    }
}

export function SetGoalsStep({
    goals,
    competencyGoals,
    setCompetencyGoals,
    timeframe,
    getTimelineOptions,
    addGoalToCompetency,
    removeGoalFromCompetency,
    updateCompetencyGoal,
    addKSAToGoal,
    removeKSAFromGoal,
    updateKSAForGoal
}) {

    const [openCompetencies, setOpenCompetencies] = useState({});

    // Toggle accordian open and close state
    const toggleCompetency = competencyName => {
        setOpenCompetencies(currState => {
            // Default to true
            const isOpen = currState[competencyName] !== false;
            return {
                ...currState,
                [competencyName]: !isOpen
            };
        })
    };

    const selectedCompetencies = goals
        .filter(goal => goal.competency)
        .map(goal => goal.competency);

    const availableTimelineOptions = getTimelineOptions();

    // Init competencyGoals for any new selected competencies
    useEffect(() => {
        const competenciesToInitialize = selectedCompetencies.filter(
            competency => !competencyGoals[competency]
        );

        if (competenciesToInitialize.length > 0) {
            setCompetencyGoals(prev => {
                const newGoals = {};
                competenciesToInitialize.forEach(competency => {
                    newGoals[competency] = [{
                        id: crypto.randomUUID(),
                        goal: '',
                        timeline: '',
                        resources: [],
                        resourcesOther: '',
                        obstacles: [],
                        obstaclesOther: '',
                        ksas: [{
                            id: crypto.randomUUID(),
                            type: '',
                            currentLevel: 'Basic',
                            targetLevel: 'Intermediate'
                        }]
                    }];
                });
                return { ...prev, ...newGoals };
            });
        }
    }, [selectedCompetencies, competencyGoals, setCompetencyGoals]);

    return (
        <>
            <div className="mb-6 space-y-4">
                <h2 className="text-lg font-semibold">Set Competency Goals</h2>
                <p className="text-sm text-gray-500">
                    {`Now, let's narrow it down. Within each selected competency, define the goal you wish to achieve noting timeframe for completion, relevant KSAs, baseline and target proficiency per KSA, and obstacles and resources needed to support goal attainment. Multiple goals can be established per competency.`}
                </p>
            </div>

            <div className="space-y-4">
                {selectedCompetencies.map((competency, index) => {
                    const competencyGoalsList = competencyGoals[competency] || [];
                    const competencyPriority = goals.find(g => g.competency === competency)?.priority || 'Not set';
                    
                    // Default to true
                    const isOpen = openCompetencies[competency] !== false;

                    return (
                        <div key={competency} className='border rounded-lg border-gray-300 mb-4'>
                            <div className='flex flex-row justify-between border-b p-4'>
                                <div className='flex gap-2 items-center'>
                                    {priorityIcon(competencyPriority)}
                                    <h1 className='font-bold text-lg text-blue-900'>{competency}</h1>
                                </div>
                                <button 
                                    className=''
                                    onClick={() => toggleCompetency(competency)}
                                >
                                    {isOpen ? 
                                        (<ChevronUpIcon className='h-6 w-6 text-gray-900'/>) : 
                                        (<ChevronDownIcon className='h-6 w-6 text-gray-900'/>)
                                    }
                                </button>
                            </div>
                            {isOpen && (
                                <div className="p-4">
                                    <div className="space-y-6">
                                        {competencyGoalsList.map((competencyGoal, goalIndex) => (
                                            <div key={competencyGoal.id} className="border border-gray-200 rounded-lg p-4 mb-6">
                                                <div className="flex justify-end items-center mb-4">
                                                    {goalIndex > 0 && (
                                                        <button
                                                            onClick={() => removeGoalFromCompetency(competency, competencyGoal.id)}
                                                            className="text-red-600 hover:text-red-800 p-1 bg-transparent border-none"
                                                            title="Remove Goal"
                                                        >
                                                            <XMarkIcon className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                <div className="grid gap-4 md:grid-cols-2 mb-6">
                                                    <div className="flex flex-col gap-2">
                                                        <Label value="Define Your Goal *" />
                                                        <TextInput
                                                            placeholder="e.g., What does success look like for you?."
                                                            value={competencyGoal.goal || ''}
                                                            onChange={(e) => updateCompetencyGoal(competency, competencyGoal.id, 'goal', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Label value="Goal Timeline *" />
                                                        <Select
                                                            value={competencyGoal.timeline || ''}
                                                            onChange={(e) => updateCompetencyGoal(competency, competencyGoal.id, 'timeline', e.target.value)}
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
                                                    {competencyGoal.ksas?.map((ksa, ksaIndex) => (
                                                        <div key={ksa.id} className="mb-4">
                                                            <div className="grid gap-4 md:grid-cols-2 mb-4">
                                                                <div className="flex flex-col gap-2">
                                                                    <Label value="Choose a Knowledge, Skill, or Ability (KSA) *" />
                                                                    <Select
                                                                        value={ksa.type}
                                                                        onChange={(e) => updateKSAForGoal(competency, competencyGoal.id, ksa.id, 'type', e.target.value)}
                                                                    >
                                                                        <option value="" disabled>Select KSA type</option>
                                                                        {ksaOptions.map(ksaOption => (
                                                                            <option key={ksaOption.name} value={ksaOption.name}>{ksaOption.name}</option>
                                                                        ))}
                                                                    </Select>
                                                                </div>
                                                                <div className="flex flex-col gap-2">
                                                                    <Label value="KSA Description" />
                                                                    <div className="min-h-[40px]">
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
                                                                        onChange={(e) => updateKSAForGoal(competency, competencyGoal.id, ksa.id, 'currentLevel', e.target.value)}
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
                                                                        onChange={(e) => updateKSAForGoal(competency, competencyGoal.id, ksa.id, 'targetLevel', e.target.value)}
                                                                    >
                                                                        {proficiencyLevels.map(level => (
                                                                            <option key={level} value={level}>{level}</option>
                                                                        ))}
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                            {ksaIndex > 0 && (
                                                                <div className="flex justify-end">
                                                                    <button
                                                                        onClick={() => removeKSAFromGoal(competency, competencyGoal.id, ksa.id)}
                                                                        className="text-red-600 hover:text-red-800 p-1 bg-transparent border-none"
                                                                        title="Remove KSA"
                                                                    >
                                                                        <XMarkIcon className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    
                                                    <div className="flex items-center justify-between mb-4">
                                                        <button
                                                            onClick={() => addKSAToGoal(competency, competencyGoal.id)}
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
                                                            selectedValues={competencyGoal.resources || []}
                                                            onChange={(newResources) => {
                                                                updateCompetencyGoal(competency, competencyGoal.id, 'resources', newResources);
                                                                if (!newResources.includes('Other')) {
                                                                    updateCompetencyGoal(competency, competencyGoal.id, 'resourcesOther', '');
                                                                }
                                                            }}
                                                            placeholder="Select resources"
                                                        />
                                                        {competencyGoal.resources?.includes('Other') && (
                                                            <div className="mt-2">
                                                                <TextInput
                                                                    placeholder="Please specify other resources..."
                                                                    value={competencyGoal.resourcesOther || ''}
                                                                    onChange={(e) => updateCompetencyGoal(competency, competencyGoal.id, 'resourcesOther', e.target.value)}
                                                                    className="text-sm"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        <Label value="Potential Obstacles (Select all that apply)" />
                                                        <MultiSelectDropdown
                                                            options={obstacleOptions}
                                                            selectedValues={competencyGoal.obstacles || []}
                                                            onChange={(newObstacles) => {
                                                                updateCompetencyGoal(competency, competencyGoal.id, 'obstacles', newObstacles);
                                                                if (!newObstacles.includes('Other')) {
                                                                    updateCompetencyGoal(competency, competencyGoal.id, 'obstaclesOther', '');
                                                                }
                                                            }}
                                                            placeholder="Select obstacles"
                                                        />
                                                        {competencyGoal.obstacles?.includes('Other') && (
                                                            <div className="mt-2">
                                                                <TextInput
                                                                    placeholder="Please specify other obstacles..."
                                                                    value={competencyGoal.obstaclesOther || ''}
                                                                    onChange={(e) => updateCompetencyGoal(competency, competencyGoal.id, 'obstaclesOther', e.target.value)}
                                                                    className="text-sm"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add Another Goal */}
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => addGoalToCompetency(competency)}
                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm bg-transparent border-none"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                                Add Another Goal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
