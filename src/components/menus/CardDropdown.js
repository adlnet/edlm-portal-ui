import { Menu, Switch } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function CardDropdown({ menuItems, isPublic, showPrivateToggle = false, onTogglePrivatePublic}) {
  const [isPrivate, setIsPrivate] = useState(!isPublic);

  const handleToggle = () => {
    const newIsPrivate = !isPrivate;
    setIsPrivate(newIsPrivate);
    if (onTogglePrivatePublic) {
      // Passing the public state
      onTogglePrivatePublic(!newIsPrivate);
    }
  };

  useEffect(() => {
    setIsPrivate(!isPublic);
  }, [isPublic]);

  return(
    <Menu as='div' className='relative'>
      <Menu.Button className='hover:bg-gray-100 rounded-full focus:outline-none focus:ring-0'>
        <EllipsisVerticalIcon className='h-6 w-6 text-gray-500' />
      </Menu.Button>
      <Menu.Items className='absolute -right-12 pb-2 top-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-30 focus:outline-none focus:ring-0'>
        {menuItems.map((item, i) => (
          <Menu.Item key={i}>
            {({ active }) => (
              <button
                onClick={item.onClick}
                className={`${
                  active ? 'bg-gray-100 text-gray-700' : 'text-gray-700'
                } px-4 py-2  text-sm text-gray-700 w-full text-left flex items-center focus:outline-none focus:ring-0 `}
              >
                {item.icon && (
                  <span className='w-3.5 h-3.5 mr-2 mt-1'>{item.icon}</span>
                )}
                <span className='w-3.5 h-3.5'>{item.label}</span>
              </button>
            )}
          </Menu.Item>
        ))}
        {/* For private toggle, only show if showPrivateToggle is true */}
          {showPrivateToggle && (
            <Menu.Item as="div" className='h-[37px] px-4 py-4 justify-start items-center gap-3 inline-flex'>
              <div className='flex items-center'>
                <Switch
                  title='toggle'
                  checked={isPrivate}
                  onChange={handleToggle}
                  className={`${
                    isPrivate ? 'bg-gray-300' : 'bg-blue-500'
                  } w-10 h-5 relative inline-flex items-center rounded-full transition-colors focus:outline-none`}
                >
                  <span className={`${isPrivate ? 'translate-x-1' : 'translate-x-6'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
                <span className="text-[#1b1128] text-sm font-medium  ml-3 leading-[17.50px]">{isPrivate ? 'Private' : 'Public'}</span>
              </div>
            </Menu.Item>
          )}

      </Menu.Items>
    </Menu>
  );
}