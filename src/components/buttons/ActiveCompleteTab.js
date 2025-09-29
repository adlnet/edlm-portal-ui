'use strict';

import React, { useState } from 'react';

export default function ActiveCompleteTab({ tabs, activeIndex, setActiveIndex, onChange }) {

  const handleTabClick = (idx) => {
    setActiveIndex(idx);
    if (onChange) onChange(idx);
  };

  return (
    <div className="flex items-end border-b border-gray-200 mb-4">
      {tabs.map((tab, idx) => (
        <button
          key={tab.label}
          className={`
            group
            flex items-center mr-7 pb-1 outline-none bg-transparent
            ${activeIndex === idx
              ? 'border-b-2 border-sky-500 text-sky-600 font-semibold'
              : 'border-b-2 border-transparent text-gray-800 font-normal hover:text-sky-600'
            }
            transition-all duration-150
          `}
          onClick={() => handleTabClick(idx)}
        >
          <span>
            {tab.label}
          </span>
          <span
            className={`
              ml-2 px-2 py-0.5 rounded-md text-xs leading-5
              ${activeIndex === idx
                ? 'bg-sky-100 text-sky-600'
                : 'bg-sky-50 text-sky-400'
              }
              font-medium
            `}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
