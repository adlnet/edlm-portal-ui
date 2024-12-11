'use strict';

import { BookOpenIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
// import { useUserOwnedLists } from '@/hooks/useUserOwnedLists';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Link from 'next/link';
import React, { useEffect } from 'react';
import CollectionsLayout from '@/components/layouts/CollectionsLayout';
import CollectionCard from '@/components/cards/CollectionCard';
import Image from 'next/image';
import EditIcon from '@/public/icons/editIcon.svg';
import ShareIcon from '@/public/icons/shareIcon.svg';
import DeleteIcon from '@/public/icons/deleteIcon.svg';
import { useUserOwnedLists } from '@/hooks/useUserOwnedLists';
import { useState } from 'react';
import CheckMessageCard from '@/components/cards/CheckMessageCard';
import { useDeleteMyCollection } from '@/hooks/useDeleteMyCollection';

export default function Owned() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, isSuccess, isError, error } = useUserOwnedLists();
  const { mutate } = useDeleteMyCollection();

  const [copy, setCopy] = useState('');

  // Card dropdown menu options
  const getMenuItems = id => [
    {
      icon: <Image src={EditIcon} alt='Edit' />,
      label: 'Edit',
      onClick: () => router.push(`/learner/lists/edit/${id}`),
    },
    {
      icon: <Image src={ShareIcon} alt='Share' />,
      label: 'Share',
      onClick: () => handleShare(id),
    },
    {
      icon: <Image src={DeleteIcon} alt='Delete' />,
      label: 'Delete',
      onClick: () => mutate({id}),
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

  useEffect(() => {
    if (!user) router.push('/');
    if (isError && error.response.status === 403) router.push('/403');
    if (isError && error.response.status === 401) router.push('/401');
  }, []);

  return (
    <CollectionsLayout title={'My Collections'}>
    <div className='mt-7 pb-5'>
      <div className= 'grid grid-cols-1 md:grid-cols-3 gap-8'>
          {isSuccess && data?.map((cardItem, i) => (
            <CollectionCard
              key={i}
              title={cardItem.name}
              itemsCount={cardItem.experiences.length}
              totalTime={cardItem.totalTime}
              description={cardItem.description}
              isPublic={cardItem.public}
              cardDetailLink={`/learner/lists/${cardItem.id}`}
              menuItems= {getMenuItems(cardItem.id)}
              showPrivateToggle={true}
            />
          ))}
        </div>
      </div>
      <CheckMessageCard message={copy} />
    </CollectionsLayout>
  );
}
