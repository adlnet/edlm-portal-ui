// "use client";

import { useRouter } from 'next/router';
import Button from "@/components/Button";
import { users } from "@/components/tables/WorkforceAlignmentTable";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { HomeIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { axiosInstance } from "@/config/axiosConfig";
// import { embed_items } from "@bokeh/bokehjs/build/js/lib/embed";

export default function TalentFinderAlignment() {
    const router = useRouter();

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
            const all_json = resp.data;
            const root_id = all_json.root_id;
            const docs_json = {"4e5c17ac-4434-4401-a4ff-03ac1eb442ed":all_json.doc};
            const render_items = [{"docid":"4e5c17ac-4434-4401-a4ff-03ac1eb442ed","roots":{[root_id]:"testPlot"},"root_ids":[root_id]}];
            // embed_items(docs_json, render_items);
        }
            // embed_item(resp.data, 'testPlot')
        )
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

              <div id='testPlot' className="bk-root"></div>

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