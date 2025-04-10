'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import backupData from '@/public/backup_competencies.json';

const DOTE_UUID = 'a1bcb9dd-c455-417c-bcbe-3073a9593113';
const type = 'schema.cassproject.org.0.4.Framework'
const compSearchUrl = `/api/data/${type}/${DOTE_UUID}`

// Competency Object created to hold all necessary competency variables 
function Competency(name, desc, id, parent, children){
  this.name = name;
  this.desc = desc;
  this.id = id;
  this.parent = parent;
  this.children = children;
}

// // Helper function to assign parent and children values 
// //  based on the relationship links
function getRelateLinks(relateLinks, competencies){

  // Creating the result to return with a starting value of the current competencies
  const result = competencies;

  // Looping through every Relation Link to assign parent and children
  //  values to the competencies
  for (const key in relateLinks) {
      axios.get(relateLinks[key])
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
  }

  return result
}

// Helper function that gets all the competency objects from the ECCR and 
//  then sends them to getRelateLinks for proper parent and children assignments.
//  Returns 
function getCompData(compLinks){

  const result = []

  // Function to fetch data from all the competency links and return once 
  //  all axios requests have completed
  const fetchData = async() => {
    for (const key in compLinks) {
      await axios.get(compLinks[key])
          .then(res=>{

              let compInfo = res.data;

              let name = compInfo.name["@value"];
              if (name === undefined){
                  name = compInfo.name;
              }
              let desc = compInfo.description["@value"];
              if (desc === undefined){
                  desc = compInfo.description;
              }

              let compObj = new Competency(name, desc, compLinks[key], '', [])
              result.push(compObj)
      
          })
          .catch(error=>{
              console.log('Comp Link Error: ', error);
          }) 
    } 
    return result
  };

  return fetchData();
}

/** 
 * Hook to get the competency results
 * @returns all competencies from the DOT&E Framework defined in the Dev-ECCR
 */

export function useCompetencySearch() {

  // // Setting up form data for API call
  const FormData = require('form-data');
  let data = new FormData();
  data.append('signatureSheet', '[]');
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: compSearchUrl,
    headers: {},
    data: data,
    timeout: 510,
    retryAfter: 500
  };

  // Setting up return data
  const [Data, setData]=useState({
    Name:'',
    Competencies:[]
  })

  axiosRetry(axiosInstance, { 
    retries: 5, 
    shouldResetTimeout: true
  });

  useEffect(() => {
    // Making API request
      axios.request(config)
        .then(response=>{

          // Setting competency from response
          let compData = response.data;
          
          let relateLinks = compData.relation;
          let compLinks = compData.competency;

          getCompData(compLinks)
            .then( res => {
              const allRelateData = getRelateLinks(relateLinks, res)

              setData({
                Name:compData.name["@value"],
                Competencies: allRelateData
              }) 
            })

        })
        .catch(error=>{
          console.log('Error on initial API request - using backup data: ', error)
          setData({
            Competencies: backupData
          })
        })
  },[])

  return Data.Competencies
}