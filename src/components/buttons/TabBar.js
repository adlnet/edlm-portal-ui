'use strict';

import { Spinner } from "flowbite-react";
import { Tab } from '@headlessui/react'
import { useState } from 'react';

export default function TabBar({ selectedTab, setSelectedTab, tabs, loaded }) {
  const [hovered, setHovered] = useState(null);

  const selectedIndex = tabs.indexOf(selectedTab)

  const tabClasses = selected => `${'grow shrink basis-0 h-10 px-3 justify-center items-center gap-2 flex focus:outline-none'} ${selected ? 'bg-white shadow text-[#1f3764]' : 'bg-gray-200 text-[#515151]'} text-sm font-semibold leading-tight`;

  const getTabClasses = (tab, i) => {
    if (selectedTab === tab) {
      return `w-full flex ${i === 0 ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#263f9d] to-[#65d4e9] p-[0.07rem] rounded-sm`;
    }

    return 'w-full flex p-[0.05rem] rounded-sm';
  };
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={i => setSelectedTab(tabs[i])}>
      <Tab.List className='w-full relative h-[3rem] flex flex-row items-start justify-start p-[0.25rem] box-border '>
        {tabs.map((tab, i) => (
          <div
            key={tab}
            className={getTabClasses(tab, i)}
            onMouseEnter={() => setHovered(tab)}
            onMouseLeave={() => setHovered(null)}
          >
            <Tab key={tab} disabled={loaded} className={({ selected }) => tabClasses(selected)}>
              {tab}
            {/* Spinner only shows up when comptency data is not ready */}
            <div className="flex items-center">
              {loaded && hovered === tab && i === 1 && <Spinner color="purple" aria-label="Purple spinner example" />}
            </div>
            </Tab>
          </div>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
