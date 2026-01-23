'use-strict'

import { Button } from 'flowbite-react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function SubmitApplicationModal({ open, onClose, onSubmit, submissionAgreement, setSubmissionAgreement, finalSubTimestamp, setFinalSubTimestamp, setStatus }) {
  
    if (!open) return null;

    const handleCheck = () => {
        if (!submissionAgreement) {
            const now = new Date();
            setSubmissionAgreement(true);
            setFinalSubTimestamp(now);
        }
    };

    function formatDateTime(date) {
        const yy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${yy}.${mm}.${dd} ${hh}:${min}`;
    }
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            {/* MODAL */}
            <div className="bg-white rounded-lg shadow-lg w-1/2 py-4">
                <div className='flex flex-row justify-between border-b px-4 pb-4 items-center mb-4'>
                    <h2 className="text-lg font-semibold text-gray-cool-700 ">Confirm Application Submission</h2>
                    <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    >  
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>
                
                <div className='flex flex-col border rounded-md mx-3 mb-4'>
                    <div className='bg-gray-100 px-4 py-2 text-gray-cool-700'>Application Certification</div>
                    <p className='text-sm text-gray-cool-700 my-2 px-4'>
                        I, the undersigned Applicant, hereby certify the information submitted on this application is true and accurate. 
                        I further certify the information reported on any enclosures is true and accurate. I further certify that 
                        I completed this application myself.
                    </p>
                    <div className="flex flex-row items-center gap-3 mt-2 px-4 text-sm text-gray-cool-700 mb-2">
                        <input 
                            className="rounded-sm border-gray-300 focus:ring-navy-700 checked:bg-navy-700"
                            type="checkbox" 
                            checked={submissionAgreement}
                            onChange={(e) => {handleCheck()}}
                        />
                        <p className="text-gray-cool-700 text-sm/4">By checking this box, I agree that the checkbox will be the electronic representation of my signature.</p>
                    </div>
                    {submissionAgreement && (<h1 className="text-lg mb-4 font-bold text-gray-cool-700 px-4">Acknowledged on {formatDateTime(finalSubTimestamp)}</h1>)}
                </div>
                <div className="flex gap-2 px-4 pt-4 border-t">
                <button
                    className="hover:text-teal-800 text-teal-custom-500 mr-4"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <Button
                    className="rounded-lg bg-teal-custom-500 text-white hover:bg-teal-800"
                    onClick={() => {
                        onSubmit();
                        onClose();
                    }}
                >
                    Confirm and Submit Application
                </Button>
                </div>
            </div>
        </div>
    );
}