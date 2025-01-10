// "use client";

import { Checkbox, Dropdown, Label } from "flowbite-react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { TalentTable } from "@/components/tables/TalentTable";
import { axiosInstance, axiosxapiInstance } from "@/config/axiosConfig";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { xapiUsers } from "@/config/endpoints";
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import image from  "@/public/Picture1.png"

export default function TrainingPlan() {
    const router = useRouter();

    // const config = useConfig();
    const forceFilters = ["Army", "Marine Cops", "Navy", "Air Force", "Space Force", "Coast Guard" ];

    // const myUnitFilters = [
    //     {title:"Operations Group", keys:["Operations Support", "Operations Squadrons", "Air Control SQ"]},
    //     {title:"Maintenance Group", keys:["TBD"]},
    //     {title:"Mission Support Group", keys:["TBD"]},
    //     {title:"Medical Group", keys:["TBD"]},
    // ]; 
    const myUnitFilters = [ "Operations Group", "Maintanance Group", "Mission Support", "Medical Group"]
    const savedFilters = ["Jennifer Waites"]

    const [data, setData] = useState(null);

    useEffect(() => {
        axiosxapiInstance
        .get(xapiUsers)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    return (
        <DefaultLayout>
            <h2 className="flex w-5/6 text-4xl font-bold mt-8">Training Plan</h2>
            <div className="my-4 flex flex-row">
                <a href={"/"}>
                    <HomeIcon className="w-5 mx-2"/>  
                </a>
                &gt;<p className="font-bold pl-2">  Training Plan </p>
            </div>
            
            <div className='bg-white shadow-md'></div>
            <div className='bg-white shadow-md w-1/2 p-5 w-full mb-5'> 
              <div className='pt-2 text-lg font-bold'> Analyze Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600'> Find qualified individuals at the speed of relevance. </div>
              <div className='bg-gray-100 p-2 my-2 rounded rounded-md px-8 mb-5'>
                <div className='pt-2 text-lg font-bold'> Select Talent </div>
                <div className='pt-2 text-gray-600'>Select talent either within a Force, Your Unit, or previously saved talent.</div>
                
                <div className="flex flex-row gap-32 pl-12 py-5">
                    <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">
                        <div className="p-2 bg-gray-100 transition-all ease-in duration-75 rounded-md hover:bg-opacity-50 border-2 border-white">
                        <Dropdown label="Force Filters" dismissOnClick={false} inline >
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
                        <Dropdown label="My Unit Filters" dismissOnClick={false} inline>
                            <div className="flex flex-col gap-2">
                            {myUnitFilters.map((data) => {
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

              <TalentTable talentData={data}/>
              <div className="flex justify-end mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                            <p className="pt-0.5"> Select </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                    } onClick={()=>router.push("/talentManager/trainingPlan/filters")}/>
                </div>
            </div>
        </DefaultLayout>
    );
}