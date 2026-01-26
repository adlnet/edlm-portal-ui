'use strict';

import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Stepper ({ currentStep, steps, onStepClick }) {
  return (
    <ol className="flex items-center w-full space-x-2 text-sm font-medium text-center">
      {steps.map((step) => {
        // Allow clicking on review step as well
        const isClickable = onStepClick && (step.id === 0 || step.id <= currentStep);
        const isActive = step.id <= currentStep;
        const handleKeyDown = (e) => {
          if (e.key === 'Enter' && isClickable) {
            onStepClick(step.id);
          }
        };
        
        return (
          <li key={step.id} className="flex items-center">
            {isClickable ? (
              <button
                className={`flex items-center ${
                  isActive
                    ? 'text-[#0B61BD]' 
                    : 'text-[#E0E4E9]'
                } cursor-pointer hover:text-blue-800 transition-colors bg-transparent border-none p-0 font-inherit text-sm font-medium`}
                onClick={() => onStepClick(step.id)}
                onKeyDown={handleKeyDown}
                aria-label={`step ${step.name}`}
              >
                <span className="flex items-center">
                  {step.name}
                </span>
              </button>
            ) : (
              <span 
                className={`flex items-center ${
                  isActive
                    ? 'text-[#0B61BD]' 
                    : 'text-[#E0E4E9]'
                }`}
              >
                {step.name}
              </span>
            )}

            {step.id < steps.length - 1 && (
              <ChevronRightIcon className="w-3 h-3 ms-2 sm:ms-4" />
            )}
          </li>
        );
      })}
    </ol>
  );
};

