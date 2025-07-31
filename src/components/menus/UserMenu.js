'use strict';

import {
  ArrowRightOnRectangleIcon,
  ChevronUpIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

export default function UserMenu() {
  
  const { user, logout } = useAuth();

  const handleLogout = async (e)=>{
    e.preventDefault();
    await logout();
    window.location.href = '/edlm-portal/';
  }

  return (
    <Menu
      as='div'
      className='relative inline-block text-left mt-0.5 max-w-min z-50'
    >
      {({ open }) => (
        <div className='relative'>
          <Menu.Button className='group inline-flex justify-end items-center bg-blue-500 hover:bg-opacity-95 hover:shadow transform transition-all ease-in-out duration-150 px-2 py-1 text-white gap-2 font-semibold rounded-md outline-none focus:ring-4 ring-blue-400'>
            <div
              id='avatar'
              className='h-8 w-8 rounded-full flex-shrink-0 bg-white shadow-inner-sm overflow-hidden flex justify-center items-center'
            >
              <UserIcon className='h-6 text-blue-500 text-shadow' />
            </div>
            <div className='line-clamp-1'>{user?.user?.first_name}</div>

            <ChevronUpIcon
              className={`${
                !open
                  ? 'rotate-180  group-hover:bg-blue-500'
                  : 'shadow-inner-sm'
              } text-white h-5 rounded-md transition-all ease-in-out duration-75 `}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-150'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-100'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 origin-top w-24 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
              <div className='p-2 flex w-full justify-end items-center'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`flex justify-end items-center gap-2 hover:bg-gray-50 rounded-md p-1 transition-all duration-75 ease-in-out text-sm hover:shadow-inner-sm hover:border-transparent ${
                        active && 'ring-2 ring-blue-500 ring-offset-1'
                      } hover:ring-transparent`}
                    >
                      <ArrowRightOnRectangleIcon className='h-4 w-4' />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
}
