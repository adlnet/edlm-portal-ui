'use strict';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchBar({ parameters, onChange, onClick, onReset }) {
  const checkSpecialChar = (e) => {
    if(/[<>/?+={};#$%&*()`~\\]/.test(e.key)){
     e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (onClick) onClick(event);
      }}

      className='relative w-full max-w-3xl h-[37px] flex items-center inline-flex border border-[#d6d2db]  rounded-lg overflow-hidden shadow-md'>
        <div className='absolute left-3 flex items-center pointer-events-none'>
          <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
        </div>
      <input
        id='search-bar'
        value={parameters.keyword}
        name='keyword'
        type='text'
        className="flex-1 pl-10 text-gray-500 text-sm font-normal outline-none bg-transparent border-none"
        onChange={onChange}
        autoComplete='off'
        placeholder='Search for Learning Content'
        maxLength="128"
        onKeyPress={(e)=>checkSpecialChar(e)}
      />
        <button
          title='Search'
          type='submit'
          className="h-full px-4 bg-blue-900 text-white text-sm font-medium"
        >
          Search
        </button>

    </form>
  );
}

