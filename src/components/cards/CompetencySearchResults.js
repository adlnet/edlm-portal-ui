'use strict';

import React from 'react'
import { Accordion } from 'flowbite-react';

export default function CompetencySearchResult({ result }) {

    if(result === undefined){
        return( 
            <div>
                Competencies cannot be retrieved, please try again later.
            </div>
        )
    }

    return (
        // <div className='mb-4 border-2 border-blue-200 rounded-lg'>
        //     <div className="flex bg-slate-200 font-bold border-b-2 border-blue-200">
        //         <h1 className="m-2 text-lg">{result[0].name}</h1>
        //     </div>
        //     <div className="flex-row">
        //     <p className="m-2 bg-slate-200 p-2 font-bold italic rounded-lg">
        //         Definition: {result[0].desc}
        //     </p>
        //     <ul className="mb-2 ml-4 text-sm list-disc">
        //         {result[1].map((child)=>(
        //             <li className="ml-3 mb-2"> 
        //                 <span className="font-bold mr-1">
        //                     {child.name}: 
        //                 </span> 
        //                 {child.desc}
        //             </li>
        //         ))}
        //     </ul>
        //     </div>
        // </div>


        <Accordion collapseAll className="mb-4">
            <Accordion.Panel className="">
                <Accordion.Title className='font-bold border-1 border-blue-200 rounded-lg'>
                    {result[0].name}
                </Accordion.Title>
                <Accordion.Content>
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

