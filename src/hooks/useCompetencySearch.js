'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { compSearchUrl } from '@/config/endpoints';
import { oneHour } from '@/config/timeConstants';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import backupData from '@/public/backup_competencies.json';

// Competency Object created to hold all necessary competency variables 
const Competency = (name, desc, id, parent, children) => ({
  name,
  desc,
  id,
  parent,
  children
});

// To go through nextjs.proxy
function proxyUrl(url) {
  const urlObj = new URL(url);
  const path = urlObj.pathname;

  return `/edlm-portal/${path}`;
}

// // Helper function to assign parent and children values 
// //  based on the relationship links
async function getRelateLinks(relateLinks, competencies){

  // Creating the result to return with a starting value of the current competencies
  const result = [...competencies];
  const relationPromises = [];

  // Looping through every Relation Link to assign parent and children
  //  values to the competencies
  for (const key in relateLinks) {
    const promise = axios.get(proxyUrl(relateLinks[key]))
        .then(res =>{
          
          // Response information
          let relateInfo = res.data

          // Finding source competency and target competency from the allComps array
          let sourceComp = result.find(comp => comp.id.startsWith(relateInfo.source))
          let targetComp = result.find(comp => comp.id.startsWith(relateInfo.target))

          sourceComp.parent = targetComp.name
          targetComp.children.push(sourceComp.name)
        })
        .catch(error=>{
          console.log('Relate Error: ', error)
        })
        relationPromises.push(promise);
  }

  await Promise.all(relationPromises);
  return result
}

// Helper function that gets all the competency objects from the ECCR and 
//  then sends them to getRelateLinks for proper parent and children assignments.
//  Returns 
async function getCompData(compLinks){

  const result = []
  const fetchPromises = [];

  // Function to fetch data from all the competency links and return once 
  //  all axios requests have completed
  const fetchData = async() => {
    for (const key in compLinks) {
      const promise = axios.get(proxyUrl(compLinks[key]))
          .then(res=>{

              const compInfo = res.data;

              let name = compInfo.name["@value"];
              if (name === undefined){
                  name = compInfo.name;
              }
              let desc = compInfo.description["@value"];
              if (desc === undefined){
                  desc = compInfo.description;
              }

              const compObj = Competency(name, desc, compLinks[key], '', [])
              result.push(compObj)
      
          })
          .catch(error=>{
              console.log('Comp Link Error: ', error);
          }) 
    } 
    fetchPromises.push(promise);
  };
  await Promise.all(fetchPromises);
  return fetchData();
}

// Hekper function to fetch competency data
async function getCompetencySearch() {

  // Setting up form data for API call
  const FormData = require('form-data');
  const data = new FormData();
  data.append('signatureSheet', '[]');
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: compSearchUrl,
    headers: {},
    data: data,
    timeout: 510,
    retryAfter: 500
  };

  axiosRetry(axiosInstance, { 
    retries: 5, 
    shouldResetTimeout: true
  });

   try {
    const response = await axios.request(config);
    const compData = response.data;
    
    const relateLinks = compData.relation;
    const compLinks = compData.competency;
    
    const competencyObjects = await getCompData(compLinks);
    const competenciesWithRelations = await getRelateLinks(relateLinks, competencyObjects);
    
    return {
      Name: compData.name?.["@value"] || "",
      Competencies: competenciesWithRelations
    };
  } catch (error) {
      console.log('Error on initial API request - using backup data: ', error)
      return {
        Competencies: backupData
    }
  };
};

/** 
 * Hook to get the competency results
 * @returns all competencies from the DOT&E Framework defined in the ECCR
 */
export function useCompetencySearch() {
  const { data, isLoading, error } = useQuery('competencies', getCompetencySearch, {
    staleTime: oneHour,
    cacheTime: oneHour,
  });
  
  return data?.Competencies || [];
}