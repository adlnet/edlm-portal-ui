'use strict';
import { useState } from 'react';
import { Tab } from '@headlessui/react'

export default function TabBar( { selectedTab, setSelectedTab, tabs, loaded}) {

  const tabClasses = selected => `${'grow shrink basis-0 h-10 px-3 rounded justify-center items-center gap-2 flex'} ${selected ? 'bg-white shadow border border-[#263f9d] text-[#1f3764]' : 'bg-[#dae0e7] text-[#515151]'} text-sm font-semibold font-['Inter] learding-tight`;

  return (
    <Tab.Group defaultIndex={0} onChange={ i => setSelectedTab(tabs[i]) } >
      <Tab.List className='w-full relative rounded h-[3rem] flex flex-row items-start justify-start p-[0.25rem] box-border'>
        {tabs.map((tab, i) => (
          <Tab key={i} disabled={loaded} className={({ selected }) => tabClasses(selected)}>
            {tab}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
    );
  } 