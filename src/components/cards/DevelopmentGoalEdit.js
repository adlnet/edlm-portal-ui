'use-strict'

import { 
  Bars3Icon,
  ChevronDoubleDownIcon, 
  ChevronDoubleUpIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,  
  PlusIcon,
  TrashIcon,
  XMarkIcon  
} from '@heroicons/react/24/outline';
import { InfoTooltip } from '@/components/InfoTooltip';
import { Label, Select, TextInput } from 'flowbite-react';
import { MultiSelectDropdown } from '@/components/menus/MultiSelectDropdown';
import { ksaOptions, longTermGoalTimeLine, obstacleOptions, proficiencyLevels, resourceSupportOptions, shortTermGoalTimeLine } from '@/utils/dropdownMenuConstants';
import { useEffect, useState } from 'react';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import DeleteCompetencyModal from '@/components/modals/DeleteSkillModal';
import Image from 'next/image';
import SuccessMessageToast from '@/components/cards/SuccessMessageToast';

function priorityIcon (priority){
  if (priority === 'Lowest') {
    return <ChevronDoubleDownIcon data-testid='priority-lowest' className='h-6 w-6 text-green-500'/>
  } else if (priority === 'Low') {
    return <ChevronDownIcon data-testid='priority-low' className='h-6 w-6 text-green-500'/>
  } else if (priority === 'Medium') {
    return <Bars3Icon data-testid='priority-medium' className='h-6 w-6 text-yellow-800'/>
  } else if (priority === 'High') {
    return <ChevronUpIcon data-testid='priority-high' className='h-6 w-6 text-red-500'/>
  } else if (priority === 'Highest') {
    return <ChevronDoubleUpIcon data-testid='priority-highest' className='h-6 w-6 text-red-500'/>
  } else{
    return; 
  }
}

function getTimelineOptions (timeframe) {
    if (timeframe === 'Short-term (1-2 years)') {
        return shortTermGoalTimeLine;
    } else if (timeframe === 'Long-term (3-4 years)') {
        return longTermGoalTimeLine;
    }
    return [];
};

