// "use client";

import Image from "next/image";
import image from  "@/public/Picture1.png"
import { Checkbox, Label } from "flowbite-react";
import { WorkRoleTable } from "@/components/tables/WorkRoleTable";
import { useRouter } from 'next/router';
import Button from "@/components/Button";
import { WorkforceAlignmentTable } from "@/components/tables/WorkforceAlignmentTable";


export default function TalentFinderAlignment() {
    const router = useRouter();
    // const config = useConfig();

    return (
        <div className="mx-28">
            <h2 className="flex h-48 w-5/6 items-center text-3xl font-bold text-white justify-center absolute z-10">Talent Finder</h2>
            <Image src={image} width={1400} alt='' className='rounded-lg mr-5 mt-8 opacity-60'/>
            <p className="my-4">
                Talent Finder - Filters - Alignment
            </p>
            <div className='bg-white shadow-md w-1/2 p-5 w-full '> 
              <div className='pt-2 text-lg font-bold'> Discover Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600'> Find qualified individuals at the speed of relevance. </div>
              <div className='bg-gray-100 p-2 my-2 rounded rounded-md px-8 mb-5'>
                <div className='pt-2 text-lg font-bold'> What are you searching for? </div>
                <div className='pt-2 text-gray-600'> Select where in the workforce you want to search for Talent. You can find Talent within your Unit and across the DoD and Civilian space.</div>
              </div>

              <WorkforceAlignmentTable />

              <div className="flex justify-end mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                        <p className="pt-0.5"> Compare </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                        </div>
                        
                    } onClick={()=>router.push("/talentFinder/filters/alignment")}/>
                </div>
            </div>
        </div>
    );
}