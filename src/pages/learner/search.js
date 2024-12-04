'use strict';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/dist/client/router';
import { useCourseSearch} from '@/hooks/useCourseSearch';
import { useCompetencySearch} from '@/hooks/useCompetencySearch';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import { unstable_batchedUpdates } from 'react-dom';
import SearchCourses from '@/components/SearchCourses'; 
import SearchCompetencies from '@/components/SearchCompetencies';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import TabBar from '@/components/buttons/TabBar';
import SearchBar from '@/components/inputs/SearchBar';
import SelectList from '@/components/inputs/SelectList';
import CreateSavedSearchModal from '@/components/modals/CreateSavedSearch';

export default function Search() {

  const router = useRouter();
  const [params, setParams] = useState(router?.query);
  const { setUrl, data, isLoading } = useCourseSearch();
  const { user } = useAuth();
  const { Competencies } = useCompetencySearch();

  const tabs = ['Courses', 'Competencies'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    if (router?.query) {
      unstable_batchedUpdates(() => {
        setParams(router?.query);
        setUrl(router?.query);
      });
    }
  }, [router.query]);

  function handleChange(event) {
    setParams((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function handleClear(key) {
    if (params[key] && params.keyword && params.keyword !== '') {
      const modified = { ...params };
      delete modified[key];
      delete modified['undefined'];

      modified.p = 1;
      setParams(modified);
      setUrl(modified);

      router.push({ pathname: '/learner/search', query: modified });
    }
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
      router.push({ pathname: '/learner/search', query: modified });
    }
  }

  function handleReset(key) {
    setParams((prev) => ({ ...prev, [key]: '' }));
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

      const context = {
        actor: {
          first_name: user?.user?.first_name,
          last_name: user?.user?.last_name,
        },
        verb: {
          id: 'https://w3id.org/xapi/acrossx/verbs/searched',
          display: 'searched',
        },
        object: {
          definitionName: 'ECC Search Capability',
        },
        resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
        resultExtValue: modified.keyword,
      };

      xAPISendStatement(context);

      router.push({ pathname: '/learner/search', query: modified });
    },
    [params, user]
  );

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
          onClear={handleClear}
        />
      );
    });
  }

  return (
    <DefaultLayout>
        <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
          <div className='mt-10 pb-4 py-4'>
            {selectedTab === tabs[0] ? <div className='text-2xl font-bold'>Course Search</div> : <div className='text-2xl font-bold'>Competency Search</div>}
            
            <div className='py-4'>
              <TabBar
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              tabs={tabs}
            />
          </div>
          <div className='flex flex-col md:flex-row -mb-1 max-w-min sticky top-0 z-10 bg-white'>
            <div className='flex-grow w-[22rem] xl:w-[44rem]'>
              <SearchBar
                parameters={params}
                onChange={handleChange}
                onReset={handleReset}
                onClick={handleSearch}
                onClear={handleClear}
              />
            </div>
            {data && !isLoading && selectedTab === 'Courses' && (
              <div className='flex flex-row my-3 -mx-2 md:my-0 md:mx-0 xl:flex-row gap-2 pl-2'>{data && createLists()}</div>
            )}
            <div className='self-start flex -mt-0  md:mt-2.5 ml-2 -my-2'>
              {selectedTab === 'Courses' && user && <CreateSavedSearchModal path={router.asPath} />}
              <button 
                title='Clear Search'
                onClick= {() => 
                  setParams((prev) => ({ ...prev, keyword: '' }),
                  router.push({ pathname: '/learner/search' })
                )}
                className="italic text-sm font-sans text-[#3892f3] underline whitespace-nowrap"
              >     
              Clear Search
            </button>
            </div>
        
        </div>
        <div className='py-4'>
          <TabBar
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={tabs}
            loaded={Competencies.length === 0}
          />
          {selectedTab === tabs[0] ?
            <SearchCourses 
              params={params}
              setParams={setParams}
            /> : 
            <SearchCompetencies 
              Competencies={Competencies} 
              params={params}
              setParams={setParams}
            />
          }
        </div>
      </div>

    </DefaultLayout>
  );
}