// "use client";

import { CoursesTable } from "@/components/tables/CoursesTable";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/router';
import Button from "@/components/Button";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Link from "next/link";

export default function TrainingPlanSkills() {
    const router = useRouter();

    return (
        <DefaultLayout>
            <h2 className="flex w-5/6 text-4xl font-bold mt-8">Training Plan</h2>
            <div className="my-4 flex flex-row">
                <Link href={"/talentManager"} passHref>
                    <HomeIcon className="w-5 mx-2"/>  
                </Link>
                &gt;
                <Link href='/talentManager/trainingPlan' passHref className="px-2 hover:mouse hover:underline hover:font-bold">
                    Training Plan
                </Link>
                &gt;
                <Link href='/talentManager/trainingPlan/filters' passHref className="px-2 hover:mouse hover:underline hover:font-bold">
                    Filters
                </Link>
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
                
                <Button className='h-6' onClick={()=> router.push("https://dev-eccr.deloitteopenlxp.com/#/framework?frameworkId=https://dev-eccr.deloitteopenlxp.com/api/data/schema.cassproject.org.0.4.Framework/8186e8b1-c455-4ccb-b9df-ffe7745d809d")}>KSAT Details</Button>
              </div>

              <CoursesTable />

              <div className="flex justify-end mt-8">
                    <Button onClick={()=>router.push('/edlm-portal')}>
                        <div className="flex flex-row gap-2">  
                            <p className="pt-0.5"> Add to Plan </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                    </Button>
                </div>
            </div>
        </DefaultLayout>
    );
}