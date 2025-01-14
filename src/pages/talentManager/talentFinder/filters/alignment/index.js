// "use client";

import { HomeIcon } from "@heroicons/react/24/solid";
import { WorkforceAlignmentTable } from "@/components/tables/WorkforceAlignmentTable";
import { axiosInstance } from '@/config/axiosConfig';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { vacancies } from '@/config/endpoints';
import { workRole } from '@/components/tables/WorkRoleTable';
import Button from "@/components/Button";
import DefaultLayout from "@/components/layouts/DefaultLayout";


export default function TalentFinderAlignment() {
    const router = useRouter();
    const [workRoleData, setWorkRoleData] = useState(null);

    useEffect(() => {
        axiosInstance
        .get(vacancies+workRole[0])
        .then(resp => {
            setWorkRoleData(resp.data);
        })
        .catch((err) => {
            console.log(err);
          });
    }, []);

    return (
        <DefaultLayout>
            <h2 className="flex w-5/6 text-4xl font-bold mt-8">Talent Finder</h2>
            <div className="my-3 flex flex-row">
                <a href={"/"} >
                    <HomeIcon className="w-5 mx-2"/>  
                </a>
                &gt; 
                <a href='/talentManager/talentFinder' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Talent Finder
                </a>
                &gt; 
                <a href='/talentManager/talentFinder/filters' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Filters
                </a>
                &gt;
                <p className="font-bold pl-2"> Alignment Results</p>
            </div>

            <div className='bg-white shadow-md w-1/2 p-5 w-full mb-5'> 
              <div className='pt-2 text-lg font-bold'> Discover Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600 pb-8'> Find qualified individuals at the speed of relevance. </div>

                <p className='pt-2 text-md font-bold'>Work Role: {workRoleData?.JobTitle}</p> 
                <div className='pt-2 text-gray-600 pb-8'> {workRoleData?.JobCompetencies} </div>

              <WorkforceAlignmentTable />

              <div className="flex justify-end mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                        <p className="pt-0.5"> Compare </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                        </div>
                        
                    } onClick={()=>router.push("/talentManager/talentFinder/filters/alignment/compare")}/>
                </div>
            </div>
        </DefaultLayout>
    );
}