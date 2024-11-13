'use strict';

import SearchCourses from '@/components/SearchCourses'; 
// import SearchCompetencies from '@/components/SearchCompetencies';
import DefaultLayout from '@/components/layouts/DefaultLayout';

export default function Search() {

  
  return (
    <DefaultLayout>
      {/* TODO: make title, searchbar, filters?, tabs section */}

      {/* call course + comp search */}

      <SearchCourses />

      {/* <SearchCompetencies /> */}

    </DefaultLayout>
  );
}
