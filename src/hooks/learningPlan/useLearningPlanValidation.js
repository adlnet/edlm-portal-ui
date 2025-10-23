'use stricty';

import { longTermGoalTimeLine, shortTermGoalTimeLine } from "@/utils/dropdownMenuConstants";

export function useLearningPlanValidation(formState) {
    const { planName, timeframe, goals, competencyGoals } = formState;

    // Get timeline options based on selelcted plan timeframe
    const getTimelineOptions = () => {
        if (timeframe === 'Short-term (1-2 years)') {
            return shortTermGoalTimeLine;
        } else if (timeframe === 'Long-term (3-4 years)') {
            return longTermGoalTimeLine;
        }
        return [];
    };

     // These conditions validates if a user can go to the next step and enable the save button
     // All required fields must be filled out to continue
    const canProceedFromStep = step => {
        switch (step) {
            case 2:
                return validateBasicPlanInfo();
            case 3:
                return validateCompetencySelection();
            case 4:
                return validateGoalsAndKSAs();
            case 5:
                return true;
            default:
                return false;
        }
    };

    // Step 2 (Name the plan
    const validateBasicPlanInfo = () => planName && timeframe;

    // Step 3 (Choose skill (competency) area)
    const validateCompetencySelection = () => {
        return goals.length > 0 && goals.every(goal => goal.competency && goal.priority);   
    };

    // Step 4 (Set goals and KSAs)
    const validateGoalsAndKSAs = () => {
        const selectedCompetencies = goals
            .filter(goal => goal.competency)
            .map(goal => goal.competency);

        if (selectedCompetencies.length === 0) return false;

        return selectedCompetencies.every(competency => {
            const competencyGoalsList = competencyGoals[competency] || [];
            return (
                competencyGoalsList.length > 0 &&
                competencyGoalsList.every(goal => isGoalComplete(goal))
            );
        });
    };

    const isGoalComplete = planGoal => {
        const availableTimelineOptions = getTimelineOptions();

        // Check basic goal info
        const hasGoalAndTimeline = (
            planGoal.goal && 
            planGoal.timeline && 
            availableTimelineOptions.includes(planGoal.timeline)
        );

        // Check KSAs
        const hasValidKSAs = (
            planGoal.ksas && 
            planGoal.ksas.length > 0 && 
            planGoal.ksas.every(ksa => ksa.type && ksa.currentLevel && ksa.targetLevel)
        );

        return hasGoalAndTimeline && hasValidKSAs;
    }

    return { canProceedFromStep, getTimelineOptions };
}
