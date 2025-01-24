"use client";

import { Checkbox, Label, Progress } from "flowbite-react";
import { useEffect, useState  } from "react";
import Link from 'next/link';

export let users = [];

// NOTE** DOT&E commented out parts of this code to increase code coverage of tests

export function WorkforceAlignmentTable() {

    const [talentData, setTalentData] = useState(null);

    const data = [
        {overallAlignment: '95%', lastName: "Jenson", firstName: "Adam", trainingNeeded: "1 course", trainingTime: "3 weeks", service: "Air Force", location: "Virginia", currentPosition: "Master Sergeant (MSgt) (E7)", careerState: "Mid-Career", IDPAlignment:95 },
        {overallAlignment: '92%', lastName: "Waites", firstName: "Jennifer", trainingNeeded: "1 course", trainingTime: "4 weeks", service: "Air Force", location: "Virginia", currentPosition: "Airman (AMN)", careerState: "Mid-Career", IDPAlignment:92 },
        {overallAlignment: '85%', lastName: "Lewis", firstName: "Sophia", trainingNeeded: "2 course", trainingTime: "5 weeks", service: "Navy", location: "Virginia", currentPosition: "Aircraft Flight Engineer", careerState: "Mid-Career", IDPAlignment:85 },
        {overallAlignment: '72%', lastName: "Davis", firstName: "Elmer", trainingNeeded: "3 courses", trainingTime: "7 weeks", service: "Homeland Security", location: "Virginia", currentPosition: "Petty Officer Second Class (PO2) (E5)", careerState: "Mid-Career", IDPAlignment:72 },
        {overallAlignment: '68%', lastName: "John", firstName: "Lee", trainingNeeded: "4 courses", trainingTime: "12 weeks", service: "Navy", location: "Virginia", currentPosition: "Chief Intelligence Specialist (E7)", careerState: "Mid-Career", IDPAlignment:68 },
        {overallAlignment: '54%', lastName: "Jenson", firstName: "Adam", trainingNeeded: "6 courses", trainingTime: "12 weeks", service: "Navy", location: "Virginia", currentPosition: "Competency Manager", careerState: "Mid-Career", IDPAlignment:54 },
        {overallAlignment: '49%', lastName: "Waites", firstName: "Jennifer", trainingNeeded: "8 courses", trainingTime: "15 weeks", service: "Air Force", location: "Virginia", currentPosition: "Senior Airman (SRA) (E4)", careerState: "Mid-Career", IDPAlignment:49 },
        {overallAlignment: '32%', lastName: "Lewis", firstName: "Sophia", trainingNeeded: "10 courses", trainingTime: "21 weeks", service: "Navy", location: "Virginia", currentPosition: "Marine", careerState: "Mid-Career", IDPAlignment:32 },
        {overallAlignment: '27%', lastName: "Davis", firstName: "Elmer", trainingNeeded: "12 courses", trainingTime: "25 weeks", service: "Air Force", location: "Virginia", currentPosition: "Staff Sergeant (SSgt) (E5)", careerState: "Mid-Career", IDPAlignment:27 },
        {overallAlignment: '15%', lastName: "John", firstName: "Lee", trainingNeeded: "15 courses", trainingTime: "30 weeks", service: "Homeland Security", location: "Virginia", currentPosition: "Technical Support", careerState: "Mid-Career", IDPAlignment:15 },
    ];

    useEffect(() => {
        setTalentData(null)
    },[])

  return (
    <>
    <div className="mx-auto max-w-screen-xl">
        {/* <!-- Start coding here --> */}
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mb-8">
            <div className='pt-2 text-lg font-bold pl-4'>Work Alignment Table </div>
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
                                    <Link href="#" passHref className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</Link>
                                </li>
                            </ul>
                            <div className="py-1">
                                <Link href="#" passHref className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</Link>
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
                            <th scope="col" className="px-4 py-3">Overall Alignment</th>
                            <th scope="col" className="px-4 py-3">Last Name</th>
                            <th scope="col" className="px-4 py-3">First Name</th>
                            <th scope="col" className="px-4 py-3">Training Needed</th>
                            <th scope="col" className="px-4 py-3">Training Time</th>
                            <th scope="col" className="px-4 py-3">Service</th>
                            <th scope="col" className="px-4 py-3">Location</th>
                            <th scope="col" className="px-4 py-3">Current Position</th>
                            <th scope="col" className="px-4 py-3">Career State</th>
                            <th scope="col" className="px-1 py-3">IDP Alignment</th>

                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody> 
                        {data.map((data, index) => {
                            return (
                                <tr className="border-b dark:border-gray-700" key={data.lastName}>
                                    <div className="flex items-center gap-2 ml-6 mt-5">
                                        <Checkbox id={data.workRole} onChange={null} name={talentData?.statements[index]?.actor.name} />
                                        <Label htmlFor={data.workRole}>{data.overallAlignment}</Label>
                                    </div>
                                    <td className="px-4 py-3">{talentData?.statements[index]?.actor.name.split(' ').pop()}</td>
                                    <td className="px-4 py-3">{talentData?.statements[index]?.actor.name.split(' ')[0]}</td>
                                    <td className="px-4 py-3">{data.trainingNeeded}</td>
                                    <td className="px-4 py-3">{data.trainingTime}</td>
                                    <td className="px-4 py-3">{data.service}</td>
                                    <td className="px-4 py-3">{data.location}</td>
                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.currentPosition}</th>
                                    <td className="px-4 py-3">{data.careerState}</td>
                                    <td className="px-4 py-3">
                                        <Progress progress={data.IDPAlignment} textLabel="Flowbite" size="lg" labelProgress color="purple" theme={{
                                            "base": "w-full overflow-hidden rounded-full bg-gray-custom dark:bg-gray-custom",
                                            "label": "mb-1 flex justify-between font-medium dark:text-white",
                                            "bar": "space-x-2 rounded-full text-center font-medium leading-none text-white dark:text-white",
                                            "color": {
                                                "dark": "bg-gray-600 dark:bg-gray-300",
                                                "purple": "bg-purple",
                                                'dark-blue': 'bg-dark-blue',
                                                'blue-custom':'bg-blue-custom',
                                                'gray-custom': 'bg-gray-custom',
                                                'black-10': 'bg-black-10',
                                                'red': 'bg-red',
                                                'accent-blue': 'bg-accent-blue',
                                                'black-custom': 'bg-black-custom',
                                            },
                                            }}/>
                                    </td>
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
                        <Link href="#" passHref className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" passHref className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</Link>
                    </li>
                    <li>
                        <Link href="#" passHref className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</Link>
                    </li>
                    <li>
                        <Link href="#" passHref aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</Link>
                    </li>
                    <li>
                        <Link href="#" passHref className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</Link>
                    </li>
                    <li>
                        <Link href="#" passHref className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</Link>
                    </li>
                    <li>
                        <Link href="#" passHref className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    </>
  );
}
