'use strict';

import { Accordion } from 'flowbite-react';
import React from 'react'

export default function CompetencySearchResult({ result }) {

    return (
        <Accordion collapseAll className="mb-4 border-blue-200">
            <Accordion.Panel className="font-bold">
                <Accordion.Title className="font-bold text-xl focus:ring-0 bg-[#F4F3F6] text-black-900">
                    {result[0].name}
                </Accordion.Title>
                <Accordion.Content className="p-4 border-1 border-blue-200">
                    <div className="flex-row">
                        <p className="m-2 bg-slate-200 p-2 font-bold italic rounded-lg">
                            Definition: {result[0].desc}
                        </p>
                        <ul className="mb-2 ml-4 text-sm list-disc">
                            {result[1].map((child)=>(
                                <li className="ml-3 mb-2"> 
                                    <span className="font-bold mr-1">
                                        {child.name}: 
                                    </span> 
                                    {child.desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    )
}

