'use strict';

import { Pagination } from '@/components/buttons/Pagination';
import { shared } from '@/utils/xapi/events';
import { useDeleteMyCollection } from '@/hooks/useDeleteMyCollection';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import { useUserOwnedLists } from '@/hooks/useUserOwnedLists';
import CheckMessageCard from '@/components/cards/CheckMessageCard';
import CollectionCard from '@/components/cards/CollectionCard';
import CollectionsLayout from '@/components/layouts/CollectionsLayout';
import DeleteIcon from '@/public/icons/deleteIcon.svg';
import EditIcon from '@/public/icons/editIcon.svg';
import Image from 'next/image';
import ShareIcon from '@/public/icons/shareIcon.svg';

export default function Owned() {
  const router = useRouter();
  const { data, isSuccess, isError, error } = useUserOwnedLists();
  const { mutate: deleteCollection } = useDeleteMyCollection();
  const { mutate: updateList } = useUpdateUserList();

  const [copy, setCopy] = useState('');

  // current page
  const CARD_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Card dropdown menu options
  const getMenuItems = id => [
    {
      icon: <Image src={EditIcon} alt='Edit' />,
      label: 'Edit',
      onClick: () => router.push(`/edlm-portal/learner/lists/edit/${id}`),
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

    // Getting ready for xapi event
    const shareUrl = `${window.origin}/edlm-portal/learner/lists/${id}`;
    
    const listData = data.find(list => list.id === id);

    if (listData) {

      const title = listData.name;
      const description = listData.description || 'No description provided.';

      shared(
        id,
        shareUrl,
        title,
        description
      );
    }

    navigator.clipboard.writeText(shareUrl)
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

  const handleSpecificPage = page => {
    setCurrentPage(page);
  }

  // Calculate for the pagination
  const currentCards = data ? data.slice((currentPage - 1) * CARD_PER_PAGE, currentPage * CARD_PER_PAGE) : []; // Get the current cards to display
  const totalPages = data ? Math.ceil(data.length / CARD_PER_PAGE) : 0;

  useEffect(() => {
    if (isError && error.response.status === 403) router.push('/edlm-portal/403');
    if (isError && error.response.status === 401) router.push('/edlm-portal/401');
  }, []);

  return (
    <CollectionsLayout title={'My Collections'}>
    <div className='mt-7 pb-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {isSuccess && currentCards?.map((cardItem) => (
            <CollectionCard
              key={cardItem.id}
              title={cardItem.name}
              itemsCount={cardItem.experiences.length}
              totalTime={cardItem.totalTime}
              description={cardItem.description}
              isPublic={cardItem.public}
              cardDetailLink={{
                pathname: `/edlm-portal/learner/lists/${cardItem.id}`,
                query: { previousPage: 'My Collections' }
              }}
              menuItems= {getMenuItems(cardItem.id)}
              showPrivateToggle={cardItem.can_toggle_public}
              onTogglePrivatePublic={isPublic => handlePrivatePublicToggle(cardItem.id, isPublic)}
            />
          ))}
        </div>
      </div>
      {isSuccess && data?.length === 0 && (
          <div className='text-center w-full col-span-3'>
            <h2 className='text-lg font-medium px-2 pt-2'>
              You dont have any collections yet.
            </h2>
            <p className='inline-flex w-[80%] pt-8'>
              To create a new list, head over to the search courses page and
              find a course you&apos;d like to save. Click the save button and
              you&apos;ll be able to add it a list or create a new one.
            </p>
          </div>
        )}
      {isSuccess && data?.length > CARD_PER_PAGE && (
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
