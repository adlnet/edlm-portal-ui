'use strict';

import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Stepper ({ currentStep, steps, onStepClick }) {
  return (
    <ol className="flex items-center w-full space-x-2 text-sm font-medium text-center">
      {steps.map((step, index) => {
        const isClickable = onStepClick && (index === 0 || index <= currentStep);
        const isActive = index <= currentStep;
        const handleKeyDown = (e) => {
          if (e.key === 'Enter' && isClickable) {
            onStepClick(index);
          }
        };
        
        return (
          <li key={index} className="flex items-center">
            {isClickable ? (
              <button
                className={`flex items-center ${
                  isActive
                    ? 'text-[#0B61BD]' 
                    : 'text-[#E0E4E9]'
                } cursor-pointer hover:text-blue-800 transition-colors bg-transparent border-none p-0 font-inherit text-sm font-medium`}
                onClick={() => onStepClick(index)}
                onKeyDown={handleKeyDown}
                aria-label={`step ${step}`}
              >
                <span className="flex items-center">
                  {step}
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
                {step}
              </span>
            )}

            {index < steps.length - 1 && (
              <ChevronRightIcon className="w-3 h-3 ms-2 sm:ms-4" />
            )}
          </li>
        );
      })}
    </ol>
  );
};

