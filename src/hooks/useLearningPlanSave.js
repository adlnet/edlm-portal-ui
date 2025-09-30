'use strict'

export function useLearningPlanSave(formState) {
    const { nextStep } = formState;

    const handleSaveStep = async (currentStep) => {
        nextStep();
    };

    return { 
        handleSaveStep, 
        isLoading: false 
    };
}
