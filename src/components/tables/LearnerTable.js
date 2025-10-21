import React, { useMemo, useState } from "react";

const learnerData = [
  { lastName: "McConnell", firstName: "Kase", coursesTaken: "210", mostRecentCourse: "Program Test & Evaluation Strategy (TES)", status: "In Progress" },
  { lastName: "Simmons", firstName: "Everlee", coursesTaken: "210", mostRecentCourse: "F-35 Systems Testing Protocols", status: "In Progress" },
  { lastName: "Heath", firstName: "Tristan", coursesTaken: "210", mostRecentCourse: "Quality Control Graphics and Charting", status: "In Progress" },
  { lastName: "Wolfe", firstName: "Elliana", coursesTaken: "210", mostRecentCourse: "Growing as an Acquisition Leader", status: "In Progress" },
  { lastName: "Reilly", firstName: "Seven", coursesTaken: "210", mostRecentCourse: "Intro to DOT&E", status: "Completed" },
  { lastName: "Wang", firstName: "Raelyn", coursesTaken: "210", mostRecentCourse: "Scientific Test and Analysis Techniques in T&E", status: "Completed" },
  { lastName: "Campos", firstName: "Jordyn", coursesTaken: "210", mostRecentCourse: "Data Analysis, Not Data Analytics", status: "Completed" },
  { lastName: "Fuentes", firstName: "Daxton", coursesTaken: "210", mostRecentCourse: "Data Analysis, Not Data Analytics", status: "In Progress" },
  { lastName: "Brennan", firstName: "Emmett", coursesTaken: "210", mostRecentCourse: "Senior Leader Requirements Course (CLRM)", status: "In Progress" },
  { lastName: "Smith", firstName: "Avery", coursesTaken: "210", mostRecentCourse: "Defense Planning Workshop", status: "Completed" }
];

const statusStyles = {
  "In Progress": "bg-blue-100 text-blue-700 font-semibold rounded px-3 py-1 inline-block text-xs",
  "Completed": "bg-green-100 text-green-700 font-semibold rounded px-3 py-1 inline-block text-xs",
  "Not Started": "bg-gray-100 text-gray-700 font-semibold rounded px-3 py-1 inline-block text-xs"
};

const maxRowsToShow = 8;

export default function LearnerTable() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("lastName");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

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
  const handleSearch = e => setSearch(e.target.value);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 mt-8 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-5">Learner Overview</h2>
      <div className="flex items-center mb-5">
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search for a Learner"
          className="w-64 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <button
          className="ml-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded px-2 py-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th
                className="py-3 px-4 font-medium cursor-pointer select-none"
                onClick={() => onSort("lastName")}
              >
                LAST NAME {sortKey === "lastName" ? (sortDir === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                className="py-3 px-4 font-medium cursor-pointer select-none"
                onClick={() => onSort("firstName")}
              >
                FIRST NAME {sortKey === "firstName" ? (sortDir === "asc" ? "▲" : "▼") : ""}
              </th>
              <th className="py-3 px-4 font-medium">COURSES TAKEN</th>
              <th className="py-3 px-4 font-medium">MOST RECENT COURSE</th>
              <th className="py-3 px-4 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {paged.length > 0 ? (
              paged.map((l, idx) => (
                <tr key={idx} className={idx % 2 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-3 px-4">{l.lastName}</td>
                  <td className="py-3 px-4">{l.firstName}</td>
                  <td className="py-3 px-4">{l.coursesTaken}</td>
                  <td className="py-3 px-4">{l.mostRecentCourse}</td>
                  <td className="py-3 px-4">
                    <span className={statusStyles[l.status] || statusStyles["Not Started"]}>{l.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 px-4" colSpan={5}>No learners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-5 text-sm">
        <span className="mr-5">Showing: {paged.length}</span>
        <div className="flex items-center">
          {Array.from({ length: Math.min(pages, 3) }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              disabled={page === i + 1}
              className={`mx-1 px-3 py-1 rounded ${page === i + 1 ? "bg-blue-100 text-blue-700 font-semibold" : "bg-gray-100 text-gray-700"}`}
            >{i + 1}</button>
          ))}
          {pages > 3 &&
            <>
              <span className="mx-1">...</span>
              <button
                className={`px-3 py-1 rounded ${page === pages ? "bg-blue-100 text-blue-700 font-semibold" : "bg-gray-100 text-gray-700"}`}
                onClick={() => setPage(pages)}
                disabled={page === pages}
              >{pages}</button>
            </>}
          <form
            onSubmit={jumpToPage}
            className="flex items-center ml-5"
          >
            <span className="mr-1">Jump to:</span>
            <input
              name="pageinput"
              type="number"
              min="1"
              max={pages}
              className="w-12 px-2 py-1 rounded border border-gray-300 mr-1"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-3 py-1 font-semibold"
            >GO</button>
          </form>
        </div>
      </div>
    </div>
  );
}