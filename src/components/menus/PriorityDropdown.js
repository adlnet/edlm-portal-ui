'use strict';

import CustomDropdown from '@/components/menus/CustomDropdown';
import priorityIcon from '@/utils/priorityIcon';

export default function PriorityDropdown({ value, onChange, options, placeholder = "Select priority" }) {
    const renderDisplay = (selectedValue, placeholderText) => (
        <span className={`font-normal ${selectedValue ? "text-gray-900" : "text-gray-500"}`}>
            {selectedValue ? (
                <div className="flex items-center gap-2">
                    {priorityIcon(selectedValue)}
                    <span>{selectedValue}</span>
                </div>
            ) : (
                placeholderText
            )}
        </span>
    );

    // This is used to render custom priority option with icon
    const renderOption = priority => (
        <>
            {priorityIcon(priority)}
            <span>{priority}</span>
        </>
    );

    return (
        <CustomDropdown
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            renderDisplay={renderDisplay}
            renderOption={renderOption}
        />
    );
}
