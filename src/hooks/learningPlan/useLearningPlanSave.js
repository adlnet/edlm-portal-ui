'use strict'

import { useCreateLearningPlan } from '@/hooks/learningPlan/useCreateLearningPlan';
import { useCreateLearningPlanCompetency } from '@/hooks/learningPlan/useCreateLearningPlanCompetency';
import { useCreateLearningPlanGoal } from '@/hooks/learningPlan/useCreateLearningPlanGoal';
import { useCreateLearningPlanGoalKsa } from '@/hooks/learningPlan/useCreateLearningPlanGoalKsa';
import { useDeleteLearningPlanCompetency } from '@/hooks/learningPlan/useDeleteLearningPlanCompetency';
import { useUpdateLearningPlan } from '@/hooks/learningPlan/useUpdateLearningPlan';
import { useUpdateLearningPlanCompetency } from '@/hooks/learningPlan/useUpdateLearningPlanCompetency';

export function useLearningPlanSave(formState) {

    const { mutateAsync: createPlan } = useCreateLearningPlan();
    const { mutateAsync: updatePlan } = useUpdateLearningPlan();
    const { mutateAsync: createCompetency } = useCreateLearningPlanCompetency();
    const { mutateAsync: updateCompetency } = useUpdateLearningPlanCompetency();
    const { mutateAsync: createGoal } = useCreateLearningPlanGoal();
    const { mutateAsync: createKsa } = useCreateLearningPlanGoalKsa();
    const { mutateAsync: deleteCompetency } = useDeleteLearningPlanCompetency();

    const {
        planName,
        timeframe,
        goals,
        competencyGoals,
        savedPlanId,
        setSavedPlanId,
        competencyIds,
        setCompetencyIds,
        setCurrentStep
    } = formState;

    const handleSaveStep2 = async () => {
        try {
            if (!savedPlanId) {
                // Create new plan
                const plan = await createPlan({
                   planName,
                   timeframe
                });
                setSavedPlanId(plan.id);
            } else {
                // Update plan
                await updatePlan({
                    planId: savedPlanId,
                    planData: {
                        planName,
                        timeframe
                    }
                });
            }
            return true;
        } catch (err) {
            console.error('Failed to save step 2');
            return false;
        }
    };

    const handleSaveStep3 = async () => {
        try {
            const updatedIds = {};
            const existingIds = Object.values(competencyIds);
            
            for (let i = 0; i < goals.length; i++) {
                const goal = goals[i];
                if (!goal.competency) continue;

                const competencyReference = goal.competencyId || goal.competency;

                if (existingIds[i]) {
                    await updateCompetency({
                        competencyId: existingIds[i],
                        competencyData: {
                        competencyExternalReference: competencyReference,
                        competencyName: goal.competency,
                        priority: goal.priority
                        }
                    });
                    updatedIds[goal.competency] = existingIds[i];
                } else {
                    const competency = await createCompetency({
                        learningPlanId: savedPlanId,
                        priority: goal.priority,
                        competencyExternalReference: competencyReference,
                        competencyName: goal.competency
                    });
                    updatedIds[goal.competency] = competency.id;
                }
            }

            // Delete extra competencies
            const extraIds = existingIds.slice(goals.filter(g => g.competency).length);
            for (const extraId of extraIds) {
                await deleteCompetency(extraId);
            }
            
            setCompetencyIds(updatedIds);
            return true;
        } catch (err) {
            console.error('Failed to save step 3:', err);
            return false;
        }
    };

    const handleSaveStep4 = async () => {
        try {
            if (!savedPlanId) {
                console.error('No plan ID found. Redirecting to step 2.');
                setCurrentStep(2);
                return;
            }

            const selectedCompetencies = goals.filter(goal => goal.competency).map(goal => goal.competency);

            for (const competencyName of selectedCompetencies) {
                const competencyGoalsList = competencyGoals[competencyName] || [];
                const competencyId = competencyIds[competencyName];

                // Skip if no competency ID found
                if (!competencyId) {
                    console.error('No competency ID found for');
                    continue;
                }
                
                for (const competencyGoal of competencyGoalsList) {
                    const createdGoal = await createGoal({
                        planCompetencyId: competencyId,
                        goalName: competencyGoal.goal,
                        timeline: competencyGoal.timeline,
                        resources: competencyGoal.resources || [],
                        obstacles: competencyGoal.obstacles || [],
                        resourcesOther: competencyGoal.resourcesOther || '',
                        obstaclesOther: competencyGoal.obstaclesOther || ''
                    });

                    for (const ksa of competencyGoal.ksas || []) {
                        if (!ksa.type) continue;

                        const ksaReference = ksa.ksaId
                        
                        await createKsa({
                            planGoalId: createdGoal.id,
                            ksaExternalReference: ksaReference,
                            ksaName: ksa.type,
                            currentLevel: ksa.currentLevel,
                            targetLevel: ksa.targetLevel
                        });
                    }
                }
            }

            return true;
        } catch (err) {
            console.error('Failed to save step 4');
            return false;
        }
    };

    // Update the save button logic
    const handleSaveStep = async (currentStep) => {
        switch (currentStep) {
            case 2:
                return await handleSaveStep2();
            case 3:
                return await handleSaveStep3();
            case 4:
                return await handleSaveStep4();
            default:
                return false;
        }
    };

    return { handleSaveStep, isLoading: false };
}
