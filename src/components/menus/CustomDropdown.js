'use strict';

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Dropdown } from 'flowbite-react';

export default function CustomDropdown({ 
    value, 
    onChange, 
    options, 
    placeholder, 
    className = "",
    renderDisplay = null,
    renderOption = null,
    footerItem = null
}) {

    // This is used to render custom display in the dropdown trigger
    const displayContent = renderDisplay ? renderDisplay(value, placeholder) : (
        <span className={`font-normal ${value ? "text-gray-900" : "text-gray-500"}`}>
            {value || placeholder}
        </span>
    );

    const needsScroll = options.length > 8;

    const optionsWrapperClass = needsScroll ? "max-h-72 overflow-y-auto" : "";

    return (
        <Dropdown 
            label="dropdown" 
            className={className}
            renderTrigger={() => (
                <div className="w-full px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-300 text-sm inline-flex justify-between items-center hover:bg-gray-100 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
                    {displayContent}
                    <ChevronDownIcon className="h-4 w-4 text-gray-400 ml-2" />
                </div>
            )}
        >
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

            {footerItem && (
                <>
                    <Dropdown.Divider />
                    <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
                        {footerItem}
                    </div>
                </>
            )}
        </Dropdown>
    );
}
