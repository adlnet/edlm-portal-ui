// "use client";

import Image from "next/image";
import image from  "@/public/Picture1.png"
import { WorkRoleTable } from "@/components/tables/WorkRoleTable";
import { useRouter } from 'next/router';
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Checkbox, Dropdown, Label } from "flowbite-react";
import { HomeIcon } from "@heroicons/react/outline";

export default function TalentFinderFilters() {
    const router = useRouter();
    // const config = useConfig();

    const workforceElementFilters = ["Program Manager (Cybersecurity)", "Technical Support (Cybersecurity)", "Information Systems Security Manager (Cybersecurity)", "Communications Security (COMSEC) Manager (Cybersecurity)", "System Testing and Evaluation Specialist (Cybersecurity)"]
    const NISTFilters = ["TBD"]
    const forceFilters = ["Army", "Marine Cops", "Navy", "Air Force", "Space Force", "Coast Guard" ];
    const vacanciesFilters = ["My Units", "All Units"]
    const savedFilters = ["INFOSEC Manager"]

    return (
        <DefaultLayout>
            <h2 className="flex w-5/6 text-4xl font-bold mt-8">Training Plan</h2>
            <div className="my-4 flex flex-row">
                <a href={"/"}>
                    <HomeIcon className="w-5 mx-2"/>  
                </a>
                &gt;
                <a href='/talentManager/trainingPlan' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Training Plan
                </a>
                &gt; 
                <p className="font-bold pl-2"> Filters </p>
            </div>

            <div className='bg-white shadow-md w-1/2 p-5 w-full '> 
              <div className='pt-2 text-lg font-bold'> Discover Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600'> Find qualified individuals at the speed of relevance. </div>
              <div className='bg-gray-100 p-2 my-2 rounded rounded-md px-8 mb-5'>
                <div className='pt-2 text-lg font-bold'> What are you searching for? </div>
                <div className='pt-2 text-gray-600'> Select where in the workforce you want to search for Talent. You can find Talent within your Unit and across the DoD and Civilian space.</div>
                
                <div className="flex flex-row gap-16 py-5">
                    

                <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">
                    <div className="p-2 bg-gray-100 transition-all ease-in duration-75 rounded-md hover:bg-opacity-50 border-2 border-white">
                        <Dropdown label="Workforce Element Filters" dismissOnClick={false} inline>
                            <div className="flex flex-col gap-2">
                            {workforceElementFilters.map((data) => {
                                return (<Dropdown.Item> 
                                <div className="flex items-center gap-2 ml-1">
                                    <Checkbox id={data} />
                                    <Label htmlFor={data}>{data}</Label>
                                </div>
                                </Dropdown.Item> 
                                )
                            })}
                            </div>
                        </Dropdown>
                    </div>
                </div>

                <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">
                    <div className="p-2 bg-gray-100 transition-all ease-in duration-75 rounded-md hover:bg-opacity-50 border-2 border-white">
                        <Dropdown label="Job Category" dismissOnClick={false} inline>
                            <div className="flex flex-col gap-2">
                            {NISTFilters.map((data) => {
                                return (<Dropdown.Item> 
                                <div className="flex items-center gap-2 ml-1">
                                    <Checkbox id={data} />
                                    <Label htmlFor={data}>{data}</Label>
                                </div>
                                </Dropdown.Item> 
                                )
                            })}
                            </div>
                        </Dropdown>
                    </div>
                </div>
                   

                <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">
                    <div className="p-2 bg-gray-100 transition-all ease-in duration-75 rounded-md hover:bg-opacity-50 border-2 border-white">
                        <Dropdown label="Force Filters" dismissOnClick={false} inline>
                            <div className="flex flex-col gap-2">
                            {forceFilters.map((data) => {
                                return (<Dropdown.Item> 
                                <div className="flex items-center gap-2 ml-1">
                                    <Checkbox id={data} />
                                    <Label htmlFor={data}>{data}</Label>
                                </div>
                                </Dropdown.Item> 
                                )
                            })}
                            </div>
                        </Dropdown>
                    </div>
                </div>
                    

                <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">
                    <div className="p-2 bg-gray-100 transition-all ease-in duration-75 rounded-md hover:bg-opacity-50 border-2 border-white">
                        <Dropdown label="Vacancies Filters" dismissOnClick={false} inline>
                            <div className="flex flex-col gap-2">
                            {vacanciesFilters.map((data) => {
                                return (<Dropdown.Item> 
                                <div className="flex items-center gap-2 ml-1">
                                    <Checkbox id={data} />
                                    <Label htmlFor={data}>{data}</Label>
                                </div>
                                </Dropdown.Item> 
                                )
                            })}
                            </div>
                        </Dropdown>
                    </div>
                </div>
                    
                <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">
                    <div className="p-2 bg-gray-100 transition-all ease-in duration-75 rounded-md hover:bg-opacity-50 border-2 border-white">
                        <Dropdown label="Saved Filters" dismissOnClick={false} inline>
                            <div className="flex flex-col gap-2">
                            {savedFilters.map((data) => {
                                return (<Dropdown.Item> 
                                <div className="flex items-center gap-2 ml-1">
                                    <Checkbox id={data} />
                                    <Label htmlFor={data}>{data}</Label>
                                </div>
                                </Dropdown.Item> 
                                )
                            })}
                            </div>
                        </Dropdown>
                    </div>
                </div>
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
                        
                    } onClick={()=>router.push("/talentManager/trainingPlan/filters/skills")}/>
                </div>
            </div>
        </DefaultLayout>
    );
}