'use strict'

import { useRouter } from 'next/router';
import  Link from 'next/link';

export default function CollectionsTabBar({ tabs }) {
  const router = useRouter();
  return (
    <div className='border-b border-gray-200'>
      <nav className='flex space-x-4' aria-label='Tabs'>
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`px-3 py-2 font-medium text-sm transition-colors duration-200 ${router.pathname === tab.href ? 'text-[#3892f3] text-sm font-bold border-b border-[#3892f3] leading-[17.50px]' : 'text-[#1f3764] text-sm font-medium leading-[17.50px]'}`}
            >
            {tab.name}
          </Link>
        ))}
        </nav>
      </div>
  );

};