// "use client";

import Image from "next/image";
import image from  "@/public/Picture1.png"
import { Checkbox, Label } from "flowbite-react";
import { useRouter } from 'next/router';
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";
import { TalentTable } from "@/components/tables/TalentTable";


export default function TrainingPlan() {
    const router = useRouter();
    // const config = useConfig();
    const forceFilters = ["Army", "Marine Cops", "Navy", "Air Force", "Space Force", "Coast Guard" ];
    const myUnitFilters = [
        {title:"Operations Group", keys:["Operations Support", "Operations Squadrons", "Air Control SQ"]},
        {title:"Maintenance Group", keys:["TBD"]},
        {title:"Mission Support Group", keys:["TBD"]},
        {title:"Medical Group", keys:["TBD"]},
    ]; 
    const savedFilters = ["Jennifer Waites"]

    return (
        <div className="mx-28">
            <h2 className="flex h-48 w-5/6 items-center text-3xl font-bold text-white justify-center absolute z-10">Training Plan</h2>
            <Image src={image} width={1400} alt='' className='rounded-lg mr-5 my-8 opacity-60' /> 
            <div className='bg-white shadow-md'></div>
            <div className='bg-white shadow-md w-1/2 p-5 w-full '> 
              <div className='pt-2 text-lg font-bold'> Analyze Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600'> Find qualified individuals at the speed of relevance. </div>
              <div className='bg-gray-100 p-2 my-2 rounded rounded-md px-8 mb-5'>
                <div className='pt-2 text-lg font-bold'> Select Talent </div>
                <div className='pt-2 text-gray-600'>Select talent either within a Force, Your Unit, or previously saved talent.</div>
                
                <div className="flex flex-row gap-32 pl-12 py-5">
                <Accordion 
                    acctitle='Force'
                    accdescription={                   
                    <div className="flex flex-col gap-2">
                    {forceFilters.map((data) => {
                        return (<> 
                        <div className="flex items-center gap-2 ml-1">
                            <Checkbox id={data} />
                            <Label htmlFor={data}>{data}</Label>
                        </div>
                        </>
                        )
                    })}
                    </div>
                    }
                />

                <Accordion 
                    acctitle='My Unit'
                    accdescription={
                        <div className="flex flex-col gap-2">
                        {myUnitFilters.map((data) => {
                        return (<> 
                        <div className="flex items-center gap-2 ml-1">
                            <Checkbox id={data} />
                            <Label htmlFor={data}>{data.title}</Label>
                        </div>
                        <div className="ml-6">
                            {data.keys.map((key) => {
                               return (<> 
                                <div className="flex items-center gap-2">
                                    <Checkbox id={key} />
                                    <Label htmlFor={key}>{key}</Label>
                                </div>
                                </>
                                )
                            })}
                        </div>
                        </>
                        )
                    })}
                    </div>
                    }
                />

                <Accordion 
                    acctitle='Saved'
                    accdescription={                   
                    <div className="flex flex-col gap-2">
                    {savedFilters.map((data) => {
                        return (<> 
                        <div className="flex items-center gap-2 ml-1">
                            <Checkbox id={data} />
                            <Label htmlFor={data}>{data}</Label>
                        </div>
                        </>
                        )
                    })}
                    </div>
                    }
                />
                </div>

                
              </div>

              <TalentTable />
              <div className="flex justify-end mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                            <p className="pt-0.5"> Select </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                        
                    } onClick={()=>router.push("/trainingPlan/filters")}/>
                </div>
            </div>
        </div>
    );
}