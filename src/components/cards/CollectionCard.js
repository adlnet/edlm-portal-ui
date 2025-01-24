import CardDropdown from '@/components/menus/CardDropdown';
import Image from 'next/image';
import Link from 'next/link';
import LockClose from '@/public/icons/lockClose.svg';
import lockOpen from '@/public/icons/lockOpen.svg';

export default function CollectionCard({ title, description, itemsCount, totalTime, isPublic, menuItems = [], cardDetailLink, showPrivateToggle = false, onTogglePrivatePublic }) {
    return (
      <div className='relative max-w-sm pt-7 pl-3 pb-3 pr-3 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition shadow'>
        <div className='absolute top-2 right-2'>
        {menuItems.length > 0 && (
          <CardDropdown 
            menuItems={menuItems}
            showPrivateToggle={showPrivateToggle}
            isPublic={isPublic}
            onTogglePrivatePublic={onTogglePrivatePublic}
          />)}
        </div>
        <div className="flex flex-col gap-2">
          <Link href={cardDetailLink} passHref>
            <div className="text-[#1b1128] text-2xl font-bold font-['Roboto'] leading-[30px]">{title}</div>
          </Link>
          <div className="text-gray-500 text-base font-normal leading-normal line-clamp-1">{description}</div>     
        </div>

        <div className='flex items-center gap-2 space-x-4 text-gray-500 text-sm mt-10 pr-4 overflow-auto'>
          <div className='flex items-center space-x-1'>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="outdent-outline">
            <g id="outdent">
            <path d="M11.6999 5.86664V10.1333L14.8999 7.99998L11.6999 5.86664Z" fill="#135F9B"/>
            <path d="M14.8999 1.59998H2.0999M7.43324 5.86664H2.0999M7.43324 10.1333H2.0999M14.8999 14.4H2.0999M11.6999 5.86664V10.1333L14.8999 7.99998L11.6999 5.86664Z" stroke="#135F9B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            </g>
          </svg>
            <span className='text-gray-500 text-nowrap'>{itemsCount} items</span>
          </div>
          <div className='flex items-center space-x-1'>
            <Image src={isPublic ? lockOpen : LockClose} alt='Lock Icon' className='w-4 h-4' />
            <span className='text-gray-500 text-nowrap'>{isPublic ? 'Public' : 'Private'}</span>
          </div>
        </div>
      </div>
    );
  }