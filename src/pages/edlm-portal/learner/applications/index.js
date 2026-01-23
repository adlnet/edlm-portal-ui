'use strict';

import { ArrowRightIcon, XMarkIcon} from "@heroicons/react/24/outline";
import { CheckCircleIcon,} from '@heroicons/react/24/solid';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import ApplicationTrackingBar from "@/components/ApplicationTrackingBar";
import ApplicationTrackingTable from "@/components/tables/ApplicationTrackingTable";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function Applications() {

  const router = useRouter();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Temporary variable to simulate application in progress
  const [inProgress, setInProgress] = useState(false);

  // Temporary variable to simulate completed applications
  const [completedApplications, setCompletedApplications] = useState([
    {id: 1, type: 'Renewal Application'},
    {id: 2, type: 'New Application'},
  ]);

  // Initiated, Evaluation, or Review - used to control the tracking bar
  const [stage, setStage] = useState('Initiated');

  //Temporary Data for table 
  const applicationData = ([
    {name: 'John Doe', email: 'john.doe@example.com', task: 'Supervisor Validation', status: 'Delivered', statusDate: 'Jan 1, 2025'},
    {name: 'John Doe', email: 'john.doe@example.com', task: 'Supervisor Validation', status: 'Delivered', statusDate: 'Jan 1, 2025'},
    {name: 'John Doe', email: 'john.doe@example.com', task: 'Supervisor Validation', status: 'Delivered', statusDate: 'Jan 1, 2025'},
    {name: 'John Doe', email: 'john.doe@example.com', task: 'Supervisor Review', status: 'Completed', statusDate: 'Jan 1, 2025'},
    {name: 'John Doe', email: 'john.doe@example.com', task: 'SARC Review', status: 'In Progress', statusDate: 'Jan 1, 2025'},
    {name: 'John Doe', email: 'john.doe@example.com', task: 'CO Review', status: 'Pending', statusDate: 'Jan 1, 2025'},
    {name: 'John Doe', email: 'john.doe@example.com', task: 'NOVA Review', status: 'Pending', statusDate: 'Jan 1, 2025'},
  ])

  const handleClose = () => {
    setShowSuccessMessage(false);

    // Remove the ?submitted param
    const { submitted, ...rest } = router.query;
    router.replace({
      pathname: router.pathname,
      query: rest
    }, undefined, { shallow: true });
  };

  useEffect(() => {
    // Show message if ?submitted=1 appears in URL
    if (router.query.submitted === '1') setShowSuccessMessage(true);
  }, [router.query.submitted]);

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md py-4 px-4 my-4 rounded-xl mx-4 min-h-[700px]'>

        {/* Success message when a new application has been submitted */}
        {showSuccessMessage && (
          <div className="flex flex-col p-4 mt-2 mb-4 bg-teal-custom-50 rounded-lg w-full"> 
            <div className="flex flex-row justify-between pb-2">
              <div className="flex flex-row items-center">
                <CheckCircleIcon className="w-6 h-6 text-teal-custom-500"/>
                <div className="text-lg text-teal-custom-500 font-bold pl-2">Your application has been initiated.</div>
              </div>
              <button
                type="button"
                aria-label="Dismiss"
                className=""
                onClick={handleClose}
              >
                <XMarkIcon className="w-6 h-6 text-teal-custom-500" />
              </button>
            </div>
            <div className="text-teal-custom-500 text-medium">
              Follow your application&apos;s progress in this Dashboard.
            </div>
          </div>
        )}

        <h1 className="text-xl font-bold text-blue-900 pb-4">My Applications</h1>
        <div className="text-gray-600 pb-8"> Manage and track your certification applications.</div>

        {!inProgress ? (
          <button 
            className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-teal-custom-500 hover:bg-teal-800"
            onClick={() => {router.push('/edlm-portal/learner/applications/createApplication')}}
          >
            <div className="flex gap-2 items-center">
              Start New Application 
              <ArrowRightIcon className="w-3 h-3 stroke-[4]"/>
            </div>
          </button>
        ) : (
          <div>
            <p className="text-teal-custom-500 text-lg font-bold"> In Progress Application </p>

            {/* Application Tracking Card */}
            <div className="flex flex-col border rounded-md p-4 border-gray-300 mt-4">
              <h1 className="text-gray-cool-700 font-bold text-lg mb-2">Application Tracking Overview</h1>
              <ApplicationTrackingBar stage={stage} />
              <div className="flex flex-row text-center mt-6 justify-between">
                <div className="flex flex-col text-center text-gray-500 w-1/3">
                  <p className="text-md font-bold text-gray-700"> Application Initiated</p>
                  <p className="text-sm"> Applicant Info </p>
                  <p className="text-sm"> Advocacy Experience </p>
                  <p className="text-sm"> Request Letters of Recommendation </p>  
                </div>
                <div className="flex flex-col text-center text-gray-500 w-1/3">
                  <p className="text-md font-bold text-gray-700"> Evaluation & Review</p>
                  <p className="text-sm"> Information Validation </p>
                  <p className="text-sm"> Evaluation of Experiences </p>
                  <p className="text-sm"> Letters of Recommendation </p>  
                </div>
                <div className="flex flex-col text-center text-gray-500 w-1/3">
                  <p className="text-md font-bold text-gray-700"> Review & Approve</p>
                  <p className="text-sm"> NOVA Processing </p>
                  <p className="text-sm"> NOVA Board Review </p>
                  <p className="text-sm"> Approve Certification </p>  
                </div>
              </div>
              <button 
                className="border border-teal-custom-500 text-teal-custom-500 hover:bg-teal-custom-50 mt-14 mr-2 px-4 py-2 rounded-md self-end text-sm font-bold"
                onClick={()=>{}}
              >
                View Application
              </button>
            </div>

            <div className="flex flex-col border rounded-md p-4 border-gray-300 mt-4">
              <h1 className="text-lg font-bold text-gray-cool-700 mb-6">Application Tracking Status</h1>
              <ApplicationTrackingTable applicationData={applicationData}/>
            </div>
          </div>
        )}

        {completedApplications.length > 0 && (
          <div>
            <div className="border-t w-full mt-8"></div>

            <h1 className="font-bold text-lg text text-teal-custom-500 mb-4 mt-10">Completed Applications</h1>
            
            <div className="bg-white border rounded-md p-4 border-gray-300 mt-4">
              {/* Table Header */}
              <h2 className="font-bold text-gray-cool-700 text-lg pb-4">Application Log</h2>
              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm text-gray-700 font-bold">
                      <th className="py-4 px-4">APPLICATION NAME</th>
                      <th className="py-4 px-4">APPLICATION</th>
                      <th className="py-4 px-4 w-1/4"></th>
                      <th className="py-4 px-4 w-1/4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {completedApplications.length > 0 ? (
                      completedApplications.map((row) => (
                        <tr key={row.id} className={`border-b`}>
                          <td className="py-5 px-4">{row.type}</td>
                          <td className="py-5 px-4">View Application</td>
                          <td className="w-1/4"></td>
                          <td className="w-1/4"></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-5 px-4" colSpan={4}>No applications found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
        
          </div>
        )}


      </div>
    </DefaultLayout>
  );
}
