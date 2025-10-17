'use strict';

import { useState } from 'react';

export function useLearningPlanForm(initialStep = 2, onBack = null) {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [planName, setPlanName] = useState('');
    const [timeframe, setTimeframe] = useState('');
    const [competencyGoals, setCompetencyGoals] = useState({});
    const [savedPlanId, setSavedPlanId] = useState(null)
    const [competencyIds, setCompetencyIds] = useState({});

    // goal state management
    const [goals, setGoals] = useState([
        {
            id: crypto.randomUUID(),
            competency: '',
            current: 'Basic',
            target: 'Intermediate',
            priority: '',
            description: '',
            selectedCourses: []
        },
    ]);

    const addGoal = () => {
        setGoals((goals) => [
            ...goals,
            {
                id: crypto.randomUUID(),
                competency: '',
                current: 'Basic',
                target: 'Intermediate',
                priority: '',
                description: '',
                selectedCourses: []
            },
        ]);
    };

    // If this is the goal, merge the updates with existing goal data
    // If not the goal, return it unchanged
    const setGoalState = (id, updates) => {
        setGoals((goals) =>
            goals.map((goal) => {
                if (goal.id === id) {
                    return { ...goal, ...updates };
                } else {
                    return goal;
                }
            })
        );
    };

    const updateGoal = (id, key, value) => {
        const objectUpdate = { [key]: value };
        setGoalState(id, objectUpdate);
    };

    const removeGoal = id => {
        setGoals(goals => goals.filter((goal) => goal.id !== id));
    };

    const onCompetencyChange = (goalId, newCompetency) => {
        setGoalState(goalId, {
            competency: newCompetency,
            selectedCourses: []
        });
    };

    // competencyGoals state management
    const addGoalToCompetency = competencyName => {
        setCompetencyGoals(prev => ({
            ...prev,
            [competencyName]: [
                ...(prev[competencyName] || []),
                {
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
                        description: '',
                        currentLevel: 'Basic',
                        targetLevel: 'Intermediate'
                    }]
                }
            ]
        }));
    };

    const updateCompetencyGoal = (competencyName, goalId, field, value) => {
        setCompetencyGoals(prev => {
            // Get the current goals for this competency
            const currentGoals = prev[competencyName] || [];
            
            // Update the specific goal
            const updatedGoals = currentGoals.map(goal => {
                if (goal.id === goalId) {
                    return { ...goal, [field]: value };
                }
                return goal;
            });

            return {
                ...prev,
                [competencyName]: updatedGoals
            };
        });
    };

    const removeGoalFromCompetency = (competencyName, goalId) => {
        setCompetencyGoals(prev => {
            // Get the current goals
            const currentGoals = prev[competencyName] || [];
            
            // Remove the goal with the matching ID
            const filteredGoals = currentGoals.filter(goal => goal.id !== goalId);

            return {
                ...prev,
                [competencyName]: filteredGoals
            };
        });
    };

    // KSA state management
    const addKSAToGoal = (competencyName, goalId) => {
        setCompetencyGoals(prev => ({
            ...prev,
            [competencyName]: prev[competencyName]?.map(goal =>
                goal.id === goalId ? {
                    ...goal,
                    ksas: [
                        ...(goal.ksas || []),
                        {
                            id: crypto.randomUUID(),
                            type: '',
                            currentLevel: 'Basic',
                            targetLevel: 'Intermediate'
                        }
                    ]
                } : goal
            ) || []
        }));
    };

    const updateKSAInGoal = (goal, ksaId, field, value) => {
        if (goal.ksas) {
            // Update the specific KSA within this goal
            const updatedKSAs = goal.ksas.map(ksa => {
                if (ksa.id === ksaId) {
                    return { ...ksa, [field]: value };
                } else {
                    return ksa;
                }
            });
            return { ...goal, ksas: updatedKSAs };
        } else {
            return goal;
        }
    };

    const updateKSAForGoal = (competencyName, goalId, ksaId, field, value) => {
        setCompetencyGoals(prev => {
            const currentGoals = prev[competencyName] || [];

            const updatedGoals = currentGoals.map(goal => {
                if (goal.id === goalId) {
                    return updateKSAInGoal(goal, ksaId, field, value);
                }
                return goal;
            });

            return {
                ...prev,
                [competencyName]: updatedGoals
            };
        });
    };
    
    const removeKSAFromGoalHelper = (goal, ksaId) => {
        if (goal.ksas) {
            // Filter out the KSA with the matching ID
            const filteredKSAs = goal.ksas.filter(ksa => ksa.id !== ksaId);
            return { ...goal, ksas: filteredKSAs };
        }
        return goal;
    };

    const removeKSAFromGoal = (competencyName, goalId, ksaId) => {
        setCompetencyGoals(prev => {
            const currentGoals = prev[competencyName] || [];

            const updatedGoals = currentGoals.map(goal => {
                if (goal.id === goalId) {
                    return removeKSAFromGoalHelper(goal, ksaId);
                }
                return goal;
            });

            return {
                ...prev,
                [competencyName]: updatedGoals
            };
        });
    };

    // Form page nav management
    const nextStep = () => {
        // Max step is 5 (Review & Submit)
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        // Min step is 2 (Plan Details)
        // Step 0 (plan main page) and 1 (create plan summary) are not in the form flow
        if (currentStep > 2) {
            setCurrentStep(currentStep - 1);
        } else {
            onBack();
        }
    };

    return {
        // Main
        currentStep,
        setCurrentStep,
        planName,
        setPlanName,
        timeframe,
        setTimeframe,
        competencyGoals,
        setCompetencyGoals,
        savedPlanId,
        setSavedPlanId,
        competencyIds,
        setCompetencyIds,
        goals,
        setGoals,

        // Goal
        addGoal,
        removeGoal,
        setGoalState,
        updateGoal,
        onCompetencyChange,

        // Competency
        addGoalToCompetency,
        updateCompetencyGoal,
        removeGoalFromCompetency,

        // KSA
        addKSAToGoal,
        updateKSAForGoal,
        removeKSAFromGoal,

        // Nav
        nextStep,
        prevStep,
    };

}
