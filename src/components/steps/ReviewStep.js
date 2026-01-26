'use strict'

import { useCompetencies } from '@/contexts/CompetencyContext';
import DevelopmentGoal from '@/components/cards/DevelopmentGoal';

export function ReviewStep({ planName, timeframe, goals, competencyGoals }) {
    const { childCompetencies } = useCompetencies();
    const selectedCompetencies = goals
        .filter(goal => goal.competency)
        .map(goal => goal.competency);

    const reformattedCompetency = {};

    for (const competency of selectedCompetencies) {
        const goalInfo = goals.find(goal => goal.competency === competency);
        
        // if competency id doesnt exisit, create a new one
        if (!reformattedCompetency[competency]) {
            reformattedCompetency[competency] = {
                id: competency,
                name: competency,
                priority: goalInfo?.priority || 'Not set',
                goals: []
            }
        }

        const competencyGoalsList = competencyGoals[competency] || [];

        competencyGoalsList.forEach((competencyGoal, goalIndex) => {
            const transformedGoal = {
                id: `${competency}-${goalIndex}`,
                name: competency,
                desc: competencyGoal.goal || 'No goal defined',
                priority: goalInfo?.priority || 'Not set',
                timeline: competencyGoal.timeline || 'No timeline',
                resources: competencyGoal.resources || [],
                obstacles: competencyGoal.obstacles || [],
                ksaList: competencyGoal.ksas?.filter(ksa => ksa.type).map(ksa => {
                    const ksaData = childCompetencies.find(child => child.name === ksa.type);
                    return {
                        title: ksa.type,
                        desc: ksaData?.description || '',
                        currLvl: ksa.currentLevel || 'Basic',
                        targetLvl: ksa.targetLevel || 'Intermediate'
                    };
                }) || [],
                courseList: []
            };
            reformattedCompetency[competency].goals.push(transformedGoal);
        });
    }

    const competenciesWithGoals = Object.values(reformattedCompetency);

    return (
        <>
            <div className='border border-gray-300 flex flex-row py-6 px-4 rounded-lg items-center justify-between mb-6'>
                <h1 className='font-bold text-gray-900 text-xl'>{planName || 'Learning Plan'}</h1>
                <div className='text-sm bg-blue-50 text-blue-700 rounded-md px-2 py-1'>{timeframe || 'No timeframe set'}</div>
            </div>

            {competenciesWithGoals.map((competency) => (
                <DevelopmentGoal key={competency.id} competency={competency} />
            ))}
        </>
    );
};
