'use strict'

import { useEffect } from "react";
import { useState } from "react";

export const useSortableTable = (data) => { 

 const [tableData, setTableData] = useState(data);

 useEffect(() => {
  setTableData(data);
 }, [data])

 const handleSorting = (sortField, sortOrder) => {

  if (sortField && sortField !== 'date') {
   const sorted = [...tableData].sort((a, b) => {
    if (a[sortField] === null) return 1;
    if (b[sortField] === null) return -1;
    if (a[sortField] === null && b[sortField] === null) return 0;
    return (
     a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
      numeric: true,
     }) * (sortOrder === "asc" ? 1 : -1)
    );
   });
   setTableData(sorted);
  }
  else if (sortField === 'date'){
    const sorted = [...tableData].sort((a, b) => {
     if (a[sortField] === null) return 1;
     if (b[sortField] === null) return -1;
     if (a[sortField] === null && b[sortField] === null) return 0;
     const date_a = new Date(a[sortField])
     const date_b = new Date(b[sortField])
     return( 
        (date_a - date_b) * (sortOrder === "asc" ? 1 : -1)
     );
    });
    setTableData(sorted);
  }
 };

 return [tableData, handleSorting];
};