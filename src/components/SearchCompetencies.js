'use strict';

import { useRouter } from 'next/dist/client/router';
import CompetencySearchResult from './cards/CompetencySearchResults';

function findParents({Competencies}){
    const parentComps = []
    
    Competencies.forEach((comp) =>{
        if (comp['parent'].length === 0)
            parentComps.push(comp);
    })

    return parentComps
}

function findChildren({Competencies}){
    const childComps = []
    
    Competencies.forEach((comp) =>{
        if (comp['parent'].length > 0)
            childComps.push(comp);
    })

    return childComps
}

function matchingChildren(parentName, {Competencies}){
    const result = []
    
    Competencies.forEach(comp =>{
        if (comp['parent'] === parentName)
            result.push(comp)
    })

    return result;
}

function generateStructure({ParentComps, ChildComps, Competencies}){
    const result = []

    ParentComps.forEach( parent => {
        const children = matchingChildren(parent['name'], {Competencies})
        result.push([parent,children]) 
    })

    return result;
}

export default function SearchCompetencies({Competencies, Name}){
    
    const router = useRouter();
    
    Competencies.sort((a,b) => a.name.localeCompare(b.name));

    const ParentComps = findParents({Competencies});
    const ChildComps = findChildren({Competencies});

    const structuredComps = generateStructure({ParentComps, ChildComps, Competencies})
    console.log('StructuredComps: ', structuredComps)

    // May need to adjust for not swapping tabs automatically
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

    return(
        <>
            <div className='mt-4'>            
                {structuredComps.map((comp) => (
                    <CompetencySearchResult result={comp} />
                ))}
            </div>
        </>
    ) 

}