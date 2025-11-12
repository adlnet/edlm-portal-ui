'use strict';

import { 
    ChevronDownIcon, 
    ChevronUpIcon,
    PlusIcon, 
    XMarkIcon
} from '@heroicons/react/24/outline';
import { InfoTooltip } from '@/components/InfoTooltip';
import { Label, TextInput } from 'flowbite-react';
import { MultiSelectDropdown } from '@/components/menus/MultiSelectDropdown';
import { TrashIcon } from '@heroicons/react/24/outline';
import { extractEccrReference } from '@/utils/extractEccrReference';
import { obstacleOptions, proficiencyLevels, resourceSupportOptions } from '@/utils/dropdownMenuConstants';
import { useCompetencies } from '@/contexts/CompetencyContext';
import { useEffect, useState } from 'react';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import DeleteCompetencyModal from '@/components/modals/DeleteSkillModal';
import Image from 'next/image';
import SuccessMessageToast from '@/components/cards/SuccessMessageToast';
import priorityIcon from '@/utils/priorityIcon';

const KSAItem = ({
    ksa,
    ksaIndex,
    competency,
    competencyGoal,
    updateKSAForGoal,
    removeKSAFromGoal,
    isKSASelected,
    parentCompetencyId
}) => {
    const { childCompetencies } = useCompetencies();

    const availableKSAs = childCompetencies.filter(child => {
        if (child.parent === parentCompetencyId) return true;
        if (child.parent === competency) return true;
        return false;
    });

    const handleKSAChange = (ksaName) => {
        const selectedKSA = availableKSAs.find(k => k.name === ksaName);
        
        // Update KSA name
        updateKSAForGoal(competency, competencyGoal.id, ksa.id, 'type', ksaName);
        
        // Update KSA ID with extracted reference
        if (selectedKSA) {
            const ksaReference = extractEccrReference(selectedKSA.id);
            updateKSAForGoal(competency, competencyGoal.id, ksa.id, 'ksaId', ksaReference);
        }
    };

    return (
        <div key={ksa.id} className="mb-4">
            <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-2 text-sm">
                            Choose a Knowledge, Skill, or Ability (KSA)
                            <InfoTooltip 
                                title="Selecting a KSA"
                                content="Think about what you want to sharpen—what specific skill or area within this competency would help you feel more focused or effective? Is there a particular focus area you've been meaning to explore that could bring you closer to your goals?"
                            />
                            <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                        </span>
                    </div>
                    <CustomDropdown
                        value={ksa.type || ''}
                        onChange={(e) => handleKSAChange(e.target.value)} 
                        options={availableKSAs.map(option => ({
                            label: option.name,
                            value: option.name,
                            disabled: isKSASelected(competency, competencyGoal.id, option.name) && ksa.type !== option.name,
                        }))}
                        placeholder="Which KSA will help you achieve that goal?"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label value="KSA Description" />
                    <div className="min-h-[40px]">
                        {ksa.type ? (
                            <p className="text-sm text-gray-700">
                                {availableKSAs.find(opt => opt.name === ksa.type)?.description || ''}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500">
                                Select a focus area to see what it&apos;s all about
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-2 text-sm">
                            Where You Are Now
                            <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                        </span>
                    </div>
                    <CustomDropdown
                        value={ksa.currentLevel}
                        onChange={(e) => updateKSAForGoal(competency, competencyGoal.id, ksa.id, 'currentLevel', e.target.value)}
                        options={proficiencyLevels.map(level => ({
                            label: level,
                            value: level
                        }))}
                        placeholder="Estimate your current proficiency on this goal"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-2 text-sm">
                            Where You Want to Be 
                            <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                        </span>
                    </div>
                    <CustomDropdown
                        value={ksa.targetLevel}
                        onChange={(e) => updateKSAForGoal(competency, competencyGoal.id, ksa.id, 'targetLevel', e.target.value)}
                        options={proficiencyLevels.map(level => ({
                            label: level,
                            value: level
                        }))}
                        placeholder="Select your desired proficiency on this goal"
                    />
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
    );
}

const ResourcesAndObstacles = ({ competency, competencyGoal, updateCompetencyGoal }) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 pb-4 border-b">
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
                    placeholder="What might get in the way of your goal?"
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
                    placeholder="Add resources or support you need to accomplish your goal"
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
        </div>
    )
}

