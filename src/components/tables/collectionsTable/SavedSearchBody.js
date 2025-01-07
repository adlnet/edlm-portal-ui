'use strict'

import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useDeleteSavedSearch } from '@/hooks/useDeleteSavedSearch';

const TableBody = ({ tableData, columns}) => {
    
    const { user } = useAuth();
    const { mutate } = useDeleteSavedSearch(user?.token);

    return (
     <tbody className=''>
      {tableData.map((data, index) => {
       return (
        // Creating all rows for the data
        <tr key={data.id} 
            className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } h-12 w-full p-2 items-center border shadow`}
        >
         {columns.map(({ accessor }) => {
            // Specific row creation for name in saved search 
            if (accessor === 'name'){
                const tData = data[accessor] ? data[accessor] : "——";

                return (
                    <td key={accessor} className='pl-4 hover:text-[#3892F3] hover:underline'>
                        <Link href={`${data.query}`} passHref className=''>
                            {tData}
                        </Link>
                    </td>
                );
            }
            
            // Specific row creation for query in saved search
            else if (accessor === 'query'){
                const tData = data[accessor] ? data[accessor] : "——";
                if (tData === "——")
                    return <td key={accessor} className='pl-4'>——</td>
                else
                    return <td key={accessor} className='pl-4' >{new URLSearchParams(tData).get('/learner/search?keyword')}</td>;
            }
         })}

        {/* Trash Icon for delete function (fix link)*/}
         <div className='text-right items-center pt-4 pr-4 text-[#135F9B]'>
          <button
           onClick={() => mutate({ id: data.id })}
           id='delete'
           title='delete'
           className=''
           >
            <TrashIcon className='h-5 w-5'/>
          </button>
         </div>
         
        </tr>
       );
      })}
     </tbody>
    );
   };
   
export default TableBody;