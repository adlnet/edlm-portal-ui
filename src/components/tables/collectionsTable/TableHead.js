'use strict'

import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useState } from "react";

const TableHead = ({ columns, handleSorting }) => {

    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder =
          accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    return (
     <thead className='h-12 items-left px-2 font-sans text-white bg-[#074D85]'>
      <tr className=''>
       {columns.map(({ label, accessor }) => {
        return( 
            <th key={accessor}
                onClick={() => handleSortingChange(accessor)}
                className='text-left pl-4'
                label={accessor}
            >
                <div className='flex items-center h-12'>
                    <div>{label}</div>
                    <div>
                        <button
                            id='sort'
                            title='sort'
                            className='mt-1'
                        >
                            <ChevronUpDownIcon className='h-6 w-6' />    
                        </button>
                    </div>
                </div>
            </th>
        );
       })}
       <div>
        {/* Empty div for trashcan icon */}
       </div>
      </tr>
     </thead>
    );
   };
   
export default TableHead;