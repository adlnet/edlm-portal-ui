// "use client";

import Image from "next/image";
import image from  "@/public/Picture1.png"
import { Checkbox, Label } from "flowbite-react";
import { WorkRoleTable } from "@/components/WorkRoleTable";
import { useRouter } from 'next/router';
import Button from "@/components/Button";


export default function TalentFinder() {
    const router = useRouter();
    // const config = useConfig();

    return (
        <div className="mx-28">
            <Image src={image} width={1400} alt='' className='rounded-lg mr-5 my-8 opacity-60'/>
            <div className='bg-white shadow-md'></div>
            <div className='bg-white shadow-md w-1/2 p-5 w-full '> 
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

              {/* <WorkRoleTable /> */}
              <WorkRoleTable />
              <div className="flex justify-end mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                        <p className="pt-0.5"> Select </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                        </div>
                        
                    } onClick={()=>router.push("/talentFinder/filters")}/>
                </div>
            </div>
        </div>
    );
}