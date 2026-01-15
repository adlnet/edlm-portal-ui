'use strict'

import { ApplicationCeuCard } from '@/components/cards/applicationCeuCard';
import { ChevronRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { 
  affiliationOptions, 
} from '@/utils/dropdownMenuConstants';
import { useRouter } from 'next/router';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import Image from 'next/image';
import TextInputCustom from '@/components/inputs/TextInputCustom';


export function CEUExperience ({
    setCurrentStep, 
    applicationType,
    courses, 
    setCourses,
    numberOfCourses,
    setNumberOfCourses,
  }) {

  const router = useRouter();

  const handleContinue = () => {
    setCurrentStep(6);
  }

  const handleAddCourse = () => {
    const newCourse = {
        id: crypto.randomUUID(),
        order: numberOfCourses + 1,
        name: null,
        category: null,
        dateOfCompletion: null,
        ceuHours: 0,
        proofFile: null,
    }
    setCourses([...courses, newCourse]);
    setNumberOfCourses(numberOfCourses + 1);
  }

  const totalHours = () => {
    let total = 0;
    courses.forEach(course => {
        total = total + course.ceuHours;
    });
    return total;
  }

  const showMessage = () => {
    let show = false;
    courses.forEach(course => {
        if (course.name != null)
            show = true;
    });
    return show;
  }

  return (
    <>
      {/* Stepper */}
      <div className="flex flex-row items-center gap-2">
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(2)}}
        >
          Privacy Act
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(3)}}
        >
          Code of Ethics
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(4)}}
        >
          Applicant Info
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(5)}}
        >
          CEU Documentation
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <p className="text-md text-gray-400">Review & Send</p>
      </div>

      <div className="bg-navy-025 text-navy-700 rounded-md py-1 px-3 mt-4 text-sm w-fit">
        {applicationType}
      </div>

      {/* Page Title and Content  */}
      <div className="mt-4">
        <h1 className="text-navy-700 text-2xl font-bold"> Completed Continuing Education Hours</h1>
        <p className="text-gray-cool-700 text-sm mt-4">
            List all relevant experience with duration and the supervisor(s) listed can verify your experience. As you add experiences, 
            the system will automatically calculate the total hours completed. You must show documentation of 32 hours of Continuing 
            Education and you may not re-use courses from past submissions.
        </p>

        <div className="flex items-center gap-1 text-[#993033] mt-4 text-sm mb-6">
            <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" /> = Required
        </div>

        {courses.map((course, index) => (
            <div key={index} className='mb-4'>
                <ApplicationCeuCard 
                    course={course}
                    setCourse={(updatedCourse) => { 
                        const updatedCourses = [...courses];
                        updatedCourses[index] = updatedCourse;
                        setCourses(updatedCourses);
                    }}
                />
            </div>
        ))}

        {/* Add another course button */}
        <button 
            className='text-teal-custom-500 font-bold text-sm'
            onClick={handleAddCourse}
        >
            + Add Another Course
        </button>

        {/* Total hours message t=0*/}
        {showMessage() && totalHours() == 0 && (
            <div className="p-4 w-full mt-6 bg-navy-025 rounded-lg text-navy-700">
                <h1 className='text-lg font-bold'> Total: {totalHours()} hours</h1>
                <p className='text-sm mt-1'> You must show documentation of 32 hours of Continuing Education. You may not re-use courses from past submissions. </p>
            </div>
        )}
        {console.log('Total Hours:', totalHours())}
        {/* Total hours message 0 < t < 32 */}
        {showMessage() && totalHours() > 0 && totalHours() < 32 && (
            <div className="p-4 w-full mt-6 bg-red-50 rounded-lg text-[#993033]">
                <h1 className='text-lg font-bold'> Total: {totalHours()} hours</h1>
                <p className='text-sm mt-1'> You must need {32 - totalHours()} more hours to meet the CEU Requirement of 32 hours. </p>
            </div>    
        )}
        {/* Total hours message 0 < t < 32 */}
        {showMessage() && totalHours() >= 32 && (
            <div className="p-4 w-full mt-6 bg-teal-custom-50 rounded-lg text-teal-custom-500">
                <h1 className='text-lg font-bold'> Total: {totalHours()} hours</h1>
                <p className='text-sm mt-1'> You must need {32 - totalHours()} more hours to meet the CEU Requirement of 32 hours. </p>
            </div>    
        )}

        {/* Continue Button */}
        <div className="flex flex-row gap-4 items-center w-full justify-end mt-8">
          
          <button 
            className="text-sm text-teal-custom-500 font-bold"
            onClick={()=> { router.push('/edlm-portal/learner/applications') }}
          >
            Save and Exit
          </button>
          
          <button 
            className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-teal-custom-500 hover:bg-teal-800 disabled:bg-teal-disabled" 
            onClick={handleContinue}
          >
            <div className="flex gap-2 items-center justify-end">
              Continue 
            </div>
          </button>
        </div>

        <div className="border-t w-full mt-6"></div>

        <div className="flex flex-row gap-3 text-gray-cool-700 text-sm mt-4">
          <div className="bg-gray-50 px-3 py-1 rounded-md">DD Form 2950-1</div>
          <div className="bg-gray-50 px-3 py-1 rounded-md">FEB 2025</div>
          <div className="bg-gray-50 px-3 py-1 rounded-md">Updated 02/05/2025</div>
          <div className="bg-gray-50 px-3 py-1 rounded-md">Prescribed by DoDD 6495.03, DoDI 6495.03, and DTM 14-001</div>
        </div>

      </div>
    </>
  )
};