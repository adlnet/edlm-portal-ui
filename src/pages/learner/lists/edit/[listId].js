'use strict';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Switch } from '@headlessui/react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import { useList } from '@/hooks/useList';
import { useConfig } from '@/hooks/useConfig';
import { removeHTML } from '@/utils/cleaning';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import prepareListDataToSend from '@/utils/prepListDataToSend';
import Image from 'next/image';
import LockClose from '@/public/icons/lockClose.svg';
import lockOpen from '@/public/icons/lockOpen.svg';
import CollectionTable from '@/components/tables/collectionsTable/CollectionTable';

export function getServerSideProps({ query }) {
  return {
    props: {
      listId: query.listId,
    },
  };
}

export default function EditList({ listId }) {
  const router = useRouter();
  const { user } = useAuth();
  const config = useConfig();

  // columns for table
  const columns = [
    {label: 'TITLE', accessor: 'title'},
    {label: 'INSTRUCTOR', accessor: 'instructor'},
    {label: 'COURSE START DATE', accessor: 'date'},
    {label: 'DURATION', accessor: 'duration'}
  ]

  // handles the mutation
  const mutation = useUpdateUserList();

  // single source of truth for editing
  const [currentListInfo, setCurrentListInfo] = useState({
    name: '',
    description: '',
    public: null,
    experiences: [],
  });

  const initialList = useList(parseInt(listId), setCurrentListInfo);

  useEffect(() => {
    // no user
    if (!user) return router.push('/');
    // if there is a authorization error
    if (initialList?.isError) {
      if( initialList?.error?.response?.status === 401)
       return router.push('/401');
      if (initialList?.error?.response?.status === 403)
        return router.push('/403');
    }
    
    // if the owner of the list is not the current user, redirect to homepage
    if (initialList?.isSuccess && user?.user?.id){
      if (initialList?.data?.owner?.id !== user?.user?.id){
        return router.push(`/learner/lists/${listId}`);
      } 
    }

    if (initialList?.isSuccess) {
      setCurrentListInfo({
        name: initialList.data?.name,
        description: initialList.data?.description,
        experiences: initialList.data?.experiences,
        public: initialList.data?.public,
      });
    }
  },[]);

  const handleChange = (event) => {
    setCurrentListInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const toggleListVisibility = () => {
    setCurrentListInfo((prev) => ({
      ...prev,
      public: !prev.public,
    }));
  };

  const removeCourse = (id) => {
    console.log("Delete: ", id)
    setCurrentListInfo((prev) => {
      return {
        ...prev,
        experiences: prev.experiences.filter(
          (exp) => exp.meta.metadata_key_hash !== id
        ),
      };
    });
  };

  const resetData = (e) => {
    e.preventDefault();
    setCurrentListInfo(initialList.data);
  };

  const submitData = (e) => {
    e.preventDefault();
    mutation.mutate(
      {
        listData: prepareListDataToSend(currentListInfo),
        id: parseInt(listId),
      },
      {
        onSuccess: () => {
          initialList.refetch();
        }
      }
    );
  };

  const checkSpecialChar =(e)=>{
    if(/[<>/?+={};#$*`~\\]/.test(e.key)){
     e.preventDefault();
    }
   };

  // prepare the experience data
  console.log('curListInfo: ', currentListInfo)
  const data = useMemo(() => {
    const courses = []
    console.log('In Use Memo: ', currentListInfo)
    for (let i = 0; i < currentListInfo?.experiences.length; i++){
      const course = {
          id: (currentListInfo?.experiences[i]?.meta?.metadata_key_hash),
          title: removeHTML(
            getDeeplyNestedData(
                config.data?.course_information?.course_title,
                currentListInfo?.experiences[i]
            )
          ),
          instructor: getDeeplyNestedData(
            config.data?.course_information?.course_instructor,
            currentListInfo?.experiences[i]
          ),
          date: getDeeplyNestedData(
            config.data?.course_information.course_startDate,
            currentListInfo?.experiences[i]
          ),
          duration: getDeeplyNestedData(
            config.data?.course_information?.course_time,
            currentListInfo?.experiences[i]
          )
        };
      courses.push(course)
    }
    return courses
  },[currentListInfo.experiences, initialList.isSuccess]);
  console.log('Data edit: ', data)
   
  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <a 
                href='/learner/lists/owned' className="text-[#3892f3] text-sm font-medium font-['Inter'] leading-[21px]  hover:underline">
                My Collections
              </a>
              <ChevronRightIcon className="w-3 h-3 relative" />
              <div className="justify-center items-center flex">
                <span className="text-gray-500 text-sm font-medium font-['Inter'] leading-[21px]">{initialList?.data?.name}</ span>              
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center mt-1'>
            <div className="text-gray-900 text-2xl font-bold leading-normal">{initialList?.data?.name}</div>
          </div>

          <form onSubmit={submitData} onReset={resetData} className='mt-3'>
            {/* Toggle privacy status */}
            <div className='flex gap-4 text-sm mt-2 text-gray-900'>
              <span className='flex flex-row font-medium gap-2'>
                <Switch
                    title='toggle'
                    checked={currentListInfo?.public}
                    onChange={toggleListVisibility}
                    className={`${
                      currentListInfo?.public ? 'bg-gray-300' : 'bg-blue-500'
                    } w-10 h-5 relative inline-flex items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span className={`${currentListInfo?.public ? 'translate-x-1' : 'translate-x-6'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                </Switch>
                <Image src={currentListInfo?.public ? lockOpen : LockClose} alt='Lock Icon' className='w-4 h-4' />
                <span>{currentListInfo?.public ? 'Public' : 'Private'}</span>
              </span>
            </div>

            {/* Title & description input */}
            <div className='space-y-4 mt-4'>
              <div>
                <span className='text-gray-900 text-sm font-medium leading-[21px] mb-1'>Edit Collection Title</span>
                <input
                  className='w-full px-4 py-2 bg-[#faf9fb] rounded-lg border border-[#d6d2db] justify-start items-center gap-2.5 inline-flex'
                  type='text'
                  placeholder='List Name'
                  value={currentListInfo?.name}
                  onChange={handleChange}
                  name='name'
                  maxLength="200"
                  onKeyPress={(e)=>checkSpecialChar(e)}
                />
              </div>
              <div>
                <span className='text-gray-900 text-sm font-medium leading-[21px] mb-1'>Edit Collection Description</span>
                <textarea
                  className='w-full px-4 py-2 bg-[#faf9fb] rounded-lg border border-[#d6d2db] justify-start items-center gap-2.5 inline-flex'
                  name='description'
                  placeholder='List Description'
                  onChange={handleChange}
                  value={currentListInfo?.description}
                  maxLength="1000"
                  onKeyPress={(e)=>checkSpecialChar(e)}
                />
              </div>
            </div>

            {/* Collections Table component */}
            <CollectionTable data={data} columns={columns} deleteCourse={removeCourse} rowsPerPage={4}/>

            {/* message for no courses */}
            {currentListInfo?.experiences?.length < 0 && (
              <div className='text-center font-medium border-b border-l border-r py-2 bg-white/90 rounded-b'>
                No courses added yet.
              </div>
            )}

            {/* Action buttons */}
            <div className='mt-6 flex justify-end gap-4'>
            <button
                type='reset'
                className='w-[92px] h-[37px] px-3 py-2 rounded-lg border border-[#263f9d] justify-center items-center gap-2 inline-flex text-[#1f3764] text-sm font-medium leading-none hover:bg-blue-50 focus:ring-2 ring-gray-400'
              >
                Cancel
              </button>
              <button
                className='w-[92px] h-[37px] px-3 py-2 bg-blue-900 rounded-lg justify-center items-center gap-2 inline-flex text-white text-sm font-medium leading-[21px] focus:ring-2 ring-blue-400'
                type='submit'
                onClick={() => router.push(`/learner/lists/${listId}`)}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
