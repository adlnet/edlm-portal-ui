'use strict';

import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useCompetencySearch} from '@/hooks/useCompetencySearch';
import CompetencySearchResult from './cards/CompetencySearchResults';
import { unstable_batchedUpdates } from 'react-dom';

// Temporary data if the ECCR is down 
import tempData from "@/public/temp_data.json" assert {type: 'json'};

// Helper function that returns all parent competencies
function findParents({Competencies}){
    const parentComps = []
    
    Competencies.forEach((comp) =>{
        if (comp['parent'].length === 0)
            parentComps.push(comp);
    })

    return parentComps
}

// Helper function that returns all child competencies
function findChildren({Competencies}){
    const childComps = []
    
    Competencies.forEach((comp) =>{
        if (comp['parent'].length > 0)
            childComps.push(comp);
    })

    return childComps
}

// Helper function that finds all children that belong to a given parent
//  and returns them as a list of competencies 
function matchingChildren(parentName, {ChildComps}){
    const result = []
    
    ChildComps.forEach(comp =>{
        if (comp['parent'] === parentName)
            result.push(comp)
    })

    return result;
}

// Helper function to assign each parent its proper list of children 
//  and return the properly structured competency tree
function generateStructure({ParentComps, ChildComps}){
    const result = []

    ParentComps.forEach( parent => {
        const children = matchingChildren(parent['name'], {ChildComps})
        result.push([parent,children]) 
    })

    return result;
}

export default function SearchCompetencies({Competencies, params, setParams}){
    
    const router = useRouter();
    
    //console.log('Params: ', params['keyword'])

    // Sort the competencies into the proper order
    Competencies.sort((a,b) => a.name.localeCompare(b.name));

    // Find all parents competencies and all child competencies 
    const ParentComps = findParents({Competencies});
    const ChildComps = findChildren({Competencies});

    // Construct the proper competency format from the arrays of parents and children
    
    //const structuredComps = generateStructure({ParentComps, ChildComps})
    //console.log('StructuredComps: ', structuredComps)

    const structuredComps = tempData;

    useEffect(() => {
        if (router?.query) {
          unstable_batchedUpdates(() => {
            setParams(router?.query);
            //setUrl(router?.query);
          });
        }
    }, [router.query]);
    
    // function handleSpecificPage(page) {
    //     const modified = { ...params };
    //     modified.p = page;
    //     unstable_batchedUpdates(() => {
    //         setParams(modified);
    //         setUrl(modified);
    //     });
    //     router.push({ pathname: '/learner/search', query: modified }, undefined, {
    //         scroll: true,
    //     });
    // } 
    
      // TODO: Search bar filtering 


    // returns a list of lists that match the search query and are chunked into
    //  pages of 10
    const compsToDisplay = useMemo(() => {
        if (structuredComps.length <= 0) return [];

        // default to empty list if params find nothing
        if (params === undefined || params['keyword'] === undefined){
            return structuredComps;
        }

        // filter the competencies by the search query 
        //  (looking at name and description of parent competency)
        const filteredComps = structuredComps?.filter((comp) => {
            return `${comp[0].name.toLowerCase()}#${comp[0].desc.toLowerCase()}`
                    .includes(params['keyword'].toLowerCase())
        });

        // if something was found in the filter return the filtered comps
        if (filteredComps?.length > 0) {
            return filteredComps;
        }
        // default to structured comps if params is empty
        else{
            return [];
        }

    }, [params]);

    // console.log('Comps to display: ', compsToDisplay)

    return(
        <>
            <div className='mt-4'>            
                {compsToDisplay.map((comp) => (
                    <CompetencySearchResult key={comp.id} result={comp} />
                ))}
            </div>
        </>
    ) 

}