'use strict'

import { useSortableTable } from "@/hooks/useSortableTable";
import TableBody from "./SavedSearchBody";
import TableHead from "./TableHead";

const SavedSearchTable = ({data, columns}) => {

 const [tableData, handleSorting] = useSortableTable(data);

 return (
  <>
   <table className="table mt-7 pb-5 w-full rounded-lg overflow-hidden shadow border-1 px-2 font-sans">
    <TableHead {...{ columns, handleSorting }} />
    <TableBody {...{ columns, tableData}} />
   </table>
  </>
 );
};

export default SavedSearchTable;