import { axiosInstance } from "@/config/axiosConfig";
import { Checkbox, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { courseData } from "@/config/endpoints";
import axios from "axios";
import Link from 'next/link';

export function CoursesTable() {
    const [data, setData] = useState(null);
    const [compData, setCompData] = useState([]);

    const tempData = [
        // {courseName: 'Managing Network Security', competenciesAllignedTo: ["Knowledge of Payment Card Industry (PCI) data security standards.", "Knowledge of Personally Identifiable Information (PII) data security standards.", "Knowledge of Personal Health Information (PHI) data security standards."], 
        //     competencyAlignment: "100%", aligmentPercent: "100%", instance: "Spring 2024", startEnd: "08 March 2024 - 03 May 2024", availableSeats: "50", location: "Richmond, Virginia"},
        {courseName: 'Managing Network Security', competenciesAllignedTo: ["Knowledge of the operations and processes for incident, problem, and event management.", "Knowledge of procedures used for documenting and querying reported incidents, problems, and events.", "Skill to design incident response for cloud service models.", "Ability to accurately define incidents, problems, and events in the trouble ticketing system."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Fall 2020", startEnd: "Sept 16, 2020 to Nov 20, 2020", availableSeats: "50", location: "Richmond, Virginia"},
        {courseName: 'Penetration Testing, Incident Response and Forensics', competenciesAllignedTo: ["Knowledge of how information needs and collection requirements are translated, tracked, and prioritized across the extended enterprise.[K0120]", "Skill to translate, track, and prioritize information needs and intelligence collection requirements across the extended enterprise. [S0372]"], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Fall 2021", startEnd: "Sept 18, 2021 to Nov 22, 2021", availableSeats: "50", location: "Richmond, Virginia"},
        {courseName: 'Tools of the Trade: Linux and SQL', competenciesAllignedTo: ["Knowledge of server administration and systems engineering theories, concepts, and methods.", "Knowledge of system software and organizational design standards, policies, and authorized  approaches relating to system design.", "Knowledge of system life cycle management principles, including software security and usability.", "Knowledge of technology integration processes."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Spring 2021", startEnd: "Jan 4, 2021 to March 27, 2021", availableSeats: "50", location: "Richmond, Virginia"},
        {courseName: 'Assets, Threats, and Vulnerabilities', competenciesAllignedTo: ["Knowledge of how information needs and collection requirements are translated, tracked, and prioritized across the extended enterprise.[K0120]", "Skill to translate, track, and prioritize information needs and intelligence collection requirements across the extended enterprise. [S0372]"], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "", startEnd: "Jan 6, 2022 to March 27, 2022", availableSeats: "50", location: "Richmond, Virginia"},
        {courseName: 'Put It to Work: Prepare for Cybersecurity Jobs', competenciesAllignedTo: ["Knowledge of server administration and systems engineering theories, concepts, and methods.", "Knowledge of system software and organizational design standards, policies, and authorized  approaches relating to system design.", "Knowledge of system life cycle management principles, including software security and usability.", "Knowledge of technology integration processes."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "", startEnd: "Jan 5, 2020 to March 28, 2020", availableSeats: "50", location: "Richmond, Virginia"},
        {courseName: 'Road to the CISO – Culminating Project Course', competenciesAllignedTo: ["Knowledge of the operations and processes for incident, problem, and event management.", "Knowledge of procedures used for documenting and querying reported incidents, problems, and events.", "Skill to design incident response for cloud service models.", "Ability to accurately define incidents, problems, and events in the trouble ticketing system."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Fall 2021", startEnd: "Sept 18, 2021 to Nov 22, 2021", availableSeats: "50", location: "Richmond, Virginia"},
        {courseName: 'Cyber Threat Intelligence', competenciesAllignedTo: ["Knowledge of the operations and processes for incident, problem, and event management.", "Knowledge of procedures used for documenting and querying reported incidents, problems, and events.", "Skill to design incident response for cloud service models.", "Ability to accurately define incidents, problems, and events in the trouble ticketing system."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Spring 2020", startEnd: "Jan 5, 2020 to March 28, 2020", availableSeats: "50", location: "Richmond, Virginia"},
    
    // {courseName: '', competenciesAllignedTo: [""], 
        //     competencyAlignment: "100%", aligmentPercent: "100%", instance: "", startEnd: "", availableSeats: "50", location: "Richmond, Virginia"},
        ];

    useEffect(() => {
        axiosInstance
        .get(courseData)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    // const competencies = [
    // "https://dev-eccr.deloitteopenlxp.com/api/data/schema.cassproject.org.0.4.Competency/ab191bd6-c455-4970-a648-a7d5cf1f5038",
    // "https://dev-eccr.deloitteopenlxp.com/api/data/schema.cassproject.org.0.4.Competency/542b43c7-c455-440e-a9bb-de9438130feb",
    // "https://dev-eccr.deloitteopenlxp.com/api/data/schema.cassproject.org.0.4.Competency/5b67a449-c455-4f07-b534-576e3063fdae",
    // "https://dev-eccr.deloitteopenlxp.com/api/data/schema.cassproject.org.0.4.Competency/cde3547c-c455-4cb5-8ccf-b59ea9a0d03d",
    // ];

    // function handlComp (competencies, setCompData) {
    //     competencies.map((data) => {
    //         axios.get(data).then((res) => {
    //             this.setCompData(previousState => ({
    //                 myArray: [...previousState.myArray, res.data.description]
    //             }));
    //             console.log(res.data.description);
    //         })
    //         console.log(compData);
    //         return (
    //             <></>
    //         )
    //     })
    // }

  return (
    <>
    <div class="mx-auto max-w-screen-xl">
        {/* <!-- Start coding here --> */}
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
                    </form>
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <div class="flex items-center space-x-3 w-full md:w-auto">
                        <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">                        
                            <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                                Actions
                            </button>
                        </div>

                        <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                <li>
                                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                            </div>
                        </div>

                        <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">                        
                            <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                </svg>
                                Filter
                                <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div>
                        <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                            <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                <li class="flex items-center">
                                    <input id="apple" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="fitbit" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="razor" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="razor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="nikon" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="nikon" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="benq" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label for="benq" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3"> </th>
                            <th scope="col" class="px-4 py-3">Course Name</th>
                            <th scope="col" class="px-4 py-3">Competencies Alligned to </th>
                            <th scope="col" class="px-4 py-3">Competency Alignment</th>
                            <th scope="col" class="px-4 py-3">Aligment Percent</th>
                            {/* <th scope="col" class="px-4 py-3">Instance</th> */}
                            <th scope="col" class="px-4 py-3">Start/End</th>
                            <th scope="col" class="px-4 py-3">Available Seats</th>
                            <th scope="col" class="px-4 py-3 w-8">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.hits.map((data) => {
                        // {tempData.map((data) => {
                            return (
                                <tr class=" border-b dark:border-gray-700">
                                    <div className="flex h-full items-center align-center justify-center gap-2 ml-6 py-3 h-64 ">
                                        <Checkbox id={data.Course.CourseTitle} />
                                        <Label htmlFor={data.Course.CourseTitle}></Label>
                                    </div>
                                    <td class="px-4 py-3">
                                        <Link href={`https://dev-xds.deloitteopenlxp.com/learner/course/${data.meta.id}`}>
                                        {data.Course.CourseTitle}
                                        </Link>
                                    </td>
                                    <td class="px-4 py-3">
                                        {data.competenciesAllignedTo?.map((comp) =>{
                                            return(
                                                <div className="flex flex-row">
                                                    {comp}
                                                </div>
                                            )
                                        })}
                                        {data.Course.CourseSpecialNotes}
                                    </td>
                                    <td class="px-4 py-3">{data.Course.CourseSubjectMatter}</td> 
                                    <td class="px-4 py-3">95%</td>
                                    {/* <td class="px-4 py-3">{data.instance}</td> */}
                                    <td class="px-4 py-3">{data.Course_Instance.StartDate.split('T')[0]} - {data.Course_Instance.EndDate.split('T')[0]}</td>
                                    <td class="px-4 py-3">50</td>
                                    <td class="pl-4 py-3 w-8">{data.Technical_Information.Location}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span class="font-semibold text-gray-900 dark:text-white"> 1-10 </span>
                    of
                    <span class="font-semibold text-gray-900 dark:text-white"> 1000</span>
                </span>
                <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    </>
  );
}
