'use strict';

import { ChevronRightIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { InfoTooltip } from '@/components/InfoTooltip';
import { Label } from 'flowbite-react';
import { extractEccrReference } from '@/utils/extractEccrReference';
import { priorityOptions } from '@/utils/dropdownMenuConstants';
import { useCompetencies } from '@/contexts/CompetencyContext';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import Image from 'next/image';
import PriorityDropdown from '@/components/menus/PriorityDropdown';
import SuccessMessageToast from '@/components/cards/SuccessMessageToast';

export function ChooseSkillsStep({
    goals,
    addGoal,
    removeGoal,
    updateGoal,
    onCompetencyChange,
    planName = "",
    showSuccessMessage = false
}) {
    
    const { parentCompetencies } = useCompetencies();

    // Check if a competency is already added to this goal
    const isCompetencySelected = competencyName => 
        goals.some(goal => goal.competency === competencyName);

    const handleRedirectToCompSearch = () => {
        window.open('/edlm-portal/learner/search/', '_blank');
    };

    const onCompetencyChangeWithId = (goalId, competencyName) => {
        // Find the competency to get its ID
        const selectedCompetency = parentCompetencies.find(c => c.name === competencyName);
        
        // Update the goal with both name and ID
        updateGoal(goalId, 'competency', competencyName);
        if (selectedCompetency) {
            const competencyReference = extractEccrReference(selectedCompetency.id);
            updateGoal(goalId, 'competencyId', competencyReference);
        }
        
        onCompetencyChange(goalId, competencyName);
    };

    const competencyRedirectOptionFooter = (
        <button 
            className="w-full flex items-center justify-between"
            onClick={handleRedirectToCompSearch}
        >
            <div className="text-gray-700 pl-1 text-sm text-[#1E3764] font-normal leading-tight hover:text-gray-900">
                Go to Competency Search
            </div>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
        </button>
    );


    return (
        <>
            {showSuccessMessage && (
                <SuccessMessageToast
                    title={"Your plan has been created"}
                    description={`Nice work! You’ve successfully created your learning plan: ${planName}`}
                />
            )}
            <h2 className="text-2xl font-semibold">Choose a Skill Area</h2>
            <p className="text-sm py-6">
                Select one or more DOT&E competencies you’d like to develop, based on current job requirements or personal growth interests.
            </p>
            <span className="flex items-center gap-1 text-[#993033]">
                <Image src={AsteriskIcon} alt="Asterisk" className="w-4 h-4" /> = Required
            </span>
            {goals.map((goal, goalIndex) => {
                const selectedCompetency = parentCompetencies.find(c => c.name === goal.competency);
                return (
                    <div key={goal.id} className=" border-b py-4">
                        <div className="grid gap-10 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center gap-2 text-sm">
                                        Choose a Competency 
                                        <InfoTooltip 
                                            title="Selecting Competencies"
                                            content="Think about where you want to grow—what skill do you wish you felt more confident in? Is there a skill you've always wanted to develop but haven't had the chance to yet?"
                                        />
                                        <Image src={AsteriskIcon} alt="Required" className="w-3 h-3" />
                                    </span>
                                </div>
                                <CustomDropdown
                                    value={goal.competency}
                                    onChange={e => onCompetencyChangeWithId(goal.id, e.target.value)}
                                    options={parentCompetencies.map(comp => ({
                                        label: comp.name,
                                        value: comp.name,
                                        disabled: isCompetencySelected(comp.name) && goal.competency !== comp.name,
                                    }))}
                                    placeholder="Select a competency"
                                    footerItem={competencyRedirectOptionFooter}
                                />
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
                                            {selectedCompetency.description || 'No description available'}
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
                                                window.open('/edlm-portal/learner/search', '_blank');
                                            }}
                                        >
                                            View more
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 -mt-16">
                                <span className="flex items-center gap-2 text-sm">
                                    Priority <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
                                </span>
                                <PriorityDropdown
                                    value={goal.priority}
                                    onChange={(e) => updateGoal(goal.id, 'priority', e.target.value)}
                                    options={priorityOptions}
                                />
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
