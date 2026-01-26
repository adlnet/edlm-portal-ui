'use strict';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Popover } from "flowbite-react";
import { searched } from '@/utils/xapi/events';
import { unstable_batchedUpdates } from 'react-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { useCompetencySearch} from '@/hooks/useCompetencySearch';
import { useCourseSearch} from '@/hooks/useCourseSearch';
import { useRouter } from 'next/dist/client/router';
import CreateSavedSearchModal from '@/components/modals/CreateSavedSearch';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import SearchBar from '@/components/inputs/SearchBar';
import SearchCompetencies from '@/components/SearchCompetencies';
import SearchCourses from '@/components/SearchCourses';
import SelectList from '@/components/inputs/SelectList';
import TabBar from '@/components/buttons/TabBar';

export default function Search() {

  const router = useRouter();
  const [params, setParams] = useState(router?.query);
  const { setUrl, data, isLoading } = useCourseSearch();
  const { user } = useAuth();
  
  const { competencies: Competencies, isLoading: isLoadingCompetencies } = useCompetencySearch();

  const tabs = ['Courses', 'Competencies'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const [showPopover, setShowPopover] = useState(true);

  const [successMessage, setSuccessMessage] = useState(null);
  const [failMessage, setFailMessage] = useState(null);

  useEffect(() => {
    if (router?.query) {
      unstable_batchedUpdates(() => {
        setParams(router?.query);
        setUrl(router?.query);
      });

      // if tab=competencies, switch to Competencies tab
      if (router.query.tab === 'competencies') {
        setSelectedTab(tabs[1]);
      }
    }
  }, [router.query]);

  useEffect(() => {
    // Set a timeout to hide the popover after 2 seconds
    const timer = setTimeout(() => {
      setShowPopover(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []); 

  function handleChange(event) {
    setParams((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function handleListSelect(event) {
    if (params.keyword && params.keyword !== '') {
      const modified = { ...params };
      modified[event.target.name] = event.target.value;
      modified.p = 1;
      unstable_batchedUpdates(() => {
        setUrl(modified);
        setParams(modified);
      });
      router.push({ pathname: '/edlm-portal/learner/search', query: modified });
    }
  }

  const handleSearch = useCallback(
    (event) => {
      event.preventDefault();

      // if there is a key word
      if (!params.keyword || params.keyword === '') return;

      // set the start page to 1
      const modified = { ...params };
      modified.p = 1;

      unstable_batchedUpdates(() => {
        setParams(modified);
        setUrl(modified);
      });

      searched(modified.keyword);

      router.push({ pathname: '/edlm-portal/learner/search', query: modified });
    },
    [params, user]
  );

  function handleCompetencyTag(comp){
    setSelectedTab(tabs[1])

    // DOT&E Specific changes for proper matching 
    comp = comp.replace(' & ',' and ')    
    comp = comp.replace('Env', 'Environment')

    const modified = { ...params, keyword: comp };
    modified.p = 1;

    router.push({ pathname: '/edlm-portal/learner/search', query: modified });
  }

  function createLists() {
    if (!data?.aggregations) return null;

    const { aggregations } = data;
    const keys = Object?.keys(aggregations);

    return keys?.map((key) => {
      const localData = aggregations?.[key];
      if (!localData || !localData.buckets || localData.buckets.length === 0) return null;
      return (
        <SelectList
          key={key + localData.field_params}
          initialValue={params[localData.field_name]}
          options={localData}
          keyName={key}
          onChange={handleListSelect}
        />
      );
    });
  }

  return (
    <DefaultLayout>
        <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
          <div className='mt-10 pb-4 py-4'>
            {successMessage ? (
              <div className="flex flex-col p-4 mt-2 mb-4 bg-green-100 rounded-lg w-full"> 
                <div className="flex flex-row justify-between pb-2">
                  <div className="flex flex-row items-center">
                    <CheckCircleIcon className="w-6 h-6 text-green-900"/>
                    <div className="text-lg text-green-900 font-bold pl-2">Course saved to learning plan</div>
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss"
                    className=""
                    onClick={()=>{setSuccessMessage(null)}}
                  >
                    <XMarkIcon class='w-6 h-6 text-green-900' />
                  </button>
                </div>
                <div className="text-green-900 text-medium">
                    {successMessage}
                </div>

              </div>
            ) : (
              <></>
            )}
            {failMessage ? (
              <div className="flex flex-col p-4 mt-2 mb-4 bg-red-100 rounded-lg w-full"> 
                <div className="flex flex-row justify-between pb-2">
                  <div className="flex flex-row items-center">
                    <XCircleIcon className="w-6 h-6 text-red-900"/>
                    <div className="text-lg text-red-900 font-bold pl-2">Course failed to save to learning plan</div>
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss"
                    className=""
                    onClick={()=>{setFailMessage(null)}}
                  >
                    <XMarkIcon class='w-6 h-6 text-red-900' />
                  </button>
                </div>
                <div className="text-red-900 text-medium">
                    {failMessage}
                </div>

              </div>
            ) : (
              <></>
            )}

            {selectedTab === tabs[0] ? <div className='text-2xl font-bold'>Course Search</div> : <div className='text-2xl font-bold'>Competency Search</div>}
            
            <div className='py-4'>
              <TabBar
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              tabs={tabs}
              loaded={Competencies.length === 0}
            />
          </div>
          <div className='flex flex-col md:flex-row -mb-1 max-w-min sticky top-0 z-10 bg-white pb-2'>
            <Popover
                trigger='hover'
                open={showPopover}
                onOpenChange={(isOpen) => setShowPopover(isOpen)}
                content={
                  <div className="w-64 text-sm text-gray-500 rounded-lg dark:text-gray-400">
                    <div className="border-b border-gray-200 bg-blue-700 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                      <h3 id="default-popover" className="font-semibold bg-blue-700 text-white dark:text-white">Search for Courses Here</h3>
                    </div>
                    <div className="px-3 py-2">
                      <p>Search by key topics such as: </p>
                      <ul className="list-disc list-inside"> 
                        <li> Testing </li>
                        <li> Acquisition </li>
                        <li> Artificial Intelligence </li>
                      </ul>
                    </div>
                  </div>
                }
                placement="right"       
              >
                <div className='flex-grow w-[22rem] xl:w-[44rem]'>
                  <SearchBar
                    parameters={params}
                    onChange={handleChange}
                    onClick={handleSearch}
                    placeholder='Search for Learning Content'
                  />
                </div>
            </Popover>
            {data && !isLoading && selectedTab === 'Courses' && (
              <div className='flex flex-row my-3 -mx-2 md:my-0 md:mx-0 xl:flex-row gap-2 pl-2'>{data && createLists()}</div>
            )}
            <div className='self-start flex -mt-0  md:mt-2.5 ml-2 -my-2'>
              {selectedTab === 'Courses' && user && <CreateSavedSearchModal path={router.asPath} />}
              <button 
                title='Clear Search'
                onClick= {() => 
                  setParams((prev) => ({ ...prev, keyword: '' }),
                  router.push({ pathname: '/edlm-portal/learner/search' })
                )}
                className="italic text-sm font-sans text-[#3892f3] underline whitespace-nowrap"
                >     
                Clear Search
              </button>
            </div>
        </div>
        <div className='py-2'>
          {selectedTab === tabs[0] ?
            <SearchCourses 
              params={params}
              setParams={setParams}
              handleCompetencyTag={handleCompetencyTag}
              setSuccessMessage={setSuccessMessage}
              setFailMessage={setFailMessage}
            /> : 
            <SearchCompetencies 
              Competencies={Competencies}
              isLoading={isLoadingCompetencies}
              params={params}
              setParams={setParams}
            />
          }
        </div>
      </div>
      </div>
    </DefaultLayout>
  );
}
