'use strict';

import { BookOpenIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

// import { useUserOwnedLists } from '@/hooks/useUserOwnedLists';
import { useDeleteMyCollection } from '@/hooks/useDeleteMyCollection';
import { useState } from 'react';
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import { useUserOwnedLists } from '@/hooks/useUserOwnedLists';
import CheckMessageCard from '@/components/cards/CheckMessageCard';
import CollectionCard from '@/components/cards/CollectionCard';
import CollectionsLayout from '@/components/layouts/CollectionsLayout';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import DeleteIcon from '@/public/icons/deleteIcon.svg';
import EditIcon from '@/public/icons/editIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import ShareIcon from '@/public/icons/shareIcon.svg';

export default function Owned() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, isSuccess, isError, error } = useUserOwnedLists();
  const { mutate: deleteCollection } = useDeleteMyCollection();
  const { mutate: updateList } = useUpdateUserList();

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
      onClick: () => deleteCollection({id}),
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
  };

  const handlePrivatePublicToggle = (id, isPublic) => {
    // Get the current list data from the list of lists with the matching id
    const currentList = data.find(list => list.id === id);
    updateList({
      id,
      listData: ({
        ...currentList,
        public: isPublic
      })
    });
  };

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
              onTogglePrivatePublic={isPublic => handlePrivatePublicToggle(cardItem.id, isPublic)}
            />
          ))}
        </div>
      </div>
      {isSuccess && data.length === 0 && (
          <div className='text-center w-full col-span-3'>
            <h2 className='text-lg font-medium px-2 pt-2'>
              You are not subscribed to any lists.
            </h2>
            <p className='inline-flex w-[80%] pt-8'>
              To create a new list, head over to the search courses page and
              find a course you&apos;d like to save. Click the save button and
              you&apos;ll be able to add it a list or create a new one.
            </p>
          </div>
        )}
      <CheckMessageCard message={copy} />
    </CollectionsLayout>
  );
}
