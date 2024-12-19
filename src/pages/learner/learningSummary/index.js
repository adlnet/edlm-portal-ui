'use strict';

import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router' ;
import CompetencyChart from "@/components/CompetencyChart";
import CollectionTable from "@/components/tables/collectionsTable/CollectionTable";
import ProgressCard from "@/components/cards/ProgressCard";

// Mock data for development
const mockSummaryData = [
  { name: 'Courses Completed', value: 43 },
  { name: 'Upcoming Courses', value: 2 },
  { name: 'Comptencies Worked On', value: 11 },
  { name: 'In Progress Courses', value: 3 }
]

const mockComptencyData = [
  { name: 'Operating & System Design', courses:4, hours: 4 },
  { name: 'Acquisition & Requirements Process', courses: 2, hours: 3 },
  { name: 'Policy Development & Implementation', courses: 3, hours: 5 },
  { name: 'Test Planning, Execution & Reporting', courses: 2, hours: 2 },
  { name: 'Data Management & Reporting', courses: 2, hours: 3 },
  { name: 'TEMP/T&E Strategy & Development', courses: 2, hours: 3 },
  { name: 'Modeling & Stimulation VV&A', courses: 2, hours: 3 },
  { name: 'Software', courses: 2, hours: 3 },
  { name: 'Full Spectrum Survivability & Lethality', courses: 2, hours: 3 },
  { name: 'Artificial Intelligence', courses: 2, hours: 3 },
  { name: 'Leadership', courses: 2, hours: 3 }
];

const mockLearningPhases = [
  { name: 'Phase I (30 Days)', progress: 100, title: 'Onboarding Learning Plan' },
  { name: 'Phase II (60 Days)', progress: 100, title: 'Onboarding Learning Plan' },
  { name: 'Phase III (90 Days)', progress: 70, title: 'Onboarding Learning Plan' }
]

const mockCompetencyColor = {
  'Operating & System Design': '#E8EAA1',
  'Acquisition & Requirements Process': '#00AAA0',
  'Policy Development & Implementation': '#5068C3',
  'Test Planning, Execution & Reporting': '#927FBF',
  'Data Management & Reporting': '#F7C873',
  'TEMP/T&E Strategy & Development': '#E29578',
  'Modeling & Stimulation VV&A': '#CCF186',
  'Software': '#F7C873',
  'Full Spectrum Survivability & Lethality': '#307672',
  'Artificial Intelligence': '#694B7C',
  'Leadership': '#BADFDB'
}

const mockInProgressCourses = [
  { id: 1, title: 'AI Ethics' },
  { id: 2, title: 'NLP' },
  { id: 3, title: 'Machine Learning'},
  { id: 4, title: 'Deep Learning'},
  { id: 5, title: 'Data Science'},
  { id: 6, title: 'Data Engineering'},
  { id: 7, title: 'Data Analysis'},
  { id: 8, title: 'Data Visualization'},
  { id: 9, title: 'Data Management'},
  { id: 10, title: 'Data Governance'},
  { id: 11, title: 'Data Security'},
  { id: 12, title: 'Data Privacy'},
  { id: 13, title: 'Data Quality'},
  { id: 14, title: 'Data Warehousing'},
  { id: 15, title: 'Data Modeling'},
  { id: 16, title: 'Data Mining'},
  { id: 17, title: 'Data Integration'},
  { id: 18, title: 'Data Migration'},
  { id: 19, title: 'Data Transformation' },
  { id: 20, title: 'Data Archiving'},
  { id: 21, title: 'Data Backup' },
  { id: 22, title: 'Software Development Process' }
];

const mockCompletedCourses = [
  { id: 25, title: 'Leadership Responsibility' },
  { id: 26, title: 'Leadership Development' },
  { id: 27, title: 'Leadership Skills' },
  { id: 28, title: 'Leadership Qualities' },
  { id: 29, title: 'Leadership Styles' },
  { id: 30, title: 'Leadership Traits' },
  { id: 31, title: 'Leadership Competencies' },
  { id: 32, title: 'Leadership Facts' },
]

