'use strict'

import { useSortableTable } from "@/hooks/useSortableTable";
import { useState } from "react";
import { useTablePagination } from "@/hooks/useTablePagination";
import TableBody from "./CollectionBody";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";

const CollectionTable = ({data, columns, deleteCourse, rowsPerPage}) => {

 // Setting data to a state where it can be sorted
 const [tableData, handleSorting] = useSortableTable(data);

 // Generating and calling proper functions to enable pagination of the table
 const [currentPage, setPage] = useState(1);
 const totalPages = Math.ceil(data?.length / rowsPerPage)
 const [pageData, handlePageChange] = useTablePagination(setPage, tableData, rowsPerPage);

 return (
  <>
   <table className="table mt-7 pb-5 w-full rounded-t-lg overflow-hidden shadow border-1 px-2 font-sans">
    <TableHead columns={columns} handleSorting={handleSorting} />
    {rowsPerPage > 0 ? 
     <TableBody columns={columns} pageData={pageData} deleteCourse={deleteCourse} /> :
     <TableBody columns={columns} pageData={tableData} deleteCourse={deleteCourse} />
    }
   </table>
   {rowsPerPage > 0 ?
    <TableFooter currentPage={currentPage} setPage={setPage} handlePageChange={handlePageChange} totalPages={totalPages}/>:
    <></>
   }
   
  </>
 );
};

export default CollectionTable;