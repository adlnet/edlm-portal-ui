// "use client";

import { Checkbox, Label } from "flowbite-react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { WorkRoleTable } from "@/components/tables/WorkRoleTable";
import { axiosInstance } from "@/config/axiosConfig";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { vacancies } from "@/config/endpoints";
import Button from "@/components/Button";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function TalentFinder() {
    const router = useRouter();

    const [data, setData] = useState(null);

    useEffect(() => {
        axiosInstance
        .get(vacancies)
        .then((res) => {
          setData(res.data);
        })
        .then(resp =>
            window.Bokeh.embed.embed_item(resp.data, 'testPlot'))
        .catch((err) => {
          console.log(err);
        });
    }, []);

    return (
        <DefaultLayout> 
            <h2 className="flex w-5/6 text-4xl font-bold mt-8">Talent Finder</h2>
            <div className="my-3 flex flex-row">
                <a href={"/talentManager"}>
                    <HomeIcon className="w-5 mx-2"/>  
                </a>
                &gt;<p className="font-bold pl-2">  Talent Finder </p>
            </div>

            <div className='bg-white shadow-md my-4'></div>
            <div className='bg-white shadow-md w-1/2 p-5 w-full mb-5'> 
              <div className='pt-2 text-lg font-bold'> Discover Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600'> Find qualified individuals at the speed of relevance. </div>
              <div className='bg-gray-100 p-2 my-2 rounded rounded-md px-8 mb-5'>
                <div className='pt-2 text-lg font-bold'> What are you searching for? </div>
                <div className='pt-2 text-gray-600'> Select either a Work Role, or Competency you want to find Talent for. Selecting ‘Supply’ provides the existing Talent base, and selecting ‘Demand’ provides potential Talent who can be up-skilled to meet the selected Work Role or Competency requirements.</div>
                
                <div className="flex flex-row gap-32 pl-12 py-5">
                    <div className="flex items-center gap-2">
                        <Checkbox id="workRole" />
                        <Label htmlFor="workRole">Work Role</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="competencies" />
                        <Label htmlFor="competencies">Competencies</Label>
                    </div>
                </div>
              </div>

              <WorkRoleTable data={data}/>
              <div className="flex justify-end mt-8">
                    <Button onClick={()=> router.push("/talentManager/talentFinder/filters")}>
                        <div className="flex flex-row gap-2">  
                            <p className="pt-0.5"> Select </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>g
                        </div>                
                    </Button>
                {/* </Link> */}
                </div>
            </div>
        </DefaultLayout>
    );
}