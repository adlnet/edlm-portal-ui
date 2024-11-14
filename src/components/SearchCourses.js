'use strict';

import { Pagination } from '@/components/buttons/Pagination';
import { unstable_batchedUpdates } from 'react-dom';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/dist/client/router';
import { useCourseSearch} from '@/hooks/useCourseSearch';
import MoreLikeThis from '@/components/cards/MoreLikeThis';
import SearchResult from '@/components/cards/CourseSearchResult';

export default function SearchCourses( { params, setParams }) {

    const router = useRouter();
    const config = useConfig();

    const { setUrl, data, isLoading } = useCourseSearch();
  
    function handleSpecificPage(page) {
      const modified = { ...params };
      modified.p = page;
      unstable_batchedUpdates(() => {
        setParams(modified);
        setUrl(modified);
      });
      router.push({ pathname: '/learner/search', query: modified }, undefined, {
        scroll: true,
      });
    }
  
    return (
      <div className='mt-10 pb-4'>
        {/* {data?.total > 0 && (
          <span className={'text-gray-400 italic pt-12 font-sans px-px'}>
            About {data.total} results.
          </span>
        )} */}
        <div className={'grid grid-cols-12 pt-2 gap-12 '}>
          <div id='search-results' className={'col-span-8 grid gap-8 relative'}>
            {data &&
              data?.hits?.map((course) => (
                <SearchResult result={course} key={course.meta.id} />
              ))}
            <div className='py-8 sticky bottom-0 bg-gradient-to-t from-gray-50 mb-8'>
              {!isLoading && data && (
                <Pagination
                  totalPages={Math.ceil(
                    data?.total / config?.data?.search_results_per_page
                  )}
                  handleSpecificPage={handleSpecificPage}
                  currentPage={parseInt(params.p)}
                />
              )}
            </div>
          </div>
          <div className='relative col-span-4'>
            <div className='sticky top-48'>
              {data && data?.hits && <MoreLikeThis course={data?.hits[0]} />}
            </div>
          </div>
        </div>
      </div>
    );
}