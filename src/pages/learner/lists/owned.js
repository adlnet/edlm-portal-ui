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


export default function Owned() {
  const router = useRouter();

//Mock datas for development
const getMenuItems = id => [
  {
    icon: <Image src={EditIcon} alt='Edit' />,
    label: 'Edit',
    onClick: () => router.push(`/learner/lists/edit/${id}`),
  },
  {
    icon: <Image src={ShareIcon} alt='Share' />,
    label: 'Share',
    onClick: () => console.log('Share clicked'),
  },
  {
    icon: <Image src={DeleteIcon} alt='Delete' />,
    label: 'Delete',
    onClick: () => console.log('Delete clicked'),
  }
];
  
const cardItems =  [
    {
      id: 1,
      title: 'List 1',
      itemsCount: 2,
      totalTime: 2,
      description: 'This is the description for List 1. This is the description for List 1 This is the description for List 1',
      isPrivate: true,
    },
    {
      id:2,
      title: 'List 2',
      itemsCount: 2,
      totalTime: 2,
      description: 'This is the description for List 2.',
      isPrivate: false,
    },
    {
      id: 3,
      title: 'List 3',
      itemsCount: 2,
      totalTime: 2,
      description: 'This is the description for List 3.',
      isPrivate: true,
    },
    {
      id:4,
      title: 'List 4',
      itemsCount: 2,
      totalTime: 2,
      description: 'This is the description for List 4.',
      isPrivate: false,
    }
  ];
    
  
  const useUserOwnedLists = () => {
    return {
      data: cardItems,
      isSuccess: true,
      isError: false,
      error: null,
    };
  };
  
  const { user } = useAuth();
  const { data, isSuccess, isError, error } = useUserOwnedLists();

  useEffect(() => {
    if (!user) router.push('/');
    if (isError && error.response.status === 403) router.push('/403');
    if (isError && error.response.status === 401) router.push('/401');
  }, []);

  return (
    <CollectionsLayout title={'My Collections'}>
    <div className='mt-7 pb-5'>
      <div className= 'grid grid-cols-1 md:grid-cols-3 gap-8'>
      {/* <div className='grid grid-cols-3 gap-8'>
        {isSuccess &&
          data.map((list) => {
            return (
              <div
                className='relative w-full bg-white border border-gray-200 shadow rounded-md'
                key={list.id}
              >
                <h2 className='font-semibold text-lg px-2 pt-2'>{list.name}</h2>
                <span className='inline-flex gap-2 px-2'>
                  <div className='inline-flex -py-1 justify-start items-center gap-0.5 text-sm bg-blue-100 border border-blue-500 rounded-full px-2 text-blue-500'>
                    <UsersIcon className='h-3 w-3' /> {list.subscribers.length}
                  </div>
                  <div
                    className='inline-flex -py-1 justify-start items-center gap-0.5 text-sm
                    bg-green-100 border border-green-500 rounded-full px-2 text-green-500'
                  >
                    <BookOpenIcon className='h-3 w-3 mt-0.5' />
                    {list.experiences.length}
                  </div>
                </span>
                <p className='text-base line-clamp-4 pt-3 mb-20 px-2'>
                  {list.description}
                </p>
                <div className='absolute bottom-0 left-0 w-full flex justify-around items-center border-t divide-x mt-2'>
                  <Link href={`/learner/lists/edit/${list.id}`} passHref>
                    <button className='cursor-pointer flex-shrink-0 py-4 hover:bg-gray-100 w-1/2 text-center'>
                      Edit
                    </button>
                  </Link>
                  <Link href={`/learner/lists/${list.id}`} passHref>
                    <button className='cursor-pointer flex-shrink-0 py-4 hover:bg-gray-100 w-1/2 text-center'>
                      View
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
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
        </div> */}
          {cardItems.map((cardItem, i) => (
            <CollectionCard
              key={i}
              title={cardItem.title}
              itemsCount={cardItem.itemsCount}
              totalTime={cardItem.totalTime}
              description={cardItem.description}
              isPrivate={cardItem.isPrivate}
              menuItems= {getMenuItems(cardItem.id)}
              showPrivateToggle={true}
            />
          ))}
        </div>
      </div>
    </CollectionsLayout>
  );
}
