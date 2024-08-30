// "use client";

import Image from "next/image";
import image from  "@/public/Picture1.png"
import { Checkbox, Label } from "flowbite-react";
import { WorkRoleTable } from "@/components/tables/WorkRoleTable";
import { useRouter } from 'next/router';
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";
import DefaultLayout from "@/components/layouts/DefaultLayout";


export default function TalentFinderFilters() {
    const router = useRouter();
    // const config = useConfig();

    const workforceElementFilters = ["TBD"]
    const NISTFilters = ["TBD"]
    const forceFilters = ["Army", "Marine Cops", "Navy", "Air Force", "Space Force", "Coast Guard" ];
    const vacanciesFilters = ["My Units", "All Units"]
    const savedFilters = ["COSMEC Manager"]

    return (
        <DefaultLayout>
            <h2 className="flex h-48 w-5/6 items-center text-3xl font-bold text-white justify-center absolute z-10">Training Plan</h2>
            <Image src={image} width={1400} alt='' className='rounded-lg mr-5 mt-8 opacity-60'/>
            <p className="my-4">
                Training Plan - Filters
            </p>
            <div className='bg-white shadow-md w-1/2 p-5 w-full '> 
              <div className='pt-2 text-lg font-bold'> Discover Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600'> Find qualified individuals at the speed of relevance. </div>
              <div className='bg-gray-100 p-2 my-2 rounded rounded-md px-8 mb-5'>
                <div className='pt-2 text-lg font-bold'> What are you searching for? </div>
                <div className='pt-2 text-gray-600'> Select where in the workforce you want to search for Talent. You can find Talent within your Unit and across the DoD and Civilian space.</div>
                
                <div className="flex flex-row gap-16 py-5">
                    <Accordion 
                        acctitle='Workforce Element'
                        accdescription={                   
                        <div className="flex flex-col gap-2">
                        {workforceElementFilters.map((data) => {
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
                        acctitle='NIST'
                        accdescription={                   
                        <div className="flex flex-col gap-2">
                        {NISTFilters.map((data) => {
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
                    acctitle='Vacancies'
                    accdescription={                   
                    <div className="flex flex-col gap-2">
                    {vacanciesFilters.map((data) => {
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

              <div className="flex justify-end mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                        <p className="pt-0.5"> Find Talent </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                        </div>
                        
                    } onClick={()=>router.push("/trainingPlan/filters/skills")}/>
                </div>
            </div>
        </DefaultLayout>
    );
}