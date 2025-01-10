// "use client";

import { HomeIcon } from "@heroicons/react/24/solid";
import { axiosInstance } from "@/config/axiosConfig";
import { backendHost, candidateList, graph, vacancies } from '@/config/endpoints';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { users } from "@/components/tables/WorkforceAlignmentTable";
import Button from "@/components/Button";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from 'next/image';
import graphImage from '@/public/pregenplot.png';

// import { embed_item, embed_items } from "@bokeh/bokehjs/build/js/lib/embed";
// import { safely } from "@bokeh/bokehjs";
import { workRole } from '@/components/tables/WorkRoleTable';

export default function TalentFinderAlignment() {
    const router = useRouter();
    const [iframeURL, setIframeURL] = useState("https://edlmportal-admin.deloitteopenlxp.com");
    const [workRoleData, setWorkRoleData] = useState(null);

    useEffect(() => {
        axiosInstance
        .get("https://edlmportal-admin.deloitteopenlxp.com/api/graph/?users="+users.join("&users="))
        .then(resp => {
            // safely(function() {
            //     (function(root) {
            //       function embed_document(root) {
            //       const docs_json = {"4e5c17ac-4434-4401-a4ff-03ac1eb442ed":resp.data};
            //       const render_items = [{"docid":"4e5c17ac-4434-4401-a4ff-03ac1eb442ed","roots":{"p1004":"testPlot"},"root_ids":["p1004"]}];
            //       root.Bokeh.embed.embed_items(docs_json, render_items);
            //       }
            //       if (root.Bokeh !== undefined) {
            //         embed_document(root);
            //       } else {
            //         let attempts = 0;
            //         const timer = setInterval(function(root) {
            //           if (root.Bokeh !== undefined) {
            //             clearInterval(timer);
            //             embed_document(root);
            //           } else {
            //             attempts++;
            //             if (attempts > 100) {
            //               clearInterval(timer);
            //               console.log("Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing");
            //             }
            //           }
            //         }, 10, root)
            //       }
            //     })(window);
            //   });
            setIframeURL("https://edlmportal-admin.deloitteopenlxp.com" + resp.data);

            // const root_id = all_json.root_id;
            // const docs_json = {"4e5c17ac-4434-4401-a4ff-03ac1eb442ed":all_json.doc};
            // const render_items = [{"docid":"4e5c17ac-4434-4401-a4ff-03ac1eb442ed","roots":{[root_id]:"testPlot"},"root_ids":[root_id]}];
            // embed_items(docs_json, render_items);
        }

            // embed_item(resp.data, 'testPlot')
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
        router.push("/")
    }

    // const history = useRouter();
    // console.log(history);

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
                <a href='/talentManager/talentFinder/filters' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Filters
                </a>
                &gt;
                <a href='/talentManager/talentFinder/filters/alignment' className="px-2 hover:mouse hover:underline hover:font-bold">
                    Alignment Results
                </a>
                &gt; 
                <p className="font-bold pl-2"> Compare Results</p>
            </div>

            <div className='bg-white shadow-md w-1/2 p-5 w-full mb-5'> 
              <div className='pt-2 text-lg font-bold'> Compare Talent Across the Workforce </div>
              <div className='pt-2 text-gray-600 pb-8'> Compare qualified individuals at the speed of relevance. </div>

              <div id='testPlot' className="flex justify-center"><iframe src={iframeURL} height={600} width={600}></iframe></div>
                {/* <div className='flex justify-center'>
                    <Image src={graphImage} height={500} alt='' className='m-5 '/>
                </div> */}

              <div className="flex justify-between gap-4 mt-8">
                    <Button children={
                        <div className="flex flex-row gap-2">  
                        <p className="pt-0.5"> Save Results </p>
                        </div>
                        
                    } onClick={handleClick}/>
                    <Button children={
                        <div className="flex flex-row gap-2">  
                        <p className="pt-0.5"> Go to Planning </p>
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