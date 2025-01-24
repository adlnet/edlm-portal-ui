import { AcademicCapIcon, ClockIcon, ListBulletIcon, WindowIcon } from '@heroicons/react/24/solid';
import { Accordion } from 'flowbite-react';

const FlowbiteAccordion = ({ acctitle, accdescription }) => {

    return (
        <Accordion collapseAll>
            <Accordion.Panel>
                <Accordion.Title>{acctitle}</Accordion.Title>
                <Accordion.Content>
                    <div className='flex flex-row justify-between mb-4'>
                        <div className='flex flex-row gap-1 text-gray-custom'><ListBulletIcon className='h-5 text-gray-custom '/>Course Code: LDR-04921 </div>
                        <div className='flex flex-row gap-1 text-gray-custom'><ClockIcon className='h-5 text-gray-custom '/> Duration: 1hr 5m </div>
                        <div className='flex flex-row gap-1 text-gray-custom'><WindowIcon className='h-5 text-gray-custom '/> Modality: Online</div>
                        <div className='flex flex-row gap-1 text-gray-custom'><AcademicCapIcon className='h-5 text-gray-custom '/> Course Proficiency: Basic/ Knowledgeable</div>
                    </div>
                    <p className="mb-2 text-black-500 dark:text-gray-400">
                       <b>Description:</b> {accdescription}
                    </p>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
   )
};

export default FlowbiteAccordion;