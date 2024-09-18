// "use client";

import Image from "next/image";
import image from  "@/public/Picture1.png"
import { useRouter } from 'next/router';
import Button from "@/components/Button";
import { WorkforceAlignmentTable } from "@/components/tables/WorkforceAlignmentTable";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { HomeIcon } from "@heroicons/react/outline";
import { backendHost, graph } from '@/config/endpoints';
import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axiosConfig";

export default function TalentFinderAlignment() {
    const router = useRouter();
    // const config = useConfig();
    const [data, setData] = useState(null);


    useEffect(() => {
        axiosInstance
        .get(graph)
        .then((res) => {
          setData(res.data);
        })
        .then(resp =>
            window.Bokeh.embed.embed_item(resp.data, 'testPlot'))
        .catch((err) => {
          console.log(err);
        });
    }, []);

    // let handlePlot1 = () => {
    //     axiosInstance.get(graph)
    //         .then(resp => 
    //         window.Bokeh.embed.embed_item(resp.data, 'testPlot')
    //     )
    // }

    return (
        <DefaultLayout>
            <h2 className="flex w-5/6 text-4xl font-bold mt-8">Talent Finder</h2>
            <div className="my-3 flex flex-row">
                <a href={"/"} >
                    <HomeIcon className="w-5 mx-2"/>  
                </a>
                &gt; 
                <a href='/talentFinder' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Talent Finder
                </a>
                &gt; 
                <a href='/talentFinder/filters' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Filters
                </a>
                &gt;
                <a href='/talentFinder/filters/alignment' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Alignment Results
                </a>
                &gt; 
                <p className="font-bold pl-2"> Compare Results</p>
            </div>

            <div className='bg-white shadow-md w-1/2 p-5 w-full mb-5'> 
              <div className='pt-2 text-lg font-bold'> Compare Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600 pb-8'> Compare qualified individuals at the speed of relevance. </div>



              {/* <div>
                {Bokeh.embed.embed_item(item)}
              </div> */}
              <div id='testPlot' className="bk-root"></div>

              {/* <Button 
                    variant="contained"
                    style={{margin: 10}} 
                    color="primary"
                    onClick={handlePlot1()}
                >
                        Get Plot 1 
                </Button>
            <div id='testPlot' className="bk-root"></div> */}



              <div className="flex justify-end mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                        <p className="pt-0.5"> Compare </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                        </div>
                        
                    } onClick={()=>router.push("/trainingPlan")}/>
                </div>
            </div>
        </DefaultLayout>
    );
}