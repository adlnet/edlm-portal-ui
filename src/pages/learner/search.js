'use strict';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/dist/client/router';
import { useCourseSearch} from '@/hooks/useCourseSearch';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import { unstable_batchedUpdates } from 'react-dom';
import SearchCourses from '@/components/SearchCourses'; 
// import SearchCompetencies from '@/components/SearchCompetencies';
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
      {/* TODO: make title, searchbar, filters?, tabs section */}

      {/* call course + comp search */}
      <div className='mt-10 pb-4'>
        <span className='flex flex-col py-2 mb-4 max-w-min sticky top-0 z-10 bg-gray-50'>
          <div className='max-w-max self-end'>
            {user && <CreateSavedSearchModal path={router.asPath} />}
          </div>
          <div className='w-[44rem]'>
            <SearchBar
              parameters={params}
              onChange={handleChange}
              onReset={handleReset}
              onClick={handleSearch}
            />
          </div>
          {data && !isLoading && (
            <div className='flex gap-2 pl-6 pt-2'>{data && createLists()}</div>
          )}
        </span>
        <TabBar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabs={tabs}
        />
        {selectedTab === tabs[0] ? <SearchCourses params={params} setParams={setParams}/> : 'SearchCompetencies'}
      </div>

      {/* <SearchCompetencies /> */}

    </DefaultLayout>
  );
}
