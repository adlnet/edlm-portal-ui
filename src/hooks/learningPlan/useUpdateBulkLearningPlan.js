'use strict';

import { useCreateLearningPlanCompetency } from '@/hooks/learningPlan/useCreateLearningPlanCompetency';
import { useCreateLearningPlanGoal } from '@/hooks/learningPlan/useCreateLearningPlanGoal';
import { useCreateLearningPlanGoalKsa } from '@/hooks/learningPlan/useCreateLearningPlanGoalKsa';
import { useDeleteLearningPlanCompetency } from '@/hooks/learningPlan/useDeleteLearningPlanCompetency';
import { useDeleteLearningPlanGoal } from '@/hooks/learningPlan/useDeleteLearningPlanGoal';
import { useDeleteLearningPlanGoalKsa } from '@/hooks/learningPlan/useDeleteLearningPlanGoalKsa';
import { useQueryClient } from 'react-query';
import { useUpdateLearningPlan } from '@/hooks/learningPlan/useUpdateLearningPlan';
import { useUpdateLearningPlanCompetency } from '@/hooks/learningPlan/useUpdateLearningPlanCompetency';
import { useUpdateLearningPlanGoal } from '@/hooks/learningPlan/useUpdateLearningPlanGoal';
import { useUpdateLearningPlanGoalKsa } from '@/hooks/learningPlan/useUpdateLearningPlanGoalKsa';

export function useUpdateBulkLearningPlan() {
    const queryClient = useQueryClient();
    const { mutateAsync: updatePlan } = useUpdateLearningPlan();
    const { mutateAsync: createCompetency } = useCreateLearningPlanCompetency();
    const { mutateAsync: updateCompetency } = useUpdateLearningPlanCompetency();
    const { mutateAsync: deleteCompetency } = useDeleteLearningPlanCompetency();
    const { mutateAsync: createGoal } = useCreateLearningPlanGoal();
    const { mutateAsync: updateGoal } = useUpdateLearningPlanGoal();
    const { mutateAsync: deleteGoal } = useDeleteLearningPlanGoal();
    const { mutateAsync: createKsa } = useCreateLearningPlanGoalKsa();
    const { mutateAsync: updateKsa } = useUpdateLearningPlanGoalKsa();
    const { mutateAsync: deleteKsa } = useDeleteLearningPlanGoalKsa();

    const processKsa = async (ksaData, goalId) => {
        if (ksaData.isNew) {
            await createKsa({
                planGoalId: goalId,
                ksaExternalReference: ksaData.ksaId,
                ksaName: ksaData.type,
                currentLevel: ksaData.currentLevel,
                targetLevel: ksaData.targetLevel
            });
        } else if (ksaData.isDeleted) {
            await deleteKsa(ksaData.id);
        } else {
            await updateKsa({
                ksaId: ksaData.id,
                ksaData: {
                    ksaExternalReference: ksaData.ksaId,
                    currentLevel: ksaData.currentLevel,
                    targetLevel: ksaData.targetLevel
                }
            });
        }
    };

    const processGoal = async (goalData, competencyId) => {
        let goalId = goalData.id;

        if (goalData.isNew) {
            const newGoal = await createGoal({
                planCompetencyId: competencyId,
                goalName: goalData.goal,
                timeline: goalData.timeline,
                resources: goalData.resources || [],
                obstacles: goalData.obstacles || [],
                resourcesOther: goalData.resourcesOther || '',
                obstaclesOther: goalData.obstaclesOther || ''
            });
            goalId = newGoal.id;
        } else if (goalData.isDeleted) {
            await deleteGoal(goalId);
            return;
        } else {
            await updateGoal({
                goalId,
                goalData: {
                    goalName: goalData.goal,
                    timeline: goalData.timeline,
                    resources: goalData.resources || [],
                    obstacles: goalData.obstacles || [],
                    resourcesOther: goalData.resourcesOther || '',
                    obstaclesOther: goalData.obstaclesOther || ''
                }
            });
        }

        for (const ksaData of goalData.ksas || []) {
            await processKsa(ksaData, goalId);
        }
    };

    const processCompetency = async (competencyData, planId) => {
        let competencyId = competencyData.id;

        if (competencyData.isNew) {
            const newCompetency = await createCompetency({
                learningPlanId: planId,
                priority: competencyData.priority,
                competencyExternalReference: competencyData.competencyId,
                competencyName: competencyData.name
            });
            competencyId = newCompetency.id;
        } else if (competencyData.isDeleted) {
            await deleteCompetency(competencyId);
            return;
        } else {
            await updateCompetency({
                competencyId,
                competencyData: {
                    competencyExternalReference: competencyData.competencyId,
                    priority: competencyData.priority
                }
            });
        }

        for (const goalData of competencyData.goals || []) {
            await processGoal(goalData, competencyId);
        }
    };

    const updateCompleteLearningPlan = async (planData) => {
        try {
            const { planId, planName, timeframe, competencies } = planData;

            await updatePlan({
                planId,
                planData: { planName, timeframe }
            });

            for (const competencyData of competencies) {
                await processCompetency(competencyData, planId);
            }

            queryClient.invalidateQueries(['learning-plan', planId]);
            queryClient.invalidateQueries(['learning-plans']);

            return true;
        } catch (err) {
            console.error('Failed to update learning plan');
            return false;
        }
    };

    return { updateCompleteLearningPlan, isLoading: false };
}