const GoalItem = ({
    competencyGoal, 
    goalIndex, 
    competency, 
    availableTimelineOptions,
    updateCompetencyGoal, 
    removeGoalFromCompetency, 
    updateKSAForGoal, 
    removeKSAFromGoal, 
    addKSAToGoal, 
    isKSASelected,
    getCompetencyId
}) => {
    return (
        <div key={competencyGoal.id} className="mb-6 -mt-4">
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
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-2 text-sm">
                            Define Your Goal 
                            <InfoTooltip 
                                title="Defining Your Goal"
                                content="When thinking of a name for your goal, think SMART - Specific, Measurable, Achievable, Relevant, and Time-bound. Common goals might aim to increase, improve, reduce, save, or develop something—like leading a team project or building a new skill."
                            />
                            <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                        </span>
                    </div>
                    <TextInput
                        placeholder="What does success look like for you?"
                        value={competencyGoal.goal || ''}
                        onChange={(e) => updateCompetencyGoal(competency, competencyGoal.id, 'goal', e.target.value)}
                    />
                    <span className="text-sm font-normal text-[#545964] leading-tight">
                        What do you want to accomplish? Be as specific as you can be. Lead a cross-functional project to improve team collaboration by March.
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-2 text-sm">
                            Goal Timeline 
                            <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                        </span>
                    </div>
                    <CustomDropdown
                        value={competencyGoal.timeline || ''}
                        onChange={(e) => updateCompetencyGoal(competency, competencyGoal.id, 'timeline', e.target.value)}
                        options={availableTimelineOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        placeholder="When will you achieve this goal?"
                    />
                </div>
            </div>
            <div className="pt-4">
                {competencyGoal.ksas?.map((ksa, ksaIndex) => (
                    <KSAItem
                        key={ksa.id}
                        ksa={ksa}
                        ksaIndex={ksaIndex}
                        competency={competency}
                        competencyGoal={competencyGoal}
                        updateKSAForGoal={updateKSAForGoal}
                        removeKSAFromGoal={removeKSAFromGoal}
                        isKSASelected={isKSASelected}
                        parentCompetencyId={getCompetencyId(competency)}
                    />
                ))}
                
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => addKSAToGoal(competency, competencyGoal.id)}
                        className="flex items-center gap-2 text-[#4883B4] hover:text-blue-800 text-sm bg-transparent border-none"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add Another KSA
                    </button>
                </div>
            </div>
            
            <ResourcesAndObstacles
                competency={competency}
                competencyGoal={competencyGoal}
                updateCompetencyGoal={updateCompetencyGoal}
            />
        </div>
    )
}

