'use strict';

export const Pagination = ({ handleSpecificPage, totalPages, currentPage }) => {
  // show the first three pages and the last three pages of the pagination
  // if the total number of pages is less than 3 show them all
  const pages = [];

  // if the minimum number of pages to show is less than one, show just the first page
  // otherwise show the minimum number of pages before the current page
  const start = Math.max(1, Math.min(currentPage - 2));

  // if possible show the 3 pages after the current page
  const end = Math.min(totalPages, currentPage + 2);

  // if the total number of pages is less than 6 show all pages
  // *centers the pages arond the current page*
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className='flex justify-center items-center pb-2'>

      <button
        onClick={() => handleSpecificPage(currentPage - 1)}
        className={`${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'text-blue-500 hover:text-blue-800'} px-4 py-2 border border-[#d6d2db] rounded bg-white`}
        disabled={currentPage === 1 ? true : false}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleSpecificPage(page)}
          className={`${
            currentPage === page
              ? 'bg-[#1f3764] text-white'
              : 'bg-white text-gray-500 hover:bg-gray-100'
          }  px-4 py-2 border border-[#d6d2db] rounded`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handleSpecificPage(currentPage + 1)}
        className={`${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'text-blue-500 hover:text-blue-800'} px-4 py-2 border border-[#d6d2db] rounded bg-white`}
        disabled={totalPages <= currentPage ? true : false}
      >
        Next
      </button>
    </div>

  );
};