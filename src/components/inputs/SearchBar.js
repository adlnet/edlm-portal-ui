'use strict';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { isInputSafe, preventNullChar, preventSearchSpecialChars } from '@/utils/charsValidation';

export default function SearchBar({ parameters, onChange, onClick, placeholder = 'Search for Learning Content' }) {

  const checkSpecialChar = (e) => {
    preventNullChar(e);
    preventSearchSpecialChars(e);
  };

  return (
    <form
      id='search-courses'
      onSubmit={(event) => {
        event.preventDefault();
        if (!isInputSafe(parameters.keyword)) {
          console.error('Invalid characters detected');
          return;
        }

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
        placeholder={placeholder}
        maxLength="128"
        onKeyDown={(e)=>checkSpecialChar(e)}
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

