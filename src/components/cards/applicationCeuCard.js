'use strict';

import { CheckCircleIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Datepicker } from 'flowbite-react';
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from 'react';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import Image from 'next/image';
import NumberInputCustom from "@/components/inputs/NumberInputCustom";
import TextInputCustom from '@/components/inputs/TextInputCustom';
import datepickerTheme from '@/public/themes/datepickerTheme.json';

export function ApplicationCeuCard({ course, setCourse }) {

    const [selectedDate, setSelectedDate] = useState(null);

    const [showUploaded, setShowUploaded] = useState(false);
    const [uploadDate, setUploadDate] = useState(null);
    const inputRef = useRef(null);

    const tempCourses = [
        'Campus Advocacy Training (NCAT)',
        'Community Crisis Response Team (CRT)',
        'Navy SAPR Professional Code of Ethics Training',
        'SHARP Basic Course (Army)',
        'USMC SAPR VA 40-Hour Course'
    ];
    
    return (
        <div className="flex flex-col p-4 border rounded-lg text-gray-cool-700 h-min-content">
            <h1 className="text-lg text-gray-cool-700 font-bold">Course #{course.order}</h1>
            <div className="flex flex-row gap-2 items-center mt-4 mb-1">
                <p className="">Course Name</p>
                <InformationCircleIcon className="h-4 w-4"/>
                <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
            </div>
            {/* TEMPORARY SOLUTION - will need to adjust this to be a course search bar */}
            <CustomDropdown
                value={course.name}
                onChange={e => setCourse({ ...course, name: e.target.value })}
                options={tempCourses}
                placeholder="Select course"
            />
            {/* If a course is selected, expand the card */}
            {course.name && (
                <div className="flex flex-col mt-4 text-gray-cool-700">
                    <p className='mb-1'>Course Category</p>
                    <CustomDropdown 
                        value={course.category}
                        onChange={e => setCourse({ ...course, category: e.target.value })}
                        options={['Victim Advocacy', 'Prevention', 'Ethics']}
                        placeholder="Select Course Category"
                    />
                    <div className="flex flex-row gap-2 items-center mt-4 mb-1 items-center">
                        <div className="flex flex-col w-1/2 mr-4">
                            <div className="flex flex-row gap-2 items-center mb-1">
                                <p className=''>Date of Course Completion</p>
                                <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
                            </div>
                            
                            <div className="flex flex-col">
                                <Datepicker 
                                    value={course.dateOfCompletion}
                                    onChange={date => setCourse({ ...course, dateOfCompletion: date })}
                                    theme={datepickerTheme}
                                    placeholder="Select end date"
                                    format="mm/dd/yyyy"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <NumberInputCustom
                                label="Number of CEU Hours"
                                required={true}
                                value={course.ceuHours}
                                onChange={e => setCourse({ ...course, ceuHours: Number(e.target.value) })}
                                placeholder="Input total CEU hours"
                            />
                        </div>
                    </div>

                    {/* File upload */}
                    <div className="flex flex-row gap-2 items-center mt-8">
                        <p>Please upload your certificate from your completed course</p>
                        <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
                    </div>

                    <div className="flex items-center mt-1 text-sm">
                        <button
                            type="button"
                            className="bg-teal-custom-500 text-white py-2.5 px-5 border border-teal-custom-500 hover:border-teal-800 rounded-l-lg focus:outline-none hover:bg-teal-800 transition-all"
                            onClick={() => inputRef.current.click()}
                        >
                            Choose File
                        </button>
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                setCourse({ ...course, proofFile: e.target.files[0] });
                                setShowUploaded(true);
                                setUploadDate(new Date());
                            }}
                        />
                        {course.proofFile ? (
                            <p className="flex-1 text-gray-900 border border-gray-300 bg-gray-50 rounded-r-lg py-2.5 flex items-center px-4">
                                {course.proofFile.name}
                            </p>
                        ) : (          
                            <p className="flex-1 text-gray-500 border border-gray-300 bg-gray-50 rounded-r-lg py-2.5 flex items-center px-4">
                                Select a file to upload
                            </p>)
                        }
                    </div>
                
                    {/* Success Message */}
                    {showUploaded && (
                        <div className="flex items-center justify-between bg-teal-custom-50 text-teal-custom-500 px-6 py-4 rounded-lg mb-4 mt-4">
                            <div className="flex items-center">
                                <CheckCircleIcon className="w-6 h-6 mr-2" />
                                <span className="font-bold">Your file has been uploaded.</span>
                            </div>
                            <button
                                className="text-[#357780]"
                                onClick={() => { setShowUploaded(false)}}
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    )}

                    {/* Uploaded File Card */}
                    {course.proofFile && (
                        <div className="flex flex-row">
                            <button
                                className="mr-2 h-12"
                                onClick={() => { setCourse({ ...course, proofFile: null }); setShowUploaded(false); }}
                                aria-label="Remove file"
                            >
                                <XMarkIcon className="w-6 h-6 text-gray-700"/>
                            </button>
                            <div className="flex items-center p-4 min-w-[370px]">  
                                {/* File Icon */}
                                <div className="bg-teal-custom-500 w-20 h-20 flex items-center justify-center rounded-tl-xl mr-6">
                                    <DocumentIcon className="w-10 h-10 text-white" />
                                </div>
                                
                                {/* File details */}
                                <div>
                                    <div className="text-gray-cool-700 text-lg">{course.proofFile.name}</div>
                                    <div className="text-gray-500 text-[15px] mt-1 tracking-wide">
                                        {uploadDate ? uploadDate.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}): ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
       </div>  
    );
}