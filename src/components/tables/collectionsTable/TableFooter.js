'use strict'

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const TableFooter = ({currentPage, setPage, handlePageChange, totalPages }) => {

    const pageNumbers = [];

    const start = Math.max(1, Math.min(currentPage - 2));
    const end = Math.min(totalPages, (currentPage + 2));

    for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
    }

    const handleLeftClick = () => {
        setPage(currentPage - 1)
        handlePageChange(currentPage - 1)
    }

    const handleRightClick = () => {
        setPage(currentPage + 1)
        handlePageChange(currentPage + 1)
    }

    const handleNumberClick =(pageNum) => {
        setPage(pageNum)
        handlePageChange(pageNum)
    }

    return (
     <tfoot className="flex justify-between items-center bg-white h-14 w-full rounded-b-lg overflow-hidden shadow border-1 px-2 font-sans">
        
        {totalPages < 3 ? 
            <div className='pl-6'>
                Showing <span className='font-bold'>{1}-{totalPages}</span> of {totalPages}
            </div> : 
            <div className='pl-6'>
                Showing <span className='font-bold'>{start}-{end}</span> of {totalPages}
            </div>
        }
        
        <div className='pr-6'>
            <div className='flex justify-center items-center'>
                <button
                    onClick={() => handleLeftClick()}
                    className={`${currentPage === 1 ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white text-blue-900 hover:text-blue-400 hover:border-blue-400'} px-3 py-2 border border-[#d6d2db] rounded`}
                    disabled={currentPage === 1 ? true : false}
                    data-testid='FooterButton'
                >
                    <ChevronLeftIcon class="h-6 w-6" />
                </button>

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handleNumberClick(page)}
                        className={`${
                        currentPage === page
                            ? 'bg-[#1f3764] text-white'
                            : 'bg-white text-gray-500 hover:bg-gray-100'
                        }  px-4 py-2 border border-[#d6d2db] rounded`}
                        data-testid='FooterButton'
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handleRightClick()}
                    className={`${currentPage === totalPages ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'text-blue-900 hover:text-blue-400 hover:border-blue-400'} px-3 py-2 border border-[#d6d2db] rounded bg-white`}
                    disabled={totalPages <= currentPage ? true : false}
                    data-testid='FooterButton'
                >
                    <ChevronRightIcon class="h-6 w-6" />
                </button>
            </div>
        </div>
     </tfoot>
    )
};

export default TableFooter;