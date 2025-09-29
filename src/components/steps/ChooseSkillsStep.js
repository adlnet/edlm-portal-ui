'use strict';

import { Label, Select } from 'flowbite-react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { priorityOptions } from '@/utils/dropdownMenuConstants';
import backupData from '@/public/backup_competencies.json';

// Helper function that returns all parent competencies
function findParents({ Competencies }) {
    const parentComps = []

    Competencies.forEach((comp) => {
        if (comp['parent'].length === 0)
            parentComps.push(comp);
    })

    return parentComps
}

export function ChooseSkillsStep({
    goals,
    addGoal,
    removeGoal,
    updateGoal,
    onCompetencyChange,
}) {
    // Using backup data for development
    // In the future, this data should come from an API
    const Competencies = backupData;
    const ParentComps = findParents({ Competencies });

    // Check if a competency is already added to this goal
    const isCompetencySelected = competencyName =>
        goals.some(goal => goal.competency === competencyName);

    return (
        <>
            <h2 className="text-lg font-semibold -mb-4">Choose a Skill Area</h2>
            <p className="text-sm py-4">
                Select one or more DOT&E competencies you’d like to develop, based on current job requirements or personal growth interests.
            </p>
            {goals.map((goal, goalIndex) => {
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
                                <div className="flex justify-between items-center">
                                    <Label value="Competency Description" />
                                    {goalIndex > 0 && (
                                        <button
                                            onClick={() => removeGoal(goal.id)}
                                            className="text-red-600 hover:text-red-800 p-1 bg-transparent border-none"
                                            title="Remove Competency"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                                <div className="min-h-[120px] flex items-start">
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
    )
}
