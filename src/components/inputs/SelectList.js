'use strict';

import { getUniqueCleanCompetencies} from '@/utils/getUniqueCleanCompetencies';
import { removeHTML } from '@/utils/cleaning';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function SelectList({
  options,
  keyName,
  initialValue,
  onChange,
}) {

  // State to track selected options
  const [selected, setSelected] = useState(initialValue || []);
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  // The competency subject contains multiple competencies separated by commas
  // Need to split them and display them as individual competencies
    // if the keyName is not Competency, then just return the regular filter options
  const selectListOptions = useMemo(() => {
    if (keyName === 'Competency') {
      return getUniqueCleanCompetencies(options);
    }
    return options?.buckets || [];
  }, [options, keyName]);

  const handleCheckboxChange = (e, key) => {
    // Get the updated selection
    const updatedSelection = e.target.checked;
    
    if (updatedSelection) {
      // Add the key to the selected state
      setSelected(Array.isArray(selected) ? [...selected, key] : [key]);
    } else {
      // Remove the key from the selected state, make sure it is an array
      setSelected(Array.isArray(selected) ? selected.filter((item) => item !== key) : []);
    }
  }

  const handleMenuButtonClick = (e) => {
    if (isOpen) {
      onChange({ target: { name: options.field_name, value: selected } });
    }
    setIsOpen(!isOpen);
  }

  const handleClickOutOfMenu = e => {
    // Close the dropdown if the click is outside the dropdown
    if (isOpen && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
      onChange({ target: { name: options.field_name, value: selected } });
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the dropdown
    document.addEventListener('click', handleClickOutOfMenu);
      
    return () => document.removeEventListener('click', handleClickOutOfMenu);
  }, [handleClickOutOfMenu]);


  return (
    <div ref={dropDownRef} className='relative inline-block text-left mt-0.5'>
      <div className='flex flex-col gap-1.5'>
        <div
              className='relative rounded-lg p-[0.06rem] bg-gradient-to-l from-[#263f9d] to-[#65d4e9]'
            >
          <button
            title={`${keyName} filter`}
            className='dropdown-button h-[37x] flex items-center justify-center py-1.5 px-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            type="button"
            onClick={handleMenuButtonClick}
          >
            <div className='whitespace-nowrap'>{keyName}</div>
            <svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </button>
        </div>
      </div>


      {isOpen && (
        <div className="p-4 bg-white rounded-lg shadow flex-col justify-start items-start inline-flex absolute left-0 top-10 z-50 w-56 max-h-80 overflow-auto">
          <div>
            {selectListOptions.map((group) => (
              <div key={group.key} className="flex items-center mb-2 ">

                <input
                  type='checkbox'
                  id={`${options.field_name}-${group.key}`}
                  name={options.field_name}
                  value={group.key}
                  checked={selected.includes(group.key)}
                  onChange={(e) => handleCheckboxChange(e, group.key)}
                  className="w-4 h-4 bg-[#faf9fb] rounded border border-[#d6d2db] cursor-pointer mr-2 "
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                  <label htmlFor={`${options.field_name}-${group.key}`} className="text-[#1b1128] text-sm font-medium  leading-[14px] cursor-pointer">
                  {keyName === 'Competency' && group.cleanedKey 
                      ? removeHTML(group.cleanedKey) 
                      : removeHTML(group.key)}
                  </label>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}