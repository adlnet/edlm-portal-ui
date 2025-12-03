'use strict';

import { Spinner } from 'flowbite-react';
import { unstable_batchedUpdates } from 'react-dom';
import { useRouter } from 'next/dist/client/router';
import CompetencySearchResult from './cards/CompetencySearchResults';
import React, { useEffect, useMemo } from 'react';
import XMarkMessageToast from '@/components/cards/XMarkMessageToast';

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

export default function SearchCompetencies({Competencies, isLoading, params, setParams}){
    
    const router = useRouter();

    // Sort the competencies into the proper order
    Competencies.sort((a,b) => a.name.localeCompare(b.name));

    // Find all parents competencies and all child competencies 
    const ParentComps = findParents({Competencies});
    const ChildComps = findChildren({Competencies});

    // Construct the proper competency format from the arrays of parents and children
    const structuredComps = generateStructure({ParentComps, ChildComps})
    
    useEffect(() => {
        if (router?.query) {
          unstable_batchedUpdates(() => {
            setParams(router?.query);
          });
        }
    }, [router.query]);
    
    // returns a list of competencies that match the search query 
    const compsToDisplay = useMemo(() => {
        if (structuredComps.length <= 0) return [];

        // default to all comps if params are empty
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

        // return empty list if there are params and nothing is found
        else{
            return [];
        }
    }, [params, structuredComps]);

    if (isLoading) {
        return (
            <div className='mt-4 flex flex-col items-center justify-center py-8'>
                <Spinner color='purple' size='lg' />
                <div className='text-gray-500 mt-2'>Loading competencies...</div>
            </div>
        );
    }
        
    return ( 
        <> 
            <div className='mt-4'>      
                {compsToDisplay.map((comp) => (
                    <CompetencySearchResult key={comp.id} result={comp} />
                ))}
                {compsToDisplay.length === 0 && (
                    <div className='flex justify-center'>
                        <XMarkMessageToast message='No search results found' />
                    </div>
                )}
            </div>
        </>
    )
}
