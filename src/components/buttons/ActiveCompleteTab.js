'use strict';

import { Tab } from '@headlessui/react';

export default function ActiveCompleteTab({ selectedTab, setSelectedTab, tabs = ['Active', 'Completed'] }) {
  const selectedIndex = tabs.indexOf(selectedTab);

  const tabClasses = selected => 
    `flex-1 px-2 py-1 text-sm font-medium rounded-full focus:outline-none ${
      selected
        ? 'bg-white shadow'
        : 'hover:text-gray-600'
    }`;

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={i => setSelectedTab(tabs[i])}>
      <div className="inline-flex rounded-full bg-[#ECECF0] p-1" style={{ width: '155px', height: '36px' }}>
        <Tab.List className="flex w-full">
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
    </Tab.Group>
  );
}
