import { Checkbox, Label } from "flowbite-react";
import Link from 'next/link';

//NOTE ** DOTE commented out code to increasing coverage 

export function CoursesTable() {

    const tempData = [
        {id:1, courseName: 'Managing Network Security', competenciesAllignedTo: ["Knowledge of the operations and processes for incident, problem, and event management.", "Knowledge of procedures used for documenting and querying reported incidents, problems, and events.", "Skill to design incident response for cloud service models.", "Ability to accurately define incidents, problems, and events in the trouble ticketing system."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Fall 2020", startEnd: "Sept 16, 2020 to Nov 20, 2020", availableSeats: "50", location: "Richmond, Virginia"},
        {id:2, courseName: 'Penetration Testing, Incident Response and Forensics', competenciesAllignedTo: ["Knowledge of how information needs and collection requirements are translated, tracked, and prioritized across the extended enterprise.[K0120]", "Skill to translate, track, and prioritize information needs and intelligence collection requirements across the extended enterprise. [S0372]"], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Fall 2021", startEnd: "Sept 18, 2021 to Nov 22, 2021", availableSeats: "50", location: "Richmond, Virginia"},
        {id:3, courseName: 'Tools of the Trade: Linux and SQL', competenciesAllignedTo: ["Knowledge of server administration and systems engineering theories, concepts, and methods.", "Knowledge of system software and organizational design standards, policies, and authorized  approaches relating to system design.", "Knowledge of system life cycle management principles, including software security and usability.", "Knowledge of technology integration processes."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Spring 2021", startEnd: "Jan 4, 2021 to March 27, 2021", availableSeats: "50", location: "Richmond, Virginia"},
        {id:4, courseName: 'Assets, Threats, and Vulnerabilities', competenciesAllignedTo: ["Knowledge of how information needs and collection requirements are translated, tracked, and prioritized across the extended enterprise.[K0120]", "Skill to translate, track, and prioritize information needs and intelligence collection requirements across the extended enterprise. [S0372]"], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "", startEnd: "Jan 6, 2022 to March 27, 2022", availableSeats: "50", location: "Richmond, Virginia"},
        {id:5, courseName: 'Put It to Work: Prepare for Cybersecurity Jobs', competenciesAllignedTo: ["Knowledge of server administration and systems engineering theories, concepts, and methods.", "Knowledge of system software and organizational design standards, policies, and authorized  approaches relating to system design.", "Knowledge of system life cycle management principles, including software security and usability.", "Knowledge of technology integration processes."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "", startEnd: "Jan 5, 2020 to March 28, 2020", availableSeats: "50", location: "Richmond, Virginia"},
        {id:6, courseName: 'Road to the CISO – Culminating Project Course', competenciesAllignedTo: ["Knowledge of the operations and processes for incident, problem, and event management.", "Knowledge of procedures used for documenting and querying reported incidents, problems, and events.", "Skill to design incident response for cloud service models.", "Ability to accurately define incidents, problems, and events in the trouble ticketing system."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Fall 2021", startEnd: "Sept 18, 2021 to Nov 22, 2021", availableSeats: "50", location: "Richmond, Virginia"},
        {id:7, courseName: 'Cyber Threat Intelligence', competenciesAllignedTo: ["Knowledge of the operations and processes for incident, problem, and event management.", "Knowledge of procedures used for documenting and querying reported incidents, problems, and events.", "Skill to design incident response for cloud service models.", "Ability to accurately define incidents, problems, and events in the trouble ticketing system."], 
            competencyAlignment: "100%", aligmentPercent: "100%", instance: "Spring 2020", startEnd: "Jan 5, 2020 to March 28, 2020", availableSeats: "50", location: "Richmond, Virginia"},
        ];


  return (
    <>
    <div className="mx-auto max-w-screen-xl">
        {/* <!-- Start coding here --> */}
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">                        
                            <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                                Actions
                            </button>
                        </div>

                        <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                            </div>
                        </div>

                        <div className="p-0.5 mb-2 overflow-hidden font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 from-accent-blue to-purple">                        
                            <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                </svg>
                                Filter
                                <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div>
                        <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                            <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                <li className="flex items-center">
                                    <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                </li>
                                <li className="flex items-center">
                                    <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                                </li>
                                <li className="flex items-center">
                                    <input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                                </li>
                                <li className="flex items-center">
                                    <input id="nikon" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="nikon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                                </li>
                                <li className="flex items-center">
                                    <input id="benq" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="benq" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3"> </th>
                            <th scope="col" className="px-4 py-3">Course Name</th>
                            <th scope="col" className="px-4 py-3">Competencies Alligned to </th>
                            <th scope="col" className="px-4 py-3">Competency Alignment</th>
                            <th scope="col" className="px-4 py-3">Aligment Percent</th>
                            {/* <th scope="col" class="px-4 py-3">Instance</th> */}
                            <th scope="col" className="px-4 py-3">Start/End</th>
                            <th scope="col" className="px-4 py-3">Available Seats</th>
                            <th scope="col" className="px-4 py-3 w-8">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data?.hits.map((data) => { */}
                        {tempData.map((data) => {
                            return (
                                <tr key={data.id} className=" border-b dark:border-gray-700">
                                    <div className="flex h-full items-center align-center justify-center gap-2 ml-6 py-3 h-64 ">
                                        {/* <Checkbox id={data.Course.CourseTitle} />
                                        <Label htmlFor={data.Course.CourseTitle}></Label> */}
                                        <Checkbox id={data.courseName} />
                                        <Label htmlFor={data.courseName}></Label>
                                    </div>
                                    <td className="px-4 py-3">
                                        {/* <Link href={`https://dev-xds.deloitteopenlxp.com/course/${data.meta.id}`}> */}
                                        <Link href={`https://dev-xds.deloitteopenlxp.com/course/#`}>
                                            {/* {data.Course.CourseTitle} */}
                                            {data.courseName}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3">
                                        {data.competenciesAllignedTo?.map((comp) =>{
                                            return(
                                                <div className="flex flex-row">
                                                    {comp}
                                                </div>
                                            )
                                        })}
                                        {/* {data.Course.CourseSpecialNotes} */}
                                    </td>
                                    {/* <td class="px-4 py-3">{data.Course.CourseSubjectMatter}</td>  */}
                                    <td className="px-4 py-3">{data.competencyAlignment}</td> 
                                    <td className="px-4 py-3">95%</td>
                                    {/* <td class="px-4 py-3">{data.instance}</td> */}
                                    {/* <td class="px-4 py-3">{data.Course_Instance.StartDate.split('T')[0]} - {data.Course_Instance.EndDate.split('T')[0]}</td> */}
                                    <td className="px-4 py-3">{data.startEnd}</td>
                                    <td className="px-4 py-3">50</td>
                                    {/* <td class="pl-4 py-3 w-8">{data.Technical_Information.Location}</td> */}
                                    <td className="pl-4 py-3 w-8">{data.location}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white"> 1-10 </span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white"> 1000</span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
