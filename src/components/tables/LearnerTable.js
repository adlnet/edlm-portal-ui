'use-strict'
import {ChevronDownIcon, ChevronUpIcon, XMarkIcon} from '@heroicons/react/16/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Pagination } from '../buttons/LeaderPagination';
import React, { useMemo, useRef, useState } from "react";

const statusStyles = {
  "In Progress": "bg-blue-100 text-blue-700 font-semibold rounded px-3 py-1 inline-block text-xs",
  "Completed": "bg-green-100 text-green-700 font-semibold rounded px-3 py-1 inline-block text-xs",
  "Not Started": "bg-gray-100 text-gray-700 font-semibold rounded px-3 py-1 inline-block text-xs"
};

const maxRowsToShow = 8;

const LearnerTable = ({learnerData}) => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("lastName");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const inputRef = useRef();

  const filtered = useMemo(() => {
    if (!search.trim()) return learnerData;
    return learnerData.filter(l =>
      (l.firstName + " " + l.lastName + " " + l.mostRecentCourse)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const sorted = useMemo(() => {
    let arr = [...filtered];
    arr.sort((a, b) => {
      const valA = a[sortKey].toLowerCase ? a[sortKey].toLowerCase() : a[sortKey];
      const valB = b[sortKey].toLowerCase ? b[sortKey].toLowerCase() : b[sortKey];
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const pages = Math.ceil(sorted.length / maxRowsToShow);
  const paged = useMemo(() =>
    sorted.slice((page - 1) * maxRowsToShow, page * maxRowsToShow), [sorted, page]);

  const onSort = key => {
    if (sortKey === key) setSortDir(d => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const jumpToPage = e => {
    e.preventDefault();
    let val = +e.target.pageinput.value;
    if (!isNaN(val) && val > 0 && val <= pages) setPage(val);
  };

  const doSearch = () => {
    setSearch(input);
    setPage(1);
  };

  const clearInput = () => {
    setInput("");
    setSearch("");
    inputRef.current && inputRef.current.focus();
    setPage(1);
  };

  return (
    <div className="bg-white p-6 mb-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Learner Overview</h2>
      <div className="relative w-1/3 flex items-center mb-5">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search for a Learner"
          className={
            `w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none transition-colors duration-150 ${
              input.length === 0 ? "bg-gray-100" : "bg-white"
            }`
          }
        />
        {input && 
          <button 
            className="text-gray-400 hover:text-gray-700 absolute right-12 top-1/2 -translate-y-1/2"
            onClick={clearInput}
            aria-label="Clear search"
            tabIndex={-1}
            type="button"
            style={{ padding: 0, lineHeight: 0 }}
          >
            <XMarkIcon class='h-4 w-4'/>
          </button>
        }
        <button
          className="ml-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg px-2 py-2"
          onClick={doSearch}
          aria-label='Search'
        >
          <MagnifyingGlassIcon class='h-4 w-4 text-blue-900'/>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th
                className="py-4 px-4 cursor-pointer select-none"
                onClick={() => onSort("lastName")}
              >
                <div className='flex flex-row items-center'>
                  LAST NAME {sortKey === "lastName" ? (sortDir === "asc" ? 
                  <div className='flex flex-col m-0 pl-2'> 
                    <ChevronUpIcon className='h-5 w-5 text-gray-900'/>
                    <ChevronDownIcon className='h-5 w-5 text-gray-400 -mt-3'/> 
                  </div> : 
                  <div className='flex flex-col m-0 pl-2'> 
                    <ChevronUpIcon className='h-5 w-5 text-gray-400'/>
                    <ChevronDownIcon className='h-5 w-5 text-gray-900 -mt-3'/> 
                  </div>) : 
                  <div className='flex flex-col m-0 pl-2'> 
                    <ChevronUpIcon className='h-5 w-5 text-gray-400'/>
                    <ChevronDownIcon className='h-5 w-5 text-gray-400 -mt-3'/> 
                  </div>}
                </div>
              </th>
              <th
                className="py-4 px-4 font-medium cursor-pointer select-none"
                onClick={() => onSort("firstName")}
              >
                <div className='flex flex-row items-center'>
                  FIRST NAME {sortKey === "firstName" ? (sortDir === "asc" ?             
                  <div className='flex flex-col m-0 pl-2'> 
                    <ChevronUpIcon className='h-5 w-5 text-gray-900'/>
                    <ChevronDownIcon className='h-5 w-5 text-gray-400 -mt-3'/> 
                  </div> : 
                  <div className='flex flex-col m-0 pl-2'> 
                    <ChevronUpIcon className='h-5 w-5 text-gray-400'/>
                    <ChevronDownIcon className='h-5 w-5 text-gray-900 -mt-3'/> 
                  </div>) : 
                  <div className='flex flex-col m-0 pl-2'> 
                    <ChevronUpIcon className='h-5 w-5 text-gray-400'/>
                    <ChevronDownIcon className='h-5 w-5 text-gray-400 -mt-3'/> 
                  </div>}
                </div>
              </th>
              <th className="py-4 px-4 font-medium">COURSES TAKEN</th>
              <th className="py-4 px-4 font-medium">MOST RECENT COURSE</th>
              <th className="py-4 px-4 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {paged.length > 0 ? (
              paged.map((l, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-5 px-4">{l.lastName}</td>
                  <td className="py-5 px-4">{l.firstName}</td>
                  <td className="py-5 px-4">{l.coursesTaken}</td>
                  <td className="py-5 px-4">{l.mostRecentCourse}</td>
                  <td className="py-5 px-4">
                    <span className={statusStyles[l.status] || statusStyles["Not Started"]}>{l.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-5 px-4" colSpan={5}>No learners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between items-center mt-6 text-sm">
        {paged.length == maxRowsToShow ? 
          <div className="mr-5">Showing: {(maxRowsToShow*page - maxRowsToShow) + 1} - {maxRowsToShow*page} of {filtered.length}</div>:
          <div className="mr-5">Showing: {(filtered.length - paged.length) + 1} - {filtered.length} of {filtered.length}</div>
        }
        <div className="flex items-center">
          <Pagination
            currentPage={page - 1}
            totalPages={pages}
            onPageChange={pg => setPage(pg + 1)}
          />
          <form
            onSubmit={jumpToPage}
            className="flex items-center ml-3"
          >
            <span className="mr-2">Jump to:</span>
            <input
              name="pageinput"
              type="number"
              min="1"
              max={pages}
              className="w-14 px-2 py-1 rounded border border-gray-300 mr-1"
            />
            <button
              type="submit"
              className="bg-[#00509F] text-white rounded px-3 py-1 font-semibold"
            >GO</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LearnerTable;