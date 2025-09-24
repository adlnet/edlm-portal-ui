'use strict';

import { Tab } from '@headlessui/react';

export default function ActiveCompleteTab({ selectedTab, setSelectedTab, tabs = ['Active', 'Completed'] }) {
  const selectedIndex = tabs.indexOf(selectedTab);

  const tabClasses = selected => 
    `px-4 text-sm font-bold focus:outline-none ${
      selected
        ? 'text-blue-400 border-b border-b-blue-800 border-b-2'
        : 'hover:text-gray-400'
    }`;

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={i => setSelectedTab(tabs[i])}>
      <div className="w-full border-b border-b-2 m-0" style={{height: '36px' }}>
        <div className='w-1/4 m-0'>
          <Tab.List className="">
            {tabs.map((label) => (
              <Tab
                key={label}
                className={({ selected }) => tabClasses(selected)}
              >
                {label}
              </Tab>
            ))}
          </Tab.List>
        </div>
      </div>
    </Tab.Group>
  );
}
