'use strict';

import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import SaveModal from '@/components/modals/SaveModal';

export default function SearchResult({ result }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = useCallback(() => {
    // create the context
    const context = {
      actor: {
        first_name: user?.user?.first_name || 'Anonymous',
        last_name: user?.user?.last_name || 'User',
      },
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/explored',
        display: 'explored',
      },
      object: {
        id: `${window.origin}/course/${result.meta.id}`,
        definitionName: result.Course.CourseTitle,
        description: result.Course.CourseShortDescription,
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: result.meta.id,
    };

    xAPISendStatement(context);
    router.push(`/course/${result.meta.id}`);
  }, [result, user, router]);

  return (
    <div
      className='group hover:text-blue-400 hover:text-shadow cursor-pointer pr-2 pl-1 py-1 rounded-md outline-none focus-within:ring-2 focus-within:ring-blue-500'
      title={result.Course.CourseTitle}
    >
      <div className='flex justify-between items-center'>
        <button
          className='text-lg font-semibold group-hover:underline w-full text-left focus:outline-none'
          onClick={handleClick}
        >
          <h3>{result.Course.CourseTitle}</h3>
        </button>
        {user && <SaveModal courseId={result.meta.id} title={result.Course.CourseTitle} />}
      </div>
      <div onClick={handleClick} className='text-left' aria-hidden='true'>
        <h4>
          <strong>Provider:&nbsp;</strong>
          {result.Course.CourseProviderName}
        </h4>
        <p className='line-clamp-4 pr-4'>
          {removeHTML(result.Course.CourseShortDescription)}
        </p>
      </div>
    </div>
  );
}
