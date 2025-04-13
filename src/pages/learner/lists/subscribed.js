'use strict';

import { Pagination } from '@/components/buttons/Pagination';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSubscribedLists } from '@/hooks/useSubscribedLists';
import { useUnsubscribeFromList } from '@/hooks/useUnsubscribeFromList';
import CheckMessageCard from '@/components/cards/CheckMessageCard';
import CollectionCard from '@/components/cards/CollectionCard';
import CollectionsLayout from '@/components/layouts/CollectionsLayout';
import Image from 'next/image';
import Link from 'next/link';
import MinusIcon from '@/public/icons/minusIcon.svg';
import ShareIcon from '@/public/icons/shareIcon.svg';

export default function Subscribed() {
  const { user } = useAuth();
  const {
    data: subscribed,
    isSuccess,
    isError,
    error,
  } = useSubscribedLists(user?.token);
  const { mutate: unsubscribe } = useUnsubscribeFromList(user?.token);
  const router = useRouter();

  const [copy, setCopy] = useState('');

  // current page
  const CARD_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user) router.push('/');
    if (isError && error.response.status === 401) router.push('/401');
    if (isError && error.response.status === 403) router.push('/403');
  }, []);

  // card dropdown menu options for subscribed lists
  const getMenuItems = id => [
    {
      icon: <Image src={ShareIcon} alt='Share' />,
      label: 'Share',
      onClick: () => handleShare(id),
    },
    {
      icon: <Image src={MinusIcon} alt='Unsubscribed' />,
      label: 'Unsubscribed',
      onClick: () => unsubscribe({ id }),
    }
  ];

  const handleShare = id => {
    navigator.clipboard.writeText(`${window.origin}/learner/lists/${id}`)
    .then(() => {
      setCopy('Copied Successfully!');
      setTimeout(() => {
        setCopy('');
      }, 2000);
    })
    .catch(() => {
      setCopy('Failed to copy');
      setTimeout(() => {
        setCopy('');
      }, 2000);
    });
  }

  const handleSpecificPage = page => {
    setCurrentPage(page);
  }

  // Calculate for the pagination
  const currentCards = subscribed ? subscribed.slice((currentPage - 1) * CARD_PER_PAGE, currentPage * CARD_PER_PAGE) : []; // Get the current cards to display
  const totalPages = subscribed ? Math.ceil(subscribed.length / CARD_PER_PAGE) : 0;
  
  return (
    <CollectionsLayout title={'My Subscriptions'}>
      <div className='mt-7 pb-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {isSuccess && currentCards.map((cardItem) => (
              <CollectionCard
                key={cardItem.id}
                title={cardItem.name}
                itemsCount={cardItem.experiences.length}
                totalTime={cardItem.totalTime}
                description={cardItem.description}
                isPublic={cardItem.public}
                cardDetailLink={{
                  pathname: `/learner/lists/${cardItem.id}`,
                  query: { previousPage: 'My Subscriptions' }
                }}
                menuItems= {getMenuItems(cardItem.id)}
              />
            ))}
        </div>
      </div>
      {isSuccess && subscribed.length === 0 && (
            <div className='text-center w-full col-span-3'>
              <h2 className='text-lg px-2 pt-2 font-medium'>
                You are not subscribed to any lists.
              </h2>
              <div className='pt-8'>
                <Link href='/learner/lists/searchLists' passHref>
                  <button className='max-w-max items-center inline-flex gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white px-4 py-2 transform transition-all duration-150 ease-in-out border-blue-400 border-2 outline-none focus:ring-2 ring-blue-400'>
                    <div>Click Here to Search for a list.</div>
                  </button>
                </Link>
              </div>
            </div>
          )}
      {isSuccess && subscribed?.length > CARD_PER_PAGE && (
        <div className='pt-8'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleSpecificPage={handleSpecificPage}
          />
        </div>
      )}
      <CheckMessageCard message={copy} />
    </CollectionsLayout>
  );
}
