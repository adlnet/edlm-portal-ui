// "use client";

import { HomeIcon } from "@heroicons/react/24/solid";
import { axiosInstance } from "@/config/axiosConfig";
import { candidateList, vacancies } from '@/config/endpoints';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { users } from "@/components/tables/WorkforceAlignmentTable";
import { workRole } from '@/components/tables/WorkRoleTable';
import Button from "@/components/Button";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Link from 'next/link';

export default function TalentFinderAlignment() {
    const router = useRouter();
    const [iframeURL, setIframeURL] = useState("https://edlmportal-admin.deloitteopenlxp.com");
    const [workRoleData, setWorkRoleData] = useState(null);

    useEffect(() => {
        axiosInstance
        .get("https://edlmportal-admin.deloitteopenlxp.com/api/graph/?users="+users.join("&users="))
        .then(resp => {

            setIframeURL("https://edlmportal-admin.deloitteopenlxp.com" + resp.data);

        }

        )
        .catch((err) => {
          console.log(err);
        });
    }, []);

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

    const handleClick=(e)=>{
        e.preventDefault();
        axiosInstance
            .post(candidateList, {
                name: workRoleData.JobTitle,
                role: workRoleData.vacancy_key,
            })
            .catch((err) => {
                console.log(err);
            })
        router.push('/edlm-portal')
    }

    return (
        <DefaultLayout>
            <h2 className="flex w-5/6 text-4xl font-bold mt-8">Talent Finder</h2>
            <div className="my-3 flex flex-row">
                <Link href={"/talentManager"} passHref >
                    <HomeIcon className="w-5 mx-2"/>  
                </Link>
                &gt; 
                <Link href='/talentManager/talentFinder' passHref className="px-2 hover:mouse hover:underline hover:font-bold">
                    Talent Finder
                </Link>
                &gt; 
                <Link href='/talentManager/talentFinder/filters' passHref className="px-2 hover:mouse hover:underline hover:font-bold">
                    Filters
                </Link>
                &gt;
                <Link href='/talentManager/talentFinder/filters/alignment' passHref className="px-2 hover:mouse hover:underline hover:font-bold">
                    Alignment Results
                </Link>
                &gt; 
                <p className="font-bold pl-2"> Compare Results</p>
            </div>

            <div className='bg-white shadow-md w-1/2 p-5 w-full mb-5'> 
              <div className='pt-2 text-lg font-bold'> Compare Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600 pb-8'> Compare qualified individuals at the speed of relevance. </div>

              <div id='testPlot' className="flex justify-center"><iframe title="iFrame Title" src={iframeURL} height={600} width={600}></iframe></div>

              <div className="flex justify-between gap-4 mt-8">
                    <Button onClick={handleClick}>
                        <div className="flex flex-row gap-2">  
                            <p className="pt-0.5"> Save Results </p>
                        </div> 
                    </Button>
                    <Button onClick={()=>router.push("/trainingPlan")}> 
                        <div className="flex flex-row gap-2">  
                            <p className="pt-0.5"> Go to Planning </p>
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