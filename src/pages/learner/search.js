'use strict';

import SearchCourses from '@/components/SearceCourses'; 
import SearchCompetencies from '@/components/SearchCompetencies';

export default function Search() {

  
  return (
    <DefaultLayout>
      {/* TODO: make title, searchbar, filters?, tabs section */}

      {/* call course + comp search */}

      <SearchCourses />

      <SearchCompetencies />

    </DefaultLayout>
  );
}
