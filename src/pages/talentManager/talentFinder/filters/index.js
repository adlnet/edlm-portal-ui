// "use client";

import { Checkbox, Label } from "flowbite-react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/router';
import Button from "@/components/Button";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import image from  "@/public/Picture1.png"


export default function TalentFinderFilters() {
    const router = useRouter();

    // const config = useConfig();

    return (
        <DefaultLayout>
            <h2 className="flex w-5/6 text-4xl font-bold mt-8">Talent Finder</h2>
            <div className="my-3 flex flex-row">
                <a href={"/talentManager"} >
                    <HomeIcon className="w-5 mx-2"/>  
                </a>
                &gt; 
                <a href='/talentManager/talentFinder' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Talent Finder
                </a>
                &gt; 
                <p className="font-bold pl-2"> Filters </p>
            </div>
            <div className='bg-white shadow-md w-1/2 p-5 w-full my-4'> 
              <div className='pt-2 text-lg font-bold'> Discover Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600'> Find qualified individuals at the speed of relevance. </div>
              <div className='bg-gray-100 p-2 my-2 rounded rounded-md px-8 mb-5'>
                <div className='pt-2 text-lg font-bold'> What are you searching for? </div>
                <div className='pt-2 text-gray-600'> Select where in the workforce you want to search for Talent. You can find Talent within your Unit and across the DoD and Civilian space.</div>
                
                <div className="flex flex-row gap-24 pl-12 py-5 overflow-x-auto">
                    <div className="flex items-center gap-2">
                        <Checkbox id="civilian" />
                        <Label htmlFor="civilian">Civilian</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="activeDuty" />
                        <Label htmlFor="activeDuty">Active Duty</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="myUnit" />
                        <Label htmlFor="myUnit">My Unit</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="location" />
                        <Label htmlFor="location">Location</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="supply" />
                        <Label htmlFor="supply">Supply</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="demand" />
                        <Label htmlFor="demand">Demand</Label>
                    </div>

                </div>
              </div>

              <div className="flex justify-end mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                        <p className="pt-0.5"> Find Talent </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                        </div>
                        
                    } onClick={()=>router.push("/talentManager/talentFinder/filters/alignment")}/>
                </div>
            </div>
        </DefaultLayout>
    );
}