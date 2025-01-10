'use strict'

import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const TableBody = ({ pageData, columns, deleteCourse}) => {
    
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

                return (
                    <td key={accessor} className='pl-4 hover:text-[#3892F3] hover:underline'>
                        <Link href={`/learner/course/${data.id}`} passHref className=''>
                            {tData}
                        </Link>
                    </td>
                );
            }

            // Specific row creation for date in collection tables
            else if (accessor === 'date'){
                if (data[accessor]){
                    const tData = data[accessor] 
                    const date = new Date(tData).toLocaleDateString()
                    return <td key={accessor} className='pl-4' >{date}</td>;
                }
                else{
                    return <td key={accessor} className='pl-4'>——</td>;
                }
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