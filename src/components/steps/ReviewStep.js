'use strict'

import { ksaOptions } from '@/utils/dropdownMenuConstants';
import DevelopmentGoal from '@/components/cards/DevelopmentGoal';
import SuccessMessageToast from "@/components/cards/SuccessMessageToast";

export function ReviewStep({ planName, timeframe, goals, competencyGoals, showSuccessMessage = false }) {
    const selectedCompetencies = goals
        .filter(goal => goal.competency)
        .map(goal => goal.competency);

    const formattedGoals = [];

    for (const competency of selectedCompetencies) {
        const competencyGoalsList = competencyGoals[competency] || [];
        const goalInfo = goals.find(goal => goal.competency === competency);

        for (const goalIndex of competencyGoalsList.keys()) {
            const competencyGoal = competencyGoalsList[goalIndex];
            
            formattedGoals.push({
                id: `${competency}-${goalIndex}`,
                name: competency,
                desc: competencyGoal.goal || 'No goal defined',
                priority: goalInfo?.priority || 'Not set',
                timeline: competencyGoal.timeline || 'No timeline',
                resources: competencyGoal.resources || [],
                obstacles: competencyGoal.obstacles || [],
                ksaList: competencyGoal.ksas?.filter(ksa => ksa.type).map(ksa => ({
                    title: ksa.type,
                    desc: ksaOptions.find(opt => opt.name === ksa.type)?.description || '',
                    currLvl: ksa.currentLevel || 'Basic',
                    targetLvl: ksa.targetLevel || 'Intermediate'
                })) || [],
                courses: []
            });
        }
    }

    return (
        <>
            {showSuccessMessage && (
                <SuccessMessageToast
                    title={"Learning Plan Created Successfully!"}
                    description={"Your personalized development plan has been saved and is ready to guide your career growth"}
                />
            )}
            <div className='border border-gray-300 flex flex-row py-6 px-4 rounded-lg items-center justify-between mb-6'>
                <h1 className='font-bold text-gray-900 text-xl'>{planName || 'Learning Plan'}</h1>
                <div className='text-sm bg-blue-50 text-blue-700 rounded-md px-2 py-1'>{timeframe || 'No timeframe set'}</div>
            </div>

            {formattedGoals.map((goal) => (
                <DevelopmentGoal key={goal.id} goal={goal} />
            ))}
        </>
    );
};
