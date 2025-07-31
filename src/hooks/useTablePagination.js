'use strict'

import { useEffect, useState } from "react";

export const useTablePagination = (setPage, tableData, rowsPerPage) => { 

    const [pageData, setPageData] = useState(tableData.slice(0,rowsPerPage));

    useEffect(() =>{
        setPageData(tableData.slice(0,rowsPerPage))
        setPage(1)
    }, [tableData])
    
    const handlePageChange = (pageNumber) =>{
        setPageData(tableData.slice((pageNumber-1)*rowsPerPage, ((pageNumber-1)*rowsPerPage) + rowsPerPage))
    }

    return [pageData, handlePageChange];
};