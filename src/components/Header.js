'use strict';

import { useAuth } from '@/contexts/AuthContext';
import { useUiConfig } from '@/hooks/useUiConfig';
import Image from 'next/image';
import Link from 'next/link';
import UserMenu from '@/components/menus/UserMenu';
import fallbackLogo from '@/public/doteLogo.png';

export default function Header() {
  const { user } = useAuth();
  const { 
      data: uiConfig, 
      isLoading: isUiConfigLoading, 
  } = useUiConfig();

  const logoSrc = uiConfig?.logo || fallbackLogo;
  const portalName = uiConfig?.portal_name || 'EDLM Portal';

  return (
    <header className={'bg-blue-900 w-full shadow z-50'}>
      <nav
        className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}
        aria-label={'Top'}
      >
        
        <div className='w-full py-4 inline-flex items-center justify-between z-50'>
          <div className={'flex items-center justify-start text-white text-4xl font-semibold gap-4'}>
            <Link href={'/edlm-portal'} passHref>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <button
                title='home'
                id={'homepage-button'}
                className={'cursor-pointer'}
              >
                {isUiConfigLoading ? (
                  <div className='w-15 h-15 bg-gray-200 animate-pulse rounded-full'/>
                ) : (
                  <Image src={logoSrc} alt={'Home'} height={60} width={60} priority />
                )}
              </button>
            </Link>
            {portalName}
          </div>
          {!user ? (
            <div className='space-x-4'>
              <Link href={'/edlm-portal/login'} passHref>
                <button className='disabled:hidden bg-blue-500 py-2 px-4 rounded inline-block text-white hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out font-semibold'>
                  Sign in
                </button>
              </Link>
              <Link href={'/edlm-portal/register'} passHref>
                <button className='disabled:hidden bg-blue-300 py-2 px-4 rounded inline-block text-white hover:opacity-90 hover:shadow transform transition-all duration-100 ease-in-out font-semibold'>
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <UserMenu />
          )}
        </div>
      </nav>
    </header>
  );
}
