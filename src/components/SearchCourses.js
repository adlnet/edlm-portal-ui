'use strict';

import { Pagination } from '@/components/buttons/Pagination';
import { axiosInstance } from '@/config/axiosConfig';
import { candidateList } from '@/config/endpoints';
import { unstable_batchedUpdates } from 'react-dom';
import { useConfig } from '@/hooks/useConfig';
import { useCourseSearch} from '@/hooks/useCourseSearch';
import { useEffect } from 'react';
import { useMoreCoursesLikeThis } from '@/hooks/useMoreCoursesLikeThis';
import { useRouter } from 'next/dist/client/router';
import Carousel from 'react-grid-carousel'
import ContentLoadingAnimate from '@/utils/ContentLoadingAnimate';
import CourseSpotlightCarouselCard from '@/components/cards/CourseSpotlightCarousel';
import MoreLikeThis from '@/components/cards/MoreLikeThis';
import SearchResult from '@/components/cards/CourseSearchResult';
import XMarkMessageToast from '@/components/cards/XMarkMessageToast';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';

export default function SearchCourses( { params, setParams, setSuccessMessage, handleCompetencyTag }) {

    const router = useRouter();
    const config = useConfig();

    const { setUrl, data, isLoading } = useCourseSearch();

    const moreLikeThis = useMoreCoursesLikeThis(data?.hits[0]?.meta.id);
    const spotlight = useSpotlightCourses();
    
    useEffect(() => {
      if (router?.query) {
        unstable_batchedUpdates(() => {
          setParams(router?.query);
          setUrl(router?.query);
        });
      }
    }, [router.query]);

    // for spotlight courses
    useEffect(() => {
      axiosInstance
        .get(candidateList)
        .then((res) => {
          setSpotlightData(res.data);
        })
        .catch((err) => {
            console.log('Sportlight courses error');
        });
    }, []);

    function handleSpecificPage(page) {
      const modified = { ...params };
      modified.p = page;
      unstable_batchedUpdates(() => {
        setParams(modified);
        setUrl(modified);
      });
      router.push({ pathname: '/edlm-portal/learner/search', query: modified }, undefined, {
        scroll: true,
      });
    } 

  // if loading
  if (isLoading) {
    return <ContentLoadingAnimate />;
  }

    return (
      <div className='mt-4 pb-4'>
        <div>
          <div id='search-results' className='col-span-12 grid gap-4 relative'>
            {data && data?.hits?.map((course) => (     
                    <SearchResult result={course} key={course.meta.id} setSuccessMessage={setSuccessMessage} handleCompetencyTag={handleCompetencyTag}/>    
            ))}

            {data && data?.hits?.length === 0 && (
              <div className='flex justify-center'>
                <XMarkMessageToast message='No search results found' />
              </div>
            )}
          </div>
          
          <div className='col-span-1 md:col-span-12 flex flex-col justify-center w-full -mt-4 px-2 max-w-7xl mx-auto'>  
              {moreLikeThis.data?.hits.length !== 0 ?
                <div className="text-[#1b1128] text-2xl font-bold leading-normal mt-12">
                  Similar Courses
                  <div className='flex justify-center w-full overflow-x-hidden my-4'>
                    <div className='inline-flex overflow-x-auto gap-2 px-1 custom-scroll mb-4 pb-4'>    
                      {moreLikeThis.data?.hits?.map((course) => <MoreLikeThis course={course} key={course.meta.id} />)}  
                    </div>
                  </div>  
                </div> :
                <div className="text-[#1b1128] text-2xl font-bold leading-normal mt-6">
                  Spotlight Courses
                  <div className='mt-6'>
                      <Carousel
                          cols={3}
                          rows={1}
                          gap={1}
                          responsiveLayout={[
                              {
                              breakpoint: 1200,
                              cols: 3
                              },
                              {
                              breakpoint: 990,
                              cols: 2
                              }
                          ]}
                          mobileBreakpoint={670}
                      >
                  {spotlight && Array.isArray(spotlight?.data) && spotlight?.data?.map((course) => {
                      return(
                          <Carousel.Item key={course.meta.id}>
                            <div className='flex justify-center w-full overflow-x-hidden mr-4'>
                              <CourseSpotlightCarouselCard course={course} key={course.meta.id} />
                            </div>
                          </Carousel.Item>
                      )
                    })}
                    </Carousel>
                  </div>
                </div>
              }
          </div>
        </div>
        
        <div className='pt-4 sticky bottom-0 -mb-8'>     
            {!isLoading && data && data.total > 0 && (     
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
