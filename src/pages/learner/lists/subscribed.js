'use strict';

import { BookOpenIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSubscribedLists } from '@/hooks/useSubscribedLists';
import { useUnsubscribeFromList } from '@/hooks/useUnsubscribeFromList';
import CheckMessageCard from '@/components/cards/CheckMessageCard';
import CollectionCard from '@/components/cards/CollectionCard';
import CollectionsLayout from '@/components/layouts/CollectionsLayout';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Image from 'next/image';
import Link from 'next/link';
import MinusIcon from '@/public/icons/minusIcon.svg';
import React, { useEffect } from 'react';
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
  
  return (
    <CollectionsLayout title={'My Subscriptions'}>
      <div className='mt-7 pb-5'>
        <div className='grid grid-cols-3 gap-8'>
          {isSuccess && subscribed?.map((cardItem, i) => (
              <CollectionCard
                key={i}
                title={cardItem.name}
                itemsCount={cardItem.experiences.length}
                totalTime={cardItem.totalTime}
                description={cardItem.description}
                isPublic={cardItem.public}
                cardDetailLink={`/learner/lists/${cardItem.id}`}
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
      <CheckMessageCard message={copy} />
    </CollectionsLayout>
  );
}
