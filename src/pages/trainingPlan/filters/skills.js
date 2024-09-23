// "use client";

import Image from "next/image";
import image from  "@/public/Picture1.png"
import { Checkbox, Label } from "flowbite-react";
import { WorkRoleTable } from "@/components/tables/WorkRoleTable";
import { useRouter } from 'next/router';
import Button from "@/components/Button";
import { WorkforceAlignmentTable } from "@/components/tables/WorkforceAlignmentTable";
import { CoursesTable } from "@/components/tables/CoursesTable";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { HomeIcon } from "@heroicons/react/outline";


export default function TrainingPlanSkills() {
    const router = useRouter();
    // const config = useConfig();

    return (
        <DefaultLayout>
            <h2 className="flex w-5/6 text-4xl font-bold mt-8">Training Plan</h2>
            <div className="my-4 flex flex-row">
                <a href={"/"}>
                    <HomeIcon className="w-5 mx-2"/>  
                </a>
                &gt;
                <a href='/trainingPlan' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Training Plan
                </a>
                &gt;
                <a href='/trainingPlan/filters' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Filters
                </a>
                &gt; 
                <p className="font-bold pl-2"> Skills Results </p>
            </div>
            <div className='bg-white shadow-md w-1/2 p-5 w-full '> 
              <div className='pt-2 text-lg font-bold'> Discover Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600'> Find qualified individuals at the speed of relevance. </div>
              <div className='flex flex-row bg-gray-100 p-2 my-2 rounded rounded-md px-8 mb-5 justify-between'>
                <div className="flex flex-col">
                    <div className='pt-2 text-lg font-bold'> INFOSEC Manager</div>
                    <div className='pt-2 text-gray-600'>Knowledge of encrypted algorithms.</div>
                </div>
                
                <Button className='h-6' onClick={()=> router.push("https://dev-eccr.deloitteopenlxp.com/#/framework")}>KSAT Details</Button>
              </div>

              <CoursesTable />

              <div className="flex justify-end mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                        <p className="pt-0.5"> Add to Plan </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                        </div>
                        
                    } onClick={()=>router.push("/")}/>
                </div>
            </div>
        </DefaultLayout>
    );
}