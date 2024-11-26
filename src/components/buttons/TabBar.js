'use strict';

import { Tab } from '@headlessui/react'

export default function TabBar( { selectedTab, setSelectedTab, tabs }) {

  const tabClasses = selected => `${'grow shrink basis-0 h-10 px-3 justify-center items-center gap-2 flex focus:outline-none'} ${selected ? 'bg-white shadow text-[#1f3764]' : 'bg-[#dae0e7] text-[#515151]'} text-sm font-semibold font-['Inter] learding-tight`;

  return (
    <Tab.Group defaultIndex={0} onChange={ i => setSelectedTab(tabs[i]) } >
      <Tab.List className='w-full relative h-[3rem] flex flex-row items-start justify-start p-[0.25rem] box-border '>
        {tabs.map((tab, i) => (
          <div key={i} className={selectedTab === tab ? `w-full flex ${i === 0 ?'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#263f9d] to-[#65d4e9] p-[0.07rem] rounded-sm` : 'w-full flex p-[0.05rem] rounded-sm'}>      
            <Tab key={i} className={({ selected }) => tabClasses(selected)}>
            {tab}
          </Tab>
          </div>
        ))}
      </Tab.List>
    </Tab.Group>
    );
  } 

