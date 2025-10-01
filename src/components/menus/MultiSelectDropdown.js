'use strict';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export function MultiSelectDropdown({ options, selectedValues = [], onChange, placeholder, disabled = false }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full px-3 py-2.5 text-left text-sm bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'
                    }`}
            >
                <div className="flex justify-between items-center">
                    <span className={selectedValues.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                        {selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
                    </span>
                    <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-[99999] w-full mt-1 p-4 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <label key={option} className="flex items-center mb-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(option)}
                                onChange={e => {
                                    const newValues = e.target.checked
                                        ? [...selectedValues, option]
                                        : selectedValues.filter(v => v !== option);
                                    onChange(newValues);
                                }}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
