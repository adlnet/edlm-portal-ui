'use strict';

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Dropdown } from 'flowbite-react';

export default function CustomDropdown({ 
    value, 
    onChange, 
    options, 
    placeholder, 
    className = "",
    disabled = false,
    renderDisplay = null,
    renderOption = null,
    footerItem = null,
    showError = false,
    errorMessage = "",
}) {

    // This is used to render custom display in the dropdown trigger
    const displayContent = renderDisplay ? renderDisplay(value, placeholder) : (
        <span className={`font-normal ${value ? "text-gray-900" : `${showError ? 'text-dark-red' : 'text-gray-500'}`}`}>
            {value || placeholder}
        </span>
    );

    const inputStyle = () => {
        if (showError) {
            return (`bg-red-50 border-dark-red focus:ring-2 focus:ring-dark-red hover:border-red-700 text-dark-red ${value ? 'text-dark-red' : 'placeholder-dark-red'}`);
        }
        return (`border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-200`);
    }

    const needsScroll = options.length > 8;

    const optionsWrapperClass = needsScroll ? "max-h-72 overflow-y-auto" : "";

    return (
    <>
        <Dropdown 
            label="dropdown" 
            className={className}
            renderTrigger={() => (
                <div className={`w-full px-3 py-2.5 rounded-lg border text-sm inline-flex justify-between items-center focus:ring-4 cursor-pointer 
                                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                ${inputStyle()}`}>
                    {displayContent}
                    <ChevronDownIcon className="h-4 w-4 text-gray-400 ml-2" />
                </div>
            )}
        >
            {!disabled && (
                <div className={optionsWrapperClass}>
                    {options.map(option => {
                        const optionValue = option?.value ?? option;
                        const optionLabel = option?.label ?? option;
                        const disabled = option?.disabled ?? false;

                        return (
                            <Dropdown.Item 
                                key={optionValue} 
                                onClick={() => !disabled && onChange({ target: { value: optionValue } })}
                                className={`flex items-center gap-2 w-full ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {renderOption ? renderOption(optionValue) : optionLabel}
                            </Dropdown.Item>
                        );
                    })}
                </div>  
            )}

            {footerItem && (
                <>
                    <Dropdown.Divider />
                    <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
                        {footerItem}
                    </div>
                </>
            )}
        </Dropdown>
        {showError && (
            <p className={`text-dark-red text-sm px-3 mt-1 ${disabled ? 'opacity-50' : ''}`}>{errorMessage}</p>
        )}
    </>);
}