const CompetencySection = ({
    competency, 
    competencyGoalsList, 
    competencyPriority, 
    isOpen, 
    toggleCompetency, 
    availableTimelineOptions,
    updateCompetencyGoal, 
    removeGoalFromCompetency, 
    updateKSAForGoal, 
    removeKSAFromGoal, 
    addKSAToGoal, 
    addGoalToCompetency, 
    isKSASelected,
    getCompetencyId,
    onDeleteCompetency,
    showTrashIcon = false
}) => {

    const [delCompModalOpen, setDelCompModalOpen] = useState(false);

    const handleCompDelete = () => {
        onDeleteCompetency(competency);
    };
    return (
        <div key={competency} className='border rounded-lg border-gray-300 mb-4'>
            <div className='flex flex-row justify-between border-b p-4'>
                <div className='flex gap-2 items-center'>
                    {priorityIcon(competencyPriority)}
                    <h1 className='font-bold text-lg text-blue-900'>{competency}</h1>
                </div>
                <div className='flex items-center gap-2'>
                    {showTrashIcon && (
                        <button
                            className='mr-2 hover:text-red-600 text-gray-400' 
                            onClick={() => setDelCompModalOpen(true)}
                            title="Delete Competency"
                        >
                            <TrashIcon className='h-5 w-5'/>
                        </button>
                    )}
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
            </div>

            {showTrashIcon && (
                <DeleteCompetencyModal
                    open={delCompModalOpen}
                    onClose={() => setDelCompModalOpen(false)}
                    onDelete={handleCompDelete}
                />
            )}
            {isOpen && (
                <div className="p-4">
                    <div className="space-y-6">
                        {competencyGoalsList.map((competencyGoal, goalIndex) => (
                            <GoalItem
                                key={competencyGoal.id}
                                competencyGoal={competencyGoal}
                                goalIndex={goalIndex}
                                competency={competency}
                                availableTimelineOptions={availableTimelineOptions}
                                updateCompetencyGoal={updateCompetencyGoal}
                                removeGoalFromCompetency={removeGoalFromCompetency}
                                updateKSAForGoal={updateKSAForGoal}
                                removeKSAFromGoal={removeKSAFromGoal}
                                addKSAToGoal={addKSAToGoal}
                                isKSASelected={isKSASelected}
                                getCompetencyId={getCompetencyId}
                            />
                        ))}

                        {/* Add Another Goal */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => addGoalToCompetency(competency)}
                                className="flex items-center gap-2 text-[#4883B4] hover:text-blue-800 text-sm bg-transparent border-none"
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
}

export function SetGoalsStepEdit({
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
    updateKSAForGoal,
    showSuccessMessage = false,
    removeGoal,
    showTrashIcon = false,
    setDeletedCompetencies
}) {

    const { parentCompetencies } = useCompetencies();

    // Get competency ID from name
    const getCompetencyId = competencyName => {
        const competency = parentCompetencies.find(comp => comp.name === competencyName);
        return competency ? competency.id : null;
    };

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

    // Check if a KSA is already selected in this goal
    const isKSASelected = (competency, goalId, ksaType) => {
        const competencyGoalsList = competencyGoals[competency] || [];
        const currentGoal = competencyGoalsList.find(goal => goal.id === goalId);
        if (!currentGoal) return false;

        //Get the current goal
        return currentGoal.ksas?.some(ksa => ksa.type === ksaType) || false;
    };

    const handleDeleteCompetency = competencyName => {
        if (setDeletedCompetencies) {
            setDeletedCompetencies(prev => [...prev, competencyName]);
        }

        if (removeGoal) {
            const goalToRemove = goals.find(goal => goal.competency === competencyName);
            if (goalToRemove) {
                removeGoal(goalToRemove.id);
            }
        }

        setCompetencyGoals(prev => {
            const newGoals = { ...prev };
            delete newGoals[competencyName];
            return newGoals;
        });
    };

    return (
        <>
            {showSuccessMessage && (
                <SuccessMessageToast
                    title={"Your changes have been saved"}
                />
            )}
            <div className="mb-2 space-y-4">
                <h2 className="text-2xl font-semibold">Skill Areas</h2>
            </div>

            <div className="space-y-4">
                {selectedCompetencies.map((competency, index) => {
                    const competencyGoalsList = competencyGoals[competency] || [];
                    const competencyPriority = goals.find(g => g.competency === competency)?.priority || 'Not set';
                    
                    // Default to true
                    const isOpen = openCompetencies[competency] !== false;

                    return (
                        <CompetencySection
                            key={competency}
                            competency={competency}
                            competencyGoalsList={competencyGoalsList}
                            competencyPriority={competencyPriority}
                            isOpen={isOpen}
                            toggleCompetency={toggleCompetency}
                            availableTimelineOptions={availableTimelineOptions}
                            updateCompetencyGoal={updateCompetencyGoal}
                            removeGoalFromCompetency={removeGoalFromCompetency}
                            updateKSAForGoal={updateKSAForGoal}
                            removeKSAFromGoal={removeKSAFromGoal}
                            addKSAToGoal={addKSAToGoal}
                            addGoalToCompetency={addGoalToCompetency}
                            isKSASelected={isKSASelected}
                            getCompetencyId={getCompetencyId}
                            onDeleteCompetency={handleDeleteCompetency}
                            showTrashIcon={showTrashIcon}
                        />
                    );
                })}
            </div>
        </>
    );
}