export default function LearningSummary() {

  const router = useRouter();
  const { user } = useAuth();

  const columns = [
    {label: 'COURSES', accessor: 'title'},
  ]
  useEffect(() => {
    if (!user) router.push('/');
    // if (isError && error.response.status === 403) router.push('/403');
    // if (isError && error.response.status === 401) router.push('/401');
  }, []);

  return (
    <DefaultLayout>
      <div className='p-6'>
        <h1 className='text-gray-900 text-2xl font-bold leading-normal pb-2'>Learning Summary</h1>
        {/* Summary Section */}
        <div className='bg-white rounded-lg shadow p-4 mb-4'>
          <div className='flex flex-col md:flex-row'>
            {mockSummaryData.map((summary, i) => (
              <div key={i} className='flex-1 flex flex-col items-center justify-center p-4 md:pl-8'>
                <span className='text-[#00509f] text-4xl font-bold'>{summary.value}</span>
                <span className="text-gray-800 text-base font-normal font-['Inter'] leading-normal text-nowrap">{summary.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Competency Progress Section */}
        <div className='bg-white rounded-lg shadow p-4 mb-4 shadow'>
          <h2 className='text-gray-900 text-2xl font-bold leading-[30px]'>Competency Progress</h2>
          <p className='text-gray-500 text-base font-normal leading-normal mb-8'>
            Track your competency progress by seeing what competency you're contributing to.
          </p>
          <div className='flex flex-row'>
            <div className='flex items-center justify-center mr-2 ml-6'>
              <CompetencyChart
                data={mockComptencyData}
                colors={mockCompetencyColor}
              />
            </div>
            {/* Comptency Course Table */}
            <div className='bg-white rounded-lg border overflow-hidden'>
              <div className='overflow-auto'>
                <table className='rounded-lg'>
                  <thead className='bg-blue-800 text-white p-4 bg-[#00509f]'>
                    <tr>
                      <th className='p-3 text-white text-xs font-semibold  uppercase leading-[18px] text-start '><span className='pl-10'>Competency</span></th>
                      <th className=" p-3 text-white text-xs font-semibold font-['Inter'] uppercase leading-[18px] text-start">NUMBER OF COURSES PER<br /> COMPETENCY</th>
                      <th className="p-3 text-white text-xs font-semibold font-['Inter'] uppercase leading-[18px] text-start">NUMBER OF HOURS PER<br /> COMPETENCY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockComptencyData.map((competency, i) => (
                      <tr key={i} className='border-y hover:bg-gray-50'>
                        <td className='h-[38.82px] p-4 flex items-center gap-2 border-r text-nowrap'>
                          <span className='w-3 h-3 rounded-full' style={{ backgroundColor: mockCompetencyColor[competency.name]}}></span>
                          <span className='ml-4 text-sm font-medium leading-[21px]'>{competency.name}</span>
                          
                        </td>
                        <td className='text-center text-gray-500 text-base font-normal leading-normal border-r '>{competency.courses}</td>
                        <td className='text-center text-gray-500 text-base font-normal leading-normal'>{competency.hours}</td>
                      </tr>
                    ))}
                    <tr className='h-11'>
                      <td className='p-2 border-r '></td>
                      <td 
                        className='p-2 text-gray-500 text-sm font-medium leading-[21px] text-nowrap border-r'>TOTAL NUMBER OF COURSES: {mockComptencyData.reduce((sum, item) => sum + item.courses, 0)}
                      </td>
                      <td
                        className='p-2 text-gray-500 text-sm font-medium leading-[21px] text-nowrap'>TOTAL NUMBER OF HOURS: {mockComptencyData.reduce((sum, item) => sum + item.hours, 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* In Progress and Completed Courses Section */}
        <div className='flex flex-col gap-2 md:flex-row mb-4'>
          <div className='w-1/2'>
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-xl font-semibold -mb-4'>In Progress Courses</h2>
              <CollectionTable
                data={mockInProgressCourses}
                edit={false}
                columns={columns}
                rowsPerPage={5}
              />
            </div>
          </div>
          <div className='w-1/2'>
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-xl font-semibold -mb-4'>Completed Courses</h2>
              <CollectionTable
                data={mockCompletedCourses}
                edit={false}
                columns={columns}
                rowsPerPage={5}
              />
            </div>
          </div>
        </div>
        {/* Learning Phases Section */}
        <div className='bg-white rounded-lg shadow p-4'>
          <h2 className='text-black text-xl font-medium leading-normal'>Learning Plan Progress</h2>
          <p className='text-gray-500 text-base font-normal leading-normal mb-8'>Track your progress on the Learning Journey</p>
          <ProgressCard phases={mockLearningPhases} />
        </div>
     </div>
    </DefaultLayout>
  )
}