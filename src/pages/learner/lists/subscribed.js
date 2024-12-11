'use strict';

import { BookOpenIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useSubscribedLists } from '@/hooks/useSubscribedLists';
import { useUnsubscribeFromList } from '@/hooks/useUnsubscribeFromList';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import CollectionsLayout from '@/components/layouts/CollectionsLayout';
import ShareIcon from '@/public/icons/shareIcon.svg';
import MinusIcon from '@/public/icons/minusIcon.svg';
import CollectionCard from '@/components/cards/CollectionCard';
import { useState } from 'react';
import CheckMessageCard from '@/components/cards/CheckMessageCard';

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
                itemsCount={'10'}
                totalTime={cardItem.totalTime}
                description={cardItem.description}
                isPrivate={cardItem.isPrivate}
                cardDetailLink={`/learner/lists/${cardItem.id}`}
                menuItems= {getMenuItems(cardItem.id)}
              />
            ))}
        </div>
      </div>
      <CheckMessageCard message={copy} />
    </CollectionsLayout>
  );
}
