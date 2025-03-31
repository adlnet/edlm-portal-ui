'use strict';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateSaveSearch } from '@/hooks/useCreateSaveSearch';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import InputField from '@/components/inputs/InputField';
import useField from '@/hooks/useField';

export default function CreateSavedSearchModal({ path }) {
  const { user } = useAuth();
  const { fields, updateKeyValuePair, resetKey } = useField({
    name: '',
  });
  const { mutate } = useCreateSaveSearch(user?.token);

  const handleChange = (event) => {
    updateKeyValuePair(event.target.name, event.target.value);
  };

  const handleCreate = (event) => {
    event.preventDefault();

    if (!fields.name || fields.name === '') return;

    // send the statement
    mutate({
      name: fields.name,
      path,
    });

    //xAPI Statement
    const context = {
      actor: {
        first_name: user?.user?.first_name,
        last_name: user?.user?.last_name,
      },
      verb: {
        id: 'https://w3id.org/xapi/acrossx/verbs/prioritized',
        display: 'prioritized',
      },
      object: {
        definitionName: 'DOT&E Search Term Saving',
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
      resultExtValue: fields.name,
    };

    xAPISendStatement(context);

    // reset the form
    resetKey('name');
  };

  return (
    <Popover className='relative inline-flex items-center'>
      <Popover.Button className='flex items-center justify-center pr-2'>
        <span className='italic text-sm font-sans text-[#3892f3] underline whitespace-nowrap hover:text-[#1d6ed8]'>
          Save Search
        </span>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute right-0 z-20 w-screen max-w-sm px-4 mt-3 sm:px-0 lg:max-w-3xl'>
          <form
            onSubmit={handleCreate}
            className='flex bg-white rounded-md shadow-md px-2 py-2 items-center gap-2'
          >
            <InputField
              placeholder='Query Name'
              value={fields.name}
              type='text'
              name='name'
              onChange={handleChange}
            />
            <Popover.Button
              as='button'
              type='submit'
              className='outline-none max-w-max items-center inline-flex gap-2 text-blue-400 rounded-md hover:shadow-md bg-blue-50 hover:bg-blue-400 hover:text-white px-4 py-2 transform transition-all duration-150 ease-in-out border-blue-400 border-2 focus:ring-2 ring-blue-400'
            >
              Save
            </Popover.Button>
          </form>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