export default function DevelopmentGoal({ goal, initiallyOpen, timeframe }) {

  const [open, setOpen] = useState(initiallyOpen);

  const [delCompModalOpen, setDelCompModalOpen] = useState(false);
  
  const availableTimelineOptions = getTimelineOptions(timeframe)

  const handleCompDelete = () => {
    // handle comp delete code
    console.log('Competency deleted!');
  };

  return (
    <div className='border rounded-lg border-gray-300 mb-4'>
      <div className='flex flex-row justify-between border-b p-4 text-gray-900'>
        <div className='flex gap-2 items-center'>
          {priorityIcon(goal.priority)}
          <h1 className='font-bold text-lg'>{goal.name}</h1>
        </div>
        <div>
            <button
                className='mr-8 hover:text-gray-400' 
                onClick={() => setDelCompModalOpen(true)}
            >
                <TrashIcon class='h-6 w-6'/>
            </button>
            <button 
                className=''
                onClick={() => setOpen(!open)}
            >
            {open ? (<ChevronUpIcon className='h-6 w-6 tex-gray-900'/>) : (<ChevronDownIcon className='h-6 w-6 tex-gray-900'/>)}
            </button>
        </div>
      </div>

      <DeleteCompetencyModal
        open={delCompModalOpen}
        onClose={() => setDelCompModalOpen(false)}
        onDelete={handleCompDelete}
      />

      {open && (
        <div>
          {/* Goal desc and timeline */}
          <div className='p-4 grid grid-cols-2 gap-6'>
            {/* Goal Desc */}
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-bold">
                Define Your Goal 
                <InfoTooltip 
                  title="Defining Your Goal"
                  content="When thinking of a name for your goal, think SMART - Specific, Measurable, Achievable, Relevant, and Time-bound. Common goals might aim to increase, improve, reduce, save, or develop something—like leading a team project or building a new skill."
                />
                <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
              </span>
              <TextInput
                placeholder="What does success look like for you?"
                value={goal.desc || ''}
                onChange={(e) => {}}
              />
              <span className="text-sm font-normal text-[#545964] leading-tight">
                What do you want to accomplish? Be as specific as you can be. Lead a cross-functional project to improve team collaboration by March.
              </span>
            </div>
            
            {/* Goal Timeline */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-sm font-bold">
                  Goal Timeline 
                  <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                </span>
              </div>
              <CustomDropdown
                value={goal.timeline || ''}
                onChange={(e) => {}}
                options={availableTimelineOptions.map(option => ({
                    label: option,
                    value: option
                }))}
                placeholder="When will you achieve this goal?"
              />
            </div>
          </div>

          {/* KSA's, Descriptions, levels  */}
          <div>
            {goal.ksaList.map((ksa) => (
              <div key={ksa.id} className='pt-8 text-gray-900'>
                <div className="grid gap-6 md:grid-cols-2 mb-4 px-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-2 text-sm font-bold">
                          Choose a Knowledge, Skill, or Ability (KSA)
                          <InfoTooltip 
                            title="Selecting a KSA"
                            content="Think about what you want to sharpen—what specific skill or area within this competency would help you feel more focused or effective? Is there a particular focus area you've been meaning to explore that could bring you closer to your goals?"
                          />
                          <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                      </span>
                    </div>
                    <CustomDropdown
                      value={ksa.title || ''}
                      onChange={(e) => {console.log("Update KSA")}}
                      options={ksaOptions.map(option => ({
                        label: option.name,
                        value: option.name,
                        disabled: false
                      }))}
                      placeholder="Which KSA will help you achieve that goal?"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label value="KSA Description" className='font-bold'/>
                    <div className="min-h-[40px] text-gray-700 text-sm">
                      {ksa.desc}
                      {/* {ksa.type ? (
                        <p className="text-sm text-gray-700">
                          {ksa.desc || ''}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Select a focus area to see what it’s all about
                        </p>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 mb-4 px-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        Where You Are Now 
                        <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                      </span>
                    </div>
                    <CustomDropdown
                      value={ksa.currLvl}
                      onChange={(e) => {console.log("update goal for KSA")}}
                      options={proficiencyLevels.map(level => ({
                        label: level,
                        value: level
                      }))}
                      placeholder="Estimate your current proficiency on this goal"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        Where You Want to Be 
                        <Image src={AsteriskIcon} alt="asterisk" className="w-3 h-3" />
                      </span>
                    </div>
                    <CustomDropdown
                      value={ksa.targetLvl}
                      onChange={(e) =>{console.log("Update ksa for goal")}}
                      options={proficiencyLevels.map(level => ({
                        label: level,
                        value: level
                      }))}
                      placeholder="Select your desired proficiency on this goal"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pl-6 pb-6">
            <button
              onClick={() => addKSAToGoal(competency, competencyGoal.id)}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-400 text-sm bg-transparent border-none"
            >
              <PlusIcon className="w-4 h-4" />
              <p className='pt-0.5'>Add Another KSA</p>
            </button>
          </div>

          {/* Resources and Obstacles */}
          <div className="grid gap-6 md:grid-cols-2 pb-8 pt-2 mx-4 border-b">
            {/* Resources and Support */}
            <div className="flex flex-col gap-2">
              <Label value="Resources & Support (Select all that apply)" className='font-bold' />
              <MultiSelectDropdown
                options={resourceSupportOptions}
                selectedValues={goal.resources || []}
                onChange={(newResources) => {
                  updateCompetencyGoal(competency, competencyGoal.id, 'resources', newResources);
                  if (!newResources.includes('Other')) {
                    updateCompetencyGoal(competency, competencyGoal.id, 'resourcesOther', '');
                  }
                }}
                placeholder="Add resources or support you need to accomplish your goal"
              />
              {goal.resources?.includes('Other') && (
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
            
            {/* Potential Obstacles */}
            <div className="flex flex-col gap-2">
              <Label value="Potential Obstacles (Select all that apply)" className='font-bold' />
              <MultiSelectDropdown
                options={obstacleOptions}
                selectedValues={goal.obstacles || []}
                onChange={(newObstacles) => {
                  updateCompetencyGoal(competency, competencyGoal.id, 'obstacles', newObstacles);
                  if (!newObstacles.includes('Other')) {
                    updateCompetencyGoal(competency, competencyGoal.id, 'obstaclesOther', '');
                  }
                }}
                placeholder="What might get in the way of your goal?"
              />
              {goal.obstacles?.includes('Other') && (
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

          <div className="flex justify-end pr-6 py-8">
            <button
              onClick={() => addGoalToCompetency(competency)}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-400 bg-transparent border-none"
            >
              <PlusIcon className="w-4 h-4" />
              <p className='pt-0.5'>Add Another Goal</p>
            </button>
          </div>

        </div>
      )}
    </div>
  )
};


