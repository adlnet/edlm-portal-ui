'use strict';

import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

export default function SelectList({
  options,
  keyName,
  initialValue,
  onChange,
  onClear,
}) {
  const [selected, setSelected] = useState(initialValue);
  return (
    <Menu as='div' className='relative inline-block text-left mt-0.5'>
      <div className='flex flex-col gap-2'>
        <div
              className='relative rounded-lg p-[0.06rem] bg-gradient-to-l from-[#263f9d] to-[#65d4e9]'
            >
          <Menu.Button
            title={`${keyName} filter`}
            className='w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700' type="button">

            <div className='line-clamp-1'>{selected || keyName}</div>
            {/* <ChevronDownIcon className='h-4 w-4 text-gray-600' /> */}
            <svg class="ml-1.5 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
          </Menu.Button>
          </div>
        <div className='flex justify-end'>
          <button
            id={options?.field_name}
            className='w-min text-gray-600 hover:text-blue-400 cursor-pointer text-xs text-right my-2 px-2 hover:underline focus:ring-2 ring-blue-300 outline-none rounded-full -mt-1 focus:text-blue-300 focus-text-shadow'
            title='clear selection'
            onClick={() => {
              onClear(options?.field_name);
              setSelected(null);
            }}
          >
            clear
          </button>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-100'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute left-0 top-10 w-44 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-2 ring-blue-300 outline-none line-clamp-1'>
          <div className='p-1'>
            {options?.buckets?.map((group) => {
              return (
                <Menu.Item key={group.key}>
                  {({ active }) => (
                    <button
                      name={options.field_name}
                      value={group.key}
                      onClick={(e) => {
                        onChange(e);
                        setSelected(group.key);
                      }}
                      className={`${
                        active && 'bg-gray-50'
                      } cursor-pointer rounded-md w-full text-left flex justify-between items-center `}
                    >
                      {group.key}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
