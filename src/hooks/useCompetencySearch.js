'use strict';

import { useEffect, useState } from 'react';
import axios from 'axios';

const DOTE_UUID = '41b9bcc4-c455-4c80-a88d-a9511937011f';
const type = 'schema.cassproject.org.0.4.Framework'
const compSearchUrl = `https://dev-eccr.deloitteopenlxp.com/api/data/${type}/${DOTE_UUID}`

function Competency(name, desc, id, parent, children){
  this.name = name;
  this.desc = desc;
  this.id = id;
  this.parent = parent;
  this.children = children;
}

/** TODO: Change this comment
 * Hook to get search results
 * @returns the state of the url, a setter for the url, and all the attributes from the query
 */
export function useCompetencySearch() {

  // Setting up form for 
  const FormData = require('form-data');
  let data = new FormData();
  data.append('signatureSheet', '[]');
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: compSearchUrl,
    headers: {},
    data: data,
    timeout: 500
  };

  const allComps = [];

  // Setting up return data
  const [Data, setData]=useState({
    Name:'',
    Competencies:[],
  })

  let timeout=true;

  useEffect(() => {
    // Making API request
    while(timeout){
      timeout=false;
    axios.request(config)
      .then(response=>{

        // Logging request
        console.log('Response from main API: ', response)
        
        // Setting competency from response
        let compData = response.data;
        
        let relateLinks = compData.relation;
        let compLinks = compData.competency;

        for (const key in compLinks) {
          // console.log('In Loop')
          axios.get(compLinks[key])
              .then(res=>{
                  // Logging initial response 
                  //console.log('Response from CompLinks: ', res);
                  
                  let compInfo = res.data;
                  
                  let name = compInfo.name["@value"];
                  if (name === undefined){
                      name = compInfo.name;
                  }
                  let desc = compInfo.description["@value"];
                  if (desc === undefined){
                      desc = compInfo.description;
                  }

                  //console.log('compLinks[key]:  ', compLinks[key])
                  let compObj = new Competency(name, desc, compLinks[key], '', [])
                  //console.log('Comp Obj: ', compObj)
                  allComps.push(compObj)
                  
                  setData({
                    Name:compData.name["@value"],
                    Competencies:allComps, 
                  })
              })
              .catch(error=>{
                  console.log('Comp Link Error: ', error);
              }) 
        }

        for (const key in relateLinks) {
            axios.get(relateLinks[key])
              .then(res =>{
       
                // Logging initial response 
                console.log('Response from RelateLinks: ', res)

                let relateInfo = res.data

                // Finding source competency and adding it to child list of target competency
                let sourceComp = allComps.find(comp => comp.id === relateInfo.source)
                let targetComp = allComps.find(comp => comp.id === relateInfo.target)

                sourceComp.parent = targetComp.name
                targetComp.children.push(sourceComp.name)

                setData({
                  Name:compData.name["@value"],
                  Competencies:allComps, 
                })
              })
              .catch(error=>{
                console.log('Relate Error: ', error)
              })
          //}
        }
        
        setData({
          Name:compData.name["@value"],
          Competencies:allComps, 
        })

        console.log('AllComps In useCS: ', allComps)        
      })
      .catch(error=>{
        console.log(error);
        timeout=true;
        console.log('Timeout: ', timeout)
      })
    }
  },[timeout])

  return Data

}