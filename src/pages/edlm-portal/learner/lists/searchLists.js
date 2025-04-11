'use strict';

import { Pagination } from '@/components/buttons/Pagination';
import { useAuth } from '@/contexts/AuthContext';
import { useInterestLists } from '@/hooks/useInterestLists';
import { useRouter } from 'next/router';
import { useSubscribeToList } from '@/hooks/useSubscribeToList';
import { useSubscribedLists } from '@/hooks/useSubscribedLists';
import { useUnsubscribeFromList } from '@/hooks/useUnsubscribeFromList';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import CollectionCard from '@/components/cards/CollectionCard';
import CollectionsLayout from '@/components/layouts/CollectionsLayout';
import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/inputs/SearchBar';
import XMarkMessageToast from '@/components/cards/XMarkMessageToast';

export default function SearchLists() {
  const router = useRouter();

  // Get the user's auth context
  const { user } = useAuth();

  // get lists from server
  const interestLists = useInterestLists();
  const subscribedLists = useSubscribedLists();
  const { mutate: subscribe } = useSubscribeToList();
  const { mutate: unsubscribe } = useUnsubscribeFromList();
  
  // Get search input value when user types
  const [searchInput, setSearchInput] = useState('');

  // The actual search query
  const [search, setSearch] = useState('');
  
  // current page
  const CARD_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setCurrentPage(1);
  };

  const handleSubscribe = (list) => {

    const context = {
            actor: {
              first_name: user?.user?.first_name,
              last_name: user?.user?.last_name,
            },
            verb: {
              id: 'https://w3id.org/xapi/acrossx/verbs/curated',
              display: 'curated',
            },
            object: {
              definitionName: 'DOT&E Subscribe Capability',
            },
            resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CuratedListId',
            resultExtValue: list?.name,
          };

    xAPISendStatement(context);
    
    subscribe({ id: list.id })
  };

  // returns a list of lists that match the search query and are chunked into
  const filteredLists = useMemo(() => {
    if (interestLists.isError || !interestLists.data) return [];

    // filter the list by the search query
    return interestLists.data?.filter((list) => {
      const { id, name } = list;
      return `${name.toLowerCase()}#${id}`.includes(search.toLowerCase());
    });
  }, [interestLists?.data, search]);

  // Calculate for the pagination
  const currentCards = filteredLists ? filteredLists.slice((currentPage - 1) * CARD_PER_PAGE, currentPage * CARD_PER_PAGE) : [];
  const totalPages = filteredLists ? Math.ceil(filteredLists.length / CARD_PER_PAGE) : 0;

  const handleSpecificPage = page => {
    setCurrentPage(page);
  }

  const getMenuItems = (list) => {
    // Check if user is already subscribed to this list
    const isSubscribed = subscribedLists.isSuccess && 
                      subscribedLists.data.find((sub) => sub.id === list.id);
    
    return [
      {
        // Mock icons
        icon: isSubscribed ? '🔕' : '🔔',
        label: isSubscribed ? 'Unsubscribe' : 'Subscribe',
        onClick: () => {
          if (isSubscribed) {
            unsubscribe({ id: list.id });
          } else {
            handleSubscribe(list);
          }
        },
      }
    ];
  };

  useEffect(() => {
    // if the user is not logged in, redirect to the home page
    if (!user) router.push('/edlm-portal');
    if (interestLists.isError && interestLists.error.response.status === 401)
      return router.push('/edlm-portal/401');
    if(interestLists.isError && interestLists.error.response.status === 403)
      return router.push('/edlm-portal/403');
  }, []);

  return (
    <CollectionsLayout title={'Search Collections'}>
      <div className='mt-7 pb-5'>
        <div className='flex justify-between items-baseline -mt-2'>
          <div className='flex-grow w-[22rem] xl:w-[44rem]'>
            <div className="flex gap-4">
              <SearchBar
                parameters={{ keyword: searchInput }}
                onChange={handleChange}
                onClick={handleSearch}
                placeholder='Search Public Collections'
              />
              <button 
                title='Clear Search'
                onClick= {() => {
                  setSearchInput('');
                  setSearch('');
                  setCurrentPage(1);
                }}
                className="italic text-sm font-sans text-[#3892f3] underline whitespace-nowrap"
              >     
                Clear Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {interestLists.isSuccess &&
          currentCards.map((cardItem) => (
            <CollectionCard
              key={cardItem.id}
              title={cardItem.name}
              description={cardItem.description}
              itemsCount={cardItem.experiences?.length || 0}
              totalTime={cardItem.totalTime || 0}
              isPublic={cardItem.public}
              cardDetailLink={{
                pathname: `/edlm-portal/learner/lists/${cardItem.id}`,
                query: { previousPage: 'Search Collections' }
              }}
              menuItems={getMenuItems(cardItem)}
            />
          ))}
      </div>
      {interestLists.isSuccess && filteredLists?.length > CARD_PER_PAGE && (
        <div className='pt-8'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleSpecificPage={handleSpecificPage}
          />
        </div>
      )}

      {interestLists.isSuccess && filteredLists?.length === 0 && (
        <div className='flex justify-center'>
          <XMarkMessageToast message='No search results found' />
        </div>
      )}

    </CollectionsLayout>
  );
}
