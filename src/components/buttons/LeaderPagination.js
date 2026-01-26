'use-strict'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline';

import React from "react";

/**
 * A reusable, screenshot-matching pagination for your table.
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {function(page)}
 */

export function Pagination({ currentPage, totalPages, onPageChange }) {
  let pages = [];
  if (totalPages <= 4) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } 
  else if (currentPage <= 2){
  // Case: first 3 pages
    pages = [1,2,3,"...", totalPages];
  } 
  else if (currentPage >= totalPages-2) {
    pages = [1, "...", totalPages-2, totalPages-1, totalPages];
  } 
  else {
    pages = [1, "...", currentPage, currentPage + 1, "...", totalPages];
  }

  // Ensure only integers for page clicks
  const isCurrent = (num) => Number(num) === currentPage + 1;
  return (
    <div className="flex items-center justify-center">
      <button
        className={`px-2 h-8 text-gray-400 hover:text-blue-600 font-bold rounded-l-md disabled:opacity-50 border border-gray-300`}
        disabled={currentPage===0}
        onClick={() => onPageChange(currentPage-1)}
        aria-label="Previous page"
      >
        <ChevronLeftIcon class="h-4 w-4 text-gray-900"/>
      </button>
      {pages.map((p,i) =>
        typeof p === "number" ? (
          <button
            key={p}
            onClick={() => onPageChange(p-1)}
            className={
              `w-9 h-8 font-medium border border-gray-300
              ${isCurrent(p) ? "bg-blue-50 text-blue-700 shadow-sm pointer-events-none" : "bg-white text-gray-700 hover:bg-blue-50"}`
            }
            aria-current={isCurrent(p) ? "page" : undefined}
          >
            {p}
          </button>
        ) : (
          <div
            key={"ellipses"+i}
            className="w-9 h-8 pt-2 text-center text-gray-400 select-none pointer-events-none border border-gray-300"
          >...</div>
        )
      )}
      <button
        className={`px-2 h-8 text-gray-400 hover:text-blue-600 rounded-r-md font-bold disabled:opacity-50 border border-gray-300`}
        disabled={currentPage+1 >= totalPages}
        onClick={() => onPageChange(currentPage+1)}
        aria-label="Next page"
      >
        <ChevronRightIcon class="h-4 w-4 text-gray-900"/>
      </button>
    </div>
  );
}