'use strict'

import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const TableBody = ({ pageData, columns, deleteCourse, url}) => {
    
    return (
     <tbody className='w-full'>
      {pageData?.map((data, index) => {
       return (

        // Creating all rows for the data
        <tr key={data.id} 
            className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } h-12 w-full p-2 items-center border shadow`}
        >
         {columns.map(({ accessor }) => {
            // Specific row creation for title in Collection tables 
            if (accessor === 'title'){
                const tData = data[accessor] ? data[accessor] : "——";
                
                // This is used to handle unclickable rows
                if (data.isUnClickable) {
                    return (
                        <td key={accessor} className='pl-4'>
                            {tData}
                        </td>
                    );
                }

                const linkUrl = url
                    ? url(data)
                    : data.url || `/edlm-portal/learner/course/${data.id}`;

                return (
                    <td key={accessor} className='pl-4 hover:text-[#3892F3] hover:underline'>
                        <Link href={linkUrl} passHref className=''>
                            {tData}
                        </Link>
                    </td>
                );
            }

            // Specific row creation for date in collection tables
            else if (accessor === 'date'){
                const tData = data[accessor] ? new Date(data[accessor]).toLocaleDateString() : "——"
                return <td key={accessor} className='pl-4' >{tData}</td>;
            }

            // Specific row creation for competencies in tables
            else if (accessor === 'competencies'){
                const competencies = data[accessor];
                if (!competencies || competencies.length === 0) {
                    return <td key={accessor} className='pl-4'>——</td>;
                }
                return (
                    <td key={accessor} className='pl-4'>
                        <div className="flex gap-2 flex-wrap">
                            {competencies.map((comp) => (
                                <div key={comp} className="w-auto h-7 px-[15px] py-1.5 bg-[#e5efff] rounded-xl justify-center items-center gap-2 flex">
                                    <div className="text-center text-[#3892f3] text-sm font-normal font-['Roboto'] leading-tight whitespace-nowrap">
                                        {comp}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </td>
                );
    }

            else{
                const tData = data[accessor] ? data[accessor] : "——";
                return <td key={accessor} className='pl-4' >{tData}</td>; 
            }
         })}

        {/* Trash Icon for delete function (fix link)*/}
            {deleteCourse != null ?
             <div className='text-right items-center pt-4 pr-4 text-[#135F9B]'>
              <button
                onClick={() => deleteCourse(data.id)}
                id='delete'
                title='delete'
                className=''
              >
               <TrashIcon className='h-5 w-5'/>
              </button>
             </div> :
            
             <></>
            }
        </tr>
       );
      })}
     </tbody>
    );
   };
   
export default TableBody;
