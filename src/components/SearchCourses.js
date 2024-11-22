'use strict';

import { Pagination } from '@/components/buttons/Pagination';
import { unstable_batchedUpdates } from 'react-dom';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/dist/client/router';
import { useCourseSearch} from '@/hooks/useCourseSearch';
import MoreLikeThis from '@/components/cards/MoreLikeThis';
import SearchResult from '@/components/cards/CourseSearchResult';
import { useEffect } from 'react';
import ContentLoadingAnimate from '@/utils/ContentLoadingAnimate';

export default function SearchCourses( { params, setParams, courseSearchTriggerd }) {

    const router = useRouter();
    const config = useConfig();

    const { setUrl, data, isLoading } = useCourseSearch();

    useEffect(() => {
      if (router?.query) {
        unstable_batchedUpdates(() => {
          setParams(router?.query);
          setUrl(router?.query);
        });
      }
    }, [router.query]);
  
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
    } if (isLoading) {
      return <ContentLoadingAnimate />;
    }


    // if loading
  if (isLoading) {
    return <ContentLoadingAnimate />;
  }

    return (
      <div className='mt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-12 pt-0 gap-6 md:gap-12'>
          <div id='search-results' className='col-span-12 grid gap-2 relative'>
            {data && data?.hits?.map((course) => (     
              <SearchResult result={course} key={course.meta.id} />    
            ))}  
            {!isLoading && !data && <ContentLoadingAnimate />}     
          </div>
          

          <div className='col-span-1 md:col-span-12 flex flex-col justify-center w-full -mt-4 px-2 max-w-7xl mx-auto'>
            <div className="text-[#1b1128] text-2xl font-bold leading-normal">Similar Courses</div>       
              <div className='inline-flex overflow-x-auto gap-2 pb-4 py-2 custom-scroll'>    
                {data && data?.hits && data?.hits?.map((course) => <MoreLikeThis course={course} key={course.meta.id} />)}  
              </div>   
            </div>   
        </div>
        
        <div className='py-3 sticky bottom-0 -mb-8'>     
            {!isLoading && data && (     
              <Pagination     
                totalPages={Math.ceil(data?.total / config?.data?.search_results_per_page)}    
                handleSpecificPage={handleSpecificPage}    
                currentPage={parseInt(params.p)}     
            />   
          )}     
        </div>  
      </div>     
    );
}